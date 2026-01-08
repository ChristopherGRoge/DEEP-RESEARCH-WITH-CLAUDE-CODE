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
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
/**
 * Create a new assertion about an entity
 * Optionally includes reasoning and source in one operation
 *
 * Evidence-First Research: New assertions SHOULD include evidenceDescription
 * and evidenceScreenshotPath to provide direct screenshot evidence rather
 * than relying solely on source URLs.
 */
async function createAssertion(input) {
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
        where.claim = { contains: input.query, mode: 'insensitive' };
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
                mode: 'insensitive',
            },
        },
        include: {
            reasoning: true,
            sources: { include: { source: true } },
        },
    });
}
//# sourceMappingURL=assertions.js.map