/**
 * GitHub Crawler - Parse Awesome Lists and GitHub Trending
 *
 * Handles:
 * 1. Awesome list README parsing (with diff against previous)
 * 2. GitHub Trending page scraping
 *
 * Uses lightweight HTML parsing and respects GitHub rate limits.
 */
export interface GitHubListConfig {
    repoOwner: string;
    repoName: string;
    readmePath?: string;
    sourceId: string;
}
export interface GitHubTrendingConfig {
    languages?: string[];
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
export declare function parseAwesomeListMarkdown(markdown: string): AwesomeListEntry[];
/**
 * Crawl an Awesome list README from GitHub
 */
export declare function crawlAwesomeList(config: GitHubListConfig, crawlSessionId?: string): Promise<CrawlResult>;
/**
 * Diff two sets of Awesome list entries to find what's new or removed
 */
export declare function diffAwesomeList(currentEntries: AwesomeListEntry[], previousEntries: AwesomeListEntry[]): DiffResult;
/**
 * Crawl GitHub Trending page
 */
export declare function crawlGitHubTrending(config: GitHubTrendingConfig, crawlSessionId?: string): Promise<CrawlResult>;
/**
 * Process crawl results into entity discoveries for a project
 */
export declare function processDiscoveries(crawlResult: CrawlResult, projectId: string, sourceId: string): Promise<{
    created: number;
    skipped: number;
    errors: string[];
}>;
//# sourceMappingURL=github-crawler.d.ts.map