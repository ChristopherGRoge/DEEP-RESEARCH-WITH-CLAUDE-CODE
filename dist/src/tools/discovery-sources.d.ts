import { SourceType } from '../../generated/prisma/client';
export interface SourceCreateInput {
    name: string;
    url: string;
    sourceType: SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    feedUrl?: string;
    apiEndpoint?: string;
    description?: string;
    tags?: string[];
    priority?: number;
    crawlDepth?: number;
    selectors?: any;
}
/**
 * Create a new discovery source
 */
export declare function createDiscoverySource(input: SourceCreateInput): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}>;
/**
 * Get a discovery source by ID with statistics
 */
export declare function getDiscoverySource(sourceId: string): Promise<({
    _count: {
        discoveries: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}) | null>;
/**
 * Update a discovery source
 */
export declare function updateDiscoverySource(sourceId: string, updates: Partial<SourceCreateInput>): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}>;
/**
 * Delete a discovery source
 */
export declare function deleteDiscoverySource(sourceId: string): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}>;
/**
 * List discovery sources with optional filters
 */
export declare function listDiscoverySources(filters?: {
    sourceType?: SourceType;
    isActive?: boolean;
    category?: string;
}): Promise<({
    _count: {
        discoveries: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
})[]>;
/**
 * Get discovery sources by type
 */
export declare function getDiscoverySourcesByType(sourceType: SourceType): Promise<({
    _count: {
        discoveries: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
})[]>;
/**
 * Get sources that haven't been crawled recently (stale)
 */
export declare function getStaleSources(maxAgeHours: number): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}[]>;
/**
 * Get statistics across all sources
 */
export declare function getSourceStats(): Promise<{
    totalSources: number;
    activeSources: number;
    inactiveSources: number;
    totalDiscoveries: number;
    totalValidated: number;
    overallHitRate: number;
    byCategory: Record<string, {
        count: number;
        active: number;
        discoveries: number;
    }>;
    topSources: {
        name: string;
        discoveries: number;
        validated: number;
        hitRate: number | null;
    }[];
}>;
/**
 * Mark a source as crawled with success/failure status
 */
export declare function markSourceCrawled(sourceId: string, success: boolean, error?: string): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}>;
/**
 * Update source metrics (discoveries, validation rate)
 */
export declare function updateSourceMetrics(sourceId: string, metrics: {
    discoveriesCount?: number;
    validatedCount?: number;
}): Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    category: string;
    sourceType: SourceType;
    feedUrl: string | null;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: import("@prisma/client/runtime/client").JsonValue | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    tags: string[];
    priority: number;
}>;
/**
 * Seed all 73 default sources from BESPOKE-DISCOVERY-DESIGN.md
 */
export declare function seedDefaultSources(): Promise<{
    total: number;
    created: number;
    skipped: number;
    errors: number;
    results: {
        source: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            category: string;
            sourceType: SourceType;
            feedUrl: string | null;
            crawlStrategy: string;
            crawlFrequency: string;
            crawlDepth: number;
            selectors: import("@prisma/client/runtime/client").JsonValue | null;
            apiEndpoint: string | null;
            lastCrawledAt: Date | null;
            lastSuccessAt: Date | null;
            lastError: string | null;
            consecutiveErrors: number;
            isActive: boolean;
            discoveriesCount: number;
            validatedCount: number;
            hitRate: number | null;
            avgNoveltyScore: number | null;
            tags: string[];
            priority: number;
        };
        action: string;
    }[];
    errorDetails: {
        name: string;
        error: string;
    }[];
}>;
//# sourceMappingURL=discovery-sources.d.ts.map