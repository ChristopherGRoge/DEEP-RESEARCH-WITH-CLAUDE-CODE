---
name: research
description: Orchestrates deep research workflows using hierarchical VISION.md + RESEARCH.md specifications. Use when asked to research a domain, conduct discovery, analyze entities, or generate research deliverables. Manages subagents across Haiku/Sonnet/Opus tiers for intelligent, cost-effective research.
---

# Research Orchestration Skill

Coordinate multi-agent research workflows based on hierarchical research specifications. This skill manages the full research lifecycle from Discovery through Deliverable generation.

## When to Use

Invoke this skill when:
- User asks to "research" a domain or topic
- User points to a `RESEARCH.md` file or phase directory
- User wants to "discover tools" or "analyze platforms"
- User asks for "efficacy analysis" on multiple entities
- User wants to generate research deliverables

## Hierarchical Research Structure

Research specifications follow a parent-child hierarchy:

```
RESEARCH/[domain]/
├── VISION.md              ← Shared objectives, criteria, scoring
├── [phase-1]/
│   └── RESEARCH.md        ← Phase-specific scope
├── [phase-2]/
│   └── RESEARCH.md
└── ...
```

### Context Inheritance

When researching a phase:

1. **Read VISION.md first** - Get shared evaluation criteria, federal requirements, scoring
2. **Read phase RESEARCH.md** - Get phase-specific scope, categories, entities
3. **Merge contexts** - Phase inherits VISION, can override specific values
4. **Execute research** - Use combined context for all phases

### Example: Agentic SDLC

```
RESEARCH/Agentic-SDLC/
├── VISION.md              ← Federal requirements, ROI criteria, differentiation
├── Requirements/
│   └── RESEARCH.md        ← Requirements gathering tools
├── Design-Build/
│   └── RESEARCH.md        ← Code generation, IDE assistants
├── Quality-Engineering/
│   └── RESEARCH.md        ← Testing, QA automation tools
└── ...
```

---

## Workflow Overview

```
VISION.md + RESEARCH.md
         │
         ▼
   ┌─────────────┐
   │  CONTEXT    │  ← Merge parent + phase specs
   │  ASSEMBLY   │
   └─────────────┘
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

---

## Context Assembly

Before any research phase, assemble the full context:

```python
def assemble_research_context(phase_path: str) -> dict:
    """
    Assemble research context from VISION.md + phase RESEARCH.md

    Args:
        phase_path: Path to phase directory (e.g., "RESEARCH/Agentic-SDLC/Design-Build")

    Returns:
        Merged context with all criteria and scope
    """
    # Find parent VISION.md
    parent_dir = os.path.dirname(phase_path)
    vision_path = os.path.join(parent_dir, "VISION.md")
    research_path = os.path.join(phase_path, "RESEARCH.md")

    context = {
        "vision": read_file(vision_path) if exists(vision_path) else None,
        "research": read_file(research_path),
        "phase_name": os.path.basename(phase_path),
        "domain": os.path.basename(parent_dir),
        "output_dir": phase_path,
    }

    # Extract structured data
    context["federal_requirements"] = parse_federal_requirements(context["vision"])
    context["evaluation_criteria"] = parse_evaluation_criteria(context["vision"])
    context["phase_scope"] = parse_phase_scope(context["research"])
    context["known_entities"] = parse_known_entities(context["research"])

    return context
```

---

## Phase 1: Discovery

### Objective
Cast a broad net to identify entities matching research criteria.

### Agent Assignment
- **Primary:** Sonnet (reasoning about search strategies, evaluating relevance)
- **Support:** Haiku (DB writes, data extraction)

### Execution

```python
# Spawn Discovery Agent with merged context
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt=f"""
    You are a Discovery Agent for: {context['domain']} / {context['phase_name']}

    ═══════════════════════════════════════════════════════════════
    VISION (Inherited Criteria)
    ═══════════════════════════════════════════════════════════════
    {context['vision']}

    ═══════════════════════════════════════════════════════════════
    PHASE SCOPE
    ═══════════════════════════════════════════════════════════════
    {context['research']}

    ═══════════════════════════════════════════════════════════════
    YOUR OBJECTIVES
    ═══════════════════════════════════════════════════════════════

    1. Execute web searches using strategies from RESEARCH.md

    2. For each entity discovered:
       - Record: name, vendor, URL, category
       - Collect claims EXACTLY as stated (do not validate yet)
       - Score federal readiness using VISION.md criteria (0-10)
       - Score differentiation using VISION.md criteria (0-10)
       - Assess fit: Strong/Moderate/Weak

    3. Document ALL sources with URLs

    4. Write outputs to: {context['output_dir']}/discovery/

    5. Persist to database:
       npm run cli -- entity:create '{{...}}'
       npm run cli -- assertion:create '{{...}}'

    Continue until entity target reached or search space exhausted.
    Focus on BREADTH over depth. Collect everything, validate later.
    """,
    run_in_background=True
)
```

### Outputs
- `{phase}/discovery/search-log.md` - Queries executed
- `{phase}/discovery/entities-found.md` - Entities identified
- Database: entities, assertions, sources

### Human Checkpoint
Before proceeding to Analysis:
- [ ] Review entity fit assessments
- [ ] Verify federal scores
- [ ] Approve entities for deep analysis

---

## Phase 2: Analysis

### Objective
Deep-dive into approved entities to validate claims and assess federal viability.

### Agent Assignment
- **Primary:** Sonnet (claim validation, technical analysis)
- **Support:** Haiku (DB updates, formatting)

### Execution (Per Entity)

```python
for entity in approved_entities:
    Task(
        subagent_type="general-purpose",
        model="sonnet",
        prompt=f"""
        You are an Analysis Agent evaluating: {entity['name']}

        ═══════════════════════════════════════════════════════════════
        EVALUATION CRITERIA (from VISION.md)
        ═══════════════════════════════════════════════════════════════
        {context['evaluation_criteria']}

        ═══════════════════════════════════════════════════════════════
        FEDERAL REQUIREMENTS (from VISION.md)
        ═══════════════════════════════════════════════════════════════
        {context['federal_requirements']}

        ═══════════════════════════════════════════════════════════════
        ENTITY DATA
        ═══════════════════════════════════════════════════════════════
        {entity}

        ═══════════════════════════════════════════════════════════════
        YOUR OBJECTIVES
        ═══════════════════════════════════════════════════════════════

        1. Extract structured data using CLI:
           npm run cli -- extract:fetch '{{...}}'  # Fetch page content
           npm run cli -- extract:save '{{...}}'   # Save extraction

        2. For pricing, features, compliance, integrations:
           - Read screenshots and extract data
           - Save with appropriate schemaType

        3. Fetch logo (SVG preferred):
           npm run cli -- logo:fetch '{{"entityId": "..."}}'

        4. Validate claims:
           - EVIDENCE: Found substantiation
           - REFUTED: Found contradicting info
           - UNVERIFIABLE: Cannot confirm

        5. Federal assessment:
           - Check FedRAMP marketplace
           - Document data flows
           - Identify deployment options

        6. Write to: {context['output_dir']}/analysis/{entity['name']}/

        Focus on ACCURACY. Verify everything with sources.
        """
    )
```

### Outputs
- `{phase}/analysis/{entity}/research-notes.md`
- `{phase}/analysis/{entity}/federal-assessment.md`
- Database: extractions, validated assertions

---

## Phase 3: Synthesis

### Objective
Cross-entity analysis to identify patterns and generate recommendations.

### Agent Assignment
- **Primary:** Sonnet (pattern recognition, comparison)

### Execution

```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt=f"""
    You are a Synthesis Agent for: {context['domain']} / {context['phase_name']}

    ═══════════════════════════════════════════════════════════════
    EVALUATION CRITERIA
    ═══════════════════════════════════════════════════════════════
    {context['evaluation_criteria']}

    ═══════════════════════════════════════════════════════════════
    ANALYZED ENTITIES
    ═══════════════════════════════════════════════════════════════
    {entities_with_analysis}

    ═══════════════════════════════════════════════════════════════
    YOUR OBJECTIVES
    ═══════════════════════════════════════════════════════════════

    1. Query database for cross-entity comparison:
       npm run cli -- query:compare '{{...}}'
       npm run cli -- query:compliance '{{...}}'
       npm run cli -- query:pricing '{{...}}'

    2. Create comparison matrix on dimensions from VISION.md

    3. Identify patterns:
       - Common limitations
       - Market trends
       - Federal landscape gaps

    4. Generate recommendations:
       - PILOT: Ready for evaluation
       - MONITOR: Promising but questions remain
       - SKIP: Don't pursue (with reasons)

    5. Apply ROI assessment from VISION.md:
       - Build vs. Buy vs. Hybrid vs. Monitor

    Write to:
    - {context['output_dir']}/synthesis/comparison-matrix.md
    - {context['output_dir']}/synthesis/recommendations.md
    """
)
```

---

## Phase 4: Deliverables

### Objective
Generate final research deliverables using established templates.

### Agent Assignment
- **Primary:** Opus (quality review, final writing)
- **Support:** Haiku (formatting, template application)

### Execution

```python
for entity in entities_for_efficacy:
    # Generate EFFICACY brief
    Task(
        subagent_type="general-purpose",
        model="opus",
        prompt=f"""
        Generate EFFICACY brief for: {entity['name']}

        Template: docs/RESEARCH-TEMPLATES/EFFICACY
        Analysis data: {entity['analysis']}
        Federal assessment: {entity['federal']}

        Ensure:
        - Executive summary captures critical finding
        - Marketing vs. reality clearly distinguished
        - Federal assessment uses VISION.md scoring
        - Recommendation is unambiguous

        Get inline SVG logo:
        npm run cli -- logo:inline '{{"entityId": "..."}}'

        Write to: {context['output_dir']}/deliverables/{entity['name']}-EFFICACY/
        """
    )
```

---

## Database Integration

### CLI Commands for Research

```bash
# Project management
npm run cli -- project:find '{"name": "..."}'
npm run cli -- research:gaps '{"projectId": "..."}'

# Entity operations
npm run cli -- entity:create '{"projectId": "...", "name": "...", ...}'
npm run cli -- entity:get '{"entityId": "..."}'

# Structured extraction
npm run cli -- extract:fetch '{"url": "...", "entityId": "..."}'
npm run cli -- extract:save '{"entityId": "...", "schemaType": "pricing", ...}'

# Logo (SVG preferred)
npm run cli -- logo:fetch '{"entityId": "..."}'
npm run cli -- logo:inline '{"entityId": "..."}'

# Cross-entity queries
npm run cli -- query:compare '{"entityIds": [...], "schemaType": "..."}'
npm run cli -- query:compliance '{"projectId": "...", "soc2": true}'

# Change tracking
npm run cli -- diff:latest '{"entityId": "...", "schemaType": "pricing"}'
```

---

## Invoking Research

### Single Phase
```
User: "Research Design-Build tools using RESEARCH/Agentic-SDLC/Design-Build/RESEARCH.md"

Claude:
1. Reads RESEARCH/Agentic-SDLC/VISION.md (parent context)
2. Reads RESEARCH/Agentic-SDLC/Design-Build/RESEARCH.md (phase scope)
3. Merges contexts
4. Begins Discovery phase
```

### All Phases
```
User: "Research all SDLC phases under RESEARCH/Agentic-SDLC/"

Claude:
1. Reads VISION.md once
2. For each phase directory with RESEARCH.md:
   - Merges with VISION.md
   - Executes full workflow
3. Creates cross-phase synthesis
```

### Resume
```
User: "Continue the Quality-Engineering research"

Claude:
1. Reads session state from phase directory
2. Resumes at last checkpoint
```

---

## Cost Management

| Agent | Model | Est. Cost/Call | When to Use |
|-------|-------|----------------|-------------|
| DB Writer | Haiku | ~$0.01-0.05 | Every data persist |
| Formatter | Haiku | ~$0.02-0.10 | Every format operation |
| Discovery | Sonnet | ~$0.50-2.00 | Per search session |
| Analysis | Sonnet | ~$1.00-3.00 | Per entity deep-dive |
| Synthesis | Sonnet | ~$0.50-1.50 | Once per phase |
| Quality Review | Opus | ~$2.00-5.00 | Per deliverable |

**Budget Guidance:**
- 10 entities, full workflow: ~$20-35 per phase

---

## Related Files

- `docs/RESEARCH-SYSTEM.md` - Full architecture documentation
- `docs/RESEARCH-TEMPLATES/EFFICACY` - Efficacy brief template
- `docs/RESEARCH-TEMPLATES/PHASE-RESEARCH.md` - Phase RESEARCH.md template
- `.claude/skills/research-to-deck/SKILL.md` - Deck generation skill
