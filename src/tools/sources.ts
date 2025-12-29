import prisma from '../db/client';
import { SourceStatus } from '../../generated/prisma/client';

export interface CreateSourceInput {
  url: string;
  title?: string;
  description?: string;
  sourceType?: string;
}

export interface UpdateSourceInput {
  title?: string;
  description?: string;
  sourceType?: string;
}

export interface LinkSourceInput {
  assertionId: string;
  sourceId?: string;
  sourceUrl?: string;
  quote?: string;
  agentId?: string;
}

/**
 * Create or get a source by URL
 */
export async function createSource(input: CreateSourceInput) {
  const source = await prisma.source.upsert({
    where: { url: input.url },
    update: {
      title: input.title || undefined,
      description: input.description || undefined,
      sourceType: input.sourceType || undefined,
    },
    create: {
      url: input.url,
      title: input.title,
      description: input.description,
      sourceType: input.sourceType,
      status: SourceStatus.PROPOSED,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'source_created',
      details: { sourceId: source.id, url: source.url },
    },
  });

  return source;
}

/**
 * Get a source by ID
 */
export async function getSource(sourceId: string) {
  return prisma.source.findUnique({
    where: { id: sourceId },
    include: {
      assertions: {
        include: {
          assertion: {
            include: {
              entity: { select: { id: true, name: true } },
            },
          },
        },
      },
    },
  });
}

/**
 * Find source by URL
 */
export async function findSourceByUrl(url: string) {
  return prisma.source.findUnique({
    where: { url },
    include: {
      assertions: {
        include: {
          assertion: true,
        },
      },
    },
  });
}

/**
 * List all sources
 */
export async function listSources(status?: SourceStatus) {
  const where = status ? { status } : {};

  return prisma.source.findMany({
    where,
    include: {
      _count: {
        select: { assertions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Search sources
 */
export async function searchSources(query: string) {
  return prisma.source.findMany({
    where: {
      OR: [
        { url: { contains: query, mode: 'insensitive' } },
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      _count: {
        select: { assertions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

/**
 * Link a source to an assertion
 */
export async function linkSourceToAssertion(input: LinkSourceInput) {
  let sourceId = input.sourceId;

  // If URL provided instead of ID, find or create the source
  if (input.sourceUrl && !sourceId) {
    const source = await prisma.source.upsert({
      where: { url: input.sourceUrl },
      update: {},
      create: { url: input.sourceUrl },
    });
    sourceId = source.id;
  }

  if (!sourceId) {
    throw new Error('Either sourceId or sourceUrl must be provided');
  }

  const link = await prisma.assertionSource.upsert({
    where: {
      assertionId_sourceId: {
        assertionId: input.assertionId,
        sourceId,
      },
    },
    update: {
      quote: input.quote || undefined,
    },
    create: {
      assertionId: input.assertionId,
      sourceId,
      quote: input.quote,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'source_linked',
      agentId: input.agentId,
      details: {
        assertionId: input.assertionId,
        sourceId,
        quote: input.quote,
      },
    },
  });

  return link;
}

/**
 * Update a source
 */
export async function updateSource(sourceId: string, input: UpdateSourceInput) {
  const source = await prisma.source.update({
    where: { id: sourceId },
    data: input,
  });

  await prisma.researchLog.create({
    data: {
      action: 'source_updated',
      details: { sourceId, changes: JSON.parse(JSON.stringify(input)) },
    },
  });

  return source;
}

/**
 * Validate a source (human action)
 */
export async function validateSource(sourceId: string, validatedBy: string) {
  const source = await prisma.source.update({
    where: { id: sourceId },
    data: {
      status: SourceStatus.VALIDATED,
      validatedAt: new Date(),
      validatedBy,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'source_validated',
      details: { sourceId, validatedBy },
    },
  });

  return source;
}

/**
 * Reject a source (human action)
 */
export async function rejectSource(sourceId: string, validatedBy: string) {
  const source = await prisma.source.update({
    where: { id: sourceId },
    data: {
      status: SourceStatus.REJECTED,
      validatedAt: new Date(),
      validatedBy,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'source_rejected',
      details: { sourceId, validatedBy },
    },
  });

  return source;
}

/**
 * Delete a source
 */
export async function deleteSource(sourceId: string) {
  await prisma.researchLog.create({
    data: {
      action: 'source_deleted',
      details: { sourceId },
    },
  });

  return prisma.source.delete({
    where: { id: sourceId },
  });
}

/**
 * Get sources by type
 */
export async function getSourcesByType(sourceType: string) {
  return prisma.source.findMany({
    where: { sourceType },
    include: {
      _count: {
        select: { assertions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
