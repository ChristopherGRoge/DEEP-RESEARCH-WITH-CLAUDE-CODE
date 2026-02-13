/**
 * Buzz Score Calculator - Compute composite buzz score for entities
 *
 * Formula:
 * BaseScore = (
 *   MarketPresence   * 0.30 +
 *   DeveloperActivity * 0.25 +
 *   FundingSignal     * 0.20 +
 *   MentionVelocity   * 0.15 +
 *   ResearchDepth     * 0.10
 * )
 * BuzzScore = BaseScore * 0.75 + ConceptCoverage * 0.25
 *
 * ConceptCoverage = sum(link strengths) / totalConceptsInCategory
 * Concept-connected tools surface higher for hands-on evaluation priority.
 */
export interface BuzzComponents {
    marketPresence: number;
    developerActivity: number;
    fundingSignal: number;
    mentionVelocity: number;
    researchDepth: number;
    conceptCoverage: number;
}
export interface BuzzCalculationResult {
    success: boolean;
    entityId: string;
    entityName: string;
    buzzScore: number;
    components: BuzzComponents;
    dataQuality: 'high' | 'medium' | 'low';
    missingData: string[];
}
/**
 * Calculate buzz score for an entity
 */
export declare function calculateBuzzScore(input: {
    entityId: string;
}): Promise<BuzzCalculationResult>;
/**
 * Calculate buzz scores for all entities in a project
 */
export declare function calculateProjectBuzzScores(input: {
    projectId: string;
    forceRecalculate?: boolean;
}): Promise<{
    success: boolean;
    projectId: string;
    total: number;
    calculated: number;
    results: BuzzCalculationResult[];
}>;
/**
 * Set manual buzz override for an entity
 */
export declare function setBuzzOverride(input: {
    entityId: string;
    buzzOverride: number;
    reason: string;
}): Promise<{
    success: boolean;
    entityId: string;
    entityName: string;
    buzzOverride: number;
}>;
/**
 * Clear manual buzz override for an entity
 */
export declare function clearBuzzOverride(input: {
    entityId: string;
}): Promise<{
    success: boolean;
}>;
/**
 * Get entities ranked by buzz score
 */
export declare function getEntitiesByBuzzScore(input: {
    projectId: string;
    limit?: number;
    minBuzz?: number;
    categoryId?: string;
}): Promise<{
    success: boolean;
    entities: Array<{
        id: string;
        name: string;
        buzzScore: number | null;
        buzzComponents: BuzzComponents | null;
        dataQuality: string;
        githubStars: number | null;
        categoryName?: string;
    }>;
}>;
//# sourceMappingURL=buzz.d.ts.map