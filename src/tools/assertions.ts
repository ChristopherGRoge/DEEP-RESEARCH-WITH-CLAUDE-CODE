import prisma from '../db/client';
import { AssertionStatus, AssertionCriticality } from '../../generated/prisma/client';

export interface EvidenceChainItem {
  screenshotPath: string;
  description: string;
  capturedAt?: string;
  source?: 'agent' | 'validation';
}

export interface CreateAssertionInput {
  entityId: string;
  claim: string;
  category?: string;
  confidence?: number;
  criticality?: AssertionCriticality;
  reasoning?: string;
  sourceUrl?: string;
  sourceQuote?: string;
  agentId?: string;
  // Evidence-first research fields
  evidenceDescription?: string;    // REQUIRED for new assertions: what on screenshot supports claim
  evidenceScreenshotPath?: string; // REQUIRED for new assertions: path to primary evidence screenshot
  evidenceChain?: EvidenceChainItem[]; // Optional: multiple screenshots with descriptions
}

export interface UpdateAssertionInput {
  claim?: string;
  category?: string;
  confidence?: number;
  criticality?: AssertionCriticality;
  citedInConclusion?: boolean;
  conclusionContext?: string;
}

export interface SearchAssertionsInput {
  entityId?: string;
  projectId?: string;
  query?: string;
  category?: string;
  status?: AssertionStatus;
  criticality?: AssertionCriticality;
  citedInConclusion?: boolean;
}

/**
 * Create a new assertion about an entity
 * Optionally includes reasoning and source in one operation
 *
 * Evidence-First Research: New assertions SHOULD include evidenceDescription
 * and evidenceScreenshotPath to provide direct screenshot evidence rather
 * than relying solely on source URLs.
 */
export async function createAssertion(input: CreateAssertionInput) {
  // Build evidence chain from provided evidence
  let evidenceChain: EvidenceChainItem[] | undefined;
  if (input.evidenceScreenshotPath && input.evidenceDescription) {
    evidenceChain = [{
      screenshotPath: input.evidenceScreenshotPath,
      description: input.evidenceDescription,
      capturedAt: new Date().toISOString(),
      source: 'agent',
    }];
  }
  // If additional evidence chain items provided, merge them
  if (input.evidenceChain && input.evidenceChain.length > 0) {
    evidenceChain = [...(evidenceChain || []), ...input.evidenceChain];
  }

  const assertion = await prisma.assertion.create({
    data: {
      entityId: input.entityId,
      claim: input.claim,
      category: input.category,
      confidence: input.confidence,
      criticality: input.criticality || AssertionCriticality.MEDIUM,
      status: AssertionStatus.CLAIM,
      // Evidence-first fields
      evidenceDescription: input.evidenceDescription,
      evidenceScreenshotPath: input.evidenceScreenshotPath,
      evidenceChain: evidenceChain as unknown as any,
    },
  });

  // Add reasoning if provided
  if (input.reasoning) {
    await prisma.reasoning.create({
      data: {
        assertionId: assertion.id,
        content: input.reasoning,
      },
    });
  }

  // Add source if provided
  if (input.sourceUrl) {
    const source = await prisma.source.upsert({
      where: { url: input.sourceUrl },
      update: {},
      create: { url: input.sourceUrl },
    });

    await prisma.assertionSource.create({
      data: {
        assertionId: assertion.id,
        sourceId: source.id,
        quote: input.sourceQuote,
      },
    });
  }

  await prisma.researchLog.create({
    data: {
      action: 'assertion_created',
      agentId: input.agentId,
      details: {
        assertionId: assertion.id,
        entityId: input.entityId,
        claim: input.claim,
        hasEvidence: !!(input.evidenceDescription && input.evidenceScreenshotPath),
        evidenceScreenshotPath: input.evidenceScreenshotPath,
      },
    },
  });

  return prisma.assertion.findUnique({
    where: { id: assertion.id },
    include: {
      reasoning: true,
      sources: { include: { source: true } },
    },
  });
}

/**
 * Get an assertion by ID with all related data
 */
export async function getAssertion(assertionId: string) {
  return prisma.assertion.findUnique({
    where: { id: assertionId },
    include: {
      entity: { include: { project: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
  });
}

/**
 * List assertions for an entity
 */
export async function listAssertions(entityId: string) {
  return prisma.assertion.findMany({
    where: { entityId },
    include: {
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Search assertions
 */
export async function searchAssertions(input: SearchAssertionsInput) {
  const where: any = {};

  if (input.entityId) {
    where.entityId = input.entityId;
  }

  if (input.projectId) {
    where.entity = { projectId: input.projectId };
  }

  if (input.query) {
    where.claim = { contains: input.query, mode: 'insensitive' };
  }

  if (input.category) {
    where.category = input.category;
  }

  if (input.status) {
    where.status = input.status;
  }

  if (input.criticality) {
    where.criticality = input.criticality;
  }

  if (input.citedInConclusion !== undefined) {
    where.citedInConclusion = input.citedInConclusion;
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: [
      { criticality: 'asc' }, // CRITICAL first
      { createdAt: 'desc' },
    ],
    take: 100,
  });
}

/**
 * Update an assertion
 */
export async function updateAssertion(assertionId: string, input: UpdateAssertionInput) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: input,
  });

  await prisma.researchLog.create({
    data: {
      action: 'assertion_updated',
      details: { assertionId, changes: JSON.parse(JSON.stringify(input)) },
    },
  });

  return assertion;
}

/**
 * Add reasoning to an existing assertion
 */
export async function addReasoning(assertionId: string, content: string, agentId?: string) {
  const reasoning = await prisma.reasoning.create({
    data: {
      assertionId,
      content,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'reasoning_added',
      agentId,
      details: { assertionId, reasoningId: reasoning.id },
    },
  });

  return reasoning;
}

/**
 * Validate an assertion (human action - promotes CLAIM to EVIDENCE)
 */
export async function validateAssertion(assertionId: string, validatedBy: string) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      status: AssertionStatus.EVIDENCE,
      validatedAt: new Date(),
      validatedBy,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'assertion_validated',
      details: { assertionId, validatedBy },
    },
  });

  return assertion;
}

/**
 * Reject an assertion (human action)
 * Includes rejection reason to guide re-research
 */
export async function rejectAssertion(assertionId: string, validatedBy: string, rejectionReason?: string) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      status: AssertionStatus.REJECTED,
      validatedAt: new Date(),
      validatedBy,
      rejectionReason,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'assertion_rejected',
      details: { assertionId, validatedBy, rejectionReason },
    },
  });

  return assertion;
}

/**
 * Set criticality level for an assertion
 */
export async function setCriticality(assertionId: string, criticality: AssertionCriticality) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: { criticality },
  });

  await prisma.researchLog.create({
    data: {
      action: 'criticality_set',
      details: { assertionId, criticality },
    },
  });

  return assertion;
}

/**
 * Mark an assertion as cited in conclusions
 */
export async function markCitedInConclusion(assertionId: string, conclusionContext: string) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      citedInConclusion: true,
      conclusionContext,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'cited_in_conclusion',
      details: { assertionId, conclusionContext },
    },
  });

  return assertion;
}

/**
 * Get assertions pending validation (CLAIM status) sorted by criticality
 * Specifically for human-in-the-loop validation workflow
 */
export async function getAssertionsPendingValidation(projectId?: string) {
  const where: any = {
    status: AssertionStatus.CLAIM,
  };

  if (projectId) {
    where.entity = { projectId };
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true, projectId: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: [
      { criticality: 'asc' }, // CRITICAL first (enum order)
      { citedInConclusion: 'desc' }, // Cited in conclusions first
      { createdAt: 'desc' },
    ],
  });
}

/**
 * Get rejected assertions that need re-research
 */
export async function getRejectedForReresearch(projectId?: string) {
  const where: any = {
    status: AssertionStatus.REJECTED,
    supersededBy: null, // Not yet replaced
  };

  if (projectId) {
    where.entity = { projectId };
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true, projectId: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: [
      { criticality: 'asc' },
      { createdAt: 'desc' },
    ],
  });
}

/**
 * Link a new assertion as superseding a rejected one
 */
export async function supersededAssertion(rejectedId: string, newAssertionId: string) {
  const assertion = await prisma.assertion.update({
    where: { id: rejectedId },
    data: { supersededBy: newAssertionId },
  });

  await prisma.researchLog.create({
    data: {
      action: 'assertion_superseded',
      details: { rejectedId, newAssertionId },
    },
  });

  return assertion;
}

/**
 * Add a human response to an assertion (conversational validation)
 * This captures the researcher's interpretation, partial validation, or challenge
 */
export async function addHumanResponse(
  assertionId: string,
  response: string,
  validatedBy: string,
  options: {
    partiallyValidated?: boolean;
    validatedClaims?: string[];
    challengedClaims?: string[];
  } = {}
) {
  // Get current assertion to append to validation notes
  const current = await prisma.assertion.findUnique({
    where: { id: assertionId },
    select: { validationNotes: true },
  });

  const existingNotes = (current?.validationNotes as any[]) || [];
  const newNote = {
    role: 'human',
    content: response,
    timestamp: new Date().toISOString(),
    validatedBy,
    ...(options.validatedClaims && { validatedClaims: options.validatedClaims }),
    ...(options.challengedClaims && { challengedClaims: options.challengedClaims }),
  };

  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      humanResponse: response,
      validationNotes: [...existingNotes, newNote],
      partiallyValidated: options.partiallyValidated ?? false,
      validatedBy,
      validatedAt: new Date(),
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'human_response_added',
      details: {
        assertionId,
        validatedBy,
        partiallyValidated: options.partiallyValidated,
        hasChallenge: !!options.challengedClaims?.length,
      },
    },
  });

  return assertion;
}

/**
 * Add an agent response to the validation dialogue
 * Used when AI responds to a human challenge
 */
export async function addAgentResponse(
  assertionId: string,
  response: string,
  agentId?: string
) {
  const current = await prisma.assertion.findUnique({
    where: { id: assertionId },
    select: { validationNotes: true },
  });

  const existingNotes = (current?.validationNotes as any[]) || [];
  const newNote = {
    role: 'agent',
    content: response,
    timestamp: new Date().toISOString(),
    agentId,
  };

  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      validationNotes: [...existingNotes, newNote],
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'agent_response_added',
      agentId,
      details: { assertionId },
    },
  });

  return assertion;
}

/**
 * Get assertions with active validation dialogues (partially validated or challenged)
 */
export async function getActiveDialogues(projectId?: string) {
  const where: any = {
    OR: [
      { partiallyValidated: true },
      { validationNotes: { not: null } },
    ],
    status: AssertionStatus.CLAIM, // Still not fully resolved
  };

  if (projectId) {
    where.entity = { projectId };
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true, projectId: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

/**
 * Delete an assertion
 */
export async function deleteAssertion(assertionId: string) {
  await prisma.researchLog.create({
    data: {
      action: 'assertion_deleted',
      details: { assertionId },
    },
  });

  return prisma.assertion.delete({
    where: { id: assertionId },
  });
}

/**
 * Find similar assertions (to avoid duplicates)
 */
export async function findSimilarAssertions(entityId: string, claim: string) {
  // Simple text search - in production, consider using full-text search
  return prisma.assertion.findMany({
    where: {
      entityId,
      claim: {
        contains: claim.split(' ').slice(0, 3).join(' '),
        mode: 'insensitive',
      },
    },
    include: {
      reasoning: true,
      sources: { include: { source: true } },
    },
  });
}

/**
 * Assertion confidence scoring factors interface
 */
export interface AssertionConfidenceFactors {
  sourceCount: number;          // Number of corroborating sources
  sourceQuality: number;         // Average quality of sources (0-1)
  evidenceCompleteness: number;  // Evidence quality (0-1)
  freshness: number;             // How recent the data is (0-1)
  conflictScore: number;         // Presence of conflicts (0-1, 1 = no conflicts)
  breakdown: {
    sourceCountScore: number;    // Contribution from source count
    sourceQualityScore: number;  // Contribution from source quality
    evidenceScore: number;       // Contribution from evidence
    freshnessScore: number;      // Contribution from freshness
    conflictPenalty: number;     // Penalty from conflicts
  };
}

/**
 * Calculate confidence score for an assertion
 *
 * Algorithm considers:
 * - Number of corroborating sources (more = higher)
 * - Source quality (vendor docs > blogs)
 * - Evidence completeness (screenshot + quote > URL only)
 * - Freshness (newer = higher)
 * - Absence of conflicts (no conflicts = higher)
 */
export async function calculateConfidence(assertionId: string): Promise<{ score: number; factors: AssertionConfidenceFactors }> {
  const assertion = await prisma.assertion.findUnique({
    where: { id: assertionId },
    include: {
      sources: {
        include: {
          source: true,
        },
      },
    },
  });

  if (!assertion) {
    throw new Error(`Assertion ${assertionId} not found`);
  }

  // 1. Source Count Score (0-30 points)
  // 0 sources = 0, 1 source = 10, 2 sources = 20, 3+ sources = 30
  const sourceCount = assertion.sources.length;
  const sourceCountScore = Math.min(sourceCount * 10, 30);

  // 2. Source Quality Score (0-30 points)
  // vendor_docs/github = 1.0, press = 0.8, blog = 0.6, forum = 0.4
  const sourceQualityWeights: Record<string, number> = {
    vendor_docs: 1.0,
    github: 1.0,
    press: 0.8,
    blog: 0.6,
    forum: 0.4,
  };

  const sourceQualities = assertion.sources.map(s => {
    const type = s.source.sourceType || 'unknown';
    return sourceQualityWeights[type] || 0.5;
  });

  const avgSourceQuality = sourceQualities.length > 0
    ? sourceQualities.reduce((sum, q) => sum + q, 0) / sourceQualities.length
    : 0;
  const sourceQualityScore = avgSourceQuality * 30;

  // 3. Evidence Completeness Score (0-25 points)
  // Screenshot + description = 25, screenshot only = 15, quote = 10, URL only = 5
  let evidenceScore = 0;
  if (assertion.evidenceScreenshotPath && assertion.evidenceDescription) {
    evidenceScore = 25;
  } else if (assertion.evidenceScreenshotPath) {
    evidenceScore = 15;
  } else if (assertion.sources.some(s => s.quote)) {
    evidenceScore = 10;
  } else if (assertion.sources.length > 0) {
    evidenceScore = 5;
  }

  // 4. Freshness Score (0-10 points)
  // < 30 days = 10, < 90 days = 7, < 180 days = 4, older = 1
  const ageInDays = Math.floor((Date.now() - assertion.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  let freshnessScore = 1;
  if (ageInDays < 30) freshnessScore = 10;
  else if (ageInDays < 90) freshnessScore = 7;
  else if (ageInDays < 180) freshnessScore = 4;

  // 5. Conflict Detection (0-5 points penalty)
  // Check if other assertions about the same entity contradict this claim
  // Simple heuristic: look for similar category assertions with different claims
  const conflictingAssertions = await prisma.assertion.findMany({
    where: {
      entityId: assertion.entityId,
      category: assertion.category,
      NOT: { id: assertionId },
      status: { not: 'REJECTED' },
    },
  });

  // Simple conflict detection: if claims differ significantly in same category
  const hasConflict = conflictingAssertions.some(other => {
    // Very basic: check if claims are very different (could be improved)
    const similarity = calculateTextSimilarity(assertion.claim, other.claim);
    return similarity < 0.3; // Different claims in same category
  });

  const conflictPenalty = hasConflict ? -5 : 0;

  // Calculate total score (0-100 scale, convert to 0-1)
  const totalPoints = sourceCountScore + sourceQualityScore + evidenceScore + freshnessScore + conflictPenalty;
  const score = Math.max(0, Math.min(1, totalPoints / 100));

  const factors: AssertionConfidenceFactors = {
    sourceCount,
    sourceQuality: avgSourceQuality,
    evidenceCompleteness: evidenceScore / 25,
    freshness: freshnessScore / 10,
    conflictScore: hasConflict ? 0 : 1,
    breakdown: {
      sourceCountScore,
      sourceQualityScore,
      evidenceScore,
      freshnessScore,
      conflictPenalty,
    },
  };

  return { score, factors };
}

/**
 * Simple text similarity calculation (Jaccard similarity)
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Update confidence score for an assertion
 */
export async function updateConfidence(
  assertionId: string,
  score?: number,
  factors?: AssertionConfidenceFactors
) {
  // If no score provided, calculate it
  let finalScore = score;
  let finalFactors = factors;

  if (score === undefined) {
    const calculated = await calculateConfidence(assertionId);
    finalScore = calculated.score;
    finalFactors = calculated.factors;
  }

  // Get current validation history
  const current = await prisma.assertion.findUnique({
    where: { id: assertionId },
    select: { validationHistory: true, confidence: true },
  });

  const existingHistory = (current?.validationHistory as any[]) || [];
  const newHistoryEntry = {
    timestamp: new Date().toISOString(),
    previousScore: current?.confidence,
    newScore: finalScore,
    factors: finalFactors,
  };

  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      confidence: finalScore,
      confidenceFactors: finalFactors as any,
      lastValidatedAt: new Date(),
      validationHistory: [...existingHistory, newHistoryEntry] as any,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'confidence_updated',
      details: {
        assertionId,
        score: finalScore,
        factors: finalFactors as any,
      } as any,
    },
  });

  return assertion;
}

/**
 * Get assertions filtered by confidence score
 */
export async function getAssertionsByConfidence(
  entityId: string,
  minConfidence: number,
  maxConfidence?: number
) {
  const where: any = {
    entityId,
    confidence: {
      gte: minConfidence,
    },
  };

  if (maxConfidence !== undefined) {
    where.confidence.lte = maxConfidence;
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: [
      { confidence: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

/**
 * Get low-confidence assertions that need validation
 */
export async function getLowConfidenceAssertions(
  projectId?: string,
  threshold: number = 0.5
) {
  const where: any = {
    OR: [
      { confidence: { lt: threshold } },
      { confidence: null },
    ],
    status: 'CLAIM', // Only unvalidated assertions
  };

  if (projectId) {
    where.entity = { projectId };
  }

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true, projectId: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: [
      { criticality: 'asc' }, // CRITICAL first
      { confidence: 'asc' },  // Lowest confidence first
      { createdAt: 'desc' },
    ],
  });
}

/**
 * Batch update confidence scores for all assertions in a project
 */
export async function recalculateProjectConfidence(projectId: string) {
  const assertions = await prisma.assertion.findMany({
    where: {
      entity: { projectId },
      status: 'CLAIM',
    },
    select: { id: true },
  });

  const results = {
    total: assertions.length,
    updated: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const assertion of assertions) {
    try {
      await updateConfidence(assertion.id);
      results.updated++;
    } catch (error) {
      results.failed++;
      results.errors.push(`${assertion.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return results;
}
