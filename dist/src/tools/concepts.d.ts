/**
 * Category Concept Tools - Building blocks within discovery categories
 *
 * Concepts explain WHY entities cluster within a category:
 * - METHODOLOGY: Architectural approaches (Device Farms, Record & Replay)
 * - TECHNOLOGY: Core technologies (Selenium, Playwright, WebDriver)
 * - STANDARD: Industry standards (W3C WebDriver, ISO 25010)
 * - PATTERN: Design/practice patterns (Shift-Left Testing, Continuous Testing)
 *
 * Concepts link to entities via ConceptEntityLink with correlation strength.
 */
export type ConceptType = 'METHODOLOGY' | 'TECHNOLOGY' | 'STANDARD' | 'PATTERN';
export type ConceptMaturity = 'emerging' | 'established' | 'legacy';
export type ConceptLinkType = 'IMPLEMENTS' | 'BUILT_ON' | 'CONTRIBUTES_TO';
export interface CreateConceptInput {
    categoryId: string;
    name: string;
    displayName: string;
    description?: string;
    conceptType: ConceptType;
    url?: string;
    maturity?: ConceptMaturity;
    discoveredBy?: string;
    evidenceDescription?: string;
}
export interface UpdateConceptInput {
    displayName?: string;
    description?: string;
    conceptType?: ConceptType;
    url?: string;
    maturity?: ConceptMaturity;
    evidenceDescription?: string;
}
export interface LinkConceptInput {
    conceptId: string;
    entityId: string;
    linkType?: ConceptLinkType;
    strength?: number;
    context?: string;
}
export interface ListConceptsInput {
    categoryId: string;
    conceptType?: ConceptType;
}
/**
 * Create or update a concept (upsert by [categoryId, name])
 */
export declare function createConcept(input: CreateConceptInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        _count: {
            entityLinks: number;
        };
        category: {
            id: string;
            name: string;
            displayName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string | null;
        categoryId: string;
        evidenceDescription: string | null;
        displayName: string;
        conceptType: string;
        maturity: string;
        discoveredBy: string | null;
    };
    error?: undefined;
}>;
/**
 * Get a concept by ID with entity link count
 */
export declare function getConcept(conceptId: string): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        category: {
            id: string;
            name: string;
            displayName: string;
        };
        entityLinks: ({
            entity: {
                id: string;
                name: string;
                url: string | null;
                buzzScore: number | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            context: string | null;
            conceptId: string;
            linkType: string;
            strength: number;
        })[];
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string | null;
        categoryId: string;
        evidenceDescription: string | null;
        displayName: string;
        conceptType: string;
        maturity: string;
        discoveredBy: string | null;
    };
    error?: undefined;
}>;
/**
 * List concepts for a category, optionally filtered by type
 */
export declare function listConcepts(input: ListConceptsInput): Promise<{
    success: boolean;
    data: {
        categoryId: string;
        count: number;
        concepts: ({
            _count: {
                entityLinks: number;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string | null;
            categoryId: string;
            evidenceDescription: string | null;
            displayName: string;
            conceptType: string;
            maturity: string;
            discoveredBy: string | null;
        })[];
        byType: Record<string, ({
            _count: {
                entityLinks: number;
            };
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string | null;
            categoryId: string;
            evidenceDescription: string | null;
            displayName: string;
            conceptType: string;
            maturity: string;
            discoveredBy: string | null;
        })[]>;
    };
}>;
/**
 * Update a concept's fields
 */
export declare function updateConcept(conceptId: string, input: UpdateConceptInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        category: {
            id: string;
            name: string;
            displayName: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        url: string | null;
        categoryId: string;
        evidenceDescription: string | null;
        displayName: string;
        conceptType: string;
        maturity: string;
        discoveredBy: string | null;
    };
    error?: undefined;
}>;
/**
 * Delete a concept (cascades to entity links)
 */
export declare function deleteConcept(conceptId: string): Promise<{
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
 * Link a concept to an entity (upsert by [conceptId, entityId])
 */
export declare function linkConcept(input: LinkConceptInput): Promise<{
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
        concept: {
            id: string;
            name: string;
            displayName: string;
            conceptType: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        entityId: string;
        context: string | null;
        conceptId: string;
        linkType: string;
        strength: number;
    };
    error?: undefined;
}>;
/**
 * Remove a concept-entity link
 */
export declare function unlinkConcept(conceptId: string, entityId: string): Promise<{
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
 * Get all concepts linked to an entity
 */
export declare function getEntityConcepts(entityId: string): Promise<{
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
        count: number;
        links: ({
            concept: {
                category: {
                    id: string;
                    name: string;
                    displayName: string;
                };
            } & {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                url: string | null;
                categoryId: string;
                evidenceDescription: string | null;
                displayName: string;
                conceptType: string;
                maturity: string;
                discoveredBy: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            context: string | null;
            conceptId: string;
            linkType: string;
            strength: number;
        })[];
        byType: Record<string, ({
            concept: {
                category: {
                    id: string;
                    name: string;
                    displayName: string;
                };
            } & {
                id: string;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                url: string | null;
                categoryId: string;
                evidenceDescription: string | null;
                displayName: string;
                conceptType: string;
                maturity: string;
                discoveredBy: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            entityId: string;
            context: string | null;
            conceptId: string;
            linkType: string;
            strength: number;
        })[]>;
    };
    error?: undefined;
}>;
/**
 * Get all entities linked to a concept
 */
export declare function getConceptEntities(conceptId: string): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        concept: {
            id: string;
            name: string;
            displayName: string;
            conceptType: string;
        };
        count: number;
        entities: {
            linkType: string;
            strength: number;
            context: string | null;
            id: string;
            name: string;
            url: string | null;
            logoSvgContent: string | null;
            buzzScore: number | null;
        }[];
    };
    error?: undefined;
}>;
/**
 * Get the full concept map for a category (for Grove visualization)
 * Returns all concepts with their entity links and counts
 */
export declare function getCategoryConceptMap(categoryId: string): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        category: {
            id: string;
            name: string;
            displayName: string;
        };
        conceptCount: number;
        concepts: {
            id: string;
            name: string;
            displayName: string;
            description: string | null;
            conceptType: string;
            url: string | null;
            maturity: string;
            entityCount: number;
            entities: {
                id: string;
                name: string;
                strength: number;
                linkType: string;
            }[];
        }[];
        byType: Record<string, ({
            entityLinks: ({
                entity: {
                    id: string;
                    name: string;
                    logoSvgContent: string | null;
                    buzzScore: number | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                entityId: string;
                context: string | null;
                conceptId: string;
                linkType: string;
                strength: number;
            })[];
        } & {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            url: string | null;
            categoryId: string;
            evidenceDescription: string | null;
            displayName: string;
            conceptType: string;
            maturity: string;
            discoveredBy: string | null;
        })[]>;
        entityConceptMap: Record<string, {
            conceptId: string;
            conceptName: string;
            conceptType: string;
            strength: number;
        }[]>;
    };
    error?: undefined;
}>;
//# sourceMappingURL=concepts.d.ts.map