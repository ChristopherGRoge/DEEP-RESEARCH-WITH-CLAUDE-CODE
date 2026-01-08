"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeBrowser = exports.validateUrl = void 0;
exports.fetchForExtraction = fetchForExtraction;
exports.readCachedContent = readCachedContent;
exports.saveExtraction = saveExtraction;
exports.extract = extract;
exports.extractPricing = extractPricing;
exports.extractFeatures = extractFeatures;
exports.extractCompany = extractCompany;
exports.extractCompliance = extractCompliance;
exports.extractIntegrations = extractIntegrations;
exports.generateAssertionsFromData = generateAssertionsFromData;
exports.getExtractions = getExtractions;
exports.getLatestExtraction = getLatestExtraction;
exports.getStaleExtractions = getStaleExtractions;
exports.getExtractionSummary = getExtractionSummary;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const client_1 = require("../../db/client");
const fetcher_1 = require("./fetcher");
const llm_parser_1 = require("./llm-parser");
const schemas_1 = require("./schemas");
const sources_1 = require("../sources");
const assertions_1 = require("../assertions");
// Re-export types and utilities
__exportStar(require("./schemas"), exports);
var fetcher_2 = require("./fetcher");
Object.defineProperty(exports, "validateUrl", { enumerable: true, get: function () { return fetcher_2.validateUrl; } });
Object.defineProperty(exports, "closeBrowser", { enumerable: true, get: function () { return fetcher_2.closeBrowser; } });
// Cache directory for fetched content
const CACHE_DIR = '.cache/extractions';
// ============================================
// FETCH FOR EXTRACTION (No LLM needed)
// ============================================
/**
 * Fetches a URL, captures screenshot, and caches content for Claude to analyze.
 * This is the first step when not using an API key.
 */
async function fetchForExtraction(input) {
    const { url, entityId, screenshot = true } = input;
    try {
        // 1. Verify entity exists
        const entity = await client_1.prisma.entity.findUnique({
            where: { id: entityId },
        });
        if (!entity) {
            return { success: false, error: `Entity not found: ${entityId}` };
        }
        // 2. Fetch the URL
        console.error(`Fetching: ${url}`);
        const fetchResult = await (0, fetcher_1.fetchUrl)(url);
        if (!fetchResult.success) {
            await (0, fetcher_1.closeBrowser)();
            return { success: false, error: `Failed to fetch URL: ${fetchResult.error}` };
        }
        // 3. Create or update source
        let source = await client_1.prisma.source.findUnique({ where: { url } });
        if (!source) {
            source = await (0, sources_1.createSource)({
                url,
                title: `${entity.name}`,
                sourceType: 'vendor_docs',
            });
        }
        await client_1.prisma.source.update({
            where: { id: source.id },
            data: {
                lastFetchedAt: new Date(),
                lastStatusCode: fetchResult.statusCode,
                contentHash: fetchResult.contentHash,
                isAccessible: true,
            },
        });
        // 4. Capture screenshot
        let screenshotPath;
        if (screenshot) {
            console.error(`Capturing screenshot...`);
            const screenshotResult = await (0, fetcher_1.captureScreenshot)(url);
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
        await (0, fetcher_1.closeBrowser)();
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
    }
    catch (error) {
        await (0, fetcher_1.closeBrowser)();
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
/**
 * Read cached content for a previous fetch
 */
async function readCachedContent(cacheId) {
    try {
        const cachePath = path.resolve(CACHE_DIR, `${cacheId}.json`);
        if (!fs.existsSync(cachePath)) {
            return { success: false, error: `Cache not found: ${cacheId}` };
        }
        const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        return { success: true, data: cacheData };
    }
    catch (error) {
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
async function saveExtraction(input) {
    const { entityId, schemaType, data, url, screenshotPath, confidence = 0.9, createAssertions = true, } = input;
    try {
        // 1. Verify entity exists
        const entity = await client_1.prisma.entity.findUnique({
            where: { id: entityId },
        });
        if (!entity) {
            return { success: false, error: `Entity not found: ${entityId}` };
        }
        // 2. Get or create source
        let source = await client_1.prisma.source.findUnique({ where: { url } });
        if (!source) {
            source = await (0, sources_1.createSource)({
                url,
                title: `${entity.name} - ${schemaType}`,
                sourceType: 'vendor_docs',
            });
        }
        // 3. Create screenshot record if path provided
        let screenshotRecord = null;
        if (screenshotPath && fs.existsSync(screenshotPath)) {
            screenshotRecord = await client_1.prisma.screenshot.create({
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
        const extraction = await client_1.prisma.extraction.create({
            data: {
                entityId,
                sourceId: source.id,
                schemaType,
                data: data,
                status: 'COMPLETED',
                confidence,
                expiresAt,
                screenshotId: screenshotRecord?.id,
                assertionIds: [],
            },
        });
        // 5. Generate assertions if requested
        let assertionIds = [];
        if (createAssertions) {
            assertionIds = await generateAssertionsFromData(entityId, schemaType, data, url);
            await client_1.prisma.extraction.update({
                where: { id: extraction.id },
                data: { assertionIds },
            });
        }
        return {
            success: true,
            extractionId: extraction.id,
            assertionsCreated: assertionIds,
        };
    }
    catch (error) {
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
async function extract(input) {
    const { url, entityId, schemaType, screenshot = true, createAssertions = true, expiresInDays = 30, } = input;
    // Check if API key is available
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
    try {
        // 1. Verify entity exists
        const entity = await client_1.prisma.entity.findUnique({
            where: { id: entityId },
        });
        if (!entity) {
            return { success: false, error: `Entity not found: ${entityId}` };
        }
        // 2. Fetch the URL
        console.error(`Fetching: ${url}`);
        const fetchResult = await (0, fetcher_1.fetchUrl)(url);
        if (!fetchResult.success) {
            await (0, fetcher_1.closeBrowser)();
            return { success: false, error: `Failed to fetch URL: ${fetchResult.error}` };
        }
        // 3. Create or get source
        let source = await client_1.prisma.source.findUnique({ where: { url } });
        if (!source) {
            source = await (0, sources_1.createSource)({
                url,
                title: `${entity.name} - ${schemaType}`,
                sourceType: 'vendor_docs',
            });
        }
        await client_1.prisma.source.update({
            where: { id: source.id },
            data: {
                lastFetchedAt: new Date(),
                lastStatusCode: fetchResult.statusCode,
                contentHash: fetchResult.contentHash,
                isAccessible: true,
            },
        });
        // 4. Capture screenshot
        let screenshotRecord = null;
        let screenshotPath;
        if (screenshot) {
            console.error(`Capturing screenshot...`);
            const screenshotResult = await (0, fetcher_1.captureScreenshot)(url);
            if (screenshotResult.success && screenshotResult.filePath) {
                screenshotPath = screenshotResult.filePath;
                screenshotRecord = await client_1.prisma.screenshot.create({
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
            await (0, fetcher_1.closeBrowser)();
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
        const extractResult = await (0, llm_parser_1.extractWithLLM)(fetchResult.text, schemaType);
        if (!extractResult.success) {
            await client_1.prisma.extraction.create({
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
            await (0, fetcher_1.closeBrowser)();
            return {
                success: false,
                error: `Extraction failed: ${extractResult.error}`,
                screenshotPath,
            };
        }
        // 7. Create extraction record
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
        const extraction = await client_1.prisma.extraction.create({
            data: {
                entityId,
                sourceId: source.id,
                schemaType,
                data: extractResult.data,
                rawQuotes: extractResult.quotes,
                status: 'COMPLETED',
                confidence: extractResult.confidence,
                expiresAt,
                screenshotId: screenshotRecord?.id,
                assertionIds: [],
            },
        });
        // 8. Auto-generate assertions
        let assertionIds = [];
        if (createAssertions && extractResult.data) {
            console.error(`Creating assertions...`);
            assertionIds = await generateAssertionsFromData(entityId, schemaType, extractResult.data, url);
            await client_1.prisma.extraction.update({
                where: { id: extraction.id },
                data: { assertionIds },
            });
        }
        await (0, fetcher_1.closeBrowser)();
        return {
            success: true,
            extractionId: extraction.id,
            data: extractResult.data,
            screenshotPath,
            assertionsCreated: assertionIds,
            sourceValidated: true,
            confidence: extractResult.confidence,
        };
    }
    catch (error) {
        await (0, fetcher_1.closeBrowser)();
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
// ============================================
// SCHEMA-SPECIFIC EXTRACTORS
// ============================================
async function extractPricing(url, entityId, options = {}) {
    return extract({ url, entityId, schemaType: 'pricing', ...options });
}
async function extractFeatures(url, entityId, options = {}) {
    return extract({ url, entityId, schemaType: 'features', ...options });
}
async function extractCompany(url, entityId, options = {}) {
    return extract({ url, entityId, schemaType: 'company', ...options });
}
async function extractCompliance(url, entityId, options = {}) {
    return extract({ url, entityId, schemaType: 'compliance', ...options });
}
async function extractIntegrations(url, entityId, options = {}) {
    return extract({ url, entityId, schemaType: 'integrations', ...options });
}
// ============================================
// ASSERTION GENERATION (Exported for use by saveExtraction)
// ============================================
async function generateAssertionsFromData(entityId, schemaType, data, sourceUrl) {
    const assertionIds = [];
    try {
        switch (schemaType) {
            case 'pricing':
                assertionIds.push(...await generatePricingAssertions(entityId, data, sourceUrl));
                break;
            case 'features':
                assertionIds.push(...await generateFeatureAssertions(entityId, data, sourceUrl));
                break;
            case 'company':
                assertionIds.push(...await generateCompanyAssertions(entityId, data, sourceUrl));
                break;
            case 'compliance':
                assertionIds.push(...await generateComplianceAssertions(entityId, data, sourceUrl));
                break;
            case 'integrations':
                assertionIds.push(...await generateIntegrationAssertions(entityId, data, sourceUrl));
                break;
        }
    }
    catch (error) {
        console.error(`Error generating assertions: ${error}`);
    }
    return assertionIds;
}
async function generatePricingAssertions(entityId, pricing, sourceUrl) {
    const ids = [];
    if (pricing.hasFreeTier) {
        const freeTier = pricing.tiers?.find(t => t.price === 0);
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Offers a free tier${freeTier?.features?.length ? ` with features: ${freeTier.features.slice(0, 3).join(', ')}` : ''}`,
            category: 'pricing',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    for (const tier of (pricing.tiers || []).filter(t => t.price && t.price > 0)) {
        const priceStr = tier.pricePerUnit
            ? `$${tier.price}/${tier.billingCycle} ${tier.pricePerUnit}`
            : `$${tier.price}/${tier.billingCycle}`;
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `${tier.name} plan: ${priceStr}`,
            category: 'pricing',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (pricing.hasEnterprise) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: 'Offers enterprise pricing (contact sales)',
            category: 'pricing',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    return ids;
}
async function generateFeatureAssertions(entityId, features, sourceUrl) {
    const ids = [];
    for (const highlight of features.highlights?.slice(0, 5) || []) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Key feature: ${highlight}`,
            category: 'feature',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    return ids;
}
async function generateCompanyAssertions(entityId, company, sourceUrl) {
    const ids = [];
    if (company.founded) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Founded in ${company.founded}`,
            category: 'company',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (company.headquarters) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Headquartered in ${company.headquarters}`,
            category: 'company',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (company.funding?.totalRaised) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Total funding raised: ${company.funding.totalRaised}`,
            category: 'company',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (company.employeeCount) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Employee count: ${company.employeeCount}`,
            category: 'company',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    return ids;
}
async function generateComplianceAssertions(entityId, compliance, sourceUrl) {
    const ids = [];
    for (const cert of compliance.certifications || []) {
        if (cert.status === 'certified') {
            const assertion = await (0, assertions_1.createAssertion)({
                entityId,
                claim: `${cert.name} certified`,
                category: 'compliance',
                sourceUrl,
            });
            if (assertion)
                ids.push(assertion.id);
        }
    }
    if (compliance.soc2) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: 'SOC 2 compliant',
            category: 'compliance',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (compliance.fedRampStatus && compliance.fedRampStatus !== 'None') {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `FedRAMP status: ${compliance.fedRampStatus}`,
            category: 'compliance',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    return ids;
}
async function generateIntegrationAssertions(entityId, integrations, sourceUrl) {
    const ids = [];
    if (integrations.totalCount > 0) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `Offers ${integrations.totalCount}+ integrations`,
            category: 'integration',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (integrations.hasApi) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: 'Provides public API',
            category: 'integration',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    if (integrations.hasSdk && integrations.sdkLanguages?.length) {
        const assertion = await (0, assertions_1.createAssertion)({
            entityId,
            claim: `SDK available for: ${integrations.sdkLanguages.join(', ')}`,
            category: 'integration',
            sourceUrl,
        });
        if (assertion)
            ids.push(assertion.id);
    }
    return ids;
}
// ============================================
// QUERY FUNCTIONS
// ============================================
async function getExtractions(entityId, schemaType) {
    return client_1.prisma.extraction.findMany({
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
async function getLatestExtraction(entityId, schemaType) {
    return client_1.prisma.extraction.findFirst({
        where: { entityId, schemaType, status: 'COMPLETED' },
        include: {
            source: true,
            screenshot: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
}
async function getStaleExtractions(projectId) {
    const now = new Date();
    return client_1.prisma.extraction.findMany({
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
async function getExtractionSummary(projectId) {
    const extractions = await client_1.prisma.extraction.findMany({
        where: { entity: { projectId } },
        select: {
            schemaType: true,
            status: true,
        },
    });
    const summary = {};
    for (const schemaType of schemas_1.SCHEMA_TYPES) {
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
//# sourceMappingURL=index.js.map