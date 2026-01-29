export interface CreateCategoryInput {
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string;
    exclusionCriteria?: string;
    exemplarEntities?: string[];
    antiExemplars?: string[];
}
export interface UpdateCategoryInput {
    displayName?: string;
    description?: string;
    inclusionCriteria?: string;
    exclusionCriteria?: string;
    exemplarEntities?: string[];
    antiExemplars?: string[];
}
export interface ClassificationResult {
    categoryId: string;
    categoryName: string;
    confidence: 'high' | 'medium' | 'low';
    reasoning: string;
}
export interface ReclassifyResult {
    total: number;
    processed: number;
    changed: number;
    unchanged: number;
    errors: number;
    results: {
        entityId: string;
        name: string;
        oldCategory: string | null;
        newCategory: string | null;
        confidence: string;
        reasoning: string;
        status: 'changed' | 'unchanged' | 'error';
    }[];
}
/**
 * Create a new discovery category
 */
export declare function createCategory(input: CreateCategoryInput): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}>;
/**
 * Get a category by ID
 */
export declare function getCategory(categoryId: string): Promise<({
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
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}) | null>;
/**
 * Get a category by name
 */
export declare function getCategoryByName(name: string): Promise<({
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
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}) | null>;
/**
 * List all categories
 */
export declare function listCategories(): Promise<({
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
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
})[]>;
/**
 * Update a category
 */
export declare function updateCategory(categoryId: string, input: UpdateCategoryInput): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}>;
/**
 * Delete a category
 * Note: This will null out categoryId on associated entities, not delete them
 */
export declare function deleteCategory(categoryId: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}>;
/**
 * Get category with all entities
 */
export declare function getCategoryWithEntities(categoryId: string, options?: {
    limit?: number;
    offset?: number;
}): Promise<({
    entities: ({
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
    })[];
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
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}) | null>;
/**
 * Get summary statistics for a category
 */
export declare function getCategorySummary(categoryId: string): Promise<{
    category: {
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
        inclusionCriteria: string | null;
        exclusionCriteria: string | null;
        displayName: string;
        exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
        antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
    };
    statistics: {
        totalEntities: number;
        entitiesWithUrl: number;
        entitiesWithLogo: number;
        totalAssertions: number;
        totalExtractions: number;
        avgAssertionsPerEntity: number;
        avgExtractionsPerEntity: number;
    };
} | null>;
/**
 * Update category entity count
 */
export declare function updateCategoryStats(categoryId: string): Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    entityCount: number;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    displayName: string;
    exemplarEntities: import("@prisma/client/runtime/client").JsonValue | null;
    antiExemplars: import("@prisma/client/runtime/client").JsonValue | null;
}>;
/**
 * Update stats for all categories
 */
export declare function updateAllCategoryStats(): Promise<{
    categoryId: string;
    entityCount: number;
}[]>;
/**
 * Build a classification prompt with all category definitions
 * This prompt is designed for Claude to reason about and classify entities
 */
export declare function buildClassificationPrompt(entityName: string, entityDescription?: string | null): Promise<string>;
/**
 * Parse a classification response from Claude
 * This is a helper to extract structured data from LLM output
 */
export declare function parseClassificationResponse(response: string): ClassificationResult | null;
/**
 * Get classification context for an entity
 * Returns the prompt and metadata needed for classification
 */
export declare function getClassificationContext(entityId: string): Promise<{
    entity: {
        id: string;
        name: string;
        description: string | null;
        currentCategory: string | null;
        currentCategoryDisplay: string | null;
    };
    prompt: string;
}>;
/**
 * Apply classification result to an entity
 * This saves the classification to the database
 */
export declare function applyClassification(entityId: string, classification: ClassificationResult): Promise<{
    success: boolean;
    entity?: any;
    error?: string;
}>;
/**
 * Explain why an entity has its current classification
 */
export declare function explainClassification(entityId: string): Promise<{
    entity: {
        id: string;
        name: string;
        description: string | null;
    };
    classification: null;
    explanation: string;
    suggestedAction: string;
    categoryDefinition?: undefined;
    analysis?: undefined;
} | {
    entity: {
        id: string;
        name: string;
        description: string | null;
    };
    classification: {
        categoryId: string;
        categoryName: string;
        displayName: string;
    };
    categoryDefinition: {
        description: string;
        inclusionCriteria: string | null;
        exclusionCriteria: string | null;
        exemplarEntities: import("@prisma/client/runtime/client").JsonValue;
        antiExemplars: import("@prisma/client/runtime/client").JsonValue;
    };
    analysis: {
        isExemplar: any;
        inAntiExemplarsFor: string[];
    };
    explanation: string;
    suggestedAction?: undefined;
}>;
/**
 * Get entities that need classification
 */
export declare function getUnclassifiedEntities(projectId?: string, limit?: number): Promise<{
    id: string;
    name: string;
    description: string | null;
    projectId: string;
    discoveryCategory: string | null;
}[]>;
/**
 * Get reclassification preview for a project
 * Returns what would change without actually changing anything
 */
export interface ReclassifyOptions {
    projectId: string;
    dryRun?: boolean;
    onlyUnclassified?: boolean;
    limit?: number;
}
export declare function getReclassificationPreview(options: ReclassifyOptions): Promise<{
    totalEntities: number;
    withCategory: number;
    withoutCategory: number;
    entities: {
        id: string;
        name: string;
        description: string | null;
        currentCategory: string | null;
        legacyCategory: string | null;
    }[];
    nextStep: string;
}>;
/**
 * Default category definitions for seeding
 */
export declare const DEFAULT_CATEGORIES: CreateCategoryInput[];
/**
 * Seed default categories into the database
 * Will skip categories that already exist (by name)
 */
export declare function seedCategories(): Promise<{
    success: boolean;
    summary: {
        total: number;
        created: number;
        skipped: number;
        errors: number;
    };
    details: {
        created: string[];
        skipped: string[];
        errors: {
            name: string;
            error: string;
        }[];
    };
}>;
/**
 * Migrate entities from legacy discoveryCategory to new categoryId
 * Maps string values to database category records
 */
export declare function migrateFromLegacyCategories(options?: {
    projectId?: string;
    dryRun?: boolean;
}): Promise<{
    total: number;
    migrated: number;
    categoryNotFound: number;
    errors: number;
    details: {
        entityId: string;
        name: string;
        from: string;
        to: string | null;
        status: string;
    }[];
    dryRun: boolean;
}>;
//# sourceMappingURL=categories.d.ts.map