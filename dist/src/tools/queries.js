"use strict";
/**
 * Cross-Entity Queries
 *
 * Query and compare extracted data across multiple entities.
 * Works with any schema type - products, tools, concepts, etc.
 * Essential for competitive analysis and research synthesis.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryExtractions = queryExtractions;
exports.getFieldValues = getFieldValues;
exports.queryPricing = queryPricing;
exports.queryCompliance = queryCompliance;
exports.queryFeatures = queryFeatures;
exports.compareEntities = compareEntities;
exports.queryIntegrations = queryIntegrations;
exports.queryCompanies = queryCompanies;
const client_1 = require("../db/client");
/**
 * Generic query across all extracted data
 *
 * This is the most flexible query - works with any schema type and any data structure.
 * Use this when you need to search across diverse research data.
 *
 * Examples:
 * - Search for "kubernetes" across all extractions
 * - Find all entities where data contains a specific value
 * - Filter by any field in the extracted data
 */
async function queryExtractions(input) {
    const { projectId, schemaType, filters, searchText, limit = 100 } = input;
    // Build query
    const where = {
        entity: { projectId },
        status: 'COMPLETED',
    };
    if (schemaType) {
        where.schemaType = schemaType;
    }
    // Get extractions
    const extractions = await client_1.prisma.extraction.findMany({
        where,
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
        take: limit * 2, // Get extra to account for filtering
    });
    // Deduplicate by entity+schemaType (keep latest)
    const latestByEntitySchema = new Map();
    for (const ext of extractions) {
        const key = `${ext.entityId}:${ext.schemaType}`;
        if (!latestByEntitySchema.has(key)) {
            latestByEntitySchema.set(key, ext);
        }
    }
    // Process and filter results
    let results = [];
    const schemaTypeCounts = {};
    const entityTypeCounts = {};
    for (const ext of latestByEntitySchema.values()) {
        const data = ext.data;
        // Apply search text filter
        let matchedFields = [];
        if (searchText) {
            matchedFields = searchInObject(data, searchText.toLowerCase());
            if (matchedFields.length === 0)
                continue;
        }
        // Apply custom filters
        if (filters) {
            let passesFilters = true;
            for (const [path, expectedValue] of Object.entries(filters)) {
                const actualValue = getNestedValue(data, path);
                if (!matchesValue(actualValue, expectedValue)) {
                    passesFilters = false;
                    break;
                }
            }
            if (!passesFilters)
                continue;
        }
        // Count by schema type and entity type
        schemaTypeCounts[ext.schemaType] = (schemaTypeCounts[ext.schemaType] || 0) + 1;
        const entityType = ext.entity.entityType || 'unknown';
        entityTypeCounts[entityType] = (entityTypeCounts[entityType] || 0) + 1;
        results.push({
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityType: ext.entity.entityType,
            entityUrl: ext.entity.url,
            schemaType: ext.schemaType,
            data,
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
            matchedFields: matchedFields.length > 0 ? matchedFields : undefined,
        });
        if (results.length >= limit)
            break;
    }
    return {
        results,
        summary: {
            totalResults: results.length,
            bySchemaType: schemaTypeCounts,
            byEntityType: entityTypeCounts,
        },
    };
}
/**
 * Get all unique values for a specific field across extractions
 * Useful for discovering what data exists
 */
async function getFieldValues(input) {
    const { projectId, schemaType, fieldPath } = input;
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType,
            status: 'COMPLETED',
        },
        include: {
            entity: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Collect values
    const valueCounts = new Map();
    for (const ext of latestByEntity.values()) {
        const value = getNestedValue(ext.data, fieldPath);
        if (value === undefined)
            continue;
        // Handle arrays
        const values = Array.isArray(value) ? value : [value];
        for (const v of values) {
            const key = JSON.stringify(v);
            if (!valueCounts.has(key)) {
                valueCounts.set(key, { value: v, count: 0, entities: [] });
            }
            const entry = valueCounts.get(key);
            entry.count++;
            entry.entities.push(ext.entity.name);
        }
    }
    // Sort by count descending
    const sortedValues = Array.from(valueCounts.values())
        .sort((a, b) => b.count - a.count);
    return {
        values: sortedValues,
        totalEntities: latestByEntity.size,
    };
}
// Helper: Search for text in nested object, return matching field paths
function searchInObject(obj, searchText, path = '') {
    const matches = [];
    if (obj === null || obj === undefined)
        return matches;
    if (typeof obj === 'string') {
        if (obj.toLowerCase().includes(searchText)) {
            matches.push(path || 'root');
        }
    }
    else if (typeof obj === 'number' || typeof obj === 'boolean') {
        if (String(obj).toLowerCase().includes(searchText)) {
            matches.push(path || 'root');
        }
    }
    else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            matches.push(...searchInObject(obj[i], searchText, `${path}[${i}]`));
        }
    }
    else if (typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
            const newPath = path ? `${path}.${key}` : key;
            matches.push(...searchInObject(value, searchText, newPath));
        }
    }
    return matches;
}
// Helper: Get nested value from object using dot notation
function getNestedValue(obj, path) {
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined)
            return undefined;
        current = current[part];
    }
    return current;
}
// Helper: Check if actual value matches expected (supports operators)
function matchesValue(actual, expected) {
    if (typeof expected === 'string') {
        // Support operators: ">5", "<10", ">=3", "!=null"
        if (expected.startsWith('>')) {
            const num = parseFloat(expected.slice(1));
            return typeof actual === 'number' && actual > num;
        }
        if (expected.startsWith('<')) {
            const num = parseFloat(expected.slice(1));
            return typeof actual === 'number' && actual < num;
        }
        if (expected.startsWith('>=')) {
            const num = parseFloat(expected.slice(2));
            return typeof actual === 'number' && actual >= num;
        }
        if (expected.startsWith('<=')) {
            const num = parseFloat(expected.slice(2));
            return typeof actual === 'number' && actual <= num;
        }
        if (expected === '!=null') {
            return actual !== null && actual !== undefined;
        }
        if (expected.startsWith('contains:')) {
            const search = expected.slice(9).toLowerCase();
            if (typeof actual === 'string')
                return actual.toLowerCase().includes(search);
            if (Array.isArray(actual))
                return actual.some(v => String(v).toLowerCase().includes(search));
            return false;
        }
    }
    // Direct comparison
    return actual === expected;
}
/**
 * Query pricing data across all entities in a project
 */
async function queryPricing(input) {
    const { projectId, hasFreeTier, hasEnterprise, maxPrice, minPrice, sortBy = 'name' } = input;
    // Get all pricing extractions for the project
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType: 'pricing',
            status: 'COMPLETED',
        },
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity (keep latest)
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Process and filter results
    let results = [];
    for (const ext of latestByEntity.values()) {
        const data = ext.data;
        const tiers = (data.tiers || []).map((t) => ({
            name: t.name,
            price: t.price,
            billingCycle: t.billingCycle,
            pricePerUnit: t.pricePerUnit,
        }));
        const paidTiers = tiers.filter((t) => t.price !== null && t.price > 0);
        const lowestPaidPrice = paidTiers.length > 0
            ? Math.min(...paidTiers.map((t) => t.price))
            : null;
        const highestPrice = paidTiers.length > 0
            ? Math.max(...paidTiers.map((t) => t.price))
            : null;
        const result = {
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityUrl: ext.entity.url,
            hasFreeTier: data.hasFreeTier || false,
            hasEnterprise: data.hasEnterprise || false,
            lowestPaidPrice,
            highestPrice,
            tierCount: tiers.length,
            tiers,
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
        };
        // Apply filters
        if (hasFreeTier !== undefined && result.hasFreeTier !== hasFreeTier)
            continue;
        if (hasEnterprise !== undefined && result.hasEnterprise !== hasEnterprise)
            continue;
        if (maxPrice !== undefined && lowestPaidPrice !== null && lowestPaidPrice > maxPrice)
            continue;
        if (minPrice !== undefined && lowestPaidPrice !== null && lowestPaidPrice < minPrice)
            continue;
        results.push(result);
    }
    // Sort results
    results.sort((a, b) => {
        switch (sortBy) {
            case 'price_asc':
                if (a.lowestPaidPrice === null)
                    return 1;
                if (b.lowestPaidPrice === null)
                    return -1;
                return a.lowestPaidPrice - b.lowestPaidPrice;
            case 'price_desc':
                if (a.lowestPaidPrice === null)
                    return 1;
                if (b.lowestPaidPrice === null)
                    return -1;
                return b.lowestPaidPrice - a.lowestPaidPrice;
            default:
                return a.entityName.localeCompare(b.entityName);
        }
    });
    // Calculate summary
    const allPrices = results
        .map(r => r.lowestPaidPrice)
        .filter((p) => p !== null);
    return {
        results,
        summary: {
            totalWithPricing: results.length,
            withFreeTier: results.filter(r => r.hasFreeTier).length,
            withEnterprise: results.filter(r => r.hasEnterprise).length,
            priceRange: {
                min: allPrices.length > 0 ? Math.min(...allPrices) : null,
                max: allPrices.length > 0 ? Math.max(...allPrices) : null,
            },
        },
    };
}
/**
 * Query compliance data across all entities in a project
 */
async function queryCompliance(input) {
    const { projectId, soc2, fedRampStatus, gdprCompliant, hipaaCompliant, hasCertification } = input;
    // Get all compliance extractions for the project
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType: 'compliance',
            status: 'COMPLETED',
        },
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity (keep latest)
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Process and filter results
    let results = [];
    const certificationCounts = {};
    for (const ext of latestByEntity.values()) {
        const data = ext.data;
        const certifications = (data.certifications || []).map((c) => ({
            name: c.name,
            status: c.status,
        }));
        // Count certifications
        for (const cert of certifications) {
            if (cert.status === 'certified') {
                certificationCounts[cert.name] = (certificationCounts[cert.name] || 0) + 1;
            }
        }
        const result = {
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityUrl: ext.entity.url,
            soc2: data.soc2 || false,
            fedRampStatus: data.fedRampStatus || null,
            gdprCompliant: data.gdprCompliant || false,
            hipaaCompliant: data.hipaaCompliant || false,
            certifications,
            securityFeatures: data.securityFeatures || [],
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
        };
        // Apply filters
        if (soc2 !== undefined && result.soc2 !== soc2)
            continue;
        if (fedRampStatus !== undefined && result.fedRampStatus !== fedRampStatus)
            continue;
        if (gdprCompliant !== undefined && result.gdprCompliant !== gdprCompliant)
            continue;
        if (hipaaCompliant !== undefined && result.hipaaCompliant !== hipaaCompliant)
            continue;
        if (hasCertification !== undefined) {
            const hasCert = certifications.some((c) => c.name.toLowerCase().includes(hasCertification.toLowerCase()) && c.status === 'certified');
            if (!hasCert)
                continue;
        }
        results.push(result);
    }
    // Sort by name
    results.sort((a, b) => a.entityName.localeCompare(b.entityName));
    return {
        results,
        summary: {
            totalWithCompliance: results.length,
            withSoc2: results.filter(r => r.soc2).length,
            withFedRamp: results.filter(r => r.fedRampStatus && r.fedRampStatus !== 'None').length,
            withGdpr: results.filter(r => r.gdprCompliant).length,
            withHipaa: results.filter(r => r.hipaaCompliant).length,
            certificationCounts,
        },
    };
}
/**
 * Query features data across all entities in a project
 */
async function queryFeatures(input) {
    const { projectId, searchTerm, category } = input;
    // Get all feature extractions for the project
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType: 'features',
            status: 'COMPLETED',
        },
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity (keep latest)
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Process results
    let results = [];
    const categoryCounts = {};
    for (const ext of latestByEntity.values()) {
        const data = ext.data;
        const categories = (data.categories || []).map((cat) => {
            const features = (cat.features || []).map((f) => typeof f === 'string' ? f : f.name);
            // Count categories
            categoryCounts[cat.name] = (categoryCounts[cat.name] || 0) + 1;
            return {
                name: cat.name,
                featureCount: features.length,
                features,
            };
        });
        const totalFeatures = categories.reduce((sum, cat) => sum + cat.featureCount, 0);
        const result = {
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityUrl: ext.entity.url,
            highlights: data.highlights || [],
            categories,
            totalFeatures,
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
        };
        // Apply filters
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const hasMatch = result.highlights.some(h => h.toLowerCase().includes(term)) ||
                result.categories.some(cat => cat.features.some(f => f.toLowerCase().includes(term)));
            if (!hasMatch)
                continue;
        }
        if (category) {
            const hasCategory = result.categories.some(cat => cat.name.toLowerCase().includes(category.toLowerCase()));
            if (!hasCategory)
                continue;
        }
        results.push(result);
    }
    // Sort by name
    results.sort((a, b) => a.entityName.localeCompare(b.entityName));
    // Calculate summary
    const totalFeatureCount = results.reduce((sum, r) => sum + r.totalFeatures, 0);
    const commonCategories = Object.entries(categoryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    return {
        results,
        summary: {
            totalWithFeatures: results.length,
            averageFeatureCount: results.length > 0 ? Math.round(totalFeatureCount / results.length) : 0,
            commonCategories,
        },
    };
}
/**
 * Compare specific entities side-by-side for a given schema type
 */
async function compareEntities(input) {
    const { entityIds, schemaType } = input;
    // Get entities
    const entities = await client_1.prisma.entity.findMany({
        where: { id: { in: entityIds } },
    });
    // Get extractions for these entities
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entityId: { in: entityIds },
            schemaType,
            status: 'COMPLETED',
        },
        include: {
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Build comparison result
    const comparisonEntities = entities.map(entity => {
        const extraction = extractions.find(e => e.entityId === entity.id);
        return {
            entityId: entity.id,
            entityName: entity.name,
            entityUrl: entity.url,
            hasData: !!extraction,
            data: extraction?.data || null,
            extractedAt: extraction?.extractedAt || null,
            sourceUrl: extraction?.source.url || null,
        };
    });
    return {
        schemaType,
        entities: comparisonEntities,
    };
}
/**
 * Query integration data across all entities in a project
 */
async function queryIntegrations(input) {
    const { projectId, hasApi, hasSdk, searchTerm } = input;
    // Get all integration extractions for the project
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType: 'integrations',
            status: 'COMPLETED',
        },
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity (keep latest)
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Process results
    let results = [];
    const integrationCounts = {};
    for (const ext of latestByEntity.values()) {
        const data = ext.data;
        const categories = (data.categories || []).map((cat) => {
            const integrations = (cat.integrations || []).map((i) => typeof i === 'string' ? i : i.name);
            // Count integrations
            for (const integration of integrations) {
                integrationCounts[integration] = (integrationCounts[integration] || 0) + 1;
            }
            return {
                name: cat.name,
                integrations,
            };
        });
        const result = {
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityUrl: ext.entity.url,
            totalCount: data.totalCount || 0,
            hasApi: data.hasApi || false,
            hasWebhooks: data.hasWebhooks || false,
            hasSdk: data.hasSdk || false,
            sdkLanguages: data.sdkLanguages || [],
            categories,
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
        };
        // Apply filters
        if (hasApi !== undefined && result.hasApi !== hasApi)
            continue;
        if (hasSdk !== undefined && result.hasSdk !== hasSdk)
            continue;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const hasMatch = result.categories.some(cat => cat.integrations.some(i => i.toLowerCase().includes(term)));
            if (!hasMatch)
                continue;
        }
        results.push(result);
    }
    // Sort by name
    results.sort((a, b) => a.entityName.localeCompare(b.entityName));
    // Calculate summary
    const totalIntegrationCount = results.reduce((sum, r) => sum + r.totalCount, 0);
    const commonIntegrations = Object.entries(integrationCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);
    return {
        results,
        summary: {
            totalWithIntegrations: results.length,
            withApi: results.filter(r => r.hasApi).length,
            withSdk: results.filter(r => r.hasSdk).length,
            withWebhooks: results.filter(r => r.hasWebhooks).length,
            averageIntegrationCount: results.length > 0 ? Math.round(totalIntegrationCount / results.length) : 0,
            commonIntegrations,
        },
    };
}
/**
 * Query company data across all entities in a project
 */
async function queryCompanies(input) {
    const { projectId, minFounding, maxFounding } = input;
    // Get all company extractions for the project
    const extractions = await client_1.prisma.extraction.findMany({
        where: {
            entity: { projectId },
            schemaType: 'company',
            status: 'COMPLETED',
        },
        include: {
            entity: true,
            source: true,
        },
        orderBy: { extractedAt: 'desc' },
    });
    // Deduplicate by entity (keep latest)
    const latestByEntity = new Map();
    for (const ext of extractions) {
        if (!latestByEntity.has(ext.entityId)) {
            latestByEntity.set(ext.entityId, ext);
        }
    }
    // Process results
    let results = [];
    const locationCounts = {};
    const foundingYears = [];
    for (const ext of latestByEntity.values()) {
        const data = ext.data;
        // Parse founding year
        let foundingYear = null;
        if (data.founded) {
            const match = data.founded.match(/\d{4}/);
            if (match)
                foundingYear = parseInt(match[0]);
        }
        if (foundingYear)
            foundingYears.push(foundingYear);
        // Count locations
        if (data.headquarters) {
            locationCounts[data.headquarters] = (locationCounts[data.headquarters] || 0) + 1;
        }
        const result = {
            entityId: ext.entityId,
            entityName: ext.entity.name,
            entityUrl: ext.entity.url,
            companyName: data.name || ext.entity.name,
            founded: data.founded || null,
            headquarters: data.headquarters || null,
            employeeCount: data.employeeCount || null,
            totalFunding: data.funding?.totalRaised || null,
            lastRound: data.funding?.lastRound || null,
            extractedAt: ext.extractedAt,
            sourceUrl: ext.source.url,
        };
        // Apply filters
        if (minFounding !== undefined && foundingYear !== null && foundingYear < minFounding)
            continue;
        if (maxFounding !== undefined && foundingYear !== null && foundingYear > maxFounding)
            continue;
        results.push(result);
    }
    // Sort by name
    results.sort((a, b) => a.entityName.localeCompare(b.entityName));
    // Calculate summary
    const headquarterLocations = Object.entries(locationCounts)
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    return {
        results,
        summary: {
            totalWithCompanyInfo: results.length,
            withFunding: results.filter(r => r.totalFunding).length,
            foundingYearRange: {
                earliest: foundingYears.length > 0 ? Math.min(...foundingYears) : null,
                latest: foundingYears.length > 0 ? Math.max(...foundingYears) : null,
            },
            headquarterLocations,
        },
    };
}
//# sourceMappingURL=queries.js.map