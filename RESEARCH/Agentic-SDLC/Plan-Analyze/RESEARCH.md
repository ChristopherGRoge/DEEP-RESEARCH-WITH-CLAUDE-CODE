# Plan-Analyze Phase Research

> **Inherits from:** `../VISION.md`
>
> This file defines phase-specific research scope. All evaluation criteria, federal requirements, and scoring come from the parent VISION.md.

---

## Phase Metadata

| Field | Value |
|-------|-------|
| **Phase** | Plan-Analyze |
| **Created** | 2025-12-30 |
| **Status** | Draft |
| **Entity Target** | 8-15 entities |

**Status Values:** `Draft` → `Discovery` → `Analysis` → `Synthesis` → `Complete`

---

## Phase Definition

### What This Phase Covers
AI-powered tools that assist with architectural design, technical planning, effort estimation, system analysis, and technical decision-making before active development begins.

### Tool Categories
- [ ] Architecture Design Assistants
- [ ] Technical Planning Tools
- [ ] Effort/Story Point Estimation
- [ ] System Diagramming with AI
- [ ] Technical Debt Analysis
- [ ] Codebase Analysis & Understanding
- [ ] Migration Planning Tools

### Out of Scope
- Active code generation (covered in Design-Build)
- Project management/tracking tools
- Requirements gathering (covered in Requirements phase)
- Pure documentation tools without planning AI

---

## Discovery Parameters

### Search Strategies
```
Primary searches:
- "AI architecture design" software tool
- "automated effort estimation" development
- "technical planning AI" enterprise
- "system design AI assistant"
- "codebase analysis AI" tool

Secondary searches:
- "architecture decision records AI"
- "migration planning AI" modernization
- "technical debt detection AI"
- "story point estimation ML"
- GitHub: topics/software-architecture + AI
- "AI system diagramming" C4 OR UML
```

### Inclusion Criteria
Tools MUST meet ALL of:
- [ ] Focuses on planning/analysis before coding
- [ ] Uses AI/ML for recommendations, analysis, or estimation
- [ ] Produces actionable technical artifacts (diagrams, plans, estimates)
- [ ] Meets at least one federal requirement from VISION.md

### Exclusion Criteria
- [ ] Pure diagramming tools without AI assistance
- [ ] Code generators (Design-Build phase)
- [ ] Generic chatbots without planning specialization
- [ ] Tools focused only on runtime analysis (Ops phase)

---

## Known Entities

Pre-seed with tools already identified for this phase:

| Entity | Category | Federal Score | Notes |
|--------|----------|---------------|-------|
| | | | |

---

## Analysis Focus

Beyond the standard VISION.md dimensions, this phase specifically examines:

### Phase-Specific Questions
1. How does the tool analyze existing codebases for modernization planning?
2. Can it generate architecture diagrams from natural language descriptions?
3. How accurate are its effort/complexity estimates compared to historical data?
4. Does it identify potential technical risks and mitigation strategies?
5. Can it recommend technology stacks based on requirements?

### Integration Points
- **Upstream:** Requirements (user stories, BRDs), existing system documentation
- **Downstream:** Design-Build (implementation guidance), Quality-Engineering (test planning)

---

## Extraction Priorities

For entities in this phase, prioritize these schema types:

| Schema Type | Priority | Why |
|-------------|----------|-----|
| `compliance` | Critical | Federal viability gate |
| `features` | High | Core capability mapping |
| `integrations` | High | IDE and ALM ecosystem fit |
| `pricing` | Medium | Budget planning |
| `company` | Low | Background only |

---

## Deliverables

### Per-Entity
- [ ] EFFICACY Brief
- [ ] One-Pager (HTML)
- [ ] Logo (SVG preferred)

### Phase-Level
- [ ] Comparison Matrix
- [ ] Recommendation Summary
- [ ] Planning-to-Build Transition Patterns

---

## Session Log

*Agents append session summaries below*

---
