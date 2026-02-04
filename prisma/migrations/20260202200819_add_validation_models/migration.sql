-- CreateTable
CREATE TABLE "validation_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assertionId" TEXT NOT NULL,
    "verdict" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "refinedClaim" TEXT,
    "attackResults" JSONB,
    "counterEvidence" JSONB,
    "conditions" JSONB,
    "summary" TEXT,
    "recommendations" TEXT,
    "validatorId" TEXT NOT NULL,
    "validatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMs" INTEGER,
    "rawOutput" JSONB,
    CONSTRAINT "validation_results_assertionId_fkey" FOREIGN KEY ("assertionId") REFERENCES "assertions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verified_citations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "found" BOOLEAN NOT NULL,
    "accessible" BOOLEAN NOT NULL,
    "statusCode" INTEGER,
    "context" TEXT,
    "similarPhrases" JSONB,
    "recommendation" TEXT NOT NULL,
    "reasoning" TEXT,
    "verifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validationResultId" TEXT,
    CONSTRAINT "verified_citations_validationResultId_fkey" FOREIGN KEY ("validationResultId") REFERENCES "validation_results" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "validation_results_assertionId_idx" ON "validation_results"("assertionId");

-- CreateIndex
CREATE INDEX "validation_results_verdict_idx" ON "validation_results"("verdict");

-- CreateIndex
CREATE INDEX "validation_results_validatedAt_idx" ON "validation_results"("validatedAt");

-- CreateIndex
CREATE INDEX "verified_citations_url_idx" ON "verified_citations"("url");

-- CreateIndex
CREATE INDEX "verified_citations_validationResultId_idx" ON "verified_citations"("validationResultId");
