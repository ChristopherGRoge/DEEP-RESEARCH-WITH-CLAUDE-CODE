import { prisma } from '../db/client';

// ============================================
// Types
// ============================================

export interface DiscoveryProcessorInput {
  sourceId: string;
  mentionedName: string;
  briefDescription?: string;
  discoveryUrl: string;
  contextSnippet?: string;
  extractedLinks: string[];
  keywords: string[];
  crawlSessionId: string;
}

export interface DeduplicationResult {
  action: 'matched' | 'created' | 'review_needed';
  entityId?: string;
  entityName?: string;
  matchMethod?: string;
  confidence: number;
}

export interface ProcessingResult {
  success: boolean;
  rawDiscoveryId: string;
  deduplication: DeduplicationResult;
  assertionsCreated: number;
  error?: string;
}

interface MatchCandidate {
  entityId: string;
  entityName: string;
  method: string;
  confidence: number;
}

// ============================================
// String Normalization Utilities
// ============================================

/**
 * Normalize entity name for comparison
 * Handles common variants and removes noise
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric
    .replace(/\s+/g, '') // Remove spaces
    .trim();
}

/**
 * Normalize URL for comparison
 * Removes protocol, www, trailing slashes, query params
 */
function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    let normalized = urlObj.hostname + urlObj.pathname;

    // Remove www
    normalized = normalized.replace(/^www\./, '');

    // Remove trailing slashes
    normalized = normalized.replace(/\/+$/, '');

    return normalized.toLowerCase();
  } catch {
    // If URL parsing fails, do basic normalization
    return url
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/+$/, '')
      .trim();
  }
}

/**
 * Calculate Levenshtein distance between two strings
 * Returns edit distance (lower = more similar)
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculate similarity score between two strings (0-1)
 * Uses Levenshtein distance normalized by string length
 */
function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1.0;
  if (!a || !b) return 0.0;

  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);

  return 1 - (distance / maxLength);
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Check if name contains a common variant pattern
 */
function getNameVariants(name: string): string[] {
  const variants = [name];

  // Add variant without common suffixes
  const withoutSuffix = name
    .replace(/\s+(AI|SDK|API|CLI|IDE|app|tool|platform)$/i, '')
    .trim();
  if (withoutSuffix !== name) {
    variants.push(withoutSuffix);
  }

  // Add variant with common suffixes
  if (!name.match(/\s+(AI|SDK|API|CLI|IDE|app|tool|platform)$/i)) {
    variants.push(`${name} AI`);
    variants.push(`${name} SDK`);
  }

  return variants;
}

// ============================================
// Deduplication Engine
// ============================================

/**
 * Multi-strategy entity matching
 * Returns the best match with confidence score
 */
export async function findMatchingEntity(
  projectId: string,
  name: string,
  urls: string[],
  description?: string
): Promise<DeduplicationResult> {

  // Fetch all entities in the project for comparison
  const entities = await prisma.entity.findMany({
    where: { projectId },
    select: {
      id: true,
      name: true,
      url: true,
      description: true,
    },
  });

  if (entities.length === 0) {
    return {
      action: 'created',
      confidence: 1.0,
    };
  }

  const candidates: MatchCandidate[] = [];

  // Strategy 1: Exact name match (case-insensitive)
  const exactMatch = entities.find(
    (e) => e.name.toLowerCase() === name.toLowerCase()
  );
  if (exactMatch) {
    candidates.push({
      entityId: exactMatch.id,
      entityName: exactMatch.name,
      method: 'exact_name_match',
      confidence: 1.0,
    });
  }

  // Strategy 2: Normalized name match
  const normalizedInput = normalizeName(name);
  const nameVariants = getNameVariants(name).map(normalizeName);

  for (const entity of entities) {
    const normalizedEntity = normalizeName(entity.name);

    // Check exact normalized match
    if (normalizedEntity === normalizedInput) {
      candidates.push({
        entityId: entity.id,
        entityName: entity.name,
        method: 'normalized_name_match',
        confidence: 0.95,
      });
      continue;
    }

    // Check variant matches
    for (const variant of nameVariants) {
      if (normalizedEntity === variant) {
        candidates.push({
          entityId: entity.id,
          entityName: entity.name,
          method: 'name_variant_match',
          confidence: 0.9,
        });
        break;
      }
    }
  }

  // Strategy 3: URL-based matching
  if (urls.length > 0) {
    const normalizedInputUrls = urls.map(normalizeUrl);

    for (const entity of entities) {
      if (!entity.url) continue;

      const normalizedEntityUrl = normalizeUrl(entity.url);

      // Check if any input URL matches entity URL
      if (normalizedInputUrls.includes(normalizedEntityUrl)) {
        candidates.push({
          entityId: entity.id,
          entityName: entity.name,
          method: 'exact_url_match',
          confidence: 0.98,
        });
        continue;
      }

      // Check domain match
      const entityDomain = extractDomain(entity.url);
      for (const inputUrl of urls) {
        const inputDomain = extractDomain(inputUrl);
        if (entityDomain === inputDomain) {
          candidates.push({
            entityId: entity.id,
            entityName: entity.name,
            method: 'domain_match',
            confidence: 0.85,
          });
          break;
        }
      }
    }
  }

  // Strategy 4: Fuzzy name matching
  for (const entity of entities) {
    const similarity = calculateSimilarity(
      normalizeName(name),
      normalizeName(entity.name)
    );

    // Only consider high similarity matches
    if (similarity >= 0.85) {
      candidates.push({
        entityId: entity.id,
        entityName: entity.name,
        method: 'fuzzy_name_match',
        confidence: similarity * 0.8, // Scale down fuzzy matches
      });
    }
  }

  // Remove duplicates and sort by confidence
  const uniqueCandidates = Array.from(
    new Map(candidates.map((c) => [c.entityId, c])).values()
  ).sort((a, b) => b.confidence - a.confidence);

  // No matches found
  if (uniqueCandidates.length === 0) {
    return {
      action: 'created',
      confidence: 1.0,
    };
  }

  const bestMatch = uniqueCandidates[0];

  // High confidence match - use existing entity
  if (bestMatch.confidence >= 0.85) {
    return {
      action: 'matched',
      entityId: bestMatch.entityId,
      entityName: bestMatch.entityName,
      matchMethod: bestMatch.method,
      confidence: bestMatch.confidence,
    };
  }

  // Multiple candidates with similar confidence - needs review
  const hasAmbiguity = uniqueCandidates.length > 1 &&
    Math.abs(uniqueCandidates[0].confidence - uniqueCandidates[1].confidence) < 0.1;

  if (hasAmbiguity || bestMatch.confidence < 0.85) {
    return {
      action: 'review_needed',
      entityId: bestMatch.entityId,
      entityName: bestMatch.entityName,
      matchMethod: bestMatch.method,
      confidence: bestMatch.confidence,
    };
  }

  // Default: create new entity
  return {
    action: 'created',
    confidence: 1.0,
  };
}

// ============================================
// Entity Resolution
// ============================================

/**
 * Resolve a discovery to an entity (create or match)
 * Handles the full resolution flow with logging
 */
export async function resolveDiscoveryToEntity(
  projectId: string,
  discovery: DiscoveryProcessorInput
): Promise<{ entityId: string; created: boolean; matchMethod?: string }> {

  // Run deduplication
  const dedup = await findMatchingEntity(
    projectId,
    discovery.mentionedName,
    discovery.extractedLinks,
    discovery.briefDescription
  );

  // If matched, return existing entity
  if (dedup.action === 'matched' && dedup.entityId) {
    await prisma.researchLog.create({
      data: {
        action: 'discovery_matched_entity',
        details: {
          discoveryName: discovery.mentionedName,
          entityId: dedup.entityId,
          entityName: dedup.entityName ?? undefined,
          matchMethod: dedup.matchMethod ?? undefined,
          confidence: dedup.confidence,
        },
      },
    });

    return {
      entityId: dedup.entityId,
      created: false,
      matchMethod: dedup.matchMethod,
    };
  }

  // Create new entity
  const primaryUrl = discovery.extractedLinks.length > 0
    ? discovery.extractedLinks[0]
    : discovery.discoveryUrl;

  const entity = await prisma.entity.create({
    data: {
      projectId,
      name: discovery.mentionedName,
      description: discovery.briefDescription,
      url: primaryUrl,
      entityType: 'tool', // Default type for discoveries
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'discovery_created_entity',
      details: {
        entityId: entity.id,
        entityName: entity.name,
        discoveryName: discovery.mentionedName,
        url: primaryUrl,
        needsReview: dedup.action === 'review_needed',
        confidence: dedup.confidence,
      },
    },
  });

  return {
    entityId: entity.id,
    created: true,
  };
}

// ============================================
// Raw Discovery Processing
// ============================================

/**
 * Save a raw discovery to the database
 */
export async function saveRawDiscovery(
  input: DiscoveryProcessorInput
): Promise<string> {
  const discovery = await prisma.rawDiscovery.create({
    data: {
      sourceId: input.sourceId,
      mentionedName: input.mentionedName,
      briefDescription: input.briefDescription,
      discoveryUrl: input.discoveryUrl,
      contextSnippet: input.contextSnippet,
      extractedLinks: input.extractedLinks,
      keywords: input.keywords,
      crawlSessionId: input.crawlSessionId,
      processed: false,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'raw_discovery_saved',
      details: {
        discoveryId: discovery.id,
        mentionedName: discovery.mentionedName,
        sourceId: discovery.sourceId,
      },
    },
  });

  return discovery.id;
}

/**
 * Process a raw discovery (dedup + entity resolution + assertion creation)
 */
export async function processRawDiscovery(
  projectId: string,
  rawDiscoveryId: string
): Promise<ProcessingResult> {

  try {
    // Fetch raw discovery
    const rawDiscovery = await prisma.rawDiscovery.findUnique({
      where: { id: rawDiscoveryId },
      include: { source: true },
    });

    if (!rawDiscovery) {
      return {
        success: false,
        rawDiscoveryId,
        deduplication: { action: 'created', confidence: 0 },
        assertionsCreated: 0,
        error: 'Raw discovery not found',
      };
    }

    if (rawDiscovery.processed) {
      return {
        success: false,
        rawDiscoveryId,
        deduplication: { action: 'created', confidence: 0 },
        assertionsCreated: 0,
        error: 'Discovery already processed',
      };
    }

    // Run deduplication
    const dedup = await findMatchingEntity(
      projectId,
      rawDiscovery.mentionedName,
      rawDiscovery.extractedLinks,
      rawDiscovery.briefDescription ?? undefined
    );

    // Resolve to entity
    const resolution = await resolveDiscoveryToEntity(projectId, {
      sourceId: rawDiscovery.sourceId,
      mentionedName: rawDiscovery.mentionedName,
      briefDescription: rawDiscovery.briefDescription ?? undefined,
      discoveryUrl: rawDiscovery.discoveryUrl,
      contextSnippet: rawDiscovery.contextSnippet ?? undefined,
      extractedLinks: rawDiscovery.extractedLinks,
      keywords: rawDiscovery.keywords,
      crawlSessionId: rawDiscovery.crawlSessionId,
    });

    // Create initial assertion from context
    let assertionsCreated = 0;
    if (rawDiscovery.contextSnippet || rawDiscovery.briefDescription) {
      const claim = rawDiscovery.contextSnippet || rawDiscovery.briefDescription || '';

      // Only create assertion if we have meaningful content
      if (claim.length > 10) {
        await prisma.assertion.create({
          data: {
            entityId: resolution.entityId,
            claim,
            category: 'discovery',
            status: 'CLAIM',
            discoverySourceId: rawDiscovery.sourceId,
            firstDiscoveredAt: rawDiscovery.discoveredAt,
            sources: {
              create: {
                source: {
                  connectOrCreate: {
                    where: { url: rawDiscovery.discoveryUrl },
                    create: {
                      url: rawDiscovery.discoveryUrl,
                      sourceType: rawDiscovery.source.sourceType,
                      status: 'PROPOSED',
                    },
                  },
                },
                quote: rawDiscovery.contextSnippet,
              },
            },
          },
        });
        assertionsCreated++;
      }
    }

    // Mark discovery as processed
    await prisma.rawDiscovery.update({
      where: { id: rawDiscoveryId },
      data: {
        processed: true,
        matchedEntityId: resolution.created ? null : resolution.entityId,
        createdEntityId: resolution.created ? resolution.entityId : null,
      },
    });

    await prisma.researchLog.create({
      data: {
        action: 'raw_discovery_processed',
        details: {
          discoveryId: rawDiscoveryId,
          entityId: resolution.entityId,
          created: resolution.created,
          matchMethod: resolution.matchMethod,
          assertionsCreated,
        },
      },
    });

    return {
      success: true,
      rawDiscoveryId,
      deduplication: {
        ...dedup,
        entityId: resolution.entityId,
      },
      assertionsCreated,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    await prisma.researchLog.create({
      data: {
        action: 'raw_discovery_processing_failed',
        details: {
          discoveryId: rawDiscoveryId,
          error: errorMessage,
        },
      },
    });

    return {
      success: false,
      rawDiscoveryId,
      deduplication: { action: 'created', confidence: 0 },
      assertionsCreated: 0,
      error: errorMessage,
    };
  }
}

/**
 * Batch process all pending discoveries for a project
 */
export async function processPendingDiscoveries(
  projectId: string,
  limit?: number
): Promise<{ processed: number; created: number; matched: number; errors: number }> {

  const discoveries = await prisma.rawDiscovery.findMany({
    where: { processed: false },
    take: limit,
    orderBy: { discoveredAt: 'desc' },
  });

  let processed = 0;
  let created = 0;
  let matched = 0;
  let errors = 0;

  for (const discovery of discoveries) {
    const result = await processRawDiscovery(projectId, discovery.id);

    if (result.success) {
      processed++;
      if (result.deduplication.action === 'created') {
        created++;
      } else if (result.deduplication.action === 'matched') {
        matched++;
      }
    } else {
      errors++;
    }
  }

  await prisma.researchLog.create({
    data: {
      action: 'batch_discovery_processing',
      details: {
        projectId,
        processed,
        created,
        matched,
        errors,
        total: discoveries.length,
      },
    },
  });

  return { processed, created, matched, errors };
}

// ============================================
// Query Functions
// ============================================

/**
 * Get pending discoveries
 */
export async function getPendingDiscoveries(
  projectId?: string,
  limit?: number
): Promise<any[]> {
  return prisma.rawDiscovery.findMany({
    where: { processed: false },
    include: {
      source: {
        select: {
          name: true,
          sourceType: true,
        },
      },
    },
    orderBy: { discoveredAt: 'desc' },
    take: limit,
  });
}

/**
 * Search discoveries
 */
export async function searchDiscoveries(
  query: string,
  filters?: { sourceType?: string; processed?: boolean }
): Promise<any[]> {
  const where: any = {
    OR: [
      { mentionedName: { contains: query, mode: 'insensitive' } },
      { briefDescription: { contains: query, mode: 'insensitive' } },
      { contextSnippet: { contains: query, mode: 'insensitive' } },
      { keywords: { has: query } },
    ],
  };

  if (filters?.processed !== undefined) {
    where.processed = filters.processed;
  }

  if (filters?.sourceType) {
    where.source = {
      sourceType: filters.sourceType,
    };
  }

  return prisma.rawDiscovery.findMany({
    where,
    include: {
      source: {
        select: {
          name: true,
          sourceType: true,
        },
      },
    },
    orderBy: { discoveredAt: 'desc' },
    take: 50,
  });
}

/**
 * Get discovery stats
 */
export async function getDiscoveryStats(projectId: string): Promise<{
  total: number;
  processed: number;
  pending: number;
  entitiesCreated: number;
  entitiesMatched: number;
}> {

  const total = await prisma.rawDiscovery.count();
  const processed = await prisma.rawDiscovery.count({
    where: { processed: true },
  });
  const pending = total - processed;

  const entitiesCreated = await prisma.rawDiscovery.count({
    where: {
      processed: true,
      createdEntityId: { not: null },
    },
  });

  const entitiesMatched = await prisma.rawDiscovery.count({
    where: {
      processed: true,
      matchedEntityId: { not: null },
    },
  });

  return {
    total,
    processed,
    pending,
    entitiesCreated,
    entitiesMatched,
  };
}
