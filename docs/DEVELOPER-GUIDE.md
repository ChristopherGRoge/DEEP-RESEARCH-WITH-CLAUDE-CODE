# Frontend Developer Guide: Research Visualization Platform

## Overview

This guide is for frontend designers and developers building the visualization layer for our AI-powered research platform. The system collects, validates, and scores information about software tools (primarily AI/ML development tools) to help decision-makers evaluate and compare options.

**The Story We're Telling**: We're helping enterprise technology leaders answer "Which AI coding assistant should we adopt?" by providing structured, evidence-backed research with transparent scoring and validation states.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Core Data Models](#core-data-models)
3. [Data Relationships](#data-relationships)
4. [Scoring Systems](#scoring-systems)
5. [Validation Workflows](#validation-workflows)
6. [API Reference](#api-reference)
7. [Visual Design Recommendations](#visual-design-recommendations)
8. [Data Stories to Tell](#data-stories-to-tell)
9. [Example Data Payloads](#example-data-payloads)
10. [Component Specifications](#component-specifications)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RESEARCH PLATFORM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │  DISCOVERY  │───▶│  ANALYSIS   │───▶│ VALIDATION  │            │
│  │   Agents    │    │   Agents    │    │   Humans    │            │
│  └─────────────┘    └─────────────┘    └─────────────┘            │
│         │                 │                   │                    │
│         ▼                 ▼                   ▼                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    PostgreSQL Database                       │  │
│  │  ┌─────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────┐ │  │
│  │  │ Entity  │ │ Assertion  │ │ Extraction │ │   Source    │ │  │
│  │  └─────────┘ └────────────┘ └────────────┘ └─────────────┘ │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│                              ▼                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                     FRONTEND (YOU)                           │  │
│  │  • Entity Cards & Grids    • Comparison Views               │  │
│  │  • Buzz Rankings           • Validation Dashboards          │  │
│  │  • Evidence Galleries      • Research Progress Tracking     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Discovery**: AI agents search the web for tools matching research criteria
2. **Analysis**: AI agents extract structured data (pricing, features, compliance)
3. **Assertions**: Claims are recorded with evidence (screenshots, quotes)
4. **Validation**: Human researchers verify claims, promoting them to Evidence
5. **Scoring**: Composite scores (Buzz, Federal Viability) are calculated
6. **Presentation**: Frontend displays research findings for decision-makers

---

## Core Data Models

### Entity (The Research Subject)

An Entity is the primary unit of research—typically a software tool, framework, or product.

```typescript
interface Entity {
  // Identity
  id: string;                    // CUID (e.g., "cmkmw5ubx0000ertui9r82mzi")
  name: string;                  // Display name: "GitHub Copilot", "Cursor"
  description: string | null;    // Brief description
  entityType: string | null;     // "tool", "framework", "product", "service"
  url: string | null;            // Primary website

  // Categorization
  discoveryCategory: string | null;  // Legacy: "ai_code_assistants"
  categoryId: string | null;         // FK to DiscoveryCategory
  category?: DiscoveryCategory;      // Resolved category with displayName

  // Branding
  logoUrl: string | null;        // Remote URL to logo
  logoPath: string | null;       // Local file path
  logoFormat: string | null;     // "svg", "png", "jpg", "webp"
  logoSvgContent: string | null; // Raw SVG markup (embed directly!)
  logoVerified: boolean;         // Human verified correct logo

  // GitHub Metrics
  githubUrl: string | null;
  githubStars: number | null;
  githubForks: number | null;
  githubContributors: number | null;
  githubLastCommit: Date | null;
  githubLanguage: string | null;
  githubLicense: string | null;

  // Buzz Score (Composite Ranking)
  buzzScore: number | null;      // 0.0-1.0 composite score
  buzzComponents: BuzzComponents | null;  // Breakdown
  buzzCalculatedAt: Date | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Relations (loaded separately or via include)
  assertions: Assertion[];
  extractions: Extraction[];
}

interface BuzzComponents {
  marketPresence: number;     // 0-1: GitHub stars, employee size
  developerActivity: number;  // 0-1: Commits, contributors
  fundingSignal: number;      // 0-1: Total raised, round stage
  mentionVelocity: number;    // 0-1: Cross-source mentions
  researchDepth: number;      // 0-1: Our assertion/extraction coverage
}
```

**Frontend Display Notes**:
- `logoSvgContent` is the preferred logo source—embed SVG directly for infinite scalability
- `buzzScore` determines icon size and ranking position
- `category.displayName` is human-readable (e.g., "Code Assistants" not "ai_code_assistants")

---

### Assertion (Claims About Entities)

An Assertion is a claim made about an entity. This is the core research unit.

```typescript
interface Assertion {
  // Identity
  id: string;
  claim: string;                 // The assertion text (may have semantic prefix)
  category: string | null;       // "feature", "pricing", "compliance", "limitation"

  // Validation State
  status: "CLAIM" | "EVIDENCE" | "REJECTED";
  validatedAt: Date | null;
  validatedBy: string | null;    // Human validator name
  rejectionReason: string | null;

  // Criticality (Research Priority)
  criticality: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  criticalityScore: number | null;  // 0-1 computed score

  // Pillar Status (Used in Conclusions)
  citedInConclusion: boolean;
  conclusionContext: string | null;  // "P1 PILLAR - Federal Viability: ..."

  // Evidence (Screenshots are PRIMARY)
  evidenceScreenshotPath: string | null;
  evidenceDescription: string | null;
  evidenceChain: EvidenceItem[] | null;

  // Confidence Tracking
  confidence: number | null;     // 0-1 AI confidence
  confidenceFactors: object | null;

  // Human Validation Dialog
  humanResponse: string | null;
  validationNotes: ValidationNote[] | null;
  partiallyValidated: boolean;

  // Discovery Provenance
  mentionCount: number;          // Times mentioned across sources
  sourceSpread: number;          // Different sources mentioning

  // Relations
  entityId: string;
  sources: AssertionSource[];
  reasoning: Reasoning[];
}

interface EvidenceItem {
  screenshotPath: string;
  description: string;
  capturedAt?: Date;
}

interface ValidationNote {
  role: "human" | "agent";
  content: string;
  timestamp: Date;
}
```

**Claim Prefixes (Semantic Types)**:

Claims often start with semantic prefixes indicating their nature:

| Prefix | Meaning | Visual Treatment |
|--------|---------|------------------|
| `UNIQUE DIFFERENTIATOR:` | Only this entity has this | 🌟 Gold star |
| `MARKET LEADER:` | Best-in-class at this | 🏆 Trophy |
| `COMPETITIVE GAP:` | Lags competitors here | ⚠️ Warning |
| `MISSING FEATURE:` | Competitors have, this lacks | ❌ Red X |
| `FEDERAL PATHWAY:` | Federal compliance route | 🏛️ Government |
| `FEDERAL VIABILITY SCORE:` | Overall federal assessment | 🎯 Score badge |

---

### Extraction (Structured Data)

Extractions are structured data pulled from web pages using defined schemas.

```typescript
interface Extraction {
  id: string;
  schemaType: SchemaType;
  data: PricingData | FeaturesData | CompanyData | ComplianceData | IntegrationsData | DifferentiatorsData;
  extractedAt: Date;
  expiresAt: Date | null;        // When data becomes stale
  confidence: number | null;     // 0-1 extraction confidence

  // Evidence
  screenshotId: string | null;
  screenshot?: Screenshot;

  // Source
  sourceId: string;
  source?: Source;

  // Generated assertions
  assertionIds: string[];
}

type SchemaType = "pricing" | "features" | "company" | "compliance" | "integrations" | "differentiators";
```

---

### Extraction Schemas (Structured Data Formats)

#### Pricing Schema

```typescript
interface PricingData {
  tiers: PricingTier[];
  currency: string;              // "USD"
  billingCycles: string[];       // ["monthly", "annual"]
  hasFreeTier: boolean;
  hasEnterprise: boolean;
  lastUpdated?: string;
}

interface PricingTier {
  name: string;                  // "Free", "Pro", "Enterprise"
  price: number | null;          // null = "Contact Sales"
  billingCycle: "monthly" | "annual" | "one-time" | "usage-based" | "free";
  pricePerUnit?: string;         // "per user", "per seat"
  features: string[];
  limits?: Record<string, string | number>;
}
```

**Display Example**:
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│    Free     │     Pro     │  Business   │ Enterprise  │
├─────────────┼─────────────┼─────────────┼─────────────┤
│    $0/mo    │   $20/mo    │   $40/mo    │   Contact   │
│             │  per user   │  per user   │    Sales    │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ 2000 compl. │  Unlimited  │  Unlimited  │  Unlimited  │
│ Basic chat  │  Priority   │  Admin dash │  SSO/SAML   │
│             │  support    │  Analytics  │  Dedicated  │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

#### Compliance Schema (with Federal Viability)

```typescript
interface ComplianceData {
  certifications: Certification[];
  securityFeatures: string[];
  dataResidency?: string[];      // ["US", "EU", "Custom"]
  gdprCompliant?: boolean;
  hipaaCompliant?: boolean;
  soc2?: boolean;
  fedRampStatus?: string;        // "Authorized", "In Process", "None"

  // Federal Viability Assessment
  federalPathways?: FederalPathway[];
  federalViabilityScore?: number;  // 0.0-1.0
  federalViabilityLevel?: "GREEN" | "YELLOW" | "ORANGE" | "RED";
  federalViabilityNotes?: string;
}

interface Certification {
  name: string;                  // "SOC 2 Type II", "ISO 27001"
  status: "certified" | "in_progress" | "planned" | "unknown";
  validUntil?: string;
  documentUrl?: string;
}

interface FederalPathway {
  pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
  status: "available" | "in_progress" | "planned" | "unavailable" | "unknown";
  provider?: string;             // "Amazon Bedrock", "Azure Government"
  authLevel?: string;            // "FedRAMP High", "FedRAMP Moderate", "IL4"
  regions?: string[];            // ["us-gov-west-1", "us-gov-east-1"]
  notes?: string;
}
```

**Federal Pathway Visualization**:
```
┌─────────────────────────────────────────────────────────────┐
│  Federal Viability: GREEN (0.85)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ AWS Bedrock (GovCloud)     FedRAMP High                │
│     └─ Regions: us-gov-west-1, us-gov-east-1               │
│                                                             │
│  🟡 Google Vertex AI           FedRAMP Moderate             │
│     └─ Note: FedRAMP High in progress                      │
│                                                             │
│  ⚪ Direct FedRAMP             Not Available               │
│  ⚪ Air-Gapped                 Not Available               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Differentiators Schema (Competitive Analysis)

```typescript
interface DifferentiatorsData {
  // True differentiators
  uniqueFeatures: DifferentiatingFeature[];
  leadingFeatures: DifferentiatingFeature[];

  // Standard features (not differentiating)
  tableStakes: string[];

  // Weaknesses
  laggingFeatures: LaggingFeature[];
  missingFeatures: MissingFeature[];

  // Context
  primaryCompetitors: string[];
  differentiationSummary: string;
}

interface DifferentiatingFeature {
  name: string;
  description: string;
  comparedTo?: string[];         // ["Copilot: No MCP", "Cursor: Limited"]
}

interface LaggingFeature {
  name: string;
  reason: string;
  competitors: string[];
}

interface MissingFeature {
  name: string;
  competitors: string[];
  importance: "critical" | "important" | "nice-to-have";
}
```

**Competitive Matrix Display**:
```
┌─────────────────────┬───────────┬────────┬─────────┬─────────┐
│ Feature             │ Claude    │ Copilot│ Cursor  │ Codeium │
│                     │ Code      │        │         │         │
├─────────────────────┼───────────┼────────┼─────────┼─────────┤
│ MCP Protocol        │ ✅ Native │ ❌     │ 🟡 Ltd  │ ❌      │
│ Extended Thinking   │ ✅ Leader │ ❌     │ 🟡      │ ❌      │
│ IDE Integration     │ 🟡 CLI    │ ✅     │ ✅      │ ✅      │
│ Air-Gapped Deploy   │ ❌        │ ❌     │ ❌      │ ✅ Ent  │
│ Code Completion     │ ✅        │ ✅     │ ✅      │ ✅      │
└─────────────────────┴───────────┴────────┴─────────┴─────────┘
```

---

### Source (Citations)

```typescript
interface Source {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  sourceType: string | null;     // "vendor_docs", "blog", "github", "forum"
  status: "PROPOSED" | "VALIDATED" | "REJECTED";

  // URL Health
  lastFetchedAt: Date | null;
  lastStatusCode: number | null;
  isAccessible: boolean;
}

interface AssertionSource {
  id: string;
  quote: string | null;          // Relevant excerpt
  addedBy: string | null;        // null = agent, else human name

  // Human Grading
  relevanceGrade: SourceRelevance | null;
  annotation: string | null;
  gradedBy: string | null;
  gradedAt: Date | null;

  source: Source;
}

type SourceRelevance =
  | "DIRECT_EVIDENCE"    // 5 - Explicitly proves claim
  | "STRONG_SUPPORT"     // 4 - Strong supporting evidence
  | "PARTIAL_SUPPORT"    // 3 - Partially addresses claim
  | "WEAK_SUPPORT"       // 2 - Tangentially related
  | "NOT_RELEVANT"       // 1 - Doesn't support
  | "MISLEADING";        // 0 - Contradicts or misinterpreted
```

---

### Category (Entity Classification)

```typescript
interface DiscoveryCategory {
  id: string;
  name: string;                  // "ai_code_assistants" (machine key)
  displayName: string;           // "Code Assistants" (human readable)
  description: string;

  // Classification guidance
  inclusionCriteria: string | null;
  exclusionCriteria: string | null;
  exemplarEntities: string[];    // ["GitHub Copilot", "Cursor"]
  antiExemplars: string[];       // ["SonarQube", "Snyk"]

  entityCount: number;
}
```

**Available Categories**:
| Name | Display Name | Description |
|------|--------------|-------------|
| `ai_code_assistants` | Code Assistants | AI code completion & generation |
| `ai_code_review` | Code Review | AI code quality analysis |
| `ai_debugging` | Debugging | AI-powered debugging tools |
| `ai_testing` | Testing | AI test generation & QA |
| `ai_documentation` | Documentation | AI doc generation |
| `ai_security` | Security | AI security scanning |
| `ai_devops` | DevOps | AI infrastructure tools |
| `ai_analytics` | Analytics & Observability | AI monitoring & insights |
| `genai_concepts` | GenAI Concepts | Foundational concepts (RAG, Agents) |

---

## Scoring Systems

### Buzz Score (Entity Ranking)

The Buzz Score is a composite metric (0.0-1.0) for stack-ranking entities.

```
BuzzScore = (
  MarketPresence   * 0.30 +
  DeveloperActivity * 0.25 +
  FundingSignal     * 0.20 +
  MentionVelocity   * 0.15 +
  ResearchDepth     * 0.10
)
```

**Visual Display**:
```
┌─────────────────────────────────────────────────────────────┐
│  Buzz Score: 0.87                                    🔥 HOT │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Market Presence    ████████████████░░░░  0.82             │
│  Developer Activity █████████████████░░░  0.85             │
│  Funding Signal     ██████████████████░░  0.92             │
│  Mention Velocity   ███████████████████░  0.95             │
│  Research Depth     ██████████████░░░░░░  0.72             │
│                                                             │
│  Data Quality: High                                         │
│  Missing: employeeCount                                     │
│  Last Updated: 2 hours ago                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Icon Sizing Based on Buzz**:
| Score Range | Size | Badge | Description |
|-------------|------|-------|-------------|
| 0.80-1.00 | XL (64px) | 🔥 Hot | Market leaders |
| 0.60-0.79 | LG (48px) | ⭐ Rising | Strong players |
| 0.40-0.59 | MD (36px) | — | Established |
| 0.20-0.39 | SM (28px) | — | Emerging |
| 0.00-0.19 | XS (20px) | ❓ New | Just discovered |

---

### Federal Viability Score

Evaluates an entity's readiness for federal/government deployment.

| Level | Score Range | Meaning |
|-------|-------------|---------|
| 🟢 GREEN | 0.75-1.0 | Direct FedRAMP OR multiple inherited pathways |
| 🟡 YELLOW | 0.50-0.74 | One inherited pathway available |
| 🟠 ORANGE | 0.25-0.49 | Pathway in progress or planned |
| 🔴 RED | 0.00-0.24 | No viable federal pathway |

---

### Assertion Criticality

Prioritizes which claims to validate first.

| Level | Color | Meaning | Examples |
|-------|-------|---------|----------|
| CRITICAL | 🔴 Red | Must validate before conclusions | FedRAMP status, security architecture |
| HIGH | 🟠 Orange | Should validate | Pricing, integrations |
| MEDIUM | 🟡 Yellow | Validate as time permits | Feature claims |
| LOW | ⚪ Gray | Optional | General observations |

---

## Validation Workflows

### Assertion Lifecycle

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│     ┌─────────┐                                                 │
│     │  CLAIM  │◄───── AI Agent creates assertion                │
│     └────┬────┘                                                 │
│          │                                                       │
│          │ Human reviews                                         │
│          │                                                       │
│    ┌─────┴─────┐                                                │
│    │           │                                                │
│    ▼           ▼                                                │
│ ┌─────────┐ ┌──────────┐                                       │
│ │EVIDENCE │ │ REJECTED │                                       │
│ └────┬────┘ └────┬─────┘                                       │
│      │           │                                              │
│      │           │ supersededBy                                 │
│      ▼           ▼                                              │
│  Cited in    Re-research                                        │
│  conclusions  new claim                                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Validation UI States

```typescript
// Claim awaiting validation
{
  status: "CLAIM",
  criticality: "HIGH",
  citedInConclusion: false,
  display: {
    badge: "Needs Review",
    badgeColor: "yellow",
    actions: ["Validate", "Reject", "Edit"]
  }
}

// Validated evidence
{
  status: "EVIDENCE",
  validatedAt: "2026-01-22",
  validatedBy: "researcher-1",
  citedInConclusion: true,
  conclusionContext: "P1 PILLAR - Pricing",
  display: {
    badge: "Verified ✓",
    badgeColor: "green",
    pillarBadge: "P1",
    actions: ["View Evidence", "Re-validate"]
  }
}

// Rejected claim
{
  status: "REJECTED",
  rejectionReason: "Pricing changed since capture",
  supersededBy: "cmkpq123...",
  display: {
    badge: "Rejected",
    badgeColor: "red",
    strikethrough: true,
    actions: ["View Replacement", "Re-research"]
  }
}
```

---

## API Reference

All data is accessed via CLI commands that return JSON. In a web context, these would be wrapped in REST endpoints.

### Entity Operations

```bash
# Get single entity with all relations
npm run cli -- entity:get '{"entityId": "cmkmw5ubx0000ertui9r82mzi"}'

# List entities in project
npm run cli -- entity:list '{"projectId": "cmkmuy06l0000potui26vfjjd"}'

# Search entities
npm run cli -- entity:search '{"query": "cursor", "entityType": "tool"}'
```

### Extraction Operations

```bash
# Get all extractions for entity
npm run cli -- extract:list '{"entityId": "..."}'

# Get latest extraction of specific type
npm run cli -- extract:latest '{"entityId": "...", "schemaType": "pricing"}'

# Get extraction summary for project
npm run cli -- extract:summary '{"projectId": "..."}'
```

### Assertion Operations

```bash
# List assertions for entity
npm run cli -- assertion:list '{"entityId": "..."}'

# Search assertions across project
npm run cli -- assertion:search '{"query": "FedRAMP", "category": "compliance"}'

# Get pillar assertions only
npm run cli -- assertion:search '{"citedInConclusion": true}'
```

### Scoring Operations

```bash
# Get entities ranked by buzz
npm run cli -- buzz:rank '{"projectId": "...", "limit": 20, "minBuzz": 0.5}'

# Get entities ranked by GitHub stars
npm run cli -- github:rank '{"projectId": "...", "limit": 20}'

# Calculate buzz for single entity
npm run cli -- buzz:calculate '{"entityId": "..."}'
```

### Query Operations

```bash
# Compare entities side-by-side
npm run cli -- query:compare '{"entityIds": ["id1", "id2", "id3"], "schemaType": "pricing"}'

# Search extractions
npm run cli -- query:search '{"projectId": "...", "schemaType": "pricing", "filters": {"hasFreeTier": true}}'

# Get research gaps
npm run cli -- research:gaps '{"projectId": "..."}'
```

---

## Visual Design Recommendations

### Color Palette

```css
/* Status Colors */
--status-claim: #FCD34D;       /* Yellow - awaiting validation */
--status-evidence: #10B981;    /* Green - validated */
--status-rejected: #EF4444;    /* Red - rejected */

/* Criticality Colors */
--critical: #DC2626;           /* Red */
--high: #F97316;               /* Orange */
--medium: #FBBF24;             /* Yellow */
--low: #9CA3AF;                /* Gray */

/* Federal Viability */
--fed-green: #059669;
--fed-yellow: #D97706;
--fed-orange: #EA580C;
--fed-red: #DC2626;

/* Buzz Score */
--buzz-hot: #F97316;           /* 0.8+ */
--buzz-rising: #FBBF24;        /* 0.6-0.8 */
--buzz-standard: #6B7280;      /* 0.4-0.6 */
--buzz-emerging: #9CA3AF;      /* 0.2-0.4 */
--buzz-new: #D1D5DB;           /* 0-0.2 */
```

### Typography Hierarchy

```css
/* Entity Name */
.entity-name {
  font-size: 1.5rem;
  font-weight: 700;
}

/* Claim Text */
.claim-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* Semantic Prefix */
.claim-prefix {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

/* Score Display */
.score-value {
  font-family: 'SF Mono', monospace;
  font-size: 1.25rem;
  font-weight: 600;
}
```

### Logo Display

```typescript
function renderEntityLogo(entity: Entity, size: "xs" | "sm" | "md" | "lg" | "xl") {
  const sizeMap = { xs: 20, sm: 28, md: 36, lg: 48, xl: 64 };
  const px = sizeMap[size];

  // Priority 1: Inline SVG (best quality)
  if (entity.logoSvgContent) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: entity.logoSvgContent }}
        style={{ width: px, height: px }}
      />
    );
  }

  // Priority 2: Local file
  if (entity.logoPath) {
    return <img src={`/logos/${entity.logoPath}`} width={px} height={px} />;
  }

  // Priority 3: Remote URL
  if (entity.logoUrl) {
    return <img src={entity.logoUrl} width={px} height={px} />;
  }

  // Fallback: Initials
  return (
    <div className="logo-placeholder" style={{ width: px, height: px }}>
      {entity.name.charAt(0)}
    </div>
  );
}
```

---

## Data Stories to Tell

### 1. Entity Overview Card

**Purpose**: Quick snapshot of an entity for browsing/comparison.

**Data to Display**:
- Logo (sized by buzz score)
- Name + description
- Category badge
- Buzz score with sparkline trend
- Key metrics: GitHub stars, pricing tier
- Federal viability indicator
- Validation progress (X of Y assertions validated)

### 2. Competitive Landscape View

**Purpose**: Compare multiple entities in a category.

**Data to Display**:
- Grid or table of entities ranked by buzz
- Common feature comparison matrix
- Pricing tier comparison
- Federal viability comparison
- Unique differentiators highlighted

### 3. Deep Dive Entity Page

**Purpose**: Complete research on a single entity.

**Sections**:
1. **Overview**: Logo, name, description, scores
2. **Pricing**: Tier comparison table
3. **Features**: Categorized feature list with availability
4. **Compliance**: Certifications, federal pathways
5. **Competitive Position**: Differentiators matrix
6. **Evidence Gallery**: Screenshots with assertions
7. **Validation Status**: Pillar assertions, research progress

### 4. Research Progress Dashboard

**Purpose**: Show research coverage and priorities.

**Data to Display**:
- Entities by research depth (fully researched → needs work)
- Assertions by validation status
- High-priority items needing validation
- Schema type coverage per entity
- Stale data needing refresh

### 5. Federal Viability Report

**Purpose**: Filter entities suitable for government use.

**Data to Display**:
- Entities filtered by federal viability level
- Pathway breakdown for each entity
- Compliance certification matrix
- Data residency options
- Security feature comparison

---

## Example Data Payloads

### Entity with Buzz Score

```json
{
  "id": "cmkmw5ubx0000ertui9r82mzi",
  "name": "Claude Code",
  "description": "Anthropic official agentic coding tool",
  "entityType": "tool",
  "url": "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview",
  "category": {
    "id": "cmkplajev0000nntuv4856svj",
    "name": "ai_code_assistants",
    "displayName": "Code Assistants"
  },
  "logoFormat": "svg",
  "logoSvgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\"...>...</svg>",
  "githubStars": 13634,
  "githubForks": 2279,
  "githubContributors": 27,
  "githubLastCommit": "2026-01-20T22:50:19.000Z",
  "buzzScore": 0.629,
  "buzzComponents": {
    "marketPresence": 0.95,
    "developerActivity": 0.73,
    "fundingSignal": 0,
    "mentionVelocity": 0.70,
    "researchDepth": 0.56
  },
  "buzzCalculatedAt": "2026-01-23T14:10:00.000Z"
}
```

### Pricing Extraction

```json
{
  "id": "cmkpp7abc...",
  "schemaType": "pricing",
  "extractedAt": "2026-01-22T17:00:00.000Z",
  "data": {
    "tiers": [
      {
        "name": "Pro",
        "price": 17,
        "billingCycle": "monthly",
        "features": ["Claude Code access", "Extended thinking", "Priority support"]
      },
      {
        "name": "Max 5x",
        "price": 100,
        "billingCycle": "monthly",
        "features": ["5x usage limits", "All Pro features"]
      },
      {
        "name": "Max 20x",
        "price": 200,
        "billingCycle": "monthly",
        "features": ["20x usage limits", "All Max features"]
      }
    ],
    "hasFreeTier": false,
    "hasEnterprise": true,
    "currency": "USD"
  }
}
```

### Pillar Assertion

```json
{
  "id": "cmkpqkwcl0000yttu1b5x0nsc",
  "claim": "FEDERAL VIABILITY SCORE: GREEN (0.85) - Claude Code achieves federal viability through inherited FedRAMP authorization via AWS Bedrock (FedRAMP High) and Google Vertex AI (FedRAMP Moderate).",
  "status": "CLAIM",
  "category": "compliance",
  "criticality": "HIGH",
  "citedInConclusion": true,
  "conclusionContext": "P1 PILLAR - Federal Viability: This assessment supersedes prior MISSING FEATURE assertions about FedRAMP/air-gapped.",
  "evidenceScreenshotPath": "screenshots/2026-01/docs-anthropic-com-security.png",
  "evidenceDescription": "Security documentation page showing AWS Bedrock and Vertex AI deployment options",
  "reasoning": [
    {
      "content": "Federal viability assessment: (1) AWS Bedrock pathway: GREEN - FedRAMP High authorized in GovCloud..."
    }
  ],
  "sources": [
    {
      "source": {
        "url": "https://docs.anthropic.com/security",
        "title": "Security & Compliance"
      },
      "relevanceGrade": "DIRECT_EVIDENCE"
    }
  ]
}
```

### Competitive Differentiators

```json
{
  "schemaType": "differentiators",
  "data": {
    "uniqueFeatures": [
      {
        "name": "MCP (Model Context Protocol) native support",
        "description": "Built-in support for MCP allowing integration with Google Drive, Figma, Slack, Jira",
        "comparedTo": ["Copilot: No MCP support", "Cursor: Limited MCP support"]
      }
    ],
    "leadingFeatures": [
      {
        "name": "Extended thinking for complex tasks",
        "description": "Deep multi-step reasoning with visible thought process",
        "comparedTo": ["Copilot: Basic completion", "Cursor: Less transparent"]
      }
    ],
    "tableStakes": [
      "Code completion",
      "Chat-based coding assistance",
      "VS Code integration"
    ],
    "laggingFeatures": [
      {
        "name": "IDE-native experience",
        "reason": "Terminal-first design means IDE integrations are secondary",
        "competitors": ["Cursor", "GitHub Copilot"]
      }
    ],
    "missingFeatures": [
      {
        "name": "Air-gapped deployment",
        "competitors": ["Tabnine Enterprise", "Sourcegraph Cody"],
        "importance": "critical"
      }
    ],
    "primaryCompetitors": ["GitHub Copilot", "Cursor", "Codeium", "Tabnine"],
    "differentiationSummary": "Claude Code differentiates through first-party Claude model integration, MCP protocol for extensibility, and terminal-first Unix philosophy."
  }
}
```

---

## Component Specifications

### EntityCard

```typescript
interface EntityCardProps {
  entity: Entity;
  variant: "compact" | "detailed" | "comparison";
  showBuzz: boolean;
  showFederal: boolean;
  onSelect?: () => void;
}

// Compact: Logo + name + buzz badge (for grids)
// Detailed: Full card with metrics
// Comparison: Side-by-side optimized
```

### AssertionList

```typescript
interface AssertionListProps {
  assertions: Assertion[];
  groupBy: "category" | "criticality" | "status" | "none";
  showEvidence: boolean;
  onValidate?: (id: string) => void;
  onReject?: (id: string) => void;
}
```

### ExtractionViewer

```typescript
interface ExtractionViewerProps {
  extraction: Extraction;
  schemaType: SchemaType;
  showScreenshot: boolean;
  compareWith?: Extraction;  // For diff view
}
```

### BuzzScoreDisplay

```typescript
interface BuzzScoreDisplayProps {
  score: number;
  components: BuzzComponents;
  size: "compact" | "full";
  showBreakdown: boolean;
  showTrend: boolean;
}
```

### FederalViabilityBadge

```typescript
interface FederalViabilityBadgeProps {
  level: "GREEN" | "YELLOW" | "ORANGE" | "RED";
  score: number;
  pathways: FederalPathway[];
  expandable: boolean;
}
```

### CompetitiveMatrix

```typescript
interface CompetitiveMatrixProps {
  entities: Entity[];
  features: string[];
  differentiators: DifferentiatorsData[];
  highlightEntity?: string;  // Entity ID to highlight
}
```

---

## Questions?

For technical questions:
- **Schema definitions**: See `prisma/schema.prisma`
- **Extraction schemas**: See `src/tools/extractor/schemas.ts`
- **CLI commands**: See `CLAUDE.md` for full command reference

For data semantics:
- **Frontend data debrief**: See `docs/FRONTEND-DATA-DEBRIEF.md`
- **Buzz score analysis**: See `docs/BUZZ-SCORE-ANALYSIS.md`

---

*Document Version: 1.0*
*Last Updated: 2026-01-23*
*Schema Version: With GitHub metrics and Buzz scoring*
