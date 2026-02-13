/**
 * Ruling Tools - Close the validation loop with AFFIRM/REVISE/OVERTURN verdicts
 *
 * Rulings bridge the gap between adversarial validation and action.
 * Each ruling evaluates the tension between an assertion and its validation,
 * then takes appropriate action (update claim, reject assertion, or affirm).
 */
import { RulingVerdict } from '../../generated/prisma/client';
export interface RulingCreateInput {
    assertionId: string;
    validationId: string;
    verdict: 'AFFIRM' | 'REVISE' | 'OVERTURN';
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string;
    ruledBy: string;
}
export interface RulingGetInput {
    rulingId: string;
}
export interface RulingListInput {
    assertionId?: string;
    entityId?: string;
    verdict?: 'AFFIRM' | 'REVISE' | 'OVERTURN';
    limit?: number;
}
/**
 * Create a ruling for an assertion-validation pair.
 * Side effects:
 * - REVISE: updates assertion.claim to validation.refinedClaim
 * - OVERTURN: sets assertion.status to REJECTED
 */
export declare function createRuling(input: RulingCreateInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        rulingId: string;
        assertionId: string;
        validationId: string;
        entityName: string;
        verdict: "AFFIRM" | "REVISE" | "OVERTURN";
        sideEffect: string | null;
    };
    error?: undefined;
}>;
/**
 * Get a ruling by ID with related assertion and validation
 */
export declare function getRuling(input: RulingGetInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        validation: {
            citations: {
                id: string;
                reasoning: string | null;
                url: string;
                quote: string;
                statusCode: number | null;
                recommendation: string;
                context: string | null;
                found: boolean;
                accessible: boolean;
                similarPhrases: import("@prisma/client/runtime/client").JsonValue | null;
                validationResultId: string | null;
                verifiedAt: Date;
            }[];
        } & {
            id: string;
            validatedAt: Date;
            confidence: import("../../generated/prisma/enums").ValidationConfidence;
            assertionId: string;
            summary: string | null;
            method: import("../../generated/prisma/enums").ValidationMethod;
            durationMs: number | null;
            verdict: import("../../generated/prisma/enums").ValidationVerdict;
            refinedClaim: string | null;
            attackResults: import("@prisma/client/runtime/client").JsonValue | null;
            counterEvidence: import("@prisma/client/runtime/client").JsonValue | null;
            conditions: import("@prisma/client/runtime/client").JsonValue | null;
            recommendations: string | null;
            validatorId: string;
            rawOutput: import("@prisma/client/runtime/client").JsonValue | null;
        };
        assertion: {
            entity: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: string | null;
            entityId: string;
            validatedAt: Date | null;
            claim: string;
            status: import("../../generated/prisma/enums").AssertionStatus;
            confidence: number | null;
            confidenceFactors: import("@prisma/client/runtime/client").JsonValue | null;
            lastValidatedAt: Date | null;
            validationHistory: import("@prisma/client/runtime/client").JsonValue | null;
            criticality: import("../../generated/prisma/enums").AssertionCriticality;
            validatedBy: string | null;
            citedInConclusion: boolean;
            conclusionContext: string | null;
            rejectionReason: string | null;
            supersededBy: string | null;
            humanResponse: string | null;
            validationNotes: import("@prisma/client/runtime/client").JsonValue | null;
            partiallyValidated: boolean;
            evidenceScreenshots: import("@prisma/client/runtime/client").JsonValue | null;
            evidenceChain: import("@prisma/client/runtime/client").JsonValue | null;
            evidenceDescription: string | null;
            evidenceScreenshotPath: string | null;
            discoverySourceId: string | null;
            firstDiscoveredAt: Date | null;
            mentionCount: number;
            sourceSpread: number;
            criticalityScore: number | null;
            criticalityFactors: import("@prisma/client/runtime/client").JsonValue | null;
        };
    } & {
        id: string;
        reasoning: string;
        assertionId: string;
        verdict: RulingVerdict;
        validationId: string;
        tensionAnalysis: string;
        actionTaken: string | null;
        ruledBy: string;
        ruledAt: Date;
    };
    error?: undefined;
}>;
/**
 * List rulings with optional filters
 */
export declare function listRulings(input: RulingListInput): Promise<{
    success: boolean;
    data: {
        count: number;
        rulings: {
            id: string;
            assertionId: string;
            entityName: string;
            claim: string;
            verdict: RulingVerdict;
            validationVerdict: import("../../generated/prisma/enums").ValidationVerdict;
            tensionAnalysis: string;
            actionTaken: string | null;
            ruledBy: string;
            ruledAt: Date;
        }[];
    };
}>;
export { RulingVerdict };
//# sourceMappingURL=ruling.d.ts.map