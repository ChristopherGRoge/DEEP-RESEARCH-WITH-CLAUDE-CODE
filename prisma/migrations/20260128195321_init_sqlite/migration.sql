-- CreateTable
CREATE TABLE "research_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "searchQuery" TEXT,
    "workflow" TEXT NOT NULL DEFAULT 'DISCOVERY',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityType" TEXT,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "discoveryCategory" TEXT,
    "categoryId" TEXT,
    "domainId" TEXT,
    "logoUrl" TEXT,
    "logoPath" TEXT,
    "logoFormat" TEXT,
    "logoSvgContent" TEXT,
    "logoSourceUrl" TEXT,
    "logoFetchedAt" DATETIME,
    "logoVerified" BOOLEAN NOT NULL DEFAULT false,
    "githubUrl" TEXT,
    "githubOwner" TEXT,
    "githubRepo" TEXT,
    "githubStars" INTEGER,
    "githubForks" INTEGER,
    "githubWatchers" INTEGER,
    "githubOpenIssues" INTEGER,
    "githubContributors" INTEGER,
    "githubLastCommit" DATETIME,
    "githubLastRelease" DATETIME,
    "githubLanguage" TEXT,
    "githubLicense" TEXT,
    "githubCreatedAt" DATETIME,
    "githubMetricsAt" DATETIME,
    "buzzScore" REAL,
    "buzzComponents" JSONB,
    "buzzCalculatedAt" DATETIME,
    "buzzOverride" REAL,
    "buzzOverrideReason" TEXT,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "entities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "discovery_categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "entities_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "research_domains" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "entities_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "research_projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assertions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "claim" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CLAIM',
    "category" TEXT,
    "confidence" REAL,
    "confidenceFactors" JSONB,
    "lastValidatedAt" DATETIME,
    "validationHistory" JSONB,
    "criticality" TEXT NOT NULL DEFAULT 'MEDIUM',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "validatedAt" DATETIME,
    "validatedBy" TEXT,
    "citedInConclusion" BOOLEAN NOT NULL DEFAULT false,
    "conclusionContext" TEXT,
    "rejectionReason" TEXT,
    "supersededBy" TEXT,
    "humanResponse" TEXT,
    "validationNotes" JSONB,
    "partiallyValidated" BOOLEAN NOT NULL DEFAULT false,
    "evidenceScreenshots" JSONB,
    "evidenceChain" JSONB,
    "evidenceDescription" TEXT,
    "evidenceScreenshotPath" TEXT,
    "discoverySourceId" TEXT,
    "firstDiscoveredAt" DATETIME,
    "mentionCount" INTEGER NOT NULL DEFAULT 1,
    "sourceSpread" INTEGER NOT NULL DEFAULT 1,
    "criticalityScore" REAL,
    "criticalityFactors" JSONB,
    "entityId" TEXT NOT NULL,
    CONSTRAINT "assertions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "reasoning" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "assertionId" TEXT NOT NULL,
    CONSTRAINT "reasoning_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "assertions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sourceType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PROPOSED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "validatedAt" DATETIME,
    "validatedBy" TEXT,
    "lastFetchedAt" DATETIME,
    "lastStatusCode" INTEGER,
    "contentHash" TEXT,
    "isAccessible" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "assertion_sources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedBy" TEXT,
    "relevanceGrade" TEXT,
    "annotation" TEXT,
    "gradedBy" TEXT,
    "gradedAt" DATETIME,
    "assertionId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    CONSTRAINT "assertion_sources_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "assertions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "assertion_sources_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "sources" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "research_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "agentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "screenshots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filePath" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fullPage" BOOLEAN NOT NULL DEFAULT true,
    "width" INTEGER,
    "height" INTEGER,
    "capturedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "extractions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schemaType" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "rawQuotes" JSONB,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "confidence" REAL,
    "error" TEXT,
    "extractedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    "entityId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "screenshotId" TEXT,
    "assertionIds" JSONB,
    CONSTRAINT "extractions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "extractions_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "sources" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "extractions_screenshotId_fkey" FOREIGN KEY ("screenshotId") REFERENCES "screenshots" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "research_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entityId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "researcherName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INITIALIZING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "pausedAt" DATETIME,
    "categories" JSONB,
    "mode" TEXT NOT NULL,
    "config" JSONB,
    "overallProgress" JSONB,
    "totalTasks" INTEGER NOT NULL DEFAULT 0,
    "completedTasks" INTEGER NOT NULL DEFAULT 0,
    "failedTasks" INTEGER NOT NULL DEFAULT 0,
    "totalAssertions" INTEGER NOT NULL DEFAULT 0,
    "totalScreenshots" INTEGER NOT NULL DEFAULT 0,
    "totalExtractions" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "research_sessions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "research_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "agentId" TEXT,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "error" TEXT,
    "progress" JSONB,
    "results" JSONB,
    CONSTRAINT "research_tasks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "research_sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discovery_sources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "crawlStrategy" TEXT NOT NULL,
    "crawlFrequency" TEXT NOT NULL,
    "crawlDepth" INTEGER NOT NULL DEFAULT 1,
    "selectors" JSONB,
    "feedUrl" TEXT,
    "apiEndpoint" TEXT,
    "lastCrawledAt" DATETIME,
    "lastSuccessAt" DATETIME,
    "lastError" TEXT,
    "consecutiveErrors" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "discoveriesCount" INTEGER NOT NULL DEFAULT 0,
    "validatedCount" INTEGER NOT NULL DEFAULT 0,
    "hitRate" REAL,
    "avgNoveltyScore" REAL,
    "description" TEXT,
    "tags" JSONB,
    "priority" INTEGER NOT NULL DEFAULT 50,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "raw_discoveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "mentionedName" TEXT NOT NULL,
    "briefDescription" TEXT,
    "discoveryUrl" TEXT NOT NULL,
    "contextSnippet" TEXT,
    "extractedLinks" JSONB,
    "releaseVersion" TEXT,
    "releaseDate" DATETIME,
    "keywords" JSONB,
    "discoveredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crawlSessionId" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "matchedEntityId" TEXT,
    "createdEntityId" TEXT,
    "noveltyScore" REAL,
    "relevanceScore" REAL,
    CONSTRAINT "raw_discoveries_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "discovery_sources" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discovery_crawls" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "sourceIds" JSONB,
    "researchFocus" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "pausedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "sourcesTotal" INTEGER NOT NULL,
    "sourcesComplete" INTEGER NOT NULL DEFAULT 0,
    "sourcesFailed" INTEGER NOT NULL DEFAULT 0,
    "discoveriesFound" INTEGER NOT NULL DEFAULT 0,
    "entitiesCreated" INTEGER NOT NULL DEFAULT 0,
    "entitiesUpdated" INTEGER NOT NULL DEFAULT 0,
    "trendsDetected" INTEGER NOT NULL DEFAULT 0,
    "checkpoint" JSONB
);

-- CreateTable
CREATE TABLE "discovery_trends" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "mentionCount" INTEGER NOT NULL DEFAULT 0,
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "sourceSpread" INTEGER NOT NULL DEFAULT 0,
    "velocity" REAL,
    "firstSeenAt" DATETIME NOT NULL,
    "lastSeenAt" DATETIME NOT NULL,
    "peakAt" DATETIME,
    "entityIds" JSONB,
    "keywords" JSONB,
    "trendScore" REAL,
    "emergingScore" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "discovery_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inclusionCriteria" TEXT,
    "exclusionCriteria" TEXT,
    "exemplarEntities" JSONB,
    "antiExemplars" JSONB,
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "research_domains" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entityTypes" JSONB,
    "inclusionCriteria" TEXT,
    "exclusionCriteria" TEXT,
    "searchHints" TEXT,
    "knownLeaders" JSONB,
    "relevantTopics" JSONB,
    "evaluationDimensions" JSONB,
    "lastDiscoveryAt" DATETIME,
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT
);

-- CreateIndex
CREATE INDEX "entities_domainId_idx" ON "entities"("domainId");

-- CreateIndex
CREATE INDEX "entities_categoryId_idx" ON "entities"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "entities_projectId_name_key" ON "entities"("projectId", "name");

-- CreateIndex
CREATE INDEX "assertions_criticality_status_idx" ON "assertions"("criticality", "status");

-- CreateIndex
CREATE INDEX "assertions_citedInConclusion_idx" ON "assertions"("citedInConclusion");

-- CreateIndex
CREATE INDEX "assertions_discoverySourceId_idx" ON "assertions"("discoverySourceId");

-- CreateIndex
CREATE UNIQUE INDEX "sources_url_key" ON "sources"("url");

-- CreateIndex
CREATE INDEX "assertion_sources_relevanceGrade_idx" ON "assertion_sources"("relevanceGrade");

-- CreateIndex
CREATE INDEX "assertion_sources_addedBy_idx" ON "assertion_sources"("addedBy");

-- CreateIndex
CREATE UNIQUE INDEX "assertion_sources_assertionId_sourceId_key" ON "assertion_sources"("assertionId", "sourceId");

-- CreateIndex
CREATE INDEX "extractions_entityId_schemaType_idx" ON "extractions"("entityId", "schemaType");

-- CreateIndex
CREATE INDEX "extractions_status_idx" ON "extractions"("status");

-- CreateIndex
CREATE INDEX "research_sessions_entityId_idx" ON "research_sessions"("entityId");

-- CreateIndex
CREATE INDEX "research_sessions_projectId_idx" ON "research_sessions"("projectId");

-- CreateIndex
CREATE INDEX "research_sessions_status_idx" ON "research_sessions"("status");

-- CreateIndex
CREATE INDEX "research_tasks_sessionId_idx" ON "research_tasks"("sessionId");

-- CreateIndex
CREATE INDEX "research_tasks_status_idx" ON "research_tasks"("status");

-- CreateIndex
CREATE INDEX "research_tasks_category_idx" ON "research_tasks"("category");

-- CreateIndex
CREATE UNIQUE INDEX "discovery_sources_name_key" ON "discovery_sources"("name");

-- CreateIndex
CREATE INDEX "discovery_sources_sourceType_idx" ON "discovery_sources"("sourceType");

-- CreateIndex
CREATE INDEX "discovery_sources_lastCrawledAt_idx" ON "discovery_sources"("lastCrawledAt");

-- CreateIndex
CREATE INDEX "discovery_sources_isActive_priority_idx" ON "discovery_sources"("isActive", "priority");

-- CreateIndex
CREATE INDEX "raw_discoveries_sourceId_discoveredAt_idx" ON "raw_discoveries"("sourceId", "discoveredAt");

-- CreateIndex
CREATE INDEX "raw_discoveries_processed_idx" ON "raw_discoveries"("processed");

-- CreateIndex
CREATE INDEX "raw_discoveries_mentionedName_idx" ON "raw_discoveries"("mentionedName");

-- CreateIndex
CREATE INDEX "discovery_crawls_status_idx" ON "discovery_crawls"("status");

-- CreateIndex
CREATE INDEX "discovery_crawls_startedAt_idx" ON "discovery_crawls"("startedAt");

-- CreateIndex
CREATE INDEX "discovery_trends_category_idx" ON "discovery_trends"("category");

-- CreateIndex
CREATE INDEX "discovery_trends_trendScore_idx" ON "discovery_trends"("trendScore");

-- CreateIndex
CREATE UNIQUE INDEX "discovery_categories_name_key" ON "discovery_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "research_domains_name_key" ON "research_domains"("name");
