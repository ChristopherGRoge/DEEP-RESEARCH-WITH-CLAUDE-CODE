---
name: research-domain
description: Manage research domains for flexible, domain-driven discovery. Create domains that define what to find and how to find it. Use when asked to "create a research domain", "define research scope", or "set up discovery parameters". Required before using /research-discover.
---

# Research Domain Management Skill

Manages **research domains** - configurable definitions of what to discover and how to find it. Domains replace hardcoded category discovery with flexible, user-defined research scopes.

## What is a Research Domain?

A research domain defines:
- **What to find**: Entity types, inclusion/exclusion criteria
- **How to find it**: Search hints, known leaders, relevant topics
- **How to evaluate**: Scoring dimensions for discovered entities

## Commands

```
/research-domain create <name>                      # Create a new domain (interactive)
/research-domain create <name> --context "..."      # Create with natural language context (fewer questions)
/research-domain list                               # List all domains
/research-domain show <name>                        # Show domain details
/research-domain help                               # Verbose overview with workflow explanation
/research-domain commands                           # Concise CLI command reference
```

---

## EXECUTION PROTOCOL

### MODE: `help`

Display a comprehensive overview. Output EXACTLY this format:

```
## Research Domain Skill

Manages research domains - configurable definitions of what to discover and how to find it.

### What is a Research Domain?

A domain defines:
- **What to find**: Entity types (tool, framework, platform), inclusion/exclusion criteria
- **How to find it**: Known leaders for "[X] alternatives" searches, topics to explore
- **How to evaluate**: Scoring dimensions for discovered entities

### Available Commands

| Command | Description |
|---------|-------------|
| `/research-domain create <name>` | Create a new domain interactively |
| `/research-domain create <name> --context "..."` | Create with natural language context |
| `/research-domain list` | List all existing domains |
| `/research-domain show <name>` | Show details for a specific domain |
| `/research-domain help` | This help message |
| `/research-domain commands` | Concise CLI command list |

### Workflow

**Interactive:**
1. Create a domain: `/research-domain create AI-Testing-Tools`
2. Answer questions about problem space, entity types, known leaders, topics
3. Run discovery: `/research-discover AI-Testing-Tools`

**With Context (fewer questions):**
1. Create with context: `/research-domain create Agentic-SDLC --context "Gen-AI tools that replace or enhance traditional SDLC tools"`
2. Claude infers description, inclusion/exclusion criteria from your context
3. Only asks for entity types, known leaders, topics (if not inferrable)
4. Run discovery: `/research-discover Agentic-SDLC`

### Related Skills

- `/research-discover <domain>` - Discover entities (requires domain argument)
- `/research` - Deep research on specific entities
- `/research-to-deck` - Generate presentations from research
```

---

### MODE: `commands`

Display a minimal, copy-paste ready command reference. Output EXACTLY this format:

```
## CLI Commands

# Skill commands
/research-domain create <name>
/research-domain create <name> --context "natural language description of the domain"
/research-domain list
/research-domain show <name>
/research-domain help
/research-domain commands

# Database CLI
npm run cli -- domain:create '{"name": "...", "description": "...", "entityTypes": ["tool"], "knownLeaders": [], "relevantTopics": []}'
npm run cli -- domain:get '{"name": "..."}'
npm run cli -- domain:list
npm run cli -- domain:find '{"name": "..."}'
npm run cli -- domain:update '{"domainId": "...", "fieldToUpdate": "value"}'
npm run cli -- domain:delete '{"domainId": "..."}'
npm run cli -- domain:entities '{"domainId": "..."}'
npm run cli -- domain:summary '{"domainId": "..."}'
npm run cli -- domain:updateStats '{"domainId": "..."}'
```

---

### MODE: `create <name>` or `create <name> --context "..."`

Follow this sequence when creating a domain:

#### Step 1: Parse Arguments

Extract from invocation args:
- **Domain name**: First token after `create` (should be kebab-case, e.g., "Agentic-SDLC-Tools")
- **Context** (optional): Text following `--context` flag

If no name provided:
```
ERROR: Domain name required.
Usage: /research-domain create <domain-name>
       /research-domain create <domain-name> --context "description of the domain"
Example: /research-domain create AI-Testing-Tools
         /research-domain create Agentic-SDLC --context "Gen-AI tools that replace traditional SDLC tools"
```

#### Step 2: Check for Existing Domain

```bash
npm run cli -- domain:find '{"name": "DOMAIN_NAME"}'
```

If domain exists, show current definition and ask if user wants to update it.

#### Step 3: Gather Domain Definition

**If `--context` was provided:**

Claude uses the natural language context to infer:
- `description` - Directly from context
- `inclusionCriteria` - What qualifies based on context
- `exclusionCriteria` - What doesn't fit based on context
- `searchHints` - How to search based on context

Then only ask questions for fields that cannot be reliably inferred:

**Question 1: Entity Types** (if not clear from context)
```
What types of entities should be discovered?

Options (multi-select):
- Tools (software products)
- Frameworks (development frameworks)
- Platforms (hosted services)
- Concepts (architectural patterns)
```

**Question 2: Known Leaders** (always ask - hard to infer)
```
Name 2-4 known tools/leaders in this space (for "[X] alternatives" searches):

[Free text input]
```

**Question 3: Key Topics** (if not clear from context)
```
What topics should be explored? (comma-separated)

[Free text input]
```

**If NO `--context` provided (fully interactive):**

Use **AskUserQuestion** to gather all domain parameters:

**Question 1: Problem Space**
```
What problem space does this domain cover?

Options:
- AI-powered development tools
- Security and compliance platforms
- Data and analytics solutions
- Other (describe)
```

**Question 2: Entity Types**
```
What types of entities should be discovered?

Options (multi-select):
- Tools (software products)
- Frameworks (development frameworks)
- Platforms (hosted services)
- Concepts (architectural patterns)
```

**Question 3: Known Leaders**
```
Name 2-4 known tools/leaders in this space (for "[X] alternatives" searches):

[Free text input]
```

**Question 4: Key Topics**
```
What topics should be explored? (comma-separated)

[Free text input]
```

#### Step 4: Generate Domain Definition

Based on user responses, Claude generates the full domain definition:

```json
{
  "name": "AI-Testing-Tools",
  "description": "AI-powered testing tools for automated test generation, QA, and quality assurance",
  "entityTypes": ["tool", "platform"],
  "inclusionCriteria": "Tools that use AI/ML to automate testing, generate tests, or improve QA processes",
  "exclusionCriteria": "Pure manual testing tools, general-purpose IDEs without AI features",
  "searchHints": "Focus on tools that generate tests, find bugs automatically, or provide AI-assisted QA",
  "knownLeaders": ["Testim", "Mabl", "Functionize", "Diffblue"],
  "relevantTopics": ["AI test generation", "automated QA", "unit test AI", "E2E testing AI"]
}
```

#### Step 5: Persist Domain

```bash
npm run cli -- domain:create '{"name": "...", "description": "...", ...}'
```

#### Step 6: Confirm Creation

Display confirmation and next steps:

```
✓ Domain "AI-Testing-Tools" created successfully.

## Domain Summary
- Description: AI-powered testing tools...
- Entity Types: tool, platform
- Known Leaders: Testim, Mabl, Functionize, Diffblue
- Topics to Explore: AI test generation, automated QA, ...

## Next Steps
Run /research-discover AI-Testing-Tools to start discovering entities in this domain.
```

---

### MODE: `list`

List all existing research domains.

```bash
npm run cli -- domain:list
```

Format output as table:

```
## Research Domains

| Name | Entities | Last Discovery | Description |
|------|----------|----------------|-------------|
| Agentic-SDLC-Tools | 45 | 2 days ago | AI tools automating SDLC... |
| AI-Security-Scanners | 23 | 1 week ago | Security vulnerability... |
```

If no domains exist:
```
No research domains found.

Create one with: /research-domain create <domain-name>
```

---

### MODE: `show <name>`

Show detailed information about a specific domain.

#### Step 1: Load Domain

```bash
npm run cli -- domain:get '{"name": "DOMAIN_NAME"}'
```

If not found:
```
ERROR: Domain "DOMAIN_NAME" not found.

Available domains:
[List from domain:list]
```

#### Step 2: Display Domain Details

```
## Domain: Agentic-SDLC-Tools

**Description:** AI tools that automate software development lifecycle tasks

### What to Find
- **Entity Types:** tool, framework
- **Inclusion Criteria:** Tools using AI/ML to assist coding, testing, deployment
- **Exclusion Criteria:** Pure manual tools, basic automation without AI

### How to Find It
- **Known Leaders:** GitHub Copilot, Cursor, Tabnine, Codeium
- **Relevant Topics:** code completion, AI debugging, automated testing
- **Search Hints:** Focus on tools with AI-driven features...

### Statistics
- Entities Discovered: 45
- Last Discovery: 2026-01-15

### Actions
- Run discovery: /research-discover Agentic-SDLC-Tools
- Update domain: /research-domain update Agentic-SDLC-Tools
```

---

## CLI COMMAND REFERENCE

| Command | Purpose |
|---------|---------|
| `domain:create` | Create new domain |
| `domain:get` | Get domain by ID or name |
| `domain:list` | List all domains |
| `domain:update` | Update domain fields |
| `domain:delete` | Delete a domain |
| `domain:find` | Find domain by name |
| `domain:entities` | List entities in domain |
| `domain:summary` | Get domain with statistics |
| `domain:updateStats` | Refresh entity count |

---

## DOMAIN SCHEMA

```typescript
interface ResearchDomain {
  id: string;
  name: string;                    // Unique, kebab-case
  description: string;             // What this domain covers

  // What to find
  entityTypes: string[];           // ["tool", "framework", "platform"]
  inclusionCriteria?: string;      // What qualifies an entity
  exclusionCriteria?: string;      // What disqualifies

  // How to find it
  searchHints?: string;            // Guidance for query generation
  knownLeaders: string[];          // Known tools for "[X] alternatives"
  relevantTopics: string[];        // Topics to explore

  // How to evaluate
  evaluationDimensions?: Array<{
    name: string;
    weight: number;
    description?: string;
  }>;

  // Tracking
  lastDiscoveryAt?: Date;
  entityCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}
```

---

## EXAMPLES

### Example 1: Interactive Creation (no --context)

```
User: /research-domain create GenAI-Observability

Claude: I'll create a research domain for GenAI Observability.

[AskUserQuestion: What problem space does this cover?]
User: Tools for monitoring and observing LLM/GenAI applications

[AskUserQuestion: What entity types?]
User: Tools, Platforms

[AskUserQuestion: Known leaders?]
User: LangSmith, Helicone, Weights & Biases

[AskUserQuestion: Key topics?]
User: LLM monitoring, prompt analytics, cost tracking, token usage

Claude: Creating domain with these parameters...

[Runs domain:create CLI command]

✓ Domain "GenAI-Observability" created successfully.

## Domain Summary
- Description: Tools for monitoring and observing LLM/GenAI applications
- Entity Types: tool, platform
- Known Leaders: LangSmith, Helicone, Weights & Biases
- Topics: LLM monitoring, prompt analytics, cost tracking, token usage

## Next Steps
Run `/research-discover GenAI-Observability` to discover entities.
```

### Example 2: Creation with --context (fewer questions)

```
User: /research-domain create Agentic-SDLC --context "Gen-AI tools which promise to replace, enhance or re-imagine tools that today drive software delivery using traditional technologies"

Claude: I'll create a research domain for Agentic-SDLC using your context.

From your context, I've inferred:
- Description: Gen-AI tools that replace, enhance, or re-imagine traditional software delivery tools
- Inclusion: AI/ML-powered tools targeting SDLC phases (coding, testing, deployment, monitoring)
- Exclusion: Traditional tools without AI capabilities, pure infrastructure tools

[AskUserQuestion: What entity types?]
User: Tools, Platforms

[AskUserQuestion: Known leaders in this space?]
User: GitHub Copilot, Cursor, Tabnine, Vercel v0

Claude: Creating domain with these parameters...

[Runs domain:create CLI command]

✓ Domain "Agentic-SDLC" created successfully.

## Domain Summary
- Description: Gen-AI tools that replace, enhance, or re-imagine traditional software delivery tools
- Entity Types: tool, platform
- Known Leaders: GitHub Copilot, Cursor, Tabnine, Vercel v0
- Topics: AI code generation, automated testing, intelligent deployment, AI-assisted debugging

## Next Steps
Run `/research-discover Agentic-SDLC` to discover entities.
```

---

## RELATED SKILLS

- `/research-discover <domain>` - Discover entities in a domain
- `/research` - Deep research on specific entities
- `/research-to-deck` - Generate presentations from research
