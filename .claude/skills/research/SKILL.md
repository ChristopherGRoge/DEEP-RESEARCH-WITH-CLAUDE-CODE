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

        CRITICAL: Follow Evidence-First Research Protocol for all claims.
        Screenshots are PRIMARY evidence, URLs are secondary references.

        1. Extract structured data using CLI:
           npm run cli -- extract:fetch '{{...}}'  # Fetch page + screenshot
           npm run cli -- extract:save '{{...}}'   # Save extraction

        2. For EVERY assertion, follow Evidence-First workflow:
           a. FIRST: Capture screenshot with extract:fetch
           b. SECOND: Visually analyze the screenshot
           c. THIRD: Record assertion WITH evidence fields:
              npm run cli -- assertion:create '{{
                "entityId": "...",
                "claim": "...",
                "category": "...",
                "evidenceDescription": "On screenshot at [path], [specific text/element] shows [quote]",
                "evidenceScreenshotPath": "[screenshot path from extract:fetch]",
                "sourceUrl": "..."
              }}'

        3. Fetch logo (SVG preferred):
           npm run cli -- logo:fetch '{{"entityId": "..."}}'

        4. Validate claims WITH evidence:
           - EVIDENCE: Screenshot shows substantiation (include evidenceDescription)
           - REFUTED: Screenshot contradicts claim
           - UNVERIFIABLE: Cannot find visual confirmation

        5. Federal assessment (each claim needs evidence):
           - Check FedRAMP marketplace (screenshot the search results)
           - Document data flows (screenshot architecture diagrams)
           - Identify deployment options (screenshot deployment page)

        6. Write to: {context['output_dir']}/analysis/{entity['name']}/

        CRITICAL: Every assertion MUST have evidenceDescription + evidenceScreenshotPath.
        Source URLs alone are NOT sufficient evidence.
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
Generate final research deliverables using established templates. **This phase MUST produce a PowerPoint deck summarizing the research.**

### Agent Assignment
- **Primary:** Opus (quality review, final writing)
- **Support:** Haiku (formatting, template application)

### Required Deliverables

Every completed research phase MUST include:

| Deliverable | Format | Template |
|-------------|--------|----------|
| Research Deck | PPTX | `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md` |
| Comparison Matrix | MD + HTML | Phase-specific |
| EFFICACY Briefs | MD + HTML | `docs/RESEARCH-TEMPLATES/EFFICACY` |
| One-Pagers | HTML | `docs/template/` |

### Deck Generation (REQUIRED)

```python
# Generate research deck using python-pptx
# Template spec: docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md

Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt=f"""
    Generate PowerPoint deck for: {context['domain']} / {context['phase_name']}

    ═══════════════════════════════════════════════════════════════
    DECK TEMPLATE SPECIFICATION
    ═══════════════════════════════════════════════════════════════
    Follow the template at: docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md

    ═══════════════════════════════════════════════════════════════
    RESEARCH DATA
    ═══════════════════════════════════════════════════════════════
    - Comparison Matrix: {context['output_dir']}/Deliverables/00-COMPARISON-MATRIX.md
    - EFFICACY Briefs: {context['output_dir']}/Deliverables/*/00-EFFICACY-BRIEF.md
    - Session Log: {context['output_dir']}/RESEARCH.md (Session Log section)

    ═══════════════════════════════════════════════════════════════
    REQUIRED SLIDE STRUCTURE
    ═══════════════════════════════════════════════════════════════
    1. Title Slide - Phase name, domain, date
    2. Executive Summary - Entity count, paths, top recommendations
    3. Framework/Context - Deployment paths, evaluation criteria
    4. Comparison Tables - Federal viability, architecture
    5. Top Recommendations - 4-6 entity highlight slides
    6. Decision Matrix - When to choose each tool
    7. Next Steps - Actionable recommendations
    8. Summary - Key takeaways

    ═══════════════════════════════════════════════════════════════
    IMPLEMENTATION
    ═══════════════════════════════════════════════════════════════
    Create a Python script using python-pptx:
    - Use standard color scheme from template
    - Include purple header bars on content slides
    - Score badges: green (≥8.5), amber (<8.5), red (<7)
    - Tables with alternating row colors
    - Entity slides with feature checkmarks

    Save script to: {context['output_dir']}/Deliverables/generate_deck.py
    Run script to generate: {context['output_dir']}/Deliverables/00-{phase_name}-RESEARCH.pptx

    CRITICAL: This deck is a REQUIRED deliverable. Do not mark research as complete without it.
    """
)
```

### EFFICACY Brief Generation

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
- `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md` - **REQUIRED** deck template specification
- `.claude/skills/research-to-deck/SKILL.md` - Deck generation skill

---

## Research Completion Checklist

Before marking a research phase as complete, verify:

- [ ] Session log updated in RESEARCH.md
- [ ] Comparison matrix generated (MD + HTML)
- [ ] EFFICACY briefs for top entities
- [ ] One-pagers (HTML) for top entities
- [ ] **Research deck (PPTX) generated and validated**
- [ ] Logos fetched for all entities
- [ ] Database updated with all assertions

**CRITICAL: The research deck is a REQUIRED deliverable.** Do not mark research as complete without generating the PPTX presentation following `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md`.
