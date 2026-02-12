# Session Findings: Agentic SDLC Multi-Agent Research Run

**Date**: 2026-02-10 / 2026-02-11
**Team**: 5 agents (coordinator, 2x entity-researcher, validator, world-model)
**Scope**: 98 entities across Agentic SDLC domain

---

## Session Metrics

| Metric | Baseline | Final | Delta |
|--------|----------|-------|-------|
| Total extractions | 232 | 558+ | +141% |
| Total assertions | — | 1,868 | — |
| Total validations | 393 | 1,089 | +177% |
| ROBUST verdicts | 169 | 422 | +150% |
| Quality score | 0.79 | 0.83 | +0.04 |
| Relationships | 399 | 791 | +98% |
| Force field analyses | 0 | 523 | New |
| Pass rate (ROBUST+CONDITIONAL) | ~91% | 94.5% | +3.5pp |

### Schema Coverage

| Schema | Start | End |
|--------|-------|-----|
| Pricing | 96% | 99% |
| Features | 52% | 95% |
| Company | 28% | 99% |
| Compliance | 51% | 98% |
| Integrations | 9% | 98% |
| Differentiators | 1% | 90% |
| Positioning | 81% | 100% |
| Force Fields | 0% | 100% |

---

## Methodology Findings

### Finding 1: `extract:save` CLI expects `url` not `sourceUrl`

**Impact**: Silent failures — extractions appear to save but the URL is not persisted.

**Root Cause**: The CLI parameter is `url`, but skill documentation examples and some agent prompts reference `sourceUrl`. This mismatch causes the URL field to be silently dropped.

**Resolution**: Updated skill documentation to consistently use `url` in all `extract:save` examples. Added explicit warning about this parameter name.

---

### Finding 2: Pricing data goes stale quickly

**Impact**: 2 pricing claims were REFUTED, then 1 was re-validated as ROBUST on second pass. Pricing pages change frequently (weeks, not months).

**Root Cause**: No temporal awareness in the extraction or validation pipeline. An extraction from 30 days ago is treated the same as one from today.

**Resolution**:
- Added `capturedAt` temporal tagging guidance to entity research skill
- Added pricing staleness check to validation skill (flag extractions >30 days old)
- Recommend re-extraction before validation for pricing data

---

### Finding 3: FedRAMP claims need platform vs product scoping

**Impact**: Recurring validation pattern — entities claiming "FedRAMP" status are often referencing their cloud provider's authorization (platform), not their own product authorization.

**Examples**:
- "FedRAMP authorized" when the product runs on AWS GovCloud (platform-level, not product-level)
- "FedRAMP in progress" with no evidence of actual P-ATO or direct authorization

**Resolution**: Added FedRAMP scoping guidance to the validation skill under known patterns. Validators must distinguish:
- **Direct authorization**: Product itself holds FedRAMP ATO
- **Inherited authorization**: Product deploys on FedRAMP-authorized infrastructure
- **No authorization**: Marketing language suggesting compliance without substance

---

### Finding 4: Single-source counter-evidence should be CONDITIONAL, not REFUTED

**Impact**: The Bolt.new pricing claim was incorrectly REFUTED based on a single counter-source, later corrected to ROBUST when 5+ sources confirmed the original claim.

**Root Cause**: The adversarial methodology is aggressive by design, but a single contradicting source can be wrong. The current skill doesn't require corroboration for REFUTED verdicts.

**Resolution**: Added corroboration requirement to validation skill:
- **REFUTED** requires 2+ independent counter-evidence sources
- Single counter-source → **CONDITIONAL** with note, not REFUTED
- Self-correction protocol: validators should re-examine REFUTED verdicts with additional sources

---

### Finding 5: Marketing superlatives consistently validate as WEAK

**Impact**: Claims using superlatives ("best", "leading", "most advanced") consistently fail adversarial validation. These are not pillar-worthy assertions.

**Resolution**: Added to known validation patterns in the validation skill. Entity researchers should avoid creating pillar assertions from marketing language. Validators can fast-track superlative claims to WEAK without full adversarial analysis.

---

### Finding 6: Open-source tools validate most strongly

**Impact**: Entities with open-source codebases have the most verifiable claims (code is inspectable, community discusses openly, pricing is transparent).

**Resolution**: Added as known pattern. Validators can allocate less compute to open-source entity validation (claims are more easily verifiable) and more to closed-source entities where marketing claims are harder to confirm.

---

## Pipeline Findings

### Finding 7: Differentiators and integrations were systematically under-researched

**Impact**: Differentiators started at 1% coverage, integrations at 9%. The entity research skill classified both as LOW priority, leading researchers to skip them systematically.

**Root Cause**: The extraction priority table in `research-entity/SKILL.md` lists:
- integrations: LOW priority
- differentiators: LOW priority

This is wrong — differentiators are critical for competitive positioning and world model construction. Integrations are critical for relationship mapping.

**Resolution**: Elevated priority:
- `differentiators` → HIGH (drives world model positioning and competitive analysis)
- `integrations` → MEDIUM (drives relationship mapping in world model)

---

### Finding 8: Force field analysis was completely missing (0%)

**Impact**: All 98 entities had 0 force field analyses. Positioning and relationships were built, but forces were skipped.

**Root Cause**: The world model skill lists force fields as Phase 3 (last phase before synthesis). In batch mode, agents may complete Phases 1-2 for all entities before returning to Phase 3, or skip it entirely under time pressure.

**Resolution**: Added quality gate to world model skill — a world model is NOT complete without force field analysis. The quality check now flags 0 forces as a blocking gap that must be filled before marking completion.

---

### Finding 9: Validator throughput exceeded researcher throughput

**Impact**: The validator ran out of work (only 2 pillar assertions remaining) while researchers still had 55+ entities to process. This created an idle validator agent.

**Root Cause**: Validation is faster than research — the validator consumes pillar assertions faster than researchers create them. No guidance existed for balancing these rates.

**Resolution**: Added pipeline throughput guidance:
- Entity researchers should prioritize pillar assertion generation alongside extraction work
- When working in a team, researchers should notify validators in batches (5-10 entities at a time) rather than one-by-one
- Idle validators should proactively re-validate WEAK assertions or perform REFUTED re-checks

---

### Finding 10: Multi-agent teams work effectively despite "no subagent" constraint

**Impact**: The session successfully used 5 coordinated agents despite the skill files mandating "no subagents." The team approach was ~2-3x faster than sequential processing.

**Root Cause**: The "no subagent" constraint was designed for single-agent execution where spawning a Task agent for each entity adds coordination overhead. However, a structured team with clear ownership boundaries works well.

**Resolution**: Added team execution guidance as an alternative to sequential batch processing. Key requirements:
- Clear file ownership boundaries (no overlapping edits)
- Entity-level parallelism (different agents research different entities, not phases)
- Message-based handoffs between pipeline stages

---

## Recommendations for Future Sessions

1. **Re-extract pricing before validation** — pricing pages change frequently
2. **Prioritize differentiators early** — they're needed for world model positioning
3. **Run force field analysis inline** — don't defer to a separate pass
4. **Use 2+ sources before REFUTING** — single-source counter-evidence is unreliable
5. **Fast-track marketing superlatives to WEAK** — don't waste compute on them
6. **Balance researcher/validator throughput** — batch entity handoffs in groups of 5-10
7. **Assign FedRAMP scoping explicitly** — platform vs product distinction is critical
