import { prisma } from '../../db/client.js';

// Configuration for Reddit crawler
export interface RedditCrawlerConfig {
  subreddit: string;
  sortBy: 'hot' | 'new' | 'top' | 'rising';
  timeFrame?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';  // For 'top'
  limit?: number;  // Max 100
  minScore?: number;
  aiKeywords?: string[];
  sourceId: string;
}

// Reddit post data structure
export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  url: string;
  permalink: string;
  score: number;
  numComments: number;
  created: Date;
  author: string;
  flair?: string;
}

// Result from crawling operation
export interface RedditCrawlResult {
  success: boolean;
  posts: RedditPost[];
  discoveries: RedditToolDiscovery[];
  error?: string;
  crawlSessionId: string;
  metadata: {
    subreddit: string;
    sortBy: string;
    postsProcessed: number;
    toolMentionsFound: number;
  };
}

// Tool discovery from Reddit content
export interface RedditToolDiscovery {
  toolName: string;
  mentionContext: string;
  postTitle: string;
  postUrl: string;
  score: number;
  created: Date;
}

// Rate limiting configuration
const REDDIT_RATE_LIMIT = 60; // requests per minute
let lastRequestTime = 0;

/**
 * Rate-limited fetch with proper User-Agent header for Reddit
 */
async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  const minDelay = 1000 / (REDDIT_RATE_LIMIT / 60); // ms between requests

  if (timeSinceLastRequest < minDelay) {
    await sleep(minDelay - timeSinceLastRequest);
  }

  lastRequestTime = Date.now();

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'DeepResearch/1.0 (research tool for entity discovery)'
      }
    });

    if (!response.ok) {
      throw new Error(`Reddit API returned ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to fetch from Reddit: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Build Reddit JSON API URL
 */
function buildRedditUrl(config: RedditCrawlerConfig): string {
  const { subreddit, sortBy, timeFrame, limit = 25 } = config;

  // Enforce Reddit's limit
  const effectiveLimit = Math.min(limit, 100);

  let url = `https://www.reddit.com/r/${subreddit}/${sortBy}.json?limit=${effectiveLimit}`;

  // Add time frame for 'top' sort
  if (sortBy === 'top' && timeFrame) {
    url += `&t=${timeFrame}`;
  }

  return url;
}

/**
 * Parse Reddit API response
 */
function parseRedditResponse(data: any): RedditPost[] {
  if (!data?.data?.children) {
    return [];
  }

  return data.data.children
    .filter((child: any) => child.kind === 't3') // t3 = link/post
    .map((child: any) => {
      const post = child.data;
      return {
        id: post.id,
        title: post.title || '',
        selftext: post.selftext || '',
        url: post.url || '',
        permalink: `https://www.reddit.com${post.permalink}`,
        score: post.score || 0,
        numComments: post.num_comments || 0,
        created: new Date(post.created_utc * 1000),
        author: post.author || '[deleted]',
        flair: post.link_flair_text || undefined
      };
    });
}

/**
 * Filter posts by score threshold
 */
function filterByScore(posts: RedditPost[], minScore?: number): RedditPost[] {
  if (minScore === undefined) return posts;
  return posts.filter(post => post.score >= minScore);
}

/**
 * Filter posts by AI keywords
 */
function filterByKeywords(posts: RedditPost[], keywords?: string[]): RedditPost[] {
  if (!keywords || keywords.length === 0) return posts;

  const lowerKeywords = keywords.map(k => k.toLowerCase());

  return posts.filter(post => {
    const content = `${post.title} ${post.selftext}`.toLowerCase();
    return lowerKeywords.some(keyword => content.includes(keyword));
  });
}

/**
 * Extract tool mentions from post content
 */
function extractToolMentions(posts: RedditPost[]): RedditToolDiscovery[] {
  const discoveries: RedditToolDiscovery[] = [];

  // Common AI tool patterns
  const toolPatterns = [
    // Code assistants
    /\b(cursor|copilot|codeium|tabnine|cody|amazon q|kite|sourcegraph|windsurf)\b/gi,
    // IDEs with AI
    /\b(cursor|replit|github codespaces|gitpod)\b/gi,
    // AI coding tools
    /\b(aider|continue|mutableai|bloop|phind|codewhisperer)\b/gi,
    // Tools mentioned with version or qualifier
    /\b([A-Z][a-zA-Z]+)\s+(?:ai|assistant|copilot|code\s+assistant)\b/gi
  ];

  for (const post of posts) {
    const content = `${post.title} ${post.selftext}`;
    const foundTools = new Set<string>();

    for (const pattern of toolPatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const toolName = match[1] || match[0];
        const normalized = normalizeToolName(toolName);

        if (normalized && !foundTools.has(normalized)) {
          foundTools.add(normalized);

          // Extract context (50 chars before and after)
          const matchIndex = content.indexOf(match[0]);
          const start = Math.max(0, matchIndex - 50);
          const end = Math.min(content.length, matchIndex + match[0].length + 50);
          const context = content.slice(start, end).trim();

          discoveries.push({
            toolName: normalized,
            mentionContext: context,
            postTitle: post.title,
            postUrl: post.permalink,
            score: post.score,
            created: post.created
          });
        }
      }
    }
  }

  return discoveries;
}

/**
 * Normalize tool name (capitalize, remove extra spaces)
 */
function normalizeToolName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length < 2) return '';

  // Capitalize first letter
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Crawl a subreddit using Reddit's JSON endpoint
 */
export async function crawlSubreddit(
  config: RedditCrawlerConfig,
  crawlSessionId: string
): Promise<RedditCrawlResult> {
  try {
    // Build URL
    const url = buildRedditUrl(config);
    console.log(`Fetching: ${url}`);

    // Fetch from Reddit
    const response = await rateLimitedFetch(url);
    const data = await response.json();

    // Parse posts
    let posts = parseRedditResponse(data);
    console.log(`Fetched ${posts.length} posts from r/${config.subreddit}`);

    // Apply filters
    posts = filterByScore(posts, config.minScore);
    console.log(`After score filter: ${posts.length} posts`);

    posts = filterByKeywords(posts, config.aiKeywords);
    console.log(`After keyword filter: ${posts.length} posts`);

    // Extract tool mentions
    const discoveries = extractToolMentions(posts);
    console.log(`Found ${discoveries.length} tool mentions`);

    // Return result
    return {
      success: true,
      posts,
      discoveries,
      crawlSessionId,
      metadata: {
        subreddit: config.subreddit,
        sortBy: config.sortBy,
        postsProcessed: posts.length,
        toolMentionsFound: discoveries.length
      }
    };
  } catch (error) {
    console.error('Reddit crawl failed:', error);
    return {
      success: false,
      posts: [],
      discoveries: [],
      crawlSessionId,
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: {
        subreddit: config.subreddit,
        sortBy: config.sortBy,
        postsProcessed: 0,
        toolMentionsFound: 0
      }
    };
  }
}

/**
 * Fetch post comments (optional, for additional context)
 */
export async function fetchPostComments(permalink: string, limit: number = 10): Promise<string[]> {
  try {
    // Construct JSON URL
    const url = `https://www.reddit.com${permalink}.json?limit=${limit}`;

    const response = await rateLimitedFetch(url);
    const data = await response.json();

    // Reddit returns [post_data, comments_data]
    if (!Array.isArray(data) || data.length < 2) {
      return [];
    }

    const commentsData = data[1];
    if (!commentsData?.data?.children) {
      return [];
    }

    const comments: string[] = [];

    for (const child of commentsData.data.children) {
      if (child.kind === 't1' && child.data?.body) {
        comments.push(child.data.body);
        if (comments.length >= limit) break;
      }
    }

    return comments;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
}

/**
 * Crawl multiple subreddits in sequence
 */
export async function crawlMultipleSubreddits(
  configs: RedditCrawlerConfig[],
  crawlSessionId: string
): Promise<RedditCrawlResult[]> {
  const results: RedditCrawlResult[] = [];

  for (const config of configs) {
    const result = await crawlSubreddit(config, crawlSessionId);
    results.push(result);

    // Be nice to Reddit - wait between subreddit crawls
    if (configs.indexOf(config) < configs.length - 1) {
      await sleep(2000);
    }
  }

  return results;
}

/**
 * Aggregate discoveries from multiple crawl results
 */
export function aggregateDiscoveries(results: RedditCrawlResult[]): {
  toolCounts: Map<string, number>;
  topTools: Array<{ name: string; mentions: number }>;
  allDiscoveries: RedditToolDiscovery[];
} {
  const toolCounts = new Map<string, number>();
  const allDiscoveries: RedditToolDiscovery[] = [];

  for (const result of results) {
    for (const discovery of result.discoveries) {
      allDiscoveries.push(discovery);

      const current = toolCounts.get(discovery.toolName) || 0;
      toolCounts.set(discovery.toolName, current + 1);
    }
  }

  // Sort by mention count
  const topTools = Array.from(toolCounts.entries())
    .map(([name, mentions]) => ({ name, mentions }))
    .sort((a, b) => b.mentions - a.mentions);

  return {
    toolCounts,
    topTools,
    allDiscoveries
  };
}

/**
 * Example usage configurations
 */
export const EXAMPLE_CONFIGS = {
  aiProgramming: {
    subreddit: 'programming',
    sortBy: 'hot' as const,
    limit: 50,
    minScore: 10,
    aiKeywords: ['ai', 'copilot', 'assistant', 'llm', 'gpt', 'claude', 'code generation']
  },
  aiTools: {
    subreddit: 'ArtificialIntelligence',
    sortBy: 'top' as const,
    timeFrame: 'week' as const,
    limit: 25,
    minScore: 5,
    aiKeywords: ['tool', 'coding', 'development', 'ide']
  },
  localLLM: {
    subreddit: 'LocalLLaMA',
    sortBy: 'hot' as const,
    limit: 50,
    minScore: 5,
    aiKeywords: ['code', 'coding', 'programming', 'ide', 'assistant']
  }
};
