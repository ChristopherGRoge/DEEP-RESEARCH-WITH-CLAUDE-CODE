-- CreateEnum
CREATE TYPE "AssertionStatus" AS ENUM ('CLAIM', 'EVIDENCE', 'REJECTED');

-- CreateEnum
CREATE TYPE "SourceStatus" AS ENUM ('PROPOSED', 'VALIDATED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ResearchWorkflow" AS ENUM ('DISCOVERY', 'ANALYSIS');

-- CreateTable
CREATE TABLE "research_projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "searchQuery" TEXT,
    "workflow" "ResearchWorkflow" NOT NULL DEFAULT 'DISCOVERY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "research_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityType" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assertions" (
    "id" TEXT NOT NULL,
    "claim" TEXT NOT NULL,
    "status" "AssertionStatus" NOT NULL DEFAULT 'CLAIM',
    "category" TEXT,
    "confidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "validatedAt" TIMESTAMP(3),
    "validatedBy" TEXT,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "assertions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reasoning" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assertionId" TEXT NOT NULL,

    CONSTRAINT "reasoning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sourceType" TEXT,
    "status" "SourceStatus" NOT NULL DEFAULT 'PROPOSED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "validatedAt" TIMESTAMP(3),
    "validatedBy" TEXT,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assertion_sources" (
    "id" TEXT NOT NULL,
    "quote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assertionId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "assertion_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "research_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entities_projectId_name_key" ON "entities"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "sources_url_key" ON "sources"("url");

-- CreateIndex
CREATE UNIQUE INDEX "assertion_sources_assertionId_sourceId_key" ON "assertion_sources"("assertionId", "sourceId");

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "research_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertions" ADD CONSTRAINT "assertions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reasoning" ADD CONSTRAINT "reasoning_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "assertions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertion_sources" ADD CONSTRAINT "assertion_sources_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "assertions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assertion_sources" ADD CONSTRAINT "assertion_sources_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "sources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
