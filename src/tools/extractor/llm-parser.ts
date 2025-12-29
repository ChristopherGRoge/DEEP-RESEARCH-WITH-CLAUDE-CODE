/**
 * LLM Parser - Claude-based structured data extraction
 *
 * Uses Claude Haiku for cost-effective extraction of structured data
 * from HTML/text content according to predefined schemas.
 */

import Anthropic from '@anthropic-ai/sdk';
import { SchemaType, getSchemaDescription, validateExtraction } from './schemas';

// ============================================
// TYPES
// ============================================

export interface ExtractionResult {
  success: boolean;
  data: unknown;
  confidence: number;
  quotes: string[];
  error?: string;
}

// ============================================
// ANTHROPIC CLIENT
// ============================================

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic();
  }
  return anthropicClient;
}

// ============================================
// EXTRACTION PROMPTS
// ============================================

const SYSTEM_PROMPT = `You are a structured data extraction agent. Your job is to extract specific information from web page content and return it as valid JSON.

RULES:
1. ONLY extract information explicitly present in the content
2. Use null for missing fields - NEVER hallucinate or guess
3. Include exact quotes from the source as evidence for key claims
4. Rate your confidence (0.0-1.0) based on data clarity and completeness
5. If the page doesn't contain the requested information, return minimal data with low confidence

OUTPUT FORMAT:
Always respond with valid JSON in this exact structure:
{
  "data": { ... extracted data matching the schema ... },
  "confidence": 0.0-1.0,
  "quotes": ["exact quote 1", "exact quote 2"]
}`;

// ============================================
// MAIN EXTRACTION FUNCTION
// ============================================

export async function extractWithLLM(
  content: string,
  schemaType: SchemaType,
  options: {
    model?: string;
    maxTokens?: number;
  } = {}
): Promise<ExtractionResult> {
  const {
    model = 'claude-3-5-haiku-20241022',
    maxTokens = 4096,
  } = options;

  const client = getClient();
  const schemaDescription = getSchemaDescription(schemaType);

  // Truncate content if too long (keep under ~40k tokens)
  const truncatedContent = content.length > 80000
    ? content.substring(0, 80000) + '\n\n[Content truncated...]'
    : content;

  try {
    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Extract ${schemaType} information from this web page content.

EXTRACTION INSTRUCTIONS:
${schemaDescription}

WEB PAGE CONTENT:
---
${truncatedContent}
---

Respond with JSON only. No markdown, no explanation.`,
      }],
    });

    // Extract text from response
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return {
        success: false,
        data: null,
        confidence: 0,
        quotes: [],
        error: 'No text content in response',
      };
    }

    // Parse JSON response
    let parsed: { data: unknown; confidence: number; quotes: string[] };
    try {
      // Clean up response - sometimes LLM wraps in markdown
      let jsonText = textContent.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3);
      }
      parsed = JSON.parse(jsonText.trim());
    } catch (parseError) {
      return {
        success: false,
        data: null,
        confidence: 0,
        quotes: [],
        error: `Failed to parse LLM response: ${parseError}`,
      };
    }

    // Validate against schema
    try {
      const validatedData = validateExtraction(schemaType, parsed.data);
      return {
        success: true,
        data: validatedData,
        confidence: parsed.confidence || 0.5,
        quotes: parsed.quotes || [],
      };
    } catch (validationError) {
      // Return data even if validation fails, but with lower confidence
      return {
        success: true,
        data: parsed.data,
        confidence: Math.min(parsed.confidence || 0.5, 0.5),
        quotes: parsed.quotes || [],
        error: `Schema validation warning: ${validationError}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      confidence: 0,
      quotes: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ============================================
// QUICK EXTRACTION (for simple data)
// ============================================

export async function quickExtract(
  content: string,
  prompt: string,
): Promise<{ success: boolean; result: string; error?: string }> {
  const client = getClient();

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `${prompt}\n\nContent:\n${content.substring(0, 10000)}`,
      }],
    });

    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      return { success: false, result: '', error: 'No text content' };
    }

    return { success: true, result: textContent.text };
  } catch (error) {
    return {
      success: false,
      result: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
