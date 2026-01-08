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
    readonly Screenshot: "Screenshot";
    readonly Extraction: "Extraction";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
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
    readonly logoUrl: "logoUrl";
    readonly logoPath: "logoPath";
    readonly logoFormat: "logoFormat";
    readonly logoSvgContent: "logoSvgContent";
    readonly logoSourceUrl: "logoSourceUrl";
    readonly logoFetchedAt: "logoFetchedAt";
    readonly logoVerified: "logoVerified";
    readonly projectId: "projectId";
};
export type EntityScalarFieldEnum = (typeof EntityScalarFieldEnum)[keyof typeof EntityScalarFieldEnum];
export declare const AssertionScalarFieldEnum: {
    readonly id: "id";
    readonly claim: "claim";
    readonly status: "status";
    readonly category: "category";
    readonly confidence: "confidence";
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
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
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
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map