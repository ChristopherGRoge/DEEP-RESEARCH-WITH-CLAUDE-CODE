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

export const ComplianceSchema = z.object({
  certifications: z.array(CertificationSchema),
  securityFeatures: z.array(z.string()),
  dataResidency: z.array(z.string()).optional().describe('US, EU, Custom'),
  gdprCompliant: z.boolean().optional(),
  hipaaCompliant: z.boolean().optional(),
  soc2: z.boolean().optional(),
  fedRampStatus: z.string().optional().describe('Authorized, In Process, None'),
});

export type ComplianceData = z.infer<typeof ComplianceSchema>;

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
// SCHEMA REGISTRY
// ============================================

export const SCHEMA_TYPES = ['pricing', 'features', 'company', 'compliance', 'integrations'] as const;
export type SchemaType = typeof SCHEMA_TYPES[number];

export const SCHEMAS: Record<SchemaType, z.ZodSchema> = {
  pricing: PricingSchema,
  features: FeaturesSchema,
  company: CompanySchema,
  compliance: ComplianceSchema,
  integrations: IntegrationsSchema,
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
