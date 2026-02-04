/**
 * Validation Tools - Store and query adversarial validation results
 *
 * These tools provide rigorous, structured storage for assertion validation.
 * Supports the adversarial validation workflow defined in /research-validation skill.
 */

import { prisma } from '../db/client';
import {
  ValidationVerdict,
  ValidationConfidence,
  ValidationMethod,
} from '../../generated/prisma/client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface AttackVectorResult {
  challenged: boolean;
  finding?: string;
  severity?: 'critical' | 'major' | 'minor';
  evidence?: Array<{
    quote: string;
    sourceUrl: string;
    verified: boolean;
  }>;
}

export interface AttackResults {
  counterEvidence?: AttackVectorResult;
  evidenceGap?: AttackVectorResult;
  logicalFlaw?: AttackVectorResult;
  scopeLimitation?: AttackVectorResult;
  alternativeExplanation?: AttackVectorResult;
}

export interface CounterEvidenceItem {
  quote: string;
  sourceUrl: string;
  verified: boolean;
  citeVerifyId?: string;
}

export interface ConditionItem {
  condition: string;
  implication: string;
}

// ============================================
// INPUT TYPES
// ============================================

export interface ValidationCreateInput {
  assertionId: string;
  verdict: 'ROBUST' | 'CONDITIONAL' | 'WEAK' | 'REFUTED' | 'UNVERIFIABLE';
  confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  method?: 'ADVERSARIAL' | 'MANUAL' | 'AUTOMATED' | 'HYBRID';
  refinedClaim?: string;
  attackResults?: AttackResults;
  counterEvidence?: CounterEvidenceItem[];
  conditions?: ConditionItem[];
  summary?: string;
  recommendations?: string;
  validatorId: string;
  durationMs?: number;
  rawOutput?: unknown;
}

export interface ValidationListInput {
  assertionId?: string;
  entityId?: string;
  verdict?: 'ROBUST' | 'CONDITIONAL' | 'WEAK' | 'REFUTED' | 'UNVERIFIABLE';
  limit?: number;
}

export interface ValidationGetInput {
  validationId: string;
}

export interface ValidationSummaryInput {
  entityId?: string;
  projectId?: string;
}

export interface CitationCreateInput {
  url: string;
  quote: string;
  found: boolean;
  accessible: boolean;
  statusCode?: number;
  context?: string;
  similarPhrases?: string[];
  recommendation: 'CITE' | 'PARAPHRASE' | 'DO_NOT_CITE' | 'PAGE_NOT_FOUND';
  reasoning?: string;
  validationResultId?: string;
}

export interface CitationListInput {
  url?: string;
  validationResultId?: string;
  found?: boolean;
  limit?: number;
}

// ============================================
// VALIDATION CRUD OPERATIONS
// ============================================

/**
 * Create a new validation result for an assertion
 */
export async function createValidation(input: ValidationCreateInput) {
  const {
    assertionId,
    verdict,
    confidence,
    method = 'ADVERSARIAL',
    refinedClaim,
    attackResults,
    counterEvidence,
    conditions,
    summary,
    recommendations,
    validatorId,
    durationMs,
    rawOutput,
  } = input;

  // Verify assertion exists
  const assertion = await prisma.assertion.findUnique({
    where: { id: assertionId },
    include: { entity: true },
  });

  if (!assertion) {
    return { success: false, error: `Assertion not found: ${assertionId}` };
  }

  // Create validation result
  const validation = await prisma.validationResult.create({
    data: {
      assertionId,
      verdict: verdict as ValidationVerdict,
      confidence: confidence as ValidationConfidence,
      method: method as ValidationMethod,
      refinedClaim,
      attackResults: attackResults ? JSON.parse(JSON.stringify(attackResults)) : undefined,
      counterEvidence: counterEvidence ? JSON.parse(JSON.stringify(counterEvidence)) : undefined,
      conditions: conditions ? JSON.parse(JSON.stringify(conditions)) : undefined,
      summary,
      recommendations,
      validatorId,
      durationMs,
      rawOutput: rawOutput ? JSON.parse(JSON.stringify(rawOutput)) : undefined,
    },
    include: {
      assertion: {
        include: {
          entity: true,
        },
      },
    },
  });

  // Update assertion status based on verdict
  const newStatus = verdict === 'ROBUST' || verdict === 'CONDITIONAL'
    ? 'EVIDENCE'
    : verdict === 'REFUTED'
      ? 'REJECTED'
      : undefined;

  if (newStatus) {
    await prisma.assertion.update({
      where: { id: assertionId },
      data: {
        status: newStatus,
        validatedAt: new Date(),
        validatedBy: validatorId,
      },
    });
  }

  // Log the validation
  await prisma.researchLog.create({
    data: {
      action: 'validation_created',
      agentId: validatorId,
      details: {
        validationId: validation.id,
        assertionId,
        entityName: assertion.entity.name,
        verdict,
        confidence,
        method,
      },
    },
  });

  return {
    success: true,
    data: {
      validationId: validation.id,
      assertionId,
      entityName: assertion.entity.name,
      verdict,
      confidence,
      method,
      statusUpdated: newStatus ? true : false,
      newStatus,
    },
  };
}

/**
 * Get a validation result by ID
 */
export async function getValidation(input: ValidationGetInput) {
  const { validationId } = input;

  const validation = await prisma.validationResult.findUnique({
    where: { id: validationId },
    include: {
      assertion: {
        include: {
          entity: true,
          sources: {
            include: { source: true },
          },
        },
      },
      citations: true,
    },
  });

  if (!validation) {
    return { success: false, error: `Validation not found: ${validationId}` };
  }

  return { success: true, data: validation };
}

/**
 * List validation results with optional filters
 */
export async function listValidations(input: ValidationListInput) {
  const { assertionId, entityId, verdict, limit = 50 } = input;

  const where: Record<string, unknown> = {};

  if (assertionId) {
    where.assertionId = assertionId;
  }

  if (entityId) {
    where.assertion = { entityId };
  }

  if (verdict) {
    where.verdict = verdict as ValidationVerdict;
  }

  const validations = await prisma.validationResult.findMany({
    where,
    include: {
      assertion: {
        include: {
          entity: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { validatedAt: 'desc' },
    take: limit,
  });

  return {
    success: true,
    data: {
      count: validations.length,
      validations: validations.map((v) => ({
        id: v.id,
        assertionId: v.assertionId,
        entityName: v.assertion.entity.name,
        claim: v.assertion.claim.substring(0, 100) + (v.assertion.claim.length > 100 ? '...' : ''),
        verdict: v.verdict,
        confidence: v.confidence,
        method: v.method,
        validatedAt: v.validatedAt,
        validatorId: v.validatorId,
        hasRefinedClaim: !!v.refinedClaim,
        hasConditions: !!(v.conditions && Array.isArray(v.conditions) && (v.conditions as unknown as ConditionItem[]).length > 0),
      })),
    },
  };
}

/**
 * Get validation summary for an entity or project
 */
export async function getValidationSummary(input: ValidationSummaryInput) {
  const { entityId, projectId } = input;

  const where: Record<string, unknown> = {};

  if (entityId) {
    where.assertion = { entityId };
  }

  if (projectId) {
    where.assertion = { entity: { projectId } };
  }

  const validations = await prisma.validationResult.findMany({
    where,
    select: {
      verdict: true,
      confidence: true,
      method: true,
    },
  });

  const byVerdict = {
    ROBUST: 0,
    CONDITIONAL: 0,
    WEAK: 0,
    REFUTED: 0,
    UNVERIFIABLE: 0,
  };

  const byConfidence = {
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
    UNKNOWN: 0,
  };

  const byMethod = {
    ADVERSARIAL: 0,
    MANUAL: 0,
    AUTOMATED: 0,
    HYBRID: 0,
  };

  for (const v of validations) {
    byVerdict[v.verdict]++;
    byConfidence[v.confidence]++;
    byMethod[v.method]++;
  }

  // Calculate quality metrics
  const total = validations.length;
  const robust = byVerdict.ROBUST;
  const conditional = byVerdict.CONDITIONAL;
  const weak = byVerdict.WEAK;
  const refuted = byVerdict.REFUTED;

  const qualityScore = total > 0
    ? ((robust * 1.0 + conditional * 0.7 + weak * 0.3) / total).toFixed(2)
    : 'N/A';

  const refutedRate = total > 0
    ? ((refuted / total) * 100).toFixed(1) + '%'
    : 'N/A';

  return {
    success: true,
    data: {
      total,
      byVerdict,
      byConfidence,
      byMethod,
      metrics: {
        qualityScore,
        refutedRate,
        robustAssertions: robust,
        needsWork: weak + refuted,
      },
    },
  };
}

/**
 * Get the latest validation for an assertion
 */
export async function getLatestValidation(input: { assertionId: string }) {
  const { assertionId } = input;

  const validation = await prisma.validationResult.findFirst({
    where: { assertionId },
    orderBy: { validatedAt: 'desc' },
    include: {
      assertion: {
        include: {
          entity: { select: { id: true, name: true } },
        },
      },
      citations: true,
    },
  });

  if (!validation) {
    return { success: false, error: `No validations found for assertion: ${assertionId}` };
  }

  return { success: true, data: validation };
}

/**
 * Get validation history for an assertion
 */
export async function getValidationHistory(input: { assertionId: string }) {
  const { assertionId } = input;

  const validations = await prisma.validationResult.findMany({
    where: { assertionId },
    orderBy: { validatedAt: 'desc' },
    select: {
      id: true,
      verdict: true,
      confidence: true,
      method: true,
      validatedAt: true,
      validatorId: true,
      summary: true,
    },
  });

  return {
    success: true,
    data: {
      assertionId,
      count: validations.length,
      history: validations,
    },
  };
}

// ============================================
// CITATION CRUD OPERATIONS
// ============================================

/**
 * Create a verified citation record
 */
export async function createCitation(input: CitationCreateInput) {
  const {
    url,
    quote,
    found,
    accessible,
    statusCode,
    context,
    similarPhrases,
    recommendation,
    reasoning,
    validationResultId,
  } = input;

  const citation = await prisma.verifiedCitation.create({
    data: {
      url,
      quote,
      found,
      accessible,
      statusCode,
      context,
      similarPhrases: similarPhrases ? JSON.parse(JSON.stringify(similarPhrases)) : undefined,
      recommendation,
      reasoning,
      validationResultId,
    },
  });

  return {
    success: true,
    data: {
      citationId: citation.id,
      url,
      found,
      recommendation,
    },
  };
}

/**
 * List verified citations with optional filters
 */
export async function listCitations(input: CitationListInput) {
  const { url, validationResultId, found, limit = 50 } = input;

  const where: Record<string, unknown> = {};

  if (url) {
    where.url = { contains: url };
  }

  if (validationResultId) {
    where.validationResultId = validationResultId;
  }

  if (found !== undefined) {
    where.found = found;
  }

  const citations = await prisma.verifiedCitation.findMany({
    where,
    orderBy: { verifiedAt: 'desc' },
    take: limit,
  });

  return {
    success: true,
    data: {
      count: citations.length,
      citations: citations.map((c) => ({
        id: c.id,
        url: c.url,
        quote: c.quote.substring(0, 80) + (c.quote.length > 80 ? '...' : ''),
        found: c.found,
        accessible: c.accessible,
        recommendation: c.recommendation,
        verifiedAt: c.verifiedAt,
      })),
    },
  };
}

/**
 * Find a cached citation by URL and quote (for reuse)
 */
export async function findCitation(input: { url: string; quote: string }) {
  const { url, quote } = input;

  // Look for exact match within last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const citation = await prisma.verifiedCitation.findFirst({
    where: {
      url,
      quote,
      verifiedAt: { gte: weekAgo },
    },
    orderBy: { verifiedAt: 'desc' },
  });

  if (!citation) {
    return { success: true, data: null, cached: false };
  }

  return {
    success: true,
    data: citation,
    cached: true,
  };
}

// ============================================
// QUERY HELPERS
// ============================================

/**
 * Get assertions needing validation for an entity
 */
export async function getUnvalidatedAssertions(input: { entityId: string; criticality?: string }) {
  const { entityId, criticality } = input;

  const where: Record<string, unknown> = {
    entityId,
    validations: { none: {} }, // No validation results yet
    status: 'CLAIM', // Still a claim, not evidence or rejected
  };

  if (criticality) {
    where.criticality = criticality;
  }

  const assertions = await prisma.assertion.findMany({
    where,
    orderBy: [
      { criticality: 'asc' }, // CRITICAL first (alphabetically first)
      { createdAt: 'asc' },   // Oldest first
    ],
    include: {
      sources: {
        include: { source: true },
      },
    },
  });

  return {
    success: true,
    data: {
      count: assertions.length,
      assertions: assertions.map((a) => ({
        id: a.id,
        claim: a.claim,
        category: a.category,
        criticality: a.criticality,
        sourceCount: a.sources.length,
        hasEvidence: !!a.evidenceScreenshotPath,
      })),
    },
  };
}

/**
 * Get pillar assertions for validation (CRITICAL + HIGH criticality)
 */
export async function getPillarAssertions(input: { entityId: string }) {
  const { entityId } = input;

  const assertions = await prisma.assertion.findMany({
    where: {
      entityId,
      criticality: { in: ['CRITICAL', 'HIGH'] },
    },
    include: {
      validations: {
        orderBy: { validatedAt: 'desc' },
        take: 1,
      },
      sources: {
        include: { source: true },
      },
    },
    orderBy: [
      { criticality: 'asc' },
      { createdAt: 'asc' },
    ],
  });

  return {
    success: true,
    data: {
      count: assertions.length,
      assertions: assertions.map((a) => ({
        id: a.id,
        claim: a.claim,
        category: a.category,
        criticality: a.criticality,
        latestValidation: a.validations[0] ? {
          verdict: a.validations[0].verdict,
          confidence: a.validations[0].confidence,
          validatedAt: a.validations[0].validatedAt,
        } : null,
        validated: a.validations.length > 0,
      })),
    },
  };
}

// Export types for the enums (for CLI)
export { ValidationVerdict, ValidationConfidence, ValidationMethod };
