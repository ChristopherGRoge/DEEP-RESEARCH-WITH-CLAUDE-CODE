export type DiscoveryCategory = 'ai_code_assistants' | 'ai_code_review' | 'ai_debugging' | 'ai_testing' | 'ai_documentation' | 'ai_security' | 'ai_devops' | 'ai_analytics' | 'genai_concepts';
export interface CreateEntityInput {
    projectId: string;
    name: string;
    description?: string;
    entityType?: string;
    url?: string;
    discoveryCategory?: DiscoveryCategory | string;
    domainId?: string;
}
export interface UpdateEntityInput {
    name?: string;
    description?: string;
    entityType?: string;
    url?: string;
    discoveryCategory?: DiscoveryCategory | string;
    domainId?: string;
}
export interface SearchEntitiesInput {
    projectId?: string;
    query?: string;
    entityType?: string;
}
/**
 * Create a new entity within a project
 * Uses upsert to avoid duplicates - if entity with same name exists, returns existing
 */
export declare function createEntity(input: CreateEntityInput): Promise<{
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
}>;
/**
 * Get an entity by ID with all related data
 */
export declare function getEntity(entityId: string): Promise<({
    project: {
        id: string;
        name: string;
        description: string | null;
        searchQuery: string | null;
        workflow: import(".").ResearchWorkflow;
        createdAt: Date;
        updatedAt: Date;
    };
    assertions: ({
        reasoning: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            assertionId: string;
        }[];
        sources: ({
            source: {
                id: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                url: string;
                status: import(".").SourceStatus;
                validatedAt: Date | null;
                validatedBy: string | null;
                title: string | null;
                sourceType: string | null;
                lastFetchedAt: Date | null;
                lastStatusCode: number | null;
                contentHash: string | null;
                isAccessible: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            assertionId: string;
            quote: string | null;
            addedBy: string | null;
            relevanceGrade: import("../../generated/prisma/enums").SourceRelevance | null;
            annotation: string | null;
            gradedBy: string | null;
            gradedAt: Date | null;
            sourceId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        entityId: string;
        claim: string;
        status: import(".").AssertionStatus;
        confidence: number | null;
        confidenceFactors: import("@prisma/client/runtime/client").JsonValue | null;
        lastValidatedAt: Date | null;
        validationHistory: import("@prisma/client/runtime/client").JsonValue | null;
        criticality: import(".").AssertionCriticality;
        validatedAt: Date | null;
        validatedBy: string | null;
        citedInConclusion: boolean;
        conclusionContext: string | null;
        rejectionReason: string | null;
        supersededBy: string | null;
        humanResponse: string | null;
        validationNotes: import("@prisma/client/runtime/client").JsonValue | null;
        partiallyValidated: boolean;
        evidenceScreenshots: string[];
        evidenceChain: import("@prisma/client/runtime/client").JsonValue | null;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        discoverySourceId: string | null;
        firstDiscoveredAt: Date | null;
        mentionCount: number;
        sourceSpread: number;
        criticalityScore: number | null;
        criticalityFactors: import("@prisma/client/runtime/client").JsonValue | null;
    })[];
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
}) | null>;
/**
 * Find entity by name within a project
 */
export declare function findEntityByName(projectId: string, name: string): Promise<({
    assertions: ({
        reasoning: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            assertionId: string;
        }[];
        sources: ({
            source: {
                id: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                url: string;
                status: import(".").SourceStatus;
                validatedAt: Date | null;
                validatedBy: string | null;
                title: string | null;
                sourceType: string | null;
                lastFetchedAt: Date | null;
                lastStatusCode: number | null;
                contentHash: string | null;
                isAccessible: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            assertionId: string;
            quote: string | null;
            addedBy: string | null;
            relevanceGrade: import("../../generated/prisma/enums").SourceRelevance | null;
            annotation: string | null;
            gradedBy: string | null;
            gradedAt: Date | null;
            sourceId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        entityId: string;
        claim: string;
        status: import(".").AssertionStatus;
        confidence: number | null;
        confidenceFactors: import("@prisma/client/runtime/client").JsonValue | null;
        lastValidatedAt: Date | null;
        validationHistory: import("@prisma/client/runtime/client").JsonValue | null;
        criticality: import(".").AssertionCriticality;
        validatedAt: Date | null;
        validatedBy: string | null;
        citedInConclusion: boolean;
        conclusionContext: string | null;
        rejectionReason: string | null;
        supersededBy: string | null;
        humanResponse: string | null;
        validationNotes: import("@prisma/client/runtime/client").JsonValue | null;
        partiallyValidated: boolean;
        evidenceScreenshots: string[];
        evidenceChain: import("@prisma/client/runtime/client").JsonValue | null;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        discoverySourceId: string | null;
        firstDiscoveredAt: Date | null;
        mentionCount: number;
        sourceSpread: number;
        criticalityScore: number | null;
        criticalityFactors: import("@prisma/client/runtime/client").JsonValue | null;
    })[];
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
}) | null>;
/**
 * List all entities in a project
 */
export declare function listEntities(projectId: string): Promise<({
    _count: {
        assertions: number;
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
 * Search entities across projects
 */
export declare function searchEntities(input: SearchEntitiesInput): Promise<({
    _count: {
        assertions: number;
    };
    project: {
        id: string;
        name: string;
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
 * Update an entity
 */
export declare function updateEntity(entityId: string, input: UpdateEntityInput): Promise<{
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
}>;
/**
 * Delete an entity and all related assertions
 */
export declare function deleteEntity(entityId: string): Promise<{
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
}>;
/**
 * Check if an entity exists by name in a project
 */
export declare function entityExists(projectId: string, name: string): Promise<boolean>;
/**
 * Infer the discovery category from entity name and description using keyword matching
 */
export declare function inferDiscoveryCategory(name: string, description?: string | null): DiscoveryCategory | null;
export interface CategorizeEntitiesInput {
    projectId: string;
    dryRun?: boolean;
    overwrite?: boolean;
}
export interface CategorizeEntitiesResult {
    total: number;
    processed: number;
    categorized: number;
    skipped: number;
    uncategorizable: number;
    results: {
        entityId: string;
        name: string;
        oldCategory: string | null;
        newCategory: string | null;
        status: 'categorized' | 'skipped' | 'uncategorizable';
    }[];
}
/**
 * Categorize entities in a project using keyword pattern matching
 */
export declare function categorizeEntities(input: CategorizeEntitiesInput): Promise<CategorizeEntitiesResult>;
//# sourceMappingURL=entities.d.ts.map