/**
 * Structured Web Extractor - Main Module
 *
 * This is the PRIMARY tool for deep research. It extracts queryable structured
 * data from web pages, captures screenshots as evidence, and auto-generates
 * assertions.
 *
 * TWO MODES OF OPERATION:
 *
 * 1. FETCH + CLAUDE REASONING (Recommended - uses your Claude Max subscription)
 *    npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
 *    → Claude reads the cached content and extracts structured data
 *    npm run cli -- extract:save '{"entityId": "...", "schemaType": "pricing", "data": {...}}'
 *
 * 2. FULLY AUTOMATED (Requires ANTHROPIC_API_KEY)
 *    npm run cli -- extract:pricing '{"url": "...", "entityId": "..."}'
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { prisma } from '../../db/client';
import { fetchUrl, captureScreenshot, validateUrl, closeBrowser } from './fetcher';
import { extractWithLLM } from './llm-parser';
import { SchemaType, SCHEMA_TYPES, PricingData, FeaturesData, CompanyData, ComplianceData, IntegrationsData } from './schemas';
import { createSource } from '../sources';
import { createAssertion } from '../assertions';

// Re-export types and utilities
export * from './schemas';
export { validateUrl, closeBrowser } from './fetcher';

// Cache directory for fetched content
const CACHE_DIR = '.cache/extractions';

// ============================================
// TYPES
// ============================================

export interface FetchInput {
  url: string;
  entityId: string;
  screenshot?: boolean;
}

export interface FetchResult {
  success: boolean;
  cacheId?: string;
  cachePath?: string;
  screenshotPath?: string;
  url?: string;
  entityId?: string;
  entityName?: string;
  contentPreview?: string;
  error?: string;
}

export interface SaveExtractionInput {
  entityId: string;
  schemaType: SchemaType;
  data: unknown;
  url: string;
  screenshotPath?: string;
  confidence?: number;
  createAssertions?: boolean;
}

export interface SaveExtractionResult {
  success: boolean;
  extractionId?: string;
  assertionsCreated?: string[];
  error?: string;
}

export interface ExtractInput {
  url: string;
  entityId: string;
  schemaType: SchemaType;
  screenshot?: boolean;
  createAssertions?: boolean;
  expiresInDays?: number;
}

export interface ExtractResult {
  success: boolean;
  extractionId?: string;
  data?: unknown;
  screenshotPath?: string;
  assertionsCreated?: string[];
  sourceValidated?: boolean;
  confidence?: number;
  error?: string;
  // For fetch-only mode
  cacheId?: string;
  cachePath?: string;
  needsManualExtraction?: boolean;
}

// ============================================
// FETCH FOR EXTRACTION (No LLM needed)
// ============================================

/**
 * Fetches a URL, captures screenshot, and caches content for Claude to analyze.
 * This is the first step when not using an API key.
 */
export async function fetchForExtraction(input: FetchInput): Promise<FetchResult> {
  const { url, entityId, screenshot = true } = input;

  try {
    // 1. Verify entity exists
    const entity = await prisma.entity.findUnique({
      where: { id: entityId },
    });

    if (!entity) {
      return { success: false, error: `Entity not found: ${entityId}` };
    }

    // 2. Fetch the URL
    console.error(`Fetching: ${url}`);
    const fetchResult = await fetchUrl(url);

    if (!fetchResult.success) {
      await closeBrowser();
      return { success: false, error: `Failed to fetch URL: ${fetchResult.error}` };
    }

    // 3. Create or update source
    let source = await prisma.source.findUnique({ where: { url } });
    if (!source) {
      source = await createSource({
        url,
        title: `${entity.name}`,
        sourceType: 'vendor_docs',
      });
    }

    await prisma.source.update({
      where: { id: source.id },
      data: {
        lastFetchedAt: new Date(),
        lastStatusCode: fetchResult.statusCode,
        contentHash: fetchResult.contentHash,
        isAccessible: true,
      },
    });

    // 4. Capture screenshot
    let screenshotPath: string | undefined;
    if (screenshot) {
      console.error(`Capturing screenshot...`);
      const screenshotResult = await captureScreenshot(url);
      if (screenshotResult.success && screenshotResult.filePath) {
        screenshotPath = screenshotResult.filePath;
      }
    }

    // 5. Cache the content for Claude to read
    const cacheId = crypto.createHash('md5').update(url + entityId).digest('hex').substring(0, 12);
    const cacheDir = path.resolve(CACHE_DIR);

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const cachePath = path.join(cacheDir, `${cacheId}.json`);
    const cacheData = {
      url,
      entityId,
      entityName: entity.name,
      fetchedAt: new Date().toISOString(),
      screenshotPath,
      text: fetchResult.text,
      html: fetchResult.html,
    };

    fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));

    await closeBrowser();

    // Return preview for Claude to see
    const contentPreview = fetchResult.text.substring(0, 2000) +
      (fetchResult.text.length > 2000 ? '\n\n[Content truncated - full content in cache file]' : '');

    return {
      success: true,
      cacheId,
      cachePath,
      screenshotPath,
      url,
      entityId,
      entityName: entity.name,
      contentPreview,
    };
  } catch (error) {
    await closeBrowser();
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Read cached content for a previous fetch
 */
export async function readCachedContent(cacheId: string): Promise<{
  success: boolean;
  data?: {
    url: string;
    entityId: string;
    entityName: string;
    fetchedAt: string;
    screenshotPath?: string;
    text: string;
  };
  error?: string;
}> {
  try {
    const cachePath = path.resolve(CACHE_DIR, `${cacheId}.json`);

    if (!fs.existsSync(cachePath)) {
      return { success: false, error: `Cache not found: ${cacheId}` };
    }

    const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    return { success: true, data: cacheData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ============================================
// SAVE EXTRACTION (Claude provides the data)
// ============================================

/**
 * Saves pre-extracted data to the database.
 * Use this after Claude has analyzed the cached content.
 */
export async function saveExtraction(input: SaveExtractionInput): Promise<SaveExtractionResult> {
  const {
    entityId,
    schemaType,
    data,
    url,
    screenshotPath,
    confidence = 0.9,
    createAssertions = true,
  } = input;

  try {
    // 1. Verify entity exists
    const entity = await prisma.entity.findUnique({
      where: { id: entityId },
    });

    if (!entity) {
      return { success: false, error: `Entity not found: ${entityId}` };
    }

    // 2. Get or create source
    let source = await prisma.source.findUnique({ where: { url } });
    if (!source) {
      source = await createSource({
        url,
        title: `${entity.name} - ${schemaType}`,
        sourceType: 'vendor_docs',
      });
    }

    // 3. Create screenshot record if path provided
    let screenshotRecord: { id: string } | null = null;
    if (screenshotPath && fs.existsSync(screenshotPath)) {
      screenshotRecord = await prisma.screenshot.create({
        data: {
          url,
          filePath: screenshotPath,
          fullPage: true,
        },
      });
    }

    // 4. Create extraction record
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const extraction = await prisma.extraction.create({
      data: {
        entityId,
        sourceId: source.id,
        schemaType,
        data: data as object,
        status: 'COMPLETED',
        confidence,
        expiresAt,
        screenshotId: screenshotRecord?.id,
        assertionIds: [],
      },
    });

    // 5. Generate assertions if requested
    let assertionIds: string[] = [];
    if (createAssertions) {
      assertionIds = await generateAssertionsFromData(entityId, schemaType, data, url);

      await prisma.extraction.update({
        where: { id: extraction.id },
        data: { assertionIds },
      });
    }

    return {
      success: true,
      extractionId: extraction.id,
      assertionsCreated: assertionIds,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ============================================
// FULL EXTRACTION (With optional API key)
// ============================================

/**
 * Full extraction - fetches URL and extracts data.
 * If ANTHROPIC_API_KEY is set, uses LLM extraction.
 * Otherwise, returns cached content for manual extraction.
 */
export async function extract(input: ExtractInput): Promise<ExtractResult> {
  const {
    url,
    entityId,
    schemaType,
    screenshot = true,
    createAssertions = true,
    expiresInDays = 30,
  } = input;

  // Check if API key is available
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;

  try {
    // 1. Verify entity exists
    const entity = await prisma.entity.findUnique({
      where: { id: entityId },
    });

    if (!entity) {
      return { success: false, error: `Entity not found: ${entityId}` };
    }

    // 2. Fetch the URL
    console.error(`Fetching: ${url}`);
    const fetchResult = await fetchUrl(url);

    if (!fetchResult.success) {
      await closeBrowser();
      return { success: false, error: `Failed to fetch URL: ${fetchResult.error}` };
    }

    // 3. Create or get source
    let source = await prisma.source.findUnique({ where: { url } });
    if (!source) {
      source = await createSource({
        url,
        title: `${entity.name} - ${schemaType}`,
        sourceType: 'vendor_docs',
      });
    }

    await prisma.source.update({
      where: { id: source.id },
      data: {
        lastFetchedAt: new Date(),
        lastStatusCode: fetchResult.statusCode,
        contentHash: fetchResult.contentHash,
        isAccessible: true,
      },
    });

    // 4. Capture screenshot
    let screenshotRecord: { id: string } | null = null;
    let screenshotPath: string | undefined;

    if (screenshot) {
      console.error(`Capturing screenshot...`);
      const screenshotResult = await captureScreenshot(url);

      if (screenshotResult.success && screenshotResult.filePath) {
        screenshotPath = screenshotResult.filePath;
        screenshotRecord = await prisma.screenshot.create({
          data: {
            url,
            filePath: screenshotResult.filePath,
            fullPage: true,
            width: screenshotResult.width,
            height: screenshotResult.height,
          },
        });
      }
    }

    // 5. If no API key, cache content and return for manual extraction
    if (!hasApiKey) {
      const cacheId = crypto.createHash('md5').update(url + entityId).digest('hex').substring(0, 12);
      const cacheDir = path.resolve(CACHE_DIR);

      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const cachePath = path.join(cacheDir, `${cacheId}.json`);
      const cacheData = {
        url,
        entityId,
        entityName: entity.name,
        schemaType,
        fetchedAt: new Date().toISOString(),
        screenshotPath,
        text: fetchResult.text,
      };

      fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
      await closeBrowser();

      return {
        success: true,
        screenshotPath,
        cacheId,
        cachePath,
        needsManualExtraction: true,
        error: 'No ANTHROPIC_API_KEY - content cached for manual extraction. Use extract:save to persist after Claude analyzes.',
      };
    }

    // 6. Extract with LLM (API key available)
    console.error(`Extracting ${schemaType} data...`);
    const extractResult = await extractWithLLM(fetchResult.text, schemaType);

    if (!extractResult.success) {
      await prisma.extraction.create({
        data: {
          entityId,
          sourceId: source.id,
          schemaType,
          data: {},
          status: 'FAILED',
          error: extractResult.error,
          screenshotId: screenshotRecord?.id,
        },
      });

      await closeBrowser();
      return {
        success: false,
        error: `Extraction failed: ${extractResult.error}`,
        screenshotPath,
      };
    }

    // 7. Create extraction record
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const extraction = await prisma.extraction.create({
      data: {
        entityId,
        sourceId: source.id,
        schemaType,
        data: extractResult.data as object,
        rawQuotes: extractResult.quotes,
        status: 'COMPLETED',
        confidence: extractResult.confidence,
        expiresAt,
        screenshotId: screenshotRecord?.id,
        assertionIds: [],
      },
    });

    // 8. Auto-generate assertions
    let assertionIds: string[] = [];
    if (createAssertions && extractResult.data) {
      console.error(`Creating assertions...`);
      assertionIds = await generateAssertionsFromData(entityId, schemaType, extractResult.data, url);

      await prisma.extraction.update({
        where: { id: extraction.id },
        data: { assertionIds },
      });
    }

    await closeBrowser();

    return {
      success: true,
      extractionId: extraction.id,
      data: extractResult.data,
      screenshotPath,
      assertionsCreated: assertionIds,
      sourceValidated: true,
      confidence: extractResult.confidence,
    };
  } catch (error) {
    await closeBrowser();
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ============================================
// SCHEMA-SPECIFIC EXTRACTORS
// ============================================

export async function extractPricing(
  url: string,
  entityId: string,
  options: { screenshot?: boolean; createAssertions?: boolean } = {}
): Promise<ExtractResult> {
  return extract({ url, entityId, schemaType: 'pricing', ...options });
}

export async function extractFeatures(
  url: string,
  entityId: string,
  options: { screenshot?: boolean; createAssertions?: boolean } = {}
): Promise<ExtractResult> {
  return extract({ url, entityId, schemaType: 'features', ...options });
}

export async function extractCompany(
  url: string,
  entityId: string,
  options: { screenshot?: boolean; createAssertions?: boolean } = {}
): Promise<ExtractResult> {
  return extract({ url, entityId, schemaType: 'company', ...options });
}

export async function extractCompliance(
  url: string,
  entityId: string,
  options: { screenshot?: boolean; createAssertions?: boolean } = {}
): Promise<ExtractResult> {
  return extract({ url, entityId, schemaType: 'compliance', ...options });
}

export async function extractIntegrations(
  url: string,
  entityId: string,
  options: { screenshot?: boolean; createAssertions?: boolean } = {}
): Promise<ExtractResult> {
  return extract({ url, entityId, schemaType: 'integrations', ...options });
}

// ============================================
// ASSERTION GENERATION (Exported for use by saveExtraction)
// ============================================

export async function generateAssertionsFromData(
  entityId: string,
  schemaType: SchemaType,
  data: unknown,
  sourceUrl: string
): Promise<string[]> {
  const assertionIds: string[] = [];

  try {
    switch (schemaType) {
      case 'pricing':
        assertionIds.push(...await generatePricingAssertions(entityId, data as PricingData, sourceUrl));
        break;
      case 'features':
        assertionIds.push(...await generateFeatureAssertions(entityId, data as FeaturesData, sourceUrl));
        break;
      case 'company':
        assertionIds.push(...await generateCompanyAssertions(entityId, data as CompanyData, sourceUrl));
        break;
      case 'compliance':
        assertionIds.push(...await generateComplianceAssertions(entityId, data as ComplianceData, sourceUrl));
        break;
      case 'integrations':
        assertionIds.push(...await generateIntegrationAssertions(entityId, data as IntegrationsData, sourceUrl));
        break;
    }
  } catch (error) {
    console.error(`Error generating assertions: ${error}`);
  }

  return assertionIds;
}

async function generatePricingAssertions(
  entityId: string,
  pricing: PricingData,
  sourceUrl: string
): Promise<string[]> {
  const ids: string[] = [];

  if (pricing.hasFreeTier) {
    const freeTier = pricing.tiers?.find(t => t.price === 0);
    const assertion = await createAssertion({
      entityId,
      claim: `Offers a free tier${freeTier?.features?.length ? ` with features: ${freeTier.features.slice(0, 3).join(', ')}` : ''}`,
      category: 'pricing',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  for (const tier of (pricing.tiers || []).filter(t => t.price && t.price > 0)) {
    const priceStr = tier.pricePerUnit
      ? `$${tier.price}/${tier.billingCycle} ${tier.pricePerUnit}`
      : `$${tier.price}/${tier.billingCycle}`;

    const assertion = await createAssertion({
      entityId,
      claim: `${tier.name} plan: ${priceStr}`,
      category: 'pricing',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (pricing.hasEnterprise) {
    const assertion = await createAssertion({
      entityId,
      claim: 'Offers enterprise pricing (contact sales)',
      category: 'pricing',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  return ids;
}

async function generateFeatureAssertions(
  entityId: string,
  features: FeaturesData,
  sourceUrl: string
): Promise<string[]> {
  const ids: string[] = [];

  for (const highlight of features.highlights?.slice(0, 5) || []) {
    const assertion = await createAssertion({
      entityId,
      claim: `Key feature: ${highlight}`,
      category: 'feature',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  return ids;
}

async function generateCompanyAssertions(
  entityId: string,
  company: CompanyData,
  sourceUrl: string
): Promise<string[]> {
  const ids: string[] = [];

  if (company.founded) {
    const assertion = await createAssertion({
      entityId,
      claim: `Founded in ${company.founded}`,
      category: 'company',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (company.headquarters) {
    const assertion = await createAssertion({
      entityId,
      claim: `Headquartered in ${company.headquarters}`,
      category: 'company',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (company.funding?.totalRaised) {
    const assertion = await createAssertion({
      entityId,
      claim: `Total funding raised: ${company.funding.totalRaised}`,
      category: 'company',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (company.employeeCount) {
    const assertion = await createAssertion({
      entityId,
      claim: `Employee count: ${company.employeeCount}`,
      category: 'company',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  return ids;
}

async function generateComplianceAssertions(
  entityId: string,
  compliance: ComplianceData,
  sourceUrl: string
): Promise<string[]> {
  const ids: string[] = [];

  for (const cert of compliance.certifications || []) {
    if (cert.status === 'certified') {
      const assertion = await createAssertion({
        entityId,
        claim: `${cert.name} certified`,
        category: 'compliance',
        sourceUrl,
      });
      if (assertion) ids.push(assertion.id);
    }
  }

  if (compliance.soc2) {
    const assertion = await createAssertion({
      entityId,
      claim: 'SOC 2 compliant',
      category: 'compliance',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (compliance.fedRampStatus && compliance.fedRampStatus !== 'None') {
    const assertion = await createAssertion({
      entityId,
      claim: `FedRAMP status: ${compliance.fedRampStatus}`,
      category: 'compliance',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  return ids;
}

async function generateIntegrationAssertions(
  entityId: string,
  integrations: IntegrationsData,
  sourceUrl: string
): Promise<string[]> {
  const ids: string[] = [];

  if (integrations.totalCount > 0) {
    const assertion = await createAssertion({
      entityId,
      claim: `Offers ${integrations.totalCount}+ integrations`,
      category: 'integration',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (integrations.hasApi) {
    const assertion = await createAssertion({
      entityId,
      claim: 'Provides public API',
      category: 'integration',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  if (integrations.hasSdk && integrations.sdkLanguages?.length) {
    const assertion = await createAssertion({
      entityId,
      claim: `SDK available for: ${integrations.sdkLanguages.join(', ')}`,
      category: 'integration',
      sourceUrl,
    });
    if (assertion) ids.push(assertion.id);
  }

  return ids;
}

// ============================================
// QUERY FUNCTIONS
// ============================================

export async function getExtractions(entityId: string, schemaType?: SchemaType) {
  return prisma.extraction.findMany({
    where: {
      entityId,
      ...(schemaType ? { schemaType } : {}),
    },
    include: {
      source: true,
      screenshot: true,
    },
    orderBy: { extractedAt: 'desc' },
  });
}

export async function getLatestExtraction(entityId: string, schemaType: SchemaType) {
  return prisma.extraction.findFirst({
    where: { entityId, schemaType, status: 'COMPLETED' },
    include: {
      source: true,
      screenshot: true,
    },
    orderBy: { extractedAt: 'desc' },
  });
}

export async function getStaleExtractions(projectId?: string) {
  const now = new Date();

  return prisma.extraction.findMany({
    where: {
      OR: [
        { status: 'STALE' },
        { expiresAt: { lt: now } },
      ],
      ...(projectId ? { entity: { projectId } } : {}),
    },
    include: {
      entity: true,
      source: true,
    },
  });
}

export async function getExtractionSummary(projectId: string) {
  const extractions = await prisma.extraction.findMany({
    where: { entity: { projectId } },
    select: {
      schemaType: true,
      status: true,
    },
  });

  const summary: Record<string, { total: number; completed: number; failed: number; stale: number }> = {};

  for (const schemaType of SCHEMA_TYPES) {
    const ofType = extractions.filter(e => e.schemaType === schemaType);
    summary[schemaType] = {
      total: ofType.length,
      completed: ofType.filter(e => e.status === 'COMPLETED').length,
      failed: ofType.filter(e => e.status === 'FAILED').length,
      stale: ofType.filter(e => e.status === 'STALE').length,
    };
  }

  return summary;
}
