# Quality-Engineering Phase Research

> **Inherits from:** `../VISION.md`
>
> This file defines phase-specific research scope. All evaluation criteria, federal requirements, and scoring come from the parent VISION.md.

---

## Phase Metadata

| Field | Value |
|-------|-------|
| **Phase** | Quality-Engineering |
| **Created** | 2025-12-30 |
| **Status** | Draft |
| **Entity Target** | 12-20 entities |

**Status Values:** `Draft` → `Discovery` → `Analysis` → `Synthesis` → `Complete`

---

## Phase Definition

### What This Phase Covers
AI-powered tools that assist with test generation, QA automation, code review, security scanning, and quality assurance activities throughout the development lifecycle.

### Tool Categories
- [ ] AI Test Generation
- [ ] Automated Code Review
- [ ] Security/SAST with AI
- [ ] Test Maintenance & Healing
- [ ] Visual/UI Testing with AI
- [ ] Performance Testing AI
- [ ] API Testing Automation

### Out of Scope
- Manual testing tools without AI augmentation
- Pure CI/CD pipelines (Deploy phase)
- Code generation for non-test code (Design-Build)
- Runtime APM (Ops phase)

---

## Discovery Parameters

### Search Strategies
```
Primary searches:
- "AI test generation" automated
- "AI code review" tool enterprise
- "automated testing AI" 2024 2025
- "test automation AI" Gartner OR Forrester
- "AI security scanning" SAST DAST

Secondary searches:
- "self-healing tests" AI
- "visual regression AI" testing
- "AI QA automation" enterprise
- "unit test generation AI"
- "API test generation" AI
- GitHub: topics/testing + AI stars:>500
- "AI mutation testing"
```

### Inclusion Criteria
Tools MUST meet ALL of:
- [ ] Focuses on testing, QA, or code quality
- [ ] Uses AI/ML for generation, analysis, or optimization
- [ ] Integrates with CI/CD or development workflows
- [ ] Meets at least one federal requirement from VISION.md

### Exclusion Criteria
- [ ] Simple test runners without AI capability
- [ ] Pure coverage tools without intelligent analysis
- [ ] Manual testing management platforms
- [ ] Bug tracking systems (not QA-specific AI)

---

## Known Entities

Pre-seed with tools already identified for this phase:

| Entity | Category | Federal Score | Notes |
|--------|----------|---------------|-------|
| Codium AI | Test Generation | TBD | Generates tests from code |
| Diffblue | Unit Test Generation | TBD | Java-focused, enterprise |
| Mabl | Test Automation | TBD | Self-healing tests |
| Testim | AI Testing | TBD | Acquired by Tricentis |
| Applitools | Visual AI Testing | TBD | Visual regression |
| Snyk | Security + AI | TBD | Security scanning with AI |

---

## Analysis Focus

Beyond the standard VISION.md dimensions, this phase specifically examines:

### Phase-Specific Questions
1. What types of tests can it generate? (unit, integration, e2e, API)
2. How does it handle test maintenance as code evolves?
3. Can it identify flaky tests and suggest fixes?
4. What code coverage improvements does it claim?
5. How does it integrate with existing test frameworks?
6. For security tools: What vulnerability databases does it use?

### Integration Points
- **Upstream:** Design-Build (code to test), Requirements (acceptance criteria)
- **Downstream:** Deploy (CI/CD pipeline integration), Ops (production monitoring)

---

## Extraction Priorities

For entities in this phase, prioritize these schema types:

| Schema Type | Priority | Why |
|-------------|----------|-----|
| `compliance` | Critical | Federal viability gate |
| `features` | Critical | Test types and capabilities |
| `integrations` | Critical | CI/CD and framework compatibility |
| `pricing` | High | Per-repo or usage-based costs |
| `company` | Low | Background only |

---

## Deliverables

### Per-Entity
- [ ] EFFICACY Brief
- [ ] One-Pager (HTML)
- [ ] Logo (SVG preferred)

### Phase-Level
- [ ] Comparison Matrix (test types, frameworks, CI/CD support)
- [ ] Recommendation Summary
- [ ] Test Strategy Integration Guide

---

## Session Log

*Agents append session summaries below*

---
