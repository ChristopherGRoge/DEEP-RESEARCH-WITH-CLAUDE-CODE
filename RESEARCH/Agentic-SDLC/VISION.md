# Agentic SDLC Research Vision

> Deeply research Agentic AI / Generative AI tools which promise to bring value to each phase of the SDLC.

This document establishes shared objectives, evaluation criteria, and federal requirements that apply to ALL phase-specific research under this domain.

---

## Research Objectives

### Primary Question
> What AI-powered tools can meaningfully augment each phase of the federal software development lifecycle while meeting security, compliance, and ROI requirements?

### Evaluation Dimensions

Every tool researched in any phase must be assessed against these criteria:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Federal Viability** | Critical | Can this realistically be deployed in IL-4+ environments? |
| **Differentiation** | High | What does this do that competitors don't? |
| **Technical Reality** | High | Marketing claims vs. documented capabilities |
| **ROI Potential** | Medium | Value vs. "roll your own" (e.g., Claude Code) |
| **Industry Backing** | Medium | Funding, customers, trajectory |
| **AI Authenticity** | Medium | Novel Gen AI vs. thin wrapper |

---

## Federal Requirements

### Impact Level Target
All tools must be evaluated for:
- [ ] IL-4 (CUI, moderate controls) - **Primary target**
- [ ] IL-5 (CUI, higher controls) - **Aspirational**

### Two Viable Paths to Federal Deployment

Tools are acceptable if they meet requirements via **EITHER** path:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FEDERAL VIABILITY ASSESSMENT                          │
├─────────────────────────────────┬───────────────────────────────────────────┤
│      PATH A: FEDERAL CLOUD      │         PATH B: SELF-HOSTED               │
├─────────────────────────────────┼───────────────────────────────────────────┤
│ • FedRAMP Authorization         │ • Full Gen AI features in self-hosted     │
│ • GovCloud availability         │ • Pluggable LLM backend architecture      │
│ • IL-4/IL-5 certified           │ • GovCloud LLM endpoint support           │
│                                 │   (AWS Bedrock, Azure OpenAI GovCloud)    │
│                                 │ • Air-gap capable (optional bonus)        │
└─────────────────────────────────┴───────────────────────────────────────────┘
```

#### Path A: Federal Cloud Compliance
Tool runs in vendor's FedRAMP-authorized environment.

**Requirements:**
- [ ] FedRAMP Authorization (any level: Li-SaaS, Low, Moderate, High)
- [ ] OR explicit GovCloud deployment option
- [ ] OR IL-4/IL-5 authorization documentation

#### Path B: Self-Hosted with GovCloud LLM Support
Tool runs in our infrastructure, connects to authorized LLM endpoints.

**Requirements:**
- [ ] Self-hosted/on-premise deployment option available
- [ ] **ALL Gen AI features functional** in self-hosted mode (not a "lite" version)
- [ ] **Pluggable LLM backend** - can configure custom endpoints
- [ ] **GovCloud LLM compatibility** - documented support for:
  - AWS Bedrock (GovCloud)
  - Azure OpenAI (GovCloud)
  - Self-hosted models (vLLM, Ollama, etc.)

**Critical Self-Hosted Questions:**
1. Does self-hosted version include ALL AI features, or is it reduced functionality?
2. Can the LLM endpoint be configured to point to GovCloud services?
3. What is the minimum infrastructure requirement?
4. Are there any "phone home" requirements that would break air-gap?

### Compliance Enhancements (Both Paths)

#### Strong Preference
- FIPS 140-2/140-3 cryptographic compliance
- Platform One / Iron Bank container availability
- SOC 2 Type II certification

#### Nice-to-Have
- StateRAMP authorization
- Federal customer references (documented case studies)
- ISO 27001 certification
- HIPAA compliance (for healthcare-adjacent work)

### Data Flow Analysis

For every tool, document:

| Question | Path A Answer | Path B Answer |
|----------|---------------|---------------|
| What data leaves local environment? | To FedRAMP boundary | To GovCloud LLM only |
| What LLMs are used? | Vendor-managed | Customer-configured |
| Can telemetry be disabled? | N/A (within boundary) | Required for air-gap |
| Where is data stored/processed? | Vendor FedRAMP env | Customer infrastructure |
| What happens if LLM endpoint unavailable? | Vendor SLA | Graceful degradation? |

---

## Evaluation Scoring

### Federal Readiness Score (0-10)

Score reflects viability via **either** Path A (Federal Cloud) or Path B (Self-Hosted).

#### Path A Scoring (Federal Cloud)
| Points | Criteria |
|--------|----------|
| +5 | FedRAMP Moderate or High authorized |
| +4 | FedRAMP Low or Li-SaaS authorized |
| +3 | GovCloud deployment available |
| +2 | Federal/government customers documented |
| +1 | SOC 2 Type II certified |
| +1 | In process for FedRAMP (documented) |

#### Path B Scoring (Self-Hosted)
| Points | Criteria |
|--------|----------|
| +3 | Self-hosted with FULL Gen AI features |
| +3 | Documented GovCloud LLM support (Bedrock, Azure OpenAI) |
| +2 | Pluggable/configurable LLM backend |
| +2 | Air-gap deployment documented |
| +1 | Platform One / Iron Bank available |
| +1 | FIPS 140-2/3 compliant |

#### Deductions (Either Path)
| Points | Criteria |
|--------|----------|
| -3 | Self-hosted is "lite" version (missing AI features) |
| -3 | Hard-coded to commercial LLM endpoints only |
| -2 | Requires telemetry/phone-home that can't be disabled |
| -2 | No self-hosted AND no FedRAMP path |

**Thresholds:**
- **7+**: Strong federal candidate (clear path via A or B)
- **4-6**: Viable with modifications or workarounds
- **0-3**: Commercial-only, monitor for changes

**Path Classification:**
- **A-Ready**: Score 7+ via Path A criteria
- **B-Ready**: Score 7+ via Path B criteria
- **Dual-Path**: Viable via either path
- **Blocked**: Neither path viable currently

### Differentiation Score (0-10)

| Points | Criteria |
|--------|----------|
| +3 | Unique capability not found elsewhere |
| +2 | Best-in-class implementation of common feature |
| +2 | Strong integration ecosystem |
| +1 | Novel UI/UX approach |
| +1 | Specialized for specific use case |
| -2 | "Me too" product with no differentiation |
| -3 | Appears to be thin wrapper over existing LLM |

### ROI Assessment

Compare against baseline: **"What could we build with Claude Code + internal effort?"**

| Rating | Meaning |
|--------|---------|
| **Build** | Internal solution clearly better |
| **Buy** | Commercial tool provides significant value over DIY |
| **Hybrid** | Use commercial for some features, build others |
| **Monitor** | Not ready now, but watch for improvements |

---

## SDLC Phase Taxonomy

Research is organized by SDLC phase. Each phase has its own `RESEARCH.md` that inherits this VISION.

```
SDLC Phase          │ Focus Areas
────────────────────┼─────────────────────────────────────────
Requirements        │ Requirements gathering, user stories, BRD generation
Plan-Analyze        │ Architecture design, technical planning, estimation
Design-Build        │ Code generation, pair programming, refactoring
Quality-Engineering │ Test generation, QA automation, code review
Deploy              │ CI/CD, infrastructure, deployment automation
Ops                 │ Monitoring, incident response, AIOps
```

---

## Research Database

All research persists to the PostgreSQL database via CLI commands.

### Project Reference
```bash
# The Agentic SDLC project
npm run cli -- project:find '{"name": "Agentic SDLC Tools"}'
```

### Key Commands
```bash
# Check research gaps
npm run cli -- research:gaps '{"projectId": "..."}'

# Query across entities
npm run cli -- query:compare '{"entityIds": [...], "schemaType": "compliance"}'

# Track changes over time
npm run cli -- diff:changes '{"projectId": "..."}'
```

---

## Deliverable Templates

Each entity researched should produce:

1. **EFFICACY Brief** (`docs/RESEARCH-TEMPLATES/EFFICACY`)
   - Executive summary
   - Technical assessment
   - Federal viability analysis
   - Recommendation

2. **One-Pager** (HTML/PPTX)
   - Visual summary for stakeholders

3. **Comparison Matrix** (per phase)
   - Cross-entity comparison on key dimensions

---

## Research Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                      VISION.md (this file)                  │
│              Shared objectives, criteria, scoring           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ Requirements/ │    │ Design-Build/ │    │ Quality-Eng/  │
│ RESEARCH.md   │    │ RESEARCH.md   │    │ RESEARCH.md   │
│               │    │               │    │               │
│ Phase-specific│    │ Phase-specific│    │ Phase-specific│
│ scope, tools  │    │ scope, tools  │    │ scope, tools  │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
   Discovery            Discovery            Discovery
   Analysis             Analysis             Analysis
   Synthesis            Synthesis            Synthesis
   Deliverables         Deliverables         Deliverables
```

---

## Invoking Research

```bash
# Research a specific phase
"Research Design-Build tools using RESEARCH/Agentic-SDLC/Design-Build/RESEARCH.md"

# Research all phases
"Research all SDLC phases under RESEARCH/Agentic-SDLC/"

# Continue existing research
"Continue the Quality-Engineering research"
```

---

## Version History

| Date | Change |
|------|--------|
| 2025-12-30 | Two-path federal model: Path A (FedRAMP) OR Path B (Self-hosted + GovCloud LLM) |
| 2025-12-30 | Added structured evaluation framework, federal requirements |
| 2025-12-24 | Initial vision created |
