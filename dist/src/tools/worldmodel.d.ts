/**
 * World Model Tools - Entity relationships, positioning, and market forces
 *
 * These tools capture the competitive landscape and strategic positioning:
 * - EntityRelationship: How entities relate (competes, complements, depends on, etc.)
 * - EntityPositioning: Where entity sits in SDLC, maturity, scope, ecosystem
 * - EntityForce: Market forces (tailwinds, headwinds, gravitational forces)
 */
export type RelationshipType = 'COMPETES_WITH' | 'COMPLEMENTS' | 'DEPENDS_ON' | 'ENABLES' | 'SUPERSEDES' | 'FORKS_FROM';
export type RelationshipDirection = 'SYMMETRIC' | 'ASYMMETRIC';
export type ForceType = 'TAILWIND' | 'HEADWIND' | 'GRAVITATIONAL';
export interface SDLCStage {
    stage: string;
    coverage: 'PRIMARY' | 'SECONDARY' | 'MINIMAL';
}
export interface WorldModelEvidenceChainItem {
    screenshotPath: string;
    description: string;
    capturedAt?: string;
}
export interface CreateRelationshipInput {
    sourceEntityId: string;
    targetEntityId?: string;
    targetExternalName?: string;
    targetExternalUrl?: string;
    relationshipType: RelationshipType;
    strength?: number;
    direction?: RelationshipDirection;
    context?: string;
    evidenceDescription?: string;
    evidenceScreenshotPath?: string;
}
export interface ListRelationshipsInput {
    entityId: string;
}
export interface DeleteRelationshipInput {
    relationshipId: string;
}
export interface GetRelationshipGraphInput {
    projectId: string;
}
export interface SetPositioningInput {
    entityId: string;
    sdlcStages?: SDLCStage[];
    primaryStage?: string;
    solutionScope?: string;
    maturityStage?: string;
    adoptionCurve?: string;
    businessModel?: string;
    primaryEcosystem?: string;
    positioningStatement?: string;
    evidenceChain?: WorldModelEvidenceChainItem[];
    evidenceDescription?: string;
    assessedBy?: string;
}
export interface GetPositioningInput {
    entityId: string;
}
export interface ComparePositioningInput {
    entityIds: string[];
}
export interface CreateForceInput {
    entityId: string;
    forceType: ForceType;
    name: string;
    description?: string;
    strength?: number;
    timeHorizon?: string;
    evidenceDescription?: string;
    evidenceScreenshotPath?: string;
}
export interface ListForcesInput {
    entityId: string;
}
export interface DeleteForceInput {
    forceId: string;
}
export interface GetWorldModelInput {
    entityId: string;
}
export interface GetWorldModelSummaryInput {
    entityId: string;
}
/**
 * Create an entity relationship
 * Either targetEntityId OR targetExternalName must be provided
 */
export declare function createRelationship(input: CreateRelationshipInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        sourceEntity: {
            id: string;
            name: string;
        };
        targetEntity: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        context: string | null;
        strength: number;
        sourceEntityId: string;
        targetEntityId: string | null;
        targetExternalName: string | null;
        targetExternalUrl: string | null;
        relationshipType: string;
        direction: string;
    };
    error?: undefined;
}>;
/**
 * List all relationships for an entity (both from and to perspectives)
 * Returns a merged view of relationships
 */
export declare function listRelationships(input: ListRelationshipsInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
        };
        relationships: ({
            id: string;
            direction: "OUTBOUND";
            relationshipType: string;
            strength: number;
            relatedEntity: {
                id: string;
                name: string;
                url: string | null;
            } | {
                name: string | null;
                url: string | null;
            };
            context: string | null;
            evidenceDescription: string | null;
            evidenceScreenshotPath: string | null;
        } | {
            id: string;
            direction: "INBOUND";
            relationshipType: string;
            strength: number;
            relatedEntity: {
                id: string;
                name: string;
                url: string | null;
            };
            context: string | null;
            evidenceDescription: string | null;
            evidenceScreenshotPath: string | null;
        })[];
        counts: {
            outbound: number;
            inbound: number;
            total: number;
        };
    };
    error?: undefined;
}>;
/**
 * Delete a relationship
 */
export declare function deleteRelationship(input: DeleteRelationshipInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        deleted: boolean;
    };
    error?: undefined;
}>;
/**
 * Get all relationships across a project (for graph visualization)
 */
export declare function getRelationshipGraph(input: GetRelationshipGraphInput): Promise<{
    success: boolean;
    data: {
        projectId: string;
        nodes: {
            id: string;
            name: string;
            entityType: string | null;
            url: string | null;
        }[];
        edges: {
            id: string;
            source: string;
            target: string | null;
            targetExternalName: string | null;
            type: string;
            strength: number;
            direction: string;
            context: string | null;
        }[];
        stats: {
            entityCount: number;
            relationshipCount: number;
        };
    };
}>;
/**
 * Set or update entity positioning (upsert - one per entity)
 */
export declare function setPositioning(input: SetPositioningInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entityId: string;
        evidenceChain: import("@prisma/client/runtime/client").JsonValue | null;
        evidenceDescription: string | null;
        sdlcStages: import("@prisma/client/runtime/client").JsonValue | null;
        primaryStage: string | null;
        solutionScope: string | null;
        maturityStage: string | null;
        adoptionCurve: string | null;
        businessModel: string | null;
        primaryEcosystem: string | null;
        positioningStatement: string | null;
        assessedAt: Date | null;
        assessedBy: string | null;
    };
    error?: undefined;
}>;
/**
 * Get entity positioning
 */
export declare function getPositioning(input: GetPositioningInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
            entityType: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entityId: string;
        evidenceChain: import("@prisma/client/runtime/client").JsonValue | null;
        evidenceDescription: string | null;
        sdlcStages: import("@prisma/client/runtime/client").JsonValue | null;
        primaryStage: string | null;
        solutionScope: string | null;
        maturityStage: string | null;
        adoptionCurve: string | null;
        businessModel: string | null;
        primaryEcosystem: string | null;
        positioningStatement: string | null;
        assessedAt: Date | null;
        assessedBy: string | null;
    };
    error?: undefined;
}>;
/**
 * Compare positioning of multiple entities side by side
 */
export declare function comparePositioning(input: ComparePositioningInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        comparison: {
            entityId: string;
            entityName: string;
            primaryStage: string;
            solutionScope: string;
            maturityStage: string;
            adoptionCurve: string;
            businessModel: string;
            primaryEcosystem: string;
            positioningStatement: string;
            assessedAt: Date | null;
        }[];
        stats: {
            totalEntities: number;
            assessedEntities: number;
            unassessedEntities: number;
        };
    };
    error?: undefined;
}>;
/**
 * Create a market force affecting an entity
 */
export declare function createForce(input: CreateForceInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        entityId: string;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        strength: number;
        forceType: string;
        timeHorizon: string | null;
    };
    error?: undefined;
}>;
/**
 * List all forces for an entity
 */
export declare function listForces(input: ListForcesInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
        };
        forces: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            evidenceDescription: string | null;
            evidenceScreenshotPath: string | null;
            strength: number;
            forceType: string;
            timeHorizon: string | null;
        }[];
        byType: {
            tailwinds: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
            headwinds: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
            gravitational: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
        };
        counts: {
            tailwinds: number;
            headwinds: number;
            gravitational: number;
            total: number;
        };
    };
    error?: undefined;
}>;
/**
 * Delete a force
 */
export declare function deleteForce(input: DeleteForceInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        deleted: boolean;
    };
    error?: undefined;
}>;
/**
 * Get complete world model for an entity (positioning + relationships + forces + stats)
 * This is the main function used by the API endpoint
 */
export declare function getWorldModel(input: GetWorldModelInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
            entityType: string | null;
            url: string | null;
        };
        positioning: {
            primaryStage: string | null;
            solutionScope: string | null;
            maturityStage: string | null;
            adoptionCurve: string | null;
            businessModel: string | null;
            primaryEcosystem: string | null;
            positioningStatement: string | null;
            sdlcStages: import("@prisma/client/runtime/client").JsonValue;
            assessedAt: Date | null;
            assessedBy: string | null;
        } | null;
        relationships: {
            outbound: {
                id: string;
                direction: "OUTBOUND";
                relationshipType: string;
                strength: number;
                relatedEntity: {
                    id: string;
                    name: string;
                    url: string | null;
                } | {
                    name: string | null;
                    url: string | null;
                };
                context: string | null;
            }[];
            inbound: {
                id: string;
                direction: "INBOUND";
                relationshipType: string;
                strength: number;
                relatedEntity: {
                    id: string;
                    name: string;
                    url: string | null;
                };
                context: string | null;
            }[];
            counts: {
                outbound: number;
                inbound: number;
                total: number;
            };
        };
        forces: {
            tailwinds: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
            headwinds: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
            gravitational: {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                evidenceDescription: string | null;
                evidenceScreenshotPath: string | null;
                strength: number;
                forceType: string;
                timeHorizon: string | null;
            }[];
            counts: {
                tailwinds: number;
                headwinds: number;
                gravitational: number;
                total: number;
            };
        };
        stats: {
            hasPositioning: boolean;
            relationshipCount: number;
            forceCount: number;
            completeness: {
                positioning: boolean;
                relationships: boolean;
                forces: boolean;
            };
        };
    };
    error?: undefined;
}>;
/**
 * Get just the positioning statement (lightweight summary)
 */
export declare function getWorldModelSummary(input: GetWorldModelSummaryInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        entity: {
            id: string;
            name: string;
        };
        positioningStatement: string | null;
        primaryStage: string | null;
        solutionScope: string | null;
    };
    error?: undefined;
}>;
//# sourceMappingURL=worldmodel.d.ts.map