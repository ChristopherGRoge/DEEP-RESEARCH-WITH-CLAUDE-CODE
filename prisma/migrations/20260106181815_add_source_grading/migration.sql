-- CreateEnum
CREATE TYPE "SourceRelevance" AS ENUM ('DIRECT_EVIDENCE', 'STRONG_SUPPORT', 'PARTIAL_SUPPORT', 'WEAK_SUPPORT', 'NOT_RELEVANT', 'MISLEADING');

-- AlterTable
ALTER TABLE "assertion_sources" ADD COLUMN     "annotation" TEXT,
ADD COLUMN     "gradedAt" TIMESTAMP(3),
ADD COLUMN     "gradedBy" TEXT,
ADD COLUMN     "relevanceGrade" "SourceRelevance";

-- CreateIndex
CREATE INDEX "assertion_sources_relevanceGrade_idx" ON "assertion_sources"("relevanceGrade");
