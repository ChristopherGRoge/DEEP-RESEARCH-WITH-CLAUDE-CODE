/**
 * Assertion Feedback System Types
 *
 * Defines types and interfaces for human-in-the-loop feedback on AI-generated
 * assertions in the Deep Research system.
 */

/**
 * Types of feedback humans can provide on assertions
 */
export enum FeedbackType {
  /** Human confirms the assertion is correct and well-sourced */
  VALIDATE = 'VALIDATE',

  /** Human challenges the assertion, wants AI to reconsider */
  CHALLENGE = 'CHALLENGE',

  /** Human provides correction or refinement to the assertion */
  REFINE = 'REFINE',

  /** Human wants more evidence or additional sources */
  REQUEST_EVIDENCE = 'REQUEST_EVIDENCE',

  /** Human rejects the assertion as false or misleading */
  REJECT = 'REJECT'
}

/**
 * Feedback provided by a human researcher on an assertion
 */
export interface AssertionFeedback {
  /** ID of the assertion being reviewed */
  assertionId: string;

  /** Type of feedback being provided */
  feedbackType: FeedbackType;

  /** Name/identifier of the human researcher */
  validatedBy: string;

  /** Optional comment explaining the feedback or providing corrections */
  comment?: string;

  /** Human's confidence level in their feedback (1=low, 5=high) */
  confidence?: number;

  /** URLs the human suggests as better/additional sources */
  suggestedSources?: string[];

  /** When the feedback was provided */
  timestamp: Date;
}

/**
 * Result of processing human feedback on an assertion
 */
export interface FeedbackResult {
  /** Whether the feedback was processed successfully */
  success: boolean;

  /** ID of the assertion that was reviewed */
  assertionId: string;

  /** Action taken based on the feedback */
  action: 'validated' | 'rejected' | 'queued_for_refinement' | 'evidence_requested';

  /** Updated assertion data if it was modified */
  updatedAssertion?: {
    id: string;
    claim: string;
    status: string;
    category?: string;
    [key: string]: any;
  };

  /** AI's response to a challenge (explains reasoning or acknowledges error) */
  agentResponse?: string;

  /** IDs of any new assertions created during refinement process */
  newAssertions?: string[];
}

/**
 * Request for AI to refine or reconsider an assertion
 */
export interface RefinementRequest {
  /** ID of the assertion needing refinement */
  assertionId: string;

  /** The original claim text */
  originalClaim: string;

  /** Human's feedback/correction text */
  humanFeedback: string;

  /** Type of feedback that triggered this refinement */
  feedbackType: FeedbackType;

  /** ID of the entity this assertion belongs to */
  entityId: string;

  /** Category of the assertion (e.g., 'pricing', 'feature') */
  category: string;

  /** Entity name for context */
  entityName?: string;

  /** Entity URL for context */
  entityUrl?: string;
}

/**
 * Request for AI to find additional evidence for an assertion
 */
export interface EvidenceRequest {
  /** ID of the assertion needing more evidence */
  assertionId: string;

  /** The claim that needs supporting evidence */
  claim: string;

  /** ID of the entity this assertion belongs to */
  entityId: string;

  /** Entity's URL to search for evidence */
  entityUrl: string;

  /** URLs the human suggests checking for evidence */
  suggestedSources?: string[];

  /** Name of the researcher requesting evidence */
  requestedBy: string;

  /** Entity name for context */
  entityName?: string;

  /** Category of the assertion */
  category?: string;
}

/**
 * Configuration for feedback processing behavior
 */
export interface FeedbackConfig {
  /** Whether to automatically trigger AI refinement on challenges */
  autoRefine?: boolean;

  /** Whether to automatically fetch evidence on requests */
  autoFetchEvidence?: boolean;

  /** Minimum confidence threshold for validation (1-5) */
  minValidationConfidence?: number;

  /** Model to use for refinement (haiku, sonnet, opus) */
  refinementModel?: 'haiku' | 'sonnet' | 'opus';
}

/**
 * Feedback statistics for an entity or project
 */
export interface FeedbackStats {
  /** Total assertions reviewed */
  totalReviewed: number;

  /** Number validated */
  validated: number;

  /** Number rejected */
  rejected: number;

  /** Number challenged/refined */
  refined: number;

  /** Number with evidence requests */
  evidenceRequested: number;

  /** Percentage validated (0-100) */
  validationRate: number;

  /** Average confidence of validations (1-5) */
  avgConfidence?: number;
}
