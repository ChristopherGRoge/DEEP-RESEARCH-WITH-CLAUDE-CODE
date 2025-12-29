# Research Orchestration System
## Autonomous Deep Research with Multi-Tier Agent Architecture

**Version:** 1.0
**Purpose:** Enable consistent, repeatable, and intelligent research through orchestrated subagents writing to PostgreSQL and producing templated deliverables.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        HUMAN RESEARCHER                                      │
│                                                                             │
│   Creates: RESEARCH/[domain]/RESEARCH.md                                    │
│   Reviews: Assertions (Claim → Evidence)                                    │
│   Validates: Sources (Proposed → Validated)                                 │
│   Approves: Final Deliverables                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR (Opus)                                      │
│                                                                             │
│   • Reads RESEARCH.md, interprets research goals                            │
│   • Plans research phases and agent assignments                             │
│   • Coordinates subagents and manages state                                 │
│   • Performs final quality review                                           │
│   • Generates human-facing deliverables                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                               │
         ┌──────────┴──────────┐         ┌─────────┴─────────┐
         ▼                     ▼         ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ DISCOVERY AGENT │  │ ANALYSIS AGENT  │  │ SYNTHESIS AGENT │
│    (Sonnet)     │  │    (Sonnet)     │  │    (Sonnet)     │
│                 │  │                 │  │                 │
│ • Web search    │  │ • Deep dive     │  │ • Cross-entity  │
│ • Entity ID     │  │ • Claim valid.  │  │   comparison    │
│ • Initial claims│  │ • Tech review   │  │ • Pattern ID    │
│ • Fed. signals  │  │ • Fed. assess   │  │ • Insights      │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DATA AGENTS (Haiku)                                     │
│                                                                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│   │ DB Writer   │  │ Formatter   │  │ Validator   │  │ Extractor   │       │
│   │             │  │             │  │             │  │             │       │
│   │ • Entity    │  │ • Markdown  │  │ • Schema    │  │ • URL parse │       │
│   │   INSERT    │  │ • HTML      │  │ • Data type │  │ • Metric    │       │
│   │ • Assertion │  │ • JSON      │  │ • Required  │  │   extract   │       │
│   │   INSERT    │  │             │  │   fields    │  │ • Claim     │       │
│   │ • Source    │  │             │  │             │  │   parse     │       │
│   │   INSERT    │  │             │  │             │  │             │       │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PostgreSQL                                            │
│                                                                             │
│   entities │ assertions │ sources │ research_sessions │ deliverables        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

When a human researcher creates a research directory:

```
RESEARCH/
└── Agentic-SDLC/                    # Human creates domain folder
    ├── RESEARCH.md                   # Human creates research specification
    │
    ├── .research/                    # System-managed (auto-created)
    │   ├── session.json              # Current session state
    │   ├── entities.json             # Local entity cache
    │   ├── assertions.json           # Local assertion cache
    │   └── sources.json              # Local source cache
    │
    ├── discovery/                    # Discovery phase outputs
    │   ├── session-001/              # Timestamped sessions
    │   │   ├── search-log.md         # Queries executed
    │   │   ├── entities-found.md     # Entities identified
    │   │   └── raw-claims.json       # Unprocessed claims
    │   └── catalog.md                # Consolidated entity catalog
    │
    ├── analysis/                     # Analysis phase outputs
    │   ├── [Entity-Name]/            # Per-entity deep dives
    │   │   ├── raw-research.md       # Research notes
    │   │   ├── claims-validated.json # Validation results
    │   │   └── federal-assessment.md # Federal viability
    │   └── comparison-matrix.md      # Cross-entity comparison
    │
    └── deliverables/                 # Final outputs
        ├── 00-DISCOVERY-CATALOG.md   # From DISCOVERY template
        ├── [Entity]-EFFICACY/        # Per-entity Efficacy briefs
        │   ├── 00-EFFICACY-BRIEF.md
        │   ├── 00-one-pager.html
        │   └── 01-one-pager.html
        └── EXECUTIVE-SUMMARY.md      # Domain-level summary
```

---

## RESEARCH.md Specification

The `RESEARCH.md` file is the trigger and instruction set for research agents:

```markdown
# Research Specification

## Metadata
- **Domain:** [e.g., "Agentic SDLC Tools"]
- **Created:** [Date]
- **Researcher:** [Human researcher name]
- **Status:** [Draft | Active | Complete | Archived]

## Research Objectives

### Primary Question
[What is the main question this research answers?]

### Secondary Questions
1. [Supporting question 1]
2. [Supporting question 2]

## Scope Definition

### Entity Type
[What kind of entities are we researching? e.g., "AI-powered development tools"]

### Inclusion Criteria
- [Criterion 1]
- [Criterion 2]

### Exclusion Criteria
- [Exclusion 1]
- [Exclusion 2]

### Geographic/Market Scope
[e.g., "Enterprise tools with US market presence"]

## Research Phases

### Phase 1: Discovery
- **Objective:** [e.g., "Identify all relevant tools in the market"]
- **Depth:** [Broad | Focused | Exhaustive]
- **Entity Target:** [N entities minimum, M maximum]
- **Time Budget:** [e.g., "2 sessions"]

### Phase 2: Analysis
- **Objective:** [e.g., "Deep evaluation of top 5 candidates"]
- **Selection Criteria:** [How to choose which entities get deep analysis]
- **Federal Focus:** [Required | Preferred | Not Required]

### Phase 3: Synthesis
- **Deliverables:** [List expected outputs]
- **Comparison Dimensions:** [What to compare across entities]

## Federal Requirements

### Impact Level Target
[IL-2 | IL-4 | IL-5 | IL-6 | Classified | Any]

### Compliance Must-Haves
- [ ] FedRAMP authorization
- [ ] Self-hosted option
- [ ] Air-gap capability
- [ ] FIPS 140-2/140-3
- [ ] Platform One availability

### Compliance Nice-to-Haves
- [ ] SOC 2 Type II
- [ ] GovCloud availability
- [ ] Federal customer references

## Known Entities (Optional)

[Pre-seed with entities the researcher already knows about]

| Entity | Notes | Priority |
|--------|-------|----------|
| [Name] | [Why included] | [High/Medium/Low] |

## Research Constraints

### Budget
- **Time:** [Maximum research hours]
- **Depth vs. Breadth:** [Prioritize comprehensive coverage OR deep analysis]

### Source Preferences
- **Prioritize:** [Vendor docs | Analyst reports | Community discussion]
- **Avoid:** [e.g., "Sources older than 2 years"]

## Agent Instructions

### Discovery Agent Notes
[Special instructions for discovery phase]

### Analysis Agent Notes
[Special instructions for analysis phase]

### Synthesis Agent Notes
[Special instructions for final deliverables]

---

## Session Log

[Agents append session summaries here]

### Session 001 - [Date]
- **Phase:** Discovery
- **Agent:** discovery-agent (Sonnet)
- **Duration:** [X minutes]
- **Entities Found:** [N]
- **Claims Recorded:** [N]
- **Next Steps:** [What to do next]
```

---

## Agent Specifications

### Orchestrator Agent (Opus)

**Model:** `opus`
**Role:** Strategic coordination and quality assurance

**Responsibilities:**
1. Parse RESEARCH.md and create execution plan
2. Spawn and coordinate subagents
3. Monitor progress and adjust strategy
4. Perform final quality review on all deliverables
5. Write human-facing summaries and insights
6. Handle edge cases and ambiguity

**Invocation Pattern:**
```python
Task(
    subagent_type="general-purpose",
    model="opus",
    prompt="""
    You are the Research Orchestrator for domain: {domain}

    Read RESEARCH.md at: {research_md_path}

    Your responsibilities:
    1. Parse the research specification
    2. Plan the research phases
    3. Coordinate subagents (spawn them as needed)
    4. Monitor progress via .research/session.json
    5. Ensure deliverables meet quality standards
    6. Write final human-facing outputs

    Current state: {session_state}

    Proceed with the next appropriate action.
    """
)
```

**Quality Gates (Opus reviews before human handoff):**
- [ ] All entities have minimum required data
- [ ] Claims are properly attributed with sources
- [ ] Federal assessments are complete for priority entities
- [ ] Deliverables follow template structure
- [ ] No contradictions between sections
- [ ] Writing is clear, concise, professional

---

### Discovery Agent (Sonnet)

**Model:** `sonnet`
**Role:** Broad exploration and entity identification

**Responsibilities:**
1. Execute web searches based on research criteria
2. Identify potential entities matching inclusion criteria
3. Collect initial claims (without validation)
4. Score federal relevance signals
5. Recommend entities for deep analysis

**Invocation Pattern:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Discovery Agent researching: {domain}

    Research specification: {research_spec}

    Your task:
    1. Execute broad web searches to find entities matching criteria
    2. For each entity found:
       - Record basic info (name, vendor, URL, category)
       - Collect claims exactly as stated (do not validate)
       - Note federal relevance signals
       - Assess fit (Strong/Moderate/Weak)
    3. Document all sources with URLs
    4. Recommend top entities for Analysis phase

    Output format: Write findings to discovery/session-{session_id}/

    When you identify data to persist, call the DB Writer agent (Haiku)
    to INSERT entities, assertions, and sources to PostgreSQL.

    Focus on breadth over depth. Cast a wide net.
    """
)
```

**Search Strategy:**
- Vendor documentation (highest priority)
- Industry analyst reports
- Conference presentations
- Community discussions
- Competitive comparisons

---

### Analysis Agent (Sonnet)

**Model:** `sonnet`
**Role:** Deep investigation and claim validation

**Responsibilities:**
1. Deep-dive into specific entity
2. Validate or refute claims from Discovery
3. Assess technical architecture vs. marketing
4. Evaluate federal deployment viability
5. Calculate federal relevance score with evidence

**Invocation Pattern:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are an Analysis Agent evaluating: {entity_name}

    Discovery data: {discovery_data}
    Initial claims: {claims_to_validate}

    Your task:
    1. Deep-dive into vendor documentation
    2. For each claim:
       - Search for evidence (peer review, benchmarks, case studies)
       - Mark as Validated, Refuted, or Unverifiable
       - Document evidence source
    3. Assess technical architecture:
       - What's actually documented vs. marketing
       - AI/ML claims substantiation
       - Data flow and cloud dependencies
    4. Federal assessment:
       - FedRAMP status (check marketplace.fedramp.gov)
       - Air-gap capability
       - Deployment options
       - CUI/metadata transmission risks
    5. Competitive positioning

    Output: Write to analysis/{entity_name}/

    Call DB Writer (Haiku) to UPDATE assertion statuses
    from 'Claim' to 'Evidence' or 'Refuted' with evidence_url.

    Focus on depth and accuracy. Verify everything.
    """
)
```

---

### Synthesis Agent (Sonnet)

**Model:** `sonnet`
**Role:** Cross-entity analysis and pattern identification

**Responsibilities:**
1. Compare entities across dimensions
2. Identify market patterns and trends
3. Create comparison matrices
4. Generate insights and recommendations
5. Draft executive summaries

**Invocation Pattern:**
```python
Task(
    subagent_type="general-purpose",
    model="sonnet",
    prompt="""
    You are a Synthesis Agent for domain: {domain}

    Entities analyzed: {entities_list}
    Analysis data: {analysis_summaries}

    Your task:
    1. Create comparison matrix across dimensions:
       - Federal readiness
       - Technical differentiation
       - ROI potential
       - Market maturity
    2. Identify patterns:
       - Common limitations in this space
       - Market trends
       - Federal landscape gaps
    3. Generate recommendations:
       - Which entities to pilot
       - Which to monitor
       - Which to skip
    4. Draft executive summary of findings

    Output: Write to analysis/comparison-matrix.md
            Draft deliverables/EXECUTIVE-SUMMARY.md

    Focus on insights that help decision-making.
    """
)
```

---

### Data Agents (Haiku)

**Model:** `haiku`
**Role:** Deterministic data operations

These agents handle structured, repeatable tasks with minimal reasoning required.

#### DB Writer Agent

```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Database Writer Agent.

    Execute the following PostgreSQL operations:

    {operations}

    Connection: {db_connection_string}

    For each operation:
    1. Validate data against schema
    2. Execute INSERT/UPDATE
    3. Return confirmation with IDs

    Schema reference:
    - entities: id, name, vendor, category, url, fit_score, federal_score, status
    - assertions: id, entity_id, claim_text, source_id, status, evidence_url
    - sources: id, url, type, access_date, status

    Do not make judgments. Execute exactly as specified.
    """
)
```

#### Formatter Agent

```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Formatter Agent.

    Input: {raw_content}
    Template: {template_name}
    Output format: {format}

    Your task:
    1. Parse the input content
    2. Map to template sections
    3. Apply formatting rules
    4. Output in specified format (MD/HTML/JSON)

    Formatting rules:
    - Metrics use ~X% format
    - Bold critical constraints
    - Use specified color codes for HTML

    Do not add commentary. Format exactly as specified.
    """
)
```

#### Validator Agent

```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are a Validator Agent.

    Data to validate: {data}
    Schema: {schema}

    Check:
    1. Required fields present
    2. Data types correct
    3. Values within allowed ranges
    4. URLs are well-formed
    5. Dates are valid

    Return:
    - valid: true/false
    - errors: [list of validation errors]
    - warnings: [list of potential issues]

    Do not fix data. Only report validity.
    """
)
```

#### Extractor Agent

```python
Task(
    subagent_type="general-purpose",
    model="haiku",
    prompt="""
    You are an Extractor Agent.

    Source content: {content}
    Extraction type: {type}

    Extract:
    - metrics: Numbers with ~X% format
    - claims: Direct quotes with attribution
    - urls: All URLs found
    - entities: Named tools/platforms
    - dates: Temporal references

    Return structured JSON with extracted data.

    Extract literally. Do not interpret or summarize.
    """
)
```

---

## PostgreSQL Schema

```sql
-- Research sessions
CREATE TABLE research_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) NOT NULL,
    research_md_path TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    metadata JSONB
);

-- Entities (tools, platforms, products)
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES research_sessions(id),
    name VARCHAR(255) NOT NULL,
    vendor VARCHAR(255),
    category VARCHAR(255),
    url TEXT,
    fit_score VARCHAR(20), -- Strong, Moderate, Weak
    federal_score INTEGER, -- 0-10
    status VARCHAR(50) DEFAULT 'discovered',
    -- discovered, analyzing, analyzed, recommended, excluded
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB,
    UNIQUE(session_id, name)
);

-- Assertions (claims about entities)
CREATE TABLE assertions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID REFERENCES entities(id),
    claim_text TEXT NOT NULL,
    claim_category VARCHAR(100),
    -- performance, scale, compliance, technical, customer, comparison
    source_id UUID REFERENCES sources(id),
    status VARCHAR(50) DEFAULT 'claim',
    -- claim, evidence (validated), refuted, superseded
    evidence_url TEXT,
    evidence_notes TEXT,
    validated_by VARCHAR(100), -- 'agent' or 'human'
    validated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);

-- Sources
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES research_sessions(id),
    url TEXT NOT NULL,
    source_type VARCHAR(50),
    -- vendor, analyst, community, news, documentation
    title VARCHAR(500),
    access_date DATE,
    status VARCHAR(50) DEFAULT 'proposed',
    -- proposed, validated, invalid, outdated
    validated_by VARCHAR(100),
    validated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB,
    UNIQUE(session_id, url)
);

-- Deliverables tracking
CREATE TABLE deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES research_sessions(id),
    entity_id UUID REFERENCES entities(id), -- NULL for domain-level deliverables
    template_type VARCHAR(100), -- EFFICACY, DISCOVERY, ONE_PAGER, EXECUTIVE_SUMMARY
    file_path TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    -- draft, review, approved, published
    generated_by VARCHAR(100), -- agent model used
    generated_at TIMESTAMP DEFAULT NOW(),
    approved_by VARCHAR(100),
    approved_at TIMESTAMP,
    metadata JSONB
);

-- Agent activity log
CREATE TABLE agent_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES research_sessions(id),
    agent_type VARCHAR(100), -- orchestrator, discovery, analysis, synthesis, db_writer, etc.
    model VARCHAR(50), -- opus, sonnet, haiku
    action VARCHAR(255),
    input_summary TEXT,
    output_summary TEXT,
    duration_ms INTEGER,
    tokens_used INTEGER,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    status VARCHAR(50), -- running, completed, failed
    error_message TEXT,
    metadata JSONB
);

-- Indexes for common queries
CREATE INDEX idx_entities_session ON entities(session_id);
CREATE INDEX idx_entities_status ON entities(status);
CREATE INDEX idx_assertions_entity ON assertions(entity_id);
CREATE INDEX idx_assertions_status ON assertions(status);
CREATE INDEX idx_sources_session ON sources(session_id);
CREATE INDEX idx_sources_status ON sources(status);
CREATE INDEX idx_activity_session ON agent_activity(session_id);
```

---

## Workflow Execution

### Trigger: Human Creates RESEARCH.md

```
RESEARCH/NewDomain/RESEARCH.md created
         │
         ▼
┌─────────────────────────────────────────┐
│ Orchestrator (Opus) activated           │
│                                         │
│ 1. Parse RESEARCH.md                    │
│ 2. Create session in PostgreSQL         │
│ 3. Initialize .research/ directory      │
│ 4. Plan research phases                 │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phase 1: Discovery                      │
│                                         │
│ Orchestrator spawns Discovery Agent     │
│ (Sonnet) with search parameters         │
│                                         │
│ Discovery Agent:                        │
│ • Executes web searches                 │
│ • Identifies entities                   │
│ • Collects claims                       │
│ • Spawns DB Writer (Haiku) to persist   │
│                                         │
│ Loop until:                             │
│ • Entity target reached, OR             │
│ • Time budget exhausted, OR             │
│ • Search space exhausted                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Human Checkpoint: Discovery Review      │
│                                         │
│ Researcher reviews:                     │
│ • discovery/catalog.md                  │
│ • Entity fit assessments                │
│ • Federal relevance scores              │
│                                         │
│ Researcher actions:                     │
│ • Approve entities for Analysis         │
│ • Add/remove entities                   │
│ • Adjust research parameters            │
│ • Validate key sources                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phase 2: Analysis                       │
│                                         │
│ Orchestrator spawns Analysis Agent      │
│ (Sonnet) for each approved entity       │
│                                         │
│ Analysis Agent (per entity):            │
│ • Deep-dives vendor docs                │
│ • Validates/refutes claims              │
│ • Assesses technical architecture       │
│ • Evaluates federal viability           │
│ • Spawns DB Writer to update statuses   │
│                                         │
│ Parallel execution when possible        │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phase 3: Synthesis                      │
│                                         │
│ Orchestrator spawns Synthesis Agent     │
│ (Sonnet) with all analysis data         │
│                                         │
│ Synthesis Agent:                        │
│ • Creates comparison matrix             │
│ • Identifies patterns                   │
│ • Generates recommendations             │
│ • Drafts executive summary              │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Phase 4: Deliverable Generation         │
│                                         │
│ Orchestrator coordinates:               │
│                                         │
│ For each entity:                        │
│ • Formatter (Haiku) applies EFFICACY    │
│   template to analysis data             │
│ • Formatter (Haiku) generates one-pagers│
│ • Opus reviews for quality              │
│                                         │
│ For domain:                             │
│ • Formatter (Haiku) applies DISCOVERY   │
│   template to catalog                   │
│ • Opus writes executive summary         │
│ • Opus performs final review            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Human Checkpoint: Final Review          │
│                                         │
│ Researcher reviews:                     │
│ • All deliverables                      │
│ • Assertion statuses (Claim → Evidence) │
│ • Source validations                    │
│                                         │
│ Researcher actions:                     │
│ • Approve deliverables                  │
│ • Request revisions                     │
│ • Validate remaining Claims → Evidence  │
│ • Mark session complete                 │
└─────────────────────────────────────────┘
```

---

## Model Selection Rationale

| Task Type | Model | Rationale |
|-----------|-------|-----------|
| **Strategic Planning** | Opus | Requires understanding nuance, handling ambiguity, making judgment calls |
| **Quality Review** | Opus | Needs to assess writing quality, identify gaps, ensure coherence |
| **Human-Facing Writing** | Opus | Final deliverables need polish, insight, professional tone |
| **Web Research** | Sonnet | Requires reasoning about search strategies, evaluating relevance |
| **Claim Validation** | Sonnet | Needs to assess evidence quality, identify contradictions |
| **Technical Analysis** | Sonnet | Must understand architecture, identify marketing vs. reality |
| **Synthesis** | Sonnet | Requires pattern recognition, cross-entity reasoning |
| **Database Writes** | Haiku | Deterministic: validate schema, execute INSERT/UPDATE |
| **Formatting** | Haiku | Deterministic: apply template, transform data |
| **Extraction** | Haiku | Deterministic: parse content, extract structured data |
| **Validation** | Haiku | Deterministic: check schema compliance, report errors |

**Cost Optimization:**
- Haiku: ~$0.25/M input, ~$1.25/M output (use for high-volume deterministic tasks)
- Sonnet: ~$3/M input, ~$15/M output (use for reasoning tasks)
- Opus: ~$15/M input, ~$75/M output (use sparingly for highest-value tasks)

**Estimated Session Cost (10 entities, full workflow):**
- Discovery: 2-3 Sonnet calls + 20-30 Haiku calls ≈ $2-5
- Analysis: 10 Sonnet calls + 50 Haiku calls ≈ $10-15
- Synthesis: 2-3 Sonnet calls + 10 Haiku calls ≈ $2-3
- Deliverables: 1-2 Opus calls + 30 Haiku calls ≈ $5-10
- **Total: ~$20-35 per domain research session**

---

## State Management

### Session State (.research/session.json)

```json
{
  "session_id": "uuid",
  "domain": "Agentic-SDLC",
  "status": "discovery",
  "created_at": "2025-01-15T10:00:00Z",
  "phases": {
    "discovery": {
      "status": "in_progress",
      "started_at": "2025-01-15T10:00:00Z",
      "sessions_completed": 2,
      "entities_found": 15,
      "claims_recorded": 87
    },
    "analysis": {
      "status": "pending",
      "entities_approved": [],
      "entities_completed": []
    },
    "synthesis": {
      "status": "pending"
    },
    "deliverables": {
      "status": "pending"
    }
  },
  "checkpoints": [
    {
      "type": "discovery_review",
      "status": "pending",
      "required_before": "analysis"
    }
  ],
  "agent_activity": [
    {
      "timestamp": "2025-01-15T10:05:00Z",
      "agent": "discovery",
      "action": "web_search",
      "summary": "Searched 'AI SDLC tools', found 8 entities"
    }
  ]
}
```

### Entity Cache (.research/entities.json)

```json
{
  "entities": [
    {
      "id": "uuid",
      "name": "Harness",
      "vendor": "Harness Inc.",
      "category": "CI/CD Platform",
      "url": "https://harness.io",
      "fit_score": "Strong",
      "federal_score": 7,
      "status": "analyzing",
      "claims_count": 12,
      "evidence_count": 8
    }
  ],
  "last_sync": "2025-01-15T10:30:00Z"
}
```

---

## Error Handling

### Agent Failures

```python
# Retry with exponential backoff
MAX_RETRIES = 3
BACKOFF_BASE = 2  # seconds

for attempt in range(MAX_RETRIES):
    try:
        result = await agent.execute(task)
        break
    except AgentError as e:
        if attempt == MAX_RETRIES - 1:
            # Log failure, notify orchestrator
            await log_failure(agent, task, e)
            # Orchestrator decides: retry, skip, or escalate
        else:
            await sleep(BACKOFF_BASE ** attempt)
```

### Data Consistency

```python
# Transaction wrapper for multi-step DB operations
async def persist_entity_with_claims(entity, claims, sources):
    async with db.transaction():
        entity_id = await insert_entity(entity)
        source_ids = await insert_sources(sources)
        await insert_claims(claims, entity_id, source_ids)
    # Rollback on any failure
```

### Human Escalation Triggers

Orchestrator escalates to human when:
- Conflicting information that can't be resolved
- Entity doesn't clearly fit inclusion/exclusion criteria
- Federal assessment requires domain expertise
- Claim validation yields contradictory evidence
- Session exceeds time/cost budget

---

## Security Considerations

### Data Handling
- PII should not be collected or stored
- API keys/credentials never logged
- Source URLs validated before fetch
- Rate limiting on external requests

### Database Access
- Connection strings via environment variables
- Role-based access (agents have write access to specific tables)
- Audit logging for all writes
- Regular backups

### Agent Isolation
- Each agent session is isolated
- No cross-session data access without explicit permission
- Sensitive data (credentials, internal URLs) excluded from agent prompts

---

## Next Steps for Implementation

1. **Create research skill** that triggers on RESEARCH.md detection
2. **Set up PostgreSQL** with schema from this document
3. **Build agent prompts** for each agent type
4. **Create test domain** (e.g., RESEARCH/Test-Domain/)
5. **Iterate** based on execution experience

---

*Document Version: 1.0*
*Last Updated: January 2025*
