"use strict";
/**
 * Assertion Evolution Tracking
 *
 * Tracks how assertions evolve through human feedback, challenges, and refinements.
 * Uses validationNotes JSON field to store evolution history.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertionEvolution = exports.AssertionEvolution = void 0;
const client_1 = __importDefault(require("../../db/client"));
/**
 * Tracks how assertions evolve over time
 */
class AssertionEvolution {
    db;
    constructor(database) {
        this.db = database || client_1.default;
    }
    /**
     * Record a revision to an assertion's claim
     */
    async recordRevision(assertionId, revision) {
        const assertion = await this.db.assertion.findUnique({
            where: { id: assertionId },
        });
        if (!assertion) {
            throw new Error(`Assertion ${assertionId} not found`);
        }
        // Get existing notes
        const existingNotes = assertion.validationNotes || [];
        // Count existing revisions
        const revisionCount = existingNotes.filter((n) => n.type === 'revision').length;
        // Create revision note
        const revisionNote = {
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
                validationNotes: [...existingNotes, revisionNote],
            },
        });
    }
    /**
     * Revise an assertion's claim text
     */
    async reviseAssertion(assertionId, newClaim, reason, triggeredBy, confidenceChange) {
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
    async getEvolutionHistory(assertionId) {
        const assertion = await this.db.assertion.findUnique({
            where: { id: assertionId },
        });
        if (!assertion) {
            throw new Error(`Assertion ${assertionId} not found`);
        }
        const notes = assertion.validationNotes || [];
        return notes
            .filter((n) => n.type === 'revision')
            .map((n) => ({
            revisionNumber: n.metadata?.revisionNumber || 0,
            previousClaim: n.metadata?.previousClaim || '',
            newClaim: n.metadata?.newClaim || '',
            changeReason: n.metadata?.changeReason || 'correction',
            triggeredBy: n.role === 'agent' ? 'agent' : 'human',
            timestamp: n.timestamp,
            confidenceChange: n.metadata?.confidenceChange,
        }));
    }
    /**
     * Create a derived assertion (child of existing assertion)
     */
    async createDerivedAssertion(parentId, newClaim, category, reason) {
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
                ],
            },
        });
        // Update parent to note the derivation
        const parentNotes = parent.validationNotes || [];
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
                ],
            },
        });
        return child.id;
    }
    /**
     * Split an assertion into multiple more specific assertions
     */
    async splitAssertion(assertionId, newClaims, reason) {
        const assertion = await this.db.assertion.findUnique({
            where: { id: assertionId },
        });
        if (!assertion) {
            throw new Error(`Assertion ${assertionId} not found`);
        }
        // Create new assertions
        const newIds = [];
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
                    ],
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
    async mergeAssertions(assertionIds, mergedClaim, category, reason) {
        const assertions = await this.db.assertion.findMany({
            where: { id: { in: assertionIds } },
        });
        if (assertions.length !== assertionIds.length) {
            throw new Error('One or more assertions not found');
        }
        // Verify all belong to same entity
        const entityId = assertions[0].entityId;
        const allSameEntity = assertions.every((a) => a.entityId === entityId);
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
                            originalClaims: assertions.map((a) => ({
                                id: a.id,
                                claim: a.claim,
                            })),
                        },
                    },
                ],
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
    async getAssertionLineage(assertionId) {
        const assertion = await this.db.assertion.findUnique({
            where: { id: assertionId },
        });
        if (!assertion) {
            throw new Error(`Assertion ${assertionId} not found`);
        }
        const notes = assertion.validationNotes || [];
        // Find parent from notes
        const parentNote = notes.find((n) => n.metadata?.splitFromId || n.metadata?.parentId);
        const parentId = (parentNote?.metadata?.splitFromId || parentNote?.metadata?.parentId);
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
        const childAssertions = children.filter((c) => {
            const cNotes = c.validationNotes || [];
            return cNotes.some((n) => n.metadata?.splitFromId === assertionId || n.metadata?.parentId === assertionId);
        });
        return {
            assertion: {
                id: assertion.id,
                claim: assertion.claim,
                category: assertion.category,
                status: assertion.status,
            },
            parent,
            children: childAssertions.map((c) => ({
                id: c.id,
                claim: c.claim,
                category: c.category,
                status: c.status,
            })),
            supersededBy: assertion.supersededBy,
            revisionCount: notes.filter((n) => n.type === 'revision').length,
        };
    }
}
exports.AssertionEvolution = AssertionEvolution;
// Export singleton instance
exports.assertionEvolution = new AssertionEvolution();
//# sourceMappingURL=assertion-evolution.js.map