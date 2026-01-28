"use strict";
/**
 * Evidence Validation Tools
 *
 * Provides tools for validating evidence quality and integrity in the research system.
 * These tools help maintain research quality by:
 * - Detecting conflicting evidence between assertions
 * - Cross-referencing claims across multiple sources
 * - Checking evidence freshness and identifying stale data
 * - Validating evidence chain integrity (screenshots + descriptions + sources)
 * - Calculating confidence scores based on evidence quality
 *
 * CLI Commands:
 * - evidence:conflicts - Find contradicting claims about an entity
 * - evidence:crossref - Find corroborating evidence from multiple sources
 * - evidence:freshness - Check for stale evidence needing refresh
 * - evidence:validate-chain - Verify screenshot → claim → assertion chain
 * - evidence:confidence - Calculate confidence score based on evidence quality
 *
 * @module evidence-validator
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConflictingEvidence = findConflictingEvidence;
exports.crossReferenceEvidence = crossReferenceEvidence;
exports.checkEvidenceFreshness = checkEvidenceFreshness;
exports.validateEvidenceChain = validateEvidenceChain;
exports.calculateEvidenceConfidence = calculateEvidenceConfidence;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// ============================================
// Helper Functions
// ============================================
/**
 * Check if a file exists on the filesystem
 */
function fileExists(filePath) {
    try {
        const fullPath = path.isAbsolute(filePath)
            ? filePath
            : path.join(process.cwd(), filePath);
        return fs.existsSync(fullPath);
    }
    catch {
        return false;
    }
}
/**
 * Extract numeric values from text for comparison
 */
function extractNumbers(text) {
    const matches = text.match(/\d+(?:\.\d+)?/g);
    return matches ? matches.map(n => parseFloat(n)) : [];
}
/**
 * Calculate similarity between two claims (simple word overlap)
 */
function calculateSimilarity(claim1, claim2) {
    const words1 = claim1.toLowerCase().split(/\s+/);
    const words2 = claim2.toLowerCase().split(/\s+/);
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    // Convert sets to arrays for compatibility
    const arr1 = Array.from(set1);
    const arr2 = Array.from(set2);
    const intersection = new Set(arr1.filter(x => set2.has(x)));
    const union = new Set(arr1.concat(arr2));
    return intersection.size / union.size;
}
/**
 * Detect potential conflicts between two claims
 */
function detectConflictType(claim1, claim2) {
    const similarity = calculateSimilarity(claim1, claim2);
    // If claims are very similar, check for contradictions
    if (similarity > 0.5) {
        // Check for direct contradictions (yes/no, true/false, has/doesn't have)
        const contradictionPatterns = [
            { pattern: /(does not|doesn't|no|cannot)\s+(\w+)/, opposite: /(does|has|yes|can)\s+(\w+)/ },
            { pattern: /\bnot\s+(\w+)/, opposite: /\b(\w+)/ },
        ];
        for (const { pattern, opposite } of contradictionPatterns) {
            if (pattern.test(claim1) && opposite.test(claim2)) {
                return {
                    type: 'direct_contradiction',
                    details: 'Claims contain contradictory statements',
                    confidence: 0.8,
                };
            }
        }
        // Check for different numeric values
        const nums1 = extractNumbers(claim1);
        const nums2 = extractNumbers(claim2);
        if (nums1.length > 0 && nums2.length > 0) {
            const diff = Math.abs(nums1[0] - nums2[0]);
            if (diff > 0) {
                return {
                    type: 'different_values',
                    details: `Numeric values differ: ${nums1[0]} vs ${nums2[0]}`,
                    confidence: 0.7,
                };
            }
        }
        // Check for date conflicts
        const yearPattern = /\b(19|20)\d{2}\b/;
        const year1 = claim1.match(yearPattern);
        const year2 = claim2.match(yearPattern);
        if (year1 && year2 && year1[0] !== year2[0]) {
            return {
                type: 'different_dates',
                details: `Date conflict: ${year1[0]} vs ${year2[0]}`,
                confidence: 0.6,
            };
        }
    }
    return { type: null, details: '', confidence: 0 };
}
/**
 * Calculate refresh priority based on age, category, and status
 */
function calculateRefreshPriority(ageDays, category, status, criticality) {
    // Critical assertions always high priority when stale
    if (criticality === 'CRITICAL' && ageDays > 30)
        return 'critical';
    if (criticality === 'CRITICAL' && ageDays > 14)
        return 'high';
    // Pricing data ages quickly
    if (category === 'pricing' && ageDays > 90)
        return 'high';
    if (category === 'pricing' && ageDays > 60)
        return 'medium';
    // Compliance data is important
    if (category === 'compliance' && ageDays > 180)
        return 'high';
    if (category === 'compliance' && ageDays > 90)
        return 'medium';
    // Features can be stable longer
    if (category === 'feature' && ageDays > 180)
        return 'medium';
    if (category === 'feature' && ageDays > 365)
        return 'high';
    // Validated evidence is more important to refresh
    if (status === client_2.AssertionStatus.EVIDENCE && ageDays > 180)
        return 'medium';
    // General aging
    if (ageDays > 365)
        return 'high';
    if (ageDays > 180)
        return 'medium';
    return 'low';
}
// ============================================
// Main Functions
// ============================================
/**
 * Find conflicting evidence for a claim
 * Searches for contradicting assertions about the same entity
 */
async function findConflictingEvidence(input) {
    const { entityId, claim } = input;
    // Get all assertions for this entity
    const assertions = await client_1.default.assertion.findMany({
        where: { entityId },
        include: {
            sources: {
                include: { source: true },
            },
        },
    });
    const conflicts = [];
    // Compare with each assertion
    for (const assertion of assertions) {
        if (assertion.claim === claim)
            continue; // Skip the same claim
        const conflict = detectConflictType(claim, assertion.claim);
        if (conflict.type) {
            const sourceUrl = assertion.sources[0]?.source.url;
            conflicts.push({
                assertionId: assertion.id,
                claim: assertion.claim,
                source: sourceUrl,
                conflictType: conflict.type,
                conflictDetails: conflict.details,
                confidence: conflict.confidence,
            });
        }
    }
    // Calculate aggregate conflict score
    const conflictScore = conflicts.length > 0
        ? conflicts.reduce((sum, c) => sum + c.confidence, 0) / conflicts.length
        : 0;
    // Build summary
    const summary = {
        totalConflicts: conflicts.length,
        directContradictions: conflicts.filter(c => c.conflictType === 'direct_contradiction').length,
        valueConflicts: conflicts.filter(c => c.conflictType === 'different_values').length,
        dateConflicts: conflicts.filter(c => c.conflictType === 'different_dates').length,
        scopeMismatches: conflicts.filter(c => c.conflictType === 'scope_mismatch').length,
    };
    return {
        conflicts,
        conflictScore,
        summary,
    };
}
/**
 * Find corroborating evidence across assertions
 * Searches for supporting claims from multiple sources
 */
async function crossReferenceEvidence(input) {
    const { claim, entityId, requiredSources = 2 } = input;
    const where = {
        claim: {
            contains: claim.split(' ').slice(0, 5).join(' '), // Search by first 5 words
            mode: 'insensitive',
        },
    };
    if (entityId) {
        where.entityId = entityId;
    }
    // Find similar assertions
    const assertions = await client_1.default.assertion.findMany({
        where,
        include: {
            sources: {
                include: { source: true },
            },
        },
    });
    const corroborations = [];
    const uniqueSources = new Set();
    for (const assertion of assertions) {
        for (const assertionSource of assertion.sources) {
            const source = assertionSource.source;
            uniqueSources.add(source.url);
            corroborations.push({
                assertionId: assertion.id,
                source: source.url,
                quote: assertionSource.quote ?? undefined,
                confidence: assertion.confidence ?? 0.5,
                screenshotEvidence: !!assertion.evidenceScreenshotPath,
                category: assertion.category ?? undefined,
            });
        }
    }
    // Calculate confidence score
    const avgConfidence = corroborations.length > 0
        ? corroborations.reduce((sum, c) => sum + c.confidence, 0) / corroborations.length
        : 0;
    const uniqueSourceCount = uniqueSources.size;
    const hasScreenshots = corroborations.filter(c => c.screenshotEvidence).length;
    // Confidence factors
    const sourceCountFactor = Math.min(uniqueSourceCount / requiredSources, 1);
    const screenshotFactor = hasScreenshots > 0 ? 0.3 : 0;
    const avgConfidenceFactor = avgConfidence;
    const confidenceScore = (sourceCountFactor * 0.5) + (avgConfidenceFactor * 0.3) + screenshotFactor;
    const verified = uniqueSourceCount >= requiredSources && confidenceScore > 0.6;
    return {
        corroborations,
        verified,
        confidenceScore,
        summary: {
            totalCorroborations: corroborations.length,
            withScreenshots: hasScreenshots,
            uniqueSources: uniqueSourceCount,
            averageConfidence: avgConfidence,
        },
    };
}
/**
 * Check for stale evidence that needs refreshing
 * Identifies assertions that are old or based on outdated evidence
 */
async function checkEvidenceFreshness(input) {
    const { entityId, maxAgeDays = 90 } = input;
    const assertions = await client_1.default.assertion.findMany({
        where: { entityId },
        orderBy: { updatedAt: 'desc' },
    });
    const now = new Date();
    const staleAssertions = [];
    let freshCount = 0;
    let staleCount = 0;
    const priorityCounts = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
    };
    for (const assertion of assertions) {
        const ageDays = Math.floor((now.getTime() - assertion.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
        const isStale = ageDays > maxAgeDays;
        if (isStale) {
            staleCount++;
            const priority = calculateRefreshPriority(ageDays, assertion.category, assertion.status, assertion.criticality);
            priorityCounts[priority]++;
            // Calculate evidence age if screenshot exists
            let evidenceAge;
            if (assertion.evidenceChain) {
                const chain = assertion.evidenceChain;
                if (chain.length > 0 && chain[0].capturedAt) {
                    const captureDate = new Date(chain[0].capturedAt);
                    evidenceAge = Math.floor((now.getTime() - captureDate.getTime()) / (1000 * 60 * 60 * 24));
                }
            }
            staleAssertions.push({
                id: assertion.id,
                claim: assertion.claim,
                category: assertion.category ?? undefined,
                age: ageDays,
                lastUpdated: assertion.updatedAt,
                evidenceAge,
                refreshPriority: priority,
                reason: `Last updated ${ageDays} days ago (threshold: ${maxAgeDays} days)`,
            });
        }
        else {
            freshCount++;
        }
    }
    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    staleAssertions.sort((a, b) => priorityOrder[a.refreshPriority] - priorityOrder[b.refreshPriority]);
    return {
        staleAssertions,
        freshCount,
        staleCount,
        summary: {
            total: assertions.length,
            fresh: freshCount,
            stale: staleCount,
            critical: priorityCounts.critical,
            high: priorityCounts.high,
            medium: priorityCounts.medium,
            low: priorityCounts.low,
        },
    };
}
/**
 * Validate evidence chain integrity
 * Verifies screenshot exists and evidence chain is complete
 */
async function validateEvidenceChain(input) {
    const { assertionId } = input;
    const assertion = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        include: {
            sources: {
                include: { source: true },
            },
        },
    });
    if (!assertion) {
        throw new Error(`Assertion not found: ${assertionId}`);
    }
    const issues = [];
    const details = {
        hasEvidenceDescription: !!assertion.evidenceDescription,
        hasEvidenceScreenshotPath: !!assertion.evidenceScreenshotPath,
        screenshotFileExists: false,
        hasEvidenceChain: !!assertion.evidenceChain,
        evidenceChainCount: 0,
        hasSources: assertion.sources.length > 0,
        sourceCount: assertion.sources.length,
    };
    // Check evidence description
    if (!assertion.evidenceDescription) {
        issues.push('Missing evidenceDescription field');
    }
    // Check screenshot path
    if (!assertion.evidenceScreenshotPath) {
        issues.push('Missing evidenceScreenshotPath field');
    }
    else {
        details.screenshotFileExists = fileExists(assertion.evidenceScreenshotPath);
        if (!details.screenshotFileExists) {
            issues.push(`Screenshot file not found: ${assertion.evidenceScreenshotPath}`);
        }
    }
    // Check evidence chain
    if (assertion.evidenceChain) {
        const chain = assertion.evidenceChain;
        details.evidenceChainCount = chain.length;
        for (let i = 0; i < chain.length; i++) {
            const item = chain[i];
            if (!item.screenshotPath) {
                issues.push(`Evidence chain item ${i} missing screenshotPath`);
            }
            else if (!fileExists(item.screenshotPath)) {
                issues.push(`Evidence chain item ${i} screenshot not found: ${item.screenshotPath}`);
            }
            if (!item.description) {
                issues.push(`Evidence chain item ${i} missing description`);
            }
        }
    }
    // Check sources
    if (assertion.sources.length === 0) {
        issues.push('No sources linked to assertion');
    }
    const screenshotExists = details.screenshotFileExists;
    const chainComplete = details.hasEvidenceDescription &&
        details.hasEvidenceScreenshotPath &&
        details.screenshotFileExists &&
        details.hasSources;
    return {
        valid: issues.length === 0,
        issues,
        screenshotExists,
        chainComplete,
        details,
    };
}
/**
 * Calculate confidence score based on evidence quality
 * Factors: source count, freshness, corroboration, screenshot evidence
 */
async function calculateEvidenceConfidence(input) {
    const { assertionId } = input;
    const assertion = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        include: {
            sources: {
                include: { source: true },
            },
            entity: true,
        },
    });
    if (!assertion) {
        throw new Error(`Assertion not found: ${assertionId}`);
    }
    const now = new Date();
    // Factor 1: Source count (more sources = higher confidence)
    const sourceCount = assertion.sources.length;
    const sourceCountScore = Math.min(sourceCount / 3, 1); // Max at 3 sources
    // Factor 2: Freshness (newer = higher confidence)
    const ageMs = now.getTime() - assertion.updatedAt.getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    const freshnessScore = Math.max(0, 1 - (ageDays / 365)); // Decays over 1 year
    // Factor 3: Corroboration (other assertions supporting this)
    const similarAssertions = await client_1.default.assertion.findMany({
        where: {
            entityId: assertion.entityId,
            id: { not: assertionId },
            category: assertion.category ?? undefined,
            status: client_2.AssertionStatus.EVIDENCE,
        },
    });
    const corroboration = similarAssertions.filter(a => calculateSimilarity(a.claim, assertion.claim) > 0.5).length;
    const corroborationScore = Math.min(corroboration / 2, 1); // Max at 2 corroborations
    // Factor 4: Screenshot evidence (has evidence = higher confidence)
    const screenshotEvidence = !!assertion.evidenceScreenshotPath && fileExists(assertion.evidenceScreenshotPath);
    const screenshotScore = screenshotEvidence ? 1 : 0;
    // Factor 5: Evidence chain length (more evidence = higher confidence)
    const evidenceChainLength = assertion.evidenceChain
        ? assertion.evidenceChain.length
        : 0;
    const evidenceChainScore = Math.min(evidenceChainLength / 3, 1); // Max at 3 items
    // Calculate weighted score
    const weights = {
        sourceCount: 0.25,
        freshness: 0.15,
        corroboration: 0.15,
        screenshot: 0.30,
        evidenceChain: 0.15,
    };
    const score = (sourceCountScore * weights.sourceCount) +
        (freshnessScore * weights.freshness) +
        (corroborationScore * weights.corroboration) +
        (screenshotScore * weights.screenshot) +
        (evidenceChainScore * weights.evidenceChain);
    // Determine recommendation
    let recommendation;
    if (score >= 0.8) {
        recommendation = 'high_confidence';
    }
    else if (score >= 0.6) {
        recommendation = 'medium_confidence';
    }
    else if (score >= 0.4) {
        recommendation = 'low_confidence';
    }
    else {
        recommendation = 'needs_validation';
    }
    // Build summary
    const summary = `Confidence: ${(score * 100).toFixed(0)}% - ` +
        `${sourceCount} sources, ` +
        `${Math.floor(ageDays)} days old, ` +
        `${corroboration} corroborations, ` +
        `${screenshotEvidence ? 'has' : 'no'} screenshot evidence`;
    return {
        score,
        factors: {
            sourceCount,
            sourceCountScore,
            freshness: Math.floor(ageDays),
            freshnessScore,
            corroboration,
            corroborationScore,
            screenshotEvidence,
            screenshotScore,
            evidenceChainLength,
            evidenceChainScore,
        },
        recommendation,
        summary,
    };
}
//# sourceMappingURL=evidence-validator.js.map