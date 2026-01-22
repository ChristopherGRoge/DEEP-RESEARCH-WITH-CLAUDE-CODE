"use strict";
/**
 * Extraction Schemas - Zod definitions for structured data extraction
 *
 * These schemas define what data we extract from web pages.
 * Each schema is designed to capture the most valuable, queryable information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMAS = exports.SCHEMA_TYPES = exports.DifferentiatorsSchema = exports.MissingFeatureSchema = exports.LaggingFeatureSchema = exports.DifferentiatingFeatureSchema = exports.IntegrationsSchema = exports.IntegrationCategorySchema = exports.IntegrationSchema = exports.ComplianceSchema = exports.FederalPathwaySchema = exports.CertificationSchema = exports.CompanySchema = exports.PersonSchema = exports.FundingInfoSchema = exports.FeaturesSchema = exports.FeatureCategorySchema = exports.FeatureSchema = exports.PricingSchema = exports.PricingTierSchema = void 0;
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
/**
 * Federal Compliance Pathway - captures how an entity can achieve
 * federal compliance, including inherited authorization through
 * cloud providers.
 */
exports.FederalPathwaySchema = zod_1.z.object({
    pathway: zod_1.z.enum([
        'direct_fedramp', // Entity itself holds FedRAMP ATO
        'inherited_aws', // Via AWS GovCloud/Bedrock
        'inherited_azure', // Via Azure Government
        'inherited_gcp', // Via Google Cloud FedRAMP regions
        'air_gapped', // Fully disconnected deployment
        'private_link', // Private network path (PrivateLink, VPC)
        'on_premise', // Self-hosted on customer infrastructure
        'hybrid', // Combination of approaches
    ]).describe('Type of federal compliance pathway'),
    status: zod_1.z.enum(['available', 'in_progress', 'planned', 'unavailable', 'unknown']),
    provider: zod_1.z.string().optional().describe('Cloud provider or service name'),
    authLevel: zod_1.z.string().optional().describe('FedRAMP High, FedRAMP Moderate, IL4, IL5, StateRAMP'),
    regions: zod_1.z.array(zod_1.z.string()).optional().describe('Specific regions: us-gov-west-1, etc.'),
    notes: zod_1.z.string().optional().describe('Additional context or limitations'),
});
exports.ComplianceSchema = zod_1.z.object({
    certifications: zod_1.z.array(exports.CertificationSchema),
    securityFeatures: zod_1.z.array(zod_1.z.string()),
    dataResidency: zod_1.z.array(zod_1.z.string()).optional().describe('US, EU, Custom'),
    gdprCompliant: zod_1.z.boolean().optional(),
    hipaaCompliant: zod_1.z.boolean().optional(),
    soc2: zod_1.z.boolean().optional(),
    fedRampStatus: zod_1.z.string().optional().describe('Authorized, In Process, None'),
    // Federal Viability Assessment
    federalPathways: zod_1.z.array(exports.FederalPathwaySchema).optional().describe('All available federal compliance pathways'),
    federalViabilityScore: zod_1.z.number().min(0).max(1).optional().describe('Composite score 0.0-1.0'),
    federalViabilityLevel: zod_1.z.enum(['GREEN', 'YELLOW', 'ORANGE', 'RED']).optional(),
    federalViabilityNotes: zod_1.z.string().optional().describe('Summary of federal readiness'),
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
// DIFFERENTIATORS SCHEMA
// ============================================
/**
 * Captures features with competitive differentiation context.
 * This schema goes beyond basic feature listing to identify
 * what makes an entity UNIQUE vs competitors.
 */
exports.DifferentiatingFeatureSchema = zod_1.z.object({
    name: zod_1.z.string().describe('Feature name'),
    description: zod_1.z.string().describe('What this feature does'),
    evidenceSource: zod_1.z.string().optional().describe('URL or screenshot path'),
    comparedTo: zod_1.z.array(zod_1.z.string()).optional().describe('How competitors compare: "Copilot: 8k tokens", "Cursor: 128k tokens"'),
});
exports.LaggingFeatureSchema = zod_1.z.object({
    name: zod_1.z.string().describe('Feature name'),
    reason: zod_1.z.string().describe('Why this is lagging vs competitors'),
    competitors: zod_1.z.array(zod_1.z.string()).optional().describe('Which competitors do it better'),
});
exports.MissingFeatureSchema = zod_1.z.object({
    name: zod_1.z.string().describe('Feature that competitors have but this entity lacks'),
    competitors: zod_1.z.array(zod_1.z.string()).describe('Which competitors have this feature'),
    importance: zod_1.z.enum(['critical', 'important', 'nice-to-have']).optional(),
});
exports.DifferentiatorsSchema = zod_1.z.object({
    // Features ONLY this entity has
    uniqueFeatures: zod_1.z.array(exports.DifferentiatingFeatureSchema).describe('Features only this entity has - true differentiators'),
    // Features where this entity leads the market
    leadingFeatures: zod_1.z.array(exports.DifferentiatingFeatureSchema).describe('Features where this entity is best-in-class'),
    // Standard features everyone has
    tableStakes: zod_1.z.array(zod_1.z.string()).describe('Features that are industry standard - not differentiating'),
    // Features where competitors are better
    laggingFeatures: zod_1.z.array(exports.LaggingFeatureSchema).optional().describe('Features where competitors are better'),
    // Features competitors have that this entity lacks
    missingFeatures: zod_1.z.array(exports.MissingFeatureSchema).optional().describe('Features competitors have that this entity lacks'),
    // Competitive context
    primaryCompetitors: zod_1.z.array(zod_1.z.string()).describe('2-4 direct competitors used for comparison'),
    // Summary
    differentiationSummary: zod_1.z.string().describe('1-2 sentence summary of what makes this entity unique'),
});
// ============================================
// SCHEMA REGISTRY
// ============================================
exports.SCHEMA_TYPES = ['pricing', 'features', 'company', 'compliance', 'integrations', 'differentiators'];
exports.SCHEMAS = {
    pricing: exports.PricingSchema,
    features: exports.FeaturesSchema,
    company: exports.CompanySchema,
    compliance: exports.ComplianceSchema,
    integrations: exports.IntegrationsSchema,
    differentiators: exports.DifferentiatorsSchema,
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
- Security features mentioned

CRITICAL - Federal Viability Assessment:
Federal compliance is NOT binary. Evaluate ALL pathways to federal viability:
- Direct FedRAMP: Does the entity itself hold FedRAMP ATO?
- Inherited via AWS: Can it deploy on AWS GovCloud or access via Amazon Bedrock?
- Inherited via Azure: Can it deploy on Azure Government?
- Inherited via GCP: Can it deploy on Google Cloud FedRAMP regions or Vertex AI?
- Air-Gapped/On-Premise: Does it offer fully disconnected self-hosted deployment?
- Private Link/VPC: Can it be accessed via private network paths?

For each pathway found, note:
- Status: available, in_progress, planned, or unavailable
- Provider name (AWS, Azure, GCP, etc.)
- Authorization level (FedRAMP High, Moderate, IL4, IL5, StateRAMP)
- Specific regions if mentioned (us-gov-west-1, etc.)

Calculate federalViabilityScore (0.0-1.0):
- GREEN (0.75-1.0): Direct FedRAMP OR multiple inherited pathways
- YELLOW (0.5-0.74): One inherited pathway available
- ORANGE (0.25-0.49): Pathway in progress or planned
- RED (0.0-0.24): No viable federal pathway identified`,
        integrations: `Extract integration information:
- List all integrations grouped by category
- Note if they have a public API
- Note if they have webhooks
- List SDK languages if available
- Count total number of integrations`,
        differentiators: `Extract competitive differentiation:
- Identify 2-4 primary competitors in the same category
- List UNIQUE features that ONLY this entity has (true differentiators)
- List features where this entity LEADS the market (best-in-class)
- List TABLE STAKES features everyone has (not differentiating)
- List features where this entity LAGS competitors
- List features competitors have that this entity is MISSING
- For leading/lagging features, note specific comparisons (e.g., "2M token context vs Copilot's 8k")
- Write a 1-2 sentence differentiation summary

Focus on what makes this entity DIFFERENT, not just what it does.`,
    };
    return descriptions[schemaType];
}
//# sourceMappingURL=schemas.js.map