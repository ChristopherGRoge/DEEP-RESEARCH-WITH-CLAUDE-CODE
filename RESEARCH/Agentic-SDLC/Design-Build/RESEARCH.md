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
| **Status** | Draft |
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
| Tabnine | Code Completion | TBD | Claims on-prem/air-gap support |
| Amazon CodeWhisperer | AI Code Assistant | TBD | AWS ecosystem, potential GovCloud |
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
- [ ] EFFICACY Brief
- [ ] One-Pager (HTML)
- [ ] Logo (SVG preferred)

### Phase-Level
- [ ] Comparison Matrix (language support, IDE support, pricing)
- [ ] Recommendation Summary
- [ ] Data Flow Analysis Summary
- [ ] Federal Deployment Options Matrix

---

## Session Log

*Agents append session summaries below*

---
