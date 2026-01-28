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
export declare const SourceType: {
    readonly BLOG: "BLOG";
    readonly GITHUB_LIST: "GITHUB_LIST";
    readonly GITHUB_TRENDING: "GITHUB_TRENDING";
    readonly GITHUB_REPO: "GITHUB_REPO";
    readonly NEWSLETTER: "NEWSLETTER";
    readonly AGGREGATOR: "AGGREGATOR";
    readonly REDDIT: "REDDIT";
    readonly X_ACCOUNT: "X_ACCOUNT";
    readonly X_SEARCH: "X_SEARCH";
    readonly FORUM: "FORUM";
    readonly NEWS: "NEWS";
    readonly ACADEMIC: "ACADEMIC";
    readonly DEV_COMMUNITY: "DEV_COMMUNITY";
};
export type SourceType = (typeof SourceType)[keyof typeof SourceType];
export declare const CrawlStatus: {
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly PAUSED: "PAUSED";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
};
export type CrawlStatus = (typeof CrawlStatus)[keyof typeof CrawlStatus];
export declare const ResearchSessionStatus: {
    readonly INITIALIZING: "INITIALIZING";
    readonly PLANNING: "PLANNING";
    readonly RESEARCHING: "RESEARCHING";
    readonly PAUSED: "PAUSED";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
};
export type ResearchSessionStatus = (typeof ResearchSessionStatus)[keyof typeof ResearchSessionStatus];
export declare const ResearchTaskStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
    readonly PAUSED: "PAUSED";
};
export type ResearchTaskStatus = (typeof ResearchTaskStatus)[keyof typeof ResearchTaskStatus];
//# sourceMappingURL=enums.d.ts.map