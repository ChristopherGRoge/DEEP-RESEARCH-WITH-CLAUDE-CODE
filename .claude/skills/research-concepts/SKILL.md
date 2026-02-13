---
name: research-concepts
description: Identify conceptual building blocks within a discovery category - methodologies, technologies, standards, and patterns that explain why entities cluster. Use when asked to "map concepts for [category]", "identify building blocks", or "what patterns underlie [category]".
---

# Research Concepts Skill (Category Building Blocks)

Identifies the **conceptual building blocks** within a discovery category - the methodologies, technologies, standards, and patterns that explain WHY entities cluster together. Links each concept to the entities that implement, build upon, or contribute to it.

**Key Principle**: Categories aren't just buckets of tools. They're clusters around shared concepts. When you see BrowserStack in "AI Testing", you should also see its strong correlation to "Device Farms" and "Browser Farms" - the underlying concepts that define the space.

## Why Concepts?

| Without Concepts | With Concepts |
|---|---|
| "BrowserStack is in the AI Testing category" | "BrowserStack strongly implements Device Farms (0.95) and Browser Farms (0.90)" |
| "20 entities in AI Testing" | "AI Testing has 12 concepts: 4 methodologies, 3 technologies, 3 standards, 2 patterns" |
| "Qodo and Testim are both testing tools" | "Qodo implements AI-Augmented Testing (0.85); Testim implements Record & Replay (0.90) - different underlying approaches" |

## Concept Types

| Type | Meaning | Examples |
|---|---|---|
| `METHODOLOGY` | An architectural approach or technique | Device Farms, Record & Replay, Mutation Testing |
| `TECHNOLOGY` | A core technology or framework | Selenium, Playwright, Appium, WebDriver |
| `STANDARD` | An industry standard or specification | W3C WebDriver, ISO 25010, ISTQB |
| `PATTERN` | A design or practice pattern | Shift-Left Testing, Continuous Testing, Test Pyramid |

## Concept Maturity

| Maturity | Meaning |
|---|---|
| `emerging` | New, gaining traction, not yet widely adopted |
| `established` | Widely recognized and used in the industry |
| `legacy` | Older approach being superseded by newer alternatives |

## Link Types

| Type | Meaning | Example |
|---|---|---|
| `IMPLEMENTS` | Entity directly implements this concept | BrowserStack IMPLEMENTS Device Farms |
| `BUILT_ON` | Entity is architecturally built on this concept | Testim BUILT_ON Selenium |
| `CONTRIBUTES_TO` | Entity contributes to this concept's ecosystem | W3C CONTRIBUTES_TO WebDriver standard |

## Architecture Overview

```
/research-concepts <category-name>

  PHASE 1: LOAD CONTEXT
  | Read active project, load category
  | Load all entities with assertions, extractions, differentiators
  |
  PHASE 2: CONCEPT IDENTIFICATION
  | Analyze recurring patterns across entities
  | Identify 5-15 concepts, typed as METHODOLOGY/TECHNOLOGY/STANDARD/PATTERN
  | Assess maturity: emerging | established | legacy
  |
  PHASE 3: ENTITY LINKING
  | For each concept, determine which entities correlate
  | Assign strength (0.0-1.0) and link type (IMPLEMENTS/BUILT_ON/CONTRIBUTES_TO)
  |
  PHASE 4: EXTERNAL RESEARCH (optional --deep)
  | WebSearch for category methodologies, foundational technologies
  | Search for industry standards and emerging patterns
  |
  PHASE 5: PERSIST
  | concept:create for each concept
  | concept:link for each entity-concept relationship
```

---

## Commands

```
/research-concepts <category-name>           Identify concepts for one category
/research-concepts --all                     Run for all categories in project
/research-concepts --deep <category-name>    Include web research for deeper identification
/research-concepts --id <category-id>        Use category ID directly
/research-concepts help                      Show this overview
/research-concepts commands                  Show CLI command reference
```

---

## EXECUTION CONSTRAINTS

**CRITICAL: Execute all phases DIRECTLY in the current process.** Do NOT use the Task tool to spawn subagent processes. All web searches, CLI commands, and data persistence must be performed inline by you -- not delegated to background agents.

---

## EXECUTION PROTOCOL

### MODE: `help`

Display EXACTLY this format:

```
/research-concepts - Category Building Blocks

Identifies the conceptual building blocks within a discovery category:
  - METHODOLOGIES: Architectural approaches (Device Farms, Record & Replay)
  - TECHNOLOGIES: Core technologies (Selenium, Playwright, WebDriver)
  - STANDARDS: Industry standards (W3C WebDriver, ISO 25010)
  - PATTERNS: Design/practice patterns (Shift-Left Testing, Continuous Testing)

PREREQUISITES:
  - Category must exist with entities (run /research-discover first)
  - Active project context set (run /research-project use <name>)

COMMANDS:
  /research-concepts <category-name>       Identify concepts for category
  /research-concepts --all                 Run for all categories
  /research-concepts --deep <name>         Include web research
  /research-concepts help                  This overview
  /research-concepts commands              CLI reference

WORKFLOW POSITION:
  /research-entity  ->  /research-world-model  ->  /research-concepts
  (what it IS)          (where it FITS)             (what PATTERNS underlie it)

OUTPUT:
  - 5-15 concepts per category (typed and maturity-assessed)
  - Entity-concept links with correlation strength (0.0-1.0)
  - Concept map viewable in Grove category view

DATA STORED IN:
  - category_concepts table
  - concept_entity_links table
```

---

### MODE: `commands`

Display EXACTLY this format:

```
Category Concept CLI Commands:

  # Create a concept (upserts by [categoryId, name])
  npm run cli -- concept:create '{
    "categoryId": "...",
    "name": "device-farms",
    "displayName": "Device Farms",
    "conceptType": "METHODOLOGY",
    "description": "Cloud-based device lab infrastructure for cross-device testing",
    "maturity": "established",
    "discoveredBy": "research-concepts-agent"
  }'

  # Get concept with linked entities
  npm run cli -- concept:get '{"conceptId": "..."}'

  # List concepts for a category
  npm run cli -- concept:list '{"categoryId": "..."}'
  npm run cli -- concept:list '{"categoryId": "...", "conceptType": "TECHNOLOGY"}'

  # Update concept
  npm run cli -- concept:update '{"conceptId": "...", "description": "Updated description"}'

  # Delete concept (cascades links)
  npm run cli -- concept:delete '{"conceptId": "..."}'

  # Link entity to concept (upserts by [conceptId, entityId])
  npm run cli -- concept:link '{
    "conceptId": "...",
    "entityId": "...",
    "linkType": "IMPLEMENTS",
    "strength": 0.9,
    "context": "BrowserStack is a leading device farm provider"
  }'

  # Unlink entity from concept
  npm run cli -- concept:unlink '{"conceptId": "...", "entityId": "..."}'

  # Get all concepts for an entity
  npm run cli -- concept:byEntity '{"entityId": "..."}'

  # Get all entities for a concept
  npm run cli -- concept:entities '{"conceptId": "..."}'

  # Get full concept map for visualization
  npm run cli -- concept:map '{"categoryId": "..."}'
```

---

### MODE: `<category-name>` (Primary Execution)

**Parse arguments:**
- If `--id <id>` provided: Use category ID directly
- If `<name>` provided: Look up category by name
- If `--deep`: Include Phase 4 web research
- If `--all`: Loop through all categories in project

**Step 0: Resolve Category and Verify Prerequisites**

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
# Find category by name
npm run cli -- category:getByName '{"name": "CATEGORY_NAME"}'
```

If category not found, try listing all:
```bash
npm run cli -- category:list
```

---

## PHASE 1: LOAD CONTEXT

Load the category and all its entities with their research data.

```bash
# Get category details
npm run cli -- category:get '{"categoryId": "CATEGORY_ID"}'

# Get entities in this category with research data
npm run cli -- category:entities '{"categoryId": "CATEGORY_ID"}'
```

For each entity with research data, load:
```bash
# Assertions (especially feature, architecture categories)
npm run cli -- assertion:list '{"entityId": "ENTITY_ID"}'

# Differentiators extraction (unique features, leading features, table stakes)
npm run cli -- extract:latest '{"entityId": "ENTITY_ID", "schemaType": "differentiators"}'

# Features extraction
npm run cli -- extract:latest '{"entityId": "ENTITY_ID", "schemaType": "features"}'

# Integrations extraction
npm run cli -- extract:latest '{"entityId": "ENTITY_ID", "schemaType": "integrations"}'
```

**Check for existing concepts:**
```bash
npm run cli -- concept:list '{"categoryId": "CATEGORY_ID"}'
```

If concepts exist, inform the user:
```
NOTE: Category already has N concepts.
Rebuilding will update existing concepts and links.
Proceeding...
```

---

## PHASE 2: CONCEPT IDENTIFICATION

Analyze the loaded data to identify recurring patterns, technologies, and methodologies across entities.

**Analysis approach:**

1. **Extract recurring themes** from entity assertions, features, and differentiators
2. **Identify shared technologies** mentioned across multiple entities (e.g., "Selenium", "Playwright")
3. **Find architectural methodologies** (e.g., "Device Farms", "Record & Replay", "AI-Augmented")
4. **Note industry standards** referenced in compliance or architecture assertions
5. **Detect practice patterns** from differentiators and feature categories

**For each candidate concept, determine:**

| Field | How to Determine |
|---|---|
| `name` | Kebab-case identifier (e.g., "device-farms", "shift-left-testing") |
| `displayName` | Human-readable label |
| `conceptType` | METHODOLOGY if it's an approach, TECHNOLOGY if it's a specific tool/framework, STANDARD if it's a spec/certification, PATTERN if it's a practice |
| `maturity` | `emerging` if <30% of entities reference it; `established` if broadly used; `legacy` if being superseded |
| `description` | 1-2 sentence explanation of what this concept means in context |

**Target: 5-15 concepts per category.**

**Quality checks:**
- Each concept should be referenced by at least 2 entities (or be a foundational technology)
- Don't create concepts that are just entity names
- Don't create concepts that duplicate the category itself
- Prefer specific, actionable concepts over vague ones

---

## PHASE 3: ENTITY LINKING

For each identified concept, determine which entities correlate and at what strength.

**Strength Guidelines:**

| Strength | Criteria |
|---|---|
| 0.9-1.0 | Entity's primary approach IS this concept (BrowserStack IS a device farm) |
| 0.7-0.8 | Entity heavily relies on or implements this concept |
| 0.5-0.6 | Entity uses this concept as one of several approaches |
| 0.3-0.4 | Entity has minor connection to this concept |
| 0.1-0.2 | Entity tangentially related |

**Link Type Selection:**

| Situation | Link Type |
|---|---|
| Entity directly provides this capability | `IMPLEMENTS` |
| Entity is architecturally built on this technology | `BUILT_ON` |
| Entity contributes to but doesn't directly implement | `CONTRIBUTES_TO` |

---

## PHASE 4: EXTERNAL RESEARCH (--deep flag only)

Search for additional concepts not captured in existing entity data.

**Search queries:**
```
"[category display name] methodologies"
"[category display name] technologies"
"[category display name] standards"
"[category display name] best practices"
"[category display name] frameworks [year]"
```

For each new concept found:
- Verify it's relevant to at least one entity in the category
- Assign type, maturity, and description
- Link to relevant entities

---

## PHASE 5: PERSIST

**For each concept:**
```bash
npm run cli -- concept:create '{
  "categoryId": "CATEGORY_ID",
  "name": "device-farms",
  "displayName": "Device Farms",
  "conceptType": "METHODOLOGY",
  "description": "Cloud-based device lab infrastructure providing real devices for cross-platform testing",
  "maturity": "established",
  "discoveredBy": "research-concepts-agent",
  "evidenceDescription": "Referenced by BrowserStack, Sauce Labs, and LambdaTest as core capability"
}'
```

**For each entity-concept link:**
```bash
npm run cli -- concept:link '{
  "conceptId": "CONCEPT_ID",
  "entityId": "ENTITY_ID",
  "linkType": "IMPLEMENTS",
  "strength": 0.9,
  "context": "BrowserStack is a leading device farm provider with 3000+ real devices"
}'
```

---

## PHASE 6: OUTPUT

Generate a summary report:

```markdown
# [CATEGORY_NAME] - Concept Map

**Category**: [Display Name]
**Concepts identified**: [N]
**Entity links created**: [N]

## Concepts by Type

### Methodologies
| Concept | Maturity | Entities | Avg Strength |
|---------|----------|----------|--------------|
| Device Farms | established | 5 | 0.78 |

### Technologies
| Concept | Maturity | Entities | Avg Strength |
|---------|----------|----------|--------------|
| Selenium | established | 8 | 0.65 |

### Standards
| Concept | Maturity | Entities | Avg Strength |
|---------|----------|----------|--------------|
| W3C WebDriver | established | 6 | 0.55 |

### Patterns
| Concept | Maturity | Entities | Avg Strength |
|---------|----------|----------|--------------|
| Shift-Left Testing | established | 10 | 0.60 |

## Entity Coverage
| Entity | Concepts | Top Concept |
|--------|----------|-------------|
| BrowserStack | 6 | Device Farms (0.95) |

---
View in Grove: Category view with "Concepts" toggle enabled
```

---

## MODE: `--all`

Process all categories **sequentially in a single process**.

```bash
npm run cli -- category:list
```

For each category with entities:
1. Run full Phase 1-5 workflow
2. Report progress: `[n/total] Completed concepts for [CATEGORY_NAME]`

---

## ERROR HANDLING

### Category Not Found
```
ERROR: Category "Unknown Category" not found.

Available categories:
- ai_code_assistants (Code Assistants)
- ai_testing (Testing & QA)
...
```

### No Entities in Category
```
WARNING: Category "[NAME]" has no entities.

Run /research-discover to populate entities first.
```

### Insufficient Entity Data
```
WARNING: Only 1 entity has research data in this category.
Concepts may be thin. Consider running /research-entity batch first.
```

---

## RELATED SKILLS

| Skill | Relationship to Concepts |
|---|---|
| `/research-entity` | **Prerequisite** - provides assertions and extractions that concept identification derives from |
| `/research-world-model` | **Parallel** - world model shows entity positioning; concepts show category structure |
| `/research-discover` | **Before** - discovers entities that populate categories |
| `/research-validation` | **After** - validated assertions provide stronger concept identification |
| `/research-domain` | **Before** - defines research scope that categories and concepts exist within |
