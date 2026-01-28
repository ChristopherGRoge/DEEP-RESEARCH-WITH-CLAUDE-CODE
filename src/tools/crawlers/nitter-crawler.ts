/**
 * Twitter/X Crawler using Nitter Instances
 *
 * Crawls Twitter/X content via open-source Nitter frontends to discover:
 * - Tool announcements from tech accounts
 * - Developer community discussions
 * - Trending AI/dev tools
 *
 * Uses RSS feeds for account timelines and HTML parsing for search results.
 */

import * as Parser from 'rss-parser';
import * as crypto from 'crypto';

const RSSParser = (Parser as any).default || Parser;

// ============================================
// TYPES
// ============================================

export interface NitterAccountConfig {
  handle: string;          // Without @ (e.g., "github")
  sourceId: string;        // ID of Source record
  maxItems?: number;       // Max tweets to process (default: 50)
}

export interface NitterSearchConfig {
  query: string;           // Search query (e.g., "AI coding assistant")
  sourceId: string;        // ID of Source record
  maxItems?: number;       // Max tweets to process (default: 50)
}

export interface Tweet {
  id: string;
  text: string;
  url: string;
  author: string;
  authorHandle: string;
  timestamp: Date;
  links: string[];         // URLs mentioned in tweet
  retweets?: number;
  likes?: number;
}

export interface CrawlResult {
  success: boolean;
  sourceId: string;
  instanceUsed?: string;   // Which Nitter instance worked
  tweets: Tweet[];
  discoveries: Discovery[];
  error?: string;
}

export interface Discovery {
  name: string;            // Tool/entity name
  url?: string;            // Website URL if found
  mentionContext: string;  // Tweet text mentioning it
  tweetUrl: string;        // Source tweet
  confidence: number;      // 0-1 confidence score
}

// ============================================
// NITTER INSTANCES
// ============================================

const NITTER_INSTANCES = [
  'nitter.poast.org',
  'nitter.privacydev.net',
  'xcancel.com',
  'nitter.unixfox.eu',
  'nitter.net',
  'nitter.fdn.fr',
  'nitter.1d4.us',
  'nitter.kavin.rocks',
];

// Tool mention patterns
const TOOL_PATTERNS = {
  // URLs to tool websites (.ai, .io, .dev, github repos)
  toolUrl: /https?:\/\/(?:[\w-]+\.)?(?:[\w-]+\.(?:ai|io|dev|co|com)(?:\/\S*)?|github\.com\/[\w-]+\/[\w-]+)/gi,

  // Common announcement phrases
  announcement: /(?:introducing|launching|released?|announcing|built|created|made)\s+([A-Z][\w-]*(?:\s+[A-Z][\w-]*)?)/g,

  // Capitalized tool names (often followed by descriptive text)
  toolName: /\b([A-Z][a-z]+(?:[A-Z][a-z]+)*)\s+(?:is\s+)?(?:a|an)\s+(?:new\s+)?(?:AI|tool|framework|library|assistant|agent)/gi,

  // GitHub mentions
  githubMention: /@[\w-]+\/[\w-]+|github\.com\/([\w-]+\/[\w-]+)/gi,
};

// ============================================
// INSTANCE MANAGEMENT
// ============================================

/**
 * Find a working Nitter instance
 * Tests instances sequentially until one responds
 */
async function getWorkingInstance(): Promise<string> {
  const timeout = 5000;

  console.log(`[Nitter] Checking ${NITTER_INSTANCES.length} instances...`);

  for (const instance of NITTER_INSTANCES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`https://${instance}`, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`[Nitter] ✓ Using instance: ${instance}`);
        return instance;
      }
      console.log(`[Nitter] ✗ ${instance} returned ${response.status}`);
    } catch (error) {
      // Instance unavailable, try next
      console.log(`[Nitter] ✗ ${instance} failed: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
  }

  throw new Error('No working Nitter instance found. All instances are down.');
}

/**
 * Test all instances and return working ones
 */
export async function testAllInstances(): Promise<string[]> {
  const working: string[] = [];

  for (const instance of NITTER_INSTANCES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`https://${instance}`, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        working.push(instance);
      }
    } catch {
      // Skip failed instances
    }
  }

  return working;
}

// ============================================
// ACCOUNT CRAWLING (RSS)
// ============================================

/**
 * Crawl a Twitter account via Nitter RSS feed
 *
 * Example: crawlAccount({ handle: "github", sourceId: "abc123", maxItems: 50 })
 * Fetches: https://nitter.net/github/rss
 */
export async function crawlAccount(config: NitterAccountConfig): Promise<CrawlResult> {
  const { handle, sourceId, maxItems = 50 } = config;

  console.log(`[Nitter] Starting crawl for @${handle}`);

  try {
    const instance = await getWorkingInstance();
    const rssUrl = `https://${instance}/${handle}/rss`;

    console.log(`[Nitter] Fetching RSS: ${rssUrl}`);

    const parser = new RSSParser({
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const feed = await parser.parseURL(rssUrl);

    if (!feed.items || feed.items.length === 0) {
      return {
        success: false,
        sourceId,
        tweets: [],
        discoveries: [],
        error: 'No tweets found in RSS feed',
      };
    }

    // Parse tweets from RSS items
    const tweets: Tweet[] = feed.items.slice(0, maxItems).map((item: any) => parseTweetFromRSS(item, instance));

    // Extract tool discoveries
    const discoveries = extractDiscoveries(tweets);

    console.log(`✓ Crawled @${handle}: ${tweets.length} tweets, ${discoveries.length} discoveries`);

    return {
      success: true,
      sourceId,
      instanceUsed: instance,
      tweets,
      discoveries,
    };
  } catch (error) {
    return {
      success: false,
      sourceId,
      tweets: [],
      discoveries: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Parse tweet data from RSS feed item
 */
function parseTweetFromRSS(item: any, instance: string): Tweet {
  // RSS item structure from Nitter:
  // - title: "Username (@handle)"
  // - link: "https://nitter.net/username/status/123456789"
  // - pubDate: ISO date string
  // - description: Tweet HTML content

  const text = stripHtml(item.content || item.description || '');
  const links = extractLinks(item.content || item.description || '');

  // Extract tweet ID from URL
  const tweetId = item.link?.match(/status\/(\d+)/)?.[1] || crypto.randomBytes(8).toString('hex');

  // Parse author from title "Username (@handle)"
  const authorMatch = item.title?.match(/^(.+?)\s+\(@([\w]+)\)/) || ['', 'Unknown', 'unknown'];

  return {
    id: tweetId,
    text,
    url: item.link || '',
    author: authorMatch[1],
    authorHandle: authorMatch[2],
    timestamp: item.pubDate ? new Date(item.pubDate) : new Date(),
    links,
  };
}

/**
 * Strip HTML tags and decode entities
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Extract URLs from HTML content
 */
function extractLinks(html: string): string[] {
  const links: string[] = [];
  const linkRegex = /href="([^"]+)"/g;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    // Skip Nitter internal links and twitter.com links
    if (!url.includes('nitter.') && !url.includes('twitter.com') && !url.includes('x.com')) {
      if (url.startsWith('http')) {
        links.push(url);
      }
    }
  }

  return Array.from(new Set(links)); // Deduplicate
}

// ============================================
// SEARCH CRAWLING (HTML)
// ============================================

/**
 * Crawl Twitter search results via Nitter HTML
 *
 * Example: crawlSearch({ query: "AI coding assistant", sourceId: "abc123" })
 * Fetches: https://nitter.net/search?q=AI+coding+assistant&f=tweets
 */
export async function crawlSearch(config: NitterSearchConfig): Promise<CrawlResult> {
  const { query, sourceId, maxItems = 50 } = config;

  try {
    const instance = await getWorkingInstance();
    const searchUrl = `https://${instance}/search?q=${encodeURIComponent(query)}&f=tweets`;

    console.log(`Fetching search results: ${searchUrl}`);

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        sourceId,
        tweets: [],
        discoveries: [],
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const html = await response.text();
    const tweets = parseTweetsFromSearchHTML(html, instance);

    // Limit to maxItems
    const limitedTweets = tweets.slice(0, maxItems);

    // Extract discoveries
    const discoveries = extractDiscoveries(limitedTweets);

    console.log(`✓ Search "${query}": ${limitedTweets.length} tweets, ${discoveries.length} discoveries`);

    return {
      success: true,
      sourceId,
      instanceUsed: instance,
      tweets: limitedTweets,
      discoveries,
    };
  } catch (error) {
    return {
      success: false,
      sourceId,
      tweets: [],
      discoveries: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Parse tweets from Nitter search HTML
 *
 * Note: This is a simplified parser. Nitter HTML structure may vary.
 * For production use, consider using a proper HTML parser like cheerio or jsdom.
 */
function parseTweetsFromSearchHTML(html: string, instance: string): Tweet[] {
  const tweets: Tweet[] = [];

  // Regex-based parsing (simple but fragile)
  // Nitter structure: <div class="timeline-item">...</div>
  const tweetRegex = /<div class="timeline-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  let match;

  while ((match = tweetRegex.exec(html)) !== null) {
    const tweetHtml = match[1];

    // Extract tweet URL
    const urlMatch = tweetHtml.match(/href="(\/[\w]+\/status\/\d+)"/);
    const tweetUrl = urlMatch ? `https://${instance}${urlMatch[1]}` : '';
    const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1] || '';

    // Extract author
    const authorMatch = tweetHtml.match(/class="[^"]*username[^"]*"[^>]*>@?([\w]+)/);
    const authorHandle = authorMatch?.[1] || 'unknown';

    // Extract tweet text
    const textMatch = tweetHtml.match(/class="[^"]*tweet-content[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const text = textMatch ? stripHtml(textMatch[1]) : '';

    // Extract timestamp
    const timeMatch = tweetHtml.match(/title="([^"]+)"/);
    const timestamp = timeMatch ? new Date(timeMatch[1]) : new Date();

    // Extract links
    const links = extractLinks(tweetHtml);

    if (tweetId && text) {
      tweets.push({
        id: tweetId,
        text,
        url: tweetUrl,
        author: authorHandle,
        authorHandle,
        timestamp,
        links,
      });
    }
  }

  return tweets;
}

// ============================================
// DISCOVERY EXTRACTION
// ============================================

/**
 * Extract tool/entity discoveries from tweets
 */
export function extractDiscoveries(tweets: Tweet[]): Discovery[] {
  const discoveries: Discovery[] = [];
  const seen = new Set<string>(); // Deduplication

  for (const tweet of tweets) {
    // Extract URL mentions (high confidence)
    const urlMatches = Array.from(tweet.text.matchAll(TOOL_PATTERNS.toolUrl));
    for (const match of urlMatches) {
      const url = match[0];
      const name = extractNameFromUrl(url);
      const key = `${name}-${url}`.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        discoveries.push({
          name,
          url,
          mentionContext: truncateContext(tweet.text),
          tweetUrl: tweet.url,
          confidence: 0.9, // High confidence - explicit URL
        });
      }
    }

    // Extract announcement patterns (medium confidence)
    const announcements = Array.from(tweet.text.matchAll(TOOL_PATTERNS.announcement));
    for (const match of announcements) {
      const name = match[1].trim();
      const key = name.toLowerCase();

      if (!seen.has(key) && name.length > 2) {
        seen.add(key);

        // Try to find a URL in the same tweet
        const url = tweet.links[0]; // First link might be the tool URL

        discoveries.push({
          name,
          url,
          mentionContext: truncateContext(tweet.text),
          tweetUrl: tweet.url,
          confidence: 0.7, // Medium confidence - pattern match
        });
      }
    }

    // Extract tool name patterns (lower confidence)
    const toolNames = Array.from(tweet.text.matchAll(TOOL_PATTERNS.toolName));
    for (const match of toolNames) {
      const name = match[1].trim();
      const key = name.toLowerCase();

      if (!seen.has(key) && name.length > 2 && !isCommonWord(name)) {
        seen.add(key);

        // Try to find a URL in the same tweet
        const url = tweet.links.find(link =>
          link.toLowerCase().includes(name.toLowerCase())
        );

        discoveries.push({
          name,
          url,
          mentionContext: truncateContext(tweet.text),
          tweetUrl: tweet.url,
          confidence: 0.5, // Lower confidence - might be false positive
        });
      }
    }

    // Extract GitHub mentions (medium confidence)
    const githubMatches = Array.from(tweet.text.matchAll(TOOL_PATTERNS.githubMention));
    for (const match of githubMatches) {
      const repoPath = match[1] || match[0].replace('@', '');
      const name = repoPath.split('/')[1] || repoPath;
      const key = repoPath.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        discoveries.push({
          name,
          url: `https://github.com/${repoPath}`,
          mentionContext: truncateContext(tweet.text),
          tweetUrl: tweet.url,
          confidence: 0.8, // Good confidence - GitHub repos are entities
        });
      }
    }
  }

  // Sort by confidence
  return discoveries.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Extract tool name from URL
 */
function extractNameFromUrl(url: string): string {
  try {
    const parsed = new URL(url);

    // GitHub repos: extract repo name
    if (parsed.hostname === 'github.com') {
      const parts = parsed.pathname.split('/').filter(Boolean);
      return parts[1] || parts[0] || parsed.hostname;
    }

    // Extract domain name (remove TLD)
    const domain = parsed.hostname.replace(/^www\./, '');
    const parts = domain.split('.');

    // Return first part, capitalized
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch {
    return 'Unknown';
  }
}

/**
 * Truncate context to 200 chars
 */
function truncateContext(text: string): string {
  if (text.length <= 200) return text;
  return text.substring(0, 197) + '...';
}

/**
 * Filter out common English words that aren't tool names
 */
function isCommonWord(word: string): boolean {
  const common = new Set([
    'The', 'This', 'That', 'These', 'Those', 'What', 'Where', 'When', 'Why', 'How',
    'With', 'Without', 'About', 'After', 'Before', 'During', 'Using', 'Based',
    'Some', 'Many', 'Most', 'Every', 'Each', 'All', 'Both', 'Either', 'Neither',
    'Great', 'Good', 'Best', 'Better', 'New', 'Old', 'First', 'Last', 'Next',
    'Just', 'Only', 'Still', 'Also', 'Even', 'Never', 'Always', 'Sometimes',
  ]);
  return common.has(word);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get account info without crawling (just test if account exists)
 */
export async function checkAccountExists(handle: string): Promise<{
  exists: boolean;
  instance?: string;
  error?: string;
}> {
  try {
    const instance = await getWorkingInstance();
    const url = `https://${instance}/${handle}`;

    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    return {
      exists: response.ok,
      instance,
    };
  } catch (error) {
    return {
      exists: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Parse tweets from raw RSS XML string (useful for testing)
 */
export async function parseTweetsFromRSS(rssXml: string): Promise<Tweet[]> {
  const parser = new RSSParser();
  const feed = await parser.parseString(rssXml);

  return feed.items.map((item: any) => parseTweetFromRSS(item, 'nitter.net'));
}
