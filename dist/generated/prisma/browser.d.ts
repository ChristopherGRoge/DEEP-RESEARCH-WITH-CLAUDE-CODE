import * as Prisma from './internal/prismaNamespaceBrowser';
export { Prisma };
export * as $Enums from './enums';
export * from './enums';
/**
 * Model ResearchProject
 * A research project/topic being investigated
 */
export type ResearchProject = Prisma.ResearchProjectModel;
/**
 * Model Entity
 * An entity being researched (e.g., a tool, framework, product)
 */
export type Entity = Prisma.EntityModel;
/**
 * Model Assertion
 * An assertion/claim about an entity
 */
export type Assertion = Prisma.AssertionModel;
/**
 * Model Reasoning
 * Reasoning supporting an assertion
 */
export type Reasoning = Prisma.ReasoningModel;
/**
 * Model Source
 * A source URL backing claims
 */
export type Source = Prisma.SourceModel;
/**
 * Model AssertionSource
 * Many-to-many relationship between Assertions and Sources
 * Includes human grading of source relevance for research quality improvement
 */
export type AssertionSource = Prisma.AssertionSourceModel;
/**
 * Model ResearchLog
 * Audit log for tracking research activities
 */
export type ResearchLog = Prisma.ResearchLogModel;
/**
 * Model Screenshot
 * Screenshot evidence captured during extraction
 */
export type Screenshot = Prisma.ScreenshotModel;
/**
 * Model Extraction
 * Structured data extracted from a source
 * This is the PRIMARY tool for deep research - extracts queryable data from web pages
 */
export type Extraction = Prisma.ExtractionModel;
//# sourceMappingURL=browser.d.ts.map