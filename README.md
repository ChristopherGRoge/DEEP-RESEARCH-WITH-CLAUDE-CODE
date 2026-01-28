# Deep Research System
## Repeatable, Persistent Research with AI Subagents

A framework for conducting structured research on tools, platforms, and technologies. Subagents discover entities, collect claims, and persist findings to SQLite. Human researchers validate claims into evidence.

---

## Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd 00-TOOLS-RESEARCH
./install.sh
```

That's it! The setup script will:
- Install npm dependencies
- Create the SQLite database (`prisma/research.db`)
- Run Prisma migrations

**No database server required.** SQLite is embedded - zero configuration.

### After Git Pull

```bash
git pull
./install.sh  # Safe to run multiple times - idempotent
```

---

## Prerequisites

Just **Node.js 18+**:

```bash
# macOS
brew install node

# Or download from https://nodejs.org/
```

---

## Create a Research Project

```bash
# Create a new DISCOVERY project
npm run cli -- project:create '{
  "name": "Agentic SDLC Tools",
  "description": "AI-powered tools for software development lifecycle",
  "workflow": "DISCOVERY"
}'
```

Save the returned `projectId` - you'll need it.

## Ask Claude to Research

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

## Review Findings

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

## Validate Claims

As the human researcher, you promote Claims to Evidence:

```bash
# Validate an assertion (Claim -> Evidence)
npm run cli -- assertion:validate '{
  "assertionId": "<id>",
  "validatedBy": "your-name"
}'

# Validate a source (Proposed -> Validated)
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

**Initiate with:**
```
Research [topic] for project [name].
This is DISCOVERY mode - find as many relevant entities as possible.
Criteria: [your inclusion/exclusion criteria]
```

### ANALYSIS Mode
Deep dive into a specific entity.

**When to use:** Evaluating a tool for potential adoption.

**Initiate with:**
```
Analyze [Entity Name] in depth for project [name].
This is ANALYSIS mode - validate all claims and assess federal viability.
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
├── Status: CLAIM (unvalidated) -> EVIDENCE (validated)
├── Category: feature
├── Reasoning: [why this matters]
└── Sources: [URLs backing this claim]
```

### Sources
URLs backing claims. Start as PROPOSED, become VALIDATED when you verify.

```
Source: https://harness.io/docs/self-managed
├── Status: PROPOSED -> VALIDATED
├── Type: vendor_docs
└── Linked to: [assertions it supports]
```

---

## Common Commands

### Project Management

```bash
npm run cli -- project:list
npm run cli -- project:get '{"projectId": "<id>"}'
npm run cli -- project:find '{"name": "Project Name"}'
```

### Entity Operations

```bash
npm run cli -- entity:list '{"projectId": "<id>"}'
npm run cli -- entity:search '{"query": "kubernetes", "entityType": "tool"}'
npm run cli -- entity:get '{"entityId": "<id>"}'
```

### Assertion Operations

```bash
npm run cli -- assertion:list '{"entityId": "<id>"}'
npm run cli -- assertion:search '{"query": "FedRAMP", "status": "CLAIM"}'
npm run cli -- search:noSources '{"projectId": "<id>"}'
```

### Validation Queue

```bash
npm run cli -- search:pending '{"projectId": "<id>"}'
npm run cli -- search:summary '{"projectId": "<id>"}'
npm run cli -- search:activity '{"limit": 20}'
```

---

## Database Management

```bash
# Initial setup (or after git pull)
./install.sh

# Manual backup
npm run db:backup

# Restore from backup
npm run db:restore backups/backup-YYYYMMDD-HHMMSS.db.gz

# Open visual browser (Prisma Studio)
npm run db:studio

# Run migrations manually
npm run db:migrate

# Reset database (CAUTION: destroys all data)
npm run db:reset
```

### Database Location

The SQLite database is stored at `prisma/research.db`. To back it up manually, just copy this file.

---

## Project Structure

```
00-TOOLS-RESEARCH/
├── README.md                    # This file
├── CLAUDE.md                    # Subagent guide (Claude reads this)
├── VISION.md                    # Research philosophy
│
├── prisma/
│   ├── schema.prisma            # Data model
│   └── research.db              # SQLite database (created by install.sh)
│
├── src/
│   ├── cli.ts                   # CLI entry point
│   └── tools/                   # Database operations
│
├── docs/
│   ├── RESEARCH-SYSTEM.md       # Full architecture docs
│   ├── SUBAGENT-TEAM.md         # Agent specifications
│   └── RESEARCH-TEMPLATES/      # Output templates
│
├── .claude/
│   └── skills/                  # Claude Code skills
│
└── RESEARCH/                    # Your research outputs
```

---

## Tips for Effective Research

1. **Start Broad, Then Focus** - Begin with DISCOVERY, then switch to ANALYSIS for promising entities
2. **Let Agents Do the Legwork** - Ask Claude to discover and collect. Reserve your time for validation
3. **Validate Regularly** - Don't let claims pile up. Review weekly
4. **Use Categories Consistently** - Stick to standard categories (feature, pricing, security, etc.)
5. **Always Link Sources** - Every claim should trace back to a URL
6. **Trust but Verify** - Agent-collected claims are CLAIM status for a reason

---

## Troubleshooting

### CLI returns error

```bash
# Check .env has correct DATABASE_URL
cat .env
# Should show: DATABASE_URL="file:./research.db"

# Re-run setup
./install.sh
```

### Database not found

```bash
# Check if database exists
ls -la prisma/research.db

# Recreate if missing
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

*Happy researching!*
