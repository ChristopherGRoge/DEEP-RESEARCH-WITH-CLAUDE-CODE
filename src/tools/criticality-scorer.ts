import prisma from '../db/client';
import { AssertionCriticality } from '../../generated/prisma/client';

// ============================================
// Types
// ============================================

interface CriticalityWeights {
  federalRelevance: number;    // FedRAMP, air-gapped, GovCloud mentions
  pricingImpact: number;       // Pricing changes, new tiers
  securityArchitecture: number; // Security claims, compliance
  novelty: number;             // New to our database
  sourceTrust: number;         // Quality of discovery source
}

interface CriticalityFactors {
  federalRelevance: number;   // 0-1
  pricingImpact: number;      // 0-1
  securityArchitecture: number; // 0-1
  novelty: number;            // 0-1
  sourceTrust: number;        // 0-1
  sourceSpread: number;       // 0-1, multiple sources confirm
  mentionVelocity: number;    // 0-1, growing mentions
}

interface CriticalityResult {
  score: number;              // 0-1
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  factors: CriticalityFactors;
  explanation: string;
}

// Default weights
const DEFAULT_WEIGHTS: CriticalityWeights = {
  federalRelevance: 0.30,
  pricingImpact: 0.20,
  securityArchitecture: 0.25,
  novelty: 0.15,
  sourceTrust: 0.10,
};

// ============================================
// Pattern Matching
// ============================================

// Federal relevance keywords
const FEDERAL_KEYWORDS = [
  'fedramp', 'federated', 'govcloud', 'government', 'federal',
  'air-gapped', 'airgap', 'disconnected', 'il4', 'il5', 'il6',
  'dod', 'department of defense', 'ato', 'authority to operate',
  'fisma', 'nist', 'cmmc', 'itar', 'classified'
];

// Security/compliance keywords
const SECURITY_KEYWORDS = [
  'soc2', 'soc 2', 'iso27001', 'iso 27001', 'hipaa', 'gdpr',
  'pci', 'compliance', 'certified', 'certification', 'audit',
  'encryption', 'security', 'vulnerability', 'penetration test'
];

// Pricing keywords
const PRICING_KEYWORDS = [
  'pricing', 'price', 'cost', 'free tier', 'enterprise', 'subscription',
  'per user', 'per seat', 'monthly', 'annually', 'discount', 'tier'
];

// ============================================
// Scoring Functions
// ============================================

/**
 * Calculate criticality for an assertion
 *
 * This analyzes the claim text, reasoning, sources, and context to determine
 * how important this assertion is to research conclusions.
 *
 * @param assertionId - ID of the assertion to score
 * @param weights - Optional custom weights for scoring factors
 * @returns CriticalityResult with score, level, factors, and explanation
 */
export async function calculateCriticality(
  assertionId: string,
  weights?: Partial<CriticalityWeights>
): Promise<CriticalityResult> {
  // 1. Fetch assertion with entity and sources
  const assertion = await prisma.assertion.findUnique({
    where: { id: assertionId },
    include: {
      entity: {
        select: {
          id: true,
          name: true,
          projectId: true,
        },
      },
      reasoning: {
        select: { content: true },
      },
      sources: {
        include: {
          source: {
            select: {
              id: true,
              sourceType: true,
              status: true,
            },
          },
        },
      },
    },
  });

  if (!assertion) {
    throw new Error(`Assertion ${assertionId} not found`);
  }

  // Merge custom weights with defaults
  const finalWeights: CriticalityWeights = {
    ...DEFAULT_WEIGHTS,
    ...weights,
  };

  // 2. Calculate each factor
  const reasoningText = assertion.reasoning.map(r => r.content);
  const sourceIds = assertion.sources.map(s => s.source.id);

  const federalRelevance = calculateFederalRelevance(assertion.claim, reasoningText);
  const pricingImpact = calculatePricingImpact(assertion.claim, assertion.category || undefined);
  const securityArchitecture = calculateSecurityArchitecture(assertion.claim);
  const novelty = await calculateNovelty(assertion.entityId, assertion.claim);
  const sourceTrust = await calculateSourceTrust(sourceIds);
  const sourceSpread = calculateSourceSpread(assertion.sources.length);
  const mentionVelocity = calculateMentionVelocity(
    assertion.mentionCount,
    assertion.firstDiscoveredAt
  );

  const factors: CriticalityFactors = {
    federalRelevance,
    pricingImpact,
    securityArchitecture,
    novelty,
    sourceTrust,
    sourceSpread,
    mentionVelocity,
  };

  // 3. Apply weights
  const score =
    federalRelevance * finalWeights.federalRelevance +
    pricingImpact * finalWeights.pricingImpact +
    securityArchitecture * finalWeights.securityArchitecture +
    novelty * finalWeights.novelty +
    sourceTrust * finalWeights.sourceTrust;

  // Source spread and mention velocity boost the score
  const boostFactor = 1 + (sourceSpread * 0.1) + (mentionVelocity * 0.1);
  const finalScore = Math.min(1, score * boostFactor);

  // 4. Determine level from score
  const level = scoreToLevel(finalScore);

  // 5. Generate explanation
  const explanation = generateExplanation(level, factors, finalWeights);

  // 6. Update assertion with score and factors
  await prisma.assertion.update({
    where: { id: assertionId },
    data: {
      criticalityScore: finalScore,
      criticalityFactors: factors as any,
      criticality: level,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'criticality_calculated',
      details: {
        assertionId,
        score: finalScore,
        level,
        factors: JSON.parse(JSON.stringify(factors)),
      },
    },
  });

  return {
    score: finalScore,
    level,
    factors,
    explanation,
  };
}

/**
 * Calculate federal relevance factor
 * Checks for federal keywords in claim and reasoning
 */
function calculateFederalRelevance(claim: string, reasoning?: string[]): number {
  const allText = [claim, ...(reasoning || [])].join(' ').toLowerCase();

  const matchCount = FEDERAL_KEYWORDS.filter(keyword =>
    allText.includes(keyword)
  ).length;

  // 0 keywords = 0.0, 1 = 0.4, 2 = 0.7, 3+ = 1.0
  if (matchCount === 0) return 0.0;
  if (matchCount === 1) return 0.4;
  if (matchCount === 2) return 0.7;
  return 1.0;
}

/**
 * Calculate pricing impact factor
 * Checks for pricing keywords and category
 */
function calculatePricingImpact(claim: string, category?: string): number {
  let score = 0.0;

  // Category is "pricing" = automatic high score
  if (category && category.toLowerCase().includes('pricing')) {
    score += 0.6;
  }

  // Check for pricing keywords
  const claimLower = claim.toLowerCase();
  const matchCount = PRICING_KEYWORDS.filter(keyword =>
    claimLower.includes(keyword)
  ).length;

  if (matchCount > 0) {
    score += Math.min(0.4, matchCount * 0.15);
  }

  return Math.min(1.0, score);
}

/**
 * Calculate security architecture factor
 * Checks for security/compliance keywords
 */
function calculateSecurityArchitecture(claim: string): number {
  const claimLower = claim.toLowerCase();

  const matchCount = SECURITY_KEYWORDS.filter(keyword =>
    claimLower.includes(keyword)
  ).length;

  // 0 keywords = 0.0, 1 = 0.4, 2 = 0.7, 3+ = 1.0
  if (matchCount === 0) return 0.0;
  if (matchCount === 1) return 0.4;
  if (matchCount === 2) return 0.7;
  return 1.0;
}

/**
 * Calculate novelty factor
 * Checks if similar claims exist for this entity
 * Fewer existing claims = higher novelty
 */
async function calculateNovelty(entityId: string, claimText: string): Promise<number> {
  // Find similar assertions for this entity
  const keywords = claimText
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4) // Only meaningful words
    .slice(0, 5); // First 5 keywords

  if (keywords.length === 0) return 0.5; // Default to medium novelty

  const similarAssertions = await prisma.assertion.findMany({
    where: {
      entityId,
      claim: {
        contains: keywords[0],
        
      },
      status: { not: 'REJECTED' },
    },
    select: { id: true, claim: true },
  });

  // No similar assertions = very novel
  if (similarAssertions.length === 0) return 1.0;

  // Check text similarity with existing assertions
  const similarities = similarAssertions.map(other =>
    calculateTextSimilarity(claimText, other.claim)
  );

  const maxSimilarity = Math.max(...similarities);

  // High similarity = low novelty
  // Low similarity = high novelty
  return 1.0 - maxSimilarity;
}

/**
 * Calculate source trust factor
 * Checks source types and validation status
 * vendor_docs/github > press > blog > forum
 */
async function calculateSourceTrust(sourceIds: string[]): Promise<number> {
  if (sourceIds.length === 0) return 0.0;

  const sources = await prisma.source.findMany({
    where: {
      id: { in: sourceIds },
    },
    select: {
      sourceType: true,
      status: true,
    },
  });

  const typeWeights: Record<string, number> = {
    vendor_docs: 1.0,
    github: 0.9,
    press: 0.7,
    blog: 0.5,
    forum: 0.3,
  };

  let totalTrust = 0;
  for (const source of sources) {
    const baseWeight = typeWeights[source.sourceType || 'unknown'] || 0.4;

    // Validated sources get a bonus
    const validationBonus = source.status === 'VALIDATED' ? 0.2 : 0.0;

    totalTrust += Math.min(1.0, baseWeight + validationBonus);
  }

  return totalTrust / sources.length;
}

/**
 * Calculate source spread factor
 * More sources = higher confidence
 * 1 source = 0.3, 2 = 0.5, 3 = 0.7, 4+ = 0.9+
 */
function calculateSourceSpread(sourceCount: number): number {
  if (sourceCount === 0) return 0.0;
  if (sourceCount === 1) return 0.3;
  if (sourceCount === 2) return 0.5;
  if (sourceCount === 3) return 0.7;
  return Math.min(1.0, 0.7 + (sourceCount - 3) * 0.1);
}

/**
 * Calculate mention velocity factor
 * Growing mentions = higher priority
 */
function calculateMentionVelocity(mentionCount: number, firstDiscoveredAt?: Date | null): number {
  if (!firstDiscoveredAt || mentionCount <= 1) return 0.0;

  const daysSinceDiscovery = Math.max(1,
    Math.floor((Date.now() - firstDiscoveredAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Mentions per day
  const velocity = mentionCount / daysSinceDiscovery;

  // 0-0.1 mentions/day = 0.0
  // 0.1-0.5 mentions/day = 0.3
  // 0.5-1.0 mentions/day = 0.6
  // 1.0+ mentions/day = 1.0
  if (velocity < 0.1) return 0.0;
  if (velocity < 0.5) return 0.3;
  if (velocity < 1.0) return 0.6;
  return 1.0;
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

// ============================================
// Level Determination
// ============================================

/**
 * Convert score to level
 * CRITICAL: 0.8+, HIGH: 0.6+, MEDIUM: 0.4+, LOW: <0.4
 */
function scoreToLevel(score: number): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
  if (score >= 0.8) return 'CRITICAL';
  if (score >= 0.6) return 'HIGH';
  if (score >= 0.4) return 'MEDIUM';
  return 'LOW';
}

/**
 * Generate human-readable explanation of criticality score
 */
function generateExplanation(
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
  factors: CriticalityFactors,
  weights: CriticalityWeights
): string {
  const parts: string[] = [];

  // Overall assessment
  parts.push(`Criticality: ${level} (score: ${scoreToLevel})`);

  // Top contributing factors
  const factorScores = [
    { name: 'Federal Relevance', score: factors.federalRelevance, weight: weights.federalRelevance },
    { name: 'Pricing Impact', score: factors.pricingImpact, weight: weights.pricingImpact },
    { name: 'Security Architecture', score: factors.securityArchitecture, weight: weights.securityArchitecture },
    { name: 'Novelty', score: factors.novelty, weight: weights.novelty },
    { name: 'Source Trust', score: factors.sourceTrust, weight: weights.sourceTrust },
  ];

  const topFactors = factorScores
    .filter(f => f.score > 0.3)
    .sort((a, b) => (b.score * b.weight) - (a.score * a.weight))
    .slice(0, 3);

  if (topFactors.length > 0) {
    parts.push('\nKey factors:');
    topFactors.forEach(f => {
      parts.push(`  - ${f.name}: ${(f.score * 100).toFixed(0)}%`);
    });
  }

  // Confidence boosters
  if (factors.sourceSpread > 0.5) {
    parts.push(`\n+ Multiple sources confirm this claim`);
  }
  if (factors.mentionVelocity > 0.5) {
    parts.push(`+ Growing mention velocity`);
  }

  return parts.join('\n');
}

// ============================================
// Batch Operations
// ============================================

/**
 * Score all assertions for an entity
 */
export async function scoreEntityAssertions(
  entityId: string,
  weights?: Partial<CriticalityWeights>
): Promise<{ scored: number; results: CriticalityResult[] }> {
  const assertions = await prisma.assertion.findMany({
    where: {
      entityId,
      status: { not: 'REJECTED' },
    },
    select: { id: true },
  });

  const results: CriticalityResult[] = [];
  let scored = 0;

  for (const assertion of assertions) {
    try {
      const result = await calculateCriticality(assertion.id, weights);
      results.push(result);
      scored++;
    } catch (error) {
      console.error(`Failed to score assertion ${assertion.id}:`, error);
    }
  }

  return { scored, results };
}

/**
 * Score all assertions for a project
 */
export async function scoreProjectAssertions(
  projectId: string,
  weights?: Partial<CriticalityWeights>
): Promise<{ scored: number; critical: number; high: number; medium: number; low: number }> {
  const assertions = await prisma.assertion.findMany({
    where: {
      entity: { projectId },
      status: { not: 'REJECTED' },
    },
    select: { id: true },
  });

  const stats = {
    scored: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const assertion of assertions) {
    try {
      const result = await calculateCriticality(assertion.id, weights);
      stats.scored++;

      switch (result.level) {
        case 'CRITICAL':
          stats.critical++;
          break;
        case 'HIGH':
          stats.high++;
          break;
        case 'MEDIUM':
          stats.medium++;
          break;
        case 'LOW':
          stats.low++;
          break;
      }
    } catch (error) {
      console.error(`Failed to score assertion ${assertion.id}:`, error);
    }
  }

  return stats;
}

/**
 * Re-score assertions after new sources are added
 * This is useful when source spread changes impact criticality
 */
export async function rescoreAssertionsWithNewSources(
  assertionIds: string[]
): Promise<void> {
  for (const assertionId of assertionIds) {
    try {
      await calculateCriticality(assertionId);
    } catch (error) {
      console.error(`Failed to rescore assertion ${assertionId}:`, error);
    }
  }
}

// ============================================
// Query Functions
// ============================================

/**
 * Get assertions by criticality level
 */
export async function getAssertionsByCriticality(
  projectId: string,
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
  limit?: number
): Promise<any[]> {
  return prisma.assertion.findMany({
    where: {
      entity: { projectId },
      criticality: level as AssertionCriticality,
      status: { not: 'REJECTED' },
    },
    include: {
      entity: {
        select: { id: true, name: true },
      },
      reasoning: true,
      sources: {
        include: { source: true },
      },
    },
    orderBy: [
      { criticalityScore: 'desc' },
      { createdAt: 'desc' },
    ],
    take: limit,
  });
}

/**
 * Get critical assertions needing validation
 * Returns CRITICAL + HIGH assertions with status=CLAIM
 */
export async function getCriticalAssertionsNeedingValidation(
  projectId: string
): Promise<any[]> {
  return prisma.assertion.findMany({
    where: {
      entity: { projectId },
      status: 'CLAIM',
      criticality: {
        in: [AssertionCriticality.CRITICAL, AssertionCriticality.HIGH],
      },
    },
    include: {
      entity: {
        select: { id: true, name: true },
      },
      reasoning: true,
      sources: {
        include: { source: true },
      },
    },
    orderBy: [
      { criticality: 'asc' }, // CRITICAL first
      { criticalityScore: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

/**
 * Get criticality summary for project
 * Shows distribution of assertions by criticality level
 */
export async function getCriticalitySummary(projectId: string): Promise<{
  total: number;
  byLevel: { CRITICAL: number; HIGH: number; MEDIUM: number; LOW: number };
  needingValidation: number;
}> {
  const assertions = await prisma.assertion.findMany({
    where: {
      entity: { projectId },
      status: { not: 'REJECTED' },
    },
    select: {
      criticality: true,
      status: true,
    },
  });

  const byLevel = {
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
  };

  let needingValidation = 0;

  for (const assertion of assertions) {
    // Count by level
    if (assertion.criticality === AssertionCriticality.CRITICAL) {
      byLevel.CRITICAL++;
      if (assertion.status === 'CLAIM') needingValidation++;
    } else if (assertion.criticality === AssertionCriticality.HIGH) {
      byLevel.HIGH++;
      if (assertion.status === 'CLAIM') needingValidation++;
    } else if (assertion.criticality === AssertionCriticality.MEDIUM) {
      byLevel.MEDIUM++;
    } else if (assertion.criticality === AssertionCriticality.LOW) {
      byLevel.LOW++;
    }
  }

  return {
    total: assertions.length,
    byLevel,
    needingValidation,
  };
}
