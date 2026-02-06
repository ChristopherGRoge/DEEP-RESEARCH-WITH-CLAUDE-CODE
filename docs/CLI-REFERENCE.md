# CLI Command Reference

Complete reference for all `npm run cli` commands. All commands accept JSON arguments and return JSON responses.

```bash
npm run cli -- <command> '<json-args>'
```

---

## Project Commands

```bash
npm run cli -- project:create '{"name": "Project Name", "description": "Description", "workflow": "DISCOVERY"}'
npm run cli -- project:list
npm run cli -- project:get '{"projectId": "<id>"}'
npm run cli -- project:find '{"name": "Project Name"}'
npm run cli -- project:update '{"projectId": "<id>", "name": "New Name"}'
npm run cli -- project:delete '{"projectId": "<id>"}'
```

---

## Entity Commands

```bash
# Create/upsert (won't duplicate if name exists in project)
npm run cli -- entity:create '{"projectId": "<id>", "name": "Entity Name", "description": "Description", "entityType": "tool", "url": "https://example.com", "domainId": "<domain-id>"}'

npm run cli -- entity:list '{"projectId": "<id>"}'
npm run cli -- entity:get '{"entityId": "<id>"}'
npm run cli -- entity:find '{"projectId": "<id>", "name": "Entity Name"}'
npm run cli -- entity:search '{"query": "search term", "entityType": "tool"}'
npm run cli -- entity:exists '{"projectId": "<id>", "name": "Entity Name"}'
npm run cli -- entity:update '{"entityId": "<id>", "description": "Updated description"}'
npm run cli -- entity:delete '{"entityId": "<id>"}'
```

### Entity Types
- `tool` - Software tools and CLI applications
- `framework` - Development frameworks
- `product` - Commercial products
- `service` - SaaS or hosted services
- `library` - Code libraries and packages
- `company` - Organizations/companies

---

## Assertion Commands

```bash
npm run cli -- assertion:create '{"entityId": "<id>", "claim": "The claim", "category": "feature", "reasoning": "Why", "sourceUrl": "https://source.com", "sourceQuote": "Quote", "evidenceDescription": "On screenshot at...", "evidenceScreenshotPath": "screenshots/..."}'
npm run cli -- assertion:list '{"entityId": "<id>"}'
npm run cli -- assertion:get '{"assertionId": "<id>"}'
npm run cli -- assertion:search '{"query": "search term", "category": "feature", "status": "CLAIM"}'
npm run cli -- assertion:addReasoning '{"assertionId": "<id>", "content": "Additional reasoning"}'
npm run cli -- assertion:findSimilar '{"entityId": "<id>", "claim": "Partial claim text"}'
npm run cli -- assertion:update '{"assertionId": "<id>", "category": "pricing"}'
npm run cli -- assertion:validate '{"assertionId": "<id>", "validatedBy": "researcher-name"}'
npm run cli -- assertion:reject '{"assertionId": "<id>", "validatedBy": "researcher-name"}'
npm run cli -- assertion:delete '{"assertionId": "<id>"}'
```

### Evidence Chain (for complex claims)
```bash
npm run cli -- assertion:create '{
  "entityId": "<id>",
  "claim": "Tabnine offers both cloud and air-gapped deployment",
  "category": "feature",
  "evidenceDescription": "Primary: Deployment page shows Self-Hosted option",
  "evidenceScreenshotPath": "screenshots/2026-01/tabnine-deployment.png",
  "evidenceChain": [
    {"screenshotPath": "screenshots/2026-01/tabnine-deployment.png", "description": "Deployment selector showing SaaS, VPC, Self-Hosted, Air-Gapped"},
    {"screenshotPath": "screenshots/2026-01/tabnine-airgap-docs.png", "description": "Air-gapped installation documentation"}
  ],
  "sourceUrl": "https://docs.tabnine.com/deployment"
}'
```

### Assertion Categories
- `feature` - Product features and capabilities
- `pricing` - Pricing information
- `integration` - Integration capabilities
- `performance` - Performance characteristics
- `limitation` - Known limitations
- `comparison` - Comparisons to other tools
- `security` - Security features/concerns

---

## Source Commands

```bash
npm run cli -- source:create '{"url": "https://source.com", "title": "Source Title", "sourceType": "vendor_docs"}'
npm run cli -- source:find '{"url": "https://source.com"}'
npm run cli -- source:list '{"status": "PROPOSED"}'
npm run cli -- source:search '{"query": "search term"}'
npm run cli -- source:link '{"assertionId": "<id>", "sourceUrl": "https://source.com", "quote": "Relevant quote"}'
npm run cli -- source:byType '{"sourceType": "github"}'
npm run cli -- source:validate '{"sourceId": "<id>", "validatedBy": "researcher-name"}'
npm run cli -- source:reject '{"sourceId": "<id>", "validatedBy": "researcher-name"}'
```

### Source Types
- `vendor_docs` - Official vendor documentation
- `github` - GitHub repositories
- `blog` - Blog posts and articles
- `forum` - Community discussions (Reddit, HN, etc.)
- `press` - Press releases and news articles
- `video` - Video content (YouTube, etc.)
- `paper` - Academic papers

---

## Structured Extraction Commands

### Fetch + Analyze + Save Workflow (Recommended)

```bash
# Step 1: FETCH - Get page content and screenshot
npm run cli -- extract:fetch '{"url": "https://example.com/pricing", "entityId": "<id>"}'
# Returns: cacheId, screenshotPath, contentPreview

# Step 2: Claude reads screenshot and extracts data

# Step 3: SAVE - Persist extracted data
npm run cli -- extract:save '{
  "entityId": "<id>",
  "schemaType": "pricing",
  "url": "https://example.com/pricing",
  "screenshotPath": "screenshots/...",
  "data": {
    "hasFreeTier": true,
    "hasEnterprise": true,
    "tiers": [
      {"name": "Hobby", "price": 0, "billingCycle": "free", "features": ["2000 completions"]},
      {"name": "Pro", "price": 20, "billingCycle": "month", "features": ["Unlimited completions"]}
    ]
  }
}'
```

### Helpers

```bash
npm run cli -- extract:cache '{"cacheId": "abc123"}'
npm run cli -- extract:validate '{"url": "https://example.com"}'
```

### Automated Extraction (Requires ANTHROPIC_API_KEY)

```bash
npm run cli -- extract:pricing '{"url": "https://example.com/pricing", "entityId": "<id>"}'
npm run cli -- extract:features '{"url": "https://example.com/features", "entityId": "<id>"}'
npm run cli -- extract:company '{"url": "https://example.com/about", "entityId": "<id>"}'
npm run cli -- extract:compliance '{"url": "https://example.com/security", "entityId": "<id>"}'
npm run cli -- extract:integrations '{"url": "https://example.com/integrations", "entityId": "<id>"}'
npm run cli -- extract:differentiators '{"url": "https://example.com/vs-copilot", "entityId": "<id>"}'
```

### Query Extractions

```bash
npm run cli -- extract:list '{"entityId": "<id>"}'
npm run cli -- extract:latest '{"entityId": "<id>", "schemaType": "pricing"}'
npm run cli -- extract:stale '{"projectId": "<id>"}'
npm run cli -- extract:summary '{"projectId": "<id>"}'
```

---

## Validation Commands

### Create Validation Result

```bash
npm run cli -- validation:create '{
  "assertionId": "<id>",
  "verdict": "CONDITIONAL",
  "confidence": "HIGH",
  "method": "ADVERSARIAL",
  "refinedClaim": "Cline transmits code when using Cline-provided API keys",
  "attackResults": {
    "counterEvidence": {"challenged": false},
    "evidenceGap": {"challenged": true, "finding": "Only applies to Cline API keys", "severity": "major"},
    "logicalFlaw": {"challenged": false},
    "scopeLimitation": {"challenged": true, "finding": "Privacy policy is ambiguous", "severity": "minor"},
    "alternativeExplanation": {"challenged": false}
  },
  "conditions": [
    {"condition": "User must be using Cline-provided API keys", "implication": "Own keys go directly to provider"}
  ],
  "summary": "Valid but only for subset of users",
  "recommendations": "Clarify applies to Cline API key users only",
  "validatorId": "validation-agent-001"
}'
```

### Query Validations

```bash
npm run cli -- validation:list '{"entityId": "<id>"}'
npm run cli -- validation:list '{"verdict": "REFUTED"}'
npm run cli -- validation:latest '{"assertionId": "<id>"}'
npm run cli -- validation:history '{"assertionId": "<id>"}'
npm run cli -- validation:get '{"validationId": "<id>"}'
npm run cli -- validation:summary '{"projectId": "<id>"}'
```

### Find Assertions Needing Validation

```bash
npm run cli -- validation:pillars '{"entityId": "<id>"}'
npm run cli -- validation:unvalidated '{"entityId": "<id>"}'
npm run cli -- validation:unvalidated '{"entityId": "<id>", "criticality": "CRITICAL"}'
```

---

## Citation Verification

```bash
# Verify a quote exists at a URL
npm run cli -- cite:verify '{"url": "https://example.com/page", "quote": "exact text to cite"}'

# Persist verified citation
npm run cli -- citation:create '{"url": "...", "quote": "...", "found": true, "accessible": true, "statusCode": 200, "context": "...surrounding text...", "recommendation": "CITE", "validationResultId": "<optional>"}'

# Find cached citation
npm run cli -- citation:find '{"url": "...", "quote": "..."}'

# List recent citations
npm run cli -- citation:list '{"limit": 20}'
```

---

## Cross-Entity Queries

### Generic Search

```bash
npm run cli -- query:search '{"projectId": "...", "searchText": "kubernetes"}'
npm run cli -- query:search '{"projectId": "...", "schemaType": "pricing", "searchText": "free"}'
npm run cli -- query:search '{"projectId": "...", "filters": {"hasFreeTier": true}}'
npm run cli -- query:search '{"projectId": "...", "schemaType": "pricing", "filters": {"lowestPaidPrice": "<50"}}'
```

### Field Values

```bash
npm run cli -- query:values '{"projectId": "...", "schemaType": "pricing", "fieldPath": "hasFreeTier"}'
npm run cli -- query:values '{"projectId": "...", "schemaType": "compliance", "fieldPath": "fedRampStatus"}'
```

### Schema-Specific Queries

```bash
npm run cli -- query:pricing '{"projectId": "...", "hasFreeTier": true, "sortBy": "price_asc"}'
npm run cli -- query:compliance '{"projectId": "...", "soc2": true, "fedRampStatus": "Authorized"}'
npm run cli -- query:features '{"projectId": "...", "searchTerm": "AI", "category": "Security"}'
npm run cli -- query:integrations '{"projectId": "...", "hasApi": true, "searchTerm": "GitHub"}'
npm run cli -- query:companies '{"projectId": "...", "minFounding": 2020}'
```

### Compare Entities

```bash
npm run cli -- query:compare '{"entityIds": ["<id1>", "<id2>", "<id3>"], "schemaType": "pricing"}'
npm run cli -- query:compare '{"entityIds": ["<id1>", "<id2>"], "schemaType": "compliance"}'
```

---

## Extraction Diff (Change Tracking)

```bash
# What changed since last extraction?
npm run cli -- diff:latest '{"entityId": "...", "schemaType": "pricing"}'

# View extraction history
npm run cli -- diff:history '{"entityId": "...", "schemaType": "pricing"}'

# Diff two specific extractions
npm run cli -- diff:compare '{"oldExtractionId": "...", "newExtractionId": "..."}'

# Find all recent changes across project
npm run cli -- diff:changes '{"projectId": "...", "daysBack": 30}'
npm run cli -- diff:changes '{"projectId": "...", "schemaType": "pricing", "daysBack": 7}'
```

---

## Research Gaps

```bash
npm run cli -- research:gaps '{"projectId": "<id>"}'
```

Returns coverage summary, priorities (high/medium/low), and next actions.

---

## Agenda (Batch Processing)

### Create

```bash
npm run cli -- agenda:suggest '{"projectId": "..."}'
npm run cli -- agenda:create '{"projectId": "...", "name": "Extract pricing", "taskType": "extract:pricing", "filter": {"missingSchemaType": "pricing", "hasUrl": true}}'
npm run cli -- agenda:create '{"projectId": "...", "name": "Deep dive competitors", "taskType": "extract:features", "entityIds": ["<id1>", "<id2>"]}'
npm run cli -- agenda:create '{"projectId": "...", "name": "Research all tools", "taskType": "custom", "taskDescription": "Full extraction", "filter": {"entityType": "tool", "hasUrl": true}}'
```

### Work Loop

```bash
npm run cli -- agenda:next '{"agendaId": "abc123"}'
npm run cli -- agenda:complete '{"agendaId": "abc123", "notes": "Optional notes"}'
npm run cli -- agenda:skip '{"agendaId": "abc123", "reason": "No pricing page"}'
npm run cli -- agenda:fail '{"agendaId": "abc123", "error": "Site returned 503"}'
```

### Monitor

```bash
npm run cli -- agenda:list
npm run cli -- agenda:status '{"agendaId": "abc123"}'
npm run cli -- agenda:get '{"agendaId": "abc123"}'
npm run cli -- agenda:reset '{"agendaId": "abc123", "resetFailed": true, "resetSkipped": false}'
npm run cli -- agenda:delete '{"agendaId": "abc123"}'
```

### Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `missingSchemaType` | Entities lacking this extraction | `"pricing"`, `"features"` |
| `entityType` | Filter by entity type | `"tool"`, `"service"` |
| `hasUrl` | Only entities with URLs | `true` |
| `entityIds` | Specific entity IDs | `["id1", "id2"]` |

---

## Logo Commands

```bash
# Full automated workflow (recommended)
npm run cli -- logo:fetch '{"entityId": "..."}'

# Step-by-step
npm run cli -- logo:search '{"entityId": "..."}'
npm run cli -- logo:verify '{"url": "https://example.com/logo.svg"}'
npm run cli -- logo:download '{"url": "https://example.com/logo.svg", "entityName": "Example"}'
npm run cli -- logo:save '{"entityId": "...", "logoUrl": "https://example.com/logo.svg", "logoSourceUrl": "https://example.com/brand", "download": true}'

# Query
npm run cli -- logo:summary '{"projectId": "..."}'
npm run cli -- logo:missing '{"projectId": "..."}'
npm run cli -- logo:validate '{"entityId": "...", "verifiedBy": "researcher-name"}'
npm run cli -- logo:clear '{"entityId": "..."}'
npm run cli -- logo:inline '{"entityId": "..."}'
```

**WARNING**: Never use `run_in_background=True` for logo:fetch. Playwright zombies.

---

## Buzz Score Commands

```bash
npm run cli -- buzz:calculate '{"entityId": "..."}'
npm run cli -- buzz:calculateProject '{"projectId": "..."}'
npm run cli -- buzz:rank '{"projectId": "..."}'
npm run cli -- buzz:override '{"entityId": "...", "score": 0.85, "reason": "Well-known tool"}'
npm run cli -- buzz:clearOverride '{"entityId": "..."}'
```

---

## GitHub Metrics

```bash
npm run cli -- github:fetch '{"entityId": "..."}'
npm run cli -- github:fetchProject '{"projectId": "..."}'
npm run cli -- github:rank '{"projectId": "..."}'
```

---

## Category Commands (LLM-Based Classification)

### CRUD

```bash
npm run cli -- category:list
npm run cli -- category:get '{"categoryId": "<id>"}'
npm run cli -- category:getByName '{"name": "ai_code_assistants"}'
npm run cli -- category:create '{"name": "ai_code_assistants", "displayName": "Code Assistants", "description": "...", "inclusionCriteria": "...", "exclusionCriteria": "...", "exemplarEntities": ["GitHub Copilot"], "antiExemplars": ["SonarQube"]}'
npm run cli -- category:update '{"categoryId": "<id>", "antiExemplars": ["DocuWriter.ai"]}'
npm run cli -- category:delete '{"categoryId": "<id>"}'
```

### Classification

```bash
npm run cli -- category:context '{"entityId": "<id>"}'
npm run cli -- category:prompt '{"entityName": "DocuWriter.ai", "description": "AI documentation tool"}'
npm run cli -- category:apply '{"entityId": "<id>", "classification": {"categoryName": "ai_documentation", "confidence": "high", "reasoning": "..."}}'
npm run cli -- category:explain '{"entityId": "<id>"}'
```

### Analysis

```bash
npm run cli -- category:entities '{"categoryId": "<id>", "limit": 50}'
npm run cli -- category:summary '{"categoryId": "<id>"}'
npm run cli -- category:unclassified '{"projectId": "<id>", "limit": 50}'
npm run cli -- category:preview '{"projectId": "<id>", "onlyUnclassified": true}'
npm run cli -- category:updateStats '{"categoryId": "<id>"}'
npm run cli -- category:updateAllStats
```

### Icons & Weights

```bash
npm run cli -- category:suggestIcon '{"categoryId": "<id>"}'
npm run cli -- category:setIcon '{"categoryId": "<id>", "icon": "smart_toy"}'
npm run cli -- category:autoAssignIcons
npm run cli -- category:weight '{"categoryId": "<id>"}'
npm run cli -- category:weights '{"projectId": "<id>"}'
```

### Seeding & Migration

```bash
npm run cli -- category:seed
npm run cli -- category:migrate '{"dryRun": true}'
npm run cli -- category:migrate '{"dryRun": false}'
```

---

## Domain Commands

```bash
npm run cli -- domain:create '{"name": "AI-Testing-Tools", "description": "AI-powered testing and QA tools", "entityTypes": ["tool"], "knownLeaders": ["Testim", "Mabl"], "relevantTopics": ["test generation", "QA automation"]}'
npm run cli -- domain:list
npm run cli -- domain:get '{"name": "AI-Testing-Tools"}'
npm run cli -- domain:update '{"domainId": "<id>", "relevantTopics": ["test generation", "QA automation", "E2E testing"]}'
npm run cli -- domain:delete '{"domainId": "<id>"}'
npm run cli -- domain:entities '{"domainId": "<id>"}'
npm run cli -- domain:summary '{"domainId": "<id>"}'
```

---

## Search & Analysis Commands

```bash
npm run cli -- search:global '{"query": "search term", "projectId": "<id>"}'
npm run cli -- search:summary '{"projectId": "<id>"}'
npm run cli -- search:pending '{"projectId": "<id>"}'
npm run cli -- search:activity '{"limit": 50}'
npm run cli -- search:noAssertions '{"projectId": "<id>"}'
npm run cli -- search:noSources '{"projectId": "<id>"}'
```

---

## Evidence Validation

```bash
npm run cli -- evidence:conflicts '{"entityId": "<id>"}'
npm run cli -- evidence:crossref '{"entityId": "<id>"}'
npm run cli -- evidence:freshness '{"entityId": "<id>"}'
npm run cli -- evidence:validate-chain '{"assertionId": "<id>"}'
npm run cli -- evidence:confidence '{"assertionId": "<id>"}'
```

---

## Criticality Scoring

```bash
npm run cli -- discovery:criticality:calculate '{"assertionId": "<id>"}'
npm run cli -- discovery:criticality:scoreEntity '{"entityId": "<id>"}'
npm run cli -- discovery:criticality:scoreProject '{"projectId": "<id>"}'
npm run cli -- discovery:criticality:byLevel '{"entityId": "<id>", "level": "CRITICAL"}'
npm run cli -- discovery:criticality:needingValidation '{"entityId": "<id>"}'
npm run cli -- discovery:criticality:summary '{"projectId": "<id>"}'
```

---

## Crawler Commands

### Reddit

```bash
npm run cli -- crawler:reddit '{"subreddit": "programming", "query": "AI code assistant"}'
npm run cli -- crawler:reddit-multi '{"subreddits": ["programming", "devops"], "query": "..."}'
npm run cli -- crawler:reddit-comments '{"postUrl": "..."}'
npm run cli -- crawler:reddit-aggregate '{"query": "..."}'
```

### GitHub

```bash
npm run cli -- crawler:github-awesome '{"listUrl": "..."}'
npm run cli -- crawler:github-trending '{"language": "typescript", "since": "weekly"}'
npm run cli -- crawler:github-diff '{"previousResults": [...], "currentResults": [...]}'
```

### Nitter/X

```bash
npm run cli -- crawler:nitter '{"username": "..."}'
npm run cli -- crawler:nitter-search '{"query": "..."}'
```

---

## Discovery Source Management

```bash
npm run cli -- discovery:source:create '{"name": "...", "sourceType": "reddit", "config": {...}}'
npm run cli -- discovery:source:list
npm run cli -- discovery:source:stale
npm run cli -- discovery:source:stats
npm run cli -- discovery:source:seed
```

---

## World Model Commands

### World Model Aggregation

```bash
# Get complete world model for entity (positioning + relationships + forces)
npm run cli -- worldmodel:get '{"entityId": "<id>"}'

# Get positioning statement summary
npm run cli -- worldmodel:summary '{"entityId": "<id>"}'
```

### Relationship Management

```bash
# Create relationship between entities
npm run cli -- relationship:create '{
  "sourceEntityId": "<id>",
  "targetEntityId": "<id>",
  "relationshipType": "COMPETES_WITH",
  "strength": 0.8,
  "direction": "SYMMETRIC",
  "context": "Both offer AI code completion",
  "evidenceDescription": "Comparison on screenshots/..."
}'

# Create relationship to external entity (not in database)
npm run cli -- relationship:create '{
  "sourceEntityId": "<id>",
  "targetExternalName": "External Tool",
  "targetExternalUrl": "https://example.com",
  "relationshipType": "DEPENDS_ON",
  "strength": 0.5,
  "direction": "ASYMMETRIC",
  "context": "Via API integration"
}'

# List relationships for entity
npm run cli -- relationship:list '{"entityId": "<id>"}'

# Get project relationship graph
npm run cli -- relationship:graph '{"projectId": "<id>"}'

# Delete relationship
npm run cli -- relationship:delete '{"relationshipId": "<id>"}'
```

#### Relationship Types
- `COMPETES_WITH` - Direct competitors
- `COMPLEMENTS` - Complementary products/services
- `DEPENDS_ON` - Dependency/foundation
- `ENABLES` - Enables or powers another entity
- `SUPERSEDES` - Replaces or succeeds another entity
- `FORKS_FROM` - Forked from another entity

#### Relationship Strength
Float value from 0.0 to 1.0:
- `0.8-1.0` - Strong/primary relationship
- `0.4-0.7` - Medium/secondary relationship
- `0.1-0.3` - Weak/tertiary relationship

#### Relationship Direction
- `SYMMETRIC` - Two-way relationship (A ↔ B)
- `ASYMMETRIC` - One-way relationship (A → B)

### Market Positioning

```bash
# Set entity positioning
npm run cli -- positioning:set '{
  "entityId": "<id>",
  "sdlcStages": [
    {"stage": "code", "coverage": "PRIMARY"},
    {"stage": "test", "coverage": "SECONDARY"}
  ],
  "primaryStage": "code",
  "solutionScope": "point_solution",
  "maturityStage": "growth",
  "adoptionCurve": "early_majority",
  "businessModel": "freemium",
  "primaryEcosystem": "VS Code",
  "positioningStatement": "AI-powered code completion for VS Code",
  "evidenceChain": [
    {
      "screenshotPath": "screenshots/2026-01/entity-pricing.png",
      "description": "Pricing table shows freemium model with free tier",
      "capturedAt": "2026-01-15T10:30:00Z"
    }
  ],
  "evidenceDescription": "Based on screenshots/2026-01/entity-pricing.png",
  "assessedBy": "positioning-agent-sonnet-001"
}'

# Get entity positioning
npm run cli -- positioning:get '{"entityId": "<id>"}'

# Compare positioning across entities
npm run cli -- positioning:compare '{"entityIds": ["<id1>", "<id2>", "<id3>"]}'
```

#### SDLC Stages
Array of objects with `stage` and `coverage` fields:
- Stage values: `design`, `code`, `review`, `test`, `build`, `deploy`, `monitor`, `secure`, `document`
- Coverage values: `PRIMARY`, `SECONDARY`, `MINIMAL`

Example:
```json
[
  {"stage": "code", "coverage": "PRIMARY"},
  {"stage": "review", "coverage": "SECONDARY"}
]
```

#### Solution Scope
Free text field, common values:
- `point_solution` - Specialized/focused solution
- `platform` - Extensible platform
- `suite` - Integrated suite of tools
- `framework` - Development framework

#### Maturity Stage
Free text field, common values:
- `emerging` - Early stage, new to market
- `growth` - Scaling phase, gaining traction
- `mature` - Established market presence
- `declining` - Legacy/declining adoption

#### Adoption Curve
Free text field, common values:
- `innovator` - Cutting edge, experimental
- `early_adopter` - Tech-forward users
- `early_majority` - Pragmatic adopters
- `late_majority` - Conservative adopters
- `laggard` - Late to adopt

#### Business Model
Free text field, common values:
- `open_source` - Open source (no paid tiers)
- `freemium` - Free tier + paid tiers
- `enterprise` - Enterprise sales only
- `consumption` - Usage-based/pay-per-use
- `hybrid` - Multiple models

#### Primary Ecosystem
Free text field (not enum), examples:
- `VS Code`, `JetBrains`, `GitHub`, `GitLab`, `AWS`, `Azure`, `cloud-native`, `standalone`, etc.

### Market Forces

```bash
# Create market force
npm run cli -- force:create '{
  "entityId": "<id>",
  "forceType": "TAILWIND",
  "name": "Enterprise AI adoption",
  "description": "Growing demand for AI in enterprise",
  "strength": 0.8,
  "timeHorizon": "near_term",
  "evidenceDescription": "Market research shows...",
  "evidenceScreenshotPath": "screenshots/2026-01/market-report.png"
}'

# List forces for entity
npm run cli -- force:list '{"entityId": "<id>"}'

# Delete force
npm run cli -- force:delete '{"forceId": "<id>"}'
```

#### Force Types
- `TAILWIND` - Favorable force driving growth or adoption
- `HEADWIND` - Challenging force creating resistance or obstacles
- `GRAVITATIONAL` - Fundamental force shaping the market landscape

#### Force Strength
Float value from 0.0 to 1.0:
- `0.8-1.0` - Strong/major impact
- `0.4-0.7` - Medium/moderate impact
- `0.1-0.3` - Weak/minor impact

#### Time Horizon
- `immediate` - 0-6 months
- `near_term` - 6-18 months
- `long_term` - 18+ months

---

## Orchestration Commands

```bash
npm run cli -- orchestrate:spawn '{"model": "sonnet", "prompt": "..."}'
npm run cli -- orchestrate:status '{"agentId": "..."}'
npm run cli -- orchestrate:list
npm run cli -- orchestrate:active
npm run cli -- orchestrate:cancel '{"agentId": "..."}'
npm run cli -- orchestrate:cleanup
npm run cli -- orchestrate:haiku '{"prompt": "..."}'
npm run cli -- orchestrate:sonnet '{"prompt": "..."}'
npm run cli -- orchestrate:opus '{"prompt": "..."}'
```
