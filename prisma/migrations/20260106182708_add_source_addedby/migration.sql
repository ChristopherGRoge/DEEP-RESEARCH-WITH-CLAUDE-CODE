-- AlterTable
ALTER TABLE "assertion_sources" ADD COLUMN     "addedBy" TEXT;

-- CreateIndex
CREATE INDEX "assertion_sources_addedBy_idx" ON "assertion_sources"("addedBy");
