/**
 * Feedback Handler Service
 *
 * Processes human feedback on AI-generated assertions in the Deep Research system.
 * Handles validation, rejection, refinement requests, and evidence requests.
 */
import { PrismaClient } from '../../../generated/prisma/client';
import { AssertionFeedback, FeedbackResult, RefinementRequest, EvidenceRequest } from './feedback-types';
/**
 * WebSocket broadcast function type
 */
type BroadcastFunction = (event: string, data: any) => void;
/**
 * FeedbackHandler processes human feedback on assertions
 */
export declare class FeedbackHandler {
    private prisma;
    private broadcast?;
    private refinementQueue;
    private evidenceQueue;
    /**
     * Create a new FeedbackHandler
     * @param prisma - PrismaClient instance for database operations
     * @param broadcast - Optional WebSocket broadcast function
     */
    constructor(prisma: PrismaClient, broadcast?: BroadcastFunction);
    /**
     * Process feedback from a human researcher
     * @param feedback - The feedback provided by the human
     * @returns Result of processing the feedback
     */
    processFeedback(feedback: AssertionFeedback): Promise<FeedbackResult>;
    /**
     * Validate an assertion (mark as EVIDENCE)
     * @param assertionId - ID of the assertion to validate
     * @param validatedBy - Name/identifier of the validator
     * @param confidence - Optional confidence level (1-5)
     * @returns Result of the validation
     */
    validateAssertion(assertionId: string, validatedBy: string, confidence?: number): Promise<FeedbackResult>;
    /**
     * Reject an assertion
     * @param assertionId - ID of the assertion to reject
     * @param validatedBy - Name/identifier of the reviewer
     * @param reason - Reason for rejection
     * @returns Result of the rejection
     */
    rejectAssertion(assertionId: string, validatedBy: string, reason: string): Promise<FeedbackResult>;
    /**
     * Queue an assertion for AI refinement
     * @param request - Refinement request details
     * @returns Result acknowledging the queued request
     */
    queueRefinement(request: RefinementRequest): Promise<FeedbackResult>;
    /**
     * Queue a request for additional evidence
     * @param request - Evidence request details
     * @returns Result acknowledging the queued request
     */
    queueEvidenceRequest(request: EvidenceRequest): Promise<FeedbackResult>;
    /**
     * Get all pending refinement requests
     * @returns Array of refinement requests waiting to be processed
     */
    getPendingRefinements(): RefinementRequest[];
    /**
     * Get all pending evidence requests
     * @returns Array of evidence requests waiting to be processed
     */
    getPendingEvidenceRequests(): EvidenceRequest[];
    /**
     * Mark a refinement as complete and remove from queue
     * @param assertionId - ID of the assertion that was refined
     * @param result - Result of the refinement (updated assertion data, new assertions, etc.)
     */
    completeRefinement(assertionId: string, result: object): void;
    /**
     * Mark an evidence request as complete and remove from queue
     * @param assertionId - ID of the assertion that received evidence
     * @param result - Result of the evidence collection
     */
    completeEvidenceRequest(assertionId: string, result: object): void;
    /**
     * Clear a specific refinement request from the queue
     * @param assertionId - ID of the assertion to remove from queue
     */
    clearRefinement(assertionId: string): void;
    /**
     * Clear a specific evidence request from the queue
     * @param assertionId - ID of the assertion to remove from queue
     */
    clearEvidenceRequest(assertionId: string): void;
    /**
     * Get the count of pending requests
     * @returns Object with counts of pending refinements and evidence requests
     */
    getPendingCounts(): {
        refinements: number;
        evidenceRequests: number;
    };
}
export {};
//# sourceMappingURL=feedback-handler.d.ts.map