-- AlterTable
ALTER TABLE "assertions" ADD COLUMN     "confidenceFactors" JSONB,
ADD COLUMN     "lastValidatedAt" TIMESTAMP(3),
ADD COLUMN     "validationHistory" JSONB;
