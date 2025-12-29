-- CreateEnum
CREATE TYPE "ExtractionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'STALE');

-- AlterTable
ALTER TABLE "sources" ADD COLUMN     "contentHash" TEXT,
ADD COLUMN     "isAccessible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastFetchedAt" TIMESTAMP(3),
ADD COLUMN     "lastStatusCode" INTEGER;

-- CreateTable
CREATE TABLE "screenshots" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fullPage" BOOLEAN NOT NULL DEFAULT true,
    "width" INTEGER,
    "height" INTEGER,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "screenshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extractions" (
    "id" TEXT NOT NULL,
    "schemaType" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "rawQuotes" JSONB,
    "status" "ExtractionStatus" NOT NULL DEFAULT 'COMPLETED',
    "confidence" DOUBLE PRECISION,
    "error" TEXT,
    "extractedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "entityId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "screenshotId" TEXT,
    "assertionIds" TEXT[],

    CONSTRAINT "extractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "extractions_entityId_schemaType_idx" ON "extractions"("entityId", "schemaType");

-- CreateIndex
CREATE INDEX "extractions_status_idx" ON "extractions"("status");

-- AddForeignKey
ALTER TABLE "extractions" ADD CONSTRAINT "extractions_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extractions" ADD CONSTRAINT "extractions_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extractions" ADD CONSTRAINT "extractions_screenshotId_fkey" FOREIGN KEY ("screenshotId") REFERENCES "screenshots"("id") ON DELETE SET NULL ON UPDATE CASCADE;
