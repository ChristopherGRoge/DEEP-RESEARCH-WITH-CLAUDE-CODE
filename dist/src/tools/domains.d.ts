export interface CreateDomainInput {
    name: string;
    description: string;
    entityTypes?: string[];
    inclusionCriteria?: string;
    exclusionCriteria?: string;
    searchHints?: string;
    knownLeaders?: string[];
    relevantTopics?: string[];
    evaluationDimensions?: Array<{
        name: string;
        weight: number;
        description?: string;
    }>;
    createdBy?: string;
}
export interface UpdateDomainInput {
    name?: string;
    description?: string;
    entityTypes?: string[];
    inclusionCriteria?: string;
    exclusionCriteria?: string;
    searchHints?: string;
    knownLeaders?: string[];
    relevantTopics?: string[];
    evaluationDimensions?: Array<{
        name: string;
        weight: number;
        description?: string;
    }>;
}
/**
 * Create a new research domain
 */
export declare function createDomain(input: CreateDomainInput): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}>;
/**
 * Get a domain by ID or name
 */
export declare function getDomain(identifier: string): Promise<({
    _count: {
        entities: number;
    };
} & {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}) | null>;
/**
 * List all research domains
 */
export declare function listDomains(): Promise<({
    _count: {
        entities: number;
    };
} & {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
})[]>;
/**
 * Update a research domain
 */
export declare function updateDomain(domainId: string, input: UpdateDomainInput): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}>;
/**
 * Delete a research domain
 * Note: This will null out domainId on associated entities, not delete them
 */
export declare function deleteDomain(domainId: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}>;
/**
 * Find domain by name (case-insensitive)
 */
export declare function findDomainByName(name: string): Promise<({
    _count: {
        entities: number;
    };
} & {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}) | null>;
/**
 * Update domain entity count and last discovery timestamp
 */
export declare function updateDomainDiscoveryStats(domainId: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    entityTypes: string[];
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    searchHints: string | null;
    knownLeaders: string[];
    relevantTopics: string[];
    evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
    lastDiscoveryAt: Date | null;
    createdBy: string | null;
}>;
/**
 * Get entities belonging to a domain
 */
export declare function getDomainEntities(domainId: string, options?: {
    limit?: number;
    offset?: number;
}): Promise<({
    _count: {
        assertions: number;
        extractions: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
    entityType: string | null;
    url: string | null;
    discoveryCategory: string | null;
    categoryId: string | null;
    domainId: string | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
    githubUrl: string | null;
    githubOwner: string | null;
    githubRepo: string | null;
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    githubLastCommit: Date | null;
    githubLastRelease: Date | null;
    githubLanguage: string | null;
    githubLicense: string | null;
    githubCreatedAt: Date | null;
    githubMetricsAt: Date | null;
    buzzScore: number | null;
    buzzComponents: import("@prisma/client/runtime/client").JsonValue | null;
    buzzCalculatedAt: Date | null;
    buzzOverride: number | null;
    buzzOverrideReason: string | null;
})[]>;
/**
 * Get domain summary with statistics
 */
export declare function getDomainSummary(domainId: string): Promise<{
    domain: {
        _count: {
            entities: number;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        entityCount: number;
        entityTypes: string[];
        inclusionCriteria: string | null;
        exclusionCriteria: string | null;
        searchHints: string | null;
        knownLeaders: string[];
        relevantTopics: string[];
        evaluationDimensions: import("@prisma/client/runtime/client").JsonValue | null;
        lastDiscoveryAt: Date | null;
        createdBy: string | null;
    };
    statistics: {
        totalEntities: number;
        entitiesWithUrl: number;
        totalAssertions: number;
        totalExtractions: number;
        avgAssertionsPerEntity: number;
        avgExtractionsPerEntity: number;
    };
} | null>;
//# sourceMappingURL=domains.d.ts.map