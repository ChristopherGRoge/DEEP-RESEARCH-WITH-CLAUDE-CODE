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
export interface NitterAccountConfig {
    handle: string;
    sourceId: string;
    maxItems?: number;
}
export interface NitterSearchConfig {
    query: string;
    sourceId: string;
    maxItems?: number;
}
export interface Tweet {
    id: string;
    text: string;
    url: string;
    author: string;
    authorHandle: string;
    timestamp: Date;
    links: string[];
    retweets?: number;
    likes?: number;
}
export interface CrawlResult {
    success: boolean;
    sourceId: string;
    instanceUsed?: string;
    tweets: Tweet[];
    discoveries: Discovery[];
    error?: string;
}
export interface Discovery {
    name: string;
    url?: string;
    mentionContext: string;
    tweetUrl: string;
    confidence: number;
}
/**
 * Test all instances and return working ones
 */
export declare function testAllInstances(): Promise<string[]>;
/**
 * Crawl a Twitter account via Nitter RSS feed
 *
 * Example: crawlAccount({ handle: "github", sourceId: "abc123", maxItems: 50 })
 * Fetches: https://nitter.net/github/rss
 */
export declare function crawlAccount(config: NitterAccountConfig): Promise<CrawlResult>;
/**
 * Crawl Twitter search results via Nitter HTML
 *
 * Example: crawlSearch({ query: "AI coding assistant", sourceId: "abc123" })
 * Fetches: https://nitter.net/search?q=AI+coding+assistant&f=tweets
 */
export declare function crawlSearch(config: NitterSearchConfig): Promise<CrawlResult>;
/**
 * Extract tool/entity discoveries from tweets
 */
export declare function extractDiscoveries(tweets: Tweet[]): Discovery[];
/**
 * Get account info without crawling (just test if account exists)
 */
export declare function checkAccountExists(handle: string): Promise<{
    exists: boolean;
    instance?: string;
    error?: string;
}>;
/**
 * Parse tweets from raw RSS XML string (useful for testing)
 */
export declare function parseTweetsFromRSS(rssXml: string): Promise<Tweet[]>;
//# sourceMappingURL=nitter-crawler.d.ts.map