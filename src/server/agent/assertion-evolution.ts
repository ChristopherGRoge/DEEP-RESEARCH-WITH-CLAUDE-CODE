/**
 * Assertion Evolution Tracking
 *
 * Tracks how assertions evolve through human feedback, challenges, and refinements.
 * Uses validationNotes JSON field to store evolution history.
 */

import { PrismaClient, AssertionStatus, Prisma } from '../../../generated/prisma/client';
import prisma from '../../db/client';

/**
 * Represents a single revision in an assertion's history
 */
export interface AssertionRevision {
  revisionNumber: number;
  previousClaim: string;
  newClaim: string;
  changeReason: 'challenge' | 'refinement' | 'new_evidence' | 'correction';
  triggeredBy: string; // human name or 'agent'
  timestamp: string;
  confidenceChange?: number; // e.g., -0.2 if confidence dropped
}

/**
 * Validation note entry stored in JSON
 */
interface ValidationNote {
  role: 'human' | 'agent';
  content: string;
  timestamp: string;
  type?: 'revision' | 'feedback' | 'evidence' | 'general';
  metadata?: Record<string, unknown>;
}

/**
 * Tracks how assertions evolve over time
 */
export class AssertionEvolution {
  private db: typeof prisma;

  constructor(database?: typeof prisma) {
    this.db = database || prisma;
  }

  /**
   * Record a revision to an assertion's claim
   */
  async recordRevision(
    assertionId: string,
    revision: Omit<AssertionRevision, 'revisionNumber'>
  ): Promise<void> {
    const assertion = await this.db.assertion.findUnique({
      where: { id: assertionId },
    });

    if (!assertion) {
      throw new Error(`Assertion ${assertionId} not found`);
    }

    // Get existing notes
    const existingNotes = (assertion.validationNotes as ValidationNote[] | null) || [];

    // Count existing revisions
    const revisionCount = existingNotes.filter(
      (n: ValidationNote) => n.type === 'revision'
    ).length;

    // Create revision note
    const revisionNote: ValidationNote = {
      role: revision.triggeredBy === 'agent' ? 'agent' : 'human',
      content: `Revised claim: "${revision.previousClaim}" → "${revision.newClaim}"`,
      timestamp: revision.timestamp,
      type: 'revision',
      metadata: {
        revisionNumber: revisionCount + 1,
        changeReason: revision.changeReason,
        confidenceChange: revision.confidenceChange,
        previousClaim: revision.previousClaim,
        newClaim: revision.newClaim,
      },
    };

    // Update assertion
    await this.db.assertion.update({
      where: { id: assertionId },
      data: {
        validationNotes: [...existingNotes, revisionNote] as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Revise an assertion's claim text
   */
  async reviseAssertion(
    assertionId: string,
    newClaim: string,
    reason: AssertionRevision['changeReason'],
    triggeredBy: string,
    confidenceChange?: number
  ): Promise<object> {
    const assertion = await this.db.assertion.findUnique({
      where: { id: assertionId },
    });

    if (!assertion) {
      throw new Error(`Assertion ${assertionId} not found`);
    }

    // Record the revision
    await this.recordRevision(assertionId, {
      previousClaim: assertion.claim,
      newClaim,
      changeReason: reason,
      triggeredBy,
      timestamp: new Date().toISOString(),
      confidenceChange,
    });

    // Calculate new confidence
    let newConfidence = assertion.confidence;
    if (confidenceChange && newConfidence !== null) {
      newConfidence = Math.max(0, Math.min(1, newConfidence + confidenceChange));
    }

    // Update the claim
    const updated = await this.db.assertion.update({
      where: { id: assertionId },
      data: {
        claim: newClaim,
        confidence: newConfidence,
        partiallyValidated: true, // Mark as needing review
      },
    });

    return updated;
  }

  /**
   * Get evolution history for an assertion
   */
  async getEvolutionHistory(assertionId: string): Promise<AssertionRevision[]> {
    const assertion = await this.db.assertion.findUnique({
      where: { id: assertionId },
    });

    if (!assertion) {
      throw new Error(`Assertion ${assertionId} not found`);
    }

    const notes = (assertion.validationNotes as ValidationNote[] | null) || [];

    return notes
      .filter((n: ValidationNote) => n.type === 'revision')
      .map((n: ValidationNote) => ({
        revisionNumber: (n.metadata?.revisionNumber as number) || 0,
        previousClaim: (n.metadata?.previousClaim as string) || '',
        newClaim: (n.metadata?.newClaim as string) || '',
        changeReason: (n.metadata?.changeReason as AssertionRevision['changeReason']) || 'correction',
        triggeredBy: n.role === 'agent' ? 'agent' : 'human',
        timestamp: n.timestamp,
        confidenceChange: n.metadata?.confidenceChange as number | undefined,
      }));
  }

  /**
   * Create a derived assertion (child of existing assertion)
   */
  async createDerivedAssertion(
    parentId: string,
    newClaim: string,
    category: string,
    reason: string
  ): Promise<string> {
    const parent = await this.db.assertion.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new Error(`Parent assertion ${parentId} not found`);
    }

    // Create child assertion
    const child = await this.db.assertion.create({
      data: {
        entityId: parent.entityId,
        claim: newClaim,
        category,
        status: 'CLAIM',
        validationNotes: [
          {
            role: 'agent',
            content: `Derived from assertion ${parentId}: ${reason}`,
            timestamp: new Date().toISOString(),
            type: 'general',
            metadata: { parentId, derivationReason: reason },
          },
        ] as unknown as Prisma.InputJsonValue,
      },
    });

    // Update parent to note the derivation
    const parentNotes = (parent.validationNotes as ValidationNote[] | null) || [];
    await this.db.assertion.update({
      where: { id: parentId },
      data: {
        validationNotes: [
          ...parentNotes,
          {
            role: 'agent',
            content: `Created derived assertion ${child.id}: ${reason}`,
            timestamp: new Date().toISOString(),
            type: 'general',
            metadata: { childId: child.id },
          },
        ] as unknown as Prisma.InputJsonValue,
      },
    });

    return child.id;
  }

  /**
   * Split an assertion into multiple more specific assertions
   */
  async splitAssertion(
    assertionId: string,
    newClaims: string[],
    reason: string
  ): Promise<string[]> {
    const assertion = await this.db.assertion.findUnique({
      where: { id: assertionId },
    });

    if (!assertion) {
      throw new Error(`Assertion ${assertionId} not found`);
    }

    // Create new assertions
    const newIds: string[] = [];
    for (const claim of newClaims) {
      const newAssertion = await this.db.assertion.create({
        data: {
          entityId: assertion.entityId,
          claim,
          category: assertion.category,
          status: 'CLAIM',
          validationNotes: [
            {
              role: 'agent',
              content: `Split from assertion ${assertionId}: ${reason}`,
              timestamp: new Date().toISOString(),
              type: 'general',
              metadata: { splitFromId: assertionId, splitReason: reason },
            },
          ] as unknown as Prisma.InputJsonValue,
        },
      });
      newIds.push(newAssertion.id);
    }

    // Mark original as superseded
    await this.db.assertion.update({
      where: { id: assertionId },
      data: {
        status: 'REJECTED',
        supersededBy: newIds[0], // Reference first new assertion
        rejectionReason: `Split into ${newIds.length} assertions: ${reason}`,
      },
    });

    return newIds;
  }

  /**
   * Merge multiple assertions into one
   */
  async mergeAssertions(
    assertionIds: string[],
    mergedClaim: string,
    category: string,
    reason: string
  ): Promise<string> {
    const assertions = await this.db.assertion.findMany({
      where: { id: { in: assertionIds } },
    });

    if (assertions.length !== assertionIds.length) {
      throw new Error('One or more assertions not found');
    }

    // Verify all belong to same entity
    const entityId = assertions[0].entityId;
    const allSameEntity = assertions.every(
      (a: { entityId: string }) => a.entityId === entityId
    );
    if (!allSameEntity) {
      throw new Error('Cannot merge assertions from different entities');
    }

    // Create merged assertion
    const merged = await this.db.assertion.create({
      data: {
        entityId,
        claim: mergedClaim,
        category,
        status: 'CLAIM',
        validationNotes: [
          {
            role: 'agent',
            content: `Merged from assertions: ${assertionIds.join(', ')}. Reason: ${reason}`,
            timestamp: new Date().toISOString(),
            type: 'general',
            metadata: {
              mergedFrom: assertionIds,
              mergeReason: reason,
              originalClaims: assertions.map((a: { id: string; claim: string }) => ({
                id: a.id,
                claim: a.claim,
              })),
            },
          },
        ] as unknown as Prisma.InputJsonValue,
      },
    });

    // Mark originals as superseded
    for (const id of assertionIds) {
      await this.db.assertion.update({
        where: { id },
        data: {
          status: 'REJECTED',
          supersededBy: merged.id,
          rejectionReason: `Merged into ${merged.id}: ${reason}`,
        },
      });
    }

    return merged.id;
  }

  /**
   * Get the lineage of an assertion (parent/child relationships)
   */
  async getAssertionLineage(assertionId: string): Promise<object> {
    const assertion = await this.db.assertion.findUnique({
      where: { id: assertionId },
    });

    if (!assertion) {
      throw new Error(`Assertion ${assertionId} not found`);
    }

    const notes = (assertion.validationNotes as ValidationNote[] | null) || [];

    // Find parent from notes
    const parentNote = notes.find(
      (n: ValidationNote) => n.metadata?.splitFromId || n.metadata?.parentId
    );
    const parentId = (parentNote?.metadata?.splitFromId || parentNote?.metadata?.parentId) as string | undefined;

    let parent = null;
    if (parentId) {
      parent = await this.db.assertion.findUnique({
        where: { id: parentId },
        select: { id: true, claim: true, category: true, status: true },
      });
    }

    // Find children (assertions that reference this one as parent)
    const children = await this.db.assertion.findMany({
      where: {
        entityId: assertion.entityId,
        NOT: { id: assertionId },
      },
      select: { id: true, claim: true, category: true, status: true, validationNotes: true },
    });

    const childAssertions = children.filter((c: { validationNotes: unknown }) => {
      const cNotes = (c.validationNotes as ValidationNote[] | null) || [];
      return cNotes.some(
        (n: ValidationNote) =>
          n.metadata?.splitFromId === assertionId || n.metadata?.parentId === assertionId
      );
    });

    return {
      assertion: {
        id: assertion.id,
        claim: assertion.claim,
        category: assertion.category,
        status: assertion.status,
      },
      parent,
      children: childAssertions.map((c: { id: string; claim: string; category: string | null; status: AssertionStatus }) => ({
        id: c.id,
        claim: c.claim,
        category: c.category,
        status: c.status,
      })),
      supersededBy: assertion.supersededBy,
      revisionCount: notes.filter((n: ValidationNote) => n.type === 'revision').length,
    };
  }
}

// Export singleton instance
export const assertionEvolution = new AssertionEvolution();
