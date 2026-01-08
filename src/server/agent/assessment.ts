/**
 * AI Assessment for Assertion Pre-Validation
 *
 * Provides closed-loop validation of assertions based ONLY on collected evidence.
 * No web search or external knowledge - pure assessment of evidence artifacts.
 */

import Anthropic from '@anthropic-ai/sdk';

// ============================================
// Types
// ============================================

export type Verdict = 'LIKELY_VALID' | 'NEEDS_VERIFICATION' | 'LIKELY_INVALID' | 'INSUFFICIENT_EVIDENCE';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface AssessmentResult {
  verdict: Verdict;
  confidence: Confidence;
  reasoning: string;
  concerns: string | null;
  recommendation: string;
}

export interface AssertionForAssessment {
  id: string;
  claim: string;
  category: string | null;
  evidenceDescription: string | null;
  evidenceScreenshotPath: string | null;
  evidenceChain: any[] | null;
  entity: {
    name: string;
  };
  reasoning: Array<{
    content: string;
  }>;
  sources: Array<{
    quote: string | null;
    source: {
      url: string;
    };
  }>;
}

// ============================================
// System Prompt
// ============================================

const ASSESSMENT_SYSTEM_PROMPT = `You are a critical evidence assessor for research claims.

CRITICAL CONSTRAINT: You must evaluate ONLY using the evidence provided in this prompt.
- DO NOT use any external knowledge or web search
- DO NOT assume information beyond what is explicitly stated
- DO NOT reference information you "know" about the entity from training data
- ONLY assess based on the evidence artifacts presented to you

Your role is to evaluate whether the PROVIDED evidence actually supports the claimed assertion.

Be skeptical but fair:
- LIKELY_VALID: The provided evidence clearly and directly supports the claim
- NEEDS_VERIFICATION: Some support exists in the evidence but gaps remain
- LIKELY_INVALID: The provided evidence contradicts or doesn't match the claim
- INSUFFICIENT_EVIDENCE: The evidence provided is too vague or incomplete to assess

Common issues to flag:
- Evidence description is vague (e.g., "from the website" without specifics)
- Quoted text doesn't clearly support the claim made
- Claim extrapolates significantly beyond what the evidence shows
- Evidence may be from a different entity/product than claimed
- Mismatch between claim category and evidence type

Always provide actionable recommendations for what the human validator should verify.

Respond in EXACTLY this format with each field on its own line:
VERDICT: [exactly one of: LIKELY_VALID, NEEDS_VERIFICATION, LIKELY_INVALID, INSUFFICIENT_EVIDENCE]
CONFIDENCE: [exactly one of: HIGH, MEDIUM, LOW]
REASONING: [2-3 sentences explaining your assessment]
CONCERNS: [specific issues to check, or "None"]
RECOMMENDATION: [what the human validator should focus on]`;

// ============================================
// Prompt Builder
// ============================================

export function buildAssessmentPrompt(assertion: AssertionForAssessment): string {
  const parts: string[] = [];

  parts.push(`You are presented with a research assertion and its collected evidence.
Your task is to determine if the EVIDENCE BELOW supports the CLAIM.

══════════════════════════════════════════════════════════════════
ASSERTION TO EVALUATE
══════════════════════════════════════════════════════════════════

CLAIM: "${assertion.claim}"
CATEGORY: ${assertion.category || 'Uncategorized'}
ENTITY: ${assertion.entity.name}`);

  parts.push(`
══════════════════════════════════════════════════════════════════
COLLECTED EVIDENCE (This is ALL the evidence you may consider)
══════════════════════════════════════════════════════════════════`);

  // Screenshot evidence
  if (assertion.evidenceDescription || assertion.evidenceScreenshotPath) {
    parts.push(`
SCREENSHOT EVIDENCE:
- Path: ${assertion.evidenceScreenshotPath || 'Not provided'}
- Description: "${assertion.evidenceDescription || 'Not provided'}"`);
  } else {
    parts.push(`
SCREENSHOT EVIDENCE: None provided`);
  }

  // Evidence chain (additional screenshots)
  if (assertion.evidenceChain && assertion.evidenceChain.length > 0) {
    parts.push(`
ADDITIONAL EVIDENCE CHAIN:`);
    for (const item of assertion.evidenceChain) {
      parts.push(`- Path: ${item.screenshotPath}
  Description: "${item.description}"`);
    }
  }

  // Source citations
  if (assertion.sources && assertion.sources.length > 0) {
    parts.push(`
SOURCE CITATIONS:`);
    for (const s of assertion.sources) {
      parts.push(`- URL: ${s.source.url}
  Quote: "${s.quote || 'No quote provided'}"`);
    }
  } else {
    parts.push(`
SOURCE CITATIONS: None provided`);
  }

  // Agent reasoning
  if (assertion.reasoning && assertion.reasoning.length > 0) {
    const reasoningText = assertion.reasoning.map(r => r.content).join('\n');
    parts.push(`
AGENT REASONING: "${reasoningText}"`);
  } else {
    parts.push(`
AGENT REASONING: None provided`);
  }

  parts.push(`
══════════════════════════════════════════════════════════════════
YOUR TASK
══════════════════════════════════════════════════════════════════

Based ONLY on the evidence above (not external knowledge), determine:
1. Does the evidence description contain specific text supporting the claim?
2. Do the quoted sources directly support the claim?
3. Are there logical gaps between evidence and claim?
4. Is the evidence specific enough, or too vague?

Respond in this exact format:
VERDICT: [LIKELY_VALID | NEEDS_VERIFICATION | LIKELY_INVALID | INSUFFICIENT_EVIDENCE]
CONFIDENCE: [HIGH | MEDIUM | LOW]
REASONING: [2-3 sentences explaining your assessment]
CONCERNS: [Specific issues the human should check, or "None"]
RECOMMENDATION: [What the human validator should focus on]`);

  return parts.join('\n');
}

// ============================================
// Response Parser
// ============================================

export function parseAssessmentResponse(text: string): AssessmentResult {
  const lines = text.split('\n');

  let verdict: Verdict = 'NEEDS_VERIFICATION';
  let confidence: Confidence = 'MEDIUM';
  let reasoning = '';
  let concerns: string | null = null;
  let recommendation = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('VERDICT:')) {
      const value = trimmed.replace('VERDICT:', '').trim();
      if (['LIKELY_VALID', 'NEEDS_VERIFICATION', 'LIKELY_INVALID', 'INSUFFICIENT_EVIDENCE'].includes(value)) {
        verdict = value as Verdict;
      }
    } else if (trimmed.startsWith('CONFIDENCE:')) {
      const value = trimmed.replace('CONFIDENCE:', '').trim();
      if (['HIGH', 'MEDIUM', 'LOW'].includes(value)) {
        confidence = value as Confidence;
      }
    } else if (trimmed.startsWith('REASONING:')) {
      reasoning = trimmed.replace('REASONING:', '').trim();
    } else if (trimmed.startsWith('CONCERNS:')) {
      const value = trimmed.replace('CONCERNS:', '').trim();
      concerns = value.toLowerCase() === 'none' ? null : value;
    } else if (trimmed.startsWith('RECOMMENDATION:')) {
      recommendation = trimmed.replace('RECOMMENDATION:', '').trim();
    }
  }

  return {
    verdict,
    confidence,
    reasoning: reasoning || 'Unable to parse reasoning from response.',
    concerns,
    recommendation: recommendation || 'Review the evidence manually.',
  };
}

// ============================================
// Main Assessment Function
// ============================================

export async function assessAssertion(assertion: AssertionForAssessment): Promise<AssessmentResult> {
  const client = new Anthropic();
  const prompt = buildAssessmentPrompt(assertion);

  // CRITICAL: No tools enabled - pure text analysis only
  // This ensures closed-loop validation with no external data access
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
    system: ASSESSMENT_SYSTEM_PROMPT,
    // NO tools array - prevents web search, file access, etc.
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  return parseAssessmentResponse(textContent.text);
}
