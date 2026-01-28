import { AssertionStatus, SourceStatus } from '../../generated/prisma/client';
declare const SCHEMA_TYPES: readonly ["pricing", "features", "company", "compliance", "integrations"];
type SchemaType = typeof SCHEMA_TYPES[number];
export interface GlobalSearchInput {
    query: string;
    projectId?: string;
    includeEntities?: boolean;
    includeAssertions?: boolean;
    includeSources?: boolean;
    limit?: number;
}
export interface ResearchSummary {
    project: {
        id: string;
        name: string;
        workflow: string;
    };
    entityCount: number;
    claimCount: number;
    evidenceCount: number;
    sourceCount: number;
    validatedSourceCount: number;
}
/**
 * Global search across entities, assertions, and sources
 */
export declare function globalSearch(input: GlobalSearchInput): Promise<{
    entities: any[];
    assertions: any[];
    sources: any[];
}>;
/**
 * Get a summary of research for a project
 */
export declare function getResearchSummary(projectId: string): Promise<ResearchSummary | null>;
/**
 * Get pending items needing human validation
 */
export declare function getPendingValidation(projectId?: string): Promise<{
    claims: ({
        reasoning: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            assertionId: string;
        }[];
        entity: {
            id: string;
            name: string;
        };
        sources: ({
            source: {
                id: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                url: string;
                status: SourceStatus;
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
        status: AssertionStatus;
        confidence: number | null;
        confidenceFactors: import("@prisma/client/runtime/client").JsonValue | null;
        lastValidatedAt: Date | null;
        validationHistory: import("@prisma/client/runtime/client").JsonValue | null;
        criticality: import("../../generated/prisma/enums").AssertionCriticality;
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
    sources: ({
        _count: {
            assertions: number;
        };
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string;
        status: SourceStatus;
        validatedAt: Date | null;
        validatedBy: string | null;
        title: string | null;
        sourceType: string | null;
        lastFetchedAt: Date | null;
        lastStatusCode: number | null;
        contentHash: string | null;
        isAccessible: boolean;
    })[];
}>;
/**
 * Get recent research activity
 */
export declare function getRecentActivity(limit?: number): Promise<{
    id: string;
    createdAt: Date;
    action: string;
    details: import("@prisma/client/runtime/client").JsonValue | null;
    agentId: string | null;
}[]>;
/**
 * Get entities without any assertions
 */
export declare function getEntitiesWithoutAssertions(projectId: string): Promise<{
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
}[]>;
/**
 * Get assertions without sources
 */
export declare function getAssertionsWithoutSources(projectId?: string): Promise<({
    entity: {
        id: string;
        name: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    category: string | null;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    confidence: number | null;
    confidenceFactors: import("@prisma/client/runtime/client").JsonValue | null;
    lastValidatedAt: Date | null;
    validationHistory: import("@prisma/client/runtime/client").JsonValue | null;
    criticality: import("../../generated/prisma/enums").AssertionCriticality;
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
})[]>;
export interface EntityGap {
    id: string;
    name: string;
    url: string | null;
    entityType: string | null;
    extractionCount: number;
    missingSchemas: SchemaType[];
    existingSchemas: SchemaType[];
    hasUrl: boolean;
    priority: 'high' | 'medium' | 'low';
}
export interface SchemaTypeCoverage {
    schemaType: SchemaType;
    entitiesWithExtraction: number;
    entitiesWithoutExtraction: number;
    coveragePercent: number;
}
export interface ResearchGapsReport {
    project: {
        id: string;
        name: string;
    };
    summary: {
        totalEntities: number;
        entitiesWithUrl: number;
        entitiesWithNoExtractions: number;
        entitiesFullyCovered: number;
        averageExtractionCount: number;
        totalExtractions: number;
    };
    coverageBySchema: SchemaTypeCoverage[];
    entityGaps: EntityGap[];
    priorities: {
        high: EntityGap[];
        medium: EntityGap[];
        low: EntityGap[];
    };
    nextActions: string[];
}
/**
 * Get comprehensive research gaps report for a project
 *
 * This identifies:
 * - Which entities are missing which extraction types
 * - Overall coverage by schema type
 * - Priority ranking for what to research next
 */
export declare function getResearchGaps(projectId: string): Promise<ResearchGapsReport | null>;
export {};
//# sourceMappingURL=search.d.ts.map