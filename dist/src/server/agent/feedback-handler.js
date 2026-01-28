"use strict";
/**
 * Feedback Handler Service
 *
 * Processes human feedback on AI-generated assertions in the Deep Research system.
 * Handles validation, rejection, refinement requests, and evidence requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackHandler = void 0;
const client_1 = require("../../../generated/prisma/client");
const feedback_types_1 = require("./feedback-types");
/**
 * FeedbackHandler processes human feedback on assertions
 */
class FeedbackHandler {
    prisma;
    broadcast;
    refinementQueue = [];
    evidenceQueue = [];
    /**
     * Create a new FeedbackHandler
     * @param prisma - PrismaClient instance for database operations
     * @param broadcast - Optional WebSocket broadcast function
     */
    constructor(prisma, broadcast) {
        this.prisma = prisma;
        this.broadcast = broadcast;
    }
    /**
     * Process feedback from a human researcher
     * @param feedback - The feedback provided by the human
     * @returns Result of processing the feedback
     */
    async processFeedback(feedback) {
        const { assertionId, feedbackType, validatedBy, comment, confidence, suggestedSources } = feedback;
        // First, verify the assertion exists
        const assertion = await this.prisma.assertion.findUnique({
            where: { id: assertionId },
            include: {
                entity: true,
            },
        });
        if (!assertion) {
            return {
                success: false,
                assertionId,
                action: 'queued_for_refinement',
            };
        }
        // Process based on feedback type
        switch (feedbackType) {
            case feedback_types_1.FeedbackType.VALIDATE:
                return await this.validateAssertion(assertionId, validatedBy, confidence);
            case feedback_types_1.FeedbackType.REJECT:
                return await this.rejectAssertion(assertionId, validatedBy, comment || 'Rejected by human reviewer');
            case feedback_types_1.FeedbackType.CHALLENGE:
            case feedback_types_1.FeedbackType.REFINE:
                return await this.queueRefinement({
                    assertionId,
                    originalClaim: assertion.claim,
                    humanFeedback: comment || 'Human challenged this assertion',
                    feedbackType,
                    entityId: assertion.entityId,
                    category: assertion.category || 'uncategorized',
                    entityName: assertion.entity.name,
                    entityUrl: assertion.entity.url || undefined,
                });
            case feedback_types_1.FeedbackType.REQUEST_EVIDENCE:
                return await this.queueEvidenceRequest({
                    assertionId,
                    claim: assertion.claim,
                    entityId: assertion.entityId,
                    entityUrl: assertion.entity.url || '',
                    suggestedSources,
                    requestedBy: validatedBy,
                    entityName: assertion.entity.name,
                    category: assertion.category || undefined,
                });
            default:
                return {
                    success: false,
                    assertionId,
                    action: 'queued_for_refinement',
                };
        }
    }
    /**
     * Validate an assertion (mark as EVIDENCE)
     * @param assertionId - ID of the assertion to validate
     * @param validatedBy - Name/identifier of the validator
     * @param confidence - Optional confidence level (1-5)
     * @returns Result of the validation
     */
    async validateAssertion(assertionId, validatedBy, confidence) {
        try {
            const updatedAssertion = await this.prisma.assertion.update({
                where: { id: assertionId },
                data: {
                    status: client_1.AssertionStatus.EVIDENCE,
                    validatedBy,
                    validatedAt: new Date(),
                    confidence: confidence ? confidence / 5 : undefined, // Convert 1-5 to 0-1
                },
            });
            // Broadcast update if WebSocket available
            if (this.broadcast) {
                this.broadcast('assertion:validated', {
                    assertionId,
                    validatedBy,
                    timestamp: new Date(),
                });
            }
            return {
                success: true,
                assertionId,
                action: 'validated',
                updatedAssertion: {
                    id: updatedAssertion.id,
                    claim: updatedAssertion.claim,
                    status: updatedAssertion.status,
                    category: updatedAssertion.category || undefined,
                    validatedBy: updatedAssertion.validatedBy || undefined,
                    validatedAt: updatedAssertion.validatedAt || undefined,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                assertionId,
                action: 'validated',
            };
        }
    }
    /**
     * Reject an assertion
     * @param assertionId - ID of the assertion to reject
     * @param validatedBy - Name/identifier of the reviewer
     * @param reason - Reason for rejection
     * @returns Result of the rejection
     */
    async rejectAssertion(assertionId, validatedBy, reason) {
        try {
            const updatedAssertion = await this.prisma.assertion.update({
                where: { id: assertionId },
                data: {
                    status: client_1.AssertionStatus.REJECTED,
                    validatedBy,
                    validatedAt: new Date(),
                    rejectionReason: reason,
                },
            });
            // Broadcast update if WebSocket available
            if (this.broadcast) {
                this.broadcast('assertion:rejected', {
                    assertionId,
                    validatedBy,
                    reason,
                    timestamp: new Date(),
                });
            }
            return {
                success: true,
                assertionId,
                action: 'rejected',
                updatedAssertion: {
                    id: updatedAssertion.id,
                    claim: updatedAssertion.claim,
                    status: updatedAssertion.status,
                    category: updatedAssertion.category || undefined,
                    rejectionReason: updatedAssertion.rejectionReason || undefined,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                assertionId,
                action: 'rejected',
            };
        }
    }
    /**
     * Queue an assertion for AI refinement
     * @param request - Refinement request details
     * @returns Result acknowledging the queued request
     */
    async queueRefinement(request) {
        try {
            // Add to refinement queue
            this.refinementQueue.push(request);
            // Update assertion to indicate it's being refined
            const updatedAssertion = await this.prisma.assertion.update({
                where: { id: request.assertionId },
                data: {
                    validationNotes: {
                        push: {
                            role: 'human',
                            content: request.humanFeedback,
                            timestamp: new Date(),
                        },
                    },
                },
            });
            // Broadcast update if WebSocket available
            if (this.broadcast) {
                this.broadcast('assertion:queued_for_refinement', {
                    assertionId: request.assertionId,
                    feedbackType: request.feedbackType,
                    timestamp: new Date(),
                });
            }
            return {
                success: true,
                assertionId: request.assertionId,
                action: 'queued_for_refinement',
                updatedAssertion: {
                    id: updatedAssertion.id,
                    claim: updatedAssertion.claim,
                    status: updatedAssertion.status,
                    category: updatedAssertion.category || undefined,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                assertionId: request.assertionId,
                action: 'queued_for_refinement',
            };
        }
    }
    /**
     * Queue a request for additional evidence
     * @param request - Evidence request details
     * @returns Result acknowledging the queued request
     */
    async queueEvidenceRequest(request) {
        try {
            // Add to evidence queue
            this.evidenceQueue.push(request);
            // Update assertion to indicate evidence is being collected
            const updatedAssertion = await this.prisma.assertion.update({
                where: { id: request.assertionId },
                data: {
                    validationNotes: {
                        push: {
                            role: 'human',
                            content: `Evidence requested by ${request.requestedBy}`,
                            timestamp: new Date(),
                        },
                    },
                },
            });
            // Broadcast update if WebSocket available
            if (this.broadcast) {
                this.broadcast('assertion:evidence_requested', {
                    assertionId: request.assertionId,
                    requestedBy: request.requestedBy,
                    timestamp: new Date(),
                });
            }
            return {
                success: true,
                assertionId: request.assertionId,
                action: 'evidence_requested',
                updatedAssertion: {
                    id: updatedAssertion.id,
                    claim: updatedAssertion.claim,
                    status: updatedAssertion.status,
                    category: updatedAssertion.category || undefined,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                assertionId: request.assertionId,
                action: 'evidence_requested',
            };
        }
    }
    /**
     * Get all pending refinement requests
     * @returns Array of refinement requests waiting to be processed
     */
    getPendingRefinements() {
        return [...this.refinementQueue];
    }
    /**
     * Get all pending evidence requests
     * @returns Array of evidence requests waiting to be processed
     */
    getPendingEvidenceRequests() {
        return [...this.evidenceQueue];
    }
    /**
     * Mark a refinement as complete and remove from queue
     * @param assertionId - ID of the assertion that was refined
     * @param result - Result of the refinement (updated assertion data, new assertions, etc.)
     */
    completeRefinement(assertionId, result) {
        // Remove from refinement queue
        this.refinementQueue = this.refinementQueue.filter((req) => req.assertionId !== assertionId);
        // Broadcast completion if WebSocket available
        if (this.broadcast) {
            this.broadcast('assertion:refinement_complete', {
                assertionId,
                result,
                timestamp: new Date(),
            });
        }
    }
    /**
     * Mark an evidence request as complete and remove from queue
     * @param assertionId - ID of the assertion that received evidence
     * @param result - Result of the evidence collection
     */
    completeEvidenceRequest(assertionId, result) {
        // Remove from evidence queue
        this.evidenceQueue = this.evidenceQueue.filter((req) => req.assertionId !== assertionId);
        // Broadcast completion if WebSocket available
        if (this.broadcast) {
            this.broadcast('assertion:evidence_complete', {
                assertionId,
                result,
                timestamp: new Date(),
            });
        }
    }
    /**
     * Clear a specific refinement request from the queue
     * @param assertionId - ID of the assertion to remove from queue
     */
    clearRefinement(assertionId) {
        this.refinementQueue = this.refinementQueue.filter((req) => req.assertionId !== assertionId);
    }
    /**
     * Clear a specific evidence request from the queue
     * @param assertionId - ID of the assertion to remove from queue
     */
    clearEvidenceRequest(assertionId) {
        this.evidenceQueue = this.evidenceQueue.filter((req) => req.assertionId !== assertionId);
    }
    /**
     * Get the count of pending requests
     * @returns Object with counts of pending refinements and evidence requests
     */
    getPendingCounts() {
        return {
            refinements: this.refinementQueue.length,
            evidenceRequests: this.evidenceQueue.length,
        };
    }
}
exports.FeedbackHandler = FeedbackHandler;
//# sourceMappingURL=feedback-handler.js.map