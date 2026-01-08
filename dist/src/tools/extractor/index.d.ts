/**
 * Structured Web Extractor - Main Module
 *
 * This is the PRIMARY tool for deep research. It extracts queryable structured
 * data from web pages, captures screenshots as evidence, and auto-generates
 * assertions.
 *
 * TWO MODES OF OPERATION:
 *
 * 1. FETCH + CLAUDE REASONING (Recommended - uses your Claude Max subscription)
 *    npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
 *    → Claude reads the cached content and extracts structured data
 *    npm run cli -- extract:save '{"entityId": "...", "schemaType": "pricing", "data": {...}}'
 *
 * 2. FULLY AUTOMATED (Requires ANTHROPIC_API_KEY)
 *    npm run cli -- extract:pricing '{"url": "...", "entityId": "..."}'
 */
import { SchemaType } from './schemas';
export * from './schemas';
export { validateUrl, closeBrowser } from './fetcher';
export interface FetchInput {
    url: string;
    entityId: string;
    screenshot?: boolean;
}
export interface FetchResult {
    success: boolean;
    cacheId?: string;
    cachePath?: string;
    screenshotPath?: string;
    url?: string;
    entityId?: string;
    entityName?: string;
    contentPreview?: string;
    error?: string;
}
export interface SaveExtractionInput {
    entityId: string;
    schemaType: SchemaType;
    data: unknown;
    url: string;
    screenshotPath?: string;
    confidence?: number;
    createAssertions?: boolean;
}
export interface SaveExtractionResult {
    success: boolean;
    extractionId?: string;
    assertionsCreated?: string[];
    error?: string;
}
export interface ExtractInput {
    url: string;
    entityId: string;
    schemaType: SchemaType;
    screenshot?: boolean;
    createAssertions?: boolean;
    expiresInDays?: number;
}
export interface ExtractResult {
    success: boolean;
    extractionId?: string;
    data?: unknown;
    screenshotPath?: string;
    assertionsCreated?: string[];
    sourceValidated?: boolean;
    confidence?: number;
    error?: string;
    cacheId?: string;
    cachePath?: string;
    needsManualExtraction?: boolean;
}
/**
 * Fetches a URL, captures screenshot, and caches content for Claude to analyze.
 * This is the first step when not using an API key.
 */
export declare function fetchForExtraction(input: FetchInput): Promise<FetchResult>;
/**
 * Read cached content for a previous fetch
 */
export declare function readCachedContent(cacheId: string): Promise<{
    success: boolean;
    data?: {
        url: string;
        entityId: string;
        entityName: string;
        fetchedAt: string;
        screenshotPath?: string;
        text: string;
    };
    error?: string;
}>;
/**
 * Saves pre-extracted data to the database.
 * Use this after Claude has analyzed the cached content.
 */
export declare function saveExtraction(input: SaveExtractionInput): Promise<SaveExtractionResult>;
/**
 * Full extraction - fetches URL and extracts data.
 * If ANTHROPIC_API_KEY is set, uses LLM extraction.
 * Otherwise, returns cached content for manual extraction.
 */
export declare function extract(input: ExtractInput): Promise<ExtractResult>;
export declare function extractPricing(url: string, entityId: string, options?: {
    screenshot?: boolean;
    createAssertions?: boolean;
}): Promise<ExtractResult>;
export declare function extractFeatures(url: string, entityId: string, options?: {
    screenshot?: boolean;
    createAssertions?: boolean;
}): Promise<ExtractResult>;
export declare function extractCompany(url: string, entityId: string, options?: {
    screenshot?: boolean;
    createAssertions?: boolean;
}): Promise<ExtractResult>;
export declare function extractCompliance(url: string, entityId: string, options?: {
    screenshot?: boolean;
    createAssertions?: boolean;
}): Promise<ExtractResult>;
export declare function extractIntegrations(url: string, entityId: string, options?: {
    screenshot?: boolean;
    createAssertions?: boolean;
}): Promise<ExtractResult>;
export declare function generateAssertionsFromData(entityId: string, schemaType: SchemaType, data: unknown, sourceUrl: string): Promise<string[]>;
export declare function getExtractions(entityId: string, schemaType?: SchemaType): Promise<({
    source: {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string;
        status: import("..").SourceStatus;
        validatedAt: Date | null;
        validatedBy: string | null;
        title: string | null;
        sourceType: string | null;
        lastFetchedAt: Date | null;
        lastStatusCode: number | null;
        contentHash: string | null;
        isAccessible: boolean;
    };
    screenshot: {
        id: string;
        url: string;
        fullPage: boolean;
        width: number | null;
        height: number | null;
        filePath: string;
        capturedAt: Date;
    } | null;
} & {
    error: string | null;
    data: import("@prisma/client/runtime/client").JsonValue;
    id: string;
    entityId: string;
    status: import("..").ExtractionStatus;
    confidence: number | null;
    sourceId: string;
    schemaType: string;
    rawQuotes: import("@prisma/client/runtime/client").JsonValue | null;
    extractedAt: Date;
    expiresAt: Date | null;
    screenshotId: string | null;
    assertionIds: string[];
})[]>;
export declare function getLatestExtraction(entityId: string, schemaType: SchemaType): Promise<({
    source: {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string;
        status: import("..").SourceStatus;
        validatedAt: Date | null;
        validatedBy: string | null;
        title: string | null;
        sourceType: string | null;
        lastFetchedAt: Date | null;
        lastStatusCode: number | null;
        contentHash: string | null;
        isAccessible: boolean;
    };
    screenshot: {
        id: string;
        url: string;
        fullPage: boolean;
        width: number | null;
        height: number | null;
        filePath: string;
        capturedAt: Date;
    } | null;
} & {
    error: string | null;
    data: import("@prisma/client/runtime/client").JsonValue;
    id: string;
    entityId: string;
    status: import("..").ExtractionStatus;
    confidence: number | null;
    sourceId: string;
    schemaType: string;
    rawQuotes: import("@prisma/client/runtime/client").JsonValue | null;
    extractedAt: Date;
    expiresAt: Date | null;
    screenshotId: string | null;
    assertionIds: string[];
}) | null>;
export declare function getStaleExtractions(projectId?: string): Promise<({
    source: {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string;
        status: import("..").SourceStatus;
        validatedAt: Date | null;
        validatedBy: string | null;
        title: string | null;
        sourceType: string | null;
        lastFetchedAt: Date | null;
        lastStatusCode: number | null;
        contentHash: string | null;
        isAccessible: boolean;
    };
    entity: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        entityType: string | null;
        url: string | null;
        logoUrl: string | null;
        logoPath: string | null;
        logoFormat: string | null;
        logoSvgContent: string | null;
        logoSourceUrl: string | null;
        logoFetchedAt: Date | null;
        logoVerified: boolean;
    };
} & {
    error: string | null;
    data: import("@prisma/client/runtime/client").JsonValue;
    id: string;
    entityId: string;
    status: import("..").ExtractionStatus;
    confidence: number | null;
    sourceId: string;
    schemaType: string;
    rawQuotes: import("@prisma/client/runtime/client").JsonValue | null;
    extractedAt: Date;
    expiresAt: Date | null;
    screenshotId: string | null;
    assertionIds: string[];
})[]>;
export declare function getExtractionSummary(projectId: string): Promise<Record<string, {
    total: number;
    completed: number;
    failed: number;
    stale: number;
}>>;
//# sourceMappingURL=index.d.ts.map