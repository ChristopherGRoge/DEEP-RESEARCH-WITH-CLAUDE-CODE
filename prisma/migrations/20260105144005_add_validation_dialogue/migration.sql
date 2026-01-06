-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "humanResponse" TEXT,
ADD COLUMN     "partiallyValidated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "validationNotes" JSONB;
