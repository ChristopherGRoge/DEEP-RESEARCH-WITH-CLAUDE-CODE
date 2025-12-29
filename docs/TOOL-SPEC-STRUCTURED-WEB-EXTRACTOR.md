# Structured Web Extractor - Tool Specification

## Overview

The **Structured Web Extractor** is a CLI tool that fetches web pages, extracts structured data according to predefined schemas, captures visual evidence, and persists findings to the research database.

### Problem Statement

Current research workflow limitations:
1. **Unstructured claims** - "Pricing starts at $20/month" is text, not queryable data
2. **No source verification** - URLs are stored but never validated
3. **No visual evidence** - Prices and features change; no point-in-time proof
4. **Manual extraction** - Agents spend excessive cycles parsing web pages

### Solution

A single tool that:
- Fetches and validates URLs
- Extracts data into predefined schemas (pricing, features, etc.)
- Captures screenshots as evidence
- Persists structured data + assertions to the database

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLI Interface                                │
│  npm run cli -- extract:pricing '{"url": "...", "entityId": "..."}'
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Extraction Engine                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ URL Fetcher │  │ LLM Parser  │  │ Screenshot  │              │
│  │ (Playwright)│  │ (Claude)    │  │ Capture     │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Schema Validators                            │
│  - PricingSchema    - FeatureSchema    - CompanySchema          │
│  - IntegrationSchema - ComplianceSchema - CustomSchema          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Persistence Layer                            │
│  - StructuredData table (new)                                    │
│  - Assertions (auto-generated from extracted data)               │
│  - Sources (validated and linked)                                │
│  - Screenshots (stored as files, paths in DB)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema Extensions

### New Model: StructuredData

```prisma
/// Structured data extracted from sources
model StructuredData {
  id            String   @id @default(cuid())
  schemaType    String   // "pricing", "features", "company", "compliance", "custom"
  data          Json     // The structured data conforming to schema
  extractedAt   DateTime @default(now())
  expiresAt     DateTime? // When this data should be re-extracted
  confidence    Float?   // LLM confidence in extraction (0-1)

  entityId      String
  entity        Entity   @relation(fields: [entityId], references: [id], onDelete: Cascade)

  sourceId      String
  source        Source   @relation(fields: [sourceId], references: [id])

  screenshotId  String?
  screenshot    Screenshot? @relation(fields: [screenshotId], references: [id])

  @@map("structured_data")
}

/// Screenshot evidence
model Screenshot {
  id          String   @id @default(cuid())
  filePath    String   // Local path to screenshot file
  url         String   // URL that was captured
  capturedAt  DateTime @default(now())
  width       Int?
  height      Int?

  structuredData StructuredData[]

  @@map("screenshots")
}
```

### Source Model Extension

```prisma
model Source {
  // ... existing fields ...

  // New fields
  lastFetchedAt   DateTime?  // When URL was last successfully fetched
  lastStatusCode  Int?       // HTTP status code from last fetch
  contentHash     String?    // Hash of page content for change detection
  isAccessible    Boolean    @default(true) // Whether URL is currently accessible

  structuredData  StructuredData[]
}
```

---

## Predefined Schemas

### 1. PricingSchema

```typescript
interface PricingSchema {
  tiers: PricingTier[];
  currency: string;           // "USD", "EUR", etc.
  billingCycles: string[];    // ["monthly", "annual"]
  hasFreeTier: boolean;
  hasEnterprise: boolean;
  lastUpdated?: string;       // Date pricing was last updated on source
}

interface PricingTier {
  name: string;               // "Free", "Pro", "Enterprise"
  price: number | null;       // null for "Contact Sales"
  billingCycle: string;       // "monthly", "annual", "one-time"
  pricePerUnit?: string;      // "per user", "per seat", "per 1000 API calls"
  features: string[];         // Key features in this tier
  limits?: Record<string, string | number>; // "users": 5, "storage": "10GB"
}
```

### 2. FeatureSchema

```typescript
interface FeatureSchema {
  categories: FeatureCategory[];
  highlights: string[];       // Top 3-5 headline features
  lastUpdated?: string;
}

interface FeatureCategory {
  name: string;               // "AI Capabilities", "Integrations", "Security"
  features: Feature[];
}

interface Feature {
  name: string;
  description?: string;
  availability?: string;      // "all", "pro+", "enterprise"
  isNew?: boolean;            // Recently added feature
}
```

### 3. CompanySchema

```typescript
interface CompanySchema {
  name: string;
  legalName?: string;
  founded?: string;           // Year or date
  headquarters?: string;      // City, Country
  employeeCount?: string;     // "50-100", "500+", etc.
  funding?: FundingInfo;
  leadership?: Person[];
  socialLinks?: Record<string, string>;
}

interface FundingInfo {
  totalRaised?: string;       // "$50M"
  lastRound?: string;         // "Series B"
  lastRoundAmount?: string;   // "$30M"
  lastRoundDate?: string;
  investors?: string[];
}

interface Person {
  name: string;
  role: string;
  linkedIn?: string;
}
```

### 4. ComplianceSchema

```typescript
interface ComplianceSchema {
  certifications: Certification[];
  securityFeatures: string[];
  dataResidency?: string[];   // ["US", "EU", "Custom"]
  gdprCompliant?: boolean;
  hipaaCompliant?: boolean;
  soc2?: boolean;
  fedRampStatus?: string;     // "Authorized", "In Process", "None"
}

interface Certification {
  name: string;               // "SOC 2 Type II", "ISO 27001"
  status: string;             // "certified", "in_progress", "planned"
  validUntil?: string;
  documentUrl?: string;
}
```

### 5. IntegrationSchema

```typescript
interface IntegrationSchema {
  categories: IntegrationCategory[];
  totalCount: number;
  hasApi: boolean;
  apiDocUrl?: string;
  hasWebhooks: boolean;
  hasSdk: boolean;
  sdkLanguages?: string[];
}

interface IntegrationCategory {
  name: string;               // "CI/CD", "IDEs", "Cloud Providers"
  integrations: Integration[];
}

interface Integration {
  name: string;               // "GitHub", "VS Code"
  type: string;               // "native", "plugin", "api"
  docsUrl?: string;
}
```

### 6. CustomSchema

```typescript
interface CustomSchema {
  schemaDefinition: Record<string, SchemaField>;
  extractedData: Record<string, unknown>;
}

interface SchemaField {
  type: "string" | "number" | "boolean" | "array" | "object";
  description: string;
  required?: boolean;
  arrayItemType?: string;
}
```

---

## CLI Commands

### extract:pricing

Extract pricing information from a URL.

```bash
npm run cli -- extract:pricing '{
  "url": "https://cursor.com/pricing",
  "entityId": "cmjkbtkzm0000j7tu9625advu",
  "screenshot": true,
  "createAssertions": true
}'
```

**Input:**
```typescript
interface ExtractPricingInput {
  url: string;              // URL to extract from
  entityId: string;         // Entity to associate data with
  screenshot?: boolean;     // Capture screenshot (default: true)
  createAssertions?: boolean; // Auto-create assertions (default: true)
  expiresInDays?: number;   // When to re-extract (default: 30)
}
```

**Output:**
```typescript
interface ExtractPricingOutput {
  success: boolean;
  structuredDataId: string;
  data: PricingSchema;
  screenshotPath?: string;
  assertionsCreated?: string[]; // IDs of created assertions
  sourceValidated: boolean;
  confidence: number;
}
```

### extract:features

```bash
npm run cli -- extract:features '{
  "url": "https://cursor.com/features",
  "entityId": "cmjkbtkzm0000j7tu9625advu"
}'
```

### extract:company

```bash
npm run cli -- extract:company '{
  "url": "https://cursor.com/about",
  "entityId": "cmjkbtkzm0000j7tu9625advu"
}'
```

### extract:compliance

```bash
npm run cli -- extract:compliance '{
  "url": "https://cursor.com/security",
  "entityId": "cmjkbtkzm0000j7tu9625advu"
}'
```

### extract:integrations

```bash
npm run cli -- extract:integrations '{
  "url": "https://cursor.com/integrations",
  "entityId": "cmjkbtkzm0000j7tu9625advu"
}'
```

### extract:custom

Extract using a custom schema definition.

```bash
npm run cli -- extract:custom '{
  "url": "https://example.com/page",
  "entityId": "...",
  "schema": {
    "productName": {"type": "string", "description": "Name of the product"},
    "releaseDate": {"type": "string", "description": "When product was released"},
    "platforms": {"type": "array", "description": "Supported platforms", "arrayItemType": "string"}
  }
}'
```

### extract:validate

Validate a source URL without extracting data.

```bash
npm run cli -- extract:validate '{
  "url": "https://cursor.com/pricing"
}'
```

**Output:**
```typescript
interface ValidateOutput {
  url: string;
  isAccessible: boolean;
  statusCode: number;
  redirectUrl?: string;
  contentType: string;
  lastModified?: string;
  contentHash: string;
}
```

### extract:screenshot

Capture a screenshot without extraction.

```bash
npm run cli -- extract:screenshot '{
  "url": "https://cursor.com/pricing",
  "fullPage": true,
  "selector": "#pricing-table"
}'
```

### extract:refresh

Re-extract data for entities with expired structured data.

```bash
npm run cli -- extract:refresh '{
  "projectId": "cmjkbj8n00000b5tuv300a826",
  "schemaType": "pricing"
}'
```

---

## Implementation Details

### Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| URL Fetching | Playwright | Handles JavaScript-rendered content, screenshots |
| LLM Parsing | Claude API (Haiku) | Cost-effective structured extraction |
| Schema Validation | Zod | Runtime type checking and validation |
| Screenshot Storage | Local filesystem | Simple, can migrate to S3 later |
| Caching | File-based MD5 hash | Avoid re-fetching unchanged pages |

### Extraction Pipeline

```typescript
async function extractStructuredData(input: ExtractInput): Promise<ExtractOutput> {
  // 1. Validate and fetch URL
  const fetchResult = await fetchUrl(input.url);
  if (!fetchResult.success) {
    return { success: false, error: fetchResult.error };
  }

  // 2. Update source validation status
  await updateSourceStatus(input.url, fetchResult);

  // 3. Capture screenshot if requested
  let screenshotPath: string | undefined;
  if (input.screenshot) {
    screenshotPath = await captureScreenshot(input.url, input.screenshotOptions);
  }

  // 4. Extract structured data using LLM
  const extractedData = await extractWithLLM({
    html: fetchResult.html,
    schemaType: input.schemaType,
    schema: input.schema,
  });

  // 5. Validate extracted data against schema
  const validatedData = validateSchema(extractedData, input.schemaType);

  // 6. Persist to database
  const structuredDataId = await persistStructuredData({
    entityId: input.entityId,
    schemaType: input.schemaType,
    data: validatedData,
    sourceUrl: input.url,
    screenshotPath,
    confidence: extractedData.confidence,
  });

  // 7. Auto-generate assertions if requested
  let assertionIds: string[] = [];
  if (input.createAssertions) {
    assertionIds = await createAssertionsFromData(
      input.entityId,
      input.schemaType,
      validatedData,
      input.url
    );
  }

  return {
    success: true,
    structuredDataId,
    data: validatedData,
    screenshotPath,
    assertionsCreated: assertionIds,
    sourceValidated: true,
    confidence: extractedData.confidence,
  };
}
```

### LLM Extraction Prompt

```typescript
const EXTRACTION_SYSTEM_PROMPT = `You are a structured data extraction agent.
Given HTML content and a schema, extract the relevant information.

Rules:
1. Only extract information explicitly present in the content
2. Use null for missing fields, never hallucinate
3. Include exact quotes as evidence for key claims
4. Rate your confidence (0-1) for each extraction
5. Note any ambiguities or uncertainties

Output JSON matching the provided schema exactly.`;

async function extractWithLLM(input: {
  html: string;
  schemaType: string;
  schema?: Record<string, SchemaField>;
}): Promise<{ data: unknown; confidence: number; quotes: string[] }> {
  const schema = input.schema || PREDEFINED_SCHEMAS[input.schemaType];

  const response = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 4096,
    system: EXTRACTION_SYSTEM_PROMPT,
    messages: [{
      role: "user",
      content: `Extract data from this HTML according to the schema.

Schema: ${JSON.stringify(schema, null, 2)}

HTML Content:
${truncateHtml(input.html, 50000)}

Respond with JSON: { "data": {...}, "confidence": 0.0-1.0, "quotes": [...] }`
    }]
  });

  return parseExtraction(response);
}
```

### Assertion Generation

```typescript
function createAssertionsFromPricing(
  entityId: string,
  pricing: PricingSchema,
  sourceUrl: string
): AssertionInput[] {
  const assertions: AssertionInput[] = [];

  // Free tier assertion
  if (pricing.hasFreeTier) {
    const freeTier = pricing.tiers.find(t => t.price === 0);
    assertions.push({
      entityId,
      claim: `Offers a free tier${freeTier?.limits ? ` with limits: ${JSON.stringify(freeTier.limits)}` : ''}`,
      category: 'pricing',
      sourceUrl,
    });
  }

  // Paid tier assertions
  for (const tier of pricing.tiers.filter(t => t.price && t.price > 0)) {
    assertions.push({
      entityId,
      claim: `${tier.name} plan costs $${tier.price}/${tier.billingCycle}${tier.pricePerUnit ? ` ${tier.pricePerUnit}` : ''}`,
      category: 'pricing',
      sourceUrl,
    });
  }

  // Enterprise assertion
  if (pricing.hasEnterprise) {
    assertions.push({
      entityId,
      claim: 'Offers enterprise pricing (contact sales)',
      category: 'pricing',
      sourceUrl,
    });
  }

  return assertions;
}
```

---

## File Structure

```
src/
├── cli.ts                    # Updated with extract:* commands
├── tools/
│   ├── index.ts              # Export extractor tools
│   ├── extractor/
│   │   ├── index.ts          # Main extraction engine
│   │   ├── fetcher.ts        # Playwright URL fetching
│   │   ├── llm-parser.ts     # Claude extraction logic
│   │   ├── screenshot.ts     # Screenshot capture
│   │   ├── schemas/
│   │   │   ├── index.ts      # Schema exports
│   │   │   ├── pricing.ts    # PricingSchema + validator
│   │   │   ├── features.ts   # FeatureSchema + validator
│   │   │   ├── company.ts    # CompanySchema + validator
│   │   │   ├── compliance.ts # ComplianceSchema + validator
│   │   │   └── integrations.ts
│   │   ├── assertions.ts     # Auto-assertion generation
│   │   └── persistence.ts    # DB operations for structured data
├── db/
│   └── client.ts
screenshots/                   # Screenshot storage
├── 2025-12/
│   ├── cursor-pricing-abc123.png
│   └── devin-pricing-def456.png
```

---

## Usage Examples

### Example 1: Extract Cursor Pricing

```bash
npm run cli -- extract:pricing '{
  "url": "https://cursor.com/pricing",
  "entityId": "cmjkbtkzm0000j7tu9625advu",
  "screenshot": true,
  "createAssertions": true
}'
```

**Output:**
```json
{
  "success": true,
  "structuredDataId": "cmjkc123...",
  "data": {
    "tiers": [
      {
        "name": "Hobby",
        "price": 0,
        "billingCycle": "monthly",
        "features": ["2000 completions", "50 slow premium requests"],
        "limits": {"completions": 2000, "premiumRequests": 50}
      },
      {
        "name": "Pro",
        "price": 20,
        "billingCycle": "monthly",
        "pricePerUnit": "per user",
        "features": ["Unlimited completions", "500 fast premium requests", "10 Claude Opus requests"],
        "limits": {"premiumRequests": 500, "opusRequests": 10}
      },
      {
        "name": "Business",
        "price": 40,
        "billingCycle": "monthly",
        "pricePerUnit": "per user",
        "features": ["Everything in Pro", "Centralized billing", "Admin dashboard", "SAML SSO"]
      }
    ],
    "currency": "USD",
    "billingCycles": ["monthly", "annual"],
    "hasFreeTier": true,
    "hasEnterprise": true
  },
  "screenshotPath": "screenshots/2025-12/cursor-pricing-abc123.png",
  "assertionsCreated": [
    "cmjkc456...",
    "cmjkc789...",
    "cmjkc012..."
  ],
  "sourceValidated": true,
  "confidence": 0.95
}
```

### Example 2: Batch Extraction for Project

```bash
# Get all entities needing pricing data
npm run cli -- search:noAssertions '{"projectId": "cmjkbj8n00000b5tuv300a826"}' \
  | jq '.data[] | select(.url != null) | {entityId: .id, url: (.url + "/pricing")}' \
  | while read entity; do
      npm run cli -- extract:pricing "$entity"
    done
```

### Example 3: Refresh Stale Data

```bash
# Re-extract pricing that's older than 30 days
npm run cli -- extract:refresh '{
  "projectId": "cmjkbj8n00000b5tuv300a826",
  "schemaType": "pricing",
  "olderThanDays": 30
}'
```

---

## Error Handling

```typescript
enum ExtractionError {
  URL_UNREACHABLE = "URL_UNREACHABLE",
  URL_BLOCKED = "URL_BLOCKED",           // 403, captcha, etc.
  CONTENT_EMPTY = "CONTENT_EMPTY",
  SCHEMA_MISMATCH = "SCHEMA_MISMATCH",   // Extracted data doesn't match schema
  LLM_EXTRACTION_FAILED = "LLM_EXTRACTION_FAILED",
  SCREENSHOT_FAILED = "SCREENSHOT_FAILED",
  ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",
}

interface ExtractionErrorResponse {
  success: false;
  error: ExtractionError;
  message: string;
  details?: {
    statusCode?: number;
    redirectUrl?: string;
    partialData?: unknown;
  };
}
```

---

## Configuration

```typescript
// config/extractor.ts
export const EXTRACTOR_CONFIG = {
  // Playwright settings
  browser: {
    headless: true,
    timeout: 30000,
    userAgent: "Mozilla/5.0 (compatible; ResearchBot/1.0)",
  },

  // Screenshot settings
  screenshot: {
    directory: "screenshots",
    format: "png" as const,
    fullPage: true,
    maxWidth: 1920,
    maxHeight: 10000,
  },

  // LLM settings
  llm: {
    model: "claude-3-5-haiku-20241022",
    maxTokens: 4096,
    temperature: 0,
  },

  // Caching
  cache: {
    enabled: true,
    ttlHours: 24,
    directory: ".cache/extractor",
  },

  // Rate limiting
  rateLimit: {
    requestsPerMinute: 10,
    delayBetweenRequests: 1000,
  },
};
```

---

## Dependencies

```json
{
  "dependencies": {
    "playwright": "^1.40.0",
    "@anthropic-ai/sdk": "^0.20.0",
    "zod": "^3.22.0",
    "sharp": "^0.33.0"
  }
}
```

---

## Migration Path

1. **Phase 1**: Add new Prisma models, run migration
2. **Phase 2**: Implement core extraction engine with pricing schema
3. **Phase 3**: Add remaining schemas (features, company, etc.)
4. **Phase 4**: Integrate with existing CLI
5. **Phase 5**: Add batch operations and refresh capabilities

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Extraction accuracy | >90% field match with manual verification |
| Source validation rate | 100% of extracted URLs verified |
| Screenshot capture rate | >95% success |
| Assertion generation | 3-5 assertions per extraction |
| Time per extraction | <30 seconds |

---

## Open Questions

1. **Screenshot storage**: Local filesystem vs. S3/cloud storage?
2. **Rate limiting**: How aggressive can we be with vendor sites?
3. **Caching strategy**: How long to cache page content?
4. **LLM cost**: Haiku for all extractions, or Sonnet for complex pages?
5. **Change detection**: Alert when extracted data differs from previous?
