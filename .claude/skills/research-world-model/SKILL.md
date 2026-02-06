---
name: research-world-model
description: Build a world model for an entity - its relationships, market positioning, and force field. Use when asked to "map [entity]", "position [entity]", "world model for [entity]", or "where does [entity] fit". Transforms isolated entity knowledge into ecosystem context.
---

# Research World Model Skill (Ecosystem Positioning)

Builds a structured **world model** for an entity - mapping its relationships to other entities, its position in the development lifecycle and market, and the forces acting on its trajectory. Transforms deep entity research (assertions, extractions, differentiators) into ecosystem context.

**Key Principle**: An entity is only deeply understood when you can describe its **place in the world** - not just what it is, but where it sits, what it depends on, what depends on it, and what forces push on it.

## Why World Models?

| Without World Model | With World Model |
|---|---|
| "Cursor has 128k context window" | "Cursor competes directly with Windsurf and Copilot in the code assistant space" |
| "Pricing starts at $20/mo" | "Cursor is a growth-stage platform crossing into early majority adoption" |
| "Supports VS Code extensions" | "Cursor depends on VS Code architecture (FORKS_FROM) and is pulled by its ecosystem gravity" |
| "Differentiator: AI-native IDE" | "AI-native development demand is a strong near-term tailwind for Cursor" |

The world model answers: **If this entity disappeared tomorrow, what hole would it leave? What would fill it? What would break?**

## Architecture Overview

```
/research-world-model <entity-name>

  PHASE 1: RELATIONSHIP MAPPING
  │ Load entity data (assertions, differentiators, integrations)
  │ Seed relationships from existing data
  │ WebSearch for "X vs", "X alternatives", "X integrates with"
  │ Persist structured entity-to-entity relationships
  │
  PHASE 2: STRUCTURAL POSITIONING
  │ Map SDLC stages from features/category
  │ Classify solution scope, maturity, adoption curve
  │ Identify business model and primary ecosystem
  │ Generate one-sentence positioning statement
  │
  PHASE 3: FORCE FIELD ANALYSIS
  │ Search for tailwinds (market trends favoring entity)
  │ Search for headwinds (forces resisting adoption)
  │ Assess gravitational forces (ecosystem lock-in)
  │
  PHASE 4: SYNTHESIS
    Load all persisted data
    Generate world-model document
    Output positioning summary
```

## Key Concepts

### Three Dimensions of a World Model

**1. Relational Position (WHO)** - Entity-to-entity connections:

| Relationship Type | Direction | Meaning | Example |
|---|---|---|---|
| `COMPETES_WITH` | SYMMETRIC | Direct market overlap | Cursor <-> Windsurf |
| `COMPLEMENTS` | SYMMETRIC | Used alongside, non-overlapping | Cursor <-> Snyk |
| `DEPENDS_ON` | OUTBOUND | Architecturally requires | Cursor -> VS Code |
| `ENABLES` | OUTBOUND | Creates capability for others | LangChain -> agent frameworks |
| `SUPERSEDES` | OUTBOUND | Evolutionary replacement | Copilot X -> Copilot |
| `FORKS_FROM` | OUTBOUND | Shares architectural lineage | Cursor -> VS Code |

**2. Structural Position (WHERE)** - Market coordinates:

| Dimension | Values |
|---|---|
| SDLC Stages | design, code, review, test, build, deploy, monitor, secure, document |
| Solution Scope | point_solution, platform, suite, framework |
| Maturity Stage | emerging, growth, mature, declining |
| Adoption Curve | innovator, early_adopter, early_majority, late_majority, laggard |
| Business Model | open_source, freemium, enterprise, consumption, hybrid |
| Ecosystem | VS Code, JetBrains, GitHub, AWS, cloud-native, standalone, etc. |

**3. Force Field (WHY NOW)** - External pressures:

| Force Type | Direction | Example |
|---|---|---|
| `TAILWIND` | Accelerates adoption | "Enterprise AI coding tool demand growing 40% YoY" |
| `HEADWIND` | Resists adoption | "Open-source alternatives eroding paid market share" |
| `GRAVITATIONAL` | Creates lock-in | "VS Code extension ecosystem creates switching cost" |

### Data Flow (One-Way)

```
EXISTING DATA (read-only)              NEW DATA (write-only)
─────────────────────────              ─────────────────────
Differentiators extraction  ──┐
Integrations extraction     ──┤
Compliance pathways         ──┼──→  entity_relationships
Architecture assertions     ──┤       entity_positioning
Company extraction          ──┤       entity_forces
Buzz score + GitHub metrics ──┤
Feature assertions          ──┘

World model READS existing data.
World model NEVER WRITES to assertions, extractions, or scores.
```

---

## Commands

```
/research-world-model <entity-name>         Build world model for named entity
/research-world-model --id <entity-id>      Build world model by entity ID
/research-world-model batch <n>             Build world models for next N entities
/research-world-model batch --continue      Resume from last position
/research-world-model --shallow <name>      Skip web search (derive from existing data only)
/research-world-model --deep <name>         Extended search (more queries, broader scope)
/research-world-model help                  Show comprehensive skill overview
/research-world-model commands              Show CLI command reference
```

---

## EXECUTION CONSTRAINTS

**CRITICAL: Execute all phases DIRECTLY in the current process.** Do NOT use the Task tool to spawn subagent processes. All web searches, CLI commands, and data persistence must be performed inline by you -- not delegated to background agents. This applies to both single-entity and batch modes.

For **batch mode**, process entities sequentially in a loop within your current context. Do NOT parallelize by spawning separate Claude Code processes. The overhead of subprocess creation far exceeds any time savings from parallelization.

---

## EXECUTION PROTOCOL

### MODE: `help`

Display EXACTLY this format:

```
/research-world-model - Ecosystem Positioning

Builds a structured world model for a researched entity, mapping:
  - RELATIONSHIPS: Who it competes with, complements, depends on
  - POSITIONING: Where it sits in the SDLC, market maturity, ecosystem
  - FORCES: What tailwinds, headwinds, and gravitational forces act on it

PREREQUISITES:
  - Entity must exist with research data (run /research-entity first)
  - Active project context set (run /research-project use <name>)

COMMANDS:
  /research-world-model <entity-name>       Build world model
  /research-world-model batch <n>           Batch build for N entities
  /research-world-model --shallow <name>    Skip web search
  /research-world-model --deep <name>       Extended search
  /research-world-model help                This overview
  /research-world-model commands            CLI reference

WORKFLOW POSITION:
  /research-entity  →  /research-world-model  →  /research-validation
  (what it IS)         (where it FITS)            (is it TRUE?)

OUTPUT:
  - 5-15 entity relationships (structured, evidence-backed)
  - 1 positioning record (6 dimensions + statement)
  - 3-8 market forces (typed, strength-scored)
  - World model summary document

DATA STORED IN:
  - entity_relationships table
  - entity_positioning table
  - entity_forces table
```

---

### MODE: `commands`

Display EXACTLY this format:

```
World Model CLI Commands:

  # Build world model for entity (orchestrates all phases)
  npm run cli -- worldmodel:build '{"entityId": "...", "depth": "standard"}'

  # Get complete world model
  npm run cli -- worldmodel:get '{"entityId": "..."}'

  # Get positioning summary only
  npm run cli -- worldmodel:summary '{"entityId": "..."}'

  # Create relationship
  npm run cli -- relationship:create '{
    "sourceEntityId": "...",
    "targetEntityId": "...",
    "relationshipType": "COMPETES_WITH",
    "strength": 0.8,
    "context": "Direct competitor in AI code assistant market"
  }'

  # List relationships for entity
  npm run cli -- relationship:list '{"entityId": "..."}'

  # Get relationship graph for project
  npm run cli -- relationship:graph '{"projectId": "..."}'

  # Set entity positioning
  npm run cli -- positioning:set '{
    "entityId": "...",
    "sdlcStages": [{"stage": "code", "primary": true}],
    "solutionScope": "platform",
    "maturityStage": "growth",
    "primaryEcosystem": "VS Code",
    "positioningStatement": "..."
  }'

  # Get entity positioning
  npm run cli -- positioning:get '{"entityId": "..."}'

  # Compare positioning of multiple entities
  npm run cli -- positioning:compare '{"entityIds": ["...", "..."]}'

  # Add market force
  npm run cli -- force:create '{
    "entityId": "...",
    "forceType": "TAILWIND",
    "name": "AI-native dev demand",
    "strength": 0.85,
    "timeHorizon": "near_term"
  }'

  # List forces for entity
  npm run cli -- force:list '{"entityId": "..."}'

  # Delete a force
  npm run cli -- force:delete '{"forceId": "..."}'
```

---

### MODE: `<entity-name>` (Primary Execution)

**Parse arguments:**
- If `--id <id>` provided: Use entity ID directly
- If `<name>` provided: Search for entity by name
- If `--shallow`: Skip Phase 1 Step 1.3 and Phase 3 web searches
- If `--deep`: Increase search query count in Phases 1 and 3

**Step 0: Resolve Entity and Verify Prerequisites**

```bash
# Read active project context
cat .claude/context/active-project.json 2>/dev/null
```

If no active project:
```
ERROR: No active project set.

Run: /research-project use <project-name>
```

```bash
# Find entity by name
npm run cli -- entity:find '{"projectId": "PROJECT_ID", "name": "ENTITY_NAME"}'
```

If entity not found:
```
ERROR: Entity "ENTITY_NAME" not found.

Did you mean one of these?
- [Similar entity names]

Search: npm run cli -- entity:search '{"query": "ENTITY_NAME"}'
```

**Verify research exists:**

```bash
npm run cli -- assertion:list '{"entityId": "ENTITY_ID"}'
npm run cli -- extract:list '{"entityId": "ENTITY_ID"}'
```

If no assertions AND no extractions:
```
WARNING: Entity has no research data.

Run /research-entity first to gather assertions and extractions.
The world model derives from existing research - it cannot build from nothing.
```

**Check for existing world model:**

```bash
npm run cli -- worldmodel:get '{"entityId": "ENTITY_ID"}'
```

If world model exists, inform the user:
```
NOTE: World model already exists for [ENTITY_NAME].
Rebuilding will replace existing relationships, positioning, and forces.
Proceeding with rebuild...
```

---

## PHASE 1: RELATIONSHIP MAPPING

**Goal**: Identify and persist entity-to-entity connections

### Step 1.1: Load Existing Data

```bash
# Get entity with all research data
npm run cli -- entity:get '{"entityId": "ENTITY_ID"}'

# Get differentiators extraction (primary source for competitors)
npm run cli -- extract:latest '{"entityId": "ENTITY_ID", "schemaType": "differentiators"}'

# Get integrations extraction (primary source for complements/dependencies)
npm run cli -- extract:latest '{"entityId": "ENTITY_ID", "schemaType": "integrations"}'

# Get all project entities (for internal relationship matching)
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'

# Get architecture/platform assertions
npm run cli -- assertion:search '{"entityId": "ENTITY_ID", "category": "feature"}'
```

### Step 1.2: Seed Relationships from Existing Data

**From differentiators extraction**:
- `primaryCompetitors` array → candidate `COMPETES_WITH` relationships
- `laggingFeatures[].competitors` → additional competitor candidates
- `missingFeatures[].competitors` → additional competitor candidates

**From integrations extraction**:
- Listed integrations → candidate `COMPLEMENTS` relationships
- Platform requirements → candidate `DEPENDS_ON` relationships

**From architecture assertions**:
- Claims mentioning "built on", "fork of", "based on" → `FORKS_FROM` or `DEPENDS_ON`
- Claims mentioning "powers", "enables" → `ENABLES`

**From compliance/federal pathways**:
- Cloud provider pathways (AWS, Azure, GCP) → platform `DEPENDS_ON` relationships

**For each candidate relationship**:

1. Attempt to match name against project entities:
   ```bash
   npm run cli -- entity:find '{"projectId": "PROJECT_ID", "name": "CANDIDATE_NAME"}'
   ```

2. If match found → use `targetEntityId`
3. If no match → use `targetExternalName` and `targetExternalUrl`

### Step 1.3: External Search (skip if --shallow)

Run targeted web searches to discover relationships not captured in existing data:

**Competition queries:**
```
"[Entity] vs"
"[Entity] alternatives [year]"
"[Entity] competitors"
```

**Dependency queries:**
```
"[Entity] built on"
"[Entity] requires"
"[Entity] tech stack"
```

**Complement queries:**
```
"[Entity] integrates with"
"[Entity] used with"
"[Entity] + [common tool pattern]"
```

For `--deep` mode: Double the query count, add category-specific queries:
```
"best [category] tools [year]"
"[Entity] vs [known competitor]"
```

**Extract relationship candidates from results. For each candidate:**
- Determine relationship type
- Estimate strength (0.2 for single mention, 0.5 for multiple, 0.8+ for "vs" comparison articles)
- Capture evidence description (what the search result said)

### Step 1.4: Persist Relationships

For each confirmed relationship:

```bash
npm run cli -- relationship:create '{
  "sourceEntityId": "ENTITY_ID",
  "targetEntityId": "TARGET_ID",
  "relationshipType": "COMPETES_WITH",
  "strength": 0.8,
  "direction": "SYMMETRIC",
  "context": "Direct competitor in AI code assistant market - both offer AI-native IDE experience",
  "evidenceDescription": "G2 comparison page lists both as top AI code editors; differentiators extraction identifies as primary competitor"
}'
```

For external entities (not in project):

```bash
npm run cli -- relationship:create '{
  "sourceEntityId": "ENTITY_ID",
  "targetExternalName": "JetBrains AI",
  "targetExternalUrl": "https://www.jetbrains.com/ai/",
  "relationshipType": "COMPETES_WITH",
  "strength": 0.6,
  "direction": "SYMMETRIC",
  "context": "Competes in IDE-integrated AI assistance space",
  "evidenceDescription": "Search results for Cursor alternatives consistently mention JetBrains AI"
}'
```

**Relationship Strength Guidelines:**

| Strength | Criteria |
|---|---|
| 0.9-1.0 | Primary competitor/dependency. Mentioned in every comparison. Core architectural requirement. |
| 0.7-0.8 | Strong relationship. Frequently mentioned together. Significant overlap or dependency. |
| 0.5-0.6 | Moderate relationship. Mentioned in some comparisons. Partial overlap. |
| 0.3-0.4 | Weak relationship. Occasionally mentioned. Tangential connection. |
| 0.1-0.2 | Minimal relationship. Single mention. Speculative connection. |

**Target: 5-15 relationships per entity.** Prioritize quality over quantity:
- 2-4 competitive relationships (COMPETES_WITH)
- 1-3 dependency relationships (DEPENDS_ON, FORKS_FROM)
- 2-4 complementary relationships (COMPLEMENTS)
- 0-2 enabling/superseding relationships (ENABLES, SUPERSEDES)

**Output of Phase 1**: Persisted entity relationships with types, strengths, and evidence

---

## PHASE 2: STRUCTURAL POSITIONING

**Goal**: Classify the entity's market position across 6 dimensions

### Step 2.1: SDLC Stage Mapping

**Analyze the entity's discovery category and feature assertions to determine SDLC coverage.**

Category-to-Stage defaults:

| Discovery Category | Primary Stage | Common Secondary Stages |
|---|---|---|
| `ai_code_assistants` | code | review, test |
| `ai_code_review` | review | code, secure |
| `ai_debugging` | monitor | code, test |
| `ai_testing` | test | code, build |
| `ai_documentation` | document | code |
| `ai_security` | secure | code, build, deploy |
| `ai_devops` | build, deploy | monitor |
| `ai_analytics` | monitor | deploy |
| `genai_concepts` | code | test, build |

**Override defaults with assertion evidence.** If assertions mention testing capabilities for a code assistant, add `test` as secondary stage.

**Format:**
```json
[
  {"stage": "code", "primary": true},
  {"stage": "review", "primary": false},
  {"stage": "test", "primary": false}
]
```

### Step 2.2: Solution Scope Assessment

Count the breadth of the entity's capabilities:

| Scope | Criteria |
|---|---|
| `point_solution` | Solves one specific problem. 1-2 SDLC stages. Single pricing tier or free. |
| `platform` | Multiple integrated capabilities. 2-3 SDLC stages. Multiple pricing tiers. |
| `suite` | Comprehensive coverage. 4+ SDLC stages. Enterprise-focused. |
| `framework` | Enables others to build. Developer-facing. SDK/API-first. |

**Derive from:**
- Feature extraction breadth (many categories = platform/suite)
- Pricing extraction complexity (many tiers = platform/suite)
- SDLC stage count from Step 2.1

### Step 2.3: Maturity Stage Assessment

| Stage | Signals |
|---|---|
| `emerging` | <2 years old, pre-Series A or bootstrapped, <1000 GitHub stars, buzz <0.3 |
| `growth` | Series A-C funding, rapid user adoption, buzz 0.3-0.7, active press coverage |
| `mature` | Established brand, stable growth, buzz 0.6-0.9, enterprise customer base |
| `declining` | Negative press, losing market share, stagnant GitHub activity, buzz dropping |

**Derive from:**
- `company` extraction: funding stage, employee count, founded date
- `buzzScore` and `buzzComponents`: market presence trajectory
- GitHub metrics: `githubStars`, `githubLastCommit`, contributor activity

### Step 2.4: Adoption Curve Position

| Position | Signals |
|---|---|
| `innovator` | Niche/experimental. <5000 GitHub stars. Developer-only audience. |
| `early_adopter` | Growing dev community. 5k-50k stars. Tech-forward companies adopting. |
| `early_majority` | Enterprise traction. 50k+ stars or equivalent. Multiple case studies. |
| `late_majority` | Industry standard. Used by majority of target audience. |
| `laggard` | Legacy tool. Being replaced by newer alternatives. |

**Derive from:**
- GitHub stars and community size
- Enterprise customer signals (from assertions)
- Press/analyst coverage (from buzz components)

### Step 2.5: Business Model Classification

| Model | Signals |
|---|---|
| `open_source` | Core product is OSS. Revenue from support/enterprise features. |
| `freemium` | Free tier with paid upgrades. Self-serve signup. |
| `enterprise` | Sales-led. Custom pricing. No public free tier. |
| `consumption` | Usage-based pricing. Pay-per-API-call or per-seat-per-action. |
| `hybrid` | Combination of above (e.g., open-source core + enterprise cloud). |

**Derive from:** `pricing` extraction directly.

### Step 2.6: Primary Ecosystem Identification

The primary platform or ecosystem the entity lives within:

**Derive from:**
- `DEPENDS_ON` and `FORKS_FROM` relationships from Phase 1
- Integration extraction (which platform has deepest integration?)
- Architecture assertions (what platform does it extend?)

Common ecosystems: `VS Code`, `JetBrains`, `GitHub`, `GitLab`, `AWS`, `Azure`, `GCP`, `cloud-native`, `standalone`

### Step 2.7: Generate Positioning Statement

Compose one sentence following this template:

```
[Entity] is a [maturityStage]-stage [solutionScope] in the [primaryEcosystem] ecosystem, primarily serving the [primaryStage] workflow, competing with [top 2-3 competitors] and differentiated by [key unique value from differentiators].
```

Example:
```
Cursor is a growth-stage platform in the VS Code ecosystem, primarily serving the code workflow, competing with GitHub Copilot and Windsurf, and differentiated by its AI-native IDE approach with full codebase context.
```

### Step 2.8: Persist Positioning

```bash
npm run cli -- positioning:set '{
  "entityId": "ENTITY_ID",
  "sdlcStages": [{"stage": "code", "primary": true}, {"stage": "test", "primary": false}],
  "primaryStage": "code",
  "solutionScope": "platform",
  "maturityStage": "growth",
  "adoptionCurve": "early_majority",
  "businessModel": "freemium",
  "primaryEcosystem": "VS Code",
  "positioningStatement": "Cursor is a growth-stage platform in the VS Code ecosystem...",
  "evidenceChain": [
    {"field": "maturityStage", "reasoning": "Series B funding ($60M), rapid user growth to 100k+", "sourceData": "company extraction + buzz components"},
    {"field": "solutionScope", "reasoning": "Covers code editing, chat, codebase search, terminal - multiple integrated capabilities", "sourceData": "feature assertions"},
    {"field": "primaryEcosystem", "reasoning": "Forked from VS Code, supports VS Code extensions", "sourceData": "architecture assertions + FORKS_FROM relationship"}
  ]
}'
```

**Output of Phase 2**: Single positioning record with 6 dimensions + statement + evidence chain

---

## PHASE 3: FORCE FIELD ANALYSIS

**Goal**: Identify market forces acting on the entity's trajectory

### Step 3.1: Tailwind Identification

Search for trends accelerating the entity's adoption:

```
"[entity category] market growth [year]"
"AI [SDLC stage] tools adoption"
"[entity category] enterprise demand"
```

**Common tailwind patterns:**
- Category-level demand growth (e.g., "AI code assistant market growing 40% YoY")
- Regulatory drivers (e.g., "security compliance mandates driving tool adoption")
- Technology enablers (e.g., "improved LLM capabilities expanding code assistant utility")
- Enterprise adoption trends (e.g., "Fortune 500 AI tool procurement increasing")

For each tailwind identified:

```bash
npm run cli -- force:create '{
  "entityId": "ENTITY_ID",
  "forceType": "TAILWIND",
  "name": "AI-native development demand",
  "description": "Enterprise adoption of AI coding tools growing rapidly. Gartner reports 75% of enterprises plan AI coding tool adoption by 2027.",
  "strength": 0.85,
  "timeHorizon": "near_term",
  "evidenceDescription": "Multiple analyst reports and enterprise surveys confirm accelerating demand"
}'
```

### Step 3.2: Headwind Identification

Search for forces resisting the entity's adoption:

```
"[Entity] concerns"
"[Entity] limitations"
"[entity category] challenges [year]"
"[Entity] switching from"
```

**Common headwind patterns:**
- Open-source alternatives gaining ground
- Privacy/security concerns with cloud-based tools
- Pricing pressure from competitors
- Technology shifts away from entity's approach
- Customer churn or dissatisfaction signals

### Step 3.3: Gravitational Force Assessment

Derive from relationships and ecosystem analysis (minimal web search needed):

**Sources of gravitational force:**
- Ecosystem lock-in: Entity deeply integrated into an ecosystem (VS Code extensions, GitHub Actions, AWS services)
- Network effects: More users → more value (community plugins, shared configs)
- Switching costs: Migration difficulty (data formats, workflow integration, team training)
- Integration depth: Many integrations create dependency web

**Strength estimation:**

| Signal | Gravitational Strength |
|---|---|
| 5+ integrations in same ecosystem | 0.7-0.9 |
| Fork of major platform | 0.6-0.8 |
| Enterprise contracts (annual+) | 0.5-0.7 |
| Proprietary data format | 0.4-0.6 |
| Simple API with alternatives | 0.1-0.3 |

### Force Count Targets

| Force Type | Target Count | Reasoning |
|---|---|---|
| Tailwinds | 2-4 | Major trends favoring the entity |
| Headwinds | 1-3 | Significant resistance factors |
| Gravitational | 1-2 | Key lock-in mechanisms |

**Total: 3-8 forces per entity.** Avoid listing trivial forces. Each should meaningfully affect the entity's trajectory.

**Output of Phase 3**: 3-8 market forces with types, strengths, and evidence

---

## PHASE 4: SYNTHESIS

**Goal**: Generate final output document and verify data quality

### Step 4.1: Load Complete World Model

```bash
npm run cli -- worldmodel:get '{"entityId": "ENTITY_ID"}'
```

This returns all relationships, positioning, and forces.

### Step 4.2: Quality Check

Verify minimum thresholds:

| Dimension | Minimum | Ideal |
|---|---|---|
| Relationships | 3 | 8-12 |
| COMPETES_WITH | 1 | 2-4 |
| DEPENDS_ON | 1 | 1-3 |
| Positioning fields filled | 4/6 | 6/6 |
| Positioning statement | Present | Present |
| Forces | 2 | 4-6 |

If below minimums:
```
WARNING: World model for [ENTITY_NAME] is thin.
Missing: [list of gaps]

Consider running with --deep flag for extended search.
```

### Step 4.3: Generate World Model Document

Output the final report:

```markdown
# [ENTITY_NAME] - World Model

**Positioning**: [positioning statement]

**Buzz Score**: [bar] [score] ([tier])

## Relationships

### Competes With
| Entity | Strength | Context |
|--------|----------|---------|
| [name] | ████████░░ 0.80 | [context] |

### Depends On
| Entity | Strength | Context |
|--------|----------|---------|
| [name] | █████████░ 0.90 | [context] |

### Complements
| Entity | Strength | Context |
|--------|----------|---------|
| [name] | ██████░░░░ 0.60 | [context] |

## Position

| Dimension | Value | Evidence |
|-----------|-------|----------|
| SDLC Stages | **code** (primary), test, review | [from features] |
| Solution Scope | platform | [from feature breadth] |
| Maturity | growth | [from funding + adoption] |
| Adoption Curve | early_majority | [from GitHub + enterprise signals] |
| Business Model | freemium | [from pricing extraction] |
| Ecosystem | VS Code | [from architecture + dependencies] |

## Force Field

### Tailwinds (accelerating)
| Force | Strength | Horizon |
|-------|----------|---------|
| [name] | ████████░░ 0.85 | near_term |

### Headwinds (resisting)
| Force | Strength | Horizon |
|-------|----------|---------|
| [name] | ██████░░░░ 0.60 | near_term |

### Gravitational (lock-in)
| Force | Strength |
|-------|----------|
| [name] | ███████░░░ 0.70 |

## Summary Statistics

| Metric | Count |
|--------|-------|
| Relationships | [n] |
| Competitors | [n] |
| Dependencies | [n] |
| Complements | [n] |
| Forces | [n] |

---
Next steps:
1. Run /research-validation to validate pillar assertions
2. Review relationships for accuracy
3. Use Grove world-model view to visualize positioning
```

### Step 4.4: Log Completion

```bash
# Audit log is created automatically by worldmodel:build
# Verify with:
npm run cli -- worldmodel:summary '{"entityId": "ENTITY_ID"}'
```

**Output of Phase 4**: World model document + verification

---

## MODE: `batch <n>`

Process multiple entities **sequentially in a single process**. Do NOT spawn Task subagents.

**Step 0: Get unmodeled entities**

```bash
# List all entities in project that lack world models
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

Filter to entities that have research data (assertions > 0) but no world model yet.

**For each entity (sequentially, in this process):**
1. Run full Phase 1-4 workflow directly (WebSearch, Bash CLI calls, analysis)
2. Save progress after each entity
3. Report progress: `[n/total] Completed world model for [ENTITY_NAME]`

**IMPORTANT**: Execute each entity's 4 phases inline. Do NOT use the Task tool to delegate to subagents. The CLI commands are lightweight and the web searches are fast -- sequential execution in a single process is the correct approach.

**Batch size recommendation**: 5-10 entities per batch. World model construction is lighter than entity research (mostly derives from existing data + targeted searches).

**Resume with `--continue`**: Picks up from where last batch stopped.

---

## MODE: `--shallow <name>`

Skip all web searches. Build world model entirely from existing research data.

**Skips:**
- Phase 1 Step 1.3 (external search)
- Phase 3 Step 3.1 search queries (uses assertion data only)
- Phase 3 Step 3.2 search queries (uses differentiator gaps only)

**Useful when:**
- Entity already has rich research data
- You want a quick positioning assessment
- Web search is rate-limited or slow

**Tradeoff**: Fewer relationships discovered, forces are less specific. Typical output: 3-5 relationships (vs 8-12), 2-3 forces (vs 4-6).

---

## ERROR HANDLING

### Entity Not Found
```
ERROR: Entity "Unknown Tool" not found.

Did you mean one of these?
- Unknown AI (cmjk123...)

Search all entities: npm run cli -- entity:search '{"query": "unknown"}'
```

### No Research Data
```
WARNING: Entity "[NAME]" has no research data.

Run /research-entity first to gather assertions and extractions.
The world model derives from existing research - it cannot build from nothing.

Aborting world model construction.
```

### Insufficient Data for Positioning
```
WARNING: Cannot determine [DIMENSION] for [ENTITY_NAME].

Missing data:
- No pricing extraction → cannot classify business model
- No company extraction → cannot assess maturity stage

Proceeding with partial positioning. Run /research-entity to fill gaps.
```

### Relationship Resolution Failure
```
WARNING: Could not resolve "[CANDIDATE_NAME]" to a project entity.

Creating as external relationship:
  targetExternalName: "[CANDIDATE_NAME]"
  targetExternalUrl: "[URL if found]"

To link to a project entity later: npm run cli -- relationship:create '{...}'
```

### World Model Already Exists
```
NOTE: World model already exists for [ENTITY_NAME].

  Relationships: 8
  Positioning: complete (6/6 dimensions)
  Forces: 5

Rebuilding will replace existing data. Proceeding...
```

---

## EXAMPLE: Full World Model Run

```
User: /research-world-model Cursor

Claude: I'll build a world model for Cursor to map its ecosystem positioning.

## PHASE 1: RELATIONSHIP MAPPING

Loading entity...
  Entity: Cursor (cmjk123abc)
  Assertions: 23
  Extractions: 5 (pricing, features, company, integrations, differentiators)

Seeding relationships from existing data...
  Differentiators → primaryCompetitors: ["GitHub Copilot", "Windsurf", "Codeium"]
  Integrations → platforms: ["VS Code extensions", "Git", "GitHub"]
  Architecture → "forked from VS Code"

  Seeded 6 candidate relationships:
    COMPETES_WITH: GitHub Copilot, Windsurf, Codeium
    DEPENDS_ON: VS Code (architecture)
    COMPLEMENTS: GitHub
    FORKS_FROM: VS Code

Searching for additional relationships...
  "Cursor vs" → Found: Cursor vs Windsurf, Cursor vs Copilot, Cursor vs Tabnine
  "Cursor alternatives 2026" → Found: Cody, Continue.dev, Aider
  "Cursor built on" → Confirmed: VS Code / Electron fork

Resolving candidates against project entities...
  GitHub Copilot → matched: entity cmjk456def
  Windsurf → matched: entity cmjk789ghi
  Codeium → matched: entity cmjk012jkl
  Tabnine → matched: entity cmjk345mno
  Cody → external (not in project)
  Continue.dev → external (not in project)
  VS Code → external (platform dependency)

Persisting 10 relationships...
  COMPETES_WITH: GitHub Copilot (0.85), Windsurf (0.90), Codeium (0.70), Tabnine (0.55)
  DEPENDS_ON: VS Code (0.95)
  FORKS_FROM: VS Code (1.0)
  COMPLEMENTS: GitHub (0.60), Snyk (0.35)
  COMPETES_WITH (external): Cody (0.45), Continue.dev (0.40)

Phase 1 complete: 10 relationships persisted

---

## PHASE 2: STRUCTURAL POSITIONING

Analyzing SDLC position...
  Discovery category: ai_code_assistants → primary: code
  Feature assertions mention: code completion, chat, terminal, debugging
  SDLC stages: code (primary), test (secondary), review (secondary)

Assessing solution scope...
  Feature categories: 4 (editing, chat, search, terminal)
  Pricing tiers: 3 (Free, Pro, Business)
  Scope: platform

Classifying maturity...
  Company: Founded 2022, Series B ($60M), ~100 employees
  Buzz: 0.78 (HIGH)
  GitHub: 25k+ stars, weekly releases
  Maturity: growth

Determining adoption curve...
  GitHub stars: 25k+
  Enterprise signals: Business tier, team management features
  Press coverage: Extensive in tech media
  Adoption: early_majority

Business model: freemium (Free tier + Pro $20/mo + Business $40/mo)

Primary ecosystem: VS Code (forked architecture, extension compatibility)

Generating positioning statement...

Positioning: "Cursor is a growth-stage platform in the VS Code ecosystem, primarily serving the code workflow, competing with GitHub Copilot and Windsurf, and differentiated by its AI-native IDE approach with full codebase context."

Phase 2 complete: Positioning persisted (6/6 dimensions)

---

## PHASE 3: FORCE FIELD ANALYSIS

Identifying tailwinds...
  "AI code assistant market growth" → 40%+ YoY growth (strength: 0.90)
  "Enterprise AI tool adoption" → Gartner: 75% plan adoption by 2027 (strength: 0.80)
  "Developer productivity mandates" → Post-layoff efficiency focus (strength: 0.65)

Identifying headwinds...
  "Open source alternatives" → Continue.dev, Aider gaining traction (strength: 0.55)
  "Privacy concerns cloud AI" → Enterprise data residency requirements (strength: 0.50)

Assessing gravitational forces...
  VS Code ecosystem: Extension compatibility creates moat (strength: 0.75)
  Codebase context: Indexed projects create switching cost (strength: 0.50)

Phase 3 complete: 7 forces persisted

---

## PHASE 4: SYNTHESIS

Loading complete world model...

Quality check:
  Relationships: 10 (min: 3)
  Competitors: 6 (min: 1)
  Dependencies: 2 (min: 1)
  Positioning: 6/6 (min: 4/6)
  Forces: 7 (min: 2)

All thresholds met.

---

# Cursor - World Model

**Positioning**: Cursor is a growth-stage platform in the VS Code ecosystem, primarily serving the code workflow, competing with GitHub Copilot and Windsurf, and differentiated by its AI-native IDE approach with full codebase context.

**Buzz Score**: ████████░░ 0.78 (HIGH)

## Relationships

### Competes With
| Entity | Strength | Context |
|--------|----------|---------|
| Windsurf | █████████░ 0.90 | Both AI-native IDE forks of VS Code |
| GitHub Copilot | ████████░░ 0.85 | Dominant incumbent in AI code completion |
| Codeium | ███████░░░ 0.70 | Free alternative with similar feature set |
| Tabnine | █████░░░░░ 0.55 | Earlier-generation AI code completion |
| Cody (external) | ████░░░░░░ 0.45 | Sourcegraph's AI coding assistant |
| Continue.dev (external) | ████░░░░░░ 0.40 | Open-source AI code assistant |

### Depends On
| Entity | Strength | Context |
|--------|----------|---------|
| VS Code (external) | █████████░ 0.95 | Architectural foundation (Electron fork) |

### Forks From
| Entity | Strength | Context |
|--------|----------|---------|
| VS Code (external) | ██████████ 1.00 | Direct fork of VS Code codebase |

### Complements
| Entity | Strength | Context |
|--------|----------|---------|
| GitHub | ██████░░░░ 0.60 | Git integration, repository hosting |
| Snyk | ███░░░░░░░ 0.35 | Security scanning for generated code |

## Position

| Dimension | Value | Evidence |
|-----------|-------|----------|
| SDLC Stages | **code** (primary), test, review | Features span editing, chat, terminal, debugging |
| Solution Scope | platform | 4 feature categories, 3 pricing tiers |
| Maturity | growth | Series B ($60M), rapid adoption, high buzz |
| Adoption Curve | early_majority | 25k+ stars, enterprise tier, tech press coverage |
| Business Model | freemium | Free/Pro $20/Business $40 |
| Ecosystem | VS Code | Fork of VS Code, extension compatibility |

## Force Field

### Tailwinds
| Force | Strength | Horizon |
|-------|----------|---------|
| AI-native development demand | █████████░ 0.90 | near_term |
| Enterprise AI tool adoption | ████████░░ 0.80 | near_term |
| Developer productivity mandates | ██████░░░░ 0.65 | immediate |

### Headwinds
| Force | Strength | Horizon |
|-------|----------|---------|
| Open-source alternatives rising | █████░░░░░ 0.55 | near_term |
| Cloud AI privacy concerns | █████░░░░░ 0.50 | long_term |

### Gravitational
| Force | Strength |
|-------|----------|
| VS Code extension ecosystem | ████████░░ 0.75 |
| Codebase context lock-in | █████░░░░░ 0.50 |

---

Next steps:
1. Run /research-validation to validate pillar assertions
2. Review relationships for accuracy
3. Use Grove world-model view to visualize positioning
```

---

## RELATED SKILLS

| Skill | Relationship to World Model |
|---|---|
| `/research-entity` | **Prerequisite** - provides assertions, extractions, differentiators that world model derives from |
| `/research-validation` | **Parallel/After** - validates pillar assertions; world model provides ecosystem context for validation |
| `/research-discover` | **Before** - discovers entities; world model maps relationships between discovered entities |
| `/research-domain` | **Before** - defines what to find; world model positions entities within domain context |
| `/research-project` | **Before** - sets active context required by world model |
| `/research-to-deck` | **After** - can include world model positioning in presentation slides |
