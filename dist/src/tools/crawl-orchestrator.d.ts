/**
 * Crawl Orchestrator - Coordinate discovery crawls across all source types
 *
 * This orchestrates systematic crawling of curated sources (HN, Reddit, GitHub, RSS, etc.)
 * to discover new entities matching research criteria.
 */
import type { DiscoverySource } from '../../generated/prisma/client';
export interface CrawlConfig {
    projectId: string;
    sourceTypes?: string[];
    sourceIds?: string[];
    researchFocus?: string;
    maxSources?: number;
    concurrency?: number;
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
    duration: number;
    sourcesProcessed: number;
    sourcesFailed: number;
    discoveriesFound: number;
    entitiesCreated: number;
    entitiesMatched: number;
    errors: string[];
}
/**
 * Start a discovery crawl
 */
export declare function startDiscoveryCrawl(config: CrawlConfig): Promise<{
    crawlId: string;
    sourcesToCrawl: number;
}>;
/**
 * Get crawl status
 */
export declare function getCrawlStatus(crawlId: string): Promise<CrawlProgress | null>;
/**
 * Pause a crawl
 */
export declare function pauseCrawl(crawlId: string): Promise<boolean>;
/**
 * Resume a paused crawl
 */
export declare function resumeCrawl(crawlId: string): Promise<boolean>;
/**
 * Cancel a crawl
 */
export declare function cancelCrawl(crawlId: string): Promise<boolean>;
/**
 * Get crawl history
 */
export declare function getCrawlHistory(projectId: string, limit?: number): Promise<any[]>;
/**
 * Get sources due for crawl based on frequency
 */
export declare function getSourcesDueForCrawl(): Promise<DiscoverySource[]>;
/**
 * Run scheduled crawl (call from cron)
 */
export declare function runScheduledCrawl(projectId: string): Promise<CrawlResult>;
//# sourceMappingURL=crawl-orchestrator.d.ts.map