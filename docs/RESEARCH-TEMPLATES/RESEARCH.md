# Research Specification Template

Copy this file to `RESEARCH/[your-domain]/RESEARCH.md` to initiate a research project.

---

# Research Specification

## Metadata

| Field | Value |
|-------|-------|
| **Domain** | [e.g., "Agentic SDLC Tools", "AI Observability Platforms"] |
| **Created** | [YYYY-MM-DD] |
| **Researcher** | [Your name] |
| **Status** | Draft |

**Status Values:** `Draft` → `Active` → `Review` → `Complete` → `Archived`

---

## Research Objectives

### Primary Question
> [What is the main question this research answers?]
>
> Example: "What AI-powered development tools are viable for federal environments requiring IL-4+ compliance?"

### Secondary Questions
1. [Supporting question 1]
2. [Supporting question 2]
3. [Supporting question 3]

---

## Scope Definition

### Entity Type
[What kind of entities are we researching?]

Example: "AI-powered software development tools that assist with code generation, testing, deployment, or operations"

### Inclusion Criteria
- [ ] [Criterion 1: e.g., "Uses AI/ML for core functionality"]
- [ ] [Criterion 2: e.g., "Targets enterprise development workflows"]
- [ ] [Criterion 3: e.g., "Has documented pricing or enterprise offering"]
- [ ] [Criterion 4: e.g., "Active development in past 12 months"]

### Exclusion Criteria
- [ ] [Exclusion 1: e.g., "Pure open-source with no commercial support"]
- [ ] [Exclusion 2: e.g., "Consumer-only products"]
- [ ] [Exclusion 3: e.g., "Deprecated or discontinued tools"]

### Geographic/Market Scope
[e.g., "Enterprise tools with US market presence and English documentation"]

---

## Research Phases

### Phase 1: Discovery
| Parameter | Value |
|-----------|-------|
| **Objective** | [e.g., "Identify all relevant tools in the market"] |
| **Depth** | [Broad / Focused / Exhaustive] |
| **Entity Target** | [Minimum N, Maximum M entities] |
| **Session Budget** | [N sessions / X hours] |

**Discovery Focus Areas:**
- [x] Vendor documentation
- [x] Industry analyst reports
- [x] Conference presentations
- [ ] Academic research
- [x] Community discussions

### Phase 2: Analysis
| Parameter | Value |
|-----------|-------|
| **Objective** | [e.g., "Deep evaluation of top 5 candidates for federal use"] |
| **Selection Criteria** | [How to choose entities for deep analysis] |
| **Federal Focus** | [Required / Preferred / Not Required] |
| **Per-Entity Budget** | [X hours / sessions per entity] |

**Analysis Dimensions:**
- [x] Technical architecture (marketing vs. reality)
- [x] Federal compliance assessment
- [x] ROI/value proposition
- [x] Competitive positioning
- [ ] Customer references

### Phase 3: Synthesis
| Parameter | Value |
|-----------|-------|
| **Deliverables** | [List expected outputs] |
| **Comparison Dimensions** | [What to compare across entities] |
| **Recommendation Scope** | [Pilot candidates / Full ranking / Go/no-go only] |

---

## Federal Requirements

### Impact Level Target
- [ ] IL-2 (Public cloud, basic controls)
- [ ] IL-4 (CUI, moderate controls)
- [ ] IL-5 (CUI, higher controls, national security)
- [ ] IL-6 (Classified, SECRET)
- [ ] Any/Flexible

### Compliance Must-Haves
- [ ] FedRAMP authorization (any level)
- [ ] Self-hosted/on-premise option
- [ ] Air-gap deployment capability
- [ ] FIPS 140-2/140-3 compliance
- [ ] Platform One availability
- [ ] None required

### Compliance Nice-to-Haves
- [ ] SOC 2 Type II
- [ ] GovCloud availability
- [ ] Federal customer references
- [ ] StateRAMP authorization
- [ ] ISO 27001

---

## Known Entities (Optional)

Pre-seed with entities the researcher already knows about:

| Entity | Category | Notes | Priority |
|--------|----------|-------|----------|
| [Name] | [Category] | [Why included] | High |
| [Name] | [Category] | [Why included] | Medium |
| [Name] | [Category] | [Why included] | Low |

---

## Research Constraints

### Budget
| Resource | Allocation |
|----------|------------|
| **Time Budget** | [Maximum total hours] |
| **Agent Cost Budget** | [Maximum $ for API calls] |
| **Breadth vs. Depth** | [Prioritize comprehensive coverage / deep analysis] |

### Source Preferences
**Prioritize:**
- [Vendor documentation / Analyst reports / Community discussion / All equally]

**Avoid:**
- [e.g., "Sources older than 2 years"]
- [e.g., "Paywalled content without preview"]

### Quality Thresholds
| Metric | Minimum |
|--------|---------|
| **Claims per Entity** | [N claims before analysis] |
| **Sources per Entity** | [N sources before trusting] |
| **Federal Score for Analysis** | [Minimum 0-10 to proceed to analysis] |

---

## Agent Instructions

### Discovery Agent Notes
[Special instructions for discovery phase]

Example:
- "Focus on tools released or significantly updated in 2024-2025"
- "Pay special attention to AI code generation and testing categories"
- "Include emerging players even if market share is small"

### Analysis Agent Notes
[Special instructions for analysis phase]

Example:
- "Prioritize FedRAMP marketplace verification"
- "Document exact data flows for each cloud-dependent feature"
- "Compare AI claims against actual documentation"

### Synthesis Agent Notes
[Special instructions for synthesis and deliverables]

Example:
- "Create comparison focused on federal viability"
- "Highlight tools with clearest path to IL-4 compliance"
- "Note tools that are commercial-only but worth monitoring"

---

## Human Checkpoints

### After Discovery
Before proceeding to Analysis, I will review:
- [ ] Entity catalog completeness
- [ ] Fit assessments for borderline entities
- [ ] Federal score accuracy
- [ ] Approve entities for deep analysis

**Approval Method:** [Edit this file / Slack notification / Meeting]

### After Analysis
Before proceeding to Synthesis, I will review:
- [ ] Claim validation accuracy
- [ ] Federal assessments for priority entities
- [ ] Any entities to add/remove

### After Deliverables
Final review:
- [ ] Efficacy briefs meet quality standards
- [ ] Recommendations are actionable
- [ ] Executive summary is accurate

---

## Session Log

*Agents append session summaries below*

---

### Session 001 - [Date]
| Field | Value |
|-------|-------|
| **Phase** | Discovery |
| **Agent** | discovery-agent (Sonnet) |
| **Duration** | [X minutes] |
| **Entities Found** | [N] |
| **Claims Recorded** | [N] |
| **Sources Added** | [N] |

**Summary:**
[Agent writes 2-3 sentence summary of what was accomplished]

**Next Steps:**
[What should happen next]

---

### Session 002 - [Date]
...

---

## Database References

*Auto-populated by agents*

| Table | Record Count | Last Sync |
|-------|-------------|-----------|
| entities | 0 | - |
| assertions | 0 | - |
| sources | 0 | - |

**Session ID:** [Auto-generated UUID]

---

## Notes

[Free-form notes from human researcher]

---

*Template Version: 1.0*
*Based on: docs/RESEARCH-SYSTEM.md*
