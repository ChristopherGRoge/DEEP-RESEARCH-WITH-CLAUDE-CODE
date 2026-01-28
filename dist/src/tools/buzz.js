"use strict";
/**
 * Buzz Score Calculator - Compute composite buzz score for entities
 *
 * Formula:
 * BuzzScore = (
 *   MarketPresence   * 0.30 +
 *   DeveloperActivity * 0.25 +
 *   FundingSignal     * 0.20 +
 *   MentionVelocity   * 0.15 +
 *   ResearchDepth     * 0.10
 * )
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBuzzScore = calculateBuzzScore;
exports.calculateProjectBuzzScores = calculateProjectBuzzScores;
exports.setBuzzOverride = setBuzzOverride;
exports.clearBuzzOverride = clearBuzzOverride;
exports.getEntitiesByBuzzScore = getEntitiesByBuzzScore;
const client_1 = require("../db/client");
// ============================================
// NORMALIZATION FUNCTIONS
// ============================================
/**
 * Normalize GitHub stars to 0-1 using log scale
 * 100 stars = 0.4, 1000 = 0.6, 10000 = 0.8, 50000+ = 1.0
 */
function normalizeStars(stars) {
    if (!stars || stars <= 0)
        return 0;
    if (stars >= 50000)
        return 1.0;
    if (stars >= 10000)
        return 0.8 + (0.2 * (stars - 10000) / 40000);
    if (stars >= 1000)
        return 0.6 + (0.2 * (stars - 1000) / 9000);
    if (stars >= 100)
        return 0.4 + (0.2 * (stars - 100) / 900);
    return 0.4 * (stars / 100);
}
/**
 * Normalize contributor count
 * 10 = 0.3, 50 = 0.5, 200 = 0.7, 500+ = 1.0
 */
function normalizeContributors(contributors) {
    if (!contributors || contributors <= 0)
        return 0;
    if (contributors >= 500)
        return 1.0;
    if (contributors >= 200)
        return 0.7 + (0.3 * (contributors - 200) / 300);
    if (contributors >= 50)
        return 0.5 + (0.2 * (contributors - 50) / 150);
    if (contributors >= 10)
        return 0.3 + (0.2 * (contributors - 10) / 40);
    return 0.3 * (contributors / 10);
}
/**
 * Parse employee count string to normalized score
 * "1-10" = 0.2, "11-50" = 0.3, "51-200" = 0.5, "201-1000" = 0.7, "1000+" = 0.9
 */
function normalizeEmployeeCount(employeeCount) {
    if (!employeeCount)
        return 0;
    const lower = employeeCount.toLowerCase();
    if (lower.includes('1000') || lower.includes('1k'))
        return 0.9;
    if (lower.includes('500') || lower.includes('201-'))
        return 0.7;
    if (lower.includes('200') || lower.includes('51-'))
        return 0.5;
    if (lower.includes('50') || lower.includes('11-'))
        return 0.3;
    if (lower.includes('10') || lower.includes('1-'))
        return 0.2;
    // Try to parse number
    const match = employeeCount.match(/(\d+)/);
    if (match) {
        const num = parseInt(match[1], 10);
        if (num >= 1000)
            return 0.9;
        if (num >= 200)
            return 0.7;
        if (num >= 50)
            return 0.5;
        if (num >= 10)
            return 0.3;
        return 0.2;
    }
    return 0;
}
/**
 * Parse funding string to normalized score
 */
function normalizeFunding(totalRaised, lastRound) {
    // Check funding round first (more reliable)
    if (lastRound) {
        const round = lastRound.toLowerCase();
        if (round.includes('ipo') || round.includes('public'))
            return 0.95;
        if (round.includes('series d') || round.includes('series e') || round.includes('series f'))
            return 0.9;
        if (round.includes('series c'))
            return 0.85;
        if (round.includes('series b'))
            return 0.7;
        if (round.includes('series a'))
            return 0.55;
        if (round.includes('seed'))
            return 0.4;
        if (round.includes('angel') || round.includes('pre-seed'))
            return 0.3;
    }
    // Fall back to total raised
    if (totalRaised) {
        const amount = totalRaised.toLowerCase();
        // Parse "$XXM" or "$X.XB" format
        const billionMatch = amount.match(/\$?([\d.]+)\s*b/i);
        if (billionMatch) {
            return 0.95;
        }
        const millionMatch = amount.match(/\$?([\d.]+)\s*m/i);
        if (millionMatch) {
            const millions = parseFloat(millionMatch[1]);
            if (millions >= 500)
                return 0.9;
            if (millions >= 100)
                return 0.8;
            if (millions >= 50)
                return 0.7;
            if (millions >= 20)
                return 0.6;
            if (millions >= 10)
                return 0.5;
            if (millions >= 5)
                return 0.4;
            return 0.3;
        }
    }
    return 0;
}
/**
 * Calculate days since a date (for recency scoring)
 */
function daysSince(date) {
    if (!date)
        return 999;
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
/**
 * Normalize recency (recent = higher score)
 */
function normalizeRecency(daysSinceActivity) {
    if (daysSinceActivity <= 7)
        return 1.0;
    if (daysSinceActivity <= 30)
        return 0.9;
    if (daysSinceActivity <= 90)
        return 0.7;
    if (daysSinceActivity <= 180)
        return 0.5;
    if (daysSinceActivity <= 365)
        return 0.3;
    return 0.1;
}
// ============================================
// COMPONENT CALCULATORS
// ============================================
/**
 * Calculate Market Presence component (30% weight)
 */
async function calculateMarketPresence(entity, companyData) {
    const missing = [];
    const signals = [];
    // GitHub stars (primary signal)
    if (entity.githubStars !== null) {
        signals.push(normalizeStars(entity.githubStars) * 1.5); // Weight stars heavily
    }
    else {
        missing.push('githubStars');
    }
    // GitHub forks (secondary signal)
    if (entity.githubForks !== null) {
        signals.push(normalizeStars(entity.githubForks * 2)); // Forks ~= stars/2
    }
    // Employee count from company extraction
    if (companyData?.employeeCount) {
        signals.push(normalizeEmployeeCount(companyData.employeeCount));
    }
    else {
        missing.push('employeeCount');
    }
    // Enterprise tier availability (from pricing extraction)
    // TODO: Check pricing extraction for hasEnterprise
    if (signals.length === 0) {
        return { score: 0, missing };
    }
    // Average available signals (capped at 1.0)
    const avg = signals.reduce((a, b) => a + b, 0) / signals.length;
    return { score: Math.min(1.0, avg), missing };
}
/**
 * Calculate Developer Activity component (25% weight)
 */
async function calculateDeveloperActivity(entity) {
    const missing = [];
    const signals = [];
    // Contributors
    if (entity.githubContributors !== null) {
        signals.push(normalizeContributors(entity.githubContributors));
    }
    else {
        missing.push('githubContributors');
    }
    // Recent commit activity
    if (entity.githubLastCommit) {
        const recency = normalizeRecency(daysSince(entity.githubLastCommit));
        signals.push(recency);
    }
    else {
        missing.push('githubLastCommit');
    }
    // Recent release activity
    if (entity.githubLastRelease) {
        const recency = normalizeRecency(daysSince(entity.githubLastRelease));
        signals.push(recency * 0.8); // Releases less frequent than commits
    }
    // Open issues (some is healthy, too many is concerning)
    if (entity.githubOpenIssues !== null) {
        // Sweet spot: 50-500 open issues = active project
        const issues = entity.githubOpenIssues;
        if (issues >= 50 && issues <= 500) {
            signals.push(0.8);
        }
        else if (issues > 500) {
            signals.push(0.6); // Maybe overwhelmed
        }
        else if (issues > 10) {
            signals.push(0.7);
        }
        else {
            signals.push(0.4); // Very few issues = low activity
        }
    }
    if (signals.length === 0) {
        return { score: 0, missing };
    }
    const avg = signals.reduce((a, b) => a + b, 0) / signals.length;
    return { score: Math.min(1.0, avg), missing };
}
/**
 * Calculate Funding Signal component (20% weight)
 */
async function calculateFundingSignal(companyData) {
    const missing = [];
    if (!companyData?.funding) {
        missing.push('funding');
        return { score: 0, missing };
    }
    const funding = companyData.funding;
    const score = normalizeFunding(funding.totalRaised, funding.lastRound);
    if (score === 0) {
        missing.push('fundingDetails');
    }
    return { score, missing };
}
/**
 * Calculate Mention Velocity component (15% weight)
 */
async function calculateMentionVelocity(entityId) {
    const missing = [];
    // Count assertions and their source spread
    const assertions = await client_1.prisma.assertion.findMany({
        where: { entityId },
        select: {
            mentionCount: true,
            sourceSpread: true,
            createdAt: true,
        },
    });
    if (assertions.length === 0) {
        missing.push('assertions');
        return { score: 0, missing };
    }
    // Total mentions across all assertions
    const totalMentions = assertions.reduce((sum, a) => sum + a.mentionCount, 0);
    // Average source spread (how many different sources mention claims)
    const avgSourceSpread = assertions.reduce((sum, a) => sum + a.sourceSpread, 0) / assertions.length;
    // Recent assertion activity (claims added recently = active buzz)
    const recentAssertions = assertions.filter((a) => daysSince(a.createdAt) <= 30).length;
    const signals = [];
    // Mention count signal
    if (totalMentions > 50)
        signals.push(1.0);
    else if (totalMentions > 20)
        signals.push(0.8);
    else if (totalMentions > 10)
        signals.push(0.6);
    else if (totalMentions > 5)
        signals.push(0.4);
    else
        signals.push(0.2);
    // Source spread signal
    if (avgSourceSpread > 3)
        signals.push(1.0);
    else if (avgSourceSpread > 2)
        signals.push(0.8);
    else if (avgSourceSpread > 1.5)
        signals.push(0.6);
    else
        signals.push(0.3);
    // Recent activity signal
    if (recentAssertions > 10)
        signals.push(1.0);
    else if (recentAssertions > 5)
        signals.push(0.8);
    else if (recentAssertions > 2)
        signals.push(0.6);
    else if (recentAssertions > 0)
        signals.push(0.4);
    else
        signals.push(0.2);
    const avg = signals.reduce((a, b) => a + b, 0) / signals.length;
    return { score: avg, missing };
}
/**
 * Calculate Research Depth component (10% weight)
 */
async function calculateResearchDepth(entityId) {
    const missing = [];
    // Count assertions by status
    const assertions = await client_1.prisma.assertion.groupBy({
        by: ['status'],
        where: { entityId },
        _count: true,
    });
    // Count extractions by schema type
    const extractions = await client_1.prisma.extraction.findMany({
        where: { entityId },
        select: { schemaType: true },
    });
    const totalAssertions = assertions.reduce((sum, a) => sum + a._count, 0);
    const validatedAssertions = assertions.find((a) => a.status === 'EVIDENCE')?._count || 0;
    const extractionTypes = new Set(extractions.map((e) => e.schemaType));
    const signals = [];
    // Assertion coverage
    if (totalAssertions >= 20)
        signals.push(1.0);
    else if (totalAssertions >= 10)
        signals.push(0.8);
    else if (totalAssertions >= 5)
        signals.push(0.6);
    else if (totalAssertions > 0)
        signals.push(0.4);
    else {
        missing.push('assertions');
        signals.push(0);
    }
    // Validation rate
    if (totalAssertions > 0) {
        const validationRate = validatedAssertions / totalAssertions;
        signals.push(validationRate);
    }
    // Schema type coverage (6 types: pricing, features, company, compliance, integrations, differentiators)
    const typeCoverage = extractionTypes.size / 6;
    signals.push(typeCoverage);
    if (extractionTypes.size === 0) {
        missing.push('extractions');
    }
    if (signals.length === 0) {
        return { score: 0, missing };
    }
    const avg = signals.reduce((a, b) => a + b, 0) / signals.length;
    return { score: avg, missing };
}
// ============================================
// MAIN CALCULATOR
// ============================================
/**
 * Calculate buzz score for an entity
 */
async function calculateBuzzScore(input) {
    const { entityId } = input;
    // Get entity with all data
    const entity = await client_1.prisma.entity.findUnique({
        where: { id: entityId },
        include: {
            extractions: true,
        },
    });
    if (!entity) {
        return {
            success: false,
            entityId,
            entityName: 'Unknown',
            buzzScore: 0,
            components: {
                marketPresence: 0,
                developerActivity: 0,
                fundingSignal: 0,
                mentionVelocity: 0,
                researchDepth: 0,
            },
            dataQuality: 'low',
            missingData: ['entity'],
        };
    }
    // Check for manual override
    if (entity.buzzOverride !== null) {
        return {
            success: true,
            entityId,
            entityName: entity.name,
            buzzScore: entity.buzzOverride,
            components: {
                marketPresence: 0,
                developerActivity: 0,
                fundingSignal: 0,
                mentionVelocity: 0,
                researchDepth: 0,
            },
            dataQuality: 'high',
            missingData: [],
        };
    }
    // Get company extraction data
    const companyExtraction = entity.extractions.find((e) => e.schemaType === 'company');
    const companyData = companyExtraction?.data;
    // Calculate each component
    const allMissing = [];
    const marketPresence = await calculateMarketPresence(entity, companyData);
    allMissing.push(...marketPresence.missing);
    const developerActivity = await calculateDeveloperActivity(entity);
    allMissing.push(...developerActivity.missing);
    const fundingSignal = await calculateFundingSignal(companyData);
    allMissing.push(...fundingSignal.missing);
    const mentionVelocity = await calculateMentionVelocity(entityId);
    allMissing.push(...mentionVelocity.missing);
    const researchDepth = await calculateResearchDepth(entityId);
    allMissing.push(...researchDepth.missing);
    // Calculate composite score with weights
    const components = {
        marketPresence: marketPresence.score,
        developerActivity: developerActivity.score,
        fundingSignal: fundingSignal.score,
        mentionVelocity: mentionVelocity.score,
        researchDepth: researchDepth.score,
    };
    const buzzScore = components.marketPresence * 0.30 +
        components.developerActivity * 0.25 +
        components.fundingSignal * 0.20 +
        components.mentionVelocity * 0.15 +
        components.researchDepth * 0.10;
    // Determine data quality
    const uniqueMissing = [...new Set(allMissing)];
    let dataQuality;
    if (uniqueMissing.length <= 2) {
        dataQuality = 'high';
    }
    else if (uniqueMissing.length <= 5) {
        dataQuality = 'medium';
    }
    else {
        dataQuality = 'low';
    }
    // Update entity with calculated score
    await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            buzzScore: Math.round(buzzScore * 1000) / 1000, // 3 decimal places
            buzzComponents: components,
            buzzCalculatedAt: new Date(),
        },
    });
    return {
        success: true,
        entityId,
        entityName: entity.name,
        buzzScore: Math.round(buzzScore * 1000) / 1000,
        components,
        dataQuality,
        missingData: uniqueMissing,
    };
}
/**
 * Calculate buzz scores for all entities in a project
 */
async function calculateProjectBuzzScores(input) {
    const { projectId, forceRecalculate = false } = input;
    const entities = await client_1.prisma.entity.findMany({
        where: {
            projectId,
            ...(forceRecalculate ? {} : { buzzCalculatedAt: null }),
        },
    });
    const results = [];
    for (const entity of entities) {
        const result = await calculateBuzzScore({ entityId: entity.id });
        results.push(result);
    }
    return {
        success: true,
        projectId,
        total: entities.length,
        calculated: results.filter((r) => r.success).length,
        results,
    };
}
/**
 * Set manual buzz override for an entity
 */
async function setBuzzOverride(input) {
    const { entityId, buzzOverride, reason } = input;
    if (buzzOverride < 0 || buzzOverride > 1) {
        throw new Error('buzzOverride must be between 0 and 1');
    }
    const entity = await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            buzzOverride,
            buzzOverrideReason: reason,
            buzzScore: buzzOverride,
            buzzCalculatedAt: new Date(),
        },
    });
    return {
        success: true,
        entityId,
        entityName: entity.name,
        buzzOverride,
    };
}
/**
 * Clear manual buzz override for an entity
 */
async function clearBuzzOverride(input) {
    const { entityId } = input;
    await client_1.prisma.entity.update({
        where: { id: entityId },
        data: {
            buzzOverride: null,
            buzzOverrideReason: null,
            buzzScore: null,
            buzzCalculatedAt: null,
        },
    });
    return { success: true };
}
/**
 * Get entities ranked by buzz score
 */
async function getEntitiesByBuzzScore(input) {
    const { projectId, limit = 20, minBuzz = 0, categoryId } = input;
    const entities = await client_1.prisma.entity.findMany({
        where: {
            projectId,
            buzzScore: { gte: minBuzz },
            ...(categoryId ? { categoryId } : {}),
        },
        orderBy: { buzzScore: 'desc' },
        take: limit,
        include: {
            category: true,
        },
    });
    return {
        success: true,
        entities: entities.map((e) => {
            const components = e.buzzComponents;
            const componentValues = components ? Object.values(components) : [];
            const filledCount = componentValues.filter((v) => v > 0).length;
            return {
                id: e.id,
                name: e.name,
                buzzScore: e.buzzScore,
                buzzComponents: components,
                dataQuality: filledCount >= 4 ? 'high' : filledCount >= 2 ? 'medium' : 'low',
                githubStars: e.githubStars,
                categoryName: e.category?.displayName,
            };
        }),
    };
}
//# sourceMappingURL=buzz.js.map