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
export declare const HN_AI_KEYWORDS: string[];
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
    url?: string;
    text?: string;
    score: number;
    by: string;
    time: number;
    descendants: number;
    type: 'story' | 'job' | 'poll';
    kids?: number[];
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
    context: string;
}
/**
 * Main crawler entry point - discovers AI tools from Hacker News
 */
export declare function crawlHackerNews(config: HNCrawlerConfig): Promise<HNCrawlResult>;
/**
 * Fetch a single story by ID
 */
export declare function fetchStory(id: number): Promise<HNStory | null>;
/**
 * Fetch multiple stories in parallel with concurrency limit
 */
export declare function fetchStoriesParallel(ids: number[], concurrency?: number): Promise<HNStory[]>;
/**
 * Fetch top N comments for a story
 */
export declare function fetchStoryComments(storyId: number, limit?: number): Promise<string[]>;
/**
 * Detect if story is a product launch announcement
 */
export declare function isToolAnnouncement(story: HNStory): boolean;
/**
 * Persist discovered tools to database
 */
export declare function persistDiscoveries(discoveries: DiscoveredTool[], projectId: string, sourceId?: string): Promise<{
    entitiesCreated: number;
    assertionsCreated: number;
    errors: string[];
}>;
/**
 * Crawl and persist in one step
 */
export declare function crawlAndPersist(config: HNCrawlerConfig & {
    projectId: string;
}): Promise<HNCrawlResult & {
    entitiesCreated: number;
    assertionsCreated: number;
}>;
/**
 * Quick crawl of Show HN stories (most likely to be product launches)
 */
export declare function crawlShowHN(projectId: string, limit?: number): Promise<HNCrawlResult>;
/**
 * Quick crawl of top stories with AI filter
 */
export declare function crawlTopAIStories(projectId: string, limit?: number): Promise<HNCrawlResult>;
//# sourceMappingURL=hn-crawler.d.ts.map