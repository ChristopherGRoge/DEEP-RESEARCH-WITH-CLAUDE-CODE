import { AssertionStatus, AssertionCriticality } from '../../generated/prisma/client';
export interface EvidenceChainItem {
    screenshotPath: string;
    description: string;
    capturedAt?: string;
    source?: 'agent' | 'validation';
}
export interface CreateAssertionInput {
    entityId: string;
    claim: string;
    category?: string;
    confidence?: number;
    criticality?: AssertionCriticality;
    reasoning?: string;
    sourceUrl?: string;
    sourceQuote?: string;
    agentId?: string;
    evidenceDescription?: string;
    evidenceScreenshotPath?: string;
    evidenceChain?: EvidenceChainItem[];
}
export interface UpdateAssertionInput {
    claim?: string;
    category?: string;
    confidence?: number;
    criticality?: AssertionCriticality;
    citedInConclusion?: boolean;
    conclusionContext?: string;
}
export interface SearchAssertionsInput {
    entityId?: string;
    projectId?: string;
    query?: string;
    category?: string;
    status?: AssertionStatus;
    criticality?: AssertionCriticality;
    citedInConclusion?: boolean;
}
/**
 * Create a new assertion about an entity
 * Optionally includes reasoning and source in one operation
 *
 * Evidence-First Research: New assertions SHOULD include evidenceDescription
 * and evidenceScreenshotPath to provide direct screenshot evidence rather
 * than relying solely on source URLs.
 */
export declare function createAssertion(input: CreateAssertionInput): Promise<({
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
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}) | null>;
/**
 * Get an assertion by ID with all related data
 */
export declare function getAssertion(assertionId: string): Promise<({
    reasoning: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        assertionId: string;
    }[];
    entity: {
        project: {
            id: string;
            name: string;
            description: string | null;
            searchQuery: string | null;
            workflow: import("../../generated/prisma/enums").ResearchWorkflow;
            createdAt: Date;
            updatedAt: Date;
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
    };
    sources: ({
        source: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}) | null>;
/**
 * List assertions for an entity
 */
export declare function listAssertions(entityId: string): Promise<({
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
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
/**
 * Search assertions
 */
export declare function searchAssertions(input: SearchAssertionsInput): Promise<({
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
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
/**
 * Update an assertion
 */
export declare function updateAssertion(assertionId: string, input: UpdateAssertionInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Add reasoning to an existing assertion
 */
export declare function addReasoning(assertionId: string, content: string, agentId?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    assertionId: string;
}>;
/**
 * Validate an assertion (human action - promotes CLAIM to EVIDENCE)
 */
export declare function validateAssertion(assertionId: string, validatedBy: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Reject an assertion (human action)
 * Includes rejection reason to guide re-research
 */
export declare function rejectAssertion(assertionId: string, validatedBy: string, rejectionReason?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Set criticality level for an assertion
 */
export declare function setCriticality(assertionId: string, criticality: AssertionCriticality): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Mark an assertion as cited in conclusions
 */
export declare function markCitedInConclusion(assertionId: string, conclusionContext: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Get assertions pending validation (CLAIM status) sorted by criticality
 * Specifically for human-in-the-loop validation workflow
 */
export declare function getAssertionsPendingValidation(projectId?: string): Promise<({
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
        projectId: string;
    };
    sources: ({
        source: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
/**
 * Get rejected assertions that need re-research
 */
export declare function getRejectedForReresearch(projectId?: string): Promise<({
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
        projectId: string;
    };
    sources: ({
        source: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
/**
 * Link a new assertion as superseding a rejected one
 */
export declare function supersededAssertion(rejectedId: string, newAssertionId: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Add a human response to an assertion (conversational validation)
 * This captures the researcher's interpretation, partial validation, or challenge
 */
export declare function addHumanResponse(assertionId: string, response: string, validatedBy: string, options?: {
    partiallyValidated?: boolean;
    validatedClaims?: string[];
    challengedClaims?: string[];
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Add an agent response to the validation dialogue
 * Used when AI responds to a human challenge
 */
export declare function addAgentResponse(assertionId: string, response: string, agentId?: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Get assertions with active validation dialogues (partially validated or challenged)
 */
export declare function getActiveDialogues(projectId?: string): Promise<({
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
        projectId: string;
    };
    sources: ({
        source: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
/**
 * Delete an assertion
 */
export declare function deleteAssertion(assertionId: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    entityId: string;
    claim: string;
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
}>;
/**
 * Find similar assertions (to avoid duplicates)
 */
export declare function findSimilarAssertions(entityId: string, claim: string): Promise<({
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
            status: import("../../generated/prisma/enums").SourceStatus;
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
    status: AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: AssertionCriticality;
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
})[]>;
//# sourceMappingURL=assertions.d.ts.map