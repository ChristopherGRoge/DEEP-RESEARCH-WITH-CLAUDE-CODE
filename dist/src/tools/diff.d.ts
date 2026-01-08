/**
 * Extraction Diff - Track Changes Over Time
 *
 * Compare extractions to see what changed:
 * - Price changes
 * - Feature additions/removals
 * - Compliance status updates
 * - Any data evolution
 */
export interface DiffChange {
    path: string;
    type: 'added' | 'removed' | 'changed';
    oldValue?: any;
    newValue?: any;
}
export interface ExtractionDiff {
    entityId: string;
    entityName: string;
    schemaType: string;
    hasChanges: boolean;
    changes: DiffChange[];
    summary: {
        added: number;
        removed: number;
        changed: number;
        total: number;
    };
    oldExtraction: {
        id: string;
        extractedAt: Date;
        sourceUrl: string;
    };
    newExtraction: {
        id: string;
        extractedAt: Date;
        sourceUrl: string;
    };
    daysBetween: number;
}
export interface ExtractionHistoryItem {
    id: string;
    extractedAt: Date;
    status: string;
    confidence: number | null;
    sourceUrl: string;
    screenshotPath: string | null;
    dataPreview: any;
}
export interface ExtractionHistory {
    entityId: string;
    entityName: string;
    schemaType: string;
    totalExtractions: number;
    extractions: ExtractionHistoryItem[];
    firstExtraction: Date | null;
    latestExtraction: Date | null;
    averageDaysBetween: number | null;
}
/**
 * Get extraction history for an entity and schema type
 */
export declare function getExtractionHistory(input: {
    entityId: string;
    schemaType: string;
    limit?: number;
}): Promise<ExtractionHistory | null>;
/**
 * Compare two extractions and return differences
 */
export declare function diffExtractions(input: {
    oldExtractionId: string;
    newExtractionId: string;
}): Promise<ExtractionDiff | null>;
/**
 * Get diff between latest and previous extraction for an entity
 */
export declare function getLatestDiff(input: {
    entityId: string;
    schemaType: string;
}): Promise<ExtractionDiff | {
    message: string;
    extractionCount: number;
} | null>;
/**
 * Find entities with recent changes (extractions that differ from previous)
 */
export declare function findRecentChanges(input: {
    projectId: string;
    schemaType?: string;
    daysBack?: number;
}): Promise<{
    entitiesWithChanges: Array<{
        entityId: string;
        entityName: string;
        schemaType: string;
        changeCount: number;
        latestChange: Date;
        changeTypes: {
            added: number;
            removed: number;
            changed: number;
        };
    }>;
    summary: {
        entitiesChecked: number;
        entitiesWithChanges: number;
        totalChanges: number;
    };
}>;
/**
 * Get a human-readable summary of changes
 */
export declare function summarizeChanges(changes: DiffChange[]): string[];
//# sourceMappingURL=diff.d.ts.map