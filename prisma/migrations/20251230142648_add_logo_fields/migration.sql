-- AlterTable
ALTER TABLE "entities" ADD COLUMN     "logoFetchedAt" TIMESTAMP(3),
ADD COLUMN     "logoFormat" TEXT,
ADD COLUMN     "logoPath" TEXT,
ADD COLUMN     "logoSourceUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "logoVerified" BOOLEAN NOT NULL DEFAULT false;
