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
 * Model ValidationResult
 * A structured validation result from adversarial validation
 * Supports multiple validations per assertion (history tracking)
 */
export type ValidationResult = Prisma.ValidationResultModel;
/**
 * Model VerifiedCitation
 * A verified citation from the cite:verify tool
 * Persisted for audit trail, reuse, and cache
 */
export type VerifiedCitation = Prisma.VerifiedCitationModel;
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
/**
 * Model ResearchSession
 * A research session orchestrating multi-category deep research on an entity
 */
export type ResearchSession = Prisma.ResearchSessionModel;
/**
 * Model ResearchTask
 * An individual research task within a session
 */
export type ResearchTask = Prisma.ResearchTaskModel;
/**
 * Model DiscoverySource
 * A curated information source for discovery crawling
 */
export type DiscoverySource = Prisma.DiscoverySourceModel;
/**
 * Model RawDiscovery
 * A raw discovery from a source before deduplication
 */
export type RawDiscovery = Prisma.RawDiscoveryModel;
/**
 * Model DiscoveryCrawl
 * A crawl session for tracking progress
 */
export type DiscoveryCrawl = Prisma.DiscoveryCrawlModel;
/**
 * Model DiscoveryTrend
 * A detected trend across discoveries
 */
export type DiscoveryTrend = Prisma.DiscoveryTrendModel;
/**
 * Model DiscoveryCategory
 * A category definition for LLM-based entity classification
 * Replaces regex-based classification with semantic understanding
 */
export type DiscoveryCategory = Prisma.DiscoveryCategoryModel;
/**
 * Model ResearchDomain
 * A research domain defining what to discover and how to find it
 */
export type ResearchDomain = Prisma.ResearchDomainModel;
/**
 * Model EntityRelationship
 * An entity-to-entity relationship (competitive, complementary, dependency, etc.)
 */
export type EntityRelationship = Prisma.EntityRelationshipModel;
/**
 * Model EntityPositioning
 * Structural market positioning for an entity (one per entity)
 */
export type EntityPositioning = Prisma.EntityPositioningModel;
/**
 * Model EntityForce
 * A market force acting on an entity's trajectory
 */
export type EntityForce = Prisma.EntityForceModel;
//# sourceMappingURL=browser.d.ts.map