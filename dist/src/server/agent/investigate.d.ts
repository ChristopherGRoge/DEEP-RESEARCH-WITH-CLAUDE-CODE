/**
 * Gap Investigation Agent
 *
 * Investigates evidence gaps identified during AI assessment.
 * Uses web search and screenshot capture to find missing evidence.
 *
 * Uses Claude Agent SDK with tools enabled for web search and screenshots.
 */
export interface GapInvestigationRequest {
    assertionId: string;
    entityName: string;
    claim: string;
    gapDescription: string;
    searchQuery: string;
}
export interface InvestigationResult {
    success: boolean;
    gapDescription: string;
    findings: string;
    evidenceFound: boolean;
    screenshotPath: string | null;
    screenshotDescription: string | null;
    sourceUrl: string | null;
    sourceQuote: string | null;
}
export declare function investigateGap(request: GapInvestigationRequest): Promise<InvestigationResult>;
//# sourceMappingURL=investigate.d.ts.map