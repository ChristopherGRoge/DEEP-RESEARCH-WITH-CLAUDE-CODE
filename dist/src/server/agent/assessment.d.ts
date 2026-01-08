/**
 * AI Assessment for Assertion Pre-Validation
 *
 * Provides closed-loop validation of assertions based ONLY on collected evidence.
 * No web search or external knowledge - pure assessment of evidence artifacts.
 *
 * Uses Claude Agent SDK for authentication (supports both `claude login` and ANTHROPIC_API_KEY).
 */
export type Verdict = 'LIKELY_VALID' | 'NEEDS_VERIFICATION' | 'LIKELY_INVALID' | 'INSUFFICIENT_EVIDENCE';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';
export interface EvidenceGap {
    id: string;
    description: string;
    searchQuery: string;
}
export interface AssessmentResult {
    verdict: Verdict;
    confidence: Confidence;
    reasoning: string;
    concerns: string | null;
    recommendation: string;
    gaps: EvidenceGap[];
}
export interface AssertionForAssessment {
    id: string;
    claim: string;
    category: string | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    evidenceChain: any[] | null;
    entity: {
        name: string;
    };
    reasoning: Array<{
        content: string;
    }>;
    sources: Array<{
        quote: string | null;
        source: {
            url: string;
        };
    }>;
}
export declare function buildAssessmentPrompt(assertion: AssertionForAssessment): string;
export declare function parseAssessmentResponse(text: string): AssessmentResult;
export declare function assessAssertion(assertion: AssertionForAssessment): Promise<AssessmentResult>;
//# sourceMappingURL=assessment.d.ts.map