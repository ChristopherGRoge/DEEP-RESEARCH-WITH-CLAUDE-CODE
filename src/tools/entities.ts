import prisma from '../db/client';

export interface CreateEntityInput {
  projectId: string;
  name: string;
  description?: string;
  entityType?: string;
  url?: string;
}

export interface UpdateEntityInput {
  name?: string;
  description?: string;
  entityType?: string;
  url?: string;
}

export interface SearchEntitiesInput {
  projectId?: string;
  query?: string;
  entityType?: string;
}

/**
 * Create a new entity within a project
 * Uses upsert to avoid duplicates - if entity with same name exists, returns existing
 */
export async function createEntity(input: CreateEntityInput) {
  const entity = await prisma.entity.upsert({
    where: {
      projectId_name: {
        projectId: input.projectId,
        name: input.name,
      },
    },
    update: {
      // Only update if new data is more complete
      description: input.description || undefined,
      entityType: input.entityType || undefined,
      url: input.url || undefined,
    },
    create: {
      projectId: input.projectId,
      name: input.name,
      description: input.description,
      entityType: input.entityType,
      url: input.url,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'entity_created',
      details: { entityId: entity.id, name: entity.name, projectId: input.projectId },
    },
  });

  return entity;
}

/**
 * Get an entity by ID with all related data
 */
export async function getEntity(entityId: string) {
  return prisma.entity.findUnique({
    where: { id: entityId },
    include: {
      project: true,
      assertions: {
        include: {
          sources: { include: { source: true } },
          reasoning: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Find entity by name within a project
 */
export async function findEntityByName(projectId: string, name: string) {
  return prisma.entity.findFirst({
    where: {
      projectId,
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
    include: {
      assertions: {
        include: {
          sources: { include: { source: true } },
          reasoning: true,
        },
      },
    },
  });
}

/**
 * List all entities in a project
 */
export async function listEntities(projectId: string) {
  return prisma.entity.findMany({
    where: { projectId },
    include: {
      _count: {
        select: { assertions: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

/**
 * Search entities across projects
 */
export async function searchEntities(input: SearchEntitiesInput) {
  const where: any = {};

  if (input.projectId) {
    where.projectId = input.projectId;
  }

  if (input.query) {
    where.OR = [
      { name: { contains: input.query, mode: 'insensitive' } },
      { description: { contains: input.query, mode: 'insensitive' } },
    ];
  }

  if (input.entityType) {
    where.entityType = input.entityType;
  }

  return prisma.entity.findMany({
    where,
    include: {
      project: { select: { id: true, name: true } },
      _count: {
        select: { assertions: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  });
}

/**
 * Update an entity
 */
export async function updateEntity(entityId: string, input: UpdateEntityInput) {
  const entity = await prisma.entity.update({
    where: { id: entityId },
    data: input,
  });

  await prisma.researchLog.create({
    data: {
      action: 'entity_updated',
      details: { entityId: entity.id, changes: JSON.parse(JSON.stringify(input)) },
    },
  });

  return entity;
}

/**
 * Delete an entity and all related assertions
 */
export async function deleteEntity(entityId: string) {
  await prisma.researchLog.create({
    data: {
      action: 'entity_deleted',
      details: { entityId },
    },
  });

  return prisma.entity.delete({
    where: { id: entityId },
  });
}

/**
 * Check if an entity exists by name in a project
 */
export async function entityExists(projectId: string, name: string): Promise<boolean> {
  const count = await prisma.entity.count({
    where: {
      projectId,
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });
  return count > 0;
}
