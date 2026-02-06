/**
 * World Model Tools - Entity relationships, positioning, and market forces
 *
 * These tools capture the competitive landscape and strategic positioning:
 * - EntityRelationship: How entities relate (competes, complements, depends on, etc.)
 * - EntityPositioning: Where entity sits in SDLC, maturity, scope, ecosystem
 * - EntityForce: Market forces (tailwinds, headwinds, gravitational forces)
 */

import { prisma } from '../db/client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type RelationshipType =
  | 'COMPETES_WITH'
  | 'COMPLEMENTS'
  | 'DEPENDS_ON'
  | 'ENABLES'
  | 'SUPERSEDES'
  | 'FORKS_FROM';

export type RelationshipDirection = 'SYMMETRIC' | 'ASYMMETRIC';

export type ForceType = 'TAILWIND' | 'HEADWIND' | 'GRAVITATIONAL';

export interface SDLCStage {
  stage: string;
  coverage: 'PRIMARY' | 'SECONDARY' | 'MINIMAL';
}

export interface WorldModelEvidenceChainItem {
  screenshotPath: string;
  description: string;
  capturedAt?: string;
}

// ============================================
// RELATIONSHIP INPUT TYPES
// ============================================

export interface CreateRelationshipInput {
  sourceEntityId: string;
  targetEntityId?: string; // Either this OR targetExternalName required
  targetExternalName?: string; // For entities not in our database
  targetExternalUrl?: string;
  relationshipType: RelationshipType;
  strength?: number; // 0.0-1.0
  direction?: RelationshipDirection;
  context?: string;
  evidenceDescription?: string;
  evidenceScreenshotPath?: string;
}

export interface ListRelationshipsInput {
  entityId: string;
}

export interface DeleteRelationshipInput {
  relationshipId: string;
}

export interface GetRelationshipGraphInput {
  projectId: string;
}

// ============================================
// POSITIONING INPUT TYPES
// ============================================

export interface SetPositioningInput {
  entityId: string;
  sdlcStages?: SDLCStage[]; // Array of stages with coverage level
  primaryStage?: string; // Main SDLC stage: "Code", "Test", "Deploy", "Monitor", etc.
  solutionScope?: string; // "Point Solution" | "Platform" | "Framework" | "Infrastructure"
  maturityStage?: string; // "Early" | "Growth" | "Mature" | "Declining"
  adoptionCurve?: string; // "Innovators" | "Early Adopters" | "Early Majority" | "Late Majority" | "Laggards"
  businessModel?: string; // "SaaS" | "Open Core" | "Enterprise" | "Freemium" | "OSS"
  primaryEcosystem?: string; // "GitHub" | "AWS" | "Microsoft" | "Independent" | etc.
  positioningStatement?: string; // Human-readable summary
  evidenceChain?: WorldModelEvidenceChainItem[];
  evidenceDescription?: string;
  assessedBy?: string; // Agent ID who performed assessment
}

export interface GetPositioningInput {
  entityId: string;
}

export interface ComparePositioningInput {
  entityIds: string[];
}

// ============================================
// FORCE INPUT TYPES
// ============================================

export interface CreateForceInput {
  entityId: string;
  forceType: ForceType;
  name: string;
  description?: string;
  strength?: number; // 0.0-1.0
  timeHorizon?: string; // "Immediate" | "Near-term" | "Long-term"
  evidenceDescription?: string;
  evidenceScreenshotPath?: string;
}

export interface ListForcesInput {
  entityId: string;
}

export interface DeleteForceInput {
  forceId: string;
}

// ============================================
// AGGREGATE INPUT TYPES
// ============================================

export interface GetWorldModelInput {
  entityId: string;
}

export interface GetWorldModelSummaryInput {
  entityId: string;
}

// ============================================
// RELATIONSHIP FUNCTIONS
// ============================================

/**
 * Create an entity relationship
 * Either targetEntityId OR targetExternalName must be provided
 */
export async function createRelationship(input: CreateRelationshipInput) {
  // Validation: verify source entity exists
  const sourceEntity = await prisma.entity.findUnique({
    where: { id: input.sourceEntityId },
  });

  if (!sourceEntity) {
    return {
      success: false,
      error: `Source entity not found: ${input.sourceEntityId}`,
    };
  }

  // Validation: must have either targetEntityId OR targetExternalName
  if (!input.targetEntityId && !input.targetExternalName) {
    return {
      success: false,
      error: 'Either targetEntityId or targetExternalName must be provided',
    };
  }

  // Validation: if targetEntityId provided, verify it exists
  if (input.targetEntityId) {
    const targetEntity = await prisma.entity.findUnique({
      where: { id: input.targetEntityId },
    });

    if (!targetEntity) {
      return {
        success: false,
        error: `Target entity not found: ${input.targetEntityId}`,
      };
    }
  }

  // Validation: strength must be between 0 and 1
  if (input.strength !== undefined && (input.strength < 0 || input.strength > 1)) {
    return {
      success: false,
      error: 'Strength must be between 0.0 and 1.0',
    };
  }

  const relationship = await prisma.entityRelationship.upsert({
    where: {
      sourceEntityId_targetEntityId_relationshipType: {
        sourceEntityId: input.sourceEntityId,
        targetEntityId: input.targetEntityId || '',
        relationshipType: input.relationshipType,
      },
    },
    update: {
      targetExternalName: input.targetExternalName,
      targetExternalUrl: input.targetExternalUrl,
      strength: input.strength ?? 0.5,
      direction: input.direction || 'SYMMETRIC',
      context: input.context,
      evidenceDescription: input.evidenceDescription,
      evidenceScreenshotPath: input.evidenceScreenshotPath,
    },
    create: {
      sourceEntityId: input.sourceEntityId,
      targetEntityId: input.targetEntityId,
      targetExternalName: input.targetExternalName,
      targetExternalUrl: input.targetExternalUrl,
      relationshipType: input.relationshipType,
      strength: input.strength ?? 0.5,
      direction: input.direction || 'SYMMETRIC',
      context: input.context,
      evidenceDescription: input.evidenceDescription,
      evidenceScreenshotPath: input.evidenceScreenshotPath,
    },
    include: {
      sourceEntity: { select: { id: true, name: true } },
      targetEntity: { select: { id: true, name: true } },
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'relationship_created',
      details: {
        relationshipId: relationship.id,
        sourceEntityId: input.sourceEntityId,
        targetEntityId: input.targetEntityId,
        targetExternalName: input.targetExternalName,
        relationshipType: input.relationshipType,
      },
    },
  });

  return { success: true, data: relationship };
}

/**
 * List all relationships for an entity (both from and to perspectives)
 * Returns a merged view of relationships
 */
export async function listRelationships(input: ListRelationshipsInput) {
  const entity = await prisma.entity.findUnique({
    where: { id: input.entityId },
    include: {
      relationshipsFrom: {
        include: {
          targetEntity: { select: { id: true, name: true, url: true } },
        },
      },
      relationshipsTo: {
        include: {
          sourceEntity: { select: { id: true, name: true, url: true } },
        },
      },
    },
  });

  if (!entity) {
    return {
      success: false,
      error: `Entity not found: ${input.entityId}`,
    };
  }

  // Transform into unified format
  const outbound = entity.relationshipsFrom.map((rel) => ({
    id: rel.id,
    direction: 'OUTBOUND' as const,
    relationshipType: rel.relationshipType,
    strength: rel.strength,
    relatedEntity: rel.targetEntity || {
      name: rel.targetExternalName,
      url: rel.targetExternalUrl,
    },
    context: rel.context,
    evidenceDescription: rel.evidenceDescription,
    evidenceScreenshotPath: rel.evidenceScreenshotPath,
  }));

  const inbound = entity.relationshipsTo.map((rel) => ({
    id: rel.id,
    direction: 'INBOUND' as const,
    relationshipType: rel.relationshipType,
    strength: rel.strength,
    relatedEntity: rel.sourceEntity,
    context: rel.context,
    evidenceDescription: rel.evidenceDescription,
    evidenceScreenshotPath: rel.evidenceScreenshotPath,
  }));

  return {
    success: true,
    data: {
      entity: {
        id: entity.id,
        name: entity.name,
      },
      relationships: [...outbound, ...inbound],
      counts: {
        outbound: outbound.length,
        inbound: inbound.length,
        total: outbound.length + inbound.length,
      },
    },
  };
}

/**
 * Delete a relationship
 */
export async function deleteRelationship(input: DeleteRelationshipInput) {
  const relationship = await prisma.entityRelationship.findUnique({
    where: { id: input.relationshipId },
  });

  if (!relationship) {
    return {
      success: false,
      error: `Relationship not found: ${input.relationshipId}`,
    };
  }

  await prisma.entityRelationship.delete({
    where: { id: input.relationshipId },
  });

  await prisma.researchLog.create({
    data: {
      action: 'relationship_deleted',
      details: {
        relationshipId: input.relationshipId,
        sourceEntityId: relationship.sourceEntityId,
        targetEntityId: relationship.targetEntityId,
      },
    },
  });

  return { success: true, data: { deleted: true } };
}

/**
 * Get all relationships across a project (for graph visualization)
 */
export async function getRelationshipGraph(input: GetRelationshipGraphInput) {
  const entities = await prisma.entity.findMany({
    where: { projectId: input.projectId },
    include: {
      relationshipsFrom: {
        include: {
          targetEntity: { select: { id: true, name: true } },
        },
      },
    },
  });

  // Build nodes and edges for graph visualization
  const nodes = entities.map((entity) => ({
    id: entity.id,
    name: entity.name,
    entityType: entity.entityType,
    url: entity.url,
  }));

  const edges = entities.flatMap((entity) =>
    entity.relationshipsFrom.map((rel) => ({
      id: rel.id,
      source: entity.id,
      target: rel.targetEntityId || null,
      targetExternalName: rel.targetExternalName,
      type: rel.relationshipType,
      strength: rel.strength,
      direction: rel.direction,
      context: rel.context,
    }))
  );

  return {
    success: true,
    data: {
      projectId: input.projectId,
      nodes,
      edges,
      stats: {
        entityCount: nodes.length,
        relationshipCount: edges.length,
      },
    },
  };
}

// ============================================
// POSITIONING FUNCTIONS
// ============================================

/**
 * Set or update entity positioning (upsert - one per entity)
 */
export async function setPositioning(input: SetPositioningInput) {
  // Validation: verify entity exists
  const entity = await prisma.entity.findUnique({
    where: { id: input.entityId },
  });

  if (!entity) {
    return {
      success: false,
      error: `Entity not found: ${input.entityId}`,
    };
  }

  const positioning = await prisma.entityPositioning.upsert({
    where: { entityId: input.entityId },
    update: {
      sdlcStages: input.sdlcStages ? JSON.parse(JSON.stringify(input.sdlcStages)) : undefined,
      primaryStage: input.primaryStage,
      solutionScope: input.solutionScope,
      maturityStage: input.maturityStage,
      adoptionCurve: input.adoptionCurve,
      businessModel: input.businessModel,
      primaryEcosystem: input.primaryEcosystem,
      positioningStatement: input.positioningStatement,
      evidenceChain: input.evidenceChain ? JSON.parse(JSON.stringify(input.evidenceChain)) : undefined,
      evidenceDescription: input.evidenceDescription,
      assessedAt: new Date(),
      assessedBy: input.assessedBy,
    },
    create: {
      entityId: input.entityId,
      sdlcStages: input.sdlcStages ? JSON.parse(JSON.stringify(input.sdlcStages)) : undefined,
      primaryStage: input.primaryStage,
      solutionScope: input.solutionScope,
      maturityStage: input.maturityStage,
      adoptionCurve: input.adoptionCurve,
      businessModel: input.businessModel,
      primaryEcosystem: input.primaryEcosystem,
      positioningStatement: input.positioningStatement,
      evidenceChain: input.evidenceChain ? JSON.parse(JSON.stringify(input.evidenceChain)) : undefined,
      evidenceDescription: input.evidenceDescription,
      assessedAt: new Date(),
      assessedBy: input.assessedBy,
    },
    include: {
      entity: { select: { id: true, name: true } },
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'positioning_set',
      agentId: input.assessedBy,
      details: {
        positioningId: positioning.id,
        entityId: input.entityId,
        primaryStage: input.primaryStage,
        solutionScope: input.solutionScope,
      },
    },
  });

  return { success: true, data: positioning };
}

/**
 * Get entity positioning
 */
export async function getPositioning(input: GetPositioningInput) {
  const positioning = await prisma.entityPositioning.findUnique({
    where: { entityId: input.entityId },
    include: {
      entity: { select: { id: true, name: true, entityType: true } },
    },
  });

  if (!positioning) {
    return {
      success: false,
      error: `No positioning found for entity: ${input.entityId}`,
    };
  }

  return { success: true, data: positioning };
}

/**
 * Compare positioning of multiple entities side by side
 */
export async function comparePositioning(input: ComparePositioningInput) {
  if (input.entityIds.length < 2) {
    return {
      success: false,
      error: 'At least 2 entity IDs required for comparison',
    };
  }

  const positionings = await prisma.entityPositioning.findMany({
    where: {
      entityId: { in: input.entityIds },
    },
    include: {
      entity: { select: { id: true, name: true, entityType: true } },
    },
  });

  // Build comparison matrix
  const comparison = input.entityIds.map((entityId) => {
    const pos = positionings.find((p) => p.entityId === entityId);
    return {
      entityId,
      entityName: pos?.entity.name || 'Unknown',
      primaryStage: pos?.primaryStage || 'Not assessed',
      solutionScope: pos?.solutionScope || 'Not assessed',
      maturityStage: pos?.maturityStage || 'Not assessed',
      adoptionCurve: pos?.adoptionCurve || 'Not assessed',
      businessModel: pos?.businessModel || 'Not assessed',
      primaryEcosystem: pos?.primaryEcosystem || 'Not assessed',
      positioningStatement: pos?.positioningStatement || 'Not assessed',
      assessedAt: pos?.assessedAt || null,
    };
  });

  return {
    success: true,
    data: {
      comparison,
      stats: {
        totalEntities: input.entityIds.length,
        assessedEntities: positionings.length,
        unassessedEntities: input.entityIds.length - positionings.length,
      },
    },
  };
}

// ============================================
// FORCE FUNCTIONS
// ============================================

/**
 * Create a market force affecting an entity
 */
export async function createForce(input: CreateForceInput) {
  // Validation: verify entity exists
  const entity = await prisma.entity.findUnique({
    where: { id: input.entityId },
  });

  if (!entity) {
    return {
      success: false,
      error: `Entity not found: ${input.entityId}`,
    };
  }

  // Validation: strength must be between 0 and 1
  if (input.strength !== undefined && (input.strength < 0 || input.strength > 1)) {
    return {
      success: false,
      error: 'Strength must be between 0.0 and 1.0',
    };
  }

  const force = await prisma.entityForce.upsert({
    where: {
      entityId_name: {
        entityId: input.entityId,
        name: input.name,
      },
    },
    update: {
      forceType: input.forceType,
      description: input.description,
      strength: input.strength ?? 0.5,
      timeHorizon: input.timeHorizon,
      evidenceDescription: input.evidenceDescription,
      evidenceScreenshotPath: input.evidenceScreenshotPath,
    },
    create: {
      entityId: input.entityId,
      forceType: input.forceType,
      name: input.name,
      description: input.description,
      strength: input.strength ?? 0.5,
      timeHorizon: input.timeHorizon,
      evidenceDescription: input.evidenceDescription,
      evidenceScreenshotPath: input.evidenceScreenshotPath,
    },
    include: {
      entity: { select: { id: true, name: true } },
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'force_created',
      details: {
        forceId: force.id,
        entityId: input.entityId,
        forceType: input.forceType,
        name: input.name,
      },
    },
  });

  return { success: true, data: force };
}

/**
 * List all forces for an entity
 */
export async function listForces(input: ListForcesInput) {
  const entity = await prisma.entity.findUnique({
    where: { id: input.entityId },
    include: {
      forces: {
        orderBy: [{ forceType: 'asc' }, { strength: 'desc' }],
      },
    },
  });

  if (!entity) {
    return {
      success: false,
      error: `Entity not found: ${input.entityId}`,
    };
  }

  // Group by force type
  const tailwinds = entity.forces.filter((f) => f.forceType === 'TAILWIND');
  const headwinds = entity.forces.filter((f) => f.forceType === 'HEADWIND');
  const gravitational = entity.forces.filter((f) => f.forceType === 'GRAVITATIONAL');

  return {
    success: true,
    data: {
      entity: {
        id: entity.id,
        name: entity.name,
      },
      forces: entity.forces,
      byType: {
        tailwinds,
        headwinds,
        gravitational,
      },
      counts: {
        tailwinds: tailwinds.length,
        headwinds: headwinds.length,
        gravitational: gravitational.length,
        total: entity.forces.length,
      },
    },
  };
}

/**
 * Delete a force
 */
export async function deleteForce(input: DeleteForceInput) {
  const force = await prisma.entityForce.findUnique({
    where: { id: input.forceId },
  });

  if (!force) {
    return {
      success: false,
      error: `Force not found: ${input.forceId}`,
    };
  }

  await prisma.entityForce.delete({
    where: { id: input.forceId },
  });

  await prisma.researchLog.create({
    data: {
      action: 'force_deleted',
      details: {
        forceId: input.forceId,
        entityId: force.entityId,
        name: force.name,
      },
    },
  });

  return { success: true, data: { deleted: true } };
}

// ============================================
// AGGREGATE FUNCTIONS
// ============================================

/**
 * Get complete world model for an entity (positioning + relationships + forces + stats)
 * This is the main function used by the API endpoint
 */
export async function getWorldModel(input: GetWorldModelInput) {
  const entity = await prisma.entity.findUnique({
    where: { id: input.entityId },
    include: {
      positioning: true,
      relationshipsFrom: {
        include: {
          targetEntity: { select: { id: true, name: true, url: true } },
        },
      },
      relationshipsTo: {
        include: {
          sourceEntity: { select: { id: true, name: true, url: true } },
        },
      },
      forces: {
        orderBy: [{ forceType: 'asc' }, { strength: 'desc' }],
      },
    },
  });

  if (!entity) {
    return {
      success: false,
      error: `Entity not found: ${input.entityId}`,
    };
  }

  // Transform relationships into unified format
  const outboundRelationships = entity.relationshipsFrom.map((rel) => ({
    id: rel.id,
    direction: 'OUTBOUND' as const,
    relationshipType: rel.relationshipType,
    strength: rel.strength,
    relatedEntity: rel.targetEntity || {
      name: rel.targetExternalName,
      url: rel.targetExternalUrl,
    },
    context: rel.context,
  }));

  const inboundRelationships = entity.relationshipsTo.map((rel) => ({
    id: rel.id,
    direction: 'INBOUND' as const,
    relationshipType: rel.relationshipType,
    strength: rel.strength,
    relatedEntity: rel.sourceEntity,
    context: rel.context,
  }));

  // Group forces by type
  const tailwinds = entity.forces.filter((f) => f.forceType === 'TAILWIND');
  const headwinds = entity.forces.filter((f) => f.forceType === 'HEADWIND');
  const gravitational = entity.forces.filter((f) => f.forceType === 'GRAVITATIONAL');

  return {
    success: true,
    data: {
      entity: {
        id: entity.id,
        name: entity.name,
        entityType: entity.entityType,
        url: entity.url,
      },
      positioning: entity.positioning
        ? {
            primaryStage: entity.positioning.primaryStage,
            solutionScope: entity.positioning.solutionScope,
            maturityStage: entity.positioning.maturityStage,
            adoptionCurve: entity.positioning.adoptionCurve,
            businessModel: entity.positioning.businessModel,
            primaryEcosystem: entity.positioning.primaryEcosystem,
            positioningStatement: entity.positioning.positioningStatement,
            sdlcStages: entity.positioning.sdlcStages,
            assessedAt: entity.positioning.assessedAt,
            assessedBy: entity.positioning.assessedBy,
          }
        : null,
      relationships: {
        outbound: outboundRelationships,
        inbound: inboundRelationships,
        counts: {
          outbound: outboundRelationships.length,
          inbound: inboundRelationships.length,
          total: outboundRelationships.length + inboundRelationships.length,
        },
      },
      forces: {
        tailwinds,
        headwinds,
        gravitational,
        counts: {
          tailwinds: tailwinds.length,
          headwinds: headwinds.length,
          gravitational: gravitational.length,
          total: entity.forces.length,
        },
      },
      stats: {
        hasPositioning: !!entity.positioning,
        relationshipCount: outboundRelationships.length + inboundRelationships.length,
        forceCount: entity.forces.length,
        completeness: {
          positioning: !!entity.positioning,
          relationships: (outboundRelationships.length + inboundRelationships.length) > 0,
          forces: entity.forces.length > 0,
        },
      },
    },
  };
}

/**
 * Get just the positioning statement (lightweight summary)
 */
export async function getWorldModelSummary(input: GetWorldModelSummaryInput) {
  const positioning = await prisma.entityPositioning.findUnique({
    where: { entityId: input.entityId },
    select: {
      positioningStatement: true,
      primaryStage: true,
      solutionScope: true,
      entity: {
        select: { id: true, name: true },
      },
    },
  });

  if (!positioning) {
    return {
      success: false,
      error: `No positioning found for entity: ${input.entityId}`,
    };
  }

  return {
    success: true,
    data: {
      entity: positioning.entity,
      positioningStatement: positioning.positioningStatement,
      primaryStage: positioning.primaryStage,
      solutionScope: positioning.solutionScope,
    },
  };
}
