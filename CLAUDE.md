# Deep Research - Claude Code Subagent Guide

This project provides a persistent research database for Claude Code subagents to record and refine research findings. The system follows the pattern outlined in VISION.md: Entities are discovered, Assertions (claims) are made about those entities, and human researchers validate Claims into Evidence.

## Quick Start

```bash
# Setup database (first time or after git pull)
./install.sh

# Use the CLI to interact with the database
npm run cli -- <command> '<json-args>'
```

---

## EVIDENCE-FIRST RESEARCH PROTOCOL

**CRITICAL: This protocol replaces URL-centric evidence collection.**

Analysis of validated assertions revealed that 43% of agent-provided source URLs were graded as MISLEADING - the assertions were correct but the URLs didn't support them. Screenshots captured during human validation became the actual evidence.

### The Problem with URL-Only Evidence

| Issue | Example |
|-------|---------|
| Quote hallucination | Agent cites text that doesn't exist at URL |
| Broken links | Page moved or removed (404) |
| Content drift | Pricing changed since capture |
| Wrong page | Correct site, wrong URL |

### MANDATORY: Citation Verification Before Citing Quotes

**NEVER cite quotes from WebSearch results directly.** WebSearch snippets may be outdated, hallucinated, or paraphrased.

Before citing ANY quote from a URL, run:

```bash
npm run cli -- cite:verify '{"url": "https://example.com/page", "quote": "exact text to cite"}'
```

**Interpret results:**

| Recommendation | Meaning | Action |
|----------------|---------|--------|
| `CITE` | Quote verified on page | Safe to cite |
| `PARAPHRASE` | Quote not found, similar content exists | Use `similarPhrases` from response |
| `DO_NOT_CITE` | Quote doesn't exist | Do not cite this quote |
| `PAGE_NOT_FOUND` | URL inaccessible | URL is invalid, find alternative |

**Example:**
```bash
# WRONG: Citing WebSearch snippet without verification
"According to https://cline.bot/privacy: 'code snippets are transmitted to AI providers'"

# RIGHT: Verify first
npm run cli -- cite:verify '{"url": "https://cline.bot/privacy", "quote": "code snippets are transmitted"}'
# Response: recommendation: "DO_NOT_CITE" - quote doesn't exist!
# Then find actual text or don't cite
```

---

## ADVERSARIAL VALIDATION STORAGE

**USE THESE COMMANDS TO PERSIST VALIDATION RESULTS.** The `/research-validation` skill produces structured verdicts that must be stored rigorously.

### ValidationResult Model

Each validation is stored with:
- **Verdict**: ROBUST, CONDITIONAL, WEAK, REFUTED, UNVERIFIABLE
- **Confidence**: HIGH, MEDIUM, LOW, UNKNOWN
- **Method**: ADVERSARIAL (5 attack vectors), MANUAL, AUTOMATED, HYBRID
- **Attack Results**: Findings from each attack vector
- **Counter-Evidence**: Verified quotes that challenge the claim
- **Conditions**: For CONDITIONAL verdicts, what conditions apply
- **Refined Claim**: If the original claim needed qualification

### Creating a Validation Result

```bash
npm run cli -- validation:create '{
  "assertionId": "<id>",
  "verdict": "CONDITIONAL",
  "confidence": "HIGH",
  "method": "ADVERSARIAL",
  "refinedClaim": "Cline transmits code to AI providers when using Cline-provided API keys",
  "attackResults": {
    "counterEvidence": {"challenged": false},
    "evidenceGap": {"challenged": true, "finding": "Only applies to Cline API keys, not user-provided keys", "severity": "major"},
    "logicalFlaw": {"challenged": false},
    "scopeLimitation": {"challenged": true, "finding": "Privacy policy language is ambiguous", "severity": "minor"},
    "alternativeExplanation": {"challenged": false}
  },
  "conditions": [
    {"condition": "User must be using Cline-provided API keys", "implication": "If using own keys, data goes directly to provider"}
  ],
  "summary": "Claim is valid but only for a subset of users",
  "recommendations": "Clarify in reports that this applies to Cline API key users only",
  "validatorId": "validation-agent-001"
}'
```

### Query Validation Results

```bash
# Get all validations for an entity
npm run cli -- validation:list '{"entityId": "<id>"}'

# Get validations by verdict
npm run cli -- validation:list '{"verdict": "REFUTED"}'

# Get latest validation for an assertion
npm run cli -- validation:latest '{"assertionId": "<id>"}'

# Get validation history (all validations for an assertion)
npm run cli -- validation:history '{"assertionId": "<id>"}'

# Get full validation details
npm run cli -- validation:get '{"validationId": "<id>"}'

# Get validation summary for a project
npm run cli -- validation:summary '{"projectId": "<id>"}'
```

### Find Assertions Needing Validation

```bash
# Get pillar assertions (CRITICAL + HIGH criticality)
npm run cli -- validation:pillars '{"entityId": "<id>"}'

# Get unvalidated assertions
npm run cli -- validation:unvalidated '{"entityId": "<id>"}'

# Filter by criticality
npm run cli -- validation:unvalidated '{"entityId": "<id>", "criticality": "CRITICAL"}'
```

### Verdict Meanings

| Verdict | Meaning | Assertion Status |
|---------|---------|------------------|
| ROBUST | Withstands all attack vectors | EVIDENCE |
| CONDITIONAL | True only under specific conditions | EVIDENCE |
| WEAK | Insufficient evidence | CLAIM (unchanged) |
| REFUTED | Counter-evidence disproves | REJECTED |
| UNVERIFIABLE | Cannot be verified | CLAIM (unchanged) |

### Verified Citations

Citations verified via `cite:verify` can be persisted for audit trail:

```bash
# Create a persisted citation record
npm run cli -- citation:create '{
  "url": "https://example.com/page",
  "quote": "exact quoted text",
  "found": true,
  "accessible": true,
  "statusCode": 200,
  "context": "...surrounding text...",
  "recommendation": "CITE",
  "validationResultId": "<optional-link-to-validation>"
}'

# Find a cached citation (avoids re-fetching)
npm run cli -- citation:find '{"url": "https://example.com/page", "quote": "exact text"}'

# List recent citations
npm run cli -- citation:list '{"limit": 20}'
```

---

### Evidence-First Workflow

When making assertions, follow this order:

#### Step 1: Capture Screenshot Evidence FIRST

```bash
npm run cli -- extract:fetch '{"url": "https://example.com/pricing", "entityId": "<id>"}'
# Returns: screenshotPath, cacheId, contentPreview
```

#### Step 2: Analyze Screenshot and Extract Supporting Text

- **Read the screenshot visually** (use the returned screenshotPath)
- **Identify SPECIFIC text/elements** that support the claim
- **Note the exact location** on the page (e.g., "pricing table row 3")

#### Step 3: Record Assertion with Evidence Chain

```bash
npm run cli -- assertion:create '{
  "entityId": "<id>",
  "claim": "Tabnine Enterprise pricing starts at $39 per user per month",
  "category": "pricing",
  "evidenceDescription": "On screenshot at screenshots/2025-01/tabnine-pricing.png, the Enterprise tier row shows: Enterprise - Starting at $39/user/mo (billed annually)",
  "evidenceScreenshotPath": "screenshots/2025-01/tabnine-pricing.png",
  "sourceUrl": "https://tabnine.com/pricing",
  "reasoning": "Establishes baseline pricing for federal budget planning"
}'
```

### Evidence Description Requirements

Your `evidenceDescription` MUST:
- Reference the specific screenshot path
- Quote the EXACT visible text that supports the claim
- Explain WHERE on the page the text appears
- Describe HOW the text supports the claim

**Good Examples:**
- "On screenshot at screenshots/2025-01/cursor-pricing.png, the pricing table shows 'Pro: $20/mo' in the second column header"
- "Screenshot screenshots/2025-01/tabnine-docs.png shows the deployment diagram with 'Air-gapped' as an option in the architecture section"
- "The compliance page screenshot shows SOC 2 Type II badge in the certifications grid (upper right)"

**Bad Examples:**
- "See pricing page" (no specific evidence)
- "Documentation mentions this feature" (no screenshot reference)
- "From the website" (no details)

### Multiple Evidence Screenshots

For complex claims, chain multiple screenshots:

```bash
npm run cli -- assertion:create '{
  "entityId": "<id>",
  "claim": "Tabnine offers both cloud and air-gapped deployment options",
  "category": "feature",
  "evidenceDescription": "Primary: Deployment page shows 'Self-Hosted' option in the deployment selector",
  "evidenceScreenshotPath": "screenshots/2025-01/tabnine-deployment-options.png",
  "evidenceChain": [
    {
      "screenshotPath": "screenshots/2025-01/tabnine-deployment-options.png",
      "description": "Deployment options dropdown showing SaaS, VPC, Self-Hosted, Air-Gapped"
    },
    {
      "screenshotPath": "screenshots/2025-01/tabnine-airgap-docs.png",
      "description": "Air-gapped installation documentation page confirming offline deployment"
    }
  ],
  "sourceUrl": "https://docs.tabnine.com/deployment"
}'
```

### DO NOT

- Cite quotes you haven't **visually confirmed** on a screenshot
- Assume URL content matches your quote without capturing evidence
- Use source URL as **primary** evidence (it's now secondary reference)
- Create assertions without `evidenceDescription` and `evidenceScreenshotPath`

### Source URLs Are Now Secondary

Source URLs remain useful for:
- Traceability (where did info come from?)
- Future verification (human can revisit)
- Citation in reports

But the **primary evidence** is always: Screenshot + Description

---

## STRUCTURED EXTRACTION - Primary Deep Research Tool

**USE THESE COMMANDS FOR DEEP RESEARCH.** They extract queryable structured data from web pages, capture screenshots as evidence, and auto-generate assertions.

### RECOMMENDED: Fetch + Claude Reasoning + Save Workflow

This workflow uses your existing Claude session (no API key needed). It's the preferred approach for deep research.

```bash
# Step 1: FETCH - Get page content and screenshot
npm run cli -- extract:fetch '{"url": "https://cursor.com/pricing", "entityId": "<id>"}'
# Returns: cacheId, screenshotPath, contentPreview

# Step 2: ANALYZE - Claude reads the screenshot and extracts data
# (Claude uses the screenshot path and content preview to reason about pricing)

# Step 3: SAVE - Persist the structured data Claude extracted
npm run cli -- extract:save '{
  "entityId": "<id>",
  "schemaType": "pricing",
  "url": "https://cursor.com/pricing",
  "screenshotPath": "screenshots/...",
  "data": {
    "hasFreeTier": true,
    "hasEnterprise": true,
    "tiers": [
      {"name": "Hobby", "price": 0, "billingCycle": "free", "features": ["2000 completions"]},
      {"name": "Pro", "price": 20, "billingCycle": "month", "features": ["Unlimited completions"]},
      {"name": "Business", "price": 40, "billingCycle": "month/user", "features": ["Team features"]}
    ]
  }
}'
```

### Helper Commands

```bash
# Read cached content from a previous fetch
npm run cli -- extract:cache '{"cacheId": "abc123"}'

# Validate a URL without fetching
npm run cli -- extract:validate '{"url": "https://example.com"}'
```

### Schema Types

Use these `schemaType` values when saving extractions:
- `pricing` - Pricing tiers, prices, features per tier, enterprise options
- `features` - Product features, categories, highlights
- `company` - Founded, funding, headquarters, leadership, employee count
- `compliance` - SOC2, FedRAMP, certifications, security features
- `integrations` - APIs, SDKs, native integrations, partner ecosystem
- `differentiators` - Competitive differentiation: unique features, market-leading features, gaps vs competitors

### Alternative: Automated Extraction (Requires ANTHROPIC_API_KEY)

If you have `ANTHROPIC_API_KEY` set, these commands do everything in one step:

```bash
# Extract pricing information (tiers, prices, features, limits)
npm run cli -- extract:pricing '{"url": "https://cursor.com/pricing", "entityId": "<id>"}'

# Extract product features (categories, highlights, availability)
npm run cli -- extract:features '{"url": "https://cursor.com/features", "entityId": "<id>"}'

# Extract company info (founded, funding, headquarters, leadership)
npm run cli -- extract:company '{"url": "https://cursor.com/about", "entityId": "<id>"}'

# Extract compliance info (SOC2, FedRAMP, certifications)
npm run cli -- extract:compliance '{"url": "https://cursor.com/security", "entityId": "<id>"}'

# Extract integrations (APIs, SDKs, native integrations)
npm run cli -- extract:integrations '{"url": "https://cursor.com/integrations", "entityId": "<id>"}'

# Extract competitive differentiators (unique features, gaps vs competitors)
npm run cli -- extract:differentiators '{"url": "https://cursor.com/vs-copilot", "entityId": "<id>"}'
```

### What Extraction Does

1. **Fetches URL** using Playwright (handles JavaScript-rendered content)
2. **Captures screenshot** as point-in-time evidence
3. **Extracts structured data** (either via Claude reasoning or API)
4. **Validates source** and updates accessibility status
5. **Auto-generates assertions** from extracted data

### Extraction Query Commands

```bash
# Get all extractions for an entity
npm run cli -- extract:list '{"entityId": "<id>"}'

# Get latest extraction of a specific type
npm run cli -- extract:latest '{"entityId": "<id>", "schemaType": "pricing"}'

# Find stale extractions that need refresh
npm run cli -- extract:stale '{"projectId": "<id>"}'

# Get extraction summary for a project
npm run cli -- extract:summary '{"projectId": "<id>"}'
```

### Example: Deep Research an Entity

```bash
# 1. Create the entity
npm run cli -- entity:create '{"projectId": "abc123", "name": "Cursor", "url": "https://cursor.com", "entityType": "tool"}'

# 2. Fetch and analyze (recommended workflow)
npm run cli -- extract:fetch '{"url": "https://cursor.com/pricing", "entityId": "<id>"}'
# → Claude reads screenshot, extracts pricing data
npm run cli -- extract:save '{"entityId": "<id>", "schemaType": "pricing", "url": "...", "data": {...}}'

# 3. Repeat for other pages
npm run cli -- extract:fetch '{"url": "https://cursor.com/features", "entityId": "<id>"}'
npm run cli -- extract:fetch '{"url": "https://cursor.com/about", "entityId": "<id>"}'

# 4. Check what was extracted
npm run cli -- extract:list '{"entityId": "<id>"}'
```

### Extraction Output

Fetch returns:
```json
{
  "success": true,
  "cacheId": "abc123def456",
  "cachePath": ".cache/extractions/abc123def456.json",
  "screenshotPath": "screenshots/2025-12/cursor-abc123.png",
  "contentPreview": "First 2000 chars of page text...",
  "entityName": "Cursor"
}
```

Save returns:
```json
{
  "success": true,
  "extractionId": "cmjk...",
  "assertionsCreated": ["cmjk...", "cmjk..."]
}
```

---

## DIFFERENTIATORS EXTRACTION - Competitive Analysis

**USE THIS FOR COMPETITIVE POSITIONING.** The `differentiators` schema captures what makes an entity DIFFERENT from competitors, not just what it does.

### Feature Categories

| Category | Description | Auto-generated Assertion |
|----------|-------------|--------------------------|
| **uniqueFeatures** | Features ONLY this entity has | `UNIQUE DIFFERENTIATOR: [feature]` |
| **leadingFeatures** | Features where entity is best-in-class | `MARKET LEADER: [feature]` |
| **tableStakes** | Features everyone has (not differentiating) | *(none - tracked for context)* |
| **laggingFeatures** | Features where competitors are better | `COMPETITIVE GAP: [feature]` |
| **missingFeatures** | Features competitors have that entity lacks | `MISSING FEATURE: [feature]` |

### Differentiators Schema Structure

```json
{
  "uniqueFeatures": [
    {
      "name": "2M token context window",
      "description": "Supports 2 million token context for entire codebase analysis",
      "evidenceSource": "screenshots/2026-01/cursor-context.png",
      "comparedTo": ["Copilot: 8k tokens", "Codeium: 128k tokens"]
    }
  ],
  "leadingFeatures": [
    {
      "name": "Multi-file editing",
      "description": "Edit multiple files simultaneously in one operation",
      "comparedTo": ["Copilot: single file only"]
    }
  ],
  "tableStakes": ["Code completion", "Chat interface", "VS Code integration"],
  "laggingFeatures": [
    {
      "name": "Enterprise deployment",
      "reason": "No self-hosted option available",
      "competitors": ["Tabnine", "Codeium"]
    }
  ],
  "missingFeatures": [
    {
      "name": "Air-gapped deployment",
      "competitors": ["Tabnine", "Sourcegraph"],
      "importance": "critical"
    }
  ],
  "primaryCompetitors": ["GitHub Copilot", "Cursor", "Tabnine"],
  "differentiationSummary": "Leads on context window size but lacks enterprise deployment flexibility"
}
```

### Workflow

```bash
# 1. Fetch comparison/features pages
npm run cli -- extract:fetch '{"url": "https://example.com/vs-copilot", "entityId": "<id>"}'
npm run cli -- extract:fetch '{"url": "https://example.com/features", "entityId": "<id>"}'

# 2. Claude analyzes screenshots and identifies differentiators

# 3. Save differentiators extraction
npm run cli -- extract:save '{
  "entityId": "<id>",
  "schemaType": "differentiators",
  "url": "https://example.com/features",
  "screenshotPath": "screenshots/...",
  "data": { ... }
}'
```

### Why Differentiators Matter

Differentiation claims often become **pillar assertions** because:
- They define **why choose this over alternatives**
- They reveal **strategic gaps** (leader lacks common feature)
- They directly impact **procurement decisions**

---

## RESEARCH GAPS - What Needs Research?

**USE THIS COMMAND TO PLAN RESEARCH.** It shows exactly what's missing across all entities.

```bash
npm run cli -- research:gaps '{"projectId": "<id>"}'
```

### What It Returns

```json
{
  "summary": {
    "totalEntities": 63,
    "entitiesWithUrl": 63,
    "entitiesWithNoExtractions": 62,
    "entitiesFullyCovered": 0,
    "averageExtractionCount": 0.1,
    "totalExtractions": 1
  },
  "coverageBySchema": [
    {"schemaType": "pricing", "coveragePercent": 2, "entitiesWithoutExtraction": 62},
    {"schemaType": "features", "coveragePercent": 0, "entitiesWithoutExtraction": 63},
    ...
  ],
  "priorities": {
    "high": [...],   // Has URL, 0 extractions - research these first!
    "medium": [...], // Has URL, some extractions - complete these
    "low": [...]     // No URL - add URL before extracting
  },
  "nextActions": [
    "Extract pricing data (2% coverage, 62 entities missing)",
    "Research high-priority entities: AWS Kiro, Aider, Aikido Security"
  ]
}
```

### Priority Levels

| Priority | Meaning | Action |
|----------|---------|--------|
| **High** | Has URL, no extractions | Research immediately |
| **Medium** | Has URL, partial extractions | Complete the gaps |
| **Low** | No URL | Add URL first |

### Research Workflow

```bash
# 1. Check gaps
npm run cli -- research:gaps '{"projectId": "..."}'

# 2. Pick a high-priority entity
# 3. Fetch and extract
npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
# 4. Claude analyzes screenshot, saves extraction
npm run cli -- extract:save '{"entityId": "...", "schemaType": "pricing", ...}'

# 5. Repeat until coverage improves
```

---

## CROSS-ENTITY QUERIES - Analyze Across Entities

**USE THESE COMMANDS TO ANALYZE RESEARCH.** Query and compare extracted data across multiple entities.

### Generic Search (Works with Any Data)

```bash
# Search for any text across all extractions
npm run cli -- query:search '{"projectId": "...", "searchText": "kubernetes"}'

# Filter by schema type
npm run cli -- query:search '{"projectId": "...", "schemaType": "pricing", "searchText": "free"}'

# Filter by specific field values
npm run cli -- query:search '{"projectId": "...", "filters": {"hasFreeTier": true}}'

# Use operators: >, <, >=, <=, !=null, contains:
npm run cli -- query:search '{"projectId": "...", "schemaType": "pricing", "filters": {"lowestPaidPrice": "<50"}}'
```

### Discover Field Values

```bash
# What values exist for a field across all entities?
npm run cli -- query:values '{"projectId": "...", "schemaType": "pricing", "fieldPath": "hasFreeTier"}'
# Returns: [{ value: true, count: 10, entities: ["Cursor", "Copilot", ...] }]

npm run cli -- query:values '{"projectId": "...", "schemaType": "compliance", "fieldPath": "fedRampStatus"}'
```

### Schema-Specific Queries

```bash
# Query pricing across all entities
npm run cli -- query:pricing '{"projectId": "...", "hasFreeTier": true, "sortBy": "price_asc"}'

# Query compliance (find FedRAMP authorized tools)
npm run cli -- query:compliance '{"projectId": "...", "soc2": true, "fedRampStatus": "Authorized"}'

# Query features (search for specific capabilities)
npm run cli -- query:features '{"projectId": "...", "searchTerm": "AI", "category": "Security"}'

# Query integrations
npm run cli -- query:integrations '{"projectId": "...", "hasApi": true, "searchTerm": "GitHub"}'

# Query company info (filter by founding year)
npm run cli -- query:companies '{"projectId": "...", "minFounding": 2020}'
```

### Compare Entities Side-by-Side

```bash
# Compare pricing for specific entities
npm run cli -- query:compare '{"entityIds": ["<id1>", "<id2>", "<id3>"], "schemaType": "pricing"}'

# Compare compliance posture
npm run cli -- query:compare '{"entityIds": ["<id1>", "<id2>"], "schemaType": "compliance"}'
```

### Example: Competitive Analysis

```bash
# 1. Find all tools with free tiers
npm run cli -- query:pricing '{"projectId": "...", "hasFreeTier": true}'

# 2. Find tools with FedRAMP
npm run cli -- query:compliance '{"projectId": "...", "fedRampStatus": "Authorized"}'

# 3. Compare top 3 competitors
npm run cli -- query:compare '{"entityIds": ["cursor-id", "copilot-id", "codeium-id"], "schemaType": "pricing"}'

# 4. Find tools mentioning a specific integration
npm run cli -- query:integrations '{"projectId": "...", "searchTerm": "VS Code"}'
```

---

## EXTRACTION DIFF - Track Changes Over Time

**USE THESE COMMANDS TO MONITOR CHANGES.** Compare extractions to detect price changes, feature updates, etc.

### Compare Latest to Previous

```bash
# What changed since last extraction?
npm run cli -- diff:latest '{"entityId": "...", "schemaType": "pricing"}'
```

Returns:
```json
{
  "hasChanges": true,
  "changes": [
    {"path": "tiers[1].price", "type": "changed", "oldValue": 20, "newValue": 25},
    {"path": "tiers[2].isRecommended", "type": "removed", "oldValue": true},
    {"path": "tiers[4].features[1]", "type": "changed", "oldValue": "Usage analytics and reporting", "newValue": "Usage analytics"}
  ],
  "summary": {"added": 0, "removed": 8, "changed": 6, "total": 14},
  "daysBetween": 3
}
```

### View Extraction History

```bash
# See all extractions for an entity
npm run cli -- diff:history '{"entityId": "...", "schemaType": "pricing"}'
```

### Compare Specific Extractions

```bash
# Diff any two extraction IDs
npm run cli -- diff:compare '{"oldExtractionId": "...", "newExtractionId": "..."}'
```

### Find All Recent Changes

```bash
# What entities changed in the last 30 days?
npm run cli -- diff:changes '{"projectId": "...", "daysBack": 30}'

# Filter by schema type
npm run cli -- diff:changes '{"projectId": "...", "schemaType": "pricing", "daysBack": 7}'
```

### Change Types

| Type | Meaning | Example |
|------|---------|---------|
| `added` | New field/value | New pricing tier added |
| `removed` | Field/value deleted | Feature removed from tier |
| `changed` | Value modified | Price changed $20→$25 |

### Research Refresh Workflow

```bash
# 1. Check for stale extractions
npm run cli -- extract:stale '{"projectId": "..."}'

# 2. Re-extract pricing for an entity
npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
# → Claude analyzes, saves new extraction

# 3. Check what changed
npm run cli -- diff:latest '{"entityId": "...", "schemaType": "pricing"}'

# 4. Review all changes across project
npm run cli -- diff:changes '{"projectId": "..."}'
```

---

## RESEARCH AGENDA - Batch Processing Queue

**USE THESE COMMANDS FOR SYSTEMATIC RESEARCH.** Agendas help you work through entities methodically, tracking progress and resuming across sessions.

### Why Use Agendas?

- **Track Progress**: Know exactly what's done and what's left
- **Resume Work**: Pick up where you left off across sessions
- **Systematic Coverage**: Ensure no entities are missed
- **Suggested Commands**: Get exact commands to run for each item

### Create an Agenda

```bash
# Get suggested agendas based on research gaps
npm run cli -- agenda:suggest '{"projectId": "..."}'

# Create agenda for all entities missing a schema type
npm run cli -- agenda:create '{
  "projectId": "...",
  "name": "Extract pricing for all tools",
  "taskType": "extract:pricing",
  "filter": {"missingSchemaType": "pricing", "hasUrl": true}
}'

# Create agenda for specific entities
npm run cli -- agenda:create '{
  "projectId": "...",
  "name": "Deep dive top competitors",
  "taskType": "extract:features",
  "entityIds": ["<id1>", "<id2>", "<id3>"]
}'

# Create agenda filtered by entity type
npm run cli -- agenda:create '{
  "projectId": "...",
  "name": "Research all tools",
  "taskType": "custom",
  "taskDescription": "Extract pricing, features, and compliance",
  "filter": {"entityType": "tool", "hasUrl": true}
}'
```

### Work Through an Agenda

```bash
# Get next item to work on
npm run cli -- agenda:next '{"agendaId": "abc123"}'
# Returns: entity info, position, remaining count, and suggested command

# Mark current item as completed
npm run cli -- agenda:complete '{"agendaId": "abc123", "notes": "Optional notes"}'

# Skip an item (e.g., no pricing page found)
npm run cli -- agenda:skip '{"agendaId": "abc123", "reason": "No pricing page"}'

# Mark item as failed (e.g., site was down)
npm run cli -- agenda:fail '{"agendaId": "abc123", "error": "Site returned 503"}'
```

### Monitor Progress

```bash
# List all agendas
npm run cli -- agenda:list

# Get detailed agenda status
npm run cli -- agenda:status '{"agendaId": "abc123"}'
```

Status returns:
```json
{
  "progress": {
    "percent": 25,
    "completed": 15,
    "remaining": 47,
    "total": 62
  },
  "stats": {
    "pending": 45,
    "inProgress": 2,
    "completed": 15,
    "skipped": 0,
    "failed": 0
  },
  "currentItem": {...},
  "nextItems": [...]
}
```

### Manage Agendas

```bash
# Get full agenda details
npm run cli -- agenda:get '{"agendaId": "abc123"}'

# Reset agenda (retry failed items, etc.)
npm run cli -- agenda:reset '{"agendaId": "abc123", "resetFailed": true, "resetSkipped": false}'

# Delete an agenda
npm run cli -- agenda:delete '{"agendaId": "abc123"}'
```

### Example: Complete Research Workflow

```bash
# 1. Check gaps and get suggested agendas
npm run cli -- research:gaps '{"projectId": "..."}'
npm run cli -- agenda:suggest '{"projectId": "..."}'

# 2. Create agenda for biggest gap (e.g., pricing)
npm run cli -- agenda:create '{
  "projectId": "...",
  "name": "Extract pricing - December 2025",
  "taskType": "extract:pricing",
  "filter": {"missingSchemaType": "pricing", "hasUrl": true}
}'

# 3. Work loop
npm run cli -- agenda:next '{"agendaId": "abc123"}'
# → Returns entity with URL, use extract:fetch + extract:save
npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
# → Claude analyzes screenshot, extracts pricing
npm run cli -- extract:save '{"entityId": "...", "schemaType": "pricing", ...}'
npm run cli -- agenda:complete '{"agendaId": "abc123"}'

# 4. Repeat step 3 until done
npm run cli -- agenda:status '{"agendaId": "abc123"}'
# → Shows 100% complete when finished

# 5. Find any changes from re-extractions
npm run cli -- diff:changes '{"projectId": "..."}'
```

### Agenda Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `missingSchemaType` | Entities lacking this extraction | `"pricing"`, `"features"` |
| `entityType` | Filter by entity type | `"tool"`, `"service"` |
| `hasUrl` | Only entities with URLs | `true` |
| `entityIds` | Specific entity IDs | `["id1", "id2"]` |

### Item Status Flow

```
pending → in_progress → completed
                     → skipped (can retry)
                     → failed (can retry)
```

---

## LOGO WORKFLOW - Entity Branding (SVG-Focused)

**USE THESE COMMANDS FOR VISUAL IDENTITY.** Automatically find, download, and store logos for entities. **Prioritizes SVG format** for inline storage and infinite scalability.

### Why SVG?

| Benefit | Impact |
|---------|--------|
| **Vector format** | Scales infinitely without quality loss |
| **Stored inline** | SVG content saved directly in database |
| **Small size** | Typically 1-10KB vs 50-500KB for PNGs |
| **Embeddable** | Can be inserted directly into HTML/documents |

### Full Workflow (Recommended)

```bash
# Fetch logo automatically - searches website, prioritizes SVG, stores inline
npm run cli -- logo:fetch '{"entityId": "..."}'
```

Returns:
```json
{
  "success": true,
  "entityName": "Cursor",
  "logoUrl": "https://cursor.com/brand/logo.svg",
  "logoPath": "logos/cursor-abc123.svg",
  "logoFormat": "svg",
  "hasSvgContent": true,
  "searchedPages": ["https://cursor.com", "https://cursor.com/brand"],
  "candidatesFound": 10
}
```

### Get Inline SVG

```bash
# Get raw SVG markup for direct embedding
npm run cli -- logo:inline '{"entityId": "..."}'
```

Returns:
```json
{
  "success": true,
  "entityName": "Cursor",
  "format": "svg",
  "svgContent": "<svg xmlns=\"http://www.w3.org/2000/svg\"...>...</svg>",
  "logoUrl": "https://cursor.com/brand/logo.svg"
}
```

Use the `svgContent` directly in HTML, markdown, or documents.

### Step-by-Step Workflow

```bash
# 1. Search for logo candidates on entity's website
npm run cli -- logo:search '{"entityId": "..."}'

# 2. Verify a specific logo URL is valid
npm run cli -- logo:verify '{"url": "https://example.com/logo.svg"}'

# 3. Download a logo to local storage
npm run cli -- logo:download '{"url": "https://example.com/logo.svg", "entityName": "Example"}'

# 4. Save logo info to entity (with optional download)
npm run cli -- logo:save '{
  "entityId": "...",
  "logoUrl": "https://example.com/logo.svg",
  "logoSourceUrl": "https://example.com/brand",
  "download": true
}'
```

### Query Commands

```bash
# Get logo coverage summary for project
npm run cli -- logo:summary '{"projectId": "..."}'

# List entities without logos
npm run cli -- logo:missing '{"projectId": "..."}'

# Human verification of a logo
npm run cli -- logo:validate '{"entityId": "...", "verifiedBy": "researcher-name"}'

# Clear/remove logo from entity
npm run cli -- logo:clear '{"entityId": "..."}'

# Get inline SVG for embedding
npm run cli -- logo:inline '{"entityId": "..."}'
```

### Logo Storage

- **Remote URL**: Stored in `entity.logoUrl`
- **Local File**: Downloaded to `logos/` directory, path in `entity.logoPath`
- **SVG Inline**: Raw SVG markup stored in `entity.logoSvgContent` (database)
- **Format**: Detected automatically (svg preferred, then png, jpg, webp)
- **Source**: Where found stored in `entity.logoSourceUrl`

**SVG Priority**: When fetching logos, SVG candidates are tried first regardless of confidence score. This ensures inline storage whenever possible.

### What It Searches

The logo fetcher automatically checks:
- Main website homepage
- `/press`, `/press-kit`, `/brand`, `/brand-assets`
- `/media`, `/media-kit`, `/about`, `/company`

It looks for:
- Images with "logo" in filename, alt text, or CSS class
- SVG files (preferred format)
- Images containing the entity name
- Direct links to logo files on press/brand pages

### Logo Summary Output

```json
{
  "total": 63,
  "withLogo": 1,
  "withoutLogo": 62,
  "verified": 0,
  "downloaded": 1,
  "coverage": 2,
  "entitiesNeedingLogos": [...]
}
```

### Batch Logo Collection

```bash
# 1. Check which entities need logos
npm run cli -- logo:missing '{"projectId": "..."}'

# 2. Create agenda for batch processing
npm run cli -- agenda:create '{
  "projectId": "...",
  "name": "Fetch all logos",
  "taskType": "logo:fetch"
}'

# 3. Work through the agenda
npm run cli -- agenda:next '{"agendaId": "..."}'
npm run cli -- logo:fetch '{"entityId": "..."}'
npm run cli -- agenda:complete '{"agendaId": "..."}'
```

---

## Core Concepts

### Research Workflow
- **DISCOVERY**: Cast a broad net to identify entities matching search criteria
- **ANALYSIS**: Deep dive into a specific entity's claims and evidence

### Validation States
- **Assertions**: Start as `CLAIM`, progress to `EVIDENCE` when human-validated, or `REJECTED`
- **Sources**: Start as `PROPOSED`, progress to `VALIDATED` when human-verified, or `REJECTED`

## CLI Commands Reference

All commands accept JSON arguments and return JSON responses.

### Project Commands

```bash
# Create a new research project
npm run cli -- project:create '{"name": "Project Name", "description": "Description", "workflow": "DISCOVERY"}'

# List all projects
npm run cli -- project:list

# Get project details with all entities and assertions
npm run cli -- project:get '{"projectId": "<id>"}'

# Find project by name
npm run cli -- project:find '{"name": "Project Name"}'

# Update a project
npm run cli -- project:update '{"projectId": "<id>", "name": "New Name"}'

# Delete a project (cascades to all related data)
npm run cli -- project:delete '{"projectId": "<id>"}'
```

### Research Domain Commands

```bash
# Create a research domain (for domain-driven discovery)
npm run cli -- domain:create '{"name": "AI-Testing-Tools", "description": "AI-powered testing and QA tools", "entityTypes": ["tool"], "knownLeaders": ["Testim", "Mabl"], "relevantTopics": ["test generation", "QA automation"]}'

# List all research domains
npm run cli -- domain:list

# Get domain by name or ID
npm run cli -- domain:get '{"name": "AI-Testing-Tools"}'

# Update a domain
npm run cli -- domain:update '{"domainId": "<id>", "relevantTopics": ["test generation", "QA automation", "E2E testing"]}'

# Delete a domain
npm run cli -- domain:delete '{"domainId": "<id>"}'

# Get entities in a domain
npm run cli -- domain:entities '{"domainId": "<id>"}'

# Get domain summary with statistics
npm run cli -- domain:summary '{"domainId": "<id>"}'
```

### Discovery Category Commands

**LLM-based semantic classification** replaces regex-based entity categorization. Categories have rich definitions that Claude can reason about, including inclusion/exclusion criteria and exemplar entities.

#### Why Use Categories?

| Problem (Regex) | Solution (LLM Categories) |
|-----------------|---------------------------|
| "DocuWriter.ai" matched as code_assistants | DocuWriter.ai in anti-exemplars prevents misclassification |
| No semantic understanding | Claude reasons about category definitions |
| Changes require code deployment | Edit definitions in database |
| Can't explain classifications | `category:explain` shows reasoning |

#### CRUD Commands

```bash
# List all categories (9 default categories available)
npm run cli -- category:list

# Get category by ID
npm run cli -- category:get '{"categoryId": "<id>"}'

# Get category by name
npm run cli -- category:getByName '{"name": "ai_code_assistants"}'

# Create a new category
npm run cli -- category:create '{
  "name": "ai_code_assistants",
  "displayName": "Code Assistants",
  "description": "AI-powered tools that assist developers with code completion...",
  "inclusionCriteria": "Tools that: provide inline code completion, generate code from prompts",
  "exclusionCriteria": "Tools that: only review code, only generate documentation",
  "exemplarEntities": ["GitHub Copilot", "Cursor", "Codeium"],
  "antiExemplars": ["SonarQube", "DocuWriter.ai", "CodeRabbit"]
}'

# Update a category (fix misclassification by updating definition)
npm run cli -- category:update '{"categoryId": "<id>", "antiExemplars": ["DocuWriter.ai", "NewMisclassifiedTool"]}'

# Delete a category
npm run cli -- category:delete '{"categoryId": "<id>"}'
```

#### Classification Commands

```bash
# Get classification context (prompt + entity info for Claude to classify)
npm run cli -- category:context '{"entityId": "<id>"}'
# Returns: prompt with all category definitions, entity name/description

# Build classification prompt for any entity name
npm run cli -- category:prompt '{"entityName": "DocuWriter.ai", "description": "AI documentation tool"}'

# Apply a classification result to an entity
npm run cli -- category:apply '{
  "entityId": "<id>",
  "classification": {
    "categoryName": "ai_documentation",
    "confidence": "high",
    "reasoning": "DocuWriter.ai is listed as an exemplar for Documentation category"
  }
}'

# Explain why an entity has its current classification
npm run cli -- category:explain '{"entityId": "<id>"}'
# Returns: category definition, whether entity is exemplar/anti-exemplar, explanation
```

#### Analysis Commands

```bash
# Get entities in a category
npm run cli -- category:entities '{"categoryId": "<id>", "limit": 50}'

# Get category summary with statistics
npm run cli -- category:summary '{"categoryId": "<id>"}'
# Returns: entity count, assertions, extractions, logo coverage

# Get unclassified entities (need classification)
npm run cli -- category:unclassified '{"projectId": "<id>", "limit": 50}'

# Preview reclassification (dry-run)
npm run cli -- category:preview '{"projectId": "<id>", "onlyUnclassified": true}'

# Update category entity count
npm run cli -- category:updateStats '{"categoryId": "<id>"}'
npm run cli -- category:updateAllStats
```

#### Seeding & Migration

```bash
# Seed 9 default categories (run once after migration)
npm run cli -- category:seed

# Migrate entities from legacy discoveryCategory string to categoryId
npm run cli -- category:migrate '{"dryRun": true}'   # Preview
npm run cli -- category:migrate '{"dryRun": false}'  # Execute
```

#### Category Icons & Weights

```bash
# Suggest a contextually appropriate Google Material Icon for a category
npm run cli -- category:suggestIcon '{"categoryId": "<id>"}'
npm run cli -- category:suggestIcon '{"name": "ai_code_assistants"}'
# Returns: { icon: "smart_toy", alternatives: ["code", "terminal", ...], confidence: "exact" }

# Set a specific icon for a category
npm run cli -- category:setIcon '{"categoryId": "<id>", "icon": "smart_toy"}'

# Auto-assign icons to all categories without icons
npm run cli -- category:autoAssignIcons

# Calculate weight for a single category (entity count + buzz blend)
npm run cli -- category:weight '{"categoryId": "<id>"}'

# Calculate weights for all categories (for visual sizing)
npm run cli -- category:weights '{"projectId": "<id>"}'
# Returns: categories sorted by weight, each with normalizedWeight (0-1)
```

**Default Icon Mapping:**

| Category | Icon | Description |
|----------|------|-------------|
| `ai_code_assistants` | `smart_toy` | AI assistant/robot |
| `ai_code_review` | `rate_review` | Review/feedback |
| `ai_debugging` | `bug_report` | Bug/debugging |
| `ai_testing` | `science` | Testing/experimentation |
| `ai_documentation` | `description` | Documents |
| `ai_security` | `security` | Security shield |
| `ai_devops` | `settings_suggest` | DevOps/automation |
| `ai_analytics` | `insights` | Analytics/insights |
| `genai_concepts` | `psychology` | AI/brain concepts |

#### Default Categories

| Name | Display Name | Examples |
|------|--------------|----------|
| `ai_code_assistants` | Code Assistants | GitHub Copilot, Cursor, Codeium |
| `ai_code_review` | Code Review | CodeRabbit, Codacy, SonarQube |
| `ai_debugging` | Debugging & Error Analysis | Sentry, Raygun, Rollbar |
| `ai_testing` | Testing & QA | Qodo, Testim, Mabl |
| `ai_documentation` | Documentation | Mintlify, ReadMe, DocuWriter.ai |
| `ai_security` | Security | Snyk, Checkmarx, Semgrep |
| `ai_devops` | DevOps & Infrastructure | Harness, GitLab CI, Argo CD |
| `ai_analytics` | Analytics & Observability | Datadog, New Relic, Langfuse |
| `genai_concepts` | GenAI & LLM Infrastructure | LangChain, LlamaIndex, CrewAI |

#### Classification Workflow

```bash
# 1. Get unclassified entities
npm run cli -- category:unclassified '{"projectId": "..."}'

# 2. Get classification context for an entity
npm run cli -- category:context '{"entityId": "<id>"}'
# → Returns prompt with all category definitions

# 3. Claude reasons about the prompt and returns JSON:
# {"categoryName": "ai_documentation", "confidence": "high", "reasoning": "..."}

# 4. Apply the classification
npm run cli -- category:apply '{"entityId": "<id>", "classification": {...}}'

# 5. If misclassified, update category definition and re-classify
npm run cli -- category:update '{"categoryId": "<id>", "antiExemplars": ["MisclassifiedTool"]}'
npm run cli -- category:context '{"entityId": "<id>"}'  # Re-classify
```

### Entity Commands

```bash
# Create/upsert an entity (won't duplicate if name exists in project)
# Include domainId for domain-driven categorization
npm run cli -- entity:create '{"projectId": "<id>", "name": "Entity Name", "description": "Description", "entityType": "tool", "url": "https://example.com", "domainId": "<domain-id>"}'

# List entities in a project
npm run cli -- entity:list '{"projectId": "<id>"}'

# Get entity with all assertions and sources
npm run cli -- entity:get '{"entityId": "<id>"}'

# Find entity by name in a project
npm run cli -- entity:find '{"projectId": "<id>", "name": "Entity Name"}'

# Search entities across projects
npm run cli -- entity:search '{"query": "search term", "entityType": "tool"}'

# Check if entity exists
npm run cli -- entity:exists '{"projectId": "<id>", "name": "Entity Name"}'

# Update an entity
npm run cli -- entity:update '{"entityId": "<id>", "description": "Updated description"}'

# Delete an entity
npm run cli -- entity:delete '{"entityId": "<id>"}'
```

### Assertion Commands

```bash
# Create an assertion with optional reasoning and source
npm run cli -- assertion:create '{"entityId": "<id>", "claim": "The claim being made", "category": "feature", "reasoning": "Why this is true", "sourceUrl": "https://source.com", "sourceQuote": "Relevant quote"}'

# List assertions for an entity
npm run cli -- assertion:list '{"entityId": "<id>"}'

# Get assertion details
npm run cli -- assertion:get '{"assertionId": "<id>"}'

# Search assertions
npm run cli -- assertion:search '{"query": "search term", "category": "feature", "status": "CLAIM"}'

# Add additional reasoning to an assertion
npm run cli -- assertion:addReasoning '{"assertionId": "<id>", "content": "Additional reasoning"}'

# Find similar assertions (to avoid duplicates)
npm run cli -- assertion:findSimilar '{"entityId": "<id>", "claim": "Partial claim text"}'

# Update an assertion
npm run cli -- assertion:update '{"assertionId": "<id>", "category": "pricing"}'

# Validate an assertion (human action - promotes to EVIDENCE)
npm run cli -- assertion:validate '{"assertionId": "<id>", "validatedBy": "researcher-name"}'

# Reject an assertion (human action)
npm run cli -- assertion:reject '{"assertionId": "<id>", "validatedBy": "researcher-name"}'

# Delete an assertion
npm run cli -- assertion:delete '{"assertionId": "<id>"}'
```

### Source Commands

```bash
# Create/upsert a source
npm run cli -- source:create '{"url": "https://source.com", "title": "Source Title", "sourceType": "vendor_docs"}'

# Find source by URL
npm run cli -- source:find '{"url": "https://source.com"}'

# List sources (optionally filter by status)
npm run cli -- source:list '{"status": "PROPOSED"}'

# Search sources
npm run cli -- source:search '{"query": "search term"}'

# Link a source to an assertion
npm run cli -- source:link '{"assertionId": "<id>", "sourceUrl": "https://source.com", "quote": "Relevant quote"}'

# Get sources by type
npm run cli -- source:byType '{"sourceType": "github"}'

# Validate a source (human action)
npm run cli -- source:validate '{"sourceId": "<id>", "validatedBy": "researcher-name"}'

# Reject a source (human action)
npm run cli -- source:reject '{"sourceId": "<id>", "validatedBy": "researcher-name"}'
```

### Search & Analysis Commands

```bash
# Global search across entities, assertions, and sources
npm run cli -- search:global '{"query": "search term", "projectId": "<id>"}'

# Get research summary for a project
npm run cli -- search:summary '{"projectId": "<id>"}'

# Get items pending human validation
npm run cli -- search:pending '{"projectId": "<id>"}'

# Get recent research activity log
npm run cli -- search:activity '{"limit": 50}'

# Find entities without any assertions
npm run cli -- search:noAssertions '{"projectId": "<id>"}'

# Find assertions without sources
npm run cli -- search:noSources '{"projectId": "<id>"}'
```

## Entity Types

Common entity types to use:
- `tool` - Software tools and CLI applications
- `framework` - Development frameworks
- `product` - Commercial products
- `service` - SaaS or hosted services
- `library` - Code libraries and packages
- `company` - Organizations/companies

## Source Types

Common source types:
- `vendor_docs` - Official vendor documentation
- `github` - GitHub repositories
- `blog` - Blog posts and articles
- `forum` - Community discussions (Reddit, HN, etc.)
- `press` - Press releases and news articles
- `video` - Video content (YouTube, etc.)
- `paper` - Academic papers

## Assertion Categories

Common categories for assertions:
- `feature` - Product features and capabilities
- `pricing` - Pricing information
- `integration` - Integration capabilities
- `performance` - Performance characteristics
- `limitation` - Known limitations
- `comparison` - Comparisons to other tools
- `security` - Security features/concerns

## Best Practices for Subagents

### Discovery Workflow

1. **Start a Project**: Create a research project with a clear name and search criteria
2. **Cast a Broad Net**: Use web search to discover entities matching criteria
3. **Check Before Creating**: Use `entity:exists` or `entity:find` before creating new entities
4. **Record Without Judgment**: Focus on recording claims, not evaluating them
5. **Link Sources**: Always include source URLs for traceability

### Analysis Workflow

1. **Focus on Entity**: Use `entity:get` to retrieve all existing assertions
2. **Avoid Duplicates**: Use `assertion:findSimilar` before creating new assertions
3. **Add Reasoning**: Explain why an assertion is significant
4. **Quote Sources**: Include relevant quotes from sources
5. **Categorize**: Use consistent categories for easier analysis

### General Guidelines

- **Prioritize Vendor Documentation**: Official docs are more reliable than third-party sources
- **Record Source URLs**: Every claim should have at least one source
- **Use Consistent Naming**: Entity names should be clear and canonical
- **Avoid Early Judgment**: In Discovery mode, focus on finding, not evaluating
- **Include Context**: Add reasoning to explain the significance of assertions

## Database Management

```bash
# Initial setup (creates user, database, runs migrations)
./install.sh

# Run migrations
npm run db:migrate

# Reset database (caution: destroys all data)
npm run db:reset

# Open Prisma Studio (visual database browser)
npm run db:studio

# Backup and restore
npm run db:backup
npm run db:restore backups/backup-YYYYMMDD-HHMMSS.sql.gz
```

### Docker Alternative (optional)

```bash
npm run docker:up   # Start container
npm run docker:down # Stop container
```

## Response Format

All CLI commands return JSON with this structure:

```json
{
  "success": true,
  "data": { ... }
}
```

Or on error:

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Subagent Orchestration

This project uses a tiered agent architecture for efficient research. See `docs/SUBAGENT-TEAM.md` for complete specifications.

### Model Tiers

| Model | Cost | Use For |
|-------|------|---------|
| **Haiku** | Lowest | DB writes, parsing, validation, logo fetching, metadata enrichment |
| **Sonnet** | Medium | Web research, analysis, claim collection, technical assessment |
| **Opus** | Highest | Final synthesis, quality review (use sparingly) |

### Available Agents

#### Haiku Agents (Deterministic Tasks)
- **DB Writer** - Execute CLI commands to persist data
- **Logo Fetcher** - Find SVG/PNG logos for entities
- **URL Validator** - Check if source URLs are valid
- **Metadata Enricher** - Add basic metadata (founded date, HQ)
- **Claim Parser** - Extract structured claims from text
- **Source Classifier** - Categorize source types

#### Sonnet Agents (Reasoning Tasks)
- **Discovery Scout** - Web search to find new entities
- **Vendor Scraper** - Extract info from vendor websites
- **Technical Analyst** - Assess architecture and AI claims
- **Federal Assessor** - Evaluate compliance posture
- **Claim Collector** - Systematically gather claims
- **Competitor Mapper** - Map competitive landscape

### Quick Orchestration Patterns

#### Pattern 1: Discover and Persist Entity
```python
# Step 1: Scout for entity (Sonnet)
scout = Task(model="sonnet", prompt="Find entities matching: AI testing tools")

# Step 2: Persist to DB (Haiku)
for entity in scout.entities:
    Task(model="haiku", prompt=f"""
        npm run cli -- entity:create '{{
            "projectId": "{project_id}",
            "name": "{entity.name}",
            "entityType": "tool",
            "url": "{entity.url}"
        }}'
    """)

# Step 3: Fetch logo (Haiku) - SYNCHRONOUS, not background
# Logo fetch uses Playwright which requires proper cleanup
Task(model="haiku", prompt=f"npm run cli -- logo:fetch '{{\"entityId\": \"{entity.id}\"}}'")
```

#### Pattern 2: Deep Entity Analysis
```python
# Technical analysis (Sonnet)
tech = Task(model="sonnet", prompt=f"Analyze architecture of: {entity.name}")

# Federal assessment (Sonnet)
fed = Task(model="sonnet", prompt=f"Assess federal viability of: {entity.name}")

# Persist findings (Haiku)
for claim in tech.claims + fed.claims:
    Task(model="haiku", prompt=f"npm run cli -- assertion:create '{json.dumps(claim)}'")
```

#### Pattern 3: Batch Logo Collection

**WARNING**: Do NOT use `run_in_background=True` for logo:fetch. Logo fetching uses
Playwright browser instances that can become zombie processes without proper cleanup.

```python
# RECOMMENDED: Use agenda-based batch processing
# This ensures proper cleanup between fetches

# 1. Create an agenda for batch logo fetching
npm run cli -- agenda:create '{
    "projectId": "...",
    "name": "Batch logo collection",
    "taskType": "logo:fetch",
    "filter": {"hasUrl": true}
}'

# 2. Work through agenda sequentially (not in parallel)
while agenda.has_next():
    item = npm run cli -- agenda:next '{"agendaId": "..."}'
    npm run cli -- logo:fetch '{"entityId": item.entityId}'
    npm run cli -- agenda:complete '{"agendaId": "..."}'
```

### Agent Naming Convention

Use consistent agentId for tracking:
```
{agent_type}-{model}-{sequence}

Examples:
- discovery-scout-sonnet-001
- logo-fetcher-haiku-001
- tech-analyst-sonnet-001
```

Include in assertions:
```bash
npm run cli -- assertion:create '{"...", "agentId": "discovery-scout-sonnet-001"}'
```

### Research Templates

Final deliverables use templates from `docs/RESEARCH-TEMPLATES/`:
- **DISCOVERY** - Entity identification and claim collection
- **EFFICACY** - Deep tool evaluation for federal viability
- **RESEARCH.md** - Human-created research specification

---

## Related Documentation

- `docs/SUBAGENT-TEAM.md` - Complete subagent specifications
- `docs/RESEARCH-SYSTEM.md` - Full research orchestration architecture
- `docs/RESEARCH-TEMPLATES/` - Research output templates
- `.claude/skills/research/` - Research orchestration skill
- `.claude/skills/research-domain/` - Domain management skill (create, list, show domains)
- `.claude/skills/research-discover/` - Domain-driven discovery skill
- `.claude/skills/research-to-deck/` - Deck generation skill

## Skills Reference

### Domain-Driven Discovery

```
/research-domain create <name>   # Create a new research domain
/research-domain list            # List all domains
/research-domain show <name>     # Show domain details

/research-discover <domain-name> # Run discovery for a domain (domain REQUIRED)
```

**Workflow:**
1. Create a domain with `/research-domain create AI-Testing-Tools`
2. Answer questions about what to find and how
3. Run discovery with `/research-discover AI-Testing-Tools`
4. Repeat to find more entities
