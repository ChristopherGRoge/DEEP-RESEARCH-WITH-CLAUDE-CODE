"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssertion = createAssertion;
exports.getAssertion = getAssertion;
exports.listAssertions = listAssertions;
exports.searchAssertions = searchAssertions;
exports.updateAssertion = updateAssertion;
exports.addReasoning = addReasoning;
exports.validateAssertion = validateAssertion;
exports.rejectAssertion = rejectAssertion;
exports.setCriticality = setCriticality;
exports.markCitedInConclusion = markCitedInConclusion;
exports.getAssertionsPendingValidation = getAssertionsPendingValidation;
exports.getRejectedForReresearch = getRejectedForReresearch;
exports.supersededAssertion = supersededAssertion;
exports.addHumanResponse = addHumanResponse;
exports.addAgentResponse = addAgentResponse;
exports.getActiveDialogues = getActiveDialogues;
exports.deleteAssertion = deleteAssertion;
exports.findSimilarAssertions = findSimilarAssertions;
exports.calculateConfidence = calculateConfidence;
exports.updateConfidence = updateConfidence;
exports.getAssertionsByConfidence = getAssertionsByConfidence;
exports.getLowConfidenceAssertions = getLowConfidenceAssertions;
exports.recalculateProjectConfidence = recalculateProjectConfidence;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
/**
 * Create a new assertion about an entity
 * Optionally includes reasoning and source in one operation
 *
 * Evidence-First Research: New assertions SHOULD include evidenceDescription
 * and evidenceScreenshotPath to provide direct screenshot evidence rather
 * than relying solely on source URLs.
 *
 * DEDUPLICATION: This function checks for existing identical claims before
 * creating a new assertion. If an identical claim exists for the same entity,
 * the existing assertion is returned instead of creating a duplicate.
 */
async function createAssertion(input) {
    // Check for existing identical claim (deduplication)
    const existing = await client_1.default.assertion.findFirst({
        where: {
            entityId: input.entityId,
            claim: input.claim,
        },
        include: {
            reasoning: true,
            sources: { include: { source: true } },
        },
    });
    if (existing) {
        // Return existing assertion instead of creating duplicate
        return existing;
    }
    // Build evidence chain from provided evidence
    let evidenceChain;
    if (input.evidenceScreenshotPath && input.evidenceDescription) {
        evidenceChain = [{
                screenshotPath: input.evidenceScreenshotPath,
                description: input.evidenceDescription,
                capturedAt: new Date().toISOString(),
                source: 'agent',
            }];
    }
    // If additional evidence chain items provided, merge them
    if (input.evidenceChain && input.evidenceChain.length > 0) {
        evidenceChain = [...(evidenceChain || []), ...input.evidenceChain];
    }
    const assertion = await client_1.default.assertion.create({
        data: {
            entityId: input.entityId,
            claim: input.claim,
            category: input.category,
            confidence: input.confidence,
            criticality: input.criticality || client_2.AssertionCriticality.MEDIUM,
            status: client_2.AssertionStatus.CLAIM,
            // Evidence-first fields
            evidenceDescription: input.evidenceDescription,
            evidenceScreenshotPath: input.evidenceScreenshotPath,
            evidenceChain: evidenceChain,
        },
    });
    // Add reasoning if provided
    if (input.reasoning) {
        await client_1.default.reasoning.create({
            data: {
                assertionId: assertion.id,
                content: input.reasoning,
            },
        });
    }
    // Add source if provided
    if (input.sourceUrl) {
        const source = await client_1.default.source.upsert({
            where: { url: input.sourceUrl },
            update: {},
            create: { url: input.sourceUrl },
        });
        await client_1.default.assertionSource.create({
            data: {
                assertionId: assertion.id,
                sourceId: source.id,
                quote: input.sourceQuote,
            },
        });
    }
    await client_1.default.researchLog.create({
        data: {
            action: 'assertion_created',
            agentId: input.agentId,
            details: {
                assertionId: assertion.id,
                entityId: input.entityId,
                claim: input.claim,
                hasEvidence: !!(input.evidenceDescription && input.evidenceScreenshotPath),
                evidenceScreenshotPath: input.evidenceScreenshotPath,
            },
        },
    });
    return client_1.default.assertion.findUnique({
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
async function getAssertion(assertionId) {
    return client_1.default.assertion.findUnique({
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
async function listAssertions(entityId) {
    return client_1.default.assertion.findMany({
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
async function searchAssertions(input) {
    const where = {};
    if (input.entityId) {
        where.entityId = input.entityId;
    }
    if (input.projectId) {
        where.entity = { projectId: input.projectId };
    }
    if (input.query) {
        where.claim = { contains: input.query };
    }
    if (input.category) {
        where.category = input.category;
    }
    if (input.status) {
        where.status = input.status;
    }
    if (input.criticality) {
        where.criticality = input.criticality;
    }
    if (input.citedInConclusion !== undefined) {
        where.citedInConclusion = input.citedInConclusion;
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: [
            { criticality: 'asc' }, // CRITICAL first
            { createdAt: 'desc' },
        ],
        take: 100,
    });
}
/**
 * Update an assertion
 */
async function updateAssertion(assertionId, input) {
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: input,
    });
    await client_1.default.researchLog.create({
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
async function addReasoning(assertionId, content, agentId) {
    const reasoning = await client_1.default.reasoning.create({
        data: {
            assertionId,
            content,
        },
    });
    await client_1.default.researchLog.create({
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
async function validateAssertion(assertionId, validatedBy) {
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            status: client_2.AssertionStatus.EVIDENCE,
            validatedAt: new Date(),
            validatedBy,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'assertion_validated',
            details: { assertionId, validatedBy },
        },
    });
    return assertion;
}
/**
 * Reject an assertion (human action)
 * Includes rejection reason to guide re-research
 */
async function rejectAssertion(assertionId, validatedBy, rejectionReason) {
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            status: client_2.AssertionStatus.REJECTED,
            validatedAt: new Date(),
            validatedBy,
            rejectionReason,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'assertion_rejected',
            details: { assertionId, validatedBy, rejectionReason },
        },
    });
    return assertion;
}
/**
 * Set criticality level for an assertion
 */
async function setCriticality(assertionId, criticality) {
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: { criticality },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'criticality_set',
            details: { assertionId, criticality },
        },
    });
    return assertion;
}
/**
 * Mark an assertion as cited in conclusions
 */
async function markCitedInConclusion(assertionId, conclusionContext) {
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            citedInConclusion: true,
            conclusionContext,
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'cited_in_conclusion',
            details: { assertionId, conclusionContext },
        },
    });
    return assertion;
}
/**
 * Get assertions pending validation (CLAIM status) sorted by criticality
 * Specifically for human-in-the-loop validation workflow
 */
async function getAssertionsPendingValidation(projectId) {
    const where = {
        status: client_2.AssertionStatus.CLAIM,
    };
    if (projectId) {
        where.entity = { projectId };
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true, projectId: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: [
            { criticality: 'asc' }, // CRITICAL first (enum order)
            { citedInConclusion: 'desc' }, // Cited in conclusions first
            { createdAt: 'desc' },
        ],
    });
}
/**
 * Get rejected assertions that need re-research
 */
async function getRejectedForReresearch(projectId) {
    const where = {
        status: client_2.AssertionStatus.REJECTED,
        supersededBy: null, // Not yet replaced
    };
    if (projectId) {
        where.entity = { projectId };
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true, projectId: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: [
            { criticality: 'asc' },
            { createdAt: 'desc' },
        ],
    });
}
/**
 * Link a new assertion as superseding a rejected one
 */
async function supersededAssertion(rejectedId, newAssertionId) {
    const assertion = await client_1.default.assertion.update({
        where: { id: rejectedId },
        data: { supersededBy: newAssertionId },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'assertion_superseded',
            details: { rejectedId, newAssertionId },
        },
    });
    return assertion;
}
/**
 * Add a human response to an assertion (conversational validation)
 * This captures the researcher's interpretation, partial validation, or challenge
 */
async function addHumanResponse(assertionId, response, validatedBy, options = {}) {
    // Get current assertion to append to validation notes
    const current = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        select: { validationNotes: true },
    });
    const existingNotes = current?.validationNotes || [];
    const newNote = {
        role: 'human',
        content: response,
        timestamp: new Date().toISOString(),
        validatedBy,
        ...(options.validatedClaims && { validatedClaims: options.validatedClaims }),
        ...(options.challengedClaims && { challengedClaims: options.challengedClaims }),
    };
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            humanResponse: response,
            validationNotes: [...existingNotes, newNote],
            partiallyValidated: options.partiallyValidated ?? false,
            validatedBy,
            validatedAt: new Date(),
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'human_response_added',
            details: {
                assertionId,
                validatedBy,
                partiallyValidated: options.partiallyValidated,
                hasChallenge: !!options.challengedClaims?.length,
            },
        },
    });
    return assertion;
}
/**
 * Add an agent response to the validation dialogue
 * Used when AI responds to a human challenge
 */
async function addAgentResponse(assertionId, response, agentId) {
    const current = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        select: { validationNotes: true },
    });
    const existingNotes = current?.validationNotes || [];
    const newNote = {
        role: 'agent',
        content: response,
        timestamp: new Date().toISOString(),
        agentId,
    };
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            validationNotes: [...existingNotes, newNote],
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'agent_response_added',
            agentId,
            details: { assertionId },
        },
    });
    return assertion;
}
/**
 * Get assertions with active validation dialogues (partially validated or challenged)
 */
async function getActiveDialogues(projectId) {
    const where = {
        OR: [
            { partiallyValidated: true },
            { validationNotes: { not: null } },
        ],
        status: client_2.AssertionStatus.CLAIM, // Still not fully resolved
    };
    if (projectId) {
        where.entity = { projectId };
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true, projectId: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: { updatedAt: 'desc' },
    });
}
/**
 * Delete an assertion
 */
async function deleteAssertion(assertionId) {
    await client_1.default.researchLog.create({
        data: {
            action: 'assertion_deleted',
            details: { assertionId },
        },
    });
    return client_1.default.assertion.delete({
        where: { id: assertionId },
    });
}
/**
 * Find similar assertions (to avoid duplicates)
 */
async function findSimilarAssertions(entityId, claim) {
    // Simple text search - in production, consider using full-text search
    return client_1.default.assertion.findMany({
        where: {
            entityId,
            claim: {
                contains: claim.split(' ').slice(0, 3).join(' '),
            },
        },
        include: {
            reasoning: true,
            sources: { include: { source: true } },
        },
    });
}
/**
 * Calculate confidence score for an assertion
 *
 * Algorithm considers:
 * - Number of corroborating sources (more = higher)
 * - Source quality (vendor docs > blogs)
 * - Evidence completeness (screenshot + quote > URL only)
 * - Freshness (newer = higher)
 * - Absence of conflicts (no conflicts = higher)
 */
async function calculateConfidence(assertionId) {
    const assertion = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        include: {
            sources: {
                include: {
                    source: true,
                },
            },
        },
    });
    if (!assertion) {
        throw new Error(`Assertion ${assertionId} not found`);
    }
    // 1. Source Count Score (0-30 points)
    // 0 sources = 0, 1 source = 10, 2 sources = 20, 3+ sources = 30
    const sourceCount = assertion.sources.length;
    const sourceCountScore = Math.min(sourceCount * 10, 30);
    // 2. Source Quality Score (0-30 points)
    // vendor_docs/github = 1.0, press = 0.8, blog = 0.6, forum = 0.4
    const sourceQualityWeights = {
        vendor_docs: 1.0,
        github: 1.0,
        press: 0.8,
        blog: 0.6,
        forum: 0.4,
    };
    const sourceQualities = assertion.sources.map(s => {
        const type = s.source.sourceType || 'unknown';
        return sourceQualityWeights[type] || 0.5;
    });
    const avgSourceQuality = sourceQualities.length > 0
        ? sourceQualities.reduce((sum, q) => sum + q, 0) / sourceQualities.length
        : 0;
    const sourceQualityScore = avgSourceQuality * 30;
    // 3. Evidence Completeness Score (0-25 points)
    // Screenshot + description = 25, screenshot only = 15, quote = 10, URL only = 5
    let evidenceScore = 0;
    if (assertion.evidenceScreenshotPath && assertion.evidenceDescription) {
        evidenceScore = 25;
    }
    else if (assertion.evidenceScreenshotPath) {
        evidenceScore = 15;
    }
    else if (assertion.sources.some(s => s.quote)) {
        evidenceScore = 10;
    }
    else if (assertion.sources.length > 0) {
        evidenceScore = 5;
    }
    // 4. Freshness Score (0-10 points)
    // < 30 days = 10, < 90 days = 7, < 180 days = 4, older = 1
    const ageInDays = Math.floor((Date.now() - assertion.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    let freshnessScore = 1;
    if (ageInDays < 30)
        freshnessScore = 10;
    else if (ageInDays < 90)
        freshnessScore = 7;
    else if (ageInDays < 180)
        freshnessScore = 4;
    // 5. Conflict Detection (0-5 points penalty)
    // Check if other assertions about the same entity contradict this claim
    // Simple heuristic: look for similar category assertions with different claims
    const conflictingAssertions = await client_1.default.assertion.findMany({
        where: {
            entityId: assertion.entityId,
            category: assertion.category,
            NOT: { id: assertionId },
            status: { not: 'REJECTED' },
        },
    });
    // Simple conflict detection: if claims differ significantly in same category
    const hasConflict = conflictingAssertions.some(other => {
        // Very basic: check if claims are very different (could be improved)
        const similarity = calculateTextSimilarity(assertion.claim, other.claim);
        return similarity < 0.3; // Different claims in same category
    });
    const conflictPenalty = hasConflict ? -5 : 0;
    // Calculate total score (0-100 scale, convert to 0-1)
    const totalPoints = sourceCountScore + sourceQualityScore + evidenceScore + freshnessScore + conflictPenalty;
    const score = Math.max(0, Math.min(1, totalPoints / 100));
    const factors = {
        sourceCount,
        sourceQuality: avgSourceQuality,
        evidenceCompleteness: evidenceScore / 25,
        freshness: freshnessScore / 10,
        conflictScore: hasConflict ? 0 : 1,
        breakdown: {
            sourceCountScore,
            sourceQualityScore,
            evidenceScore,
            freshnessScore,
            conflictPenalty,
        },
    };
    return { score, factors };
}
/**
 * Simple text similarity calculation (Jaccard similarity)
 */
function calculateTextSimilarity(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return union.size > 0 ? intersection.size / union.size : 0;
}
/**
 * Update confidence score for an assertion
 */
async function updateConfidence(assertionId, score, factors) {
    // If no score provided, calculate it
    let finalScore = score;
    let finalFactors = factors;
    if (score === undefined) {
        const calculated = await calculateConfidence(assertionId);
        finalScore = calculated.score;
        finalFactors = calculated.factors;
    }
    // Get current validation history
    const current = await client_1.default.assertion.findUnique({
        where: { id: assertionId },
        select: { validationHistory: true, confidence: true },
    });
    const existingHistory = current?.validationHistory || [];
    const newHistoryEntry = {
        timestamp: new Date().toISOString(),
        previousScore: current?.confidence,
        newScore: finalScore,
        factors: finalFactors,
    };
    const assertion = await client_1.default.assertion.update({
        where: { id: assertionId },
        data: {
            confidence: finalScore,
            confidenceFactors: finalFactors,
            lastValidatedAt: new Date(),
            validationHistory: [...existingHistory, newHistoryEntry],
        },
    });
    await client_1.default.researchLog.create({
        data: {
            action: 'confidence_updated',
            details: {
                assertionId,
                score: finalScore,
                factors: finalFactors,
            },
        },
    });
    return assertion;
}
/**
 * Get assertions filtered by confidence score
 */
async function getAssertionsByConfidence(entityId, minConfidence, maxConfidence) {
    const where = {
        entityId,
        confidence: {
            gte: minConfidence,
        },
    };
    if (maxConfidence !== undefined) {
        where.confidence.lte = maxConfidence;
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: [
            { confidence: 'desc' },
            { createdAt: 'desc' },
        ],
    });
}
/**
 * Get low-confidence assertions that need validation
 */
async function getLowConfidenceAssertions(projectId, threshold = 0.5) {
    const where = {
        OR: [
            { confidence: { lt: threshold } },
            { confidence: null },
        ],
        status: 'CLAIM', // Only unvalidated assertions
    };
    if (projectId) {
        where.entity = { projectId };
    }
    return client_1.default.assertion.findMany({
        where,
        include: {
            entity: { select: { id: true, name: true, projectId: true } },
            reasoning: true,
            sources: { include: { source: true } },
        },
        orderBy: [
            { criticality: 'asc' }, // CRITICAL first
            { confidence: 'asc' }, // Lowest confidence first
            { createdAt: 'desc' },
        ],
    });
}
/**
 * Batch update confidence scores for all assertions in a project
 */
async function recalculateProjectConfidence(projectId) {
    const assertions = await client_1.default.assertion.findMany({
        where: {
            entity: { projectId },
            status: 'CLAIM',
        },
        select: { id: true },
    });
    const results = {
        total: assertions.length,
        updated: 0,
        failed: 0,
        errors: [],
    };
    for (const assertion of assertions) {
        try {
            await updateConfidence(assertion.id);
            results.updated++;
        }
        catch (error) {
            results.failed++;
            results.errors.push(`${assertion.id}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    return results;
}
//# sourceMappingURL=assertions.js.map