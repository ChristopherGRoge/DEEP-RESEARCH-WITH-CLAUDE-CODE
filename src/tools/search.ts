import prisma from '../db/client';
import { AssertionStatus, SourceStatus } from '../../generated/prisma/client';

// Schema types for extraction coverage tracking
const SCHEMA_TYPES = ['pricing', 'features', 'company', 'compliance', 'integrations'] as const;
type SchemaType = typeof SCHEMA_TYPES[number];

export interface GlobalSearchInput {
  query: string;
  projectId?: string;
  includeEntities?: boolean;
  includeAssertions?: boolean;
  includeSources?: boolean;
  limit?: number;
}

export interface ResearchSummary {
  project: {
    id: string;
    name: string;
    workflow: string;
  };
  entityCount: number;
  claimCount: number;
  evidenceCount: number;
  sourceCount: number;
  validatedSourceCount: number;
}

/**
 * Global search across entities, assertions, and sources
 */
export async function globalSearch(input: GlobalSearchInput) {
  const limit = input.limit || 20;
  const results: {
    entities: any[];
    assertions: any[];
    sources: any[];
  } = {
    entities: [],
    assertions: [],
    sources: [],
  };

  const projectFilter = input.projectId ? { projectId: input.projectId } : {};

  // Search entities
  if (input.includeEntities !== false) {
    results.entities = await prisma.entity.findMany({
      where: {
        ...projectFilter,
        OR: [
          { name: { contains: input.query, mode: 'insensitive' } },
          { description: { contains: input.query, mode: 'insensitive' } },
        ],
      },
      include: {
        project: { select: { id: true, name: true } },
        _count: { select: { assertions: true } },
      },
      take: limit,
    });
  }

  // Search assertions
  if (input.includeAssertions !== false) {
    const assertionWhere: any = {
      claim: { contains: input.query, mode: 'insensitive' },
    };

    if (input.projectId) {
      assertionWhere.entity = { projectId: input.projectId };
    }

    results.assertions = await prisma.assertion.findMany({
      where: assertionWhere,
      include: {
        entity: { select: { id: true, name: true } },
        sources: { include: { source: true } },
      },
      take: limit,
    });
  }

  // Search sources
  if (input.includeSources !== false) {
    results.sources = await prisma.source.findMany({
      where: {
        OR: [
          { url: { contains: input.query, mode: 'insensitive' } },
          { title: { contains: input.query, mode: 'insensitive' } },
          { description: { contains: input.query, mode: 'insensitive' } },
        ],
      },
      include: {
        _count: { select: { assertions: true } },
      },
      take: limit,
    });
  }

  return results;
}

/**
 * Get a summary of research for a project
 */
export async function getResearchSummary(projectId: string): Promise<ResearchSummary | null> {
  const project = await prisma.researchProject.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return null;
  }

  const entityCount = await prisma.entity.count({
    where: { projectId },
  });

  const claimCount = await prisma.assertion.count({
    where: {
      entity: { projectId },
      status: AssertionStatus.CLAIM,
    },
  });

  const evidenceCount = await prisma.assertion.count({
    where: {
      entity: { projectId },
      status: AssertionStatus.EVIDENCE,
    },
  });

  // Count unique sources linked to assertions in this project
  const sourcesResult = await prisma.assertionSource.findMany({
    where: {
      assertion: {
        entity: { projectId },
      },
    },
    select: {
      sourceId: true,
    },
    distinct: ['sourceId'],
  });

  const sourceIds = sourcesResult.map((s) => s.sourceId);
  const sourceCount = sourceIds.length;

  const validatedSourceCount = await prisma.source.count({
    where: {
      id: { in: sourceIds },
      status: SourceStatus.VALIDATED,
    },
  });

  return {
    project: {
      id: project.id,
      name: project.name,
      workflow: project.workflow,
    },
    entityCount,
    claimCount,
    evidenceCount,
    sourceCount,
    validatedSourceCount,
  };
}

/**
 * Get pending items needing human validation
 */
export async function getPendingValidation(projectId?: string) {
  const entityFilter = projectId ? { entity: { projectId } } : {};

  const pendingClaims = await prisma.assertion.findMany({
    where: {
      ...entityFilter,
      status: AssertionStatus.CLAIM,
    },
    include: {
      entity: { select: { id: true, name: true } },
      sources: { include: { source: true } },
      reasoning: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  const pendingSources = await prisma.source.findMany({
    where: {
      status: SourceStatus.PROPOSED,
    },
    include: {
      _count: { select: { assertions: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  return {
    claims: pendingClaims,
    sources: pendingSources,
  };
}

/**
 * Get recent research activity
 */
export async function getRecentActivity(limit: number = 50) {
  return prisma.researchLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get entities without any assertions
 */
export async function getEntitiesWithoutAssertions(projectId: string) {
  return prisma.entity.findMany({
    where: {
      projectId,
      assertions: {
        none: {},
      },
    },
  });
}

/**
 * Get assertions without sources
 */
export async function getAssertionsWithoutSources(projectId?: string) {
  const entityFilter = projectId ? { entity: { projectId } } : {};

  return prisma.assertion.findMany({
    where: {
      ...entityFilter,
      sources: {
        none: {},
      },
    },
    include: {
      entity: { select: { id: true, name: true } },
    },
  });
}

// ============================================
// RESEARCH GAPS REPORT
// ============================================

export interface EntityGap {
  id: string;
  name: string;
  url: string | null;
  entityType: string | null;
  extractionCount: number;
  missingSchemas: SchemaType[];
  existingSchemas: SchemaType[];
  hasUrl: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface SchemaTypeCoverage {
  schemaType: SchemaType;
  entitiesWithExtraction: number;
  entitiesWithoutExtraction: number;
  coveragePercent: number;
}

export interface ResearchGapsReport {
  project: {
    id: string;
    name: string;
  };
  summary: {
    totalEntities: number;
    entitiesWithUrl: number;
    entitiesWithNoExtractions: number;
    entitiesFullyCovered: number;
    averageExtractionCount: number;
    totalExtractions: number;
  };
  coverageBySchema: SchemaTypeCoverage[];
  entityGaps: EntityGap[];
  priorities: {
    high: EntityGap[];
    medium: EntityGap[];
    low: EntityGap[];
  };
  nextActions: string[];
}

/**
 * Get comprehensive research gaps report for a project
 *
 * This identifies:
 * - Which entities are missing which extraction types
 * - Overall coverage by schema type
 * - Priority ranking for what to research next
 */
export async function getResearchGaps(projectId: string): Promise<ResearchGapsReport | null> {
  // Get project
  const project = await prisma.researchProject.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return null;
  }

  // Get all entities with their extractions
  const entities = await prisma.entity.findMany({
    where: { projectId },
    include: {
      extractions: {
        where: { status: 'COMPLETED' },
        select: { schemaType: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  // Calculate per-entity gaps
  const entityGaps: EntityGap[] = entities.map((entity) => {
    const existingSchemas = [...new Set(entity.extractions.map(e => e.schemaType))] as SchemaType[];
    const missingSchemas = SCHEMA_TYPES.filter(s => !existingSchemas.includes(s));
    const hasUrl = !!entity.url;

    // Priority: high = has URL but 0 extractions, medium = has URL with some gaps, low = no URL
    let priority: 'high' | 'medium' | 'low';
    if (!hasUrl) {
      priority = 'low';
    } else if (existingSchemas.length === 0) {
      priority = 'high';
    } else if (missingSchemas.length > 0) {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    return {
      id: entity.id,
      name: entity.name,
      url: entity.url,
      entityType: entity.entityType,
      extractionCount: existingSchemas.length,
      missingSchemas,
      existingSchemas,
      hasUrl,
      priority,
    };
  });

  // Sort by priority (high first) then by extraction count (fewer first)
  entityGaps.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.extractionCount - b.extractionCount;
  });

  // Calculate coverage by schema type
  const coverageBySchema: SchemaTypeCoverage[] = SCHEMA_TYPES.map((schemaType) => {
    const entitiesWithExtraction = entityGaps.filter(
      e => e.existingSchemas.includes(schemaType)
    ).length;
    const entitiesWithoutExtraction = entities.length - entitiesWithExtraction;
    const coveragePercent = entities.length > 0
      ? Math.round((entitiesWithExtraction / entities.length) * 100)
      : 0;

    return {
      schemaType,
      entitiesWithExtraction,
      entitiesWithoutExtraction,
      coveragePercent,
    };
  });

  // Calculate summary stats
  const entitiesWithUrl = entityGaps.filter(e => e.hasUrl).length;
  const entitiesWithNoExtractions = entityGaps.filter(e => e.extractionCount === 0).length;
  const entitiesFullyCovered = entityGaps.filter(e => e.missingSchemas.length === 0).length;
  const totalExtractions = entityGaps.reduce((sum, e) => sum + e.extractionCount, 0);
  const averageExtractionCount = entities.length > 0
    ? Math.round((totalExtractions / entities.length) * 10) / 10
    : 0;

  // Group by priority
  const priorities = {
    high: entityGaps.filter(e => e.priority === 'high'),
    medium: entityGaps.filter(e => e.priority === 'medium'),
    low: entityGaps.filter(e => e.priority === 'low'),
  };

  // Generate actionable next steps
  const nextActions: string[] = [];

  // Find lowest coverage schema
  const lowestCoverage = [...coverageBySchema].sort((a, b) => a.coveragePercent - b.coveragePercent)[0];
  if (lowestCoverage && lowestCoverage.coveragePercent < 100) {
    nextActions.push(
      `Extract ${lowestCoverage.schemaType} data (${lowestCoverage.coveragePercent}% coverage, ${lowestCoverage.entitiesWithoutExtraction} entities missing)`
    );
  }

  // Suggest high priority entities
  if (priorities.high.length > 0) {
    const topHighPriority = priorities.high.slice(0, 3).map(e => e.name).join(', ');
    nextActions.push(
      `Research high-priority entities with URLs but no extractions: ${topHighPriority}`
    );
  }

  // Suggest entities needing URLs
  const noUrlEntities = entityGaps.filter(e => !e.hasUrl);
  if (noUrlEntities.length > 0) {
    nextActions.push(
      `Add URLs to ${noUrlEntities.length} entities before extraction`
    );
  }

  // Suggest completing partial entities
  if (priorities.medium.length > 0) {
    const nearComplete = priorities.medium.filter(e => e.missingSchemas.length <= 2);
    if (nearComplete.length > 0) {
      nextActions.push(
        `Complete ${nearComplete.length} entities that are nearly fully researched`
      );
    }
  }

  return {
    project: {
      id: project.id,
      name: project.name,
    },
    summary: {
      totalEntities: entities.length,
      entitiesWithUrl,
      entitiesWithNoExtractions,
      entitiesFullyCovered,
      averageExtractionCount,
      totalExtractions,
    },
    coverageBySchema,
    entityGaps,
    priorities,
    nextActions,
  };
}
