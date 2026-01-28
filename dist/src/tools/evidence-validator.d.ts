/**
 * Evidence Validation Tools
 *
 * Provides tools for validating evidence quality and integrity in the research system.
 * These tools help maintain research quality by:
 * - Detecting conflicting evidence between assertions
 * - Cross-referencing claims across multiple sources
 * - Checking evidence freshness and identifying stale data
 * - Validating evidence chain integrity (screenshots + descriptions + sources)
 * - Calculating confidence scores based on evidence quality
 *
 * CLI Commands:
 * - evidence:conflicts - Find contradicting claims about an entity
 * - evidence:crossref - Find corroborating evidence from multiple sources
 * - evidence:freshness - Check for stale evidence needing refresh
 * - evidence:validate-chain - Verify screenshot → claim → assertion chain
 * - evidence:confidence - Calculate confidence score based on evidence quality
 *
 * @module evidence-validator
 */
export interface ConflictingEvidence {
    assertionId: string;
    claim: string;
    source?: string;
    conflictType: 'direct_contradiction' | 'different_values' | 'different_dates' | 'scope_mismatch';
    conflictDetails: string;
    confidence: number;
}
export interface FindConflictsInput {
    entityId: string;
    claim: string;
}
export interface FindConflictsResult {
    conflicts: ConflictingEvidence[];
    conflictScore: number;
    summary: {
        totalConflicts: number;
        directContradictions: number;
        valueConflicts: number;
        dateConflicts: number;
        scopeMismatches: number;
    };
}
export interface Corroboration {
    assertionId: string;
    source: string;
    quote?: string;
    confidence: number;
    screenshotEvidence: boolean;
    category?: string;
}
export interface CrossReferenceInput {
    claim: string;
    entityId?: string;
    requiredSources?: number;
}
export interface CrossReferenceResult {
    corroborations: Corroboration[];
    verified: boolean;
    confidenceScore: number;
    summary: {
        totalCorroborations: number;
        withScreenshots: number;
        uniqueSources: number;
        averageConfidence: number;
    };
}
export interface StaleAssertion {
    id: string;
    claim: string;
    category?: string;
    age: number;
    lastUpdated: Date;
    evidenceAge?: number;
    refreshPriority: 'critical' | 'high' | 'medium' | 'low';
    reason: string;
}
export interface CheckFreshnessInput {
    entityId: string;
    maxAgeDays?: number;
}
export interface CheckFreshnessResult {
    staleAssertions: StaleAssertion[];
    freshCount: number;
    staleCount: number;
    summary: {
        total: number;
        fresh: number;
        stale: number;
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
}
export interface ValidateChainInput {
    assertionId: string;
}
export interface ValidateChainResult {
    valid: boolean;
    issues: string[];
    screenshotExists: boolean;
    chainComplete: boolean;
    details: {
        hasEvidenceDescription: boolean;
        hasEvidenceScreenshotPath: boolean;
        screenshotFileExists: boolean;
        hasEvidenceChain: boolean;
        evidenceChainCount: number;
        hasSources: boolean;
        sourceCount: number;
    };
}
export interface EvidenceConfidenceFactors {
    sourceCount: number;
    sourceCountScore: number;
    freshness: number;
    freshnessScore: number;
    corroboration: number;
    corroborationScore: number;
    screenshotEvidence: boolean;
    screenshotScore: number;
    evidenceChainLength: number;
    evidenceChainScore: number;
}
export interface CalculateEvidenceConfidenceInput {
    assertionId: string;
}
export interface CalculateEvidenceConfidenceResult {
    score: number;
    factors: EvidenceConfidenceFactors;
    recommendation: 'high_confidence' | 'medium_confidence' | 'low_confidence' | 'needs_validation';
    summary: string;
}
/**
 * Find conflicting evidence for a claim
 * Searches for contradicting assertions about the same entity
 */
export declare function findConflictingEvidence(input: FindConflictsInput): Promise<FindConflictsResult>;
/**
 * Find corroborating evidence across assertions
 * Searches for supporting claims from multiple sources
 */
export declare function crossReferenceEvidence(input: CrossReferenceInput): Promise<CrossReferenceResult>;
/**
 * Check for stale evidence that needs refreshing
 * Identifies assertions that are old or based on outdated evidence
 */
export declare function checkEvidenceFreshness(input: CheckFreshnessInput): Promise<CheckFreshnessResult>;
/**
 * Validate evidence chain integrity
 * Verifies screenshot exists and evidence chain is complete
 */
export declare function validateEvidenceChain(input: ValidateChainInput): Promise<ValidateChainResult>;
/**
 * Calculate confidence score based on evidence quality
 * Factors: source count, freshness, corroboration, screenshot evidence
 */
export declare function calculateEvidenceConfidence(input: CalculateEvidenceConfidenceInput): Promise<CalculateEvidenceConfidenceResult>;
//# sourceMappingURL=evidence-validator.d.ts.map