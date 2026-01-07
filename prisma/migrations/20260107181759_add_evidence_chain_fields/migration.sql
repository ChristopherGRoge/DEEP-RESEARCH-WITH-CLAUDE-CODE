-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "evidenceChain" JSONB,
ADD COLUMN     "evidenceDescription" TEXT,
ADD COLUMN     "evidenceScreenshotPath" TEXT;
