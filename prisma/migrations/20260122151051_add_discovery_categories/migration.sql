-- AlterTable
ALTER TABLE "entities" ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "discovery_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "inclusionCriteria" TEXT,
    "exclusionCriteria" TEXT,
    "exemplarEntities" TEXT[],
    "antiExemplars" TEXT[],
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discovery_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discovery_categories_name_key" ON "discovery_categories"("name");

-- CreateIndex
CREATE INDEX "entities_categoryId_idx" ON "entities"("categoryId");

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "discovery_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
