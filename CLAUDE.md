# Deep Research - Claude Code Subagent Guide

This project provides a persistent research database for Claude Code subagents to record and refine research findings. The system follows the pattern outlined in VISION.md: Entities are discovered, Assertions (claims) are made about those entities, and human researchers validate Claims into Evidence.

## Quick Start

```bash
# Start the PostgreSQL database
npm run docker:up

# Run database migrations (if needed)
npm run db:migrate

# Use the CLI to interact with the database
npm run cli -- <command> '<json-args>'
```

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

### Entity Commands

```bash
# Create/upsert an entity (won't duplicate if name exists in project)
npm run cli -- entity:create '{"projectId": "<id>", "name": "Entity Name", "description": "Description", "entityType": "tool", "url": "https://example.com"}'

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
# Start PostgreSQL container
npm run docker:up

# Stop PostgreSQL container
npm run docker:down

# Run migrations
npm run db:migrate

# Reset database (caution: destroys all data)
npm run db:reset

# Open Prisma Studio (visual database browser)
npm run db:studio
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

# Step 3: Fetch logo (Haiku, parallel)
Task(model="haiku", prompt=f"Fetch logo for: {entity.name}", run_in_background=True)
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
```python
# Get entities needing logos
entities = search:noAssertions where category = branding

# Parallel logo fetch (Haiku)
for entity in entities:
    Task(model="haiku", prompt=f"Fetch logo for: {entity.name}", run_in_background=True)
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
- `.claude/skills/research-to-deck/` - Deck generation skill
