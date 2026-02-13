---
name: research-ruling
description: Issue rulings on validated assertions for an entity. Use when asked to "rule on [entity]", "issue rulings for [entity]", or "close validation loop for [entity]". Analyzes tension between assertions and their adversarial validations, then issues AFFIRM/REVISE/OVERTURN verdicts.
---

# Research Ruling Skill (Validation Loop Closure)

Issues **rulings** on assertion-validation pairs produced by `/research-validation`. Each ruling analyzes the tension between an original claim and its adversarial challenge, then decides whether to AFFIRM the assertion, REVISE it with the refined claim, or OVERTURN it entirely.

**Key Principle**: Validation identifies problems. Rulings decide what to DO about them.

## Why Rulings?

| Without Rulings | With Rulings |
|-----------------|--------------|
| Validation verdicts sit unactioned | Each verdict triggers a concrete decision |
| Assertions may be stale or misleading | Claims are updated or rejected promptly |
| No audit trail of decisions | Full trail: who ruled, why, what changed |
| Researcher must manually interpret | Automated side effects (claim update, rejection) |

## Ruling Verdicts

| Verdict | Meaning | Side Effect |
|---------|---------|-------------|
| **AFFIRM** | Assertion stands as-is; validation confirms the claim | None (assertion unchanged) |
| **REVISE** | Adopt the refined claim from validation | `assertion.claim` updated to `validation.refinedClaim` |
| **OVERTURN** | Reject the assertion based on validation evidence | `assertion.status` set to `REJECTED` |

## Commands

```
/research-ruling <entity-name>           # Rule on all unruled pairs for entity
/research-ruling --id <entity-id>        # Rule on entity by ID
/research-ruling --assertion <id>        # Rule on single assertion's validations
/research-ruling help                    # Verbose overview
/research-ruling commands                # CLI command reference
```

---

## Execution Constraints

**CRITICAL: Execute all phases DIRECTLY in the current process.** Do NOT use the Task tool to spawn subagent processes. All analysis, decision-making, and CLI persistence must be performed inline by you -- not delegated to background agents.

---

## Decision Framework

### When to AFFIRM

- Validation verdict is **ROBUST** (no challenges found)
- Validation verdict is **CONDITIONAL** but conditions are minor or already implicit in the claim
- The original claim accurately represents the evidence despite minor caveats
- Counter-evidence was not compelling (single-source, outdated)

### When to REVISE

- Validation produced a **refinedClaim** that is materially different from the original
- Validation verdict is **CONDITIONAL** with significant conditions that change the claim's meaning
- Scope limitations were identified that narrow the original claim substantially
- Evidence gaps were found but the core claim holds with proper qualification

### When to OVERTURN

- Validation verdict is **REFUTED** with strong counter-evidence from 2+ independent sources
- The assertion's evidence was found to be misleading, outdated, or fabricated
- Logical flaws make the claim fundamentally unsound
- The claim was marketing language misinterpreted as technical fact

---

## EXECUTION PROTOCOL

### MODE: `help`

Display comprehensive overview. Output EXACTLY this format:

```
## Research Ruling Skill

Issues rulings on assertion-validation pairs to close the validation loop.

### Philosophy

Validation identifies tension between claims and evidence.
Rulings decide what to DO about that tension:
- Is the claim still accurate? → AFFIRM
- Does the claim need updating? → REVISE
- Is the claim fundamentally wrong? → OVERTURN

### Ruling Verdicts

| Verdict | Meaning | Side Effect |
|---------|---------|-------------|
| AFFIRM | Claim stands as-is | None |
| REVISE | Adopt refined claim | Assertion claim updated |
| OVERTURN | Reject the assertion | Assertion status = REJECTED |

### Usage

/research-ruling <entity-name>
/research-ruling --id <entity-id>
/research-ruling --assertion <assertion-id>

### Workflow

1. Load entity with validated assertions
2. Identify unruled assertion-validation pairs
3. For each pair, analyze tension and issue ruling
4. Persist ruling via ruling:create
5. Generate ruling report

### Related Skills

- /research-validation - Produces validations (run BEFORE ruling)
- /research-entity - Identifies pillar assertions
- /research-project - Sets project context
```

---

### MODE: `commands`

Display minimal CLI reference. Output EXACTLY this format:

```
## CLI Commands

# Skill commands
/research-ruling <entity-name>
/research-ruling --id <entity-id>
/research-ruling --assertion <assertion-id>
/research-ruling help
/research-ruling commands

# Load entity and validated assertions
npm run cli -- entity:get '{"entityId": "..."}'
npm run cli -- validation:list '{"entityId": "..."}'
npm run cli -- validation:pillars '{"entityId": "..."}'

# Check for existing rulings
npm run cli -- ruling:list '{"entityId": "..."}'

# Create a ruling
npm run cli -- ruling:create '{"assertionId": "...", "validationId": "...", "verdict": "REVISE", "tensionAnalysis": "...", "reasoning": "...", "ruledBy": "ruling-agent"}'

# Get ruling details
npm run cli -- ruling:get '{"rulingId": "..."}'

# List rulings with filters
npm run cli -- ruling:list '{"entityId": "...", "verdict": "REVISE"}'
```

---

### MODE: `<entity-name>` or `--id <entity-id>` (Primary Execution)

Follow this EXACT sequence when /research-ruling is invoked:

---

## PHASE 1: LOAD ENTITY AND UNRULED PAIRS

**Goal**: Retrieve entity, assertions with validations, and identify pairs needing rulings.

### Step 1.1: Resolve Entity

**Parse arguments:**
- If `--id <id>` provided: Use entity ID directly
- If `<name>` provided: Search for entity by name

```bash
# By ID
npm run cli -- entity:get '{"entityId": "ENTITY_ID"}'

# By name
npm run cli -- entity:search '{"query": "ENTITY_NAME"}'
```

**If entity not found:**
```
ERROR: Entity "ENTITY_NAME" not found.

Search tips:
- Check spelling
- Try partial name
- Use entity ID if known

To list entities: npm run cli -- entity:list '{"projectId": "..."}'
```

### Step 1.2: Load Validations

```bash
# Get all validations for this entity
npm run cli -- validation:list '{"entityId": "ENTITY_ID"}'

# Get existing rulings to identify what's already been ruled
npm run cli -- ruling:list '{"entityId": "ENTITY_ID"}'
```

### Step 1.3: Identify Unruled Pairs

From the validation list, filter to assertion-validation pairs that do NOT have a corresponding ruling. A pair is "unruled" if no ruling exists with both the same `assertionId` and `validationId`.

**If no unruled pairs found:**
```
INFO: All assertion-validation pairs for ENTITY_NAME have been ruled.

Existing rulings:
- [N] AFFIRM | [N] REVISE | [N] OVERTURN

To re-examine, use: /research-validation ENTITY_NAME (creates new validations)
```

**Output of Phase 1**: Entity + list of unruled assertion-validation pairs

---

## PHASE 2: ISSUE RULINGS (Per Pair)

**Goal**: Analyze tension and issue a ruling for each unruled pair.

### Step 2.1: Analyze Tension

For each assertion-validation pair, identify tension points:

1. **Claim Divergence**: Compare `assertion.claim` with `validation.refinedClaim` (if present)
   - Are they materially different?
   - Does the refined claim add important qualifiers?
   - Does the refined claim narrow or expand the scope?

2. **Verdict Severity**: Consider the validation verdict
   - ROBUST: Low tension (likely AFFIRM)
   - CONDITIONAL: Medium tension (AFFIRM or REVISE depending on conditions)
   - WEAK: High tension (REVISE if refinedClaim available, otherwise note)
   - REFUTED: Maximum tension (OVERTURN)
   - UNVERIFIABLE: Context-dependent

3. **Attack Vector Results**: Review which vectors challenged the assertion
   - How many of the 5 vectors found issues?
   - What severity were the findings?
   - Are the challenges actionable?

4. **Conditions**: If CONDITIONAL, review the conditions list
   - Are conditions already implicit in the original claim?
   - Do conditions materially change the claim's meaning?
   - Would a reader be misled without the conditions?

### Step 2.2: Issue Ruling

Based on tension analysis, decide on verdict:

```markdown
### Ruling: [ASSERTION_CLAIM]

**Validation Verdict**: [ROBUST/CONDITIONAL/WEAK/REFUTED/UNVERIFIABLE]
**Tension Level**: [Low/Medium/High/Maximum]

**Tension Analysis**:
[2-3 sentences on what the validation revealed vs. what the assertion claims]

**Ruling**: [AFFIRM/REVISE/OVERTURN]

**Reasoning**:
[2-3 sentences justifying the ruling]

**Action**: [None / Claim updated to: "..." / Assertion rejected]
```

### Step 2.3: Persist Ruling

```bash
npm run cli -- ruling:create '{
  "assertionId": "ASSERTION_ID",
  "validationId": "VALIDATION_ID",
  "verdict": "REVISE",
  "tensionAnalysis": "Original claim states X without qualification. Validation found conditions Y and Z that materially narrow the scope.",
  "reasoning": "The refined claim from validation accurately captures the qualified truth. Readers would be misled by the original unqualified claim.",
  "ruledBy": "ruling-agent"
}'
```

**Verdict-specific patterns:**

**AFFIRM:**
```json
{
  "verdict": "AFFIRM",
  "tensionAnalysis": "Validation confirmed assertion with ROBUST verdict. All 5 attack vectors passed.",
  "reasoning": "No tension between claim and validation. Assertion accurately represents evidence."
}
```

**REVISE:**
```json
{
  "verdict": "REVISE",
  "tensionAnalysis": "Validation found significant scope limitations. Refined claim adds necessary qualifiers.",
  "reasoning": "Original claim is misleading without conditions. Adopting refined claim preserves accuracy."
}
```

**OVERTURN:**
```json
{
  "verdict": "OVERTURN",
  "tensionAnalysis": "Validation found counter-evidence from 2+ independent sources that directly contradicts the claim.",
  "reasoning": "Assertion is factually incorrect based on strong counter-evidence. Must be rejected."
}
```

---

## PHASE 3: GENERATE RULING REPORT

**Goal**: Summarize all rulings and their impact.

### Step 3.1: Generate Report

```markdown
# Ruling Report: [ENTITY_NAME]

**Ruled**: [Date]
**Pairs Reviewed**: [N]
**Verdict Distribution**:
- AFFIRM: [N] ([%])
- REVISE: [N] ([%])
- OVERTURN: [N] ([%])

## Executive Summary

[2-3 sentences summarizing ruling outcomes and net impact on entity's assertion quality]

---

## Ruling Details

### R1: [Assertion Claim]

**Validation Verdict**: [ROBUST/CONDITIONAL/...]
**Ruling**: [AFFIRM/REVISE/OVERTURN]
**Tension**: [Low/Medium/High]

**Analysis**: [What tension was found]
**Reasoning**: [Why this ruling was chosen]
**Action Taken**: [What changed]

---

### R2: [Assertion Claim]
[Repeat for each ruling]

---

## Impact Summary

### Claims Updated ([N])
[List of claims that were revised, with before/after]

### Claims Rejected ([N])
[List of claims that were overturned]

### Claims Affirmed ([N])
[Brief note that these claims stand unchanged]

## Recommended Next Steps

1. [Action based on ruling outcomes]
2. [Action based on ruling outcomes]
3. [Action based on ruling outcomes]
```

---

## ERROR HANDLING

### Entity Not Found
```
ERROR: Entity "Unknown Tool" not found.

Did you mean one of these?
- Unknown AI (cmjk123...)
- Tool Unknown (cmjk456...)

Search all entities: npm run cli -- entity:search '{"query": "unknown"}'
```

### No Validations Found
```
WARNING: No validations found for "Entity Name".

This entity needs validation first.

Run: /research-validation "Entity Name"
```

### No Unruled Pairs
```
INFO: All validation pairs for "Entity Name" already have rulings.

Current ruling distribution:
- AFFIRM: 3
- REVISE: 2
- OVERTURN: 0

To create new validations: /research-validation "Entity Name"
```

---

## EXAMPLE: Full Ruling Run

```
User: /research-ruling Cursor

Claude: I'll issue rulings on Cursor's validated assertions.

## PHASE 1: LOAD ENTITY AND UNRULED PAIRS

Loading entity...
Done. Entity found: Cursor (cmjk123abc)

Loading validations...
Done. Found 5 validations across 5 assertions.

Loading existing rulings...
Done. Found 0 existing rulings.

Unruled pairs: 5

## PHASE 2: ISSUE RULINGS

### R1: "Cursor routes all AI queries through Cursor's servers"
Validation Verdict: CONDITIONAL
Refined Claim: "Cursor sends LLM inference requests to Cursor's cloud servers; local preprocessing may occur."

Tension: MEDIUM - Original claim overstates certainty about ALL queries going to cloud.
Ruling: REVISE
Reasoning: Refined claim is materially more accurate. Readers would misunderstand the architecture without the qualification.
Action: Claim updated.

### R2: "Business tier is $40/user/month billed annually"
Validation Verdict: ROBUST

Tension: LOW - Validation confirmed exact pricing from official page.
Ruling: AFFIRM
Reasoning: No tension. Claim matches evidence exactly.
Action: None.

### R3: "Cursor does not offer self-hosted deployment"
Validation Verdict: CONDITIONAL
Conditions: ["Enterprise customers may have custom arrangements"]

Tension: LOW - Condition is speculative, not confirmed.
Ruling: AFFIRM
Reasoning: Speculative enterprise arrangements don't warrant revising a confirmed fact.
Action: None.

### R4: "Privacy Mode prevents code from being stored or used for training"
Validation Verdict: ROBUST

Tension: LOW - Well-documented feature.
Ruling: AFFIRM
Reasoning: Feature is clearly documented and verified.
Action: None.

### R5: "SOC 2 Type II certification in progress"
Validation Verdict: UNVERIFIABLE

Tension: MEDIUM - Cannot confirm or deny compliance status.
Ruling: REVISE
Reasoning: "In progress" is unverifiable. Revising to note uncertainty.
Action: Claim updated to "SOC 2 Type II certification status unconfirmed as of [date]."

## PHASE 3: RULING REPORT

# Ruling Report: Cursor

Ruled: 2026-02-13
Pairs Reviewed: 5
- AFFIRM: 3 (60%)
- REVISE: 2 (40%)
- OVERTURN: 0 (0%)

## Impact Summary

Claims Updated (2):
- "Cursor routes all AI queries..." → "Cursor sends LLM inference requests..."
- "SOC 2 Type II certification in progress" → "SOC 2 Type II certification status unconfirmed..."

Claims Affirmed (3): Pricing, deployment model, privacy mode

Recommended Next Steps:
1. Seek direct SOC 2 documentation from Cursor
2. Update deliverables to reflect refined architecture claim
3. Re-validate if new evidence emerges
```

---

## RELATED SKILLS

- `/research-validation` - **REQUIRED FIRST** - Produces adversarial validations
- `/research-entity` - Identifies pillar assertions
- `/research-project` - Sets project context
- `/research-discover` - Discovers entities

---

## WORKFLOW INTEGRATION

```
                    DISCOVERY
                        |
                        v
┌─────────────────────────────────────────┐
│           /research-entity               │
│   Identifies 5-10 pillar assertions     │
└─────────────────────────────────────────┘
                        |
                        v
┌─────────────────────────────────────────┐
│         /research-validation             │
│   Adversarially challenges each pillar  │
│   Verdicts: ROBUST/CONDITIONAL/WEAK/... │
└─────────────────────────────────────────┘
                        |
                        v
┌─────────────────────────────────────────┐
│          /research-ruling                │  <-- YOU ARE HERE
│   Analyzes tension, issues rulings      │
│   AFFIRM / REVISE / OVERTURN           │
│   Updates claims, rejects assertions    │
└─────────────────────────────────────────┘
                        |
                        v
┌─────────────────────────────────────────┐
│           HUMAN REVIEW                   │
│   Reviews OVERTURN decisions            │
│   Approves revised claims               │
└─────────────────────────────────────────┘
                        |
                        v
                  DELIVERABLES
```
