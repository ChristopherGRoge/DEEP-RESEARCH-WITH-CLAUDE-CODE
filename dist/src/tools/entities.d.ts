export interface CreateEntityInput {
    projectId: string;
    name: string;
    description?: string;
    entityType?: string;
    url?: string;
}
export interface UpdateEntityInput {
    name?: string;
    description?: string;
    entityType?: string;
    url?: string;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
        entityId: string;
        claim: string;
        status: import(".").AssertionStatus;
        category: string | null;
        confidence: number | null;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
        entityId: string;
        claim: string;
        status: import(".").AssertionStatus;
        category: string | null;
        confidence: number | null;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
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
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
}>;
/**
 * Check if an entity exists by name in a project
 */
export declare function entityExists(projectId: string, name: string): Promise<boolean>;
//# sourceMappingURL=entities.d.ts.map