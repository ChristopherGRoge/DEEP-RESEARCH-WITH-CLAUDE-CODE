-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('BLOG', 'GITHUB_LIST', 'GITHUB_TRENDING', 'GITHUB_REPO', 'NEWSLETTER', 'AGGREGATOR', 'REDDIT', 'X_ACCOUNT', 'X_SEARCH', 'FORUM', 'NEWS', 'ACADEMIC', 'DEV_COMMUNITY');

-- CreateEnum
CREATE TYPE "CrawlStatus" AS ENUM ('IN_PROGRESS', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "criticalityFactors" JSONB,
ADD COLUMN     "criticalityScore" DOUBLE PRECISION,
ADD COLUMN     "discoverySourceId" TEXT,
ADD COLUMN     "firstDiscoveredAt" TIMESTAMP(3),
ADD COLUMN     "mentionCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "sourceSpread" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "discovery_sources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "category" TEXT NOT NULL,
    "crawlStrategy" TEXT NOT NULL,
    "crawlFrequency" TEXT NOT NULL,
    "crawlDepth" INTEGER NOT NULL DEFAULT 1,
    "selectors" JSONB,
    "feedUrl" TEXT,
    "apiEndpoint" TEXT,
    "lastCrawledAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "lastError" TEXT,
    "consecutiveErrors" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "discoveriesCount" INTEGER NOT NULL DEFAULT 0,
    "validatedCount" INTEGER NOT NULL DEFAULT 0,
    "hitRate" DOUBLE PRECISION,
    "avgNoveltyScore" DOUBLE PRECISION,
    "description" TEXT,
    "tags" TEXT[],
    "priority" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discovery_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_discoveries" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "mentionedName" TEXT NOT NULL,
    "briefDescription" TEXT,
    "discoveryUrl" TEXT NOT NULL,
    "contextSnippet" TEXT,
    "extractedLinks" TEXT[],
    "releaseVersion" TEXT,
    "releaseDate" TIMESTAMP(3),
    "keywords" TEXT[],
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crawlSessionId" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "matchedEntityId" TEXT,
    "createdEntityId" TEXT,
    "noveltyScore" DOUBLE PRECISION,
    "relevanceScore" DOUBLE PRECISION,

    CONSTRAINT "raw_discoveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_crawls" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "sourceIds" TEXT[],
    "researchFocus" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "status" "CrawlStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "sourcesTotal" INTEGER NOT NULL,
    "sourcesComplete" INTEGER NOT NULL DEFAULT 0,
    "sourcesFailed" INTEGER NOT NULL DEFAULT 0,
    "discoveriesFound" INTEGER NOT NULL DEFAULT 0,
    "entitiesCreated" INTEGER NOT NULL DEFAULT 0,
    "entitiesUpdated" INTEGER NOT NULL DEFAULT 0,
    "trendsDetected" INTEGER NOT NULL DEFAULT 0,
    "checkpoint" JSONB,

    CONSTRAINT "discovery_crawls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discovery_trends" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "mentionCount" INTEGER NOT NULL DEFAULT 0,
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "sourceSpread" INTEGER NOT NULL DEFAULT 0,
    "velocity" DOUBLE PRECISION,
    "firstSeenAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL,
    "peakAt" TIMESTAMP(3),
    "entityIds" TEXT[],
    "keywords" TEXT[],
    "trendScore" DOUBLE PRECISION,
    "emergingScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discovery_trends_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "assertions_discoverySourceId_idx" ON "assertions"("discoverySourceId");

-- AddForeignKey
ALTER TABLE "raw_discoveries" ADD CONSTRAINT "raw_discoveries_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "discovery_sources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
