/**
 * Validation Tools - Store and query adversarial validation results
 *
 * These tools provide rigorous, structured storage for assertion validation.
 * Supports the adversarial validation workflow defined in /research-validation skill.
 */
import { ValidationVerdict, ValidationConfidence, ValidationMethod } from '../../generated/prisma/client';
export interface AttackVectorResult {
    challenged: boolean;
    finding?: string;
    severity?: 'critical' | 'major' | 'minor';
    evidence?: Array<{
        quote: string;
        sourceUrl: string;
        verified: boolean;
    }>;
}
export interface AttackResults {
    counterEvidence?: AttackVectorResult;
    evidenceGap?: AttackVectorResult;
    logicalFlaw?: AttackVectorResult;
    scopeLimitation?: AttackVectorResult;
    alternativeExplanation?: AttackVectorResult;
}
export interface CounterEvidenceItem {
    quote: string;
    sourceUrl: string;
    verified: boolean;
    citeVerifyId?: string;
}
export interface ConditionItem {
    condition: string;
    implication: string;
}
export interface ValidationCreateInput {
    assertionId: string;
    verdict: 'ROBUST' | 'CONDITIONAL' | 'WEAK' | 'REFUTED' | 'UNVERIFIABLE';
    confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
    method?: 'ADVERSARIAL' | 'MANUAL' | 'AUTOMATED' | 'HYBRID';
    refinedClaim?: string;
    attackResults?: AttackResults;
    counterEvidence?: CounterEvidenceItem[];
    conditions?: ConditionItem[];
    summary?: string;
    recommendations?: string;
    validatorId: string;
    durationMs?: number;
    rawOutput?: unknown;
}
export interface ValidationListInput {
    assertionId?: string;
    entityId?: string;
    verdict?: 'ROBUST' | 'CONDITIONAL' | 'WEAK' | 'REFUTED' | 'UNVERIFIABLE';
    limit?: number;
}
export interface ValidationGetInput {
    validationId: string;
}
export interface ValidationSummaryInput {
    entityId?: string;
    projectId?: string;
}
export interface CitationCreateInput {
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number;
    context?: string;
    similarPhrases?: string[];
    recommendation: 'CITE' | 'PARAPHRASE' | 'DO_NOT_CITE' | 'PAGE_NOT_FOUND';
    reasoning?: string;
    validationResultId?: string;
}
export interface CitationListInput {
    url?: string;
    validationResultId?: string;
    found?: boolean;
    limit?: number;
}
/**
 * Create a new validation result for an assertion
 */
export declare function createValidation(input: ValidationCreateInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
        validationId: string;
        assertionId: string;
        entityName: string;
        verdict: "ROBUST" | "CONDITIONAL" | "WEAK" | "REFUTED" | "UNVERIFIABLE";
        confidence: "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";
        method: "ADVERSARIAL" | "MANUAL" | "AUTOMATED" | "HYBRID";
        statusUpdated: boolean;
        newStatus: string | undefined;
    };
    error?: undefined;
}>;
/**
 * Get a validation result by ID
 */
export declare function getValidation(input: ValidationGetInput): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
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
        assertion: {
            entity: {
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
            };
            sources: ({
                source: {
                    id: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    url: string;
                    validatedAt: Date | null;
                    status: import("../../generated/prisma/enums").SourceStatus;
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
        validatedAt: Date;
        confidence: ValidationConfidence;
        assertionId: string;
        summary: string | null;
        method: ValidationMethod;
        durationMs: number | null;
        verdict: ValidationVerdict;
        refinedClaim: string | null;
        attackResults: import("@prisma/client/runtime/client").JsonValue | null;
        counterEvidence: import("@prisma/client/runtime/client").JsonValue | null;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: string | null;
        validatorId: string;
        rawOutput: import("@prisma/client/runtime/client").JsonValue | null;
    };
    error?: undefined;
}>;
/**
 * List validation results with optional filters
 */
export declare function listValidations(input: ValidationListInput): Promise<{
    success: boolean;
    data: {
        count: number;
        validations: {
            id: string;
            assertionId: string;
            entityName: string;
            claim: string;
            verdict: ValidationVerdict;
            confidence: ValidationConfidence;
            method: ValidationMethod;
            validatedAt: Date;
            validatorId: string;
            hasRefinedClaim: boolean;
            hasConditions: boolean;
        }[];
    };
}>;
/**
 * Get validation summary for an entity or project
 */
export declare function getValidationSummary(input: ValidationSummaryInput): Promise<{
    success: boolean;
    data: {
        total: number;
        byVerdict: {
            ROBUST: number;
            CONDITIONAL: number;
            WEAK: number;
            REFUTED: number;
            UNVERIFIABLE: number;
        };
        byConfidence: {
            HIGH: number;
            MEDIUM: number;
            LOW: number;
            UNKNOWN: number;
        };
        byMethod: {
            ADVERSARIAL: number;
            MANUAL: number;
            AUTOMATED: number;
            HYBRID: number;
        };
        metrics: {
            qualityScore: string;
            refutedRate: string;
            robustAssertions: number;
            needsWork: number;
        };
    };
}>;
/**
 * Get the latest validation for an assertion
 */
export declare function getLatestValidation(input: {
    assertionId: string;
}): Promise<{
    success: boolean;
    error: string;
    data?: undefined;
} | {
    success: boolean;
    data: {
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
        validatedAt: Date;
        confidence: ValidationConfidence;
        assertionId: string;
        summary: string | null;
        method: ValidationMethod;
        durationMs: number | null;
        verdict: ValidationVerdict;
        refinedClaim: string | null;
        attackResults: import("@prisma/client/runtime/client").JsonValue | null;
        counterEvidence: import("@prisma/client/runtime/client").JsonValue | null;
        conditions: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: string | null;
        validatorId: string;
        rawOutput: import("@prisma/client/runtime/client").JsonValue | null;
    };
    error?: undefined;
}>;
/**
 * Get validation history for an assertion
 */
export declare function getValidationHistory(input: {
    assertionId: string;
}): Promise<{
    success: boolean;
    data: {
        assertionId: string;
        count: number;
        history: {
            id: string;
            validatedAt: Date;
            confidence: ValidationConfidence;
            summary: string | null;
            method: ValidationMethod;
            verdict: ValidationVerdict;
            validatorId: string;
        }[];
    };
}>;
/**
 * Create a verified citation record
 */
export declare function createCitation(input: CitationCreateInput): Promise<{
    success: boolean;
    data: {
        citationId: string;
        url: string;
        found: boolean;
        recommendation: "CITE" | "PARAPHRASE" | "DO_NOT_CITE" | "PAGE_NOT_FOUND";
    };
}>;
/**
 * List verified citations with optional filters
 */
export declare function listCitations(input: CitationListInput): Promise<{
    success: boolean;
    data: {
        count: number;
        citations: {
            id: string;
            url: string;
            quote: string;
            found: boolean;
            accessible: boolean;
            recommendation: string;
            verifiedAt: Date;
        }[];
    };
}>;
/**
 * Find a cached citation by URL and quote (for reuse)
 */
export declare function findCitation(input: {
    url: string;
    quote: string;
}): Promise<{
    success: boolean;
    data: null;
    cached: boolean;
} | {
    success: boolean;
    data: {
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
    };
    cached: boolean;
}>;
/**
 * Get assertions needing validation for an entity
 */
export declare function getUnvalidatedAssertions(input: {
    entityId: string;
    criticality?: string;
}): Promise<{
    success: boolean;
    data: {
        count: number;
        assertions: {
            id: string;
            claim: string;
            category: string | null;
            criticality: import("../../generated/prisma/enums").AssertionCriticality;
            sourceCount: number;
            hasEvidence: boolean;
        }[];
    };
}>;
/**
 * Get pillar assertions for validation (CRITICAL + HIGH criticality)
 */
export declare function getPillarAssertions(input: {
    entityId: string;
}): Promise<{
    success: boolean;
    data: {
        count: number;
        assertions: {
            id: string;
            claim: string;
            category: string | null;
            criticality: import("../../generated/prisma/enums").AssertionCriticality;
            latestValidation: {
                verdict: ValidationVerdict;
                confidence: ValidationConfidence;
                validatedAt: Date;
            } | null;
            validated: boolean;
        }[];
    };
}>;
export { ValidationVerdict, ValidationConfidence, ValidationMethod };
//# sourceMappingURL=validation.d.ts.map