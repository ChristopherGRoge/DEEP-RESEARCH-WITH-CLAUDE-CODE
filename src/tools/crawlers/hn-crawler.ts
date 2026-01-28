/**
 * Hacker News Crawler - Uses HN's free API to discover AI tools and launches
 *
 * HN API Documentation: https://github.com/HackerNews/API
 * Base URL: https://hacker-news.firebaseio.com/v0
 *
 * Features:
 * - Crawl top/new/best stories
 * - Filter by AI keywords and minimum score
 * - Detect product launches (Show HN, Launch HN)
 * - Extract tool mentions and URLs
 * - Parallel story fetching with concurrency control
 * - Optional comment analysis for additional context
 */

import { prisma } from '../index';
import { fetchUrl } from '../extractor/fetcher';

// ============================================
// CONSTANTS
// ============================================

const HN_API = 'https://hacker-news.firebaseio.com/v0';

// Default AI-related keywords for filtering
export const HN_AI_KEYWORDS = [
  'AI', 'ML', 'LLM', 'GPT', 'Claude', 'Anthropic', 'OpenAI',
  'Copilot', 'Cursor', 'generative', 'machine learning',
  'deep learning', 'neural', 'transformer', 'code gen',
  'agent', 'RAG', 'vector database', 'embedding', 'fine-tun',
  'Show HN', 'Launch HN', 'code completion', 'AI assistant',
  'chatbot', 'language model', 'prompt', 'inference'
];

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HNCrawlerConfig {
  /** Which HN endpoint to crawl */
  endpoint: 'topstories' | 'newstories' | 'beststories' | 'showstories' | 'askstories';

  /** Maximum number of stories to fetch (HN returns up to 500 IDs) */
  limit?: number;

  /** Filter stories with score >= minScore */
  minScore?: number;

  /** Keywords to filter stories (case-insensitive) */
  aiKeywords?: string[];

  /** Source ID to associate discoveries with */
  sourceId?: string;

  /** Project ID to associate discovered entities with */
  projectId?: string;

  /** Maximum concurrent story fetches */
  concurrency?: number;

  /** Fetch top N comments for context (0 to disable) */
  commentLimit?: number;
}

export interface HNStory {
  id: number;
  title: string;
  url?: string;           // External URL (not all stories have this)
  text?: string;          // For Ask HN / text posts
  score: number;
  by: string;             // Author username
  time: number;           // Unix timestamp
  descendants: number;    // Comment count
  type: 'story' | 'job' | 'poll';
  kids?: number[];        // Comment IDs
}

export interface HNComment {
  id: number;
  by: string;
  text: string;
  time: number;
  parent: number;
}

export interface HNCrawlResult {
  success: boolean;
  storiesProcessed: number;
  storiesFiltered: number;
  entitiesDiscovered: number;
  sourceId?: string;
  discoveries: DiscoveredTool[];
  errors: string[];
}

export interface DiscoveredTool {
  name: string;
  url: string;
  hnStoryUrl: string;
  hnStoryId: number;
  title: string;
  score: number;
  author: string;
  postedAt: Date;
  isLaunch: boolean;
  matchedKeywords: string[];
  context: string;        // Story title + text + top comments
}

// ============================================
// CORE CRAWLER FUNCTIONS
// ============================================

/**
 * Main crawler entry point - discovers AI tools from Hacker News
 */
export async function crawlHackerNews(config: HNCrawlerConfig): Promise<HNCrawlResult> {
  const {
    endpoint,
    limit = 100,
    minScore = 10,
    aiKeywords = HN_AI_KEYWORDS,
    sourceId,
    projectId,
    concurrency = 10,
    commentLimit = 5,
  } = config;

  const errors: string[] = [];
  const discoveries: DiscoveredTool[] = [];

  try {
    console.log(`[HN Crawler] Starting crawl: ${endpoint}, limit=${limit}, minScore=${minScore}`);

    // Step 1: Fetch story IDs from HN API
    const storyIds = await fetchStoryIds(endpoint);
    console.log(`[HN Crawler] Fetched ${storyIds.length} story IDs`);

    // Step 2: Fetch stories in parallel (limited concurrency)
    const limitedIds = storyIds.slice(0, limit);
    const stories = await fetchStoriesParallel(limitedIds, concurrency);
    console.log(`[HN Crawler] Retrieved ${stories.length} stories`);

    // Step 3: Filter by score
    const scoredStories = stories.filter(s => s.score >= minScore);
    console.log(`[HN Crawler] ${scoredStories.length} stories above score threshold`);

    // Step 4: Filter by AI keywords
    const relevantStories = scoredStories.filter(story =>
      matchesKeywords(story, aiKeywords)
    );
    console.log(`[HN Crawler] ${relevantStories.length} stories match AI keywords`);

    // Step 5: Extract tool discoveries from each story
    for (const story of relevantStories) {
      try {
        const discovery = await extractToolDiscovery(story, commentLimit);
        if (discovery) {
          discoveries.push(discovery);
          console.log(`[HN Crawler] Discovered: ${discovery.name} (${discovery.url})`);
        }
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        errors.push(`Failed to extract from story ${story.id}: ${errMsg}`);
      }
    }

    console.log(`[HN Crawler] Crawl complete: ${discoveries.length} tools discovered`);

    return {
      success: true,
      storiesProcessed: stories.length,
      storiesFiltered: relevantStories.length,
      entitiesDiscovered: discoveries.length,
      sourceId,
      discoveries,
      errors,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error(`[HN Crawler] Fatal error: ${errMsg}`);
    return {
      success: false,
      storiesProcessed: 0,
      storiesFiltered: 0,
      entitiesDiscovered: 0,
      sourceId,
      discoveries,
      errors: [errMsg, ...errors],
    };
  }
}

/**
 * Fetch story IDs from HN endpoint
 */
async function fetchStoryIds(endpoint: string): Promise<number[]> {
  const url = `${HN_API}/${endpoint}.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HN API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single story by ID
 */
export async function fetchStory(id: number): Promise<HNStory | null> {
  try {
    const url = `${HN_API}/item/${id}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const story = await response.json();

    // HN API can return null for deleted/dead items
    if (!story || story.dead || story.deleted) {
      return null;
    }

    return story;
  } catch (error) {
    console.error(`[HN Crawler] Failed to fetch story ${id}:`, error);
    return null;
  }
}

/**
 * Fetch multiple stories in parallel with concurrency limit
 */
export async function fetchStoriesParallel(
  ids: number[],
  concurrency: number = 10
): Promise<HNStory[]> {
  const results: HNStory[] = [];

  // Process in batches to limit concurrency
  for (let i = 0; i < ids.length; i += concurrency) {
    const batch = ids.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fetchStory));

    // Filter out nulls (failed/deleted stories)
    results.push(...batchResults.filter((s): s is HNStory => s !== null));
  }

  return results;
}

/**
 * Fetch top N comments for a story
 */
export async function fetchStoryComments(
  storyId: number,
  limit: number = 5
): Promise<string[]> {
  try {
    const story = await fetchStory(storyId);
    if (!story || !story.kids || story.kids.length === 0) {
      return [];
    }

    // Fetch first N comment IDs
    const commentIds = story.kids.slice(0, limit);
    const comments: string[] = [];

    for (const commentId of commentIds) {
      const url = `${HN_API}/item/${commentId}.json`;
      const response = await fetch(url);

      if (response.ok) {
        const comment: HNComment = await response.json();
        if (comment && comment.text) {
          // Strip HTML tags from comment text
          const cleanText = comment.text.replace(/<[^>]*>/g, '');
          comments.push(cleanText);
        }
      }
    }

    return comments;
  } catch (error) {
    console.error(`[HN Crawler] Failed to fetch comments for story ${storyId}:`, error);
    return [];
  }
}

// ============================================
// FILTERING & DETECTION
// ============================================

/**
 * Check if story matches AI keywords
 */
function matchesKeywords(story: HNStory, keywords: string[]): boolean {
  const searchText = [
    story.title,
    story.url || '',
    story.text || '',
  ].join(' ').toLowerCase();

  return keywords.some(keyword =>
    searchText.includes(keyword.toLowerCase())
  );
}

/**
 * Detect if story is a product launch announcement
 */
export function isToolAnnouncement(story: HNStory): boolean {
  const title = story.title.toLowerCase();

  const launchIndicators = [
    'show hn',
    'launch hn',
    'introducing',
    'released',
    'announcing',
    'built',
    'created',
    'made',
    'new tool',
    'new product',
    'we built',
    'i built',
    'i made',
    'i created',
  ];

  return launchIndicators.some(indicator => title.includes(indicator));
}

/**
 * Extract matched keywords from story
 */
function extractMatchedKeywords(story: HNStory, keywords: string[]): string[] {
  const searchText = [
    story.title,
    story.url || '',
    story.text || '',
  ].join(' ').toLowerCase();

  return keywords.filter(keyword =>
    searchText.includes(keyword.toLowerCase())
  );
}

// ============================================
// TOOL DISCOVERY
// ============================================

/**
 * Extract tool discovery from HN story
 */
async function extractToolDiscovery(
  story: HNStory,
  commentLimit: number
): Promise<DiscoveredTool | null> {
  // Must have a URL to be a discoverable tool
  if (!story.url) {
    return null;
  }

  // Extract tool name from title (heuristic)
  const toolName = extractToolName(story.title);
  if (!toolName) {
    return null;
  }

  // Fetch top comments for additional context
  const comments = commentLimit > 0
    ? await fetchStoryComments(story.id, commentLimit)
    : [];

  // Build context from story + comments
  const context = [
    story.title,
    story.text || '',
    ...comments,
  ].join('\n\n');

  return {
    name: toolName,
    url: story.url,
    hnStoryUrl: `https://news.ycombinator.com/item?id=${story.id}`,
    hnStoryId: story.id,
    title: story.title,
    score: story.score,
    author: story.by,
    postedAt: new Date(story.time * 1000),
    isLaunch: isToolAnnouncement(story),
    matchedKeywords: extractMatchedKeywords(story, HN_AI_KEYWORDS),
    context,
  };
}

/**
 * Extract tool name from HN title (heuristic)
 */
function extractToolName(title: string): string | null {
  // Remove common prefixes
  let cleanTitle = title
    .replace(/^(Show HN|Launch HN|Ask HN|Tell HN):\s*/i, '')
    .replace(/^(Introducing|Announcing|Released|Built)\s+/i, '')
    .trim();

  // Try to extract name before dash/hyphen
  const dashMatch = cleanTitle.match(/^([^–—-]+?)[\s]*[–—-]/);
  if (dashMatch) {
    return dashMatch[1].trim();
  }

  // Try to extract name before parenthesis
  const parenMatch = cleanTitle.match(/^([^(]+?)\s*\(/);
  if (parenMatch) {
    return parenMatch[1].trim();
  }

  // Try to extract name before "is", "a", "the"
  const isMatch = cleanTitle.match(/^([^,]+?)\s+(is|–|—|a|the)\s+/i);
  if (isMatch) {
    return isMatch[1].trim();
  }

  // Take first 3-5 words as name
  const words = cleanTitle.split(/\s+/);
  if (words.length <= 5) {
    return cleanTitle;
  }

  return words.slice(0, 3).join(' ');
}

// ============================================
// DATABASE INTEGRATION
// ============================================

/**
 * Persist discovered tools to database
 */
export async function persistDiscoveries(
  discoveries: DiscoveredTool[],
  projectId: string,
  sourceId?: string
): Promise<{
  entitiesCreated: number;
  assertionsCreated: number;
  errors: string[];
}> {
  let entitiesCreated = 0;
  let assertionsCreated = 0;
  const errors: string[] = [];

  for (const discovery of discoveries) {
    try {
      // Check if entity already exists
      const existing = await prisma.entity.findFirst({
        where: {
          projectId,
          url: discovery.url,
        },
      });

      let entityId: string;

      if (existing) {
        entityId = existing.id;
        console.log(`[HN Persist] Entity already exists: ${discovery.name}`);
      } else {
        // Create entity
        const entity = await prisma.entity.create({
          data: {
            projectId,
            name: discovery.name,
            url: discovery.url,
            description: discovery.title,
            entityType: 'tool',
          },
        });
        entityId = entity.id;
        entitiesCreated++;
        console.log(`[HN Persist] Created entity: ${discovery.name}`);
      }

      // Create assertion about the discovery
      const assertion = await prisma.assertion.create({
        data: {
          entityId,
          claim: `Discovered on Hacker News with ${discovery.score} points`,
          category: 'discovery',
          evidenceDescription: `Found on HN ${discovery.isLaunch ? '(Launch announcement)' : ''}: ${discovery.title}\n\nHN story: ${discovery.hnStoryUrl}\nMatched keywords: ${discovery.matchedKeywords.join(', ')}\n\nContext: ${discovery.context.slice(0, 500)}...`,
          status: 'CLAIM',
        },
      });
      assertionsCreated++;

      // Link source if provided
      if (sourceId) {
        await prisma.assertionSource.create({
          data: {
            assertionId: assertion.id,
            sourceId,
          },
        });
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      errors.push(`Failed to persist ${discovery.name}: ${errMsg}`);
    }
  }

  return { entitiesCreated, assertionsCreated, errors };
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Crawl and persist in one step
 */
export async function crawlAndPersist(
  config: HNCrawlerConfig & { projectId: string }
): Promise<HNCrawlResult & {
  entitiesCreated: number;
  assertionsCreated: number;
}> {
  // Crawl HN
  const crawlResult = await crawlHackerNews(config);

  if (!crawlResult.success || crawlResult.discoveries.length === 0) {
    return {
      ...crawlResult,
      entitiesCreated: 0,
      assertionsCreated: 0,
    };
  }

  // Persist discoveries
  const persistResult = await persistDiscoveries(
    crawlResult.discoveries,
    config.projectId,
    config.sourceId
  );

  return {
    ...crawlResult,
    entitiesCreated: persistResult.entitiesCreated,
    assertionsCreated: persistResult.assertionsCreated,
    errors: [...crawlResult.errors, ...persistResult.errors],
  };
}

/**
 * Quick crawl of Show HN stories (most likely to be product launches)
 */
export async function crawlShowHN(projectId: string, limit: number = 50): Promise<HNCrawlResult> {
  return crawlAndPersist({
    endpoint: 'showstories',
    limit,
    minScore: 5, // Lower threshold for Show HN
    projectId,
  });
}

/**
 * Quick crawl of top stories with AI filter
 */
export async function crawlTopAIStories(projectId: string, limit: number = 100): Promise<HNCrawlResult> {
  return crawlAndPersist({
    endpoint: 'topstories',
    limit,
    minScore: 50, // Higher threshold for top stories
    projectId,
  });
}
