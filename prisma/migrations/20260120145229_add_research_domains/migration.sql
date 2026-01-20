-- AlterTable
ALTER TABLE "entities" ADD COLUMN     "domainId" TEXT;

-- CreateTable
CREATE TABLE "research_domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entityTypes" TEXT[],
    "inclusionCriteria" TEXT,
    "exclusionCriteria" TEXT,
    "searchHints" TEXT,
    "knownLeaders" TEXT[],
    "relevantTopics" TEXT[],
    "evaluationDimensions" JSONB,
    "lastDiscoveryAt" TIMESTAMP(3),
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "research_domains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "research_domains_name_key" ON "research_domains"("name");

-- CreateIndex
CREATE INDEX "entities_domainId_idx" ON "entities"("domainId");

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "research_domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;
