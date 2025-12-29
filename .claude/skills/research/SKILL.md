---
name: research
description: Orchestrates deep research workflows when RESEARCH.md files are detected. Use when asked to research a domain, conduct discovery, analyze entities, or generate research deliverables. Manages subagents across Haiku/Sonnet/Opus tiers for intelligent, cost-effective research.
---

# Research Orchestration Skill

Coordinate multi-agent research workflows based on RESEARCH.md specifications. This skill manages the full research lifecycle from Discovery through Deliverable generation.

## When to Use

Invoke this skill when:
- User asks to "research" a domain or topic
- User points to a `RESEARCH.md` file
- User wants to "discover tools" or "analyze platforms"
- User asks for "efficacy analysis" on multiple entities
- User wants to generate research deliverables

## System Architecture Reference

See `docs/RESEARCH-SYSTEM.md` for complete architecture documentation including:
- Agent hierarchy and model assignments
- PostgreSQL schema
- Workflow execution patterns
- Error handling

## Workflow Overview

```
RESEARCH.md detected
       │
       ▼
┌─────────────────┐     ┌─────────────────┐
│ 1. DISCOVERY    │────▶│ 2. ANALYSIS     │
│    (Sonnet)     │     │    (Sonnet)     │
│                 │     │                 │
│ • Web search    │     │ • Deep dive     │
│ • Entity ID     │     │ • Validate      │
│ • Collect claims│     │ • Fed assess    │
└─────────────────┘     └─────────────────┘
                               │
       ┌───────────────────────┘
       ▼
┌─────────────────┐     ┌─────────────────┐
│ 3. SYNTHESIS    │────▶│ 4. DELIVERABLES │
│    (Sonnet)     │     │    (Opus)       │
│                 │     │                 │
│ • Compare       │     │ • Quality review│
│ • Patterns      │     │ • Final docs    │
│ • Recommend     │     │ • One-pagers    │
└─────────────────┘     └─────────────────┘
```

## Phase 1: Discovery

### Objective
Cast a broad net to identify entities matching research criteria.

### Agent Assignment
- **Primary:** Sonnet (reasoning about search strategies, evaluating relevance)
- **Support:** Haiku (DB writes, data extraction)

### Execution

```python
# Spawn Discovery Agent
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt=f"""
    You are a Discovery Agent for research domain: {domain}

    RESEARCH.md specification:
    {research_spec}

    Your objectives:
    1. Execute web searches using these strategies:
       - Vendor documentation: site:*.io OR site:*.ai "[domain]"
       - Analyst reports: "[domain]" Gartner OR Forrester
       - Community: site:github.com OR site:reddit.com "[domain]"

    2. For each entity discovered:
       - Record: name, vendor, URL, category
       - Collect claims EXACTLY as stated (do not validate yet)
       - Score federal relevance (0-10):
         +3: FedRAMP authorized
         +3: Air-gap documented
         +2: Self-hosted option
         +2: Government customers
         +1: SOC 2 Type II
       - Assess fit: Strong/Moderate/Weak

    3. Document ALL sources with URLs

    4. Write outputs to: RESEARCH/{domain}/discovery/session-XXX/

    5. When ready to persist data, provide structured JSON for:
       - entities: [{{name, vendor, category, url, fit_score, federal_score}}]
       - assertions: [{{entity_name, claim_text, source_url}}]
       - sources: [{{url, type, title}}]

    Continue until:
    - Entity target ({entity_target}) reached, OR
    - Search space exhausted

    Focus on BREADTH over depth. Collect everything, validate later.
    """,
    run_in_background=True  # Allow parallel discovery sessions
)
```

### Outputs
- `discovery/session-XXX/search-log.md` - Queries executed
- `discovery/session-XXX/entities-found.md` - Entities identified
- `discovery/catalog.md` - Consolidated entity catalog

### Human Checkpoint
Before proceeding to Analysis, human reviews:
- [ ] Entity fit assessments
- [ ] Federal relevance scores
- [ ] Approves entities for deep analysis

---

## Phase 2: Analysis

### Objective
Deep-dive into approved entities to validate claims and assess federal viability.

### Agent Assignment
- **Primary:** Sonnet (claim validation, technical analysis)
- **Support:** Haiku (DB updates, formatting)

### Execution (Per Entity)

```python
# Spawn Analysis Agent for each approved entity
for entity in approved_entities:
    Task(
        subagent_type="general-purpose",
        model="sonnet",
        prompt=f"""
        You are an Analysis Agent evaluating: {entity['name']}

        Discovery data:
        {entity}

        Claims to validate:
        {entity['claims']}

        Your objectives:
        1. Deep-dive into vendor documentation:
           - Technical docs, API references
           - Architecture guides
           - Compliance pages

        2. For each claim, determine status:
           - EVIDENCE: Found substantiation (provide URL)
           - REFUTED: Found contradicting information
           - UNVERIFIABLE: Cannot confirm or deny

        3. Technical architecture assessment:
           - What's ACTUALLY documented vs. marketing
           - AI/ML claims: proprietary or third-party LLMs?
           - Data flows: what leaves local environment?

        4. Federal assessment:
           - FedRAMP status (check marketplace.fedramp.gov)
           - Self-hosted/air-gap capability
           - Platform One / GovCloud availability
           - CUI/metadata transmission risks
           - Deployment options matrix

        5. Write to: RESEARCH/{domain}/analysis/{entity_name}/

        Provide structured updates:
        - assertion_updates: [{{claim_id, status, evidence_url, notes}}]

        Focus on ACCURACY. Verify everything with sources.
        """,
        run_in_background=True  # Parallel analysis
    )
```

### Outputs
- `analysis/{entity}/raw-research.md` - Research notes
- `analysis/{entity}/claims-validated.json` - Validation results
- `analysis/{entity}/federal-assessment.md` - Federal viability

---

## Phase 3: Synthesis

### Objective
Cross-entity analysis to identify patterns and generate recommendations.

### Agent Assignment
- **Primary:** Sonnet (pattern recognition, comparison)
- **Support:** Haiku (formatting)

### Execution

```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt=f"""
    You are a Synthesis Agent for domain: {domain}

    Analyzed entities:
    {entities_with_analysis}

    Your objectives:
    1. Create comparison matrix:
       | Entity | Federal Ready | Differentiation | ROI | Maturity |
       Compare across standardized dimensions

    2. Identify patterns:
       - Common limitations in this space
       - Market trends
       - Federal landscape gaps
       - Emerging vs. established players

    3. Generate recommendations:
       - PILOT: Entities ready for evaluation
       - MONITOR: Promising but unresolved questions
       - SKIP: Don't pursue (with reasons)

    4. Draft insights for executive summary

    Write to:
    - analysis/comparison-matrix.md
    - analysis/patterns-insights.md
    """
)
```

### Outputs
- `analysis/comparison-matrix.md` - Cross-entity comparison
- `analysis/patterns-insights.md` - Patterns and recommendations

---

## Phase 4: Deliverables

### Objective
Generate final research deliverables using established templates.

### Agent Assignment
- **Primary:** Opus (quality review, final writing)
- **Support:** Haiku (formatting, template application)

### Execution

```python
# For each entity requiring EFFICACY deliverable
for entity in entities_for_efficacy:
    # Step 1: Haiku formats the data
    Task(
        subagent_type="general-purpose",
        model="haiku",
        prompt=f"""
        Format this analysis data into EFFICACY template structure:

        Entity: {entity['name']}
        Analysis data: {entity['analysis']}
        Claims: {entity['claims_with_status']}

        Template: docs/RESEARCH-TEMPLATES/EFFICACY

        Output JSON with sections mapped to template.
        Do not add commentary. Format exactly.
        """
    )

    # Step 2: Opus reviews and enhances
    Task(
        subagent_type="general-purpose",
        model="opus",
        prompt=f"""
        Review and finalize this EFFICACY brief for: {entity['name']}

        Formatted content: {formatted_content}

        Your review checklist:
        - [ ] Executive summary captures critical finding
        - [ ] Marketing vs. reality clearly distinguished
        - [ ] Federal assessment is accurate and complete
        - [ ] Recommendation is unambiguous
        - [ ] Decision framework is actionable
        - [ ] Writing is professional and concise
        - [ ] All metrics attributed (~X% format)

        Enhance where needed. Fix any issues.
        Write final to: deliverables/{entity_name}-EFFICACY/00-EFFICACY-BRIEF.md

        Then generate one-pagers using research-to-deck skill patterns.
        """
    )

# Domain-level executive summary (Opus)
Task(
    subagent_type="general-purpose",
    model="opus",
    prompt=f"""
    Write the executive summary for domain: {domain}

    Synthesis data: {synthesis_data}
    Entity count: {entity_count}
    Recommended for pilot: {pilot_entities}

    Create deliverables/EXECUTIVE-SUMMARY.md with:
    1. Research scope and methodology
    2. Key findings (3-5 bullet points)
    3. Market landscape assessment
    4. Federal readiness summary
    5. Recommendations matrix
    6. Next steps

    Write for executive audience. Be insightful, not just summarizing.
    """
)
```

### Outputs
- `deliverables/{entity}-EFFICACY/00-EFFICACY-BRIEF.md`
- `deliverables/{entity}-EFFICACY/00-one-pager.html`
- `deliverables/{entity}-EFFICACY/01-one-pager.html`
- `deliverables/00-DISCOVERY-CATALOG.md`
- `deliverables/EXECUTIVE-SUMMARY.md`

---

## Data Persistence Pattern

### Writing to PostgreSQL (via Haiku)

When agents need to persist data:

```python
# Agent provides structured data
data_to_persist = {
    "entities": [...],
    "assertions": [...],
    "sources": [...]
}

# Spawn Haiku DB Writer
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt=f"""
    Execute PostgreSQL operations:

    Connection: $RESEARCH_DB_CONNECTION

    Operations:
    1. INSERT entities:
    {json.dumps(data_to_persist['entities'])}

    2. INSERT sources:
    {json.dumps(data_to_persist['sources'])}

    3. INSERT assertions (link to entity_id and source_id):
    {json.dumps(data_to_persist['assertions'])}

    Validate each record against schema before INSERT.
    Return confirmation with generated IDs.
    """
)
```

### Updating Assertion Status

```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt=f"""
    UPDATE assertions in PostgreSQL:

    {json.dumps(assertion_updates)}

    For each update:
    - SET status = [evidence|refuted|unverifiable]
    - SET evidence_url = [URL if evidence]
    - SET evidence_notes = [notes]
    - SET validated_by = 'agent'
    - SET validated_at = NOW()

    Return count of updated records.
    """
)
```

---

## Invoking This Skill

### Option 1: Direct Invocation
```
User: "Research Agentic SDLC tools using the RESEARCH.md in RESEARCH/Agentic-SDLC/"

Claude: [Reads RESEARCH.md, initiates workflow]
```

### Option 2: Create New Research
```
User: "Start a new research project on AI testing tools"

Claude: [Creates RESEARCH/AI-Testing/ with RESEARCH.md template, then begins]
```

### Option 3: Resume Research
```
User: "Continue the Agentic-SDLC research from where we left off"

Claude: [Reads .research/session.json, resumes appropriate phase]
```

---

## State Management

### Session State File (.research/session.json)

```json
{
  "session_id": "uuid",
  "domain": "Agentic-SDLC",
  "status": "analysis",
  "current_phase": 2,
  "phases": {
    "discovery": {
      "status": "complete",
      "sessions": 3,
      "entities_found": 15
    },
    "analysis": {
      "status": "in_progress",
      "approved_entities": ["Harness", "Braintrust", "CoTester"],
      "completed": ["Harness"],
      "in_progress": ["Braintrust"]
    }
  }
}
```

Always update session state after significant actions.

---

## Error Handling

### Agent Failure
- Retry up to 3 times with exponential backoff
- Log failure to agent_activity table
- Notify orchestrator (Opus) to decide: retry, skip, or escalate

### Data Validation Failure
- Haiku validator reports errors
- Do not persist invalid data
- Flag for human review

### Human Escalation Triggers
- Conflicting information
- Entity doesn't fit criteria
- Claim validation contradictory
- Budget exceeded

---

## Cost Management

| Agent | Model | Est. Cost/Call | When to Use |
|-------|-------|----------------|-------------|
| DB Writer | Haiku | ~$0.01-0.05 | Every data persist |
| Formatter | Haiku | ~$0.02-0.10 | Every format operation |
| Validator | Haiku | ~$0.01-0.03 | Every validation |
| Discovery | Sonnet | ~$0.50-2.00 | Per search session |
| Analysis | Sonnet | ~$1.00-3.00 | Per entity deep-dive |
| Synthesis | Sonnet | ~$0.50-1.50 | Once per domain |
| Quality Review | Opus | ~$2.00-5.00 | Per deliverable |
| Executive Write | Opus | ~$3.00-8.00 | Final summaries only |

**Budget Guidance:**
- 10 entities, full workflow: ~$20-35
- Monitor via agent_activity table

---

## Related Files

- `docs/RESEARCH-SYSTEM.md` - Full architecture documentation
- `docs/RESEARCH-TEMPLATES/EFFICACY` - Efficacy brief template
- `docs/RESEARCH-TEMPLATES/DISCOVERY` - Discovery template
- `docs/RESEARCH-TEMPLATES/RESEARCH.md` - RESEARCH.md template
- `.claude/skills/research-to-deck/SKILL.md` - Deck generation skill
