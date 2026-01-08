import { ResearchWorkflow } from '../../generated/prisma/client';
export interface CreateProjectInput {
    name: string;
    description?: string;
    searchQuery?: string;
    workflow?: ResearchWorkflow;
}
export interface UpdateProjectInput {
    name?: string;
    description?: string;
    searchQuery?: string;
    workflow?: ResearchWorkflow;
}
/**
 * Create a new research project
 */
export declare function createProject(input: CreateProjectInput): Promise<{
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Get a project by ID
 */
export declare function getProject(projectId: string): Promise<({
    entities: ({
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
    })[];
} & {
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
/**
 * List all projects
 */
export declare function listProjects(): Promise<({
    _count: {
        entities: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
})[]>;
/**
 * Update a project
 */
export declare function updateProject(projectId: string, input: UpdateProjectInput): Promise<{
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Delete a project and all related data
 */
export declare function deleteProject(projectId: string): Promise<{
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Find project by name (case-insensitive)
 */
export declare function findProjectByName(name: string): Promise<({
    _count: {
        entities: number;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
//# sourceMappingURL=projects.d.ts.map