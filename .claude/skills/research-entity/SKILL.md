---
name: research-entity
description: Deep entity research with pillar assertion identification. Use when asked to "research [entity]", "deep dive on [entity]", or "analyze [entity]". Identifies 5-10 pillar assertions - claims that foundational conclusions depend on.
---

# Research Entity Skill (Pillar Assertion Identification)

Performs deep, discerning research on a single entity to form a comprehensive "world-view" and identify **pillar assertions** - the vital, essential claims that foundational conclusions stand on.

**Key Principle**: Quality over quantity. Not exhaustive fact-checking, but identifying the 5-10 assertions that MUST be validated by humans before any conclusions can be drawn.

## Architecture Overview

```
                    ┌─────────────────────────────┐
                    │     OPUS ORCHESTRATOR       │
                    │  /research-entity skill     │
                    └─────────────┬───────────────┘
                                  │
     ┌────────────────────────────┼────────────────────────────┐
     │                            │                            │
     ▼                            ▼                            ▼
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│ PHASE 1     │          │ PHASE 2     │          │ PHASE 3     │
│ RECON       │────────▶ │ EXTRACTION  │────────▶ │ SYNTHESIS   │
│ (Sonnet)    │          │ (Sonnet)    │          │ (Opus)      │
└─────────────┘          └─────────────┘          └─────────────┘
                                                        │
                                                        ▼
                                              ┌─────────────┐
                                              │ PHASE 4     │
                                              │ OUTPUT      │
                                              │ (Haiku)     │
                                              └─────────────┘
```

## What is a Pillar Assertion?

A **pillar assertion** is a claim where:
1. If wrong, conclusions about this entity collapse
2. Directly impacts procurement/evaluation decisions
3. Cannot be easily verified without evidence
4. Other assertions depend on it being true

**Pillar Categories (prioritized)**:
| Category | Weight | Examples |
|----------|--------|----------|
| **Architecture** | 30% | Deployment model, data residency, security architecture |
| **Pricing/Commercial** | 25% | Costs, licensing, enterprise availability |
| **Core Capability** | 20% | What it actually does, how well, key limitations |
| **Differentiation** | 15% | Unique strengths vs alternatives |
| **Compliance** | 10% | Certifications, regulatory posture |

**Note**: Federal/compliance factors are relevant but NOT gatekeeping criteria. Tools without FedRAMP roadmaps are still valuable research targets.

## Feature Differentiation Framework

A critical part of entity research is identifying **what makes this entity DIFFERENT** from competitors. Use the `differentiators` extraction schema to capture competitive positioning.

### Feature Categories

| Category | Description | Assertion Prefix |
|----------|-------------|------------------|
| **Unique Features** | Features ONLY this entity has - true differentiators | `UNIQUE DIFFERENTIATOR:` |
| **Leading Features** | Features where this entity is best-in-class | `MARKET LEADER:` |
| **Table Stakes** | Features everyone has - not differentiating | *(no assertions created)* |
| **Lagging Features** | Features where competitors are better | `COMPETITIVE GAP:` |
| **Missing Features** | Features competitors have that this entity lacks | `MISSING FEATURE:` |

### Differentiation Extraction Workflow

```bash
# 1. Fetch entity website (features, comparison pages)
npm run cli -- extract:fetch '{"url": "https://example.com/features", "entityId": "..."}'
npm run cli -- extract:fetch '{"url": "https://example.com/vs-competitor", "entityId": "..."}'

# 2. Save differentiators extraction (Claude analyzes and structures)
npm run cli -- extract:save '{
  "entityId": "...",
  "schemaType": "differentiators",
  "url": "https://example.com/features",
  "screenshotPath": "screenshots/...",
  "data": {
    "uniqueFeatures": [
      {"name": "2M token context", "description": "Supports 2M token context window", "comparedTo": ["Copilot: 8k tokens", "Cursor: 128k tokens"]}
    ],
    "leadingFeatures": [
      {"name": "Multi-file editing", "description": "Edit multiple files simultaneously", "comparedTo": ["Copilot: single file only"]}
    ],
    "tableStakes": ["Code completion", "Chat interface", "VS Code integration"],
    "laggingFeatures": [
      {"name": "Enterprise deployment", "reason": "No self-hosted option", "competitors": ["Tabnine", "Codeium"]}
    ],
    "missingFeatures": [
      {"name": "Air-gapped deployment", "competitors": ["Tabnine", "Sourcegraph"], "importance": "critical"}
    ],
    "primaryCompetitors": ["GitHub Copilot", "Cursor", "Tabnine"],
    "differentiationSummary": "Leads on context window size but lacks enterprise deployment flexibility"
  }
}'
```

### Differentiation as Pillar Assertions

Differentiation claims often become pillar assertions because:
- They define **why choose this over alternatives**
- They directly impact **procurement decisions** (if competitors do X better, maybe choose them)
- They reveal **strategic gaps** that may affect long-term viability

When synthesizing, prioritize differentiation claims that:
1. Could change a "buy" recommendation
2. Are unexpected (leader lacks a common feature)
3. Are unverifiable without evidence (marketing claims vs reality)

## Federal Viability Assessment Framework

**CRITICAL**: Federal compliance is NOT binary. An entity can achieve federal viability through multiple pathways. Agents MUST evaluate ALL pathways before concluding an entity is "not federal-ready."

### Compliance Pathways

| Pathway | Description | Example | FedRAMP Level |
|---------|-------------|---------|---------------|
| **Direct Authorization** | Entity itself holds FedRAMP ATO | ServiceNow GovCloud | Varies |
| **Inherited via AWS** | Deploy on AWS GovCloud/Bedrock | Claude Code via Bedrock | High |
| **Inherited via Azure** | Deploy on Azure Government | GitHub Copilot via Azure Gov | High |
| **Inherited via GCP** | Deploy on Google Cloud FedRAMP regions | Vertex AI workloads | Moderate+ |
| **Air-Gapped/On-Premise** | Fully disconnected deployment | Tabnine Enterprise | N/A (isolation) |
| **Private Link/VPC** | Private network path, no public internet | Many SaaS with PrivateLink | Depends |
| **Hybrid** | Combination achieving coverage | API via GovCloud + encryption | Composite |

### Federal Viability Score

Calculate a **Federal Viability Score (0.0 - 1.0)** based on pathway coverage:

| Score | Level | Meaning |
|-------|-------|---------|
| **0.9-1.0** | GREEN | Multiple pathways available, production-ready for federal |
| **0.7-0.89** | YELLOW | At least one viable pathway, may require configuration |
| **0.4-0.69** | ORANGE | Limited options, significant constraints |
| **0.0-0.39** | RED | No viable federal pathway identified |

**Scoring Factors:**
- Direct FedRAMP authorization: +0.4
- Cloud provider inheritance (Bedrock/Azure Gov/GCP): +0.3 each (max +0.5)
- Air-gapped capability: +0.3
- Private Link/VPC options: +0.1
- IL4/IL5 authorization: +0.2
- StateRAMP: +0.1

### Assessment Workflow

```bash
# 1. Check for direct FedRAMP authorization
# Search: "[Entity] FedRAMP" or check FedRAMP Marketplace

# 2. Check cloud provider deployment options
# Look for: AWS Bedrock, Azure OpenAI, Google Vertex AI availability

# 3. Check for self-hosted/air-gapped options
# Look for: Enterprise tier, on-premise deployment, offline mode

# 4. Save compliance extraction with federalPathways
npm run cli -- extract:save '{
  "entityId": "...",
  "schemaType": "compliance",
  "url": "...",
  "data": {
    "federalPathways": [
      {"pathway": "inherited_aws", "status": "available", "provider": "AWS Bedrock GovCloud", "authLevel": "FedRAMP High", "notes": "Available in us-gov-west-1"},
      {"pathway": "inherited_gcp", "status": "available", "provider": "Vertex AI", "authLevel": "FedRAMP Moderate", "notes": "Available in FedRAMP regions"},
      {"pathway": "air_gapped", "status": "unavailable", "notes": "No offline deployment option"}
    ],
    "federalViabilityScore": 0.8,
    "federalViabilityLevel": "YELLOW",
    "federalViabilityNotes": "Viable via cloud provider inheritance; no direct authorization or air-gapped option"
  }
}'
```

### Federal Viability Assertions

Create assertions that capture the FULL picture:

```bash
# GOOD - Captures pathway, not just gap
npm run cli -- assertion:create '{
  "claim": "FEDERAL PATHWAY: FedRAMP High achievable via AWS Bedrock deployment in GovCloud regions",
  "category": "compliance"
}'

# GOOD - Notes limitation with context
npm run cli -- assertion:create '{
  "claim": "FEDERAL LIMITATION: No air-gapped option; federal customers requiring offline operation must use alternatives",
  "category": "limitation"
}'

# BAD - Binary thinking, misses pathways
npm run cli -- assertion:create '{
  "claim": "Not FedRAMP authorized",  # Too simplistic!
  "category": "compliance"
}'
```

## Entity Scoring System

Each entity receives a **composite score** enabling stack ranking and downselection.

### Score Components

| Component | Weight | Range | Description |
|-----------|--------|-------|-------------|
| **Buzz Score** | 25% | 0.0-1.0 | Market presence, momentum, press coverage |
| **Federal Viability** | 25% | 0.0-1.0 | Compliance pathway coverage (see above) |
| **Capability Score** | 25% | 0.0-1.0 | Feature completeness, differentiators vs gaps |
| **Research Confidence** | 25% | 0.0-1.0 | Validation state, evidence quality |

### Capability Score Calculation

```
capability = (unique_features * 0.3) + (leading_features * 0.3) +
             (1 - lagging_penalty * 0.2) + (1 - missing_penalty * 0.2)

Where:
- unique_features: count / 5 (capped at 1.0)
- leading_features: count / 5 (capped at 1.0)
- lagging_penalty: count / 5 (capped at 1.0)
- missing_penalty: critical_missing / 3 (capped at 1.0)
```

### Research Confidence Score Calculation

```
confidence = (validated_assertions / total_assertions) * 0.4 +
             (extraction_coverage / 6) * 0.3 +
             (pillar_evidence_quality) * 0.3

Where:
- extraction_coverage: schemas extracted / 6 total schemas
- pillar_evidence_quality: avg of Strong=1.0, Medium=0.6, Weak=0.3
```

### Composite Score

```
ENTITY_SCORE = (buzz * 0.25) + (federal * 0.25) + (capability * 0.25) + (confidence * 0.25)
```

### Score Interpretation

| Score | Tier | Recommendation |
|-------|------|----------------|
| **0.8-1.0** | A | Strong candidate for pilot/adoption |
| **0.6-0.79** | B | Viable with noted limitations |
| **0.4-0.59** | C | Significant gaps, consider alternatives |
| **0.0-0.39** | D | Not recommended without major changes |

### Storing Entity Scores

```bash
# Update entity with composite scores
npm run cli -- entity:update '{
  "entityId": "...",
  "scores": {
    "buzz": 0.92,
    "federalViability": 0.80,
    "capability": 0.75,
    "researchConfidence": 0.65,
    "composite": 0.78,
    "tier": "B",
    "calculatedAt": "2026-01-22"
  }
}'
```

### World-View Document Score Section

Include in the final output:

```markdown
## Entity Scores

| Component | Score | Notes |
|-----------|-------|-------|
| Buzz | 0.92 | HIGH - Viral moment, major press |
| Federal Viability | 0.80 | YELLOW - Via Bedrock/Vertex |
| Capability | 0.75 | Strong differentiators, some gaps |
| Research Confidence | 0.65 | 4/6 schemas, pillars need validation |
| **Composite** | **0.78** | **Tier B** |

**Stack Rank**: #3 of 19 in AI Code Assistants category
```

## Commands

```
/research-entity <entity-name>           # Research entity by name
/research-entity --id <entity-id>        # Research entity by ID
/research-entity types                   # List entity types with counts
/research-entity --type <type>           # List entities of a specific type
/research-entity categories              # List discovery categories with counts
/research-entity --category <category>   # List entities in a specific category
/research-entity help                    # Verbose overview with workflow explanation
/research-entity commands                # Concise CLI command reference
```

**Project Context**: The `types`, `--type`, `categories`, and `--category` commands require an active project. Set project context with `/research-project use <name>`.

---

## EXECUTION PROTOCOL

### MODE: `help`

Display a comprehensive overview. Output EXACTLY this format:

```
## Research Entity Skill

Deep entity research with pillar assertion identification.

### What It Does

1. **Reconnaissance**: Assesses current research state, identifies gaps
2. **Deep Extraction**: Fills gaps using evidence-first protocol (screenshots + structured data)
3. **Synthesis**: Forms 2-3 paragraph world-view, identifies 5-10 pillar assertions
4. **Output**: Persists pillar designations, creates validation agenda

### What is a Pillar Assertion?

A pillar assertion is a claim where:
- If wrong, conclusions about this entity collapse
- Directly impacts procurement/evaluation decisions
- Cannot be easily verified without evidence
- Other assertions depend on it being true

### Pillar Categories

| Category | Weight | Focus |
|----------|--------|-------|
| Architecture | 30% | Deployment, data residency, security |
| Pricing | 25% | Costs, licensing, enterprise availability |
| Core Capability | 20% | What it does, limitations |
| Differentiation | 15% | Unique strengths vs alternatives |
| Compliance | 10% | Certifications (one signal among many) |

### Usage

/research-entity <entity-name>            # Deep research on entity
/research-entity --id <entity-id>         # Research by ID
/research-entity types                    # List entity types in project
/research-entity --type tool              # List all tools in project
/research-entity categories               # List discovery categories
/research-entity --category ai_testing    # List entities in category

Examples:
  /research-entity Cursor
  /research-entity --id cmjk123abc
  /research-entity types
  /research-entity --type tool
  /research-entity categories
  /research-entity --category ai_code_assistants

### Output

- **World-View Document**: Executive summary + pillar assertions
- **Marked Assertions**: citedInConclusion=true, criticality=CRITICAL/HIGH
- **Validation Agenda**: Queue of pillar assertions for human review

### Related Skills

- `/research-discover <domain>` - Discover new entities
- `/research-domain` - Manage research domains
- `/research-to-deck` - Generate presentations
```

---

### MODE: `commands`

Display a minimal, copy-paste ready command reference. Output EXACTLY this format:

```
## CLI Commands

# Skill commands
/research-entity <entity-name>
/research-entity --id <entity-id>
/research-entity types
/research-entity --type <type>
/research-entity categories
/research-entity --category <category>
/research-entity help
/research-entity commands

# Entity lookup
npm run cli -- entity:find '{"projectId": "...", "name": "..."}'
npm run cli -- entity:get '{"entityId": "..."}'
npm run cli -- entity:search '{"query": "..."}'

# Current research state
npm run cli -- extract:list '{"entityId": "..."}'
npm run cli -- assertion:list '{"entityId": "..."}'
npm run cli -- research:gaps '{"projectId": "..."}'

# Extraction workflow
npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
npm run cli -- extract:save '{"entityId": "...", "schemaType": "...", "url": "...", "data": {...}}'

# Differentiators extraction (competitive analysis)
npm run cli -- extract:save '{"entityId": "...", "schemaType": "differentiators", "url": "...", "data": {"uniqueFeatures": [...], "leadingFeatures": [...], "tableStakes": [...], "primaryCompetitors": [...], "differentiationSummary": "..."}}'

# Assertion management
npm run cli -- assertion:create '{"entityId": "...", "claim": "...", "category": "...", "evidenceDescription": "...", "evidenceScreenshotPath": "...", "criticality": "HIGH"}'
npm run cli -- assertion:update '{"assertionId": "...", "criticality": "CRITICAL", "citedInConclusion": true, "conclusionContext": "..."}'

# Query pillar assertions
npm run cli -- assertion:search '{"entityId": "...", "citedInConclusion": true}'
npm run cli -- assertion:search '{"entityId": "...", "criticality": "CRITICAL"}'

# Create validation agenda
npm run cli -- agenda:create '{"projectId": "...", "name": "Validate [Entity] Pillars", "taskType": "assertion:validate", "filter": {"criticality": "CRITICAL", "citedInConclusion": true}}'

# Logo management
npm run cli -- logo:fetch '{"entityId": "..."}'
npm run cli -- logo:search '{"entityId": "..."}'
npm run cli -- logo:inline '{"entityId": "..."}'
npm run cli -- logo:summary '{"projectId": "..."}'

# Entity metadata (for buzz score)
npm run cli -- entity:update '{"entityId": "...", "metadata": {"buzzScore": 0.75}}'
```

---

### MODE: `types`

List all entity types with counts in the current project.

**Requires**: Active project context (set via `/research-project use <name>`)

#### Step 1: Get Project Context

Read active project from context file:

```bash
cat .claude/context/active-project.json 2>/dev/null
```

If file doesn't exist or is empty:
```
ERROR: No active project.

Set a project first:
  /research-project use <project-name>
  /research-project list

Or specify project directly:
  npm run cli -- entity:list '{"projectId": "..."}'
```

Extract `projectId` and `projectName` from the JSON.

#### Step 2: Query Entity Types

```bash
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

#### Step 3: Aggregate by Type

Group entities by `entityType` field and count.

#### Step 4: Display Results

```
## Entity Types in [PROJECT_NAME]

| Type | Count | Examples |
|------|-------|----------|
| tool | 45 | Cursor, GitHub Copilot, Tabnine |
| platform | 12 | AWS CodeWhisperer, Azure AI |
| framework | 8 | LangChain, AutoGPT |
| service | 5 | OpenAI API, Anthropic API |

Total: 70 entities

### Quick Actions
- List tools: /research-entity --type tool
- Research an entity: /research-entity <name>
- Discover more: /research-discover <domain>
```

---

### MODE: `--type <type>`

List all entities of a specific type in the current project.

**Requires**: Active project context (set via `/research-project use <name>`)

#### Step 1: Parse Type Argument

Extract type from `--type <type>` argument.

Valid types: `tool`, `framework`, `platform`, `service`, `library`, `company`, `concept`

If invalid type:
```
ERROR: Unknown entity type "invalid"

Valid types:
- tool       (software tools and CLI applications)
- framework  (development frameworks)
- platform   (hosted services/platforms)
- service    (SaaS or API services)
- library    (code libraries and packages)
- company    (organizations)
- concept    (architectural patterns)
```

#### Step 2: Get Project Context

Check for active project. If none set, show error (same as `types` mode).

#### Step 3: Query Entities by Type

```bash
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

Filter results where `entityType` matches the requested type.

#### Step 4: Display Results

```
## Tools in [PROJECT_NAME]

Found 45 tools:

| Name | URL | Extractions | Assertions | Last Updated |
|------|-----|-------------|------------|--------------|
| Cursor | cursor.com | 5 | 23 | 2 days ago |
| GitHub Copilot | github.com/features/copilot | 4 | 18 | 1 week ago |
| Tabnine | tabnine.com | 3 | 12 | 3 days ago |
| Codeium | codeium.com | 2 | 8 | 5 days ago |
... (showing first 20)

### Research Coverage
- With extractions: 38/45 (84%)
- With pillar assertions: 12/45 (27%)

### Quick Actions
- Research an entity: /research-entity <name>
- See all types: /research-entity types
- Show more: npm run cli -- entity:list '{"projectId": "...", "entityType": "tool"}'
```

If no entities found:
```
No tools found in [PROJECT_NAME].

To discover tools:
  /research-discover <domain>

To create an entity:
  npm run cli -- entity:create '{"projectId": "...", "name": "...", "entityType": "tool", "url": "..."}'
```

---

### MODE: `categories`

List all discovery categories with counts in the current project.

**Requires**: Active project context (set via `/research-project use <name>`)

#### Step 1: Get Project Context

Read active project from context file:

```bash
cat .claude/context/active-project.json 2>/dev/null
```

If file doesn't exist or is empty, show error (same as `types` mode).

#### Step 2: Query Entities and Aggregate by Category

```bash
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

Group entities by `discoveryCategory` field and count.

#### Step 3: Display Results

```
## Discovery Categories in [PROJECT_NAME]

| Category | Code | Count |
|----------|------|-------|
| Code Assistants | ai_code_assistants | 19 |
| GenAI Concepts | genai_concepts | 18 |
| Testing | ai_testing | 17 |
| DevOps | ai_devops | 9 |
| Code Review | ai_code_review | 7 |
| Documentation | ai_documentation | 6 |
| Debugging | ai_debugging | 4 |
| Security | ai_security | 2 |
| *(uncategorized)* | - | 30 |

Total: 112 entities across 8 categories

### Quick Actions
- List category: /research-entity --category ai_code_assistants
- List entity types: /research-entity types
- Research an entity: /research-entity <name>
```

**Category Reference:**

| Code | Display Name | Description |
|------|--------------|-------------|
| `ai_code_assistants` | Code Assistants | AI-powered code completion and generation |
| `ai_code_review` | Code Review | Automated code review and analysis |
| `ai_debugging` | Debugging | AI-powered debugging tools |
| `ai_testing` | Testing | AI-assisted testing and QA tools |
| `ai_documentation` | Documentation | AI documentation generators |
| `ai_security` | Security | AI security scanning and analysis |
| `ai_devops` | DevOps | AI for CI/CD, deployment, infrastructure |
| `ai_analytics` | Analytics | AI-powered analytics and insights |
| `genai_concepts` | GenAI Concepts | Foundational GenAI platforms and concepts |

---

### MODE: `--category <category>`

List all entities in a specific discovery category.

**Requires**: Active project context (set via `/research-project use <name>`)

#### Step 1: Parse Category Argument

Extract category from `--category <category>` argument.

If invalid category:
```
ERROR: Unknown category "invalid"

Valid categories:
- ai_code_assistants  → Code Assistants
- ai_code_review      → Code Review
- ai_debugging        → Debugging
- ai_testing          → Testing
- ai_documentation    → Documentation
- ai_security         → Security
- ai_devops           → DevOps
- ai_analytics        → Analytics
- genai_concepts      → GenAI Concepts

List all categories: /research-entity categories
```

#### Step 2: Get Project Context

Check for active project. If none set, show error.

#### Step 3: Query Entities by Category

```bash
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

Filter results where `discoveryCategory` matches the requested category.

#### Step 4: Display Results

```
## AI Code Assistants in [PROJECT_NAME]

Found 19 entities:

| Name | Type | URL | Extractions | Assertions |
|------|------|-----|-------------|------------|
| Cursor | tool | cursor.com | 5 | 23 |
| GitHub Copilot | tool | github.com/features/copilot | 4 | 18 |
| Tabnine | tool | tabnine.com | 3 | 12 |
| Codeium | tool | codeium.com | 2 | 8 |
| Windsurf | tool | codeium.com/windsurf | 2 | 6 |
... (showing first 20)

### Research Coverage
- With extractions: 15/19 (79%)
- With pillar assertions: 5/19 (26%)

### Quick Actions
- Research an entity: /research-entity <name>
- See all categories: /research-entity categories
- Filter by type: /research-entity --type tool
```

If no entities found:
```
No entities in category "ai_security" in [PROJECT_NAME].

This category may need discovery. Try:
  /research-discover <domain>
```

---

### MODE: `<entity-name>` or `--id <entity-id>` (Primary Execution)

Follow this EXACT sequence when /research-entity is invoked with an entity:

---

## PHASE 1: RECONNAISSANCE (Sonnet)

**Goal**: Assess current research state, identify gaps, create research plan

### Step 1.1: Resolve Entity

**Parse arguments:**
- If `--id <id>` provided: Use entity ID directly
- If `<name>` provided: Search for entity by name

```bash
# By ID
npm run cli -- entity:get '{"entityId": "ENTITY_ID"}'

# By name - first find, then get
npm run cli -- entity:search '{"query": "ENTITY_NAME"}'
```

**If entity not found:**
```
ERROR: Entity "ENTITY_NAME" not found.

Search tips:
- Check spelling
- Try partial name: /research-entity Cur (for Cursor)
- Use entity ID if known: /research-entity --id cmjk...

To list entities in a project:
  npm run cli -- entity:list '{"projectId": "..."}'
```

### Step 1.2: Load Current State

```bash
# Get entity with all relations
npm run cli -- entity:get '{"entityId": "ENTITY_ID"}'

# Get existing extractions
npm run cli -- extract:list '{"entityId": "ENTITY_ID"}'

# Get existing assertions
npm run cli -- assertion:list '{"entityId": "ENTITY_ID"}'
```

### Step 1.3: Identify Research Gaps

**Schema Coverage Analysis:**
| Schema Type | Status | Priority |
|-------------|--------|----------|
| pricing | Missing | HIGH |
| features | Stale (30+ days) | MEDIUM |
| company | Present | LOW |
| compliance | Missing | HIGH |
| integrations | Missing | MEDIUM |
| differentiators | Missing | HIGH |

**Gap Prioritization (for pillar identification):**
1. **Architecture gaps**: No deployment/architecture info → HIGH priority
2. **Pricing gaps**: No pricing extractions → HIGH priority
3. **Core capability gaps**: No features extraction → MEDIUM priority
4. **Compliance gaps**: No security/compliance info → MEDIUM priority

### Step 1.4: Generate Research Plan

Based on gaps, identify URLs to fetch:

```
## Research Plan for [ENTITY_NAME]

### URLs to Extract
1. [https://example.com/pricing] → pricing schema (HIGH)
2. [https://example.com/security] → compliance schema (HIGH)
3. [https://example.com/docs/deployment] → features schema (architecture focus)
4. [https://example.com/enterprise] → features schema (enterprise capabilities)

### Focus Areas for Pillar Identification
- Deployment model (cloud vs self-hosted vs air-gapped)
- Pricing structure (per-seat, usage-based, enterprise)
- Core AI capabilities and limitations
- Security architecture (data handling, model training)
- Competitive differentiation
```

**Output of Phase 1**: Gap analysis + research plan (URLs to fetch)

---

## PHASE 2: DEEP EXTRACTION (Sonnet + Haiku)

**Goal**: Fill research gaps using evidence-first protocol

### Step 2.1: Execute Extractions

For each URL in the research plan:

```bash
# Fetch page content and capture screenshot
npm run cli -- extract:fetch '{"url": "URL", "entityId": "ENTITY_ID"}'
```

**Returns:**
```json
{
  "success": true,
  "cacheId": "abc123",
  "screenshotPath": "screenshots/2026-01/example-abc123.png",
  "contentPreview": "First 2000 chars..."
}
```

### Step 2.2: Analyze Screenshot and Extract Data

**CRITICAL: Claude reads the screenshot visually and extracts structured data.**

For each extraction, Claude:
1. Opens the screenshot (returned path)
2. Identifies relevant information for the schema type
3. Notes EXACT text/elements that support claims
4. Records WHERE on the page evidence appears

### Step 2.3: Save Extractions

```bash
npm run cli -- extract:save '{
  "entityId": "ENTITY_ID",
  "schemaType": "pricing",
  "url": "https://example.com/pricing",
  "screenshotPath": "screenshots/2026-01/example-abc123.png",
  "data": {
    "hasFreeTier": true,
    "hasEnterprise": true,
    "tiers": [
      {"name": "Free", "price": 0, "billingCycle": "free", "features": ["..."]},
      {"name": "Pro", "price": 20, "billingCycle": "month", "features": ["..."]}
    ]
  }
}'
```

### Step 2.4: Create Targeted Assertions

Create assertions for strategic areas that could become pillars:

```bash
npm run cli -- assertion:create '{
  "entityId": "ENTITY_ID",
  "claim": "Cursor offers self-hosted deployment option for enterprise customers",
  "category": "feature",
  "evidenceDescription": "Screenshot shows Enterprise section with 'Self-hosted deployment' listed under deployment options",
  "evidenceScreenshotPath": "screenshots/2026-01/cursor-enterprise-abc123.png",
  "sourceUrl": "https://cursor.com/enterprise",
  "criticality": "HIGH",
  "reasoning": "Deployment architecture is critical for federal procurement - determines data residency and air-gap viability"
}'
```

**Assertion Focus Areas:**
- Deployment model claims (cloud-only, self-hosted, air-gapped)
- Pricing structure claims (per-seat costs, enterprise minimums)
- Core capability claims (what AI does, key limitations)
- Data handling claims (where data goes, model training policies)
- Compliance claims (certifications, in-progress audits)

### Step 2.5: Extract Differentiators

**CRITICAL**: Differentiation analysis is essential for competitive positioning.

Fetch comparison pages or competitor sections:
```bash
npm run cli -- extract:fetch '{"url": "https://example.com/vs-copilot", "entityId": "..."}'
npm run cli -- extract:fetch '{"url": "https://example.com/why-us", "entityId": "..."}'
```

Claude analyzes screenshots to identify:
- **Unique features** (only this entity has)
- **Leading features** (best-in-class)
- **Lagging features** (competitors are better)
- **Missing features** (competitors have, entity lacks)

Save differentiators extraction:
```bash
npm run cli -- extract:save '{
  "entityId": "...",
  "schemaType": "differentiators",
  "url": "https://example.com/features",
  "screenshotPath": "screenshots/...",
  "data": {
    "uniqueFeatures": [...],
    "leadingFeatures": [...],
    "tableStakes": [...],
    "laggingFeatures": [...],
    "missingFeatures": [...],
    "primaryCompetitors": ["Competitor A", "Competitor B"],
    "differentiationSummary": "..."
  }
}'
```

**Auto-generated assertions** from differentiators:
- `UNIQUE DIFFERENTIATOR: [feature]` - category: differentiator
- `MARKET LEADER: [feature]` - category: differentiator
- `COMPETITIVE GAP: [feature]` - category: limitation
- `MISSING FEATURE: [feature]` - category: limitation

### Step 2.7: Fetch Entity Logo

If entity doesn't have a logo, fetch one:

```bash
npm run cli -- logo:fetch '{"entityId": "ENTITY_ID"}'
```

**Returns:**
```json
{
  "success": true,
  "entityName": "Cursor",
  "logoUrl": "https://cursor.com/brand/logo.svg",
  "logoPath": "logos/cursor-abc123.svg",
  "logoFormat": "svg",
  "hasSvgContent": true
}
```

**Logo Priority**: SVG preferred (vector, inline storage), then PNG, JPG.

### Step 2.8: Calculate Buzz Score

Assess entity's market presence and momentum using web signals.

**Buzz Factors:**
| Factor | Weight | Source |
|--------|--------|--------|
| Search volume | 25% | WebSearch result count |
| Press mentions | 25% | News/article mentions |
| GitHub activity | 20% | Stars, forks, recent commits |
| Social mentions | 15% | Twitter/LinkedIn mentions |
| Documentation quality | 15% | Docs completeness |

**Buzz Score Calculation:**

```bash
# Search for recent mentions
# Use WebSearch to gauge presence

# Query patterns:
# "[EntityName] AI coding tool 2026"
# "[EntityName] review"
# "[EntityName] vs [Competitor]"
```

**Store buzz as entity metadata:**
```bash
npm run cli -- entity:update '{
  "entityId": "ENTITY_ID",
  "metadata": {
    "buzzScore": 0.75,
    "buzzFactors": {
      "searchVolume": 0.8,
      "pressMentions": 0.7,
      "githubActivity": 0.9,
      "socialMentions": 0.6,
      "docsQuality": 0.7
    },
    "buzzCalculatedAt": "2026-01-21"
  }
}'
```

**Buzz Score Interpretation:**
| Score | Level | Visual Weight |
|-------|-------|---------------|
| 0.8+ | HIGH | Large icon, prominent placement |
| 0.5-0.8 | MEDIUM | Standard icon |
| 0.3-0.5 | LOW | Smaller icon |
| <0.3 | MINIMAL | Minimal visual weight |

**Output of Phase 2**: Filled extractions + differentiators + targeted assertions + logo + buzz score

---

## PHASE 3: SYNTHESIS (Opus)

**Goal**: Form world-view, identify pillar assertions

**CRITICAL: This is the discernment phase. Opus reviews ALL assertions and selects the vital few.**

### Step 3.1: Load All Assertions

```bash
npm run cli -- assertion:list '{"entityId": "ENTITY_ID"}'
```

### Step 3.2: Form World-View

Write a 2-3 paragraph synthesis that captures:
- What this entity IS (category, market position)
- What makes it SIGNIFICANT (key strengths, unique value)
- What CONCERNS exist (risks, unknowns, limitations)
- How it COMPARES to alternatives (if known)

### Step 3.3: Identify Pillar Assertions

From all assertions, select 5-10 that are FOUNDATIONAL.

**Selection Criteria (apply custom weights):**
| Factor | Weight | Question |
|--------|--------|----------|
| Architecture | 30% | Does this claim define HOW the tool works? |
| Pricing | 25% | Does this claim affect cost decisions? |
| Core Capability | 20% | Does this claim define WHAT the tool does? |
| Differentiation | 15% | Does this claim explain WHY this vs alternatives? |
| Compliance | 10% | Does this claim affect regulatory viability? |

**Pillar Test Questions:**
1. "If this is wrong, does our recommendation change?"
2. "Would a decision-maker need to know this?"
3. "Is this verifiable with our screenshot evidence?"
4. "Do other conclusions depend on this being true?"

### Step 3.4: Assign Validation Priority

| Priority | Criteria | Action |
|----------|----------|--------|
| **P1** | Recommendation depends on this | Validate BEFORE any decisions |
| **P2** | Important for full picture | Validate BEFORE deliverables |
| **P3** | Nice to confirm | Validate when time permits |

### Step 3.5: Document Pillar Selections

For each pillar assertion, document:
- **Claim**: The assertion text
- **Category**: Architecture/Pricing/Capability/Differentiation/Compliance
- **Priority**: P1/P2/P3
- **Why It's a Pillar**: 1-2 sentence explanation
- **Evidence Quality**: Strong/Medium/Weak
- **Assertion ID**: For database update

**Output of Phase 3**: World-view synthesis + 5-10 pillar assertions with justifications

---

## PHASE 4: OUTPUT (Haiku)

**Goal**: Persist pillar designations, generate deliverables

### Step 4.1: Mark Pillar Assertions

For each pillar assertion:

```bash
npm run cli -- assertion:update '{
  "assertionId": "ASSERTION_ID",
  "criticality": "CRITICAL",
  "citedInConclusion": true,
  "conclusionContext": "P1 PILLAR - Architecture: Defines deployment options which gate federal viability"
}'
```

**conclusionContext Format:**
```
[Priority] PILLAR - [Category]: [Why it's foundational]

Examples:
- "P1 PILLAR - Architecture: Self-hosted claim gates air-gapped deployment viability"
- "P1 PILLAR - Pricing: Enterprise pricing determines budget feasibility"
- "P2 PILLAR - Capability: Model context length limits use case scope"
- "P2 PILLAR - Compliance: SOC2 status affects enterprise procurement timeline"
```

### Step 4.2: Create Validation Agenda

```bash
npm run cli -- agenda:create '{
  "projectId": "PROJECT_ID",
  "name": "Validate [ENTITY_NAME] Pillars",
  "taskType": "assertion:validate",
  "entityIds": ["ENTITY_ID"]
}'
```

### Step 4.3: Generate World-View Document

Output the final report:

```markdown
# [ENTITY_NAME] - Research World-View

![Logo](logos/entity-logo.svg) <!-- If available -->

**Buzz Score**: ████████░░ 0.78 (HIGH)

## Executive Summary

[2-3 paragraph world-view synthesis from Phase 3]

## Entity Profile

| Attribute | Value |
|-----------|-------|
| Type | tool |
| URL | https://entity.com |
| Logo | ✓ SVG available |
| Buzz Score | 0.78 (HIGH) |
| Extractions | 5 |
| Assertions | 23 |

## Pillar Assertions

### P1 - Must Validate Immediately

| ID | Claim | Category | Evidence Quality | Why It's a Pillar |
|----|-------|----------|------------------|-------------------|
| cmjk... | [claim text] | Architecture | Strong | [explanation] |
| cmjk... | [claim text] | Pricing | Medium | [explanation] |

### P2 - Should Validate Before Deliverables

| ID | Claim | Category | Evidence Quality | Why It's a Pillar |
|----|-------|----------|------------------|-------------------|
| cmjk... | [claim text] | Capability | Strong | [explanation] |

### P3 - Validate When Time Permits

| ID | Claim | Category | Evidence Quality | Why It's a Pillar |
|----|-------|----------|------------------|-------------------|
| cmjk... | [claim text] | Compliance | Weak | [explanation] |

## Research Coverage

| Schema | Status | Last Updated |
|--------|--------|--------------|
| Pricing | Complete | 2026-01-21 |
| Features | Complete | 2026-01-21 |
| Company | Partial | 2026-01-15 |
| Compliance | Complete | 2026-01-21 |
| Differentiators | Complete | 2026-01-21 |

## Key Strengths

- [Strength 1]
- [Strength 2]

## Key Risks / Concerns

- [Risk 1]
- [Risk 2]

## Unknowns Requiring Investigation

- [Unknown 1]
- [Unknown 2]

## Preliminary Assessment

**Recommendation**: PILOT | MONITOR | SKIP | INSUFFICIENT_DATA

**Confidence**: HIGH | MEDIUM | LOW

**Rationale**: [1-2 sentences explaining recommendation]

**Gated By**: [List P1 pillar assertions that must be validated for recommendation to stand]

---

## Validation Commands

# View pillar assertions
npm run cli -- assertion:search '{"entityId": "ENTITY_ID", "citedInConclusion": true}'

# Validate a pillar (after human review)
npm run cli -- assertion:validate '{"assertionId": "...", "validatedBy": "researcher-name"}'

# Check agenda progress
npm run cli -- agenda:status '{"agendaId": "..."}'
```

---

## ERROR HANDLING

### Entity Not Found
```
ERROR: Entity "Unknown Tool" not found.

Did you mean one of these?
- Unknown AI (cmjk123...)
- Tool Unknown (cmjk456...)

Search all entities: npm run cli -- entity:search '{"query": "unknown"}'
```

### No Extractions Available
```
WARNING: Entity has no extractions.

Starting with fresh research. This may take longer.

Searching for official website...
```

### Extraction Fails (Site Down/Blocked)
```
WARNING: Could not extract from https://example.com/pricing
Reason: Site returned 403

Continuing with available data. Consider:
- Manual screenshot capture
- Alternative source URLs
- Marking gap in world-view
```

### Insufficient Data for Pillars
```
WARNING: Only 3 assertions available. Pillar identification may be incomplete.

Recommendation: Run additional extractions:
- Pricing page
- Security/compliance page
- Documentation/architecture page
```

---

## EXAMPLE: Full Research Run

```
User: /research-entity Cursor

Claude: I'll perform deep research on Cursor to identify pillar assertions.

## PHASE 1: RECONNAISSANCE

Loading entity...
✓ Entity found: Cursor (cmjk123abc)
  URL: https://cursor.com
  Type: tool

Checking current research state...
- Extractions: 2 (pricing, features)
- Assertions: 12
- Last updated: 3 days ago

Gap Analysis:
| Schema | Status | Priority |
|--------|--------|----------|
| pricing | Present | - |
| features | Present | - |
| company | Missing | LOW |
| compliance | Missing | HIGH |
| integrations | Missing | MEDIUM |

Research Plan:
1. https://cursor.com/security → compliance schema
2. https://cursor.com/enterprise → features (deployment focus)
3. https://docs.cursor.com/architecture → features (architecture focus)

## PHASE 2: DEEP EXTRACTION

Extracting: https://cursor.com/security
✓ Screenshot captured: screenshots/2026-01/cursor-security-xyz789.png
✓ Analyzing screenshot...
✓ Compliance data extracted and saved

[Creates assertions for security claims]

Extracting: https://cursor.com/enterprise
✓ Screenshot captured: screenshots/2026-01/cursor-enterprise-abc123.png
✓ Analyzing screenshot...
✓ Enterprise features extracted

[Creates assertions for deployment/enterprise claims]

## PHASE 3: SYNTHESIS

Forming world-view from 18 assertions...

### World-View

Cursor is an AI-powered code editor built on VS Code, positioning itself as a "first AI-native IDE" rather than an extension to existing tools. Its primary value proposition is deep integration of AI assistance throughout the development workflow, including code completion, chat-based editing, and codebase-aware context.

The tool operates primarily as a cloud-connected application with AI inference handled by Cursor's servers. While enterprise features exist, the deployment model appears to be cloud-first without clear self-hosted options. This architectural choice may limit federal viability where air-gapped requirements exist.

Pricing follows a freemium model with Pro ($20/mo) and Business ($40/mo) tiers. The business tier adds team management but pricing details for large-scale enterprise deployments are not publicly documented, suggesting custom negotiation for federal-scale procurement.

### Pillar Assertion Selection

Analyzing 18 assertions against pillar criteria...

Selected 7 pillar assertions:

**P1 - Must Validate Immediately**
1. "Cursor routes all AI queries through Cursor's servers" (Architecture) - CRITICAL
   → If wrong, data residency assumptions change completely
2. "Business tier is $40/user/month billed annually" (Pricing) - CRITICAL
   → Budget planning depends on this being accurate

**P2 - Should Validate**
3. "Cursor does not offer self-hosted deployment" (Architecture) - HIGH
   → Gates air-gapped deployment possibility
4. "Privacy Mode prevents code from being stored or used for training" (Architecture) - HIGH
   → Key for IP-sensitive use cases
5. "SOC 2 Type II certification in progress" (Compliance) - HIGH
   → Affects enterprise procurement timeline

**P3 - Validate When Time Permits**
6. "Supports custom model endpoints" (Capability) - MEDIUM
   → Could enable BYOM scenarios
7. "VS Code extensions are compatible" (Capability) - MEDIUM
   → Affects migration effort

## PHASE 4: OUTPUT

Marking pillar assertions...
✓ 7 assertions marked with citedInConclusion=true

Creating validation agenda...
✓ Agenda created: "Validate Cursor Pillars" (agenda-xyz789)

---

# Cursor - Research World-View

## Executive Summary

Cursor is an AI-powered code editor built on VS Code, positioning itself as a "first AI-native IDE"...
[Full synthesis]

## Pillar Assertions

### P1 - Must Validate Immediately

| Claim | Category | Evidence | Why It's a Pillar |
|-------|----------|----------|-------------------|
| Cursor routes all AI queries through Cursor's servers | Architecture | Strong | Data residency assumptions depend on this |
| Business tier is $40/user/month | Pricing | Strong | Budget planning depends on accuracy |

### P2 - Should Validate

| Claim | Category | Evidence | Why It's a Pillar |
|-------|----------|----------|-------------------|
| No self-hosted deployment option | Architecture | Medium | Gates air-gapped viability |
| Privacy Mode prevents code storage/training | Architecture | Strong | Key for IP-sensitive use |
| SOC 2 Type II in progress | Compliance | Medium | Affects procurement timeline |

## Preliminary Assessment

**Recommendation**: PILOT
**Confidence**: MEDIUM
**Gated By**: P1 assertions on data routing and pricing

---

Next steps:
1. Review P1 pillar assertions (open screenshots, verify claims)
2. Run: npm run cli -- assertion:validate '{"assertionId": "...", "validatedBy": "your-name"}'
3. Once P1s validated, recommendation confidence increases to HIGH
```

---

## RELATED SKILLS

- `/research-project` - **Required** - Set active project context for `types` and `--type` commands
- `/research-discover <domain>` - Discover new entities to research
- `/research-domain` - Manage research domain definitions
- `/research-to-deck` - Generate presentations from research
- `/research` - Full research orchestration (VISION.md based)

---

## PROJECT CONTEXT

The `types` and `--type` commands require an active project. Project context is stored in `.claude/context/active-project.json`.

### Setting Project Context

```bash
/research-project use "My Project"
```

### Reading Project Context (for skill implementation)

```bash
# Check for active project
if [ -f .claude/context/active-project.json ]; then
  PROJECT_ID=$(cat .claude/context/active-project.json | jq -r '.projectId')
  PROJECT_NAME=$(cat .claude/context/active-project.json | jq -r '.projectName')
fi
```

### Context File Format

```json
{
  "projectId": "cmjk123abc",
  "projectName": "Agentic SDLC Research",
  "setAt": "2026-01-21T14:30:00Z"
}
```
