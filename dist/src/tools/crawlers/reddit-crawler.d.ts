export interface RedditCrawlerConfig {
    subreddit: string;
    sortBy: 'hot' | 'new' | 'top' | 'rising';
    timeFrame?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
    limit?: number;
    minScore?: number;
    aiKeywords?: string[];
    sourceId: string;
}
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
export interface RedditToolDiscovery {
    toolName: string;
    mentionContext: string;
    postTitle: string;
    postUrl: string;
    score: number;
    created: Date;
}
/**
 * Crawl a subreddit using Reddit's JSON endpoint
 */
export declare function crawlSubreddit(config: RedditCrawlerConfig, crawlSessionId: string): Promise<RedditCrawlResult>;
/**
 * Fetch post comments (optional, for additional context)
 */
export declare function fetchPostComments(permalink: string, limit?: number): Promise<string[]>;
/**
 * Crawl multiple subreddits in sequence
 */
export declare function crawlMultipleSubreddits(configs: RedditCrawlerConfig[], crawlSessionId: string): Promise<RedditCrawlResult[]>;
/**
 * Aggregate discoveries from multiple crawl results
 */
export declare function aggregateDiscoveries(results: RedditCrawlResult[]): {
    toolCounts: Map<string, number>;
    topTools: Array<{
        name: string;
        mentions: number;
    }>;
    allDiscoveries: RedditToolDiscovery[];
};
/**
 * Example usage configurations
 */
export declare const EXAMPLE_CONFIGS: {
    aiProgramming: {
        subreddit: string;
        sortBy: "hot";
        limit: number;
        minScore: number;
        aiKeywords: string[];
    };
    aiTools: {
        subreddit: string;
        sortBy: "top";
        timeFrame: "week";
        limit: number;
        minScore: number;
        aiKeywords: string[];
    };
    localLLM: {
        subreddit: string;
        sortBy: "hot";
        limit: number;
        minScore: number;
        aiKeywords: string[];
    };
};
//# sourceMappingURL=reddit-crawler.d.ts.map