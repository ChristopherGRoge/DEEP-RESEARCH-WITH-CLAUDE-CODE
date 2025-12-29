# Deep Research System
## Repeatable, Persistent Research with AI Subagents

A framework for conducting structured research on tools, platforms, and technologies. Subagents discover entities, collect claims, and persist findings to PostgreSQL. Human researchers validate claims into evidence.

---

## Quick Start

### 1. Start the Database

```bash
# Start PostgreSQL container (port 5433)
npm run docker:up

# Verify it's running
docker ps | grep research-db

# Run migrations (first time only)
npm run db:migrate
```

### 2. Create a Research Project

```bash
# Create a new DISCOVERY project
npm run cli -- project:create '{
  "name": "Agentic SDLC Tools",
  "description": "AI-powered tools for software development lifecycle",
  "workflow": "DISCOVERY"
}'
```

Save the returned `projectId` - you'll need it.

### 3. Ask Claude to Research

Open Claude Code and direct research:

```
Research AI testing tools for the project "Agentic SDLC Tools" (projectId: xxx).
Focus on tools with FedRAMP potential. Find at least 10 entities.
```

Claude will orchestrate subagents to:
- Scout for entities matching your criteria
- Collect claims from vendor websites
- Fetch logos and metadata
- Assess federal compliance posture
- Persist everything to the database

### 4. Review Findings

```bash
# See what was discovered
npm run cli -- entity:list '{"projectId": "<id>"}'

# Get details on a specific entity
npm run cli -- entity:get '{"entityId": "<id>"}'

# See pending items needing your validation
npm run cli -- search:pending '{"projectId": "<id>"}'

# Open visual database browser
npm run db:studio
```

### 5. Validate Claims

As the human researcher, you promote Claims to Evidence:

```bash
# Validate an assertion (Claim → Evidence)
npm run cli -- assertion:validate '{
  "assertionId": "<id>",
  "validatedBy": "your-name"
}'

# Validate a source (Proposed → Validated)
npm run cli -- source:validate '{
  "sourceId": "<id>",
  "validatedBy": "your-name"
}'

# Reject if incorrect
npm run cli -- assertion:reject '{"assertionId": "<id>", "validatedBy": "your-name"}'
```

---

## Research Workflows

### DISCOVERY Mode
Cast a broad net to identify entities in a domain.

**When to use:** Starting research on a new topic, building a market landscape.

**What happens:**
1. Subagents search for entities matching your criteria
2. Claims are collected without deep validation
3. Federal relevance signals are noted
4. You review and approve entities for deeper analysis

**Initiate with:**
```
Research [topic] for project [name].
This is DISCOVERY mode - find as many relevant entities as possible.
Criteria: [your inclusion/exclusion criteria]
```

### ANALYSIS Mode
Deep dive into a specific entity.

**When to use:** Evaluating a tool for potential adoption.

**What happens:**
1. Subagents scrape vendor documentation thoroughly
2. Technical architecture is assessed
3. AI/ML claims are validated
4. Federal compliance is evaluated
5. Competitive positioning is mapped

**Initiate with:**
```
Analyze [Entity Name] in depth for project [name].
This is ANALYSIS mode - validate all claims and assess federal viability.
```

---

## Directing Research

### Basic Research Request

```
Research AI code review tools. Create a project called "AI Code Review"
and find tools that could work in federal IL-4 environments.
```

### Specific Entity Analysis

```
I want to evaluate Harness.io for federal use.
Analyze their CI/CD platform, focusing on:
- FedRAMP status
- Self-hosted deployment options
- Data residency
- AI features and their cloud dependencies
```

### Competitive Landscape

```
Map the competitive landscape around [Entity Name].
Find direct competitors, indirect competitors, and substitutes.
```

### Logo and Metadata Collection

```
For all entities in project [name], fetch official logos and
enrich with company metadata (founded date, HQ, funding).
```

### Federal Assessment

```
Assess federal viability for all entities in project [name].
Check FedRAMP marketplace, Platform One, GovCloud availability.
Score each entity 1-10 for federal readiness.
```

---

## Understanding the Data Model

### Entities
Things being researched (tools, frameworks, products).

```
Entity: Harness
├── Type: tool
├── URL: https://harness.io
└── Assertions: [claims about Harness]
```

### Assertions
Claims about entities. Start as CLAIM, become EVIDENCE when you validate.

```
Assertion: "Harness offers self-hosted enterprise deployment"
├── Status: CLAIM (unvalidated) → EVIDENCE (validated)
├── Category: feature
├── Reasoning: [why this matters]
└── Sources: [URLs backing this claim]
```

### Sources
URLs backing claims. Start as PROPOSED, become VALIDATED when you verify.

```
Source: https://harness.io/docs/self-managed
├── Status: PROPOSED → VALIDATED
├── Type: vendor_docs
└── Linked to: [assertions it supports]
```

---

## Common Commands

### Project Management

```bash
# List all projects
npm run cli -- project:list

# Get project with all entities
npm run cli -- project:get '{"projectId": "<id>"}'

# Find project by name
npm run cli -- project:find '{"name": "Project Name"}'

# Switch project to ANALYSIS mode
npm run cli -- project:update '{"projectId": "<id>", "workflow": "ANALYSIS"}'
```

### Entity Operations

```bash
# List entities in project
npm run cli -- entity:list '{"projectId": "<id>"}'

# Search across all projects
npm run cli -- entity:search '{"query": "kubernetes", "entityType": "tool"}'

# Get entity with all assertions and sources
npm run cli -- entity:get '{"entityId": "<id>"}'
```

### Assertion Operations

```bash
# List assertions for an entity
npm run cli -- assertion:list '{"entityId": "<id>"}'

# Search assertions
npm run cli -- assertion:search '{"query": "FedRAMP", "status": "CLAIM"}'

# Find assertions without sources
npm run cli -- search:noSources '{"projectId": "<id>"}'
```

### Validation Queue

```bash
# Get everything pending your validation
npm run cli -- search:pending '{"projectId": "<id>"}'

# Get research summary
npm run cli -- search:summary '{"projectId": "<id>"}'

# See recent activity
npm run cli -- search:activity '{"limit": 20}'
```

---

## Generating Deliverables

After research is complete, generate formatted outputs:

### Efficacy Brief (Single Entity)

```
Generate an EFFICACY brief for [Entity Name] using the template
at docs/RESEARCH-TEMPLATES/EFFICACY. Output to [Entity]-Efficacy/
```

### One-Pagers

```
Create one-pagers for [Entity Name]:
- 00-one-pager.html (standard detail)
- 01-one-pager.html (executive summary)
```

### Discovery Catalog

```
Generate a DISCOVERY catalog for project [name] using the template
at docs/RESEARCH-TEMPLATES/DISCOVERY. Summarize all entities found.
```

---

## Database Management

```bash
# Start database
npm run docker:up

# Stop database
npm run docker:down

# Open visual browser (Prisma Studio)
npm run db:studio

# Reset database (CAUTION: destroys all data)
npm run db:reset

# Run migrations
npm run db:migrate
```

---

## Project Structure

```
00-TOOLS-RESEARCH/
├── README.md                    # This file
├── CLAUDE.md                    # Subagent guide (Claude reads this)
├── VISION.md                    # Research philosophy
│
├── prisma/
│   └── schema.prisma            # Data model
│
├── src/
│   ├── cli.ts                   # CLI entry point
│   └── tools/                   # Database operations
│       ├── projects.ts
│       ├── entities.ts
│       ├── assertions.ts
│       ├── sources.ts
│       └── search.ts
│
├── docs/
│   ├── RESEARCH-SYSTEM.md       # Full architecture docs
│   ├── SUBAGENT-TEAM.md         # Agent specifications
│   └── RESEARCH-TEMPLATES/
│       ├── DISCOVERY            # Discovery output template
│       ├── EFFICACY             # Efficacy brief template
│       └── RESEARCH.md          # Research specification template
│
├── .claude/
│   └── skills/
│       ├── research/            # Research orchestration skill
│       └── research-to-deck/    # Presentation generation skill
│
└── RESEARCH/                    # Your research outputs
    └── [Domain]/
        ├── RESEARCH.md          # Your research spec
        ├── discovery/           # Discovery outputs
        ├── analysis/            # Analysis outputs
        └── deliverables/        # Final documents
```

---

## Tips for Effective Research

### 1. Start Broad, Then Focus
Begin with DISCOVERY to build a landscape, then switch to ANALYSIS for promising entities.

### 2. Let Agents Do the Legwork
Ask Claude to discover and collect. Reserve your time for validation and judgment calls.

### 3. Validate Regularly
Don't let claims pile up. Review and validate weekly to maintain research quality.

### 4. Use Categories Consistently
Stick to standard categories (feature, pricing, security, etc.) for easier analysis.

### 5. Always Link Sources
Every claim should trace back to a URL. Subagents do this automatically.

### 6. Trust but Verify
Agent-collected claims are CLAIM status for a reason. Verify before promoting to EVIDENCE.

---

## Troubleshooting

### Database won't start
```bash
# Check if port 5433 is in use
lsof -i :5433

# Remove old container and restart
docker rm -f research-db
npm run docker:up
```

### CLI returns error
```bash
# Check database is running
docker ps | grep research-db

# Re-run migrations
npm run db:migrate
```

### Can't find project/entity
```bash
# List all projects
npm run cli -- project:list

# Search by name
npm run cli -- project:find '{"name": "partial name"}'
```

---

## Getting Help

- **Architecture questions:** See `docs/RESEARCH-SYSTEM.md`
- **Agent specifications:** See `docs/SUBAGENT-TEAM.md`
- **CLI reference:** See `CLAUDE.md`
- **Templates:** See `docs/RESEARCH-TEMPLATES/`

---

## Example Research Session

```bash
# 1. Start database
npm run docker:up

# 2. Create project
npm run cli -- project:create '{
  "name": "AI Testing Tools 2025",
  "description": "Evaluate AI-powered testing tools for federal adoption",
  "workflow": "DISCOVERY"
}'
# Returns: { "id": "clx123...", "name": "AI Testing Tools 2025" }

# 3. In Claude Code, initiate research:
# "Research AI testing tools for project 'AI Testing Tools 2025' (id: clx123).
#  Find tools with AI test generation. Check for FedRAMP or self-hosted options."

# 4. Monitor progress
npm run cli -- search:summary '{"projectId": "clx123"}'

# 5. Review findings
npm run db:studio
# Opens browser at localhost:5555

# 6. Validate top findings
npm run cli -- assertion:validate '{"assertionId": "xxx", "validatedBy": "chris"}'

# 7. Generate deliverables
# "Generate EFFICACY briefs for the top 3 entities in project 'AI Testing Tools 2025'"
```

---

*Happy researching!*
