# Ops Phase Research

> **Inherits from:** `../VISION.md`
>
> This file defines phase-specific research scope. All evaluation criteria, federal requirements, and scoring come from the parent VISION.md.

---

## Phase Metadata

| Field | Value |
|-------|-------|
| **Phase** | Ops |
| **Created** | 2025-12-30 |
| **Status** | Draft |
| **Entity Target** | 10-18 entities |

**Status Values:** `Draft` → `Discovery` → `Analysis` → `Synthesis` → `Complete`

---

## Phase Definition

### What This Phase Covers
AI-powered tools that assist with monitoring, incident response, AIOps, observability, log analysis, and production operations management.

### Tool Categories
- [ ] AIOps Platforms
- [ ] Intelligent Monitoring
- [ ] AI Log Analysis
- [ ] Incident Response Automation
- [ ] Anomaly Detection
- [ ] Capacity Planning AI
- [ ] ChatOps with AI

### Out of Scope
- Pure APM without AI/ML capability
- Traditional log aggregation only
- Deployment tools (Deploy phase)
- Security incident response (separate domain)

---

## Discovery Parameters

### Search Strategies
```
Primary searches:
- "AIOps" platform enterprise
- "AI monitoring" observability tool
- "intelligent incident response" automation
- "AI log analysis" enterprise
- "anomaly detection" operations ML

Secondary searches:
- "AI observability" platform
- "predictive operations" AI
- "automated root cause analysis" AI
- "capacity planning AI" cloud
- "ChatOps AI" incident
- Gartner: AIOps Magic Quadrant
- GitHub: topics/aiops stars:>300
```

### Inclusion Criteria
Tools MUST meet ALL of:
- [ ] Focuses on production operations, monitoring, or incident response
- [ ] Uses AI/ML for prediction, detection, or automation
- [ ] Provides actionable insights or automated remediation
- [ ] Meets at least one federal requirement from VISION.md

### Exclusion Criteria
- [ ] Simple dashboarding without AI
- [ ] Pure alerting systems without intelligence
- [ ] Development-time tools (Design-Build phase)
- [ ] Security-only tools without ops focus

---

## Known Entities

Pre-seed with tools already identified for this phase:

| Entity | Category | Federal Score | Notes |
|--------|----------|---------------|-------|
| Datadog | Observability + AI | TBD | Watchdog AI features |
| Dynatrace | AIOps | TBD | Davis AI engine |
| Moogsoft | AIOps | TBD | AI incident correlation |
| BigPanda | AIOps | TBD | Event correlation |
| Splunk | Log Analysis + AI | TBD | AI-powered insights |
| New Relic | Observability + AI | TBD | Applied Intelligence |

---

## Analysis Focus

Beyond the standard VISION.md dimensions, this phase specifically examines:

### Phase-Specific Questions
1. What data sources can it ingest? (metrics, logs, traces, events)
2. How does it correlate incidents across multiple signals?
3. Can it predict issues before they impact users?
4. What automated remediation capabilities exist?
5. How does it reduce alert noise and fatigue?
6. Can it learn from past incidents to improve detection?

### Integration Points
- **Upstream:** Deploy (infrastructure state), Quality-Engineering (test/performance baselines)
- **Downstream:** Feedback loop to Requirements (user impact), Design-Build (bug fixes)

---

## Extraction Priorities

For entities in this phase, prioritize these schema types:

| Schema Type | Priority | Why |
|-------------|----------|-----|
| `compliance` | Critical | Data residency and federal cloud requirements |
| `features` | Critical | AIOps capabilities and integrations |
| `integrations` | Critical | Data source and ticketing system compatibility |
| `pricing` | High | Data volume-based pricing can be significant |
| `company` | Medium | Enterprise stability and support |

---

## Deliverables

### Per-Entity
- [ ] EFFICACY Brief
- [ ] One-Pager (HTML)
- [ ] Logo (SVG preferred)

### Phase-Level
- [ ] Comparison Matrix (data sources, AI capabilities, pricing model)
- [ ] Recommendation Summary
- [ ] Federal Operations Playbook

---

## Session Log

*Agents append session summaries below*

---
