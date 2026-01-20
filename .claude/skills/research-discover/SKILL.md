---
name: research-discover
description: Domain-driven entity discovery using multi-agent orchestration. Discovers tools, frameworks, and platforms based on research domain definitions. Requires a domain argument. Use when asked to "discover tools in domain", "run discovery for [domain]", or "find entities matching [domain]".
---

# Domain-Driven Discovery Skill (Subagent-Orchestrated)

Intelligent web-based discovery driven by **research domain definitions**. Unlike hardcoded category discovery, this skill dynamically generates search strategies based on domain configuration - no two domains search the same way.

## Key Difference from Old /discover

| Old /discover | New /research-discover |
|---------------|------------------------|
| Hardcoded 9 categories | Domain-driven, unlimited scope |
| Optional `--categories` flag | **Required** domain argument |
| Fixed queries ("Cursor Copilot alternatives") | Claude generates queries from domain |
| `discoveryCategory` field | `domainId` foreign key |
| Always searches same things | Different domains = different strategies |

## Architecture Overview

```
                           ┌─────────────────────────────┐
                           │     OPUS ORCHESTRATOR       │
                           │  - Validates domain exists  │
                           │  - Loads domain context     │
                           │  - Generates search strategy│
                           │  - Spawns parallel agents   │
                           │  - Deduplicates results     │
                           └─────────────┬───────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│  SONNET: Query Set 1    │ │  SONNET: Query Set 2    │ │  SONNET: Query Set N    │
│  (5-7 queries each)     │ │  (5-7 queries each)     │ │  (5-7 queries each)     │
│                         │ │                         │ │                         │
│  - WebSearch queries    │ │  - WebSearch queries    │ │  - WebSearch queries    │
│  - WebFetch articles    │ │  - WebFetch articles    │ │  - WebFetch articles    │
│  - Apply inclusion      │ │  - Apply inclusion      │ │  - Apply inclusion      │
│    criteria from domain │ │    criteria from domain │ │    criteria from domain │
│  - Return JSON list     │ │  - Return JSON list     │ │  - Return JSON list     │
└─────────────┬───────────┘ └─────────────┬───────────┘ └─────────────┬───────────┘
              │                          │                          │
              └──────────────────────────┼──────────────────────────┘
                                         │
                           ┌─────────────▼───────────────┐
                           │     OPUS: DEDUPLICATE       │
                           │  - Merge all results        │
                           │  - Filter against existing  │
                           │  - Score by domain criteria │
                           └─────────────┬───────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
              ▼                          ▼                          ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│  HAIKU: Persist Batch 1 │ │  HAIKU: Persist Batch 2 │ │  HAIKU: Persist Batch N │
│  entity:create          │ │  entity:create          │ │  entity:create          │
│  WITH domainId          │ │  WITH domainId          │ │  WITH domainId          │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

---

## EXECUTION PROTOCOL

Follow this EXACT sequence when /research-discover is invoked:

### PHASE 1: VALIDATE DOMAIN (Required)

**Parse domain name from arguments.** Domain is REQUIRED.

```
/research-discover <domain-name>

Examples:
  /research-discover Agentic-SDLC-Tools
  /research-discover GenAI-Observability
```

**If no domain provided:**
```
ERROR: Domain argument required.

Usage: /research-discover <domain-name>

To see available domains: /research-domain list
To create a new domain: /research-domain create <name>
```

**Validate domain exists:**
```bash
npm run cli -- domain:get '{"name": "DOMAIN_NAME"}'
```

**If domain not found:**
```
ERROR: Domain "DOMAIN_NAME" not found.

Available domains:
[Run domain:list and display results]

Create a new domain: /research-domain create DOMAIN_NAME
```

### PHASE 2: LOAD CONTEXT

**Extract domain configuration:**
From the domain:get response, extract:
- `description` - What this domain covers
- `entityTypes` - Types of entities to find
- `inclusionCriteria` - What qualifies an entity
- `exclusionCriteria` - What disqualifies
- `searchHints` - Guidance for query generation
- `knownLeaders` - Known tools (for "alternatives" searches)
- `relevantTopics` - Topics to explore

**Load existing entities for deduplication:**
```bash
npm run cli -- entity:list '{"projectId": "PROJECT_ID"}'
```

Or if you need domain-specific entities:
```bash
npm run cli -- domain:entities '{"domainId": "DOMAIN_ID"}'
```

Store existing entity names/URLs in memory for deduplication.

### PHASE 3: GENERATE SEARCH STRATEGY (Claude Reasoning)

**CRITICAL: Do NOT use hardcoded queries. Generate queries dynamically from domain context.**

Based on the domain configuration, generate 15-25 search queries using these patterns:

**Query Pattern Templates:**
1. `"[topic] AI tools 2026"` - For each relevant topic
2. `"[knownLeader] alternatives 2026"` - For each known leader
3. `"best AI [topic] tools comparison"` - Comparison queries
4. `"new AI [topic] startups 2026"` - Emerging players
5. `"[topic] GitHub trending"` - GitHub discovery
6. `"[topic] tools for enterprise"` - Enterprise focus
7. `"open source [topic] tools"` - OSS alternatives

**Example Generation for "GenAI-Observability" domain:**
- Domain Topics: LLM monitoring, prompt analytics, cost tracking
- Known Leaders: LangSmith, Helicone, Weights & Biases

Generated Queries:
```
1. "LLM monitoring tools 2026"
2. "prompt analytics platforms 2026"
3. "AI cost tracking tools"
4. "LangSmith alternatives 2026"
5. "Helicone alternatives 2026"
6. "best LLM observability tools comparison"
7. "GenAI application monitoring startups"
8. "LLM token usage tracking tools"
9. "prompt debugging tools"
10. "AI observability platforms enterprise"
...
```

**Divide queries into 3-5 query sets** for parallel Sonnet agents.

### PHASE 4: PARALLEL SEARCH (Sonnet Agents, 3-5 Parallel)

**CRITICAL: Launch ALL search agents in ONE message using multiple Task tool calls.**

Each Sonnet agent gets this prompt structure:

```
DISCOVERY SCOUT AGENT - Domain: [DOMAIN_NAME]

You are discovering entities for the "[DOMAIN_NAME]" research domain.

## DOMAIN CONTEXT
Description: [description]
Entity Types to Find: [entityTypes]
Inclusion Criteria: [inclusionCriteria]
Exclusion Criteria: [exclusionCriteria]

## YOUR SEARCH QUERIES
[List 5-7 queries assigned to this agent]

## INSTRUCTIONS
1. Use WebSearch for each query
2. For "best tools" or comparison articles, use WebFetch to extract ALL tools mentioned
3. For direct tool websites, extract key info from search snippets
4. **Apply domain's inclusion/exclusion criteria** to filter results
5. Deduplicate within your results

## REQUIRED OUTPUT FORMAT
Return ONLY a valid JSON array (no markdown fences, no explanation):

[
  {
    "name": "Tool Name",
    "url": "https://official-website.com",
    "description": "Brief description of what it does",
    "entityType": "tool|framework|platform|concept",
    "relevanceScore": 0-100,
    "sourceQuery": "query that found this",
    "confidence": "high|medium|low"
  }
]

**Scoring Guidelines:**
- relevanceScore 80-100: Perfectly matches domain, official URL confirmed
- relevanceScore 60-79: Likely matches, may need verification
- relevanceScore 40-59: Tangentially related
- relevanceScore < 40: Probably doesn't belong

Include 10-25 entities. Err on the side of inclusion - deduplication happens later.
```

### PHASE 5: DEDUPLICATE & SCORE (Opus)

After all Sonnet agents complete:

1. **Parse each agent's JSON output**
2. **Combine into single list**
3. **Normalize and deduplicate:**
   ```javascript
   // Name normalization
   function normalizeName(name) {
     let n = name.toLowerCase().trim();
     for (const suffix of [' ai', ' code', '.ai', '.io', '.dev', '.com']) {
       if (n.endsWith(suffix)) n = n.slice(0, -suffix.length);
     }
     return n.replace(/[^a-z0-9]/g, '');
   }

   // URL normalization
   function normalizeUrl(url) {
     const parsed = new URL(url);
     const domain = parsed.hostname.replace(/^www\./, '');
     const path = parsed.pathname.replace(/\/$/, '');
     return (domain + path).toLowerCase();
   }
   ```
4. **Filter against existing project entities**
5. **Rank by average relevanceScore across sources**

### PHASE 6: PERSIST (Haiku Agents, Batches of 5-10)

**CRITICAL: Include `domainId` when creating entities.**

```bash
npm run cli -- entity:create '{
  "projectId": "PROJECT_ID",
  "name": "Tool Name",
  "url": "https://example.com",
  "entityType": "tool",
  "description": "Description",
  "domainId": "DOMAIN_ID"
}'
```

Each Haiku agent prompt:

```
DB WRITER AGENT - Batch Persistence

Execute these CLI commands in sequence. Report success/failure for each.

PROJECT_ID: [project_id]
DOMAIN_ID: [domain_id]

ENTITIES TO CREATE:
[List of 5-10 entities]

FOR EACH ENTITY:
1. Run: npm run cli -- entity:create '{"projectId": "PROJECT_ID", "name": "NAME", "url": "URL", "entityType": "TYPE", "description": "DESC", "domainId": "DOMAIN_ID"}'
2. Capture the entityId from response
3. Run: npm run cli -- assertion:create '{"entityId": "ID", "claim": "Discovered via /research-discover from [DOMAIN_NAME] domain", "category": "discovery"}'

Return summary: entities created, any failures.
```

### PHASE 7: UPDATE DOMAIN STATS

After persistence completes:

```bash
npm run cli -- domain:updateStats '{"domainId": "DOMAIN_ID"}'
```

### PHASE 8: GENERATE REPORT

Compile final report:

```markdown
## Discovery Report: [DOMAIN_NAME]

### Summary
- Search Agents Spawned: [N]
- Queries Executed: [N]
- Raw Discoveries: [N]
- After Deduplication: [N]
- New Entities Persisted: [N]

### Domain Configuration Used
- Entity Types: [list]
- Known Leaders Searched: [list]
- Topics Explored: [list]

### Top Discoveries by Relevance
| Name | URL | Score | Confidence |
|------|-----|-------|------------|
| ... | ... | ... | ... |

### Query Performance
| Query | Results Found |
|-------|--------------|
| ... | ... |

### Next Steps
- Run /research-discover [DOMAIN_NAME] again to find more entities
- Use /research to deep-dive on high-priority discoveries
- Update domain with /research-domain update [DOMAIN_NAME] if criteria need adjustment
```

---

## ERROR HANDLING

### No Domain Argument
```
ERROR: Domain argument required.

Usage: /research-discover <domain-name>
Example: /research-discover Agentic-SDLC-Tools

Available domains:
[List domains]
```

### Domain Not Found
```
ERROR: Domain "Invalid-Domain" not found.

Did you mean one of these?
[List similar domain names]

Create this domain: /research-domain create Invalid-Domain
```

### Agent Returns Invalid JSON
1. Try to extract JSON from markdown code blocks
2. If still invalid, log warning and continue with other agents
3. Report partial results

### Agent Timeout
1. Log which query set failed
2. Continue with successful agents
3. Suggest re-running for missed queries

---

## EXAMPLE: Full Discovery Run

```
User: /research-discover GenAI-Observability

Claude: I'll run domain-driven discovery for "GenAI-Observability".

[PHASE 1: Validate domain]
Loading domain configuration...
✓ Domain "GenAI-Observability" found.

[PHASE 2: Load context]
- Description: Tools for monitoring LLM/GenAI applications
- Entity Types: tool, platform
- Known Leaders: LangSmith, Helicone, Weights & Biases
- Topics: LLM monitoring, prompt analytics, cost tracking
- Existing entities in domain: 12

[PHASE 3: Generate search strategy]
Generating search queries from domain configuration...
Created 18 queries in 4 query sets.

[PHASE 4: Launch search agents]
Spawning 4 parallel Sonnet search agents...
[4 Task tool calls in single message]

[Wait for agents to complete]

All agents complete.
- Agent 1: 14 discoveries
- Agent 2: 11 discoveries
- Agent 3: 16 discoveries
- Agent 4: 9 discoveries
- Total raw: 50 discoveries

[PHASE 5: Deduplicate]
After deduplication: 32 unique entities
After filtering existing: 24 new entities

[PHASE 6: Persist]
Spawning 3 Haiku persistence agents...

✓ 24 new entities created with domainId reference

[PHASE 7: Update stats]
Domain entity count updated: 36 total

## Discovery Report: GenAI-Observability

### Summary
- Search Agents: 4 (all succeeded)
- Queries Executed: 18
- Raw Discoveries: 50
- After Deduplication: 32
- New Entities Persisted: 24

### Top Discoveries
| Name | URL | Relevance | Confidence |
|------|-----|-----------|------------|
| Promptlayer | promptlayer.com | 95 | high |
| Literal AI | literalai.com | 92 | high |
| Langfuse | langfuse.com | 90 | high |
...

### Next Steps
- Deep research high-priority discoveries with /research
- Re-run discovery for more entities: /research-discover GenAI-Observability
```

---

## RELATED SKILLS

- `/research-domain create` - Create a domain before discovery
- `/research-domain list` - List available domains
- `/research` - Deep research on discovered entities
- `/research-to-deck` - Generate presentations from research
