interface CriticalityWeights {
    federalRelevance: number;
    pricingImpact: number;
    securityArchitecture: number;
    novelty: number;
    sourceTrust: number;
}
interface CriticalityFactors {
    federalRelevance: number;
    pricingImpact: number;
    securityArchitecture: number;
    novelty: number;
    sourceTrust: number;
    sourceSpread: number;
    mentionVelocity: number;
}
interface CriticalityResult {
    score: number;
    level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    factors: CriticalityFactors;
    explanation: string;
}
/**
 * Calculate criticality for an assertion
 *
 * This analyzes the claim text, reasoning, sources, and context to determine
 * how important this assertion is to research conclusions.
 *
 * @param assertionId - ID of the assertion to score
 * @param weights - Optional custom weights for scoring factors
 * @returns CriticalityResult with score, level, factors, and explanation
 */
export declare function calculateCriticality(assertionId: string, weights?: Partial<CriticalityWeights>): Promise<CriticalityResult>;
/**
 * Score all assertions for an entity
 */
export declare function scoreEntityAssertions(entityId: string, weights?: Partial<CriticalityWeights>): Promise<{
    scored: number;
    results: CriticalityResult[];
}>;
/**
 * Score all assertions for a project
 */
export declare function scoreProjectAssertions(projectId: string, weights?: Partial<CriticalityWeights>): Promise<{
    scored: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
}>;
/**
 * Re-score assertions after new sources are added
 * This is useful when source spread changes impact criticality
 */
export declare function rescoreAssertionsWithNewSources(assertionIds: string[]): Promise<void>;
/**
 * Get assertions by criticality level
 */
export declare function getAssertionsByCriticality(projectId: string, level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW', limit?: number): Promise<any[]>;
/**
 * Get critical assertions needing validation
 * Returns CRITICAL + HIGH assertions with status=CLAIM
 */
export declare function getCriticalAssertionsNeedingValidation(projectId: string): Promise<any[]>;
/**
 * Get criticality summary for project
 * Shows distribution of assertions by criticality level
 */
export declare function getCriticalitySummary(projectId: string): Promise<{
    total: number;
    byLevel: {
        CRITICAL: number;
        HIGH: number;
        MEDIUM: number;
        LOW: number;
    };
    needingValidation: number;
}>;
export {};
//# sourceMappingURL=criticality-scorer.d.ts.map