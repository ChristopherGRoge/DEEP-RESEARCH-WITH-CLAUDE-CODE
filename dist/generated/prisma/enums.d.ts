export declare const AssertionStatus: {
    readonly CLAIM: "CLAIM";
    readonly EVIDENCE: "EVIDENCE";
    readonly REJECTED: "REJECTED";
};
export type AssertionStatus = (typeof AssertionStatus)[keyof typeof AssertionStatus];
export declare const SourceStatus: {
    readonly PROPOSED: "PROPOSED";
    readonly VALIDATED: "VALIDATED";
    readonly REJECTED: "REJECTED";
};
export type SourceStatus = (typeof SourceStatus)[keyof typeof SourceStatus];
export declare const ResearchWorkflow: {
    readonly DISCOVERY: "DISCOVERY";
    readonly ANALYSIS: "ANALYSIS";
};
export type ResearchWorkflow = (typeof ResearchWorkflow)[keyof typeof ResearchWorkflow];
export declare const ExtractionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly STALE: "STALE";
};
export type ExtractionStatus = (typeof ExtractionStatus)[keyof typeof ExtractionStatus];
export declare const AssertionCriticality: {
    readonly CRITICAL: "CRITICAL";
    readonly HIGH: "HIGH";
    readonly MEDIUM: "MEDIUM";
    readonly LOW: "LOW";
};
export type AssertionCriticality = (typeof AssertionCriticality)[keyof typeof AssertionCriticality];
export declare const SourceRelevance: {
    readonly DIRECT_EVIDENCE: "DIRECT_EVIDENCE";
    readonly STRONG_SUPPORT: "STRONG_SUPPORT";
    readonly PARTIAL_SUPPORT: "PARTIAL_SUPPORT";
    readonly WEAK_SUPPORT: "WEAK_SUPPORT";
    readonly NOT_RELEVANT: "NOT_RELEVANT";
    readonly MISLEADING: "MISLEADING";
};
export type SourceRelevance = (typeof SourceRelevance)[keyof typeof SourceRelevance];
//# sourceMappingURL=enums.d.ts.map