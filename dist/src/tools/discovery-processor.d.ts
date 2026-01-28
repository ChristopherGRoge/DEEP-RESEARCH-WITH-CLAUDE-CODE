export interface DiscoveryProcessorInput {
    sourceId: string;
    mentionedName: string;
    briefDescription?: string;
    discoveryUrl: string;
    contextSnippet?: string;
    extractedLinks: string[];
    keywords: string[];
    crawlSessionId: string;
}
export interface DeduplicationResult {
    action: 'matched' | 'created' | 'review_needed';
    entityId?: string;
    entityName?: string;
    matchMethod?: string;
    confidence: number;
}
export interface ProcessingResult {
    success: boolean;
    rawDiscoveryId: string;
    deduplication: DeduplicationResult;
    assertionsCreated: number;
    error?: string;
}
/**
 * Multi-strategy entity matching
 * Returns the best match with confidence score
 */
export declare function findMatchingEntity(projectId: string, name: string, urls: string[], description?: string): Promise<DeduplicationResult>;
/**
 * Resolve a discovery to an entity (create or match)
 * Handles the full resolution flow with logging
 */
export declare function resolveDiscoveryToEntity(projectId: string, discovery: DiscoveryProcessorInput): Promise<{
    entityId: string;
    created: boolean;
    matchMethod?: string;
}>;
/**
 * Save a raw discovery to the database
 */
export declare function saveRawDiscovery(input: DiscoveryProcessorInput): Promise<string>;
/**
 * Process a raw discovery (dedup + entity resolution + assertion creation)
 */
export declare function processRawDiscovery(projectId: string, rawDiscoveryId: string): Promise<ProcessingResult>;
/**
 * Batch process all pending discoveries for a project
 */
export declare function processPendingDiscoveries(projectId: string, limit?: number): Promise<{
    processed: number;
    created: number;
    matched: number;
    errors: number;
}>;
/**
 * Get pending discoveries
 */
export declare function getPendingDiscoveries(projectId?: string, limit?: number): Promise<any[]>;
/**
 * Search discoveries
 */
export declare function searchDiscoveries(query: string, filters?: {
    sourceType?: string;
    processed?: boolean;
}): Promise<any[]>;
/**
 * Get discovery stats
 */
export declare function getDiscoveryStats(projectId: string): Promise<{
    total: number;
    processed: number;
    pending: number;
    entitiesCreated: number;
    entitiesMatched: number;
}>;
//# sourceMappingURL=discovery-processor.d.ts.map