interface TrendMetrics {
    velocity: number;
    sourceSpread: number;
    entityCount: number;
    mentionCount: number;
    growthRate: number;
}
interface DetectedTrend {
    name: string;
    description: string;
    category: string;
    keywords: string[];
    entityIds: string[];
    metrics: TrendMetrics;
    trendScore: number;
    emergingScore: number;
    isNew: boolean;
}
/**
 * Detect trends from recent discoveries and assertions
 */
export declare function detectTrends(projectId: string, options?: {
    windowDays?: number;
    minMentions?: number;
    minSources?: number;
}): Promise<DetectedTrend[]>;
/**
 * Save or update a trend
 */
export declare function saveTrend(projectId: string, trend: DetectedTrend): Promise<string>;
/**
 * Update trend with new metrics
 */
export declare function updateTrendMetrics(trendId: string, metrics: TrendMetrics): Promise<void>;
/**
 * List trends for a project
 */
export declare function listTrends(projectId: string, options?: {
    minScore?: number;
    category?: string;
    emerging?: boolean;
    limit?: number;
}): Promise<any[]>;
/**
 * Get trend details with related entities
 */
export declare function getTrendDetails(trendId: string): Promise<{
    trend: any;
    entities: any[];
    recentMentions: any[];
}>;
/**
 * Get trending entities (entities in high-scoring trends)
 */
export declare function getTrendingEntities(projectId: string, limit?: number): Promise<any[]>;
/**
 * Generate trend report
 */
export declare function generateTrendReport(projectId: string): Promise<{
    summary: string;
    topTrends: DetectedTrend[];
    emergingTrends: DetectedTrend[];
    categoryBreakdown: Record<string, number>;
}>;
/**
 * Export trends as markdown
 */
export declare function exportTrendsMarkdown(projectId: string): Promise<string>;
export {};
//# sourceMappingURL=trend-detector.d.ts.map