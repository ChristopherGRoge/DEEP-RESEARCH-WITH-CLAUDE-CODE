/**
 * GitHub Crawler - Parse Awesome Lists and GitHub Trending
 *
 * Handles:
 * 1. Awesome list README parsing (with diff against previous)
 * 2. GitHub Trending page scraping
 *
 * Uses lightweight HTML parsing and respects GitHub rate limits.
 */

import { fetchUrl } from '../extractor/fetcher';
import { prisma } from '../../db/client';

// ============================================
// TYPES
// ============================================

export interface GitHubListConfig {
  repoOwner: string;
  repoName: string;
  readmePath?: string;  // Default: README.md
  sourceId: string;
}

export interface GitHubTrendingConfig {
  languages?: string[];  // e.g., ['python', 'typescript', '']
  since?: 'daily' | 'weekly' | 'monthly';
  sourceId: string;
}

export interface AwesomeListEntry {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface CrawlResult {
  success: boolean;
  entries: AwesomeListEntry[];
  sourceUrl: string;
  crawledAt: Date;
  error?: string;
}

export interface DiffResult {
  added: AwesomeListEntry[];
  removed: AwesomeListEntry[];
}

// ============================================
// AWESOME LIST PARSING
// ============================================

/**
 * Parse markdown from an Awesome list to extract tool entries
 *
 * Handles patterns like:
 * - [Tool Name](https://url) - Description
 * - **[Tool Name](url)** - Description
 * - * [Name](url) - text
 *
 * Tracks current section heading (##) for category
 */
export function parseAwesomeListMarkdown(markdown: string): AwesomeListEntry[] {
  const entries: AwesomeListEntry[] = [];
  const lines = markdown.split('\n');
  let currentCategory = 'Uncategorized';

  // Regex patterns for extracting entries
  // Matches: - [Name](url) - Description
  // Matches: * [Name](url) - Description
  // Matches: - **[Name](url)** - Description
  const entryPattern = /^[\s-\*]+\*?\*?\[([^\]]+)\]\(([^)]+)\)\*?\*?[\s-]*(.*)$/;

  // Category heading pattern: ## Category Name
  const categoryPattern = /^##\s+(.+)$/;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) continue;

    // Check for category heading
    const categoryMatch = trimmedLine.match(categoryPattern);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      continue;
    }

    // Check for entry
    const entryMatch = trimmedLine.match(entryPattern);
    if (entryMatch) {
      const [, name, url, description] = entryMatch;

      // Clean up the description
      const cleanDescription = description
        .replace(/^[\s-]+/, '') // Remove leading dashes/spaces
        .trim();

      // Validate URL format
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        continue; // Skip invalid URLs
      }

      entries.push({
        name: name.trim(),
        url: url.trim(),
        description: cleanDescription,
        category: currentCategory,
      });
    }
  }

  return entries;
}

/**
 * Crawl an Awesome list README from GitHub
 */
export async function crawlAwesomeList(
  config: GitHubListConfig,
  crawlSessionId?: string
): Promise<CrawlResult> {
  const { repoOwner, repoName, readmePath = 'README.md' } = config;

  // Construct raw GitHub URL
  const sourceUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${readmePath}`;

  try {
    // Fetch the raw README content
    const result = await fetchUrl(sourceUrl);

    if (!result.success) {
      return {
        success: false,
        entries: [],
        sourceUrl,
        crawledAt: new Date(),
        error: result.error || 'Failed to fetch README',
      };
    }

    // Parse the markdown
    const entries = parseAwesomeListMarkdown(result.text);

    // Log to database if crawlSessionId provided
    if (crawlSessionId) {
      await prisma.researchLog.create({
        data: {
          action: 'crawl_awesome_list',
          agentId: crawlSessionId,
          details: {
            repoOwner,
            repoName,
            entriesFound: entries.length,
            sourceUrl,
          },
        },
      });
    }

    return {
      success: true,
      entries,
      sourceUrl,
      crawledAt: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      entries: [],
      sourceUrl,
      crawledAt: new Date(),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Diff two sets of Awesome list entries to find what's new or removed
 */
export function diffAwesomeList(
  currentEntries: AwesomeListEntry[],
  previousEntries: AwesomeListEntry[]
): DiffResult {
  // Create URL-based lookup for fast comparison
  const currentUrls = new Set(currentEntries.map(e => e.url));
  const previousUrls = new Set(previousEntries.map(e => e.url));

  // Find added entries
  const added = currentEntries.filter(entry => !previousUrls.has(entry.url));

  // Find removed entries
  const removed = previousEntries.filter(entry => !currentUrls.has(entry.url));

  return { added, removed };
}

// ============================================
// GITHUB TRENDING PARSING
// ============================================

/**
 * Parse GitHub trending HTML to extract repository information
 *
 * Lightweight parsing without heavy DOM libraries.
 */
function parseGitHubTrendingHtml(html: string): AwesomeListEntry[] {
  const entries: AwesomeListEntry[] = [];

  // GitHub trending structure:
  // <article class="Box-row">
  //   <h2>
  //     <a href="/owner/repo">owner / repo</a>
  //   </h2>
  //   <p class="col-9">Description</p>
  // </article>

  // Regex to extract repo links and descriptions
  // This is a simplified parser - may need adjustment if GitHub changes their HTML
  const repoPattern = /<h2[^>]*>[\s\S]*?<a\s+href="\/([^/]+\/[^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h2>/gi;
  const descPattern = /<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/i;

  let match;
  const htmlSections = html.split('<article');

  for (const section of htmlSections) {
    // Extract repo path (owner/repo)
    const repoMatch = section.match(/<a\s+href="\/([^/]+\/[^"]+)"[^>]*>/);
    if (!repoMatch) continue;

    const repoPath = repoMatch[1];
    const [owner, repo] = repoPath.split('/');

    // Extract description
    const descMatch = section.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
    const description = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, '').trim()
      : '';

    // Build GitHub URL
    const url = `https://github.com/${repoPath}`;

    entries.push({
      name: repo,
      url,
      description,
      category: 'GitHub Trending',
    });
  }

  return entries;
}

/**
 * Filter entries by AI/ML keywords
 */
function filterAIEntries(entries: AwesomeListEntry[]): AwesomeListEntry[] {
  const aiKeywords = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural', 'llm', 'gpt', 'language model', 'transformer', 'chatbot',
    'nlp', 'natural language', 'computer vision', 'cv', 'agent', 'copilot',
    'assistant', 'intelligent', 'generative', 'diffusion', 'embedding',
  ];

  return entries.filter(entry => {
    const searchText = `${entry.name} ${entry.description}`.toLowerCase();
    return aiKeywords.some(keyword => searchText.includes(keyword));
  });
}

/**
 * Crawl GitHub Trending page
 */
export async function crawlGitHubTrending(
  config: GitHubTrendingConfig,
  crawlSessionId?: string
): Promise<CrawlResult> {
  const {
    languages = [''],  // Empty string = all languages
    since = 'daily',
  } = config;

  const allEntries: AwesomeListEntry[] = [];
  const errors: string[] = [];

  // Crawl for each language
  for (const language of languages) {
    const languageParam = language ? `/${language}` : '';
    const sourceUrl = `https://github.com/trending${languageParam}?since=${since}&spoken_language_code=en`;

    try {
      const result = await fetchUrl(sourceUrl, {
        timeout: 30000,
        waitForSelector: '.Box-row', // Wait for repo list to load
      });

      if (!result.success) {
        errors.push(`Failed to fetch ${language || 'all'}: ${result.error}`);
        continue;
      }

      // Parse HTML
      const entries = parseGitHubTrendingHtml(result.html);

      // Filter for AI/ML related repositories
      const aiEntries = filterAIEntries(entries);

      // Tag with language if specified
      if (language) {
        aiEntries.forEach(entry => {
          entry.category = `${language} - GitHub Trending`;
        });
      }

      allEntries.push(...aiEntries);

      // Rate limiting: wait 2 seconds between requests
      if (languages.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      errors.push(
        `Error fetching ${language || 'all'}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // Log to database
  if (crawlSessionId) {
    await prisma.researchLog.create({
      data: {
        action: 'crawl_github_trending',
        agentId: crawlSessionId,
        details: {
          languages,
          since,
          entriesFound: allEntries.length,
          errors: errors.length > 0 ? errors : undefined,
        },
      },
    });
  }

  return {
    success: errors.length === 0 || allEntries.length > 0,
    entries: allEntries,
    sourceUrl: 'https://github.com/trending',
    crawledAt: new Date(),
    error: errors.length > 0 ? errors.join('; ') : undefined,
  };
}

// ============================================
// DISCOVERY INTEGRATION
// ============================================

/**
 * Process crawl results into entity discoveries for a project
 */
export async function processDiscoveries(
  crawlResult: CrawlResult,
  projectId: string,
  sourceId: string
): Promise<{
  created: number;
  skipped: number;
  errors: string[];
}> {
  const created: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const entry of crawlResult.entries) {
    try {
      // Check if entity already exists
      const existing = await prisma.entity.findFirst({
        where: {
          projectId,
          name: entry.name,
        },
      });

      if (existing) {
        skipped.push(entry.name);
        continue;
      }

      // Create entity
      const entity = await prisma.entity.create({
        data: {
          projectId,
          name: entry.name,
          description: entry.description,
          url: entry.url,
          entityType: 'tool',
        },
      });

      // Create initial assertion with category
      await prisma.assertion.create({
        data: {
          entityId: entity.id,
          claim: `Discovered from ${entry.category}`,
          category: 'discovery',
          sources: {
            create: {
              sourceId,
              quote: entry.description,
            },
          },
        },
      });

      created.push(entity.name);
    } catch (error) {
      errors.push(
        `Error creating ${entry.name}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return {
    created: created.length,
    skipped: skipped.length,
    errors,
  };
}

