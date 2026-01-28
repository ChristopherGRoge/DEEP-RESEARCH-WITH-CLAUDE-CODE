-- CreateEnum
CREATE TYPE "ResearchSessionStatus" AS ENUM ('INITIALIZING', 'PLANNING', 'RESEARCHING', 'PAUSED', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ResearchTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'PAUSED');

-- CreateTable
CREATE TABLE "research_sessions" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "researcherName" TEXT NOT NULL,
    "status" "ResearchSessionStatus" NOT NULL DEFAULT 'INITIALIZING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "categories" TEXT[],
    "mode" TEXT NOT NULL,
    "config" JSONB,
    "overallProgress" JSONB,
    "totalTasks" INTEGER NOT NULL DEFAULT 0,
    "completedTasks" INTEGER NOT NULL DEFAULT 0,
    "failedTasks" INTEGER NOT NULL DEFAULT 0,
    "totalAssertions" INTEGER NOT NULL DEFAULT 0,
    "totalScreenshots" INTEGER NOT NULL DEFAULT 0,
    "totalExtractions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "research_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_tasks" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "ResearchTaskStatus" NOT NULL DEFAULT 'PENDING',
    "agentId" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "error" TEXT,
    "progress" JSONB,
    "results" JSONB,

    CONSTRAINT "research_tasks_pkey" PRIMARY KEY ("id")
);

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

-- AddForeignKey
ALTER TABLE "research_sessions" ADD CONSTRAINT "research_sessions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "research_tasks" ADD CONSTRAINT "research_tasks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "research_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
