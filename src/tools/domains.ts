import prisma from '../db/client';

// ============================================
// RESEARCH DOMAIN TOOLS
// Domain-driven research configuration and management
// ============================================

export interface CreateDomainInput {
  name: string;
  description: string;
  entityTypes?: string[];
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  searchHints?: string;
  knownLeaders?: string[];
  relevantTopics?: string[];
  evaluationDimensions?: Array<{ name: string; weight: number; description?: string }>;
  createdBy?: string;
}

export interface UpdateDomainInput {
  name?: string;
  description?: string;
  entityTypes?: string[];
  inclusionCriteria?: string;
  exclusionCriteria?: string;
  searchHints?: string;
  knownLeaders?: string[];
  relevantTopics?: string[];
  evaluationDimensions?: Array<{ name: string; weight: number; description?: string }>;
}

/**
 * Create a new research domain
 */
export async function createDomain(input: CreateDomainInput) {
  const domain = await prisma.researchDomain.create({
    data: {
      name: input.name,
      description: input.description,
      entityTypes: input.entityTypes || ['tool'],
      inclusionCriteria: input.inclusionCriteria,
      exclusionCriteria: input.exclusionCriteria,
      searchHints: input.searchHints,
      knownLeaders: input.knownLeaders || [],
      relevantTopics: input.relevantTopics || [],
      evaluationDimensions: input.evaluationDimensions,
      createdBy: input.createdBy,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'domain_created',
      details: { domainId: domain.id, name: domain.name },
    },
  });

  return domain;
}

/**
 * Get a domain by ID or name
 */
export async function getDomain(identifier: string) {
  // Try by ID first, then by name
  let domain = await prisma.researchDomain.findUnique({
    where: { id: identifier },
    include: {
      _count: {
        select: { entities: true },
      },
    },
  });

  if (!domain) {
    domain = await prisma.researchDomain.findUnique({
      where: { name: identifier },
      include: {
        _count: {
          select: { entities: true },
        },
      },
    });
  }

  return domain;
}

/**
 * List all research domains
 */
export async function listDomains() {
  return prisma.researchDomain.findMany({
    include: {
      _count: {
        select: { entities: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

/**
 * Update a research domain
 */
export async function updateDomain(domainId: string, input: UpdateDomainInput) {
  const domain = await prisma.researchDomain.update({
    where: { id: domainId },
    data: {
      ...input,
      updatedAt: new Date(),
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'domain_updated',
      details: { domainId: domain.id, changes: JSON.parse(JSON.stringify(input)) },
    },
  });

  return domain;
}

/**
 * Delete a research domain
 * Note: This will null out domainId on associated entities, not delete them
 */
export async function deleteDomain(domainId: string) {
  // First, get the domain to log its name
  const domain = await prisma.researchDomain.findUnique({
    where: { id: domainId },
    select: { name: true },
  });

  await prisma.researchLog.create({
    data: {
      action: 'domain_deleted',
      details: { domainId, name: domain?.name },
    },
  });

  return prisma.researchDomain.delete({
    where: { id: domainId },
  });
}

/**
 * Find domain by name (case-insensitive)
 */
export async function findDomainByName(name: string) {
  return prisma.researchDomain.findFirst({
    where: {
      name: {
        equals: name,
        
      },
    },
    include: {
      _count: {
        select: { entities: true },
      },
    },
  });
}

/**
 * Update domain entity count and last discovery timestamp
 */
export async function updateDomainDiscoveryStats(domainId: string) {
  const entityCount = await prisma.entity.count({
    where: { domainId },
  });

  return prisma.researchDomain.update({
    where: { id: domainId },
    data: {
      entityCount,
      lastDiscoveryAt: new Date(),
    },
  });
}

/**
 * Get entities belonging to a domain
 */
export async function getDomainEntities(domainId: string, options?: { limit?: number; offset?: number }) {
  return prisma.entity.findMany({
    where: { domainId },
    include: {
      _count: {
        select: { assertions: true, extractions: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit,
    skip: options?.offset,
  });
}

/**
 * Get domain summary with statistics
 */
export async function getDomainSummary(domainId: string) {
  const domain = await prisma.researchDomain.findUnique({
    where: { id: domainId },
    include: {
      _count: {
        select: { entities: true },
      },
    },
  });

  if (!domain) return null;

  // Get entity statistics
  const entities = await prisma.entity.findMany({
    where: { domainId },
    include: {
      _count: {
        select: { assertions: true, extractions: true },
      },
    },
  });

  const totalAssertions = entities.reduce((sum, e) => sum + e._count.assertions, 0);
  const totalExtractions = entities.reduce((sum, e) => sum + e._count.extractions, 0);
  const entitiesWithUrl = entities.filter(e => e.url).length;

  return {
    domain,
    statistics: {
      totalEntities: domain._count.entities,
      entitiesWithUrl,
      totalAssertions,
      totalExtractions,
      avgAssertionsPerEntity: domain._count.entities > 0 ? totalAssertions / domain._count.entities : 0,
      avgExtractionsPerEntity: domain._count.entities > 0 ? totalExtractions / domain._count.entities : 0,
    },
  };
}
