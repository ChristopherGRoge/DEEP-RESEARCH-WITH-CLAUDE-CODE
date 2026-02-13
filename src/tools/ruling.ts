/**
 * Ruling Tools - Close the validation loop with AFFIRM/REVISE/OVERTURN verdicts
 *
 * Rulings bridge the gap between adversarial validation and action.
 * Each ruling evaluates the tension between an assertion and its validation,
 * then takes appropriate action (update claim, reject assertion, or affirm).
 */

import { prisma } from '../db/client';
import { RulingVerdict } from '../../generated/prisma/client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface RulingCreateInput {
  assertionId: string;
  validationId: string;
  verdict: 'AFFIRM' | 'REVISE' | 'OVERTURN';
  tensionAnalysis: string;
  reasoning: string;
  actionTaken?: string;
  ruledBy: string;
}

export interface RulingGetInput {
  rulingId: string;
}

export interface RulingListInput {
  assertionId?: string;
  entityId?: string;
  verdict?: 'AFFIRM' | 'REVISE' | 'OVERTURN';
  limit?: number;
}

// ============================================
// RULING CRUD OPERATIONS
// ============================================

/**
 * Create a ruling for an assertion-validation pair.
 * Side effects:
 * - REVISE: updates assertion.claim to validation.refinedClaim
 * - OVERTURN: sets assertion.status to REJECTED
 */
export async function createRuling(input: RulingCreateInput) {
  const {
    assertionId,
    validationId,
    verdict,
    tensionAnalysis,
    reasoning,
    actionTaken,
    ruledBy,
  } = input;

  // Verify assertion exists
  const assertion = await prisma.assertion.findUnique({
    where: { id: assertionId },
    include: { entity: true },
  });

  if (!assertion) {
    return { success: false, error: `Assertion not found: ${assertionId}` };
  }

  // Verify validation exists and belongs to the assertion
  const validation = await prisma.validationResult.findUnique({
    where: { id: validationId },
  });

  if (!validation) {
    return { success: false, error: `Validation not found: ${validationId}` };
  }

  if (validation.assertionId !== assertionId) {
    return {
      success: false,
      error: `Validation ${validationId} does not belong to assertion ${assertionId}`,
    };
  }

  // Create ruling
  const ruling = await prisma.ruling.create({
    data: {
      assertionId,
      validationId,
      verdict: verdict as RulingVerdict,
      tensionAnalysis,
      reasoning,
      actionTaken,
      ruledBy,
    },
    include: {
      assertion: {
        include: { entity: true },
      },
      validation: true,
    },
  });

  // Apply side effects based on verdict
  let sideEffect: string | null = null;

  if (verdict === 'REVISE') {
    // Update assertion claim to the validation's refined claim
    if (validation.refinedClaim) {
      await prisma.assertion.update({
        where: { id: assertionId },
        data: {
          claim: validation.refinedClaim,
          updatedAt: new Date(),
        },
      });
      sideEffect = `Updated assertion claim to refined claim: "${validation.refinedClaim.substring(0, 80)}..."`;
    } else {
      sideEffect = 'REVISE verdict but no refinedClaim on validation — assertion unchanged';
    }
  } else if (verdict === 'OVERTURN') {
    // Set assertion status to REJECTED
    await prisma.assertion.update({
      where: { id: assertionId },
      data: {
        status: 'REJECTED',
        updatedAt: new Date(),
      },
    });
    sideEffect = 'Assertion status set to REJECTED';
  }

  // Update ruling with action taken
  if (sideEffect && !actionTaken) {
    await prisma.ruling.update({
      where: { id: ruling.id },
      data: { actionTaken: sideEffect },
    });
  }

  // Log the ruling
  await prisma.researchLog.create({
    data: {
      action: 'ruling_created',
      agentId: ruledBy,
      details: {
        rulingId: ruling.id,
        assertionId,
        validationId,
        entityName: assertion.entity.name,
        verdict,
        sideEffect,
      },
    },
  });

  return {
    success: true,
    data: {
      rulingId: ruling.id,
      assertionId,
      validationId,
      entityName: assertion.entity.name,
      verdict,
      sideEffect,
    },
  };
}

/**
 * Get a ruling by ID with related assertion and validation
 */
export async function getRuling(input: RulingGetInput) {
  const { rulingId } = input;

  const ruling = await prisma.ruling.findUnique({
    where: { id: rulingId },
    include: {
      assertion: {
        include: {
          entity: { select: { id: true, name: true } },
        },
      },
      validation: {
        include: { citations: true },
      },
    },
  });

  if (!ruling) {
    return { success: false, error: `Ruling not found: ${rulingId}` };
  }

  return { success: true, data: ruling };
}

/**
 * List rulings with optional filters
 */
export async function listRulings(input: RulingListInput) {
  const { assertionId, entityId, verdict, limit = 50 } = input;

  const where: Record<string, unknown> = {};

  if (assertionId) {
    where.assertionId = assertionId;
  }

  if (entityId) {
    where.assertion = { entityId };
  }

  if (verdict) {
    where.verdict = verdict as RulingVerdict;
  }

  const rulings = await prisma.ruling.findMany({
    where,
    include: {
      assertion: {
        include: {
          entity: { select: { id: true, name: true } },
        },
      },
      validation: {
        select: {
          id: true,
          verdict: true,
          confidence: true,
          refinedClaim: true,
          validatedAt: true,
        },
      },
    },
    orderBy: { ruledAt: 'desc' },
    take: limit,
  });

  return {
    success: true,
    data: {
      count: rulings.length,
      rulings: rulings.map((r) => ({
        id: r.id,
        assertionId: r.assertionId,
        entityName: r.assertion.entity.name,
        claim: r.assertion.claim.substring(0, 100) + (r.assertion.claim.length > 100 ? '...' : ''),
        verdict: r.verdict,
        validationVerdict: r.validation.verdict,
        tensionAnalysis: r.tensionAnalysis.substring(0, 120) + (r.tensionAnalysis.length > 120 ? '...' : ''),
        actionTaken: r.actionTaken,
        ruledBy: r.ruledBy,
        ruledAt: r.ruledAt,
      })),
    },
  };
}

// Export types for the enum (for CLI)
export { RulingVerdict };
