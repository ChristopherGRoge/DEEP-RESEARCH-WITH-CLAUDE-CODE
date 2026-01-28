/**
 * Crawl Orchestrator - Coordinate discovery crawls across all source types
 *
 * This orchestrates systematic crawling of curated sources (HN, Reddit, GitHub, RSS, etc.)
 * to discover new entities matching research criteria.
 */

import { prisma } from '../db/client';
import { crawlRSSFeed } from './crawlers/rss-crawler';
import { crawlAwesomeList, crawlGitHubTrending } from './crawlers/github-crawler';
import { crawlSubreddit } from './crawlers/reddit-crawler';
import { crawlAccount as crawlNitterAccount } from './crawlers/nitter-crawler';
import { crawlHackerNews } from './crawlers/hn-crawler';
import type { CrawlStatus, DiscoverySource } from '../../generated/prisma/client';

// ============================================
// Types
// ============================================

export interface CrawlConfig {
  projectId: string;
  sourceTypes?: string[];     // Filter by source types
  sourceIds?: string[];       // Specific sources to crawl
  researchFocus?: string;     // Keywords to prioritize
  maxSources?: number;        // Limit number of sources
  concurrency?: number;       // Parallel crawls (default: 3)
}

export interface CrawlProgress {
  crawlId: string;
  status: string;
  sourcesTotal: number;
  sourcesComplete: number;
  sourcesFailed: number;
  discoveriesFound: number;
  currentSource?: string;
  errors: string[];
}

export interface CrawlResult {
  crawlId: string;
  status: 'COMPLETED' | 'FAILED' | 'CANCELLED';
  duration: number;           // seconds
  sourcesProcessed: number;
  sourcesFailed: number;
  discoveriesFound: number;
  entitiesCreated: number;
  entitiesMatched: number;
  errors: string[];
}

interface SourceCrawlResult {
  discoveries: any[];
  error?: string;
}

// Source crawl timeout - 45 seconds max per source
const SOURCE_TIMEOUT_MS = 45000;

/**
 * Wrap a promise with a timeout
 */
function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(errorMessage));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

// ============================================
// Crawl Management
// ============================================

/**
 * Start a discovery crawl
 */
export async function startDiscoveryCrawl(config: CrawlConfig): Promise<{
  crawlId: string;
  sourcesToCrawl: number;
}> {
  // 1. Get active sources matching filters
  const whereClause: any = {
    isActive: true,
  };

  if (config.sourceTypes && config.sourceTypes.length > 0) {
    whereClause.sourceType = { in: config.sourceTypes };
  }

  if (config.sourceIds && config.sourceIds.length > 0) {
    whereClause.id = { in: config.sourceIds };
  }

  const sources = await prisma.discoverySource.findMany({
    where: whereClause,
    orderBy: { priority: 'desc' },
    take: config.maxSources,
  });

  if (sources.length === 0) {
    throw new Error('No active sources found matching filters');
  }

  // 2. Create DiscoveryCrawl record
  const crawl = await prisma.discoveryCrawl.create({
    data: {
      projectId: config.projectId,
      sourceIds: sources.map((s) => s.id),
      researchFocus: config.researchFocus,
      status: 'IN_PROGRESS',
      sourcesTotal: sources.length,
      sourcesComplete: 0,
      sourcesFailed: 0,
      discoveriesFound: 0,
      entitiesCreated: 0,
      entitiesUpdated: 0,
    },
  });

  // 3. Start crawling in background (non-blocking)
  executeCrawl(crawl.id, sources, config).catch((error) => {
    console.error(`Crawl ${crawl.id} failed:`, error);
    prisma.discoveryCrawl.update({
      where: { id: crawl.id },
      data: {
        status: 'FAILED',
        completedAt: new Date(),
      },
    }).catch((updateError) => {
      console.error('Failed to update crawl status:', updateError);
    });
  });

  // 4. Return crawl ID
  return {
    crawlId: crawl.id,
    sourcesToCrawl: sources.length,
  };
}

/**
 * Get crawl status
 */
export async function getCrawlStatus(crawlId: string): Promise<CrawlProgress | null> {
  const crawl = await prisma.discoveryCrawl.findUnique({
    where: { id: crawlId },
  });

  if (!crawl) {
    return null;
  }

  // Get current source being processed from checkpoint
  let currentSource: string | undefined;
  if (crawl.checkpoint && typeof crawl.checkpoint === 'object') {
    const checkpoint = crawl.checkpoint as any;
    if (checkpoint.currentSourceId) {
      const source = await prisma.discoverySource.findUnique({
        where: { id: checkpoint.currentSourceId },
        select: { name: true },
      });
      currentSource = source?.name;
    }
  }

  // Collect errors from checkpoint
  const errors: string[] = [];
  if (crawl.checkpoint && typeof crawl.checkpoint === 'object') {
    const checkpoint = crawl.checkpoint as any;
    if (Array.isArray(checkpoint.errors)) {
      errors.push(...checkpoint.errors);
    }
  }

  return {
    crawlId: crawl.id,
    status: crawl.status,
    sourcesTotal: crawl.sourcesTotal,
    sourcesComplete: crawl.sourcesComplete,
    sourcesFailed: crawl.sourcesFailed,
    discoveriesFound: crawl.discoveriesFound,
    currentSource,
    errors,
  };
}

/**
 * Pause a crawl
 */
export async function pauseCrawl(crawlId: string): Promise<boolean> {
  try {
    await prisma.discoveryCrawl.update({
      where: { id: crawlId },
      data: {
        status: 'PAUSED',
        pausedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Failed to pause crawl:', error);
    return false;
  }
}

/**
 * Resume a paused crawl
 */
export async function resumeCrawl(crawlId: string): Promise<boolean> {
  try {
    const crawl = await prisma.discoveryCrawl.findUnique({
      where: { id: crawlId },
    });

    if (!crawl || crawl.status !== 'PAUSED') {
      return false;
    }

    await prisma.discoveryCrawl.update({
      where: { id: crawlId },
      data: {
        status: 'IN_PROGRESS',
        pausedAt: null,
      },
    });

    // Get remaining sources
    const processedSourceIds = crawl.checkpoint && typeof crawl.checkpoint === 'object'
      ? ((crawl.checkpoint as any).processedSourceIds as string[] || [])
      : [];

    const remainingSources = await prisma.discoverySource.findMany({
      where: {
        id: { in: crawl.sourceIds },
        NOT: { id: { in: processedSourceIds } },
      },
    });

    // Resume execution
    const config: CrawlConfig = {
      projectId: crawl.projectId || '',
      researchFocus: crawl.researchFocus || undefined,
    };

    executeCrawl(crawl.id, remainingSources, config, processedSourceIds).catch((error) => {
      console.error(`Crawl ${crawl.id} failed on resume:`, error);
    });

    return true;
  } catch (error) {
    console.error('Failed to resume crawl:', error);
    return false;
  }
}

/**
 * Cancel a crawl
 */
export async function cancelCrawl(crawlId: string): Promise<boolean> {
  try {
    await prisma.discoveryCrawl.update({
      where: { id: crawlId },
      data: {
        status: 'CANCELLED',
        completedAt: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.error('Failed to cancel crawl:', error);
    return false;
  }
}

/**
 * Get crawl history
 */
export async function getCrawlHistory(
  projectId: string,
  limit: number = 20
): Promise<any[]> {
  const crawls = await prisma.discoveryCrawl.findMany({
    where: { projectId },
    orderBy: { startedAt: 'desc' },
    take: limit,
  });

  return crawls.map((crawl) => ({
    crawlId: crawl.id,
    status: crawl.status,
    startedAt: crawl.startedAt,
    completedAt: crawl.completedAt,
    duration: crawl.completedAt
      ? Math.round((crawl.completedAt.getTime() - crawl.startedAt.getTime()) / 1000)
      : null,
    sourcesTotal: crawl.sourcesTotal,
    sourcesComplete: crawl.sourcesComplete,
    sourcesFailed: crawl.sourcesFailed,
    discoveriesFound: crawl.discoveriesFound,
    entitiesCreated: crawl.entitiesCreated,
    entitiesUpdated: crawl.entitiesUpdated,
  }));
}

// ============================================
// Crawl Execution
// ============================================

/**
 * Execute crawl for a single source
 */
async function crawlSource(
  source: DiscoverySource,
  crawlSessionId: string
): Promise<SourceCrawlResult> {
  try {
    switch (source.crawlStrategy) {
      case 'rss':
        if (!source.feedUrl) {
          return { discoveries: [], error: 'No feedUrl configured' };
        }
        const rssResult = await crawlRSSFeed({
          feedUrl: source.feedUrl,
          sourceId: source.id,
          projectId: crawlSessionId, // Use crawl session ID as project context
        });
        return {
          discoveries: rssResult.discoveries || [],
          error: rssResult.success ? undefined : rssResult.errors.join('; '),
        };

      case 'github_api':
        // Parse repo from URL
        const repoMatch = source.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!repoMatch) {
          return { discoveries: [], error: 'Invalid GitHub URL' };
        }
        const [, owner, repo] = repoMatch;
        const githubResult = await crawlAwesomeList(
          {
            repoOwner: owner,
            repoName: repo,
            sourceId: source.id,
          },
          crawlSessionId
        );

        // Convert entries to discoveries
        const githubDiscoveries = githubResult.entries.map((entry) => ({
          mentionedName: entry.name,
          briefDescription: entry.description,
          discoveryUrl: entry.url,
          contextSnippet: `Category: ${entry.category}`,
          extractedLinks: [entry.url],
          keywords: [],
        }));

        return {
          discoveries: githubDiscoveries,
          error: githubResult.success ? undefined : githubResult.error,
        };

      case 'html_scrape':
        if (source.url.includes('github.com/trending')) {
          const trendingResult = await crawlGitHubTrending(
            { sourceId: source.id },
            crawlSessionId
          );

          // Convert entries to discoveries
          const trendingDiscoveries = trendingResult.entries.map((entry) => ({
            mentionedName: entry.name,
            briefDescription: entry.description,
            discoveryUrl: entry.url,
            contextSnippet: `Category: ${entry.category}`,
            extractedLinks: [entry.url],
            keywords: [],
          }));

          return {
            discoveries: trendingDiscoveries,
            error: trendingResult.success ? undefined : trendingResult.error,
          };
        }
        // Generic HTML scraping not implemented yet
        return { discoveries: [], error: 'Generic HTML scraping not implemented' };

      case 'json_api':
        // Reddit
        const subreddit = extractSubreddit(source.url);
        if (!subreddit) {
          return { discoveries: [], error: 'Invalid Reddit URL' };
        }
        const redditResult = await crawlSubreddit(
          {
            subreddit,
            sortBy: 'hot',
            limit: 50,
            sourceId: source.id,
          },
          crawlSessionId
        );

        // Convert Reddit discoveries to generic format
        // RedditToolDiscovery has: toolName, mentionContext, postTitle, postUrl, score, created
        const redditDiscoveries = redditResult.discoveries.map((d) => ({
          mentionedName: d.toolName,
          briefDescription: d.postTitle,
          discoveryUrl: d.postUrl,
          contextSnippet: d.mentionContext,
          extractedLinks: [d.postUrl],
          keywords: [],
        }));

        return {
          discoveries: redditDiscoveries,
          error: redditResult.success ? undefined : redditResult.error,
        };

      case 'nitter_rss':
        const handle = extractHandle(source.url);
        if (!handle) {
          return { discoveries: [], error: 'Invalid Twitter/X URL' };
        }
        const nitterResult = await crawlNitterAccount({
          handle,
          sourceId: source.id,
        });

        // Convert Nitter discoveries to generic format
        // Discovery has: name, url?, mentionContext, tweetUrl, confidence
        const nitterDiscoveries = nitterResult.discoveries.map((d) => ({
          mentionedName: d.name,
          briefDescription: d.mentionContext,
          discoveryUrl: d.url || d.tweetUrl,
          contextSnippet: d.mentionContext,
          extractedLinks: d.url ? [d.url, d.tweetUrl] : [d.tweetUrl],
          keywords: [],
        }));

        return {
          discoveries: nitterDiscoveries,
          error: nitterResult.success ? undefined : nitterResult.error,
        };

      case 'hn_api':
        const hnResult = await crawlHackerNews({
          endpoint: 'topstories',
          limit: 100,
          sourceId: source.id,
        });

        // Convert HN discoveries to generic format
        // DiscoveredTool has: name, url, hnStoryUrl, hnStoryId, title, score, author, postedAt, isLaunch, matchedKeywords, context
        const hnDiscoveries = hnResult.discoveries.map((d) => ({
          mentionedName: d.name,
          briefDescription: d.title,
          discoveryUrl: d.url,
          contextSnippet: d.context,
          extractedLinks: [d.url, d.hnStoryUrl],
          keywords: d.matchedKeywords,
        }));

        return {
          discoveries: hnDiscoveries,
          error: hnResult.success ? undefined : hnResult.errors.join('; '),
        };

      default:
        return { discoveries: [], error: `Unknown strategy: ${source.crawlStrategy}` };
    }
  } catch (error) {
    return { discoveries: [], error: String(error) };
  }
}

/**
 * Execute full crawl
 */
async function executeCrawl(
  crawlId: string,
  sources: DiscoverySource[],
  config: CrawlConfig,
  processedSourceIds: string[] = []
): Promise<CrawlResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  let sourcesProcessed = processedSourceIds.length;
  let sourcesFailed = 0;
  let discoveriesFound = 0;
  let entitiesCreated = 0;
  let entitiesMatched = 0;

  const concurrency = config.concurrency || 3;

  // Process sources with concurrency limit
  const sourceQueue = [...sources];
  const activePromises: Promise<void>[] = [];

  while (sourceQueue.length > 0 || activePromises.length > 0) {
    // Check if crawl was paused or cancelled
    const crawl = await prisma.discoveryCrawl.findUnique({
      where: { id: crawlId },
      select: { status: true },
    });

    if (crawl?.status === 'PAUSED' || crawl?.status === 'CANCELLED') {
      // Save checkpoint
      await prisma.discoveryCrawl.update({
        where: { id: crawlId },
        data: {
          checkpoint: {
            processedSourceIds: [...processedSourceIds],
            errors,
          },
          sourcesComplete: sourcesProcessed,
          sourcesFailed,
          discoveriesFound,
          entitiesCreated,
        },
      });

      return {
        crawlId,
        status: crawl.status === 'CANCELLED' ? 'CANCELLED' : 'COMPLETED',
        duration: Math.round((Date.now() - startTime) / 1000),
        sourcesProcessed,
        sourcesFailed,
        discoveriesFound,
        entitiesCreated,
        entitiesMatched,
        errors,
      };
    }

    // Start new crawls up to concurrency limit
    while (activePromises.length < concurrency && sourceQueue.length > 0) {
      const source = sourceQueue.shift()!;

      const promise = (async () => {
        // Update current source in progress
        await prisma.discoveryCrawl.update({
          where: { id: crawlId },
          data: {
            checkpoint: {
              currentSourceId: source.id,
              processedSourceIds: [...processedSourceIds],
              errors,
            },
          },
        });

        try {
          // Log start of source crawl
          console.log(`[Crawl] Starting: ${source.name} (${source.crawlStrategy})`);

          // Crawl the source with timeout
          const result = await withTimeout(
            crawlSource(source, crawlId),
            SOURCE_TIMEOUT_MS,
            `Timeout after ${SOURCE_TIMEOUT_MS / 1000}s crawling ${source.name}`
          );

          if (result.error) {
            console.log(`[Crawl] Failed: ${source.name} - ${result.error}`);
            sourcesFailed++;
            errors.push(`${source.name}: ${result.error}`);

            // Update source error tracking
            await prisma.discoverySource.update({
              where: { id: source.id },
              data: {
                lastCrawledAt: new Date(),
                lastError: result.error,
                consecutiveErrors: { increment: 1 },
              },
            });
          } else {
            // Save raw discoveries to database
            if (result.discoveries.length > 0) {
              await prisma.rawDiscovery.createMany({
                data: result.discoveries.map((d) => ({
                  sourceId: source.id,
                  mentionedName: d.mentionedName,
                  briefDescription: d.briefDescription,
                  discoveryUrl: d.discoveryUrl,
                  contextSnippet: d.contextSnippet,
                  extractedLinks: d.extractedLinks,
                  releaseVersion: d.releaseVersion,
                  keywords: d.keywords,
                  discoveredAt: new Date(),
                  crawlSessionId: crawlId,
                  processed: false,
                })),
              });

              discoveriesFound += result.discoveries.length;
            }

            // Update source success tracking
            await prisma.discoverySource.update({
              where: { id: source.id },
              data: {
                lastCrawledAt: new Date(),
                lastSuccessAt: new Date(),
                lastError: null,
                consecutiveErrors: 0,
                discoveriesCount: { increment: result.discoveries.length },
              },
            });
          }

          console.log(`[Crawl] Completed: ${source.name} (${result.discoveries.length} discoveries)`);
          sourcesProcessed++;
          processedSourceIds.push(source.id);

          // Update crawl progress
          await prisma.discoveryCrawl.update({
            where: { id: crawlId },
            data: {
              sourcesComplete: sourcesProcessed,
              sourcesFailed,
              discoveriesFound,
            },
          });
        } catch (error) {
          const errorMsg = String(error);
          console.log(`[Crawl] Error: ${source.name} - ${errorMsg}`);
          sourcesFailed++;
          errors.push(`${source.name}: ${errorMsg}`);

          // Update source error tracking
          await prisma.discoverySource.update({
            where: { id: source.id },
            data: {
              lastCrawledAt: new Date(),
              lastError: errorMsg,
              consecutiveErrors: { increment: 1 },
            },
          }).catch(console.error);
        }
      })();

      activePromises.push(promise);
    }

    // Wait for at least one promise to complete
    if (activePromises.length > 0) {
      await Promise.race(activePromises);
      // Remove completed promises
      const stillActive = activePromises.filter((p) => {
        let completed = false;
        p.then(() => { completed = true; }).catch(() => { completed = true; });
        return !completed;
      });
      activePromises.length = 0;
      activePromises.push(...stillActive);
    }
  }

  // Finalize crawl
  const duration = Math.round((Date.now() - startTime) / 1000);

  await prisma.discoveryCrawl.update({
    where: { id: crawlId },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
      sourcesComplete: sourcesProcessed,
      sourcesFailed,
      discoveriesFound,
      entitiesCreated,
      entitiesUpdated: entitiesMatched,
    },
  });

  return {
    crawlId,
    status: 'COMPLETED',
    duration,
    sourcesProcessed,
    sourcesFailed,
    discoveriesFound,
    entitiesCreated,
    entitiesMatched,
    errors,
  };
}

// ============================================
// Helper Functions
// ============================================

function extractOwner(url: string): string {
  const match = url.match(/github\.com\/([^\/]+)/);
  return match ? match[1] : '';
}

function extractRepo(url: string): string {
  const match = url.match(/github\.com\/[^\/]+\/([^\/]+)/);
  return match ? match[1] : '';
}

function extractSubreddit(url: string): string {
  const match = url.match(/reddit\.com\/r\/([^\/]+)/);
  return match ? match[1] : '';
}

function extractHandle(url: string): string {
  // Handle both twitter.com and x.com URLs
  const match = url.match(/(?:twitter\.com|x\.com)\/([^\/]+)/);
  return match ? match[1] : '';
}

// ============================================
// Scheduled Crawls
// ============================================

/**
 * Get sources due for crawl based on frequency
 */
export async function getSourcesDueForCrawl(): Promise<DiscoverySource[]> {
  const now = new Date();

  const sources = await prisma.discoverySource.findMany({
    where: {
      isActive: true,
    },
  });

  // Filter based on crawl frequency
  return sources.filter((source) => {
    if (!source.lastCrawledAt) {
      return true; // Never crawled
    }

    const timeSinceLastCrawl = now.getTime() - source.lastCrawledAt.getTime();
    const hoursElapsed = timeSinceLastCrawl / (1000 * 60 * 60);

    switch (source.crawlFrequency) {
      case 'hourly':
        return hoursElapsed >= 1;
      case 'daily':
        return hoursElapsed >= 24;
      case 'weekly':
        return hoursElapsed >= 24 * 7;
      default:
        return false;
    }
  });
}

/**
 * Run scheduled crawl (call from cron)
 */
export async function runScheduledCrawl(projectId: string): Promise<CrawlResult> {
  const sourcesDue = await getSourcesDueForCrawl();

  if (sourcesDue.length === 0) {
    return {
      crawlId: 'none',
      status: 'COMPLETED',
      duration: 0,
      sourcesProcessed: 0,
      sourcesFailed: 0,
      discoveriesFound: 0,
      entitiesCreated: 0,
      entitiesMatched: 0,
      errors: ['No sources due for crawl'],
    };
  }

  const { crawlId } = await startDiscoveryCrawl({
    projectId,
    sourceIds: sourcesDue.map((s) => s.id),
  });

  // Wait for crawl to complete
  return new Promise((resolve) => {
    const checkInterval = setInterval(async () => {
      const status = await getCrawlStatus(crawlId);
      if (status && (status.status === 'COMPLETED' || status.status === 'FAILED' || status.status === 'CANCELLED')) {
        clearInterval(checkInterval);

        const crawl = await prisma.discoveryCrawl.findUnique({
          where: { id: crawlId },
        });

        if (crawl) {
          const duration = crawl.completedAt
            ? Math.round((crawl.completedAt.getTime() - crawl.startedAt.getTime()) / 1000)
            : 0;

          resolve({
            crawlId,
            status: crawl.status as any,
            duration,
            sourcesProcessed: crawl.sourcesComplete,
            sourcesFailed: crawl.sourcesFailed,
            discoveriesFound: crawl.discoveriesFound,
            entitiesCreated: crawl.entitiesCreated,
            entitiesMatched: crawl.entitiesUpdated,
            errors: [],
          });
        }
      }
    }, 2000); // Check every 2 seconds
  });
}
