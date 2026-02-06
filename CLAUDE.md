# Deep Research - Project Guide

Evidence-based research platform using Claude Code skills, a SQLite database, and the Grove visualization front end. Entities are discovered via domain-driven search, deeply researched with screenshot evidence, adversarially validated, and visualized in Grove.

## Quick Start

```bash
./install.sh              # Setup SQLite database (zero-config)
npm run dev               # Start Grove front end at http://localhost:3000
npm run cli -- <cmd> '{}'  # Direct CLI access (used by skills internally)
```

## Research Skills (Primary Interface)

All research is driven through `/research-*` skills. These orchestrate subagents, manage database persistence, and produce deliverables automatically.

| Skill | Purpose | Example |
|-------|---------|---------|
| `/research-project` | Create/manage projects, set active context | `/research-project create "My Research"` |
| `/research-domain` | Define what to discover and how | `/research-domain create AI-Testing-Tools` |
| `/research-discover` | Multi-agent entity discovery within a domain | `/research-discover AI-Testing-Tools` |
| `/research-entity` | Deep 4-phase research on a single entity | `/research-entity Cursor` |
| `/research-validation` | Adversarial validation of pillar assertions | `/research-validation Cursor` |
| `/research-world-model` | Build ecosystem positioning map | `/research-world-model Cursor` |
| `/research-to-deck` | Generate PowerPoint from research | "Create slides from this research" |

### Workflow

```
/research-project create "Agentic SDLC Research"
        │
        ▼
/research-domain create AI-Code-Assistants
  → Define: entity types, known leaders, search topics, evaluation criteria
        │
        ▼
/research-discover AI-Code-Assistants
  → Opus generates search strategy (15-25 queries)
  → 3-5 Sonnet agents run parallel web searches
  → Opus deduplicates, Haiku persists (20-60 new entities)
        │
        ▼
/research-entity batch 10
  Per entity, 4 phases:
  → Phase 1: RECONNAISSANCE - Identify research gaps
  → Phase 2: DEEP EXTRACTION - Fetch pages, capture screenshots, extract data
  → Phase 3: SYNTHESIS - Form world-view, identify 5-10 pillar assertions
  → Phase 4: OUTPUT - Mark pillars, create validation agenda
        │
        ▼
/research-world-model <entity-name>
  → Positioning: SDLC stages, solution scope, maturity, adoption curve
  → Relationships: Competes with, integrates with, built on, similar to
  → Market forces: Opportunities, threats, trends, constraints
        │
        ▼
/research-validation <entity-name>
  Per pillar assertion, 5 attack vectors:
  → Counter-evidence search
  → Evidence gap analysis
  → Logical flaw detection
  → Scope limitation identification
  → Alternative explanation testing
  → Verdict: ROBUST | CONDITIONAL | WEAK | REFUTED | UNVERIFIABLE
        │
        ▼
/research-to-deck
  → PowerPoint with title, summary, comparisons, recommendations, matrix
```

### Batch Commands

```
/research-entity batch 10         # Research next 10 unresearched entities
/research-entity batch --continue  # Resume from last position
/research-entity types             # List entity types in project
/research-entity categories        # List discovery categories
```

---

## Grove Front End

Grove is the interactive research observatory at `http://localhost:3000`. It visualizes all research data.

### What It Shows
- **Project View**: Categories arranged in circular orbit, sized by entity count + buzz score
- **Category View**: Entities in concentric rings by buzz score, with logos and validation indicators
- **Entity Detail Panel**: Assertions grouped by category, evidence status, criticality badges

### Key API Endpoints
- `GET /api/projects` - List projects
- `GET /api/entities/tree/:projectId` - Hierarchical tree for visualization
- `GET /api/entities/:id` - Full entity with assertions and evidence

### Design
- Solarized Light theme (cream backgrounds, emerald accents)
- Space Grotesk + JetBrains Mono typography
- SVG logos displayed inline, fallback to initials
- D3.js ring-based layout (no force simulation)

---

## Evidence-First Research Protocol

**Screenshots are PRIMARY evidence. URLs are secondary references.**

Analysis of validated assertions revealed 43% of agent-provided source URLs were MISLEADING - assertions were correct but URLs didn't support them.

### Evidence Workflow

```bash
# 1. FETCH - Capture screenshot and page content
npm run cli -- extract:fetch '{"url": "https://example.com/pricing", "entityId": "<id>"}'

# 2. ANALYZE - Claude reads the screenshot visually, extracts structured data

# 3. SAVE - Persist structured extraction with evidence chain
npm run cli -- extract:save '{
  "entityId": "<id>",
  "schemaType": "pricing",
  "url": "https://example.com/pricing",
  "screenshotPath": "screenshots/...",
  "data": { "hasFreeTier": true, "tiers": [...] }
}'
```

### Schema Types
- `pricing` - Tiers, prices, features per tier, enterprise options
- `features` - Product features, categories, highlights
- `company` - Founded, funding, headquarters, leadership
- `compliance` - SOC2, FedRAMP, certifications
- `integrations` - APIs, SDKs, native integrations
- `differentiators` - Unique features, leading features, competitive gaps

### Evidence Description Requirements

Every `evidenceDescription` MUST:
- Reference the specific screenshot path
- Quote the EXACT visible text that supports the claim
- Explain WHERE on the page the text appears

**Good**: "On screenshot at screenshots/2026-01/cursor-pricing.png, the pricing table shows 'Pro: $20/mo' in the second column header"
**Bad**: "See pricing page" or "Documentation mentions this feature"

### DO NOT
- Cite quotes you haven't visually confirmed on a screenshot
- Use source URLs as primary evidence
- Create assertions without `evidenceDescription` and `evidenceScreenshotPath`

---

## Citation Verification (MANDATORY)

**NEVER cite quotes from WebSearch results directly.** Snippets may be hallucinated or paraphrased.

```bash
npm run cli -- cite:verify '{"url": "https://example.com/page", "quote": "exact text to cite"}'
```

| Recommendation | Action |
|----------------|--------|
| `CITE` | Quote verified - safe to cite |
| `PARAPHRASE` | Quote not found - use `similarPhrases` from response |
| `DO_NOT_CITE` | Quote doesn't exist - do not cite |
| `PAGE_NOT_FOUND` | URL inaccessible - find alternative |

Persist verified citations for audit trail:
```bash
npm run cli -- citation:create '{"url": "...", "quote": "...", "found": true, "recommendation": "CITE"}'
```

---

## Pillar Assertions

Pillar assertions are the 5-10 claims per entity that foundational conclusions depend on. If wrong, conclusions collapse.

### Identification Criteria (Weighted)
- **Architecture** (30%) - Deployment, data residency, security model
- **Pricing** (25%) - Costs, licensing, enterprise availability
- **Core Capability** (20%) - What it does, limitations
- **Differentiation** (15%) - Unique strengths vs alternatives
- **Compliance** (10%) - Certifications, regulatory posture

### Validation Verdicts

| Verdict | Meaning | Assertion Becomes |
|---------|---------|-------------------|
| ROBUST | Withstands all 5 attack vectors | EVIDENCE |
| CONDITIONAL | True only under specific conditions | EVIDENCE (with conditions) |
| WEAK | Insufficient evidence | Stays CLAIM |
| REFUTED | Counter-evidence disproves | REJECTED |
| UNVERIFIABLE | Cannot be confirmed or refuted | Stays CLAIM |

---

## Differentiators Extraction

Captures what makes an entity DIFFERENT from competitors:

| Category | Meaning | Auto-Assertion |
|----------|---------|----------------|
| `uniqueFeatures` | Only this entity has it | `UNIQUE DIFFERENTIATOR: [feature]` |
| `leadingFeatures` | Best-in-class | `MARKET LEADER: [feature]` |
| `tableStakes` | Everyone has it | *(tracked, not asserted)* |
| `laggingFeatures` | Competitors are better | `COMPETITIVE GAP: [feature]` |
| `missingFeatures` | Competitors have it, entity lacks it | `MISSING FEATURE: [feature]` |

---

## Scoring Systems

### Buzz Score (Market Presence)
Calculated from GitHub metrics, funding, press mentions, community activity. Used by Grove for entity sizing and ring placement.

```bash
npm run cli -- buzz:calculate '{"entityId": "..."}'
npm run cli -- buzz:rank '{"projectId": "..."}'
```

### Entity Composite Score
- **Buzz** (25%) - Market presence and momentum
- **Federal Viability** (25%) - Compliance pathway coverage
- **Capability** (25%) - Feature completeness vs gaps
- **Research Confidence** (25%) - Validation state, evidence quality

Tiers: **A** (0.8-1.0) Strong candidate | **B** (0.6-0.79) Viable with limits | **C** (0.4-0.59) Significant gaps | **D** (0.0-0.39) Not recommended

---

## Subagent Model Tiers

| Model | Cost | Use For |
|-------|------|---------|
| **Haiku** | Lowest | DB writes, parsing, logo fetching, metadata enrichment |
| **Sonnet** | Medium | Web research, analysis, claim collection, technical assessment |
| **Opus** | Highest | Orchestration, synthesis, quality review (use sparingly) |

### Agent Naming Convention
```
{agent_type}-{model}-{sequence}
Examples: discovery-scout-sonnet-001, logo-fetcher-haiku-001
```

---

## Important Warnings

### Logo Fetching
**NEVER use `run_in_background=True` for `logo:fetch`.** Playwright browser instances become zombie processes without proper cleanup. Always run sequentially, preferably via agenda-based batch processing.

```bash
npm run cli -- logo:fetch '{"entityId": "..."}'  # SVG-first, stores inline
```

### Batch Processing
Use agendas for systematic work across many entities:
```bash
npm run cli -- agenda:create '{"projectId": "...", "name": "...", "taskType": "extract:pricing", "filter": {"missingSchemaType": "pricing", "hasUrl": true}}'
npm run cli -- agenda:next '{"agendaId": "..."}'
npm run cli -- agenda:complete '{"agendaId": "..."}'
```

---

## Discovery Categories (LLM-Based)

Semantic classification replaces regex-based categorization. Categories include inclusion/exclusion criteria and exemplar entities that Claude reasons about.

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

---

## Database

SQLite database at `research.db`. Zero configuration - no Docker, no PostgreSQL.

```bash
./install.sh          # First-time setup (creates DB, runs migrations)
npm run db:migrate    # Run pending migrations
npm run db:backup     # Backup to backups/ directory
npm run db:restore backups/backup-YYYYMMDD-HHMMSS.db.gz  # Restore
```

### Response Format
All CLI commands return JSON:
```json
{"success": true, "data": { ... }}
{"success": false, "error": "Error message"}
```

---

## CLI Reference

The full CLI command reference is in **[docs/CLI-REFERENCE.md](docs/CLI-REFERENCE.md)**. Key command domains:

| Domain | Commands | Purpose |
|--------|----------|---------|
| `project:*` | create, get, list, find, update, delete | Project management |
| `entity:*` | create, get, find, list, search, update, delete, exists | Entity CRUD |
| `assertion:*` | create, get, list, search, update, validate, reject | Assertion management |
| `source:*` | create, find, list, search, link, validate, reject | Source tracking |
| `extract:*` | fetch, save, cache, list, latest, stale, summary | Structured extraction |
| `validation:*` | create, get, list, summary, pillars, unvalidated | Validation results |
| `citation:*` | create, find, list | Verified citations |
| `query:*` | search, values, pricing, compliance, features, compare | Cross-entity analysis |
| `diff:*` | latest, compare, history, changes | Change tracking |
| `agenda:*` | create, next, complete, skip, fail, status, suggest | Batch processing |
| `logo:*` | fetch, search, save, missing, summary, inline | Logo management |
| `buzz:*` | calculate, rank, override | Buzz scoring |
| `category:*` | list, get, apply, context, explain, unclassified | Classification |
| `domain:*` | create, get, list, entities, summary | Research domains |
| `worldmodel:*` | get, summary | World model aggregation |
| `relationship:*` | create, list, graph, delete | Entity relationships |
| `positioning:*` | set, get, compare | Market positioning |
| `force:*` | create, list, delete | Market forces |
| `research:gaps` | - | Coverage analysis |
| `cite:verify` | - | Citation verification |

---

## Related Documentation

- `VISION.md` - Shared evaluation criteria and research philosophy
- `docs/CLI-REFERENCE.md` - Complete CLI command reference
- `docs/SUBAGENT-TEAM.md` - Subagent architecture and specifications
- `docs/RESEARCH-SYSTEM.md` - Research orchestration architecture
- `docs/RESEARCH-TEMPLATES/` - Output templates (Discovery, Efficacy, Deck)
- `.claude/skills/research*/` - Skill prompt definitions
- `.claude/context/active-project.json` - Current active project context
