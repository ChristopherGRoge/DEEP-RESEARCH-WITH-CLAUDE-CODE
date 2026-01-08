# Design-Build Phase Research

> **Inherits from:** `../VISION.md`
>
> This file defines phase-specific research scope. All evaluation criteria, federal requirements, and scoring come from the parent VISION.md.

---

## Phase Metadata

| Field | Value |
|-------|-------|
| **Phase** | Design-Build |
| **Created** | 2025-12-30 |
| **Status** | Analysis |
| **Entity Target** | 15-25 entities |

**Status Values:** `Draft` → `Discovery` → `Analysis` → `Synthesis` → `Complete`

---

## Phase Definition

### What This Phase Covers
AI-powered tools that assist with code generation, pair programming, refactoring, code completion, and active development activities. This is typically the most crowded category with the most vendor activity.

### Tool Categories
- [ ] AI Code Assistants / Copilots
- [ ] IDE Extensions with AI
- [ ] Code Generation Platforms
- [ ] Refactoring Assistants
- [ ] Code Review Automation
- [ ] Documentation Generation
- [ ] Code Translation/Migration

### Out of Scope
- Pure testing tools (Quality-Engineering phase)
- CI/CD pipeline tools (Deploy phase)
- Architecture planning tools (Plan-Analyze phase)
- Runtime monitoring (Ops phase)

---

## Discovery Parameters

### Search Strategies
```
Primary searches:
- "AI code assistant" enterprise
- "code generation AI" tool 2024 2025
- "AI pair programming" Gartner OR Forrester
- "copilot alternative" development
- "IDE AI extension" VS Code OR JetBrains

Secondary searches:
- "code completion AI" enterprise security
- "AI refactoring" tool
- "code documentation generator AI"
- "AI code review" automated
- GitHub: topics/code-generation + AI stars:>1000
- ProductHunt: AI coding tools launches 2024-2025
```

### Inclusion Criteria
Tools MUST meet ALL of:
- [ ] Generates, completes, or transforms source code
- [ ] Uses LLM or advanced ML for code understanding
- [ ] Integrates with development workflows (IDE, CLI, or API)
- [ ] Meets at least one federal requirement from VISION.md

### Exclusion Criteria
- [ ] Simple autocomplete without AI/ML
- [ ] Linters and formatters without generative capability
- [ ] Pure code search tools
- [ ] Tools that only analyze but don't generate

---

## Known Entities

Pre-seed with tools already identified for this phase:

| Entity | Category | Federal Score | Notes |
|--------|----------|---------------|-------|
| GitHub Copilot | AI Code Assistant | TBD | Market leader, Microsoft backing |
| Cursor | AI IDE | TBD | VS Code fork with AI-first design |
| Claude Code | AI CLI Agent | TBD | Anthropic CLI, Bedrock potential, terminal-native |
| Tabnine | Code Completion | TBD | Claims on-prem/air-gap support |
| Amazon Q Developer | AI Code Assistant | TBD | AWS ecosystem, GovCloud path |
| Codeium | Code Completion | TBD | Free tier, enterprise options |
| Sourcegraph Cody | AI Code Assistant | TBD | Code intelligence platform |

---

## Analysis Focus

Beyond the standard VISION.md dimensions, this phase specifically examines:

### Phase-Specific Questions
1. What LLM(s) power the code generation? Can they be swapped/self-hosted?
2. What data is sent to external services? Code snippets? Full files? Project context?
3. How does it handle proprietary/sensitive code patterns?
4. What languages and frameworks are best supported?
5. Can it be configured to follow organizational coding standards?
6. What's the latency impact on developer workflow?

### Integration Points
- **Upstream:** Plan-Analyze (architecture decisions), Requirements (user stories)
- **Downstream:** Quality-Engineering (code for testing), Deploy (build artifacts)

---

## Extraction Priorities

For entities in this phase, prioritize these schema types:

| Schema Type | Priority | Why |
|-------------|----------|-----|
| `compliance` | Critical | Federal viability gate - data flows critical |
| `features` | Critical | Core capability differentiation |
| `pricing` | High | Per-seat costs add up quickly |
| `integrations` | High | IDE and toolchain fit |
| `company` | Medium | Funding/stability matters for tooling |

---

## Deliverables

### Per-Entity
- [x] EFFICACY Brief (Tabby, Continue.dev, Claude Code)
- [x] One-Pager (HTML)
- [x] Logo (SVG preferred) - 20/22 entities

### Phase-Level
- [x] Comparison Matrix (language support, IDE support, pricing)
- [x] Recommendation Summary
- [ ] Data Flow Analysis Summary
- [ ] Federal Deployment Options Matrix
- [x] **Research Deck (PPTX)** - `Deliverables/00-DESIGN-BUILD-RESEARCH.pptx`

---

## Session Log

*Agents append session summaries below*

---

### Session 001 - 2025-12-30
| Field | Value |
|-------|-------|
| **Activity** | Discovery |
| **Entities Processed** | 22 |
| **Claims Recorded** | 0 (Discovery phase - claims collected in notes) |

**Summary:** Launched 4 parallel Discovery agents (Sonnet) targeting:
1. AI Code Assistants - Found 20 tools beyond known entities
2. Code Generation Platforms - Found 15 platforms
3. IDE Extensions - Found 8 specialized extensions
4. Specialized Tools (refactoring, docs, review, migration) - Found 11 tools

**Key Federal Candidates Identified (Path B - Self-Hosted):**
- Continue.dev - Open-source, LLM-agnostic, local-first
- Tabby - Rust-based, purpose-built for air-gap
- Tabnine - Flexible deployment (SaaS to air-gapped)
- Windsurf - FedRAMP High via Palantir FedStart
- Qodo - Air-gapped, SOC 2, multi-repo context
- Greptile - Air-gapped + BYOL
- Moderne - Air-gapped refactoring at scale
- IBM watsonx Code Assistant for Z - FedRAMP in progress

**Entities Persisted to Database:** 22
- GitHub Copilot, Cursor, Tabnine, Amazon Q Developer, Codeium, Sourcegraph Cody
- Continue.dev, Tabby, Refact.ai, Theia IDE, Windsurf
- Augment Code, Qodo, GitLab Duo, Aider, Greptile, CodeRabbit
- Moderne, IBM watsonx Code Assistant for Z, Poolside AI, Devin AI, Claude Code

**Next:**
- [x] Deep analysis of top Path B candidates
- [x] Validate federal claims (FedRAMP, air-gap, BYOL)
- [x] Extract pricing, compliance, integration data
- [ ] Fetch logos for all entities

---

### Session 002 - 2025-12-30
| Field | Value |
|-------|-------|
| **Activity** | Analysis |
| **Entities Analyzed** | 6 (top federal candidates) |
| **Assertions Created** | 85+ (persisted to database) |

**Summary:** Launched 6 parallel Analysis agents (Sonnet) for deep federal viability assessment of top Path B candidates. Each agent performed web research, validated claims, and persisted assertions to the database.

#### Federal Viability Matrix

| Entity | Federal Score | Path | Key Strengths | Key Limitations |
|--------|--------------|------|---------------|-----------------|
| **Tabby** | 9/10 | B | Fully self-hosted, Rust, air-gap, Apache 2.0, Bedrock support | No FedRAMP (expected), GPU needed |
| **Continue.dev** | 8.5/10 | B | Open-source, Bedrock/Azure GovCloud, local models, air-gap | No FedRAMP, telemetry concerns |
| **Claude Code** | 8.5/10 | B | FedRAMP High via Bedrock, terminal-native, telemetry control | Requires internet, no air-gap |
| **Windsurf** | 8.5/10 | A+B | FedRAMP High (actual), DoD IL4/5/6, BYOL | Self-hosted loses Cascade feature |
| **Tabnine** | 8/10 | B | Air-gapped, BYOL, zero code retention, IP indemnification | No FedRAMP, $39/user/mo |
| **Qodo** | 8/10 | B | Air-gapped, SOC 2, multi-repo awareness, MCP support | No FedRAMP, $45/user/mo |

#### Key Findings by Entity

**Tabby (9/10 - Best Path B Candidate)**
- Written in Rust (memory safety)
- Fully self-hosted, zero cloud dependencies
- Air-gapped deployment documented
- Supports AWS Bedrock via OpenAI-compatible API
- Apache 2.0 license (auditable)
- Local models: StarCoder, CodeLlama, Qwen, DeepSeek
- ~8GB VRAM for 7B models, ~50 engineers per GPU

**Continue.dev (8.5/10 - Best Open-Source Option)**
- Apache 2.0 license, 30k+ GitHub stars
- Native AWS Bedrock provider support
- Azure OpenAI GovCloud via `.azure.us` endpoints
- Full offline mode with Ollama
- No SaaS = no FedRAMP needed
- Enterprise features: SSO, governance, managed proxy
- Telemetry can be disabled (recommend network-level blocking)

**Claude Code (8.5/10 - Best for Bedrock Users)**
- `CLAUDE_CODE_USE_BEDROCK=1` routes to GovCloud
- Claude in Bedrock: FedRAMP High, DoD IL4/5
- Telemetry auto-disabled with Bedrock
- Terminal-native (no IDE required)
- MCP for enterprise integrations
- **Limitation**: Not air-gapped, requires internet to Bedrock

**Windsurf (8.5/10 - Only FedRAMP High Certified)**
- FedRAMP High authorized (March 2025) via Palantir FedStart
- DoD IL4, IL5, IL6, ITAR compliant
- Hybrid deployment: Full features + GovCloud
- Self-hosted: BYOL (Bedrock/Azure) but **loses Cascade feature**
- $60/user/month, 2-4 week setup
- Only Extensions authorized; full IDE "coming soon"

**Tabnine (8/10 - Enterprise Air-Gap Leader)**
- Fully air-gapped deployment, no internet needed
- Zero code retention policy (no-train-no-retain)
- BYOL: Bedrock, Azure, Vertex AI, OpenAI-compatible
- SOC 2 Type 2, ISO 27001
- IP indemnification for generated code
- Models trained on Apache-2 licensed code only
- Dell partnership for turnkey GPU deployment
- $39/user/month Enterprise tier

**Qodo (8/10 - Testing + Code Gen Hybrid)**
- Air-gapped + VPC + on-prem options
- SOC 2 Type 2 certified
- AWS Bedrock and Azure OpenAI support
- Local LLMs via Ollama/VLLM
- MCP integration for enterprise tools
- 80% accuracy on DeepCodeBench (beats Claude Code 64%)
- PR-Agent is open-source (Apache 2.0)
- $45/user/month Enterprise, 48hr data retention
- Multi-repo codebase awareness

#### Path Recommendations

**For Maximum Security (Air-Gapped)**
1. **Tabby** - Best overall, Rust-based, fully offline
2. **Tabnine** - Enterprise-ready, turnkey GPU deployment
3. **Continue.dev + Ollama** - Open-source, local models

**For AWS GovCloud Environments**
1. **Claude Code + Bedrock** - Native support, terminal-native
2. **Continue.dev + Bedrock** - IDE-based, flexible
3. **Windsurf Hybrid** - FedRAMP High, full features

**For Azure GovCloud Environments**
1. **Continue.dev + Azure OpenAI** - `.azure.us` endpoints
2. **Tabnine + Azure** - Private endpoint config
3. **Qodo + Azure** - PR focus, multi-repo

**For FedRAMP SaaS (Path A)**
1. **Windsurf** - Only vendor with actual FedRAMP High (Cascade included)
2. **GitHub Copilot** - Expected FedRAMP path (verify)
3. **Amazon Q Developer** - AWS native, GovCloud

#### Assertions in Database

All findings persisted with source URLs and quotes:
- Windsurf: FedRAMP status, deployment tiers, feature gaps
- Continue.dev: LLM providers, air-gap config, pricing
- Claude Code: Bedrock config, telemetry, GovCloud models
- Tabby: Models, GPU requirements, deployment
- Tabnine: Air-gap, BYOL, compliance certs
- Qodo: Deployment options, LiteLLM, MCP integration

**Next:**
- [x] Generate EFFICACY briefs for top 3 candidates
- [x] Create comparison matrix
- [ ] Fetch logos for all entities
- [ ] Validate remaining Discovery entities
- [ ] Phase synthesis and recommendations

---

### Session 003 - 2025-12-30
| Field | Value |
|-------|-------|
| **Activity** | Deliverable Generation |
| **Deliverables Created** | 8 files |
| **Phase Progress** | Analysis → Synthesis |

**Summary:** Generated EFFICACY briefs and comparison matrix for top federal candidates.

#### Deliverables Created

```
Deliverables/
├── 00-COMPARISON-MATRIX.md    (comprehensive 6-tool comparison)
├── 00-COMPARISON-MATRIX.html  (visual executive summary)
├── Tabby/
│   ├── 00-EFFICACY-BRIEF.md   (22KB full analysis)
│   └── 00-one-pager.html      (executive summary)
├── Continue.dev/
│   ├── 00-EFFICACY-BRIEF.md   (23KB full analysis)
│   └── 00-one-pager.html      (executive summary)
└── Claude-Code/
    ├── 00-EFFICACY-BRIEF.md   (25KB full analysis)
    └── 00-one-pager.html      (executive summary)
```

#### Comparison Matrix Summary

| Tool | Score | Path | Recommendation |
|------|-------|------|----------------|
| Tabby | 9/10 | B | **Proceed** - Best air-gap/IL5+ |
| Continue.dev | 8.5/10 | B | **Proceed** - Best open-source |
| Claude Code | 8.5/10 | B | **Conditional** - Best Bedrock |
| Windsurf | 8.5/10 | A+B | **Proceed** - Only FedRAMP High |
| Tabnine | 8/10 | B | **Proceed** - Enterprise air-gap |
| Qodo | 8/10 | B | **Proceed** - Testing + review |

#### Path-Based Recommendations

- **Air-Gapped/IL5+**: Tabby > Tabnine > Continue.dev+Ollama
- **AWS GovCloud**: Claude Code > Continue.dev > Windsurf Hybrid
- **FedRAMP SaaS**: Windsurf (only option with actual authorization)

**Next:**
- [ ] Fetch logos for all 22 entities
- [ ] Validate remaining Discovery entities
- [ ] Move to Synthesis phase
- [ ] Write final recommendation summary

---

### Session 004 - 2026-01-05
| Field | Value |
|-------|-------|
| **Activity** | Deck Generation |
| **Deliverables Created** | 2 files |
| **Phase Progress** | Synthesis |

**Summary:** Generated research deck (PPTX) and established deck generation as a required deliverable for all future research tasks.

#### Deliverables Created

```
Deliverables/
├── generate_deck.py              (deck generation script)
└── 00-DESIGN-BUILD-RESEARCH.pptx (18-slide research presentation)
```

#### Presentation Structure

| Slide Range | Content |
|-------------|---------|
| 1 | Title: AI Code Assistants for Federal Environments |
| 2 | Executive Summary |
| 3-5 | Federal Deployment Paths (A vs B) |
| 6-7 | Federal Viability Matrix (compliance, architecture tables) |
| 8 | Section: Top Recommendations |
| 9-12 | Entity highlights: Tabby, Continue.dev, Claude Code, Windsurf |
| 13-14 | Path-Based Recommendations |
| 15 | Decision Matrix |
| 16 | Next Steps |
| 17-18 | Key Takeaways / Summary |

#### Updates to Research System

1. Created `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md` - standardized deck template specification
2. Updated `.claude/skills/research/SKILL.md` - deck generation now REQUIRED in Phase 4
3. Updated `.claude/skills/research-to-deck/SKILL.md` - added deck checklist and reference implementation
4. Updated `RESEARCH.md` - documented deck as completed deliverable

**Research Deck Requirement:**
All future research phases MUST produce a PPTX following `docs/RESEARCH-TEMPLATES/DECK-TEMPLATE.md`:
- Title slide with phase name and date
- Executive summary with entity count and recommendations
- Comparison tables with federal viability data
- Individual slides for top 4-6 entities
- Decision matrix
- Next steps
- Summary takeaways

**Next:**
- [x] Generate research deck
- [x] Establish deck template specification
- [x] Update skills to require deck generation
- [ ] Apply template to future research phases

---

### Session 005 - 2026-01-07
| Field | Value |
|-------|-------|
| **Activity** | Deep Research Refresh (Evidence-First Protocol) |
| **Entities Researched** | 22 (full coverage) |
| **Assertions Created** | 317 (all with screenshot evidence) |
| **Extractions Completed** | 48 |
| **Sources Documented** | 91 |
| **Logos Fetched** | 18/22 (82%) |

**Summary:** Executed comprehensive research refresh using new evidence-first protocol. Launched 22 parallel subagents to systematically research all Design-Build entities with screenshot evidence backing every assertion.

#### Evidence-First Protocol Results

All assertions now include:
- `evidenceScreenshotPath` - Screenshot file path
- `evidenceDescription` - Text explaining what on screenshot supports claim
- `sourceUrl` - Reference URL (secondary to screenshot evidence)

#### Database State After Refresh

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Assertions | 1 | 317 | +316 |
| Sources | 0 | 91 | +91 |
| Extractions | 0 | 48 | +48 |
| Screenshots | 0 | 87+ | +87+ |
| Logos | 0 | 18 | +18 |

#### Extraction Coverage

| Schema Type | Coverage | Notes |
|-------------|----------|-------|
| Pricing | 73% (16/22) | Most commercial tools documented |
| Features | 55% (12/22) | Core capabilities extracted |
| Compliance | 50% (11/22) | FedRAMP, SOC 2, certifications |
| Company | 36% (8/22) | Funding, leadership, metrics |
| Integrations | 5% (1/22) | Lowest coverage - future focus |

#### Key Federal Viability Findings (Refreshed)

| Entity | Federal Score | Path | Key Finding |
|--------|---------------|------|-------------|
| **Windsurf** | 9/10 | A | Only FedRAMP High certified (Palantir FedStart) |
| **Codeium** | 9/10 | A+B | FedRAMP High, air-gapped, zero retention |
| **Tabby** | 9/10 | B | Rust-based, air-gapped, Apache 2.0 |
| **Continue.dev** | 8.5/10 | B | Apache 2.0, 20+ LLM providers, Bedrock |
| **Tabnine** | 8/10 | B | Air-gapped, Dell partnership, no-train |
| **Qodo** | 8/10 | B | Air-gapped, SOC 2, 80% DeepCodeBench |
| **Greptile** | 7/10 | B | BYOL, SOC 2, self-hosted, 82% bug detection |
| **CodeRabbit** | 7/10 | B | Self-hosted (500+ seats), AWS Marketplace |

#### NOT Federally Viable (Confirmed)

| Entity | Reason |
|--------|--------|
| **Cursor** | All requests route through Cursor servers; no self-hosted option |
| **Devin AI** | SaaS-only, no compliance certifications, no air-gap |
| **GitHub Copilot** | Requires GitHub cloud; no self-hosted; privacy concerns |

#### New Discoveries

1. **Augment Code** - ISO/IEC 42001 certified (first AI management certification), CMEK support
2. **Theia IDE** - Eclipse Foundation governance, open alternative to Copilot/Cursor
3. **Aider** - 39.6K stars, true air-gap with Ollama, zero cost

#### Entities Still Missing Extractions

| Entity | Status |
|--------|--------|
| Claude Code | Has assertions, needs structured extractions |
| Devin AI | Has assertions, needs structured extractions |
| Qodo | Has assertions, needs structured extractions |

**Next:**
- [ ] Complete remaining structured extractions
- [ ] Fetch missing logos (4 entities)
- [ ] Update comparison matrix with refreshed data
- [ ] Validate assertions via human review
- [ ] Regenerate research deck with 2026 data

---
