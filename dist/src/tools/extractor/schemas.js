"use strict";
/**
 * Extraction Schemas - Zod definitions for structured data extraction
 *
 * These schemas define what data we extract from web pages.
 * Each schema is designed to capture the most valuable, queryable information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMAS = exports.SCHEMA_TYPES = exports.IntegrationsSchema = exports.IntegrationCategorySchema = exports.IntegrationSchema = exports.ComplianceSchema = exports.CertificationSchema = exports.CompanySchema = exports.PersonSchema = exports.FundingInfoSchema = exports.FeaturesSchema = exports.FeatureCategorySchema = exports.FeatureSchema = exports.PricingSchema = exports.PricingTierSchema = void 0;
exports.getSchema = getSchema;
exports.validateExtraction = validateExtraction;
exports.getSchemaDescription = getSchemaDescription;
const zod_1 = require("zod");
// ============================================
// PRICING SCHEMA
// ============================================
exports.PricingTierSchema = zod_1.z.object({
    name: zod_1.z.string().describe('Tier name: Free, Pro, Enterprise, etc.'),
    price: zod_1.z.number().nullable().describe('Price in dollars, null for Contact Sales'),
    billingCycle: zod_1.z.enum(['monthly', 'annual', 'one-time', 'usage-based']),
    pricePerUnit: zod_1.z.string().optional().describe('per user, per seat, per 1000 API calls'),
    features: zod_1.z.array(zod_1.z.string()).describe('Key features included in this tier'),
    limits: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.number()])).optional(),
});
exports.PricingSchema = zod_1.z.object({
    tiers: zod_1.z.array(exports.PricingTierSchema),
    currency: zod_1.z.string().default('USD'),
    billingCycles: zod_1.z.array(zod_1.z.string()).default(['monthly']),
    hasFreeTier: zod_1.z.boolean(),
    hasEnterprise: zod_1.z.boolean(),
    lastUpdated: zod_1.z.string().optional().describe('When pricing was last updated'),
});
// ============================================
// FEATURES SCHEMA
// ============================================
exports.FeatureSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    availability: zod_1.z.string().optional().describe('all, pro+, enterprise'),
    isNew: zod_1.z.boolean().optional(),
});
exports.FeatureCategorySchema = zod_1.z.object({
    name: zod_1.z.string().describe('Category: AI Capabilities, Integrations, Security'),
    features: zod_1.z.array(exports.FeatureSchema),
});
exports.FeaturesSchema = zod_1.z.object({
    categories: zod_1.z.array(exports.FeatureCategorySchema),
    highlights: zod_1.z.array(zod_1.z.string()).describe('Top 3-5 headline features'),
});
// ============================================
// COMPANY SCHEMA
// ============================================
exports.FundingInfoSchema = zod_1.z.object({
    totalRaised: zod_1.z.string().optional().describe('$50M format'),
    lastRound: zod_1.z.string().optional().describe('Series A, Series B, Seed'),
    lastRoundAmount: zod_1.z.string().optional(),
    lastRoundDate: zod_1.z.string().optional(),
    investors: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.PersonSchema = zod_1.z.object({
    name: zod_1.z.string(),
    role: zod_1.z.string(),
    linkedIn: zod_1.z.string().optional(),
});
exports.CompanySchema = zod_1.z.object({
    name: zod_1.z.string(),
    legalName: zod_1.z.string().optional(),
    founded: zod_1.z.string().optional().describe('Year or date'),
    headquarters: zod_1.z.string().optional().describe('City, Country'),
    employeeCount: zod_1.z.string().optional().describe('50-100, 500+'),
    funding: exports.FundingInfoSchema.optional(),
    leadership: zod_1.z.array(exports.PersonSchema).optional(),
    socialLinks: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
// ============================================
// COMPLIANCE SCHEMA
// ============================================
exports.CertificationSchema = zod_1.z.object({
    name: zod_1.z.string().describe('SOC 2 Type II, ISO 27001, FedRAMP'),
    status: zod_1.z.enum(['certified', 'in_progress', 'planned', 'unknown']),
    validUntil: zod_1.z.string().optional(),
    documentUrl: zod_1.z.string().optional(),
});
exports.ComplianceSchema = zod_1.z.object({
    certifications: zod_1.z.array(exports.CertificationSchema),
    securityFeatures: zod_1.z.array(zod_1.z.string()),
    dataResidency: zod_1.z.array(zod_1.z.string()).optional().describe('US, EU, Custom'),
    gdprCompliant: zod_1.z.boolean().optional(),
    hipaaCompliant: zod_1.z.boolean().optional(),
    soc2: zod_1.z.boolean().optional(),
    fedRampStatus: zod_1.z.string().optional().describe('Authorized, In Process, None'),
});
// ============================================
// INTEGRATIONS SCHEMA
// ============================================
exports.IntegrationSchema = zod_1.z.object({
    name: zod_1.z.string().describe('GitHub, VS Code, Slack'),
    type: zod_1.z.enum(['native', 'plugin', 'api', 'webhook']),
    docsUrl: zod_1.z.string().optional(),
});
exports.IntegrationCategorySchema = zod_1.z.object({
    name: zod_1.z.string().describe('CI/CD, IDEs, Cloud Providers'),
    integrations: zod_1.z.array(exports.IntegrationSchema),
});
exports.IntegrationsSchema = zod_1.z.object({
    categories: zod_1.z.array(exports.IntegrationCategorySchema),
    totalCount: zod_1.z.number(),
    hasApi: zod_1.z.boolean(),
    apiDocUrl: zod_1.z.string().optional(),
    hasWebhooks: zod_1.z.boolean(),
    hasSdk: zod_1.z.boolean(),
    sdkLanguages: zod_1.z.array(zod_1.z.string()).optional(),
});
// ============================================
// SCHEMA REGISTRY
// ============================================
exports.SCHEMA_TYPES = ['pricing', 'features', 'company', 'compliance', 'integrations'];
exports.SCHEMAS = {
    pricing: exports.PricingSchema,
    features: exports.FeaturesSchema,
    company: exports.CompanySchema,
    compliance: exports.ComplianceSchema,
    integrations: exports.IntegrationsSchema,
};
function getSchema(schemaType) {
    return exports.SCHEMAS[schemaType];
}
function validateExtraction(schemaType, data) {
    const schema = getSchema(schemaType);
    return schema.parse(data);
}
// ============================================
// LLM PROMPT HELPERS
// ============================================
function getSchemaDescription(schemaType) {
    const descriptions = {
        pricing: `Extract pricing information:
- List all pricing tiers with names, prices, and billing cycles
- Note if there's a free tier
- Note if there's enterprise/custom pricing
- Include key features and limits for each tier`,
        features: `Extract product features:
- Group features by category (AI, Security, Integrations, etc.)
- List the top 3-5 headline features
- Note which features are available in which tiers`,
        company: `Extract company information:
- Company name and legal name
- Founded date and headquarters
- Employee count range
- Funding information (total raised, last round, investors)
- Leadership team with roles`,
        compliance: `Extract security and compliance information:
- List all certifications (SOC 2, ISO 27001, FedRAMP, etc.)
- Note certification status (certified, in progress, planned)
- Data residency options
- GDPR, HIPAA compliance status
- Security features mentioned`,
        integrations: `Extract integration information:
- List all integrations grouped by category
- Note if they have a public API
- Note if they have webhooks
- List SDK languages if available
- Count total number of integrations`,
    };
    return descriptions[schemaType];
}
//# sourceMappingURL=schemas.js.map