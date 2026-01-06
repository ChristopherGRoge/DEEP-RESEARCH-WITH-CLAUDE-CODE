-- CreateEnum
CREATE TYPE "AssertionCriticality" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "citedInConclusion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "conclusionContext" TEXT,
ADD COLUMN     "criticality" "AssertionCriticality" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "supersededBy" TEXT;

-- CreateIndex
CREATE INDEX "assertions_criticality_status_idx" ON "assertions"("criticality", "status");

-- CreateIndex
CREATE INDEX "assertions_citedInConclusion_idx" ON "assertions"("citedInConclusion");
