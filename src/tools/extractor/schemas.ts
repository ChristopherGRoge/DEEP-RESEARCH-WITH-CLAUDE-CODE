/**
 * Extraction Schemas - Zod definitions for structured data extraction
 *
 * These schemas define what data we extract from web pages.
 * Each schema is designed to capture the most valuable, queryable information.
 */

import { z } from 'zod';

// ============================================
// PRICING SCHEMA
// ============================================

export const PricingTierSchema = z.object({
  name: z.string().describe('Tier name: Free, Pro, Enterprise, etc.'),
  price: z.number().nullable().describe('Price in dollars, null for Contact Sales'),
  billingCycle: z.enum(['monthly', 'annual', 'one-time', 'usage-based']),
  pricePerUnit: z.string().optional().describe('per user, per seat, per 1000 API calls'),
  features: z.array(z.string()).describe('Key features included in this tier'),
  limits: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export const PricingSchema = z.object({
  tiers: z.array(PricingTierSchema),
  currency: z.string().default('USD'),
  billingCycles: z.array(z.string()).default(['monthly']),
  hasFreeTier: z.boolean(),
  hasEnterprise: z.boolean(),
  lastUpdated: z.string().optional().describe('When pricing was last updated'),
});

export type PricingData = z.infer<typeof PricingSchema>;

// ============================================
// FEATURES SCHEMA
// ============================================

export const FeatureSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  availability: z.string().optional().describe('all, pro+, enterprise'),
  isNew: z.boolean().optional(),
});

export const FeatureCategorySchema = z.object({
  name: z.string().describe('Category: AI Capabilities, Integrations, Security'),
  features: z.array(FeatureSchema),
});

export const FeaturesSchema = z.object({
  categories: z.array(FeatureCategorySchema),
  highlights: z.array(z.string()).describe('Top 3-5 headline features'),
});

export type FeaturesData = z.infer<typeof FeaturesSchema>;

// ============================================
// COMPANY SCHEMA
// ============================================

export const FundingInfoSchema = z.object({
  totalRaised: z.string().optional().describe('$50M format'),
  lastRound: z.string().optional().describe('Series A, Series B, Seed'),
  lastRoundAmount: z.string().optional(),
  lastRoundDate: z.string().optional(),
  investors: z.array(z.string()).optional(),
});

export const PersonSchema = z.object({
  name: z.string(),
  role: z.string(),
  linkedIn: z.string().optional(),
});

export const CompanySchema = z.object({
  name: z.string(),
  legalName: z.string().optional(),
  founded: z.string().optional().describe('Year or date'),
  headquarters: z.string().optional().describe('City, Country'),
  employeeCount: z.string().optional().describe('50-100, 500+'),
  funding: FundingInfoSchema.optional(),
  leadership: z.array(PersonSchema).optional(),
  socialLinks: z.record(z.string(), z.string()).optional(),
});

export type CompanyData = z.infer<typeof CompanySchema>;

// ============================================
// COMPLIANCE SCHEMA
// ============================================

export const CertificationSchema = z.object({
  name: z.string().describe('SOC 2 Type II, ISO 27001, FedRAMP'),
  status: z.enum(['certified', 'in_progress', 'planned', 'unknown']),
  validUntil: z.string().optional(),
  documentUrl: z.string().optional(),
});

/**
 * Federal Compliance Pathway - captures how an entity can achieve
 * federal compliance, including inherited authorization through
 * cloud providers.
 */
export const FederalPathwaySchema = z.object({
  pathway: z.enum([
    'direct_fedramp',      // Entity itself holds FedRAMP ATO
    'inherited_aws',       // Via AWS GovCloud/Bedrock
    'inherited_azure',     // Via Azure Government
    'inherited_gcp',       // Via Google Cloud FedRAMP regions
    'air_gapped',          // Fully disconnected deployment
    'private_link',        // Private network path (PrivateLink, VPC)
    'on_premise',          // Self-hosted on customer infrastructure
    'hybrid',              // Combination of approaches
  ]).describe('Type of federal compliance pathway'),
  status: z.enum(['available', 'in_progress', 'planned', 'unavailable', 'unknown']),
  provider: z.string().optional().describe('Cloud provider or service name'),
  authLevel: z.string().optional().describe('FedRAMP High, FedRAMP Moderate, IL4, IL5, StateRAMP'),
  regions: z.array(z.string()).optional().describe('Specific regions: us-gov-west-1, etc.'),
  notes: z.string().optional().describe('Additional context or limitations'),
});

export const ComplianceSchema = z.object({
  certifications: z.array(CertificationSchema),
  securityFeatures: z.array(z.string()),
  dataResidency: z.array(z.string()).optional().describe('US, EU, Custom'),
  gdprCompliant: z.boolean().optional(),
  hipaaCompliant: z.boolean().optional(),
  soc2: z.boolean().optional(),
  fedRampStatus: z.string().optional().describe('Authorized, In Process, None'),

  // Federal Viability Assessment
  federalPathways: z.array(FederalPathwaySchema).optional().describe('All available federal compliance pathways'),
  federalViabilityScore: z.number().min(0).max(1).optional().describe('Composite score 0.0-1.0'),
  federalViabilityLevel: z.enum(['GREEN', 'YELLOW', 'ORANGE', 'RED']).optional(),
  federalViabilityNotes: z.string().optional().describe('Summary of federal readiness'),
});

export type ComplianceData = z.infer<typeof ComplianceSchema>;
export type FederalPathwayData = z.infer<typeof FederalPathwaySchema>;

// ============================================
// INTEGRATIONS SCHEMA
// ============================================

export const IntegrationSchema = z.object({
  name: z.string().describe('GitHub, VS Code, Slack'),
  type: z.enum(['native', 'plugin', 'api', 'webhook']),
  docsUrl: z.string().optional(),
});

export const IntegrationCategorySchema = z.object({
  name: z.string().describe('CI/CD, IDEs, Cloud Providers'),
  integrations: z.array(IntegrationSchema),
});

export const IntegrationsSchema = z.object({
  categories: z.array(IntegrationCategorySchema),
  totalCount: z.number(),
  hasApi: z.boolean(),
  apiDocUrl: z.string().optional(),
  hasWebhooks: z.boolean(),
  hasSdk: z.boolean(),
  sdkLanguages: z.array(z.string()).optional(),
});

export type IntegrationsData = z.infer<typeof IntegrationsSchema>;

// ============================================
// DIFFERENTIATORS SCHEMA
// ============================================

/**
 * Captures features with competitive differentiation context.
 * This schema goes beyond basic feature listing to identify
 * what makes an entity UNIQUE vs competitors.
 */

export const DifferentiatingFeatureSchema = z.object({
  name: z.string().describe('Feature name'),
  description: z.string().describe('What this feature does'),
  evidenceSource: z.string().optional().describe('URL or screenshot path'),
  comparedTo: z.array(z.string()).optional().describe('How competitors compare: "Copilot: 8k tokens", "Cursor: 128k tokens"'),
});

export const LaggingFeatureSchema = z.object({
  name: z.string().describe('Feature name'),
  reason: z.string().describe('Why this is lagging vs competitors'),
  competitors: z.array(z.string()).optional().describe('Which competitors do it better'),
});

export const MissingFeatureSchema = z.object({
  name: z.string().describe('Feature that competitors have but this entity lacks'),
  competitors: z.array(z.string()).describe('Which competitors have this feature'),
  importance: z.enum(['critical', 'important', 'nice-to-have']).optional(),
});

export const DifferentiatorsSchema = z.object({
  // Features ONLY this entity has
  uniqueFeatures: z.array(DifferentiatingFeatureSchema).describe('Features only this entity has - true differentiators'),

  // Features where this entity leads the market
  leadingFeatures: z.array(DifferentiatingFeatureSchema).describe('Features where this entity is best-in-class'),

  // Standard features everyone has
  tableStakes: z.array(z.string()).describe('Features that are industry standard - not differentiating'),

  // Features where competitors are better
  laggingFeatures: z.array(LaggingFeatureSchema).optional().describe('Features where competitors are better'),

  // Features competitors have that this entity lacks
  missingFeatures: z.array(MissingFeatureSchema).optional().describe('Features competitors have that this entity lacks'),

  // Competitive context
  primaryCompetitors: z.array(z.string()).describe('2-4 direct competitors used for comparison'),

  // Summary
  differentiationSummary: z.string().describe('1-2 sentence summary of what makes this entity unique'),
});

export type DifferentiatorsData = z.infer<typeof DifferentiatorsSchema>;

// ============================================
// SCHEMA REGISTRY
// ============================================

export const SCHEMA_TYPES = ['pricing', 'features', 'company', 'compliance', 'integrations', 'differentiators'] as const;
export type SchemaType = typeof SCHEMA_TYPES[number];

export const SCHEMAS: Record<SchemaType, z.ZodSchema> = {
  pricing: PricingSchema,
  features: FeaturesSchema,
  company: CompanySchema,
  compliance: ComplianceSchema,
  integrations: IntegrationsSchema,
  differentiators: DifferentiatorsSchema,
};

export function getSchema(schemaType: SchemaType): z.ZodSchema {
  return SCHEMAS[schemaType];
}

export function validateExtraction<T>(schemaType: SchemaType, data: unknown): T {
  const schema = getSchema(schemaType);
  return schema.parse(data) as T;
}

// ============================================
// LLM PROMPT HELPERS
// ============================================

export function getSchemaDescription(schemaType: SchemaType): string {
  const descriptions: Record<SchemaType, string> = {
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
