# World Model - Design Document

**Status**: Design
**Author**: Claude Opus 4.6
**Date**: 2026-02-06

---

## 1. Problem Statement

The current research pipeline understands entities **from the inside out**: what they are, what they claim, their evidence quality. But it cannot describe an entity's **place in the world** - how it connects to other entities, where it sits in the value chain, what market forces act on it.

**Current state**: `/research-entity` Phase 3 produces a 2-3 paragraph "world-view" narrative and pillar assertions. This is entity-centric prose - Claude's synthesis of an entity's claims. It does not capture:

- **Entity-to-entity relationships** (no table exists for this)
- **Value chain positioning** (no SDLC stage mapping)
- **Ecosystem dependencies** (what the entity requires to function)
- **Market forces** (tailwinds, headwinds, gravitational lock-in)
- **Adoption maturity** (lifecycle stage, adoption curve position)

**The analogy**: We know the fuel injector's tolerances and failure modes. We don't know it sits between the fuel rail and the intake manifold, depends on 43.5 PSI from the fuel pump, and that direct injection is coming for its job.

**The world model** transforms entity understanding from a **dossier** (everything we know about this part) into a **map** (where this part lives and what touches it).

---

## 2. Design Principles

### 2.1 Additive Only - Zero Degradation

- New tables only; no modifications to existing tables
- New CLI commands only; no changes to existing command behavior
- New API endpoint only; existing endpoints untouched
- New skill only; existing skills unchanged
- `/research-entity` Phase 3 world-view continues to work exactly as before

### 2.2 Evidence-First

Every relationship, position claim, and force carries `evidenceDescription` and optionally `evidenceScreenshotPath`, consistent with the existing evidence protocol.

### 2.3 One-Way Data Flow

```
EXISTING DATA (read-only inputs)
  │
  ├─ Buzz Score         ─┐
  ├─ Differentiators     │
  ├─ Integrations        ├──→  WORLD MODEL  ──→  Grove Visualization
  ├─ Compliance          │     (new tables)       (new view)
  ├─ Assertions          │
  └─ GitHub Metrics     ─┘
```

World model **reads** existing data but **never writes** back to scores, assertions, or extractions. This prevents circular dependencies (Risk: MEDIUM from safety review) and ensures existing research data integrity.

### 2.4 Leverage Existing Data

The world model is not a fresh research pass. It synthesizes what already exists:

| Existing Data | World Model Derivation |
|---|---|
| `differentiators.primaryCompetitors` (string[]) | Seed `COMPETES_WITH` relationships |
| `integrations` extraction | Infer `DEPENDS_ON` and `COMPLEMENTS` relationships |
| `compliance.federalPathways` | Extract platform dependencies (AWS, Azure, GCP) |
| `company` extraction (funding, employees) | Derive maturity stage |
| `buzzScore` + GitHub metrics | Inform adoption curve position |
| Feature assertions by category | Map SDLC stages |

---

## 3. Data Model

### 3.1 New Tables

Three new tables, all with CASCADE delete from Entity (consistent with assertions, extractions, research_sessions).

#### `entity_relationships`

Entity-to-entity connections. Supports both internal entities (FK) and external entities (name string) for tools not in our database.

```prisma
model EntityRelationship {
  id                  String   @id @default(cuid())

  // Source entity (always in our DB)
  sourceEntityId      String
  sourceEntity        Entity   @relation("RelationshipsFrom", fields: [sourceEntityId], references: [id], onDelete: Cascade)

  // Target entity (in our DB or external)
  targetEntityId      String?
  targetEntity        Entity?  @relation("RelationshipsTo", fields: [targetEntityId], references: [id], onDelete: Cascade)
  targetExternalName  String?   // For entities not in our DB
  targetExternalUrl   String?

  // Relationship classification
  relationshipType    String    // COMPETES_WITH | COMPLEMENTS | DEPENDS_ON | ENABLES | SUPERSEDES | FORKS_FROM
  strength            Float     @default(0.5)  // 0.0-1.0
  direction           String    @default("SYMMETRIC")  // SYMMETRIC | OUTBOUND | INBOUND
  context             String?   // Why this relationship exists

  // Evidence (following existing protocol)
  evidenceDescription    String?
  evidenceScreenshotPath String?

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@unique([sourceEntityId, targetEntityId, relationshipType])
  @@index([sourceEntityId])
  @@index([targetEntityId])
  @@index([relationshipType])
  @@map("entity_relationships")
}
```

**Relationship Types**:

| Type | Direction | Example |
|---|---|---|
| `COMPETES_WITH` | SYMMETRIC | Cursor ↔ Windsurf |
| `COMPLEMENTS` | SYMMETRIC | Cursor ↔ Snyk |
| `DEPENDS_ON` | OUTBOUND | Cursor → VS Code |
| `ENABLES` | OUTBOUND | LangChain → agent frameworks |
| `SUPERSEDES` | OUTBOUND | Copilot X → Copilot |
| `FORKS_FROM` | OUTBOUND | Cursor → VS Code (architectural lineage) |

#### `entity_positioning`

One record per entity. Captures structural market position.

```prisma
model EntityPositioning {
  id                    String   @id @default(cuid())

  entityId              String   @unique
  entity                Entity   @relation(fields: [entityId], references: [id], onDelete: Cascade)

  // SDLC Position (where in the development lifecycle)
  sdlcStages            Json?    // [{stage: "code", primary: true}, {stage: "test", primary: false}]
  primaryStage          String?  // The dominant stage

  // Market Position
  solutionScope         String?  // point_solution | platform | suite | framework
  maturityStage         String?  // emerging | growth | mature | declining
  adoptionCurve         String?  // innovator | early_adopter | early_majority | late_majority | laggard
  businessModel         String?  // open_source | freemium | enterprise | consumption | hybrid
  primaryEcosystem      String?  // "VS Code" | "JetBrains" | "AWS" | "GitHub" | "cloud-native" | etc.

  // Positioning Statement (one-sentence synthesis)
  positioningStatement  String?

  // Evidence
  evidenceChain         Json?    // [{field, reasoning, sourceData}]
  evidenceDescription   String?

  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  assessedAt            DateTime?
  assessedBy            String?

  @@index([maturityStage])
  @@index([solutionScope])
  @@map("entity_positioning")
}
```

**SDLC Stages** (canonical values):

| Stage | Description |
|---|---|
| `design` | Architecture, UI/UX design, requirements |
| `code` | Writing, editing, generating code |
| `review` | Code review, PR analysis |
| `test` | Testing, QA, quality assurance |
| `build` | CI/CD, compilation, packaging |
| `deploy` | Infrastructure, deployment, release |
| `monitor` | Observability, logging, alerting |
| `secure` | Security scanning, vulnerability management |
| `document` | Documentation generation, maintenance |

#### `entity_forces`

Market forces acting on an entity's trajectory.

```prisma
model EntityForce {
  id                    String   @id @default(cuid())

  entityId              String
  entity                Entity   @relation(fields: [entityId], references: [id], onDelete: Cascade)

  forceType             String   // TAILWIND | HEADWIND | GRAVITATIONAL
  name                  String   // Short label: "AI-native dev demand"
  description           String?  // Detailed explanation
  strength              Float    @default(0.5)  // 0.0-1.0
  timeHorizon           String?  // immediate | near_term | long_term

  // Evidence
  evidenceDescription    String?
  evidenceScreenshotPath String?

  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@unique([entityId, name])
  @@index([entityId])
  @@index([forceType])
  @@map("entity_forces")
}
```

**Force Types**:

| Type | Direction | Example |
|---|---|---|
| `TAILWIND` | Accelerates adoption | "Enterprise demand for AI-assisted development" |
| `HEADWIND` | Resists adoption | "Open-source alternatives eroding paid market" |
| `GRAVITATIONAL` | Creates lock-in / ecosystem pull | "VS Code extension ecosystem moat" |

### 3.2 Entity Model Additions

Add relation declarations to the existing Entity model (no column changes):

```prisma
// Add to Entity model
relationshipsFrom  EntityRelationship[]  @relation("RelationshipsFrom")
relationshipsTo    EntityRelationship[]  @relation("RelationshipsTo")
positioning        EntityPositioning?
forces             EntityForce[]
```

### 3.3 Boundary: What World Model Is NOT

| World Model IS | World Model IS NOT |
|---|---|
| Entity-to-entity relationships (structured FKs) | Feature comparisons (that's differentiators) |
| SDLC stage mapping | Capability scoring (that's composite score) |
| Market maturity classification | Buzz score recalculation |
| Ecosystem dependency identification | Integration listing (that's extractions) |
| Force field analysis (tailwinds/headwinds) | Assertion validation (that's /research-validation) |
| One-sentence positioning statement | 2-3 paragraph world-view (that's /research-entity Phase 3) |

---

## 4. CLI Commands

### 4.1 New Command Domain: `worldmodel:*`

```
worldmodel:build    Build world model for an entity (runs all phases)
worldmodel:get      Get complete world model for an entity
worldmodel:summary  Get one-line positioning statement
```

### 4.2 New Command Domain: `relationship:*`

```
relationship:create Create entity-to-entity relationship
relationship:list   List relationships for an entity
relationship:graph  Get relationship graph for a project
relationship:delete Remove a relationship
```

### 4.3 New Command Domain: `positioning:*`

```
positioning:set     Set/update entity positioning
positioning:get     Get entity positioning
positioning:compare Compare positioning of multiple entities
```

### 4.4 New Command Domain: `force:*`

```
force:create        Add a market force to an entity
force:list          List forces for an entity
force:delete        Remove a force
```

### 4.5 Command Details

#### `worldmodel:build`

```bash
npm run cli -- worldmodel:build '{"entityId": "...", "depth": "standard"}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `entityId` | string | Yes | Entity to build world model for |
| `depth` | string | No | `shallow` (skip web search), `standard` (default), `deep` (extended search) |

Returns: `{success: true, data: {positioning: {...}, relationships: [...], forces: [...], positioningStatement: "..."}}`

#### `relationship:create`

```bash
npm run cli -- relationship:create '{
  "sourceEntityId": "...",
  "targetEntityId": "...",
  "relationshipType": "COMPETES_WITH",
  "strength": 0.8,
  "context": "Direct competitor in AI code assistant market",
  "evidenceDescription": "Both listed as alternatives on G2 comparison page"
}'
```

| Field | Type | Required | Description |
|---|---|---|---|
| `sourceEntityId` | string | Yes | Source entity |
| `targetEntityId` | string | No | Target entity (in DB) |
| `targetExternalName` | string | No | Target entity name (not in DB) |
| `targetExternalUrl` | string | No | Target entity URL (not in DB) |
| `relationshipType` | string | Yes | COMPETES_WITH, COMPLEMENTS, DEPENDS_ON, ENABLES, SUPERSEDES, FORKS_FROM |
| `strength` | float | No | 0.0-1.0 (default 0.5) |
| `direction` | string | No | SYMMETRIC, OUTBOUND, INBOUND (default SYMMETRIC) |
| `context` | string | No | Why this relationship exists |
| `evidenceDescription` | string | No | Evidence supporting this relationship |

Either `targetEntityId` OR `targetExternalName` must be provided.

#### `positioning:set`

```bash
npm run cli -- positioning:set '{
  "entityId": "...",
  "sdlcStages": [{"stage": "code", "primary": true}, {"stage": "test", "primary": false}],
  "primaryStage": "code",
  "solutionScope": "platform",
  "maturityStage": "growth",
  "adoptionCurve": "early_majority",
  "businessModel": "freemium",
  "primaryEcosystem": "VS Code",
  "positioningStatement": "Cursor is a growth-stage platform in the VS Code ecosystem...",
  "evidenceChain": [{"field": "maturityStage", "reasoning": "Series B funding, 100k+ users", "sourceData": "company extraction"}]
}'
```

Uses upsert pattern - creates or updates the single positioning record per entity.

#### `force:create`

```bash
npm run cli -- force:create '{
  "entityId": "...",
  "forceType": "TAILWIND",
  "name": "AI-native development demand",
  "description": "Growing enterprise adoption of AI coding tools drives market expansion",
  "strength": 0.85,
  "timeHorizon": "near_term",
  "evidenceDescription": "Gartner 2026 report shows 75% of enterprises plan AI coding tool adoption"
}'
```

---

## 5. API Endpoint

### `GET /api/entities/:id/world-model`

Returns the complete world model shaped for Grove consumption.

```typescript
{
  success: true,
  data: {
    entity: {
      id: string,
      name: string,
      logoSvgContent: string | null,
      logoUrl: string | null,
      buzzScore: number | null,
      entityType: string | null,
      url: string | null
    },

    positioning: {
      positioningStatement: string | null,
      sdlcStages: Array<{stage: string, primary: boolean}>,
      primaryStage: string | null,
      solutionScope: string | null,
      maturityStage: string | null,
      adoptionCurve: string | null,
      businessModel: string | null,
      primaryEcosystem: string | null,
      assessedAt: string | null
    } | null,

    relationships: Array<{
      id: string,
      relationshipType: string,
      strength: number,
      direction: string,
      context: string | null,
      entity: {
        id: string | null,
        name: string,
        logoSvgContent: string | null,
        logoUrl: string | null,
        buzzScore: number | null,
        url: string | null,
        isExternal: boolean
      }
    }>,

    forces: Array<{
      id: string,
      forceType: string,
      name: string,
      description: string | null,
      strength: number,
      timeHorizon: string | null
    }>,

    stats: {
      relationshipCount: number,
      competitorCount: number,
      complementCount: number,
      dependencyCount: number,
      forceCount: number,
      tailwindCount: number,
      headwindCount: number,
      hasPositioning: boolean
    }
  }
}
```

**Key design decisions**:
- Relationships are **flattened**: Both `RelationshipsFrom` and `RelationshipsTo` are merged into a single array from the focal entity's perspective
- External entities (not in DB) get `isExternal: true` and no `id`
- All entity references include logo data for immediate rendering (no secondary fetch)
- Stats object provides counts for Grove badge rendering

### Response When No World Model Exists

```typescript
{
  success: true,
  data: {
    entity: { /* always populated */ },
    positioning: null,
    relationships: [],
    forces: [],
    stats: {
      relationshipCount: 0,
      competitorCount: 0,
      complementCount: 0,
      dependencyCount: 0,
      forceCount: 0,
      tailwindCount: 0,
      headwindCount: 0,
      hasPositioning: false
    }
  }
}
```

This allows Grove to render an "empty state" with a prompt to run `/research-world-model`.

---

## 6. Skill Workflow: `/research-world-model`

### Prerequisites

- Entity must exist with at least some research data (assertions, extractions)
- Active project context set via `/research-project use`
- Runs AFTER `/research-entity` (which provides raw material)
- Can run before, after, or alongside `/research-validation`

### Phase 1: RELATIONSHIP MAPPING

**Goal**: Identify and persist entity-to-entity connections.

**Step 1.1 - Load existing data**:
- Entity assertions, extractions (especially `differentiators`, `integrations`), buzz score
- All project entities (for internal relationship matching)

**Step 1.2 - Seed from existing data**:
- Parse `differentiators.primaryCompetitors` → candidate `COMPETES_WITH` relationships
- Parse `integrations` extraction → candidate `COMPLEMENTS` relationships
- Parse architecture assertions → candidate `DEPENDS_ON` relationships
- Parse `compliance.federalPathways` → platform dependency relationships

**Step 1.3 - External search** (if depth is `standard` or `deep`):
- WebSearch: `"[Entity] vs"`, `"[Entity] alternatives"`, `"[Entity] competitors"`
- WebSearch: `"[Entity] integrates with"`, `"[Entity] built on"`, `"[Entity] requires"`
- Extract relationship candidates from search results

**Step 1.4 - Resolve and persist**:
- Match candidate names against project entities (fuzzy name matching)
- For matches: create relationship with `targetEntityId`
- For non-matches: create relationship with `targetExternalName` + `targetExternalUrl`
- Assign strength based on evidence quality and mention frequency

**Output**: 5-15 relationships per entity

### Phase 2: STRUCTURAL POSITIONING

**Goal**: Classify the entity's market position across 6 dimensions.

**Step 2.1 - SDLC Mapping**:
- Analyze feature assertions by category
- Map entity's discovery category to primary SDLC stage(s)
- Determine primary vs peripheral stages

**Step 2.2 - Solution Scope**:
- Count feature categories covered
- Analyze pricing tier complexity
- Classify: point_solution (1-2 categories), platform (3-4), suite (5+), framework (enables others)

**Step 2.3 - Maturity Assessment**:
- Inputs: GitHub created date, funding rounds, employee count, buzz trajectory
- Classify: emerging (<2yr, pre-Series A), growth (Series A-C, rapid adoption), mature (established, stable), declining (losing share)

**Step 2.4 - Adoption Curve**:
- Inputs: GitHub stars, buzz score, press mentions, enterprise customer signals
- Classify: innovator (niche/experimental), early_adopter (growing developer community), early_majority (enterprise adoption), late_majority (industry standard), laggard (legacy)

**Step 2.5 - Business Model**:
- From pricing extraction: open_source, freemium, enterprise, consumption, hybrid

**Step 2.6 - Ecosystem**:
- From dependency relationships and architecture assertions
- Identify primary platform: "VS Code", "JetBrains", "GitHub", "AWS", "cloud-native", "standalone"

**Step 2.7 - Positioning Statement**:
- Generate one sentence: "[Entity] is a [scope] at [maturity] in the [ecosystem] ecosystem, primarily serving [SDLC stages], competing with [top competitors] and differentiated by [key value]."

**Output**: Single `entity_positioning` record

### Phase 3: FORCE FIELD ANALYSIS

**Goal**: Identify market forces acting on the entity.

**Step 3.1 - Tailwind identification**:
- WebSearch: market trends in entity's category, regulatory drivers, technology adoption trends
- Derive from buzz trajectory (rising = tailwinds exist)
- Persist as `TAILWIND` forces with strength and time horizon

**Step 3.2 - Headwind identification**:
- WebSearch: competitive threats, market concerns, technology shifts
- Derive from competitive gaps (missing features = headwind)
- Persist as `HEADWIND` forces

**Step 3.3 - Gravitational force assessment**:
- From ecosystem dependency: strong ecosystem = gravitational force
- From integration count: many integrations = lock-in
- From business model: enterprise contracts = switching cost
- Persist as `GRAVITATIONAL` forces

**Output**: 3-8 forces per entity

### Phase 4: SYNTHESIS

**Goal**: Generate final positioning statement and output document.

**Step 4.1 - Review all persisted data**:
- Load relationships, positioning, forces from DB

**Step 4.2 - Generate positioning statement** (if not already created in Phase 2):
- Synthesize from all three dimensions

**Step 4.3 - Output world-model document**:
- Structured report matching the output template

**Step 4.4 - Log completion**:
- Audit log with summary statistics

---

## 7. Subagent Architecture

The skill runs as direct execution (no subagents) for single entities, matching `/research-entity` and `/research-validation` patterns. For batch processing, the orchestrating Claude manages sequential entity processing.

| Phase | Execution | Rationale |
|---|---|---|
| Phase 1: Relationship Mapping | Direct (Opus/Sonnet) | Requires web search + synthesis |
| Phase 2: Structural Positioning | Direct (Opus/Sonnet) | Analytical derivation from existing data |
| Phase 3: Force Field Analysis | Direct (Opus/Sonnet) | Requires web search + synthesis |
| Phase 4: Synthesis | Direct (Opus/Sonnet) | Final output generation |

**Batch mode** (`/research-world-model batch <n>`): Processes entities sequentially, saving after each. Can resume with `--continue`.

---

## 8. Grove Visualization Contract

### 8.1 Data Shape

The API endpoint returns all data needed for rendering in a single fetch. No secondary queries required. Every entity reference includes logo data for immediate rendering.

### 8.2 Visual Mapping (for future Grove implementation)

The structured data maps to Grove's existing visual vocabulary:

| Data | Visual Encoding |
|---|---|
| Relationship type | Link color (red=competes, green=complements, blue=depends, amber=enables) |
| Relationship strength | Link weight (0-1 maps to stroke-width) |
| Entity buzz score | Node size (existing pattern) |
| Entity logo | Node content (existing SVG/fallback pattern) |
| Force type | Badge color (green=tailwind, red=headwind, amber=gravitational) |
| Force strength | Badge size |
| SDLC stages | Arc segment highlighting |
| Maturity stage | Position label |

### 8.3 Consistency Guarantees

Because every field is categorical or numeric (not prose), Grove renders identically for any entity:
- `maturityStage` is always one of 4 values → same visual treatment
- `solutionScope` is always one of 4 values → same visual treatment
- `relationshipType` is always one of 6 values → same link color
- `forceType` is always one of 3 values → same badge treatment
- `strength` is always 0.0-1.0 → same continuous scale

No interpretation of text required for rendering.

---

## 9. Risk Mitigations

### 9.1 Phase 3 Synthesis Overlap (MEDIUM)

**Risk**: World model positioning statement duplicates `/research-entity` Phase 3 world-view.

**Mitigation**: Clear ownership boundary:
- `/research-entity` Phase 3 = **narrative synthesis** (2-3 paragraphs of what we know about the entity)
- `/research-world-model` = **structural positioning** (categorical data + one-sentence statement)
- They complement each other; the world-view tells the story, the world model provides the coordinates

### 9.2 Scoring Circular Dependencies (MEDIUM)

**Risk**: World model data feeds back into buzz/composite scores, creating double-counting.

**Mitigation**: One-way data flow enforced by design:
- World model **reads** buzz scores, GitHub metrics, extractions
- World model **writes** only to its own three tables
- No modifications to `buzz:calculate` or composite scoring
- If we later want world model to influence scoring, it becomes a new, explicit scoring dimension (not fed through existing ones)

### 9.3 Entity Cascade Deletion (LOW)

**Risk**: Deleting an entity with world model data could leave orphans.

**Mitigation**: All three new tables use `onDelete: Cascade` on their Entity FK. Tested by entity deletion integration test.

### 9.4 conclusionContext Inconsistency (LOW)

**Risk**: Assertion `conclusionContext` captures positioning reasoning that diverges from world model data over time.

**Mitigation**: World model doesn't touch `conclusionContext`. They serve different purposes:
- `conclusionContext` = why this assertion is a pillar (evidence-specific)
- World model = where the entity fits (entity-level context)

---

## 10. Implementation Plan

### Phase A: Schema & Migration

1. Add three model definitions to `prisma/schema.prisma`
2. Add relation fields to Entity model
3. Generate and run migration: `npx prisma migrate dev --name add_world_model`
4. Verify no existing data affected

### Phase B: CLI Commands

1. Create `src/tools/worldmodel.ts` with all CRUD operations
2. Add `export * from './worldmodel'` to `src/tools/index.ts`
3. Register all commands in `src/cli.ts` switch statement
4. Add to available commands list
5. Update `docs/CLI-REFERENCE.md`

### Phase C: API Endpoint

1. Add `GET /api/entities/:id/world-model` to `src/server/routes/api.ts`
2. Include relationship flattening logic (merge from/to perspectives)
3. Include stats computation
4. Test with existing entities

### Phase D: Skill Definition

1. Create `.claude/skills/research-world-model/SKILL.md`
2. Register in skill system
3. Test full workflow on 2-3 entities

### Phase E: Validation

1. Verify existing skills still work unchanged
2. Verify entity deletion cascades properly
3. Verify buzz:calculate is unaffected
4. Verify tree API performance with world model data present
5. Test batch processing

---

## 11. Files Changed

### New Files

| File | Purpose |
|---|---|
| `prisma/migrations/YYYYMMDD_add_world_model/migration.sql` | Schema migration |
| `src/tools/worldmodel.ts` | CLI command handlers |
| `.claude/skills/research-world-model/SKILL.md` | Skill definition |
| `docs/WORLD-MODEL-DESIGN.md` | This document |

### Modified Files

| File | Change |
|---|---|
| `prisma/schema.prisma` | Add 3 models + Entity relation fields |
| `src/tools/index.ts` | Add `export * from './worldmodel'` |
| `src/cli.ts` | Register new commands in switch statement |
| `src/server/routes/api.ts` | Add world-model endpoint |
| `docs/CLI-REFERENCE.md` | Document new commands |
| `CLAUDE.md` | Add `/research-world-model` to skill table |

### Untouched Files (explicitly)

| File | Why |
|---|---|
| `src/tools/entities.ts` | No entity logic changes |
| `src/tools/assertions.ts` | No assertion logic changes |
| `src/tools/buzz.ts` | No scoring changes |
| `src/tools/extractor/` | No extraction changes |
| `src/tools/validation.ts` | No validation changes |
| `src/server/public/grove.html` | No UI changes in this phase |
| `.claude/skills/research-entity/SKILL.md` | No changes to existing skills |
| `.claude/skills/research-validation/SKILL.md` | No changes to existing skills |
