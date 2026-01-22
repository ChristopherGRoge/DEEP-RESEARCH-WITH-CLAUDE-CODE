# Frontend Data Debrief: Research System Database Schema

**Purpose**: This document provides the frontend development team with a complete understanding of the research database schema, data semantics, validation workflows, and display considerations.

---

## Table of Contents

1. [Research Philosophy](#research-philosophy)
2. [Core Data Model Overview](#core-data-model-overview)
3. [Entity Model - The Research Subject](#entity-model---the-research-subject)
4. [Assertion Model - Claims and Evidence](#assertion-model---claims-and-evidence)
5. [Extraction Model - Structured Data](#extraction-model---structured-data)
6. [Source Model - Citations and References](#source-model---citations-and-references)
7. [Discovery Models - Automated Research](#discovery-models---automated-research)
8. [Classification Models - Categorization](#classification-models---categorization)
9. [Research Session Models - Orchestration](#research-session-models---orchestration)
10. [Validation Workflows](#validation-workflows)
11. [Scoring Systems](#scoring-systems)
12. [Frontend Display Recommendations](#frontend-display-recommendations)

---

## Research Philosophy

This system implements an **evidence-first, human-in-the-loop research framework**:

1. **AI agents discover and record claims** about software tools/products
2. **Claims start as unvalidated** (`CLAIM` status)
3. **Human researchers validate** claims with screenshots and evidence
4. **Validated claims become evidence** (`EVIDENCE` status)
5. **Evidence supports conclusions** in research deliverables

**Key Principle**: Screenshots are the primary evidence, not URLs. Analysis revealed 43% of agent-provided URLs were misleading—the assertions were correct but URLs didn't support them. The screenshot captured during research is the ground truth.

---

## Core Data Model Overview

```
ResearchProject
    └── Entity (1:many)
            ├── Assertion (1:many) ──► Source (many:many via AssertionSource)
            ├── Extraction (1:many) ──► Screenshot
            └── ResearchSession (1:many) ──► ResearchTask
```

**Hierarchy**:
- **Project** contains many **Entities** (tools being researched)
- **Entity** has many **Assertions** (claims about it)
- **Entity** has many **Extractions** (structured data from web pages)
- **Assertions** link to **Sources** with grading metadata

---

## Entity Model - The Research Subject

An Entity represents something being researched (typically a software tool, framework, or product).

### Core Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `id` | string (CUID) | Primary key | Internal use |
| `name` | string | Display name | **Primary identifier** - "Claude Code", "GitHub Copilot" |
| `description` | string? | Brief description | May be null for newly discovered entities |
| `entityType` | string? | Classification | Values: `tool`, `framework`, `product`, `service`, `company` |
| `url` | string? | Primary website | Link to vendor homepage |

### Category Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `discoveryCategory` | string? | **DEPRECATED** regex-based category | Legacy field - prefer `categoryId` |
| `categoryId` | string? | FK to DiscoveryCategory | LLM-classified category |
| `domainId` | string? | FK to ResearchDomain | Research scope grouping |

**Category Values** (via `DiscoveryCategory.name`):
- `ai_code_assistants` - Code completion tools (Copilot, Cursor)
- `ai_code_review` - Code review tools (CodeRabbit, Codacy)
- `ai_debugging` - Debugging tools (Sentry AI)
- `ai_testing` - Testing tools (Testim, Mabl)
- `ai_documentation` - Doc generation (Mintlify, DocuWriter)
- `ai_security` - Security scanning (Snyk AI, Aikido)
- `ai_devops` - DevOps/infra (Pulumi AI)
- `ai_analytics` - Observability (Datadog, Langfuse)
- `genai_concepts` - Foundational concepts (RAG, Agents)

### Logo Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `logoUrl` | string? | Remote URL to logo | Fallback if no local file |
| `logoPath` | string? | Local file path | Points to `logos/` directory |
| `logoFormat` | string? | Format type | `svg`, `png`, `jpg`, `webp` - SVG preferred |
| `logoSvgContent` | string? | **Raw SVG markup** | Embed directly in HTML for SVG logos |
| `logoSourceUrl` | string? | Where logo was found | Press kit, brand page URL |
| `logoFetchedAt` | DateTime? | Last fetch timestamp | For staleness checking |
| `logoVerified` | boolean | Human verified correct | Show checkmark if true |

**Logo Display Priority**:
1. If `logoSvgContent` exists → embed SVG directly (best quality, infinite scale)
2. Else if `logoPath` exists → serve local file
3. Else if `logoUrl` exists → external image
4. Else → show placeholder/initials

**Example logoSvgContent** (truncated):
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="254" height="28" viewBox="0 0 254 28">
  <path d="M5.07306 17.7192..." fill="#D97757"/>
  <path d="M53.9474 5.49152..." fill="#141413"/>
</svg>
```

---

## Assertion Model - Claims and Evidence

An Assertion is a claim made about an entity. This is the core research unit.

### Identity & Content

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `id` | string (CUID) | Primary key | Internal use |
| `claim` | string | The assertion text | **Primary content** - full claim statement |
| `category` | string? | Claim category | `feature`, `pricing`, `compliance`, `integration`, `limitation`, `comparison` |

### Validation State

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `status` | enum | Validation state | See status table below |
| `validatedAt` | DateTime? | When validated | Null = unvalidated |
| `validatedBy` | string? | Validator name | Human identifier |
| `rejectionReason` | string? | Why rejected | Show if status=REJECTED |
| `supersededBy` | string? | Replacement assertion ID | Link to newer assertion |

**AssertionStatus Values**:
| Status | Meaning | Visual Treatment |
|--------|---------|------------------|
| `CLAIM` | Unvalidated assertion | ⚪ Gray badge, "Needs Review" |
| `EVIDENCE` | Human-validated | ✅ Green badge, "Verified" |
| `REJECTED` | Explicitly rejected | ❌ Red badge, strikethrough |

### Criticality (Research Priority)

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `criticality` | enum | Importance level | Color-coded priority |
| `criticalityScore` | float? | Computed score 0-1 | Sortable metric |
| `criticalityFactors` | JSON? | Score breakdown | Expandable details |

**AssertionCriticality Values**:
| Level | Meaning | Example | Visual |
|-------|---------|---------|--------|
| `CRITICAL` | Must validate | FedRAMP status, security arch | 🔴 Red |
| `HIGH` | Should validate | Pricing, integrations | 🟠 Orange |
| `MEDIUM` | Validate as time permits | Features, metrics | 🟡 Yellow |
| `LOW` | Optional | General observations | ⚪ Gray |

### Evidence Fields (Evidence-First Research)

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `evidenceScreenshotPath` | string? | Primary evidence screenshot | Display as thumbnail |
| `evidenceDescription` | string? | What screenshot shows | Tooltip or expandable |
| `evidenceChain` | JSON? | Multiple screenshots | Array of `{screenshotPath, description, capturedAt}` |

**Evidence Chain Example**:
```json
[
  {
    "screenshotPath": "screenshots/2026-01/tabnine-pricing.png",
    "description": "Pricing table showing Enterprise tier at $39/user/mo",
    "capturedAt": "2026-01-15T10:30:00Z"
  },
  {
    "screenshotPath": "screenshots/2026-01/tabnine-deployment.png",
    "description": "Deployment options showing air-gapped installation available"
  }
]
```

### Conclusion Context (Pillar Assertions)

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `citedInConclusion` | boolean | Used in final deliverables | ⭐ Star indicator |
| `conclusionContext` | string? | How/where used | Show priority (P1/P2/P3) |

**Pillar Assertions** are claims where if wrong, conclusions collapse. They carry `citedInConclusion=true` and typically have `conclusionContext` like:
- `"P1 PILLAR - Federal Viability: ..."`
- `"P2 PILLAR - Pricing: ..."`
- `"P3 PILLAR - Architecture: ..."`

### Confidence Tracking

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `confidence` | float? | AI confidence 0-1 | Percentage or progress bar |
| `confidenceFactors` | JSON? | Score breakdown | `{sources, quality, freshness, conflicts}` |
| `lastValidatedAt` | DateTime? | Last confidence calc | Staleness indicator |
| `validationHistory` | JSON? | Score over time | Trend sparkline |

### Human Validation Dialog

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `humanResponse` | string? | Researcher's notes | Free-text interpretation |
| `validationNotes` | JSON? | Conversation history | Array of `{role, content, timestamp}` |
| `partiallyValidated` | boolean | Some claims verified | ⚠️ Partial badge |

### Claim Prefixes (Semantic Types)

Claims often start with semantic prefixes that indicate their type:

| Prefix | Meaning | Example |
|--------|---------|---------|
| `UNIQUE DIFFERENTIATOR:` | Only this entity has this | "UNIQUE DIFFERENTIATOR: MCP native support" |
| `MARKET LEADER:` | Best-in-class at this | "MARKET LEADER: Extended thinking" |
| `COMPETITIVE GAP:` | Lags competitors here | "COMPETITIVE GAP: IDE-native experience" |
| `MISSING FEATURE:` | Competitors have, this lacks | "MISSING FEATURE [critical]: Air-gapped" |
| `FEDERAL PATHWAY:` | Federal compliance route | "FEDERAL PATHWAY [GREEN]: AWS Bedrock" |
| `FEDERAL VIABILITY SCORE:` | Overall federal assessment | "FEDERAL VIABILITY SCORE: GREEN (0.85)" |

---

## Extraction Model - Structured Data

Extractions are structured data pulled from web pages. They're the foundation for queryable research.

### Core Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `id` | string (CUID) | Primary key | Internal use |
| `schemaType` | string | Data type extracted | See schema types below |
| `data` | JSON | The structured data | Schema-specific rendering |
| `extractedAt` | DateTime | When extracted | Freshness indicator |
| `expiresAt` | DateTime? | When stale | Highlight if expired |
| `confidence` | float? | Extraction confidence | Show uncertainty |

### Schema Types

| Type | Description | Key Data Fields |
|------|-------------|-----------------|
| `pricing` | Pricing information | `tiers[]`, `hasFreeTier`, `hasEnterprise`, `currency` |
| `features` | Product capabilities | `categories[]`, `highlights[]` |
| `company` | Organization info | `founded`, `headquarters`, `employeeCount`, `funding` |
| `compliance` | Security/compliance | `certifications[]`, `federalPathways[]`, `federalViabilityScore` |
| `integrations` | Integration ecosystem | `categories[]`, `totalCount`, `hasApi`, `sdkLanguages[]` |
| `differentiators` | Competitive analysis | `uniqueFeatures[]`, `leadingFeatures[]`, `laggingFeatures[]`, `missingFeatures[]` |

### Pricing Schema Example

```json
{
  "tiers": [
    {
      "name": "Free",
      "price": 0,
      "billingCycle": "free",
      "features": ["2000 completions/month", "Basic support"]
    },
    {
      "name": "Pro",
      "price": 20,
      "billingCycle": "monthly",
      "pricePerUnit": "per user",
      "features": ["Unlimited completions", "Priority support"]
    },
    {
      "name": "Enterprise",
      "price": null,
      "billingCycle": "annual",
      "features": ["Custom deployment", "SSO", "Audit logs"]
    }
  ],
  "hasFreeTier": true,
  "hasEnterprise": true,
  "currency": "USD"
}
```

**Display Notes**:
- `price: null` means "Contact Sales"
- `billingCycle` values: `free`, `monthly`, `annual`, `one-time`, `usage-based`

### Compliance Schema Example (with Federal Pathways)

```json
{
  "certifications": [
    {"name": "SOC 2 Type II", "status": "certified"},
    {"name": "ISO 27001", "status": "certified"},
    {"name": "FedRAMP", "status": "in_progress"}
  ],
  "securityFeatures": ["SSO/SAML", "Audit logging", "Encryption at rest"],
  "dataResidency": ["US", "EU"],
  "gdprCompliant": true,
  "hipaaCompliant": false,
  "soc2": true,
  "fedRampStatus": "In Process",

  "federalPathways": [
    {
      "pathway": "inherited_aws",
      "status": "available",
      "provider": "Amazon Bedrock",
      "authLevel": "FedRAMP High",
      "regions": ["us-gov-west-1", "us-gov-east-1"],
      "notes": "Claude models available in AWS GovCloud"
    },
    {
      "pathway": "inherited_gcp",
      "status": "available",
      "provider": "Google Vertex AI",
      "authLevel": "FedRAMP Moderate",
      "notes": "FedRAMP High in progress"
    }
  ],
  "federalViabilityScore": 0.85,
  "federalViabilityLevel": "GREEN",
  "federalViabilityNotes": "Multiple viable pathways through tier-1 cloud providers"
}
```

**Federal Pathway Types**:
| Pathway | Meaning |
|---------|---------|
| `direct_fedramp` | Entity itself holds FedRAMP ATO |
| `inherited_aws` | Via AWS GovCloud/Bedrock |
| `inherited_azure` | Via Azure Government |
| `inherited_gcp` | Via Google Cloud FedRAMP regions |
| `air_gapped` | Fully disconnected deployment |
| `private_link` | Private network path (PrivateLink, VPC) |
| `on_premise` | Self-hosted on customer infrastructure |
| `hybrid` | Combination of approaches |

**Federal Viability Levels**:
| Level | Score Range | Meaning | Visual |
|-------|-------------|---------|--------|
| `GREEN` | 0.75-1.0 | Direct FedRAMP OR multiple inherited paths | 🟢 |
| `YELLOW` | 0.5-0.74 | One inherited pathway available | 🟡 |
| `ORANGE` | 0.25-0.49 | Pathway in progress or planned | 🟠 |
| `RED` | 0.0-0.24 | No viable federal pathway | 🔴 |

### Differentiators Schema Example

```json
{
  "uniqueFeatures": [
    {
      "name": "MCP native support",
      "description": "Built-in Model Context Protocol for tool integration",
      "comparedTo": ["Copilot: No MCP", "Cursor: Limited MCP"]
    }
  ],
  "leadingFeatures": [
    {
      "name": "Extended thinking",
      "description": "Deep multi-step reasoning with visible thought process",
      "comparedTo": ["Copilot: Basic completion", "Cursor: Less transparent"]
    }
  ],
  "tableStakes": [
    "Code completion",
    "Chat assistance",
    "VS Code integration"
  ],
  "laggingFeatures": [
    {
      "name": "IDE-native experience",
      "reason": "Terminal-first design means IDE is secondary",
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
  "differentiationSummary": "Claude Code differentiates through first-party Claude integration, MCP protocol, and terminal-first design."
}
```

---

## Source Model - Citations and References

Sources are URLs that back assertions.

### Core Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `id` | string (CUID) | Primary key | Internal use |
| `url` | string | Source URL | Clickable link |
| `title` | string? | Page title | Display name |
| `sourceType` | string? | Classification | See types below |
| `status` | enum | Validation state | Badge indicator |

**Source Types**:
- `vendor_docs` - Official documentation
- `blog` - Blog posts
- `github` - GitHub repositories
- `forum` - Community discussions
- `press` - Press releases
- `video` - Video content

**SourceStatus Values**:
| Status | Meaning |
|--------|---------|
| `PROPOSED` | Agent-added, unverified |
| `VALIDATED` | Human-verified useful |
| `REJECTED` | Doesn't actually support claim |

### URL Health Fields

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `lastFetchedAt` | DateTime? | Last access | Freshness |
| `lastStatusCode` | int? | HTTP status | 🔴 if 404/5xx |
| `isAccessible` | boolean | Currently reachable | ⚠️ if false |

### AssertionSource (Join Table)

Links assertions to sources with grading metadata.

| Field | Type | Description | Display Notes |
|-------|------|-------------|---------------|
| `quote` | string? | Relevant excerpt | Highlighted quote |
| `addedBy` | string? | Who added | null=agent, else human name |
| `relevanceGrade` | enum? | How relevant | Color-coded grade |
| `annotation` | string? | Grader's notes | Expandable |

**SourceRelevance Grades**:
| Grade | Score | Meaning | Visual |
|-------|-------|---------|--------|
| `DIRECT_EVIDENCE` | 5 | Explicitly proves claim | 🟢 |
| `STRONG_SUPPORT` | 4 | Strong supporting evidence | 🟢 |
| `PARTIAL_SUPPORT` | 3 | Partially addresses claim | 🟡 |
| `WEAK_SUPPORT` | 2 | Tangentially related | 🟠 |
| `NOT_RELEVANT` | 1 | Doesn't support claim | 🔴 |
| `MISLEADING` | 0 | Contradicts or misinterpreted | ⛔ |

---

## Discovery Models - Automated Research

These models support automated crawling and discovery of new entities.

### DiscoverySource

Curated information sources for crawling.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Source name ("The Pragmatic Engineer Newsletter") |
| `url` | string | Base URL |
| `sourceType` | enum | `BLOG`, `GITHUB_LIST`, `REDDIT`, `X_ACCOUNT`, etc. |
| `category` | string | Grouping ("newsletters", "github", "reddit") |
| `crawlStrategy` | string | How to crawl (`rss`, `github_api`, `html_scrape`) |
| `crawlFrequency` | string | How often (`hourly`, `daily`, `weekly`) |
| `hitRate` | float? | Discovery success rate |

### RawDiscovery

Unprocessed discoveries before deduplication.

| Field | Type | Description |
|-------|------|-------------|
| `mentionedName` | string | Name as mentioned |
| `briefDescription` | string? | Context snippet |
| `discoveryUrl` | string | Where found |
| `noveltyScore` | float? | How new/interesting |
| `relevanceScore` | float? | How on-topic |
| `processed` | boolean | Whether handled |
| `matchedEntityId` | string? | If matched existing entity |
| `createdEntityId` | string? | If created new entity |

### DiscoveryTrend

Detected patterns across discoveries.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Trend name |
| `mentionCount` | int | Times mentioned |
| `entityCount` | int | Related entities |
| `sourceSpread` | int | Different sources mentioning |
| `velocity` | float? | Growth rate |
| `trendScore` | float? | Overall significance |
| `emergingScore` | float? | Newness factor |

---

## Classification Models - Categorization

### DiscoveryCategory

LLM-based entity classification definitions.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Machine key (`ai_code_assistants`) |
| `displayName` | string | Human label ("Code Assistants") |
| `description` | string | Rich definition |
| `inclusionCriteria` | string? | What qualifies |
| `exclusionCriteria` | string? | What disqualifies |
| `exemplarEntities` | string[] | Example entities that belong |
| `antiExemplars` | string[] | Entities that DON'T belong |
| `entityCount` | int | Entities in this category |

### ResearchDomain

Flexible domain-driven research scoping.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Domain name ("Agentic-SDLC-Tools") |
| `description` | string | What domain covers |
| `entityTypes` | string[] | Allowed types (`["tool", "framework"]`) |
| `inclusionCriteria` | string? | Qualification criteria |
| `exclusionCriteria` | string? | Disqualification criteria |
| `searchHints` | string? | Query generation guidance |
| `knownLeaders` | string[] | Seed entities for "X alternatives" searches |
| `relevantTopics` | string[] | Topics to explore |
| `entityCount` | int | Entities in domain |

---

## Research Session Models - Orchestration

For coordinating multi-category deep research.

### ResearchSession

| Field | Type | Description |
|-------|------|-------------|
| `entityId` | string | Entity being researched |
| `researcherName` | string | Agent/human name |
| `status` | enum | `INITIALIZING`, `PLANNING`, `RESEARCHING`, `COMPLETED`, `FAILED` |
| `categories` | string[] | Schema types to extract |
| `mode` | string | `sequential` or `parallel` |
| `totalTasks` | int | Task count |
| `completedTasks` | int | Completed count |
| `overallProgress` | JSON | Progress metrics |

### ResearchTask

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | string | Parent session |
| `category` | string | Schema type (`pricing`, `features`) |
| `status` | enum | `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED` |
| `agentId` | string? | Assigned agent |
| `progress` | JSON | Task progress |
| `results` | JSON | Task output |

---

## Validation Workflows

### Assertion Validation Flow

```
      ┌──────────┐
      │  CLAIM   │  ← Initial state (agent-created)
      └────┬─────┘
           │
    Human reviews
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌──────────┐
│EVIDENCE │  │ REJECTED │
└─────────┘  └──────────┘
     │            │
     │     supersededBy
     │            │
     ▼            ▼
 Cited in    Re-research
 conclusions  new claim
```

### Source Validation Flow

```
      ┌───────────┐
      │ PROPOSED  │  ← Initial state
      └─────┬─────┘
            │
     Human verifies URL
     grades relevance
            │
      ┌─────┴─────┐
      │           │
      ▼           ▼
┌───────────┐ ┌──────────┐
│ VALIDATED │ │ REJECTED │
└───────────┘ └──────────┘
```

### Evidence-First Research Flow

```
1. FETCH URL
   └─► Screenshot captured
   └─► Content cached

2. ANALYZE (Claude reads screenshot)
   └─► Identifies specific text/elements
   └─► Notes exact location on page

3. SAVE EXTRACTION
   └─► Structured data persisted
   └─► Assertions auto-generated
   └─► Evidence chain recorded
```

---

## Scoring Systems

### Entity Scoring (Composite)

```
CompositeScore = (Buzz × 0.25) + (Federal × 0.25) + (Capability × 0.25) + (Confidence × 0.25)
```

| Dimension | Range | Description |
|-----------|-------|-------------|
| **Buzz Score** | 0.0-1.0 | Market presence: mentions, funding, GitHub stars |
| **Federal Viability** | 0.0-1.0 | FedRAMP/compliance readiness |
| **Capability Score** | 0.0-1.0 | Feature depth vs competitors |
| **Confidence Score** | 0.0-1.0 | Evidence quality for assertions |

### Federal Viability Score

| Pathway Present | Points |
|-----------------|--------|
| Direct FedRAMP ATO | +0.4 |
| Inherited via AWS GovCloud | +0.3 |
| Inherited via Azure Gov | +0.3 |
| Inherited via GCP FedRAMP | +0.2 |
| Air-gapped option | +0.3 |
| Private Link/VPC | +0.1 |
| On-premise deployment | +0.2 |

Maximum = 1.0 (capped)

### Assertion Criticality Score

Factors:
- Source spread (multiple sources confirm)
- Mention count (frequency)
- Category weight (compliance > feature)
- Pillar status (cited in conclusions)

---

## Frontend Display Recommendations

### Entity Cards

```
┌─────────────────────────────────────────┐
│ [LOGO]  Entity Name                     │
│         entityType • category           │
│                                         │
│  Federal: 🟢 GREEN (0.85)              │
│  Assertions: 28 (8 validated)           │
│  Extractions: 4 types covered           │
│                                         │
│  [View Details]  [Edit]                 │
└─────────────────────────────────────────┘
```

### Assertion List Item

```
┌─────────────────────────────────────────┐
│ 🟡 HIGH  │  CLAIM  │  pricing           │
├─────────────────────────────────────────┤
│ Claude Code Pro tier costs $20/month    │
│ with unlimited usage                    │
│                                         │
│ 📸 Screenshot: pricing-page.png         │
│ 📎 Sources: 2 (1 graded)                │
│                                         │
│ ⭐ Pillar: P2 PILLAR - Pricing          │
└─────────────────────────────────────────┘
```

### Extraction Display

Show schema-specific renderings:

**Pricing**: Tier comparison table
**Compliance**: Certification badges + federal pathway diagram
**Differentiators**: Competitive matrix (us vs them)
**Features**: Category accordion with feature chips

### Color Coding Summary

| Context | Green | Yellow | Orange | Red |
|---------|-------|--------|--------|-----|
| Assertion Status | EVIDENCE | - | - | REJECTED |
| Criticality | LOW | MEDIUM | HIGH | CRITICAL |
| Federal Viability | GREEN | YELLOW | ORANGE | RED |
| Source Relevance | DIRECT/STRONG | PARTIAL | WEAK | NOT_RELEVANT/MISLEADING |
| URL Health | 200 | 3xx | 4xx | 5xx |

### Screenshot Evidence Display

- Show thumbnail with lightbox on click
- Display `evidenceDescription` as caption
- For `evidenceChain`, show carousel/gallery
- Highlight the specific area mentioned in description if possible

### Validation UI

For human reviewers:
1. Show claim prominently
2. Display screenshot evidence (full-size)
3. Show existing sources with grades
4. Provide VALIDATE / REJECT / PARTIALLY VALIDATE buttons
5. Capture `humanResponse` notes
6. Allow adding new sources

---

## Key Queries Frontend Will Need

```sql
-- Entities in a project with category
SELECT e.*, dc.displayName as categoryName
FROM entities e
LEFT JOIN discovery_categories dc ON e.categoryId = dc.id
WHERE e.projectId = ?

-- Assertions by criticality
SELECT * FROM assertions
WHERE entityId = ?
ORDER BY
  CASE criticality
    WHEN 'CRITICAL' THEN 1
    WHEN 'HIGH' THEN 2
    WHEN 'MEDIUM' THEN 3
    ELSE 4
  END

-- Pillar assertions
SELECT * FROM assertions
WHERE citedInConclusion = true
AND entityId = ?

-- Latest extraction per schema type
SELECT DISTINCT ON (schemaType) *
FROM extractions
WHERE entityId = ?
ORDER BY schemaType, extractedAt DESC

-- Federal-viable entities
SELECT e.*, ext.data->'federalViabilityScore' as fedScore
FROM entities e
JOIN extractions ext ON ext.entityId = e.id
WHERE ext.schemaType = 'compliance'
AND (ext.data->'federalViabilityScore')::float >= 0.5
```

---

## Questions?

This document covers the core data model. For specific implementation questions:

1. **Schema definitions**: See `prisma/schema.prisma`
2. **Extraction schemas**: See `src/tools/extractor/schemas.ts`
3. **CLI commands**: See `CLAUDE.md` for full command reference
4. **Research workflow**: See `.claude/skills/research-entity/SKILL.md`

---

*Document generated: 2026-01-22*
*Schema version: Based on current Prisma schema with federal viability extensions*
