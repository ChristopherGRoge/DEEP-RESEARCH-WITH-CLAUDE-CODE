import prisma from '../db/client';
import { AssertionStatus, AssertionCriticality } from '../../generated/prisma/client';

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
 */
export async function createAssertion(input: CreateAssertionInput) {
  const assertion = await prisma.assertion.create({
    data: {
      entityId: input.entityId,
      claim: input.claim,
      category: input.category,
      confidence: input.confidence,
      criticality: input.criticality || AssertionCriticality.MEDIUM,
      status: AssertionStatus.CLAIM,
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
