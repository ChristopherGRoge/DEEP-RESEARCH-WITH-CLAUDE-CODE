import prisma from '../db/client';
import { AssertionStatus } from '../../generated/prisma/client';

export interface CreateAssertionInput {
  entityId: string;
  claim: string;
  category?: string;
  confidence?: number;
  reasoning?: string;
  sourceUrl?: string;
  sourceQuote?: string;
  agentId?: string;
}

export interface UpdateAssertionInput {
  claim?: string;
  category?: string;
  confidence?: number;
}

export interface SearchAssertionsInput {
  entityId?: string;
  projectId?: string;
  query?: string;
  category?: string;
  status?: AssertionStatus;
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

  return prisma.assertion.findMany({
    where,
    include: {
      entity: { select: { id: true, name: true } },
      reasoning: true,
      sources: { include: { source: true } },
    },
    orderBy: { createdAt: 'desc' },
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
 */
export async function rejectAssertion(assertionId: string, validatedBy: string) {
  const assertion = await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      status: AssertionStatus.REJECTED,
      validatedAt: new Date(),
      validatedBy,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'assertion_rejected',
      details: { assertionId, validatedBy },
    },
  });

  return assertion;
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
