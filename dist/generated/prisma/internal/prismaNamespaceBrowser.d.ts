import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly ResearchProject: "ResearchProject";
    readonly Entity: "Entity";
    readonly Assertion: "Assertion";
    readonly Reasoning: "Reasoning";
    readonly Source: "Source";
    readonly AssertionSource: "AssertionSource";
    readonly ResearchLog: "ResearchLog";
    readonly ValidationResult: "ValidationResult";
    readonly VerifiedCitation: "VerifiedCitation";
    readonly Screenshot: "Screenshot";
    readonly Extraction: "Extraction";
    readonly ResearchSession: "ResearchSession";
    readonly ResearchTask: "ResearchTask";
    readonly DiscoverySource: "DiscoverySource";
    readonly RawDiscovery: "RawDiscovery";
    readonly DiscoveryCrawl: "DiscoveryCrawl";
    readonly DiscoveryTrend: "DiscoveryTrend";
    readonly DiscoveryCategory: "DiscoveryCategory";
    readonly ResearchDomain: "ResearchDomain";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ResearchProjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly searchQuery: "searchQuery";
    readonly workflow: "workflow";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ResearchProjectScalarFieldEnum = (typeof ResearchProjectScalarFieldEnum)[keyof typeof ResearchProjectScalarFieldEnum];
export declare const EntityScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly entityType: "entityType";
    readonly url: "url";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly discoveryCategory: "discoveryCategory";
    readonly categoryId: "categoryId";
    readonly domainId: "domainId";
    readonly logoUrl: "logoUrl";
    readonly logoPath: "logoPath";
    readonly logoFormat: "logoFormat";
    readonly logoSvgContent: "logoSvgContent";
    readonly logoSourceUrl: "logoSourceUrl";
    readonly logoFetchedAt: "logoFetchedAt";
    readonly logoVerified: "logoVerified";
    readonly githubUrl: "githubUrl";
    readonly githubOwner: "githubOwner";
    readonly githubRepo: "githubRepo";
    readonly githubStars: "githubStars";
    readonly githubForks: "githubForks";
    readonly githubWatchers: "githubWatchers";
    readonly githubOpenIssues: "githubOpenIssues";
    readonly githubContributors: "githubContributors";
    readonly githubLastCommit: "githubLastCommit";
    readonly githubLastRelease: "githubLastRelease";
    readonly githubLanguage: "githubLanguage";
    readonly githubLicense: "githubLicense";
    readonly githubCreatedAt: "githubCreatedAt";
    readonly githubMetricsAt: "githubMetricsAt";
    readonly buzzScore: "buzzScore";
    readonly buzzComponents: "buzzComponents";
    readonly buzzCalculatedAt: "buzzCalculatedAt";
    readonly buzzOverride: "buzzOverride";
    readonly buzzOverrideReason: "buzzOverrideReason";
    readonly projectId: "projectId";
};
export type EntityScalarFieldEnum = (typeof EntityScalarFieldEnum)[keyof typeof EntityScalarFieldEnum];
export declare const AssertionScalarFieldEnum: {
    readonly id: "id";
    readonly claim: "claim";
    readonly status: "status";
    readonly category: "category";
    readonly confidence: "confidence";
    readonly confidenceFactors: "confidenceFactors";
    readonly lastValidatedAt: "lastValidatedAt";
    readonly validationHistory: "validationHistory";
    readonly criticality: "criticality";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly validatedAt: "validatedAt";
    readonly validatedBy: "validatedBy";
    readonly citedInConclusion: "citedInConclusion";
    readonly conclusionContext: "conclusionContext";
    readonly rejectionReason: "rejectionReason";
    readonly supersededBy: "supersededBy";
    readonly humanResponse: "humanResponse";
    readonly validationNotes: "validationNotes";
    readonly partiallyValidated: "partiallyValidated";
    readonly evidenceScreenshots: "evidenceScreenshots";
    readonly evidenceChain: "evidenceChain";
    readonly evidenceDescription: "evidenceDescription";
    readonly evidenceScreenshotPath: "evidenceScreenshotPath";
    readonly discoverySourceId: "discoverySourceId";
    readonly firstDiscoveredAt: "firstDiscoveredAt";
    readonly mentionCount: "mentionCount";
    readonly sourceSpread: "sourceSpread";
    readonly criticalityScore: "criticalityScore";
    readonly criticalityFactors: "criticalityFactors";
    readonly entityId: "entityId";
};
export type AssertionScalarFieldEnum = (typeof AssertionScalarFieldEnum)[keyof typeof AssertionScalarFieldEnum];
export declare const ReasoningScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly assertionId: "assertionId";
};
export type ReasoningScalarFieldEnum = (typeof ReasoningScalarFieldEnum)[keyof typeof ReasoningScalarFieldEnum];
export declare const SourceScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly title: "title";
    readonly description: "description";
    readonly sourceType: "sourceType";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly validatedAt: "validatedAt";
    readonly validatedBy: "validatedBy";
    readonly lastFetchedAt: "lastFetchedAt";
    readonly lastStatusCode: "lastStatusCode";
    readonly contentHash: "contentHash";
    readonly isAccessible: "isAccessible";
};
export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum];
export declare const AssertionSourceScalarFieldEnum: {
    readonly id: "id";
    readonly quote: "quote";
    readonly createdAt: "createdAt";
    readonly addedBy: "addedBy";
    readonly relevanceGrade: "relevanceGrade";
    readonly annotation: "annotation";
    readonly gradedBy: "gradedBy";
    readonly gradedAt: "gradedAt";
    readonly assertionId: "assertionId";
    readonly sourceId: "sourceId";
};
export type AssertionSourceScalarFieldEnum = (typeof AssertionSourceScalarFieldEnum)[keyof typeof AssertionSourceScalarFieldEnum];
export declare const ResearchLogScalarFieldEnum: {
    readonly id: "id";
    readonly action: "action";
    readonly details: "details";
    readonly agentId: "agentId";
    readonly createdAt: "createdAt";
};
export type ResearchLogScalarFieldEnum = (typeof ResearchLogScalarFieldEnum)[keyof typeof ResearchLogScalarFieldEnum];
export declare const ValidationResultScalarFieldEnum: {
    readonly id: "id";
    readonly assertionId: "assertionId";
    readonly verdict: "verdict";
    readonly confidence: "confidence";
    readonly method: "method";
    readonly refinedClaim: "refinedClaim";
    readonly attackResults: "attackResults";
    readonly counterEvidence: "counterEvidence";
    readonly conditions: "conditions";
    readonly summary: "summary";
    readonly recommendations: "recommendations";
    readonly validatorId: "validatorId";
    readonly validatedAt: "validatedAt";
    readonly durationMs: "durationMs";
    readonly rawOutput: "rawOutput";
};
export type ValidationResultScalarFieldEnum = (typeof ValidationResultScalarFieldEnum)[keyof typeof ValidationResultScalarFieldEnum];
export declare const VerifiedCitationScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly quote: "quote";
    readonly found: "found";
    readonly accessible: "accessible";
    readonly statusCode: "statusCode";
    readonly context: "context";
    readonly similarPhrases: "similarPhrases";
    readonly recommendation: "recommendation";
    readonly reasoning: "reasoning";
    readonly verifiedAt: "verifiedAt";
    readonly validationResultId: "validationResultId";
};
export type VerifiedCitationScalarFieldEnum = (typeof VerifiedCitationScalarFieldEnum)[keyof typeof VerifiedCitationScalarFieldEnum];
export declare const ScreenshotScalarFieldEnum: {
    readonly id: "id";
    readonly filePath: "filePath";
    readonly url: "url";
    readonly fullPage: "fullPage";
    readonly width: "width";
    readonly height: "height";
    readonly capturedAt: "capturedAt";
};
export type ScreenshotScalarFieldEnum = (typeof ScreenshotScalarFieldEnum)[keyof typeof ScreenshotScalarFieldEnum];
export declare const ExtractionScalarFieldEnum: {
    readonly id: "id";
    readonly schemaType: "schemaType";
    readonly data: "data";
    readonly rawQuotes: "rawQuotes";
    readonly status: "status";
    readonly confidence: "confidence";
    readonly error: "error";
    readonly extractedAt: "extractedAt";
    readonly expiresAt: "expiresAt";
    readonly entityId: "entityId";
    readonly sourceId: "sourceId";
    readonly screenshotId: "screenshotId";
    readonly assertionIds: "assertionIds";
};
export type ExtractionScalarFieldEnum = (typeof ExtractionScalarFieldEnum)[keyof typeof ExtractionScalarFieldEnum];
export declare const ResearchSessionScalarFieldEnum: {
    readonly id: "id";
    readonly entityId: "entityId";
    readonly projectId: "projectId";
    readonly researcherName: "researcherName";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly pausedAt: "pausedAt";
    readonly categories: "categories";
    readonly mode: "mode";
    readonly config: "config";
    readonly overallProgress: "overallProgress";
    readonly totalTasks: "totalTasks";
    readonly completedTasks: "completedTasks";
    readonly failedTasks: "failedTasks";
    readonly totalAssertions: "totalAssertions";
    readonly totalScreenshots: "totalScreenshots";
    readonly totalExtractions: "totalExtractions";
};
export type ResearchSessionScalarFieldEnum = (typeof ResearchSessionScalarFieldEnum)[keyof typeof ResearchSessionScalarFieldEnum];
export declare const ResearchTaskScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly category: "category";
    readonly status: "status";
    readonly agentId: "agentId";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly error: "error";
    readonly progress: "progress";
    readonly results: "results";
};
export type ResearchTaskScalarFieldEnum = (typeof ResearchTaskScalarFieldEnum)[keyof typeof ResearchTaskScalarFieldEnum];
export declare const DiscoverySourceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly url: "url";
    readonly sourceType: "sourceType";
    readonly category: "category";
    readonly crawlStrategy: "crawlStrategy";
    readonly crawlFrequency: "crawlFrequency";
    readonly crawlDepth: "crawlDepth";
    readonly selectors: "selectors";
    readonly feedUrl: "feedUrl";
    readonly apiEndpoint: "apiEndpoint";
    readonly lastCrawledAt: "lastCrawledAt";
    readonly lastSuccessAt: "lastSuccessAt";
    readonly lastError: "lastError";
    readonly consecutiveErrors: "consecutiveErrors";
    readonly isActive: "isActive";
    readonly discoveriesCount: "discoveriesCount";
    readonly validatedCount: "validatedCount";
    readonly hitRate: "hitRate";
    readonly avgNoveltyScore: "avgNoveltyScore";
    readonly description: "description";
    readonly tags: "tags";
    readonly priority: "priority";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiscoverySourceScalarFieldEnum = (typeof DiscoverySourceScalarFieldEnum)[keyof typeof DiscoverySourceScalarFieldEnum];
export declare const RawDiscoveryScalarFieldEnum: {
    readonly id: "id";
    readonly sourceId: "sourceId";
    readonly mentionedName: "mentionedName";
    readonly briefDescription: "briefDescription";
    readonly discoveryUrl: "discoveryUrl";
    readonly contextSnippet: "contextSnippet";
    readonly extractedLinks: "extractedLinks";
    readonly releaseVersion: "releaseVersion";
    readonly releaseDate: "releaseDate";
    readonly keywords: "keywords";
    readonly discoveredAt: "discoveredAt";
    readonly crawlSessionId: "crawlSessionId";
    readonly processed: "processed";
    readonly matchedEntityId: "matchedEntityId";
    readonly createdEntityId: "createdEntityId";
    readonly noveltyScore: "noveltyScore";
    readonly relevanceScore: "relevanceScore";
};
export type RawDiscoveryScalarFieldEnum = (typeof RawDiscoveryScalarFieldEnum)[keyof typeof RawDiscoveryScalarFieldEnum];
export declare const DiscoveryCrawlScalarFieldEnum: {
    readonly id: "id";
    readonly projectId: "projectId";
    readonly sourceIds: "sourceIds";
    readonly researchFocus: "researchFocus";
    readonly startedAt: "startedAt";
    readonly completedAt: "completedAt";
    readonly pausedAt: "pausedAt";
    readonly status: "status";
    readonly sourcesTotal: "sourcesTotal";
    readonly sourcesComplete: "sourcesComplete";
    readonly sourcesFailed: "sourcesFailed";
    readonly discoveriesFound: "discoveriesFound";
    readonly entitiesCreated: "entitiesCreated";
    readonly entitiesUpdated: "entitiesUpdated";
    readonly trendsDetected: "trendsDetected";
    readonly checkpoint: "checkpoint";
};
export type DiscoveryCrawlScalarFieldEnum = (typeof DiscoveryCrawlScalarFieldEnum)[keyof typeof DiscoveryCrawlScalarFieldEnum];
export declare const DiscoveryTrendScalarFieldEnum: {
    readonly id: "id";
    readonly projectId: "projectId";
    readonly name: "name";
    readonly description: "description";
    readonly category: "category";
    readonly mentionCount: "mentionCount";
    readonly entityCount: "entityCount";
    readonly sourceSpread: "sourceSpread";
    readonly velocity: "velocity";
    readonly firstSeenAt: "firstSeenAt";
    readonly lastSeenAt: "lastSeenAt";
    readonly peakAt: "peakAt";
    readonly entityIds: "entityIds";
    readonly keywords: "keywords";
    readonly trendScore: "trendScore";
    readonly emergingScore: "emergingScore";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiscoveryTrendScalarFieldEnum = (typeof DiscoveryTrendScalarFieldEnum)[keyof typeof DiscoveryTrendScalarFieldEnum];
export declare const DiscoveryCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly displayName: "displayName";
    readonly description: "description";
    readonly inclusionCriteria: "inclusionCriteria";
    readonly exclusionCriteria: "exclusionCriteria";
    readonly exemplarEntities: "exemplarEntities";
    readonly antiExemplars: "antiExemplars";
    readonly entityCount: "entityCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DiscoveryCategoryScalarFieldEnum = (typeof DiscoveryCategoryScalarFieldEnum)[keyof typeof DiscoveryCategoryScalarFieldEnum];
export declare const ResearchDomainScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly entityTypes: "entityTypes";
    readonly inclusionCriteria: "inclusionCriteria";
    readonly exclusionCriteria: "exclusionCriteria";
    readonly searchHints: "searchHints";
    readonly knownLeaders: "knownLeaders";
    readonly relevantTopics: "relevantTopics";
    readonly evaluationDimensions: "evaluationDimensions";
    readonly lastDiscoveryAt: "lastDiscoveryAt";
    readonly entityCount: "entityCount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly createdBy: "createdBy";
};
export type ResearchDomainScalarFieldEnum = (typeof ResearchDomainScalarFieldEnum)[keyof typeof ResearchDomainScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: "JsonNull";
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map