/**
 * Assertion Evolution Tracking
 *
 * Tracks how assertions evolve through human feedback, challenges, and refinements.
 * Uses validationNotes JSON field to store evolution history.
 */
import prisma from '../../db/client';
/**
 * Represents a single revision in an assertion's history
 */
export interface AssertionRevision {
    revisionNumber: number;
    previousClaim: string;
    newClaim: string;
    changeReason: 'challenge' | 'refinement' | 'new_evidence' | 'correction';
    triggeredBy: string;
    timestamp: string;
    confidenceChange?: number;
}
/**
 * Tracks how assertions evolve over time
 */
export declare class AssertionEvolution {
    private db;
    constructor(database?: typeof prisma);
    /**
     * Record a revision to an assertion's claim
     */
    recordRevision(assertionId: string, revision: Omit<AssertionRevision, 'revisionNumber'>): Promise<void>;
    /**
     * Revise an assertion's claim text
     */
    reviseAssertion(assertionId: string, newClaim: string, reason: AssertionRevision['changeReason'], triggeredBy: string, confidenceChange?: number): Promise<object>;
    /**
     * Get evolution history for an assertion
     */
    getEvolutionHistory(assertionId: string): Promise<AssertionRevision[]>;
    /**
     * Create a derived assertion (child of existing assertion)
     */
    createDerivedAssertion(parentId: string, newClaim: string, category: string, reason: string): Promise<string>;
    /**
     * Split an assertion into multiple more specific assertions
     */
    splitAssertion(assertionId: string, newClaims: string[], reason: string): Promise<string[]>;
    /**
     * Merge multiple assertions into one
     */
    mergeAssertions(assertionIds: string[], mergedClaim: string, category: string, reason: string): Promise<string>;
    /**
     * Get the lineage of an assertion (parent/child relationships)
     */
    getAssertionLineage(assertionId: string): Promise<object>;
}
export declare const assertionEvolution: AssertionEvolution;
//# sourceMappingURL=assertion-evolution.d.ts.map