import { SourceStatus } from '../../generated/prisma/client';
export interface CreateSourceInput {
    url: string;
    title?: string;
    description?: string;
    sourceType?: string;
}
export interface UpdateSourceInput {
    title?: string;
    description?: string;
    sourceType?: string;
}
export interface LinkSourceInput {
    assertionId: string;
    sourceId?: string;
    sourceUrl?: string;
    quote?: string;
    agentId?: string;
}
/**
 * Create or get a source by URL
 */
export declare function createSource(input: CreateSourceInput): Promise<{
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
}>;
/**
 * Get a source by ID
 */
export declare function getSource(sourceId: string): Promise<({
    assertions: ({
        assertion: {
            entity: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            claim: string;
            status: import("../../generated/prisma/enums").AssertionStatus;
            category: string | null;
            confidence: number | null;
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
}) | null>;
/**
 * Find source by URL
 */
export declare function findSourceByUrl(url: string): Promise<({
    assertions: ({
        assertion: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            claim: string;
            status: import("../../generated/prisma/enums").AssertionStatus;
            category: string | null;
            confidence: number | null;
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
}) | null>;
/**
 * List all sources
 */
export declare function listSources(status?: SourceStatus): Promise<({
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
})[]>;
/**
 * Search sources
 */
export declare function searchSources(query: string): Promise<({
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
})[]>;
/**
 * Link a source to an assertion
 */
export declare function linkSourceToAssertion(input: LinkSourceInput): Promise<{
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
}>;
/**
 * Update a source
 */
export declare function updateSource(sourceId: string, input: UpdateSourceInput): Promise<{
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
}>;
/**
 * Validate a source (human action)
 */
export declare function validateSource(sourceId: string, validatedBy: string): Promise<{
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
}>;
/**
 * Reject a source (human action)
 */
export declare function rejectSource(sourceId: string, validatedBy: string): Promise<{
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
}>;
/**
 * Delete a source
 */
export declare function deleteSource(sourceId: string): Promise<{
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
}>;
/**
 * Get sources by type
 */
export declare function getSourcesByType(sourceType: string): Promise<({
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
})[]>;
//# sourceMappingURL=sources.d.ts.map