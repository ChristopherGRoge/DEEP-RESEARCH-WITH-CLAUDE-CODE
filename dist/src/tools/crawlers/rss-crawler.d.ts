/**
 * RSS Crawler - Extract Tool Mentions from RSS/Atom Feeds
 *
 * Fetches and parses RSS/Atom feeds to discover tools and products mentioned
 * in blog posts, announcements, and other syndicated content.
 *
 * Usage:
 *   npm run cli -- rss:crawl '{"feedUrl": "https://example.com/feed.xml", "sourceId": "...", "projectId": "..."}'
 */
export interface RSSCrawlerConfig {
    feedUrl: string;
    sourceId: string;
    projectId: string;
    maxAgeDays?: number;
    aiKeywords?: string[];
    extractLinks?: boolean;
    maxItems?: number;
    crawlSessionId?: string;
}
export interface RSSCrawlResult {
    success: boolean;
    discoveries: RawDiscoveryInput[];
    itemsProcessed: number;
    itemsFiltered: number;
    errors: string[];
    metadata?: {
        feedTitle?: string;
        feedUrl: string;
        crawledAt: Date;
        crawlSessionId: string;
    };
}
export interface RawDiscoveryInput {
    sourceId: string;
    projectId: string;
    mentionedName: string;
    briefDescription?: string;
    discoveryUrl: string;
    contextSnippet?: string;
    extractedLinks: string[];
    keywords: string[];
    discoveredAt: Date;
    crawlSessionId: string;
    confidence?: number;
}
export declare const DEFAULT_AI_KEYWORDS: string[];
/**
 * Crawl an RSS/Atom feed and extract tool mentions
 */
export declare function crawlRSSFeed(config: RSSCrawlerConfig): Promise<RSSCrawlResult>;
/**
 * Save discoveries to database as entities or assertions
 */
export declare function saveDiscoveries(discoveries: RawDiscoveryInput[]): Promise<{
    entitiesCreated: number;
    assertionsCreated: number;
    errors: string[];
}>;
/**
 * Get crawl statistics for a project
 */
export declare function getCrawlStats(projectId: string): Promise<{
    totalCrawls: number;
    totalDiscoveries: number;
    lastCrawlDate?: Date;
    crawlSessions: Array<{
        sessionId: string;
        crawledAt: Date;
        itemsProcessed: number;
        discoveriesFound: number;
    }>;
}>;
//# sourceMappingURL=rss-crawler.d.ts.map