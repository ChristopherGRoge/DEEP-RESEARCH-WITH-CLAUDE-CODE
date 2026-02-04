---
name: research-validation
description: Adversarial validation of pillar assertions for an entity. Use when asked to "validate [entity]", "challenge assertions for [entity]", or "prove/disprove claims about [entity]". Applies skeptical analysis to identify weaknesses in evidence chains.
---

# Research Validation Skill (Adversarial Assertion Review)

Critically assesses pillar assertions identified by `/research-entity` using an **adversarial approach**. Instead of confirming claims, this skill actively tries to **disprove** assertions, exposing weaknesses in evidence chains and identifying conditions where claims might not hold.

**Key Principle**: If an assertion survives adversarial challenge, confidence increases. If weaknesses are found, the assertion is either refined or downgraded.

## Why Adversarial Validation?

| Traditional Validation | Adversarial Validation |
|------------------------|------------------------|
| "Does evidence support claim?" | "Can I find evidence that CONTRADICTS this claim?" |
| Confirmation bias risk | Actively seeks disconfirmation |
| "Screenshot shows X" | "What does screenshot NOT show? What's missing?" |
| Binary: Valid/Invalid | Spectrum: Robust → Conditional → Weak → Refuted |
| Assumes good faith in sources | Questions source reliability and completeness |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│              ADVERSARIAL VALIDATION WORKFLOW                 │
└─────────────────────────────────────────────────────────────┘
                              │
     ┌────────────────────────┼────────────────────────┐
     │                        │                        │
     ▼                        ▼                        ▼
┌─────────┐            ┌─────────┐            ┌─────────┐
│ PHASE 1 │──────────▶ │ PHASE 2 │──────────▶ │ PHASE 3 │
│  LOAD   │            │ ATTACK  │            │ VERDICT │
└─────────┘            └─────────┘            └─────────┘
     │                        │                        │
     │                        │                        │
     ▼                        ▼                        ▼
 Load entity           For each pillar:          Aggregate
 + pillars             - Counter-search          verdicts
 + evidence            - Evidence gaps           + report
                       - Logic flaws
                       - Scope limits
```

## Validation Verdicts

| Verdict | Meaning | Confidence Impact |
|---------|---------|-------------------|
| **ROBUST** | Survived adversarial challenge; no weaknesses found | Increase to HIGH |
| **CONDITIONAL** | True under specific conditions; limitations identified | Maintain at MEDIUM |
| **WEAK** | Evidence gaps or logical flaws found | Decrease to LOW |
| **REFUTED** | Counter-evidence found that contradicts claim | Mark as REJECTED |
| **UNVERIFIABLE** | Cannot confirm OR refute with available evidence | Flag for human review |

## Commands

```
/research-validation <entity-name>           # Validate entity by name
/research-validation --id <entity-id>        # Validate entity by ID
/research-validation --assertion <id>        # Validate single assertion
/research-validation --quick <entity-name>   # Quick validation (no web search)
/research-validation help                    # Verbose overview
/research-validation commands                # CLI command reference
```

---

## EXECUTION PROTOCOL

### MODE: `help`

Display comprehensive overview. Output EXACTLY this format:

```
## Research Validation Skill

Adversarial validation of pillar assertions using skeptical analysis.

### Philosophy

Instead of asking "Is this claim true?", this skill asks:
- "How could this claim be WRONG?"
- "What evidence would CONTRADICT this?"
- "Under what CONDITIONS does this claim NOT hold?"
- "What is MISSING from the evidence chain?"

### Why Adversarial?

Traditional validation suffers from confirmation bias. Adversarial validation:
- Actively seeks disconfirming evidence
- Identifies hidden assumptions
- Exposes scope limitations
- Reveals evidence gaps

### Validation Verdicts

| Verdict | Meaning |
|---------|---------|
| ROBUST | Claim survived challenge, high confidence |
| CONDITIONAL | True with caveats or limitations |
| WEAK | Evidence gaps or logical flaws found |
| REFUTED | Counter-evidence contradicts claim |
| UNVERIFIABLE | Cannot confirm or refute |

### Usage

/research-validation <entity-name>
/research-validation --id <entity-id>
/research-validation --assertion <assertion-id>
/research-validation --quick <entity-name>  # Skip web search

### Workflow

1. Load entity and pillar assertions
2. For each pillar, execute adversarial challenges:
   - Search for contradicting information
   - Re-examine evidence with skeptical eye
   - Identify unstated assumptions
   - Check for scope limitations
3. Assign verdicts with reasoning
4. Generate validation report

### Related Skills

- /research-entity - Identifies pillar assertions (run BEFORE validation)
- /research-project - Sets project context
- /research-discover - Discovers entities
```

---

### MODE: `commands`

Display minimal CLI reference. Output EXACTLY this format:

```
## CLI Commands

# Skill commands
/research-validation <entity-name>
/research-validation --id <entity-id>
/research-validation --assertion <assertion-id>
/research-validation --quick <entity-name>
/research-validation help
/research-validation commands

# Load entity and pillar assertions
npm run cli -- entity:get '{"entityId": "..."}'
npm run cli -- assertion:search '{"entityId": "...", "citedInConclusion": true}'
npm run cli -- assertion:search '{"entityId": "...", "criticality": "CRITICAL"}'

# Get assertion with evidence
npm run cli -- assertion:get '{"assertionId": "..."}'

# Load extraction evidence
npm run cli -- extract:list '{"entityId": "..."}'
npm run cli -- extract:latest '{"entityId": "...", "schemaType": "..."}'

# Store validation result (structured storage)
npm run cli -- validation:create '{"assertionId": "...", "verdict": "CONDITIONAL", "confidence": "HIGH", "method": "ADVERSARIAL", ...}'
npm run cli -- validation:get '{"validationId": "..."}'
npm run cli -- validation:list '{"entityId": "..."}'
npm run cli -- validation:summary '{"entityId": "..."}'
npm run cli -- validation:pillars '{"entityId": "..."}'
npm run cli -- validation:unvalidated '{"entityId": "..."}'

# Citation verification (REQUIRED before citing quotes)
npm run cli -- cite:verify '{"url": "...", "quote": "exact text"}'
npm run cli -- citation:create '{"url": "...", "quote": "...", "found": true, ...}'
npm run cli -- citation:find '{"url": "...", "quote": "..."}'

# Create counter-assertion if refuted
npm run cli -- assertion:create '{"entityId": "...", "claim": "COUNTER: ...", "category": "validation_counter", ...}'

# Web search for counter-evidence
# Use WebSearch tool with adversarial queries
```

---

### MODE: `<entity-name>` or `--id <entity-id>` (Primary Execution)

Follow this EXACT sequence when /research-validation is invoked:

---

## PHASE 1: LOAD ENTITY AND PILLARS

**Goal**: Retrieve entity and all pillar assertions to be validated

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

### Step 1.2: Load Pillar Assertions

```bash
# Get assertions marked as pillars (citedInConclusion=true)
npm run cli -- assertion:search '{"entityId": "ENTITY_ID", "citedInConclusion": true}'

# Also get CRITICAL assertions
npm run cli -- assertion:search '{"entityId": "ENTITY_ID", "criticality": "CRITICAL"}'
```

**If no pillar assertions found:**
```
WARNING: No pillar assertions found for ENTITY_NAME.

This entity may not have been deep-researched yet.
Run first: /research-entity ENTITY_NAME

Or validate all assertions:
npm run cli -- assertion:list '{"entityId": "ENTITY_ID"}'
```

### Step 1.3: Load Evidence

For each pillar assertion, load its evidence:

```bash
# Get full assertion details including evidence fields
npm run cli -- assertion:get '{"assertionId": "ASSERTION_ID"}'
```

Extract:
- `claim` - The assertion text
- `evidenceDescription` - What the screenshot shows
- `evidenceScreenshotPath` - Path to visual evidence
- `sourceUrl` - Reference URL
- `reasoning` - Why this is a pillar

**Output of Phase 1**: Entity + list of pillar assertions with evidence

---

## PHASE 2: ADVERSARIAL ATTACK (Per Assertion)

**Goal**: Challenge each pillar assertion using adversarial techniques

**CRITICAL: This is the core innovation. Claude acts as a skeptical adversary.**

### Step 2.1: Frame the Adversarial Challenge

For each pillar assertion, Claude generates an **adversarial prompt**:

```markdown
## ADVERSARIAL CHALLENGE

**Assertion Under Attack:**
"[CLAIM TEXT]"

**Your Mission:**
You are a SKEPTICAL ADVERSARY. Your job is NOT to confirm this claim, but to DISPROVE it.

**Assume the assertion is FALSE until proven otherwise.**

### Attack Vectors

1. **COUNTER-EVIDENCE SEARCH**
   - Search for information that CONTRADICTS this claim
   - Query: "[Entity] NOT [claim characteristic]"
   - Query: "[Entity] limitations [topic]"
   - Query: "[Entity] problems [topic]"
   - Query: "[Entity] vs [competitor] [topic]" (competitors may reveal gaps)

2. **EVIDENCE GAP ANALYSIS**
   - Re-read the screenshot at: [evidenceScreenshotPath]
   - What does the screenshot NOT show?
   - Is the quoted text taken out of context?
   - Could the source be biased (vendor marketing)?
   - Is the evidence from an authoritative source?
   - When was this evidence captured? Is it stale?

3. **LOGICAL FLAW DETECTION**
   - Is there a logical leap from evidence to conclusion?
   - Are there unstated assumptions?
   - Could correlation be mistaken for causation?
   - Is the sample size sufficient?

4. **SCOPE LIMITATION IDENTIFICATION**
   - Under what CONDITIONS is this claim NOT true?
   - Does it only apply to certain tiers/plans?
   - Does it only apply to certain deployment models?
   - Are there geographic or regulatory exceptions?
   - Is this time-bound (promotional pricing, beta features)?

5. **ALTERNATIVE EXPLANATION**
   - Could the evidence support a DIFFERENT conclusion?
   - Is there a more parsimonious explanation?
   - Could this be marketing language misinterpreted as fact?

### Required Output

After applying all attack vectors, report:

**Verdict**: ROBUST | CONDITIONAL | WEAK | REFUTED | UNVERIFIABLE

**Attack Results:**
- Counter-evidence found: [Yes/No] - [details]
- Evidence gaps identified: [Yes/No] - [details]
- Logical flaws detected: [Yes/No] - [details]
- Scope limitations found: [Yes/No] - [details]
- Alternative explanations possible: [Yes/No] - [details]

**Confidence Level**: HIGH | MEDIUM | LOW

**Refined Claim** (if CONDITIONAL or WEAK):
"[More accurate version of the claim with caveats]"

**Validation Notes**:
[2-3 sentences explaining the verdict]
```

### Step 2.2: Execute Counter-Evidence Search

**CRITICAL: Only skip web search if `--quick` flag was provided.**

**MANDATORY CITATION VERIFICATION**: Before citing ANY quote from a URL, you MUST run:

```bash
npm run cli -- cite:verify '{"url": "URL", "quote": "exact quote to verify"}'
```

**Interpret results:**
- `recommendation: "CITE"` → Quote verified, safe to cite
- `recommendation: "PARAPHRASE"` → Quote NOT found, use `similarPhrases` instead
- `recommendation: "DO_NOT_CITE"` → Quote doesn't exist, don't cite this
- `recommendation: "PAGE_NOT_FOUND"` → URL is invalid/inaccessible

**NEVER cite WebSearch snippets directly** - they may be:
- Outdated (page changed since indexing)
- Hallucinated (AI-generated summaries)
- Paraphrased (not actual quotes)
- From deleted pages

Generate adversarial search queries:

```python
# Query patterns for counter-evidence
adversarial_queries = [
    f'"{entity_name}" problems {topic}',
    f'"{entity_name}" limitations {topic}',
    f'"{entity_name}" NOT {positive_claim}',
    f'"{entity_name}" vs {competitor} {topic}',
    f'"{entity_name}" issues 2026',
    f'"{entity_name}" complaints',
    f'"{entity_name}" {topic} reality vs marketing',
]
```

Use WebSearch to find potential counter-evidence:

```
WebSearch: "[Entity] pricing hidden fees"
WebSearch: "[Entity] self-hosted NOT available"
WebSearch: "[Entity] security breach vulnerability"
```

### Step 2.3: Re-Examine Screenshot Evidence

**Read the screenshot with SKEPTICAL eyes:**

```bash
# Load the screenshot
Read: [evidenceScreenshotPath]
```

**Questions to ask:**
1. Does the text EXACTLY match the claim, or is it paraphrased?
2. Is there fine print or asterisks that qualify the claim?
3. Is this clearly from an official source or could it be outdated?
4. What ISN'T shown on this screenshot?
5. Is this a marketing page (biased) or documentation (more reliable)?

### Step 2.4: Identify Scope Limitations

Common scope limitations to check:

| Claim Type | Potential Limitations |
|------------|----------------------|
| **Pricing** | Requires annual billing? Minimum seats? Different for enterprise? |
| **Feature** | Only in certain tiers? Beta/preview? Geographic restrictions? |
| **Compliance** | Pending vs. certified? Specific environment only? |
| **Deployment** | Requires specific cloud? Additional cost? Limited regions? |
| **Performance** | Under what conditions? Benchmark methodology? |

### Step 2.5: Generate Verdict

Based on attack results, assign verdict:

**ROBUST** - Assign when:
- No counter-evidence found despite searching
- Evidence is from authoritative source (official docs, not marketing)
- No logical flaws in reasoning
- Claim is appropriately scoped (not overclaiming)

**CONDITIONAL** - Assign when:
- Claim is true but with important caveats
- Scope limitations identified
- Evidence is solid but context matters
- Example: "True for Enterprise tier, not confirmed for Pro"

**WEAK** - Assign when:
- Evidence gaps found (screenshot doesn't fully support)
- Logical leap between evidence and conclusion
- Source reliability questionable (marketing vs. docs)
- Stale evidence (6+ months old)

**REFUTED** - Assign when:
- Counter-evidence directly contradicts claim
- Screenshot contradicts assertion text
- Authoritative source says opposite

**UNVERIFIABLE** - Assign when:
- No evidence for OR against
- Claim is about internal implementation (can't verify)
- Source is unavailable/paywalled

---

## PHASE 3: RECORD VERDICTS

**Goal**: Persist validation results and generate report

### Step 3.1: Store Validation Results

Use the structured validation storage system to persist each validation result. This stores:
- Verdict and confidence level
- Attack vector results (all 5 vectors)
- Counter-evidence with verified quotes
- Conditions for CONDITIONAL verdicts
- Refined claims where needed

**Create validation result for each assertion:**

```bash
npm run cli -- validation:create '{
  "assertionId": "ASSERTION_ID",
  "verdict": "CONDITIONAL",
  "confidence": "HIGH",
  "method": "ADVERSARIAL",
  "refinedClaim": "Cline transmits code to AI providers when using Cline-provided API keys",
  "attackResults": {
    "counterEvidence": {"challenged": false},
    "evidenceGap": {"challenged": true, "finding": "Only applies to Cline API keys, not user-provided keys", "severity": "major"},
    "logicalFlaw": {"challenged": false},
    "scopeLimitation": {"challenged": true, "finding": "Privacy policy language is ambiguous", "severity": "minor"},
    "alternativeExplanation": {"challenged": false}
  },
  "counterEvidence": [
    {"quote": "verified quote text", "sourceUrl": "https://...", "verified": true}
  ],
  "conditions": [
    {"condition": "User must be using Cline-provided API keys", "implication": "If using own keys, data goes directly to provider"}
  ],
  "summary": "Claim is valid but only for a subset of users",
  "recommendations": "Clarify in reports that this applies to Cline API key users only",
  "validatorId": "validation-agent-001"
}'
```

**Verdict-specific patterns:**

**If ROBUST:**
- `verdict`: "ROBUST"
- `confidence`: "HIGH"
- `attackResults`: All vectors have `challenged: false`
- `summary`: "Survived all adversarial challenges"

**If CONDITIONAL:**
- `verdict`: "CONDITIONAL"
- `confidence`: "HIGH" or "MEDIUM"
- `conditions`: Array of condition/implication pairs
- `refinedClaim`: Reworded claim with qualifiers

**If WEAK:**
- `verdict`: "WEAK"
- `confidence`: "LOW"
- `attackResults`: Has vectors with `challenged: true` and `severity: "major"`
- `recommendations`: What additional evidence is needed

**If REFUTED:**
- `verdict`: "REFUTED"
- `confidence`: "HIGH"
- `counterEvidence`: Array of verified quotes that contradict the claim
- Create a counter-assertion with the actual truth

```bash
# Create counter-assertion for refuted claims
npm run cli -- assertion:create '{
  "entityId": "ENTITY_ID",
  "claim": "COUNTER: [What is actually true]",
  "category": "validation_counter",
  "evidenceDescription": "[Evidence for counter-claim]",
  "sourceUrl": "[Source URL]",
  "reasoning": "Refutes original claim: [original claim text]"
}'
```

**If UNVERIFIABLE:**
- `verdict`: "UNVERIFIABLE"
- `confidence`: "UNKNOWN"
- `recommendations`: What would be needed to verify

### Automatic Status Updates

When you create a validation result:
- **ROBUST/CONDITIONAL** → Assertion status automatically set to `EVIDENCE`
- **REFUTED** → Assertion status automatically set to `REJECTED`
- **WEAK/UNVERIFIABLE** → Assertion status unchanged (remains `CLAIM`)

### Query Validation Results

```bash
# Get all validations for an entity
npm run cli -- validation:list '{"entityId": "..."}'

# Get validation summary
npm run cli -- validation:summary '{"entityId": "..."}'

# Get pillar assertions needing validation
npm run cli -- validation:pillars '{"entityId": "..."}'

# Get unvalidated assertions
npm run cli -- validation:unvalidated '{"entityId": "..."}'
```

### Step 3.2: Generate Validation Report

```markdown
# Adversarial Validation Report: [ENTITY_NAME]

**Validated**: [Date]
**Pillars Reviewed**: [N]
**Verdict Distribution**:
- ROBUST: [N] ([%])
- CONDITIONAL: [N] ([%])
- WEAK: [N] ([%])
- REFUTED: [N] ([%])
- UNVERIFIABLE: [N] ([%])

## Executive Summary

[2-3 sentences summarizing validation outcome]

**Overall Confidence in Research**: [HIGH | MEDIUM | LOW]

If majority ROBUST → Research conclusions can be trusted
If majority CONDITIONAL → Research valid with noted caveats
If majority WEAK/REFUTED → Research conclusions at risk; re-evaluate

---

## Pillar-by-Pillar Results

### P1: [Claim Text]

**Original Category**: [Architecture/Pricing/Capability/etc.]
**Verdict**: [ROBUST/CONDITIONAL/WEAK/REFUTED/UNVERIFIABLE]
**Confidence**: [HIGH/MEDIUM/LOW]

**Attack Results**:
| Attack Vector | Result | Details |
|---------------|--------|---------|
| Counter-Evidence Search | [Pass/Fail] | [Details] |
| Evidence Gap Analysis | [Pass/Fail] | [Details] |
| Logical Flaw Detection | [Pass/Fail] | [Details] |
| Scope Limitations | [Found/None] | [Details] |
| Alternative Explanations | [Found/None] | [Details] |

**Validation Notes**: [Detailed reasoning]

**Refined Claim** (if applicable): "[Updated claim with caveats]"

---

### P2: [Claim Text]

[Repeat for each pillar]

---

## Implications for Research Conclusions

### If Pillars Were ROBUST:
[Recommendations now have higher confidence]

### If Pillars Were CONDITIONAL:
[Note the caveats in any recommendations]

### If Pillars Were WEAK/REFUTED:
[Specific recommendations may need revision]

---

## Recommended Actions

1. [Action based on validation results]
2. [Action based on validation results]
3. [Action based on validation results]

---

## Validation Commands Used

```bash
# Re-validate specific assertion
npm run cli -- assertion:get '{"assertionId": "..."}'

# See all validation notes
npm run cli -- assertion:search '{"entityId": "...", "validatedBy": "adversarial-review"}'

# View counter-assertions created
npm run cli -- assertion:search '{"entityId": "...", "category": "validation_counter"}'
```
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

### No Pillar Assertions
```
WARNING: No pillar assertions found for "Entity Name".

This entity needs deep research first.

Run: /research-entity "Entity Name"

Or validate all assertions (not just pillars):
/research-validation "Entity Name" --all
```

### Evidence Screenshot Missing
```
WARNING: Evidence screenshot not found: screenshots/2026-01/missing.png

Cannot perform visual evidence review for this assertion.
Verdict will be based on other factors only.

Recommendation: Re-extract evidence:
npm run cli -- extract:fetch '{"url": "[sourceUrl]", "entityId": "..."}'
```

### Counter-Evidence Search Fails
```
WARNING: WebSearch returned no results for adversarial queries.

Proceeding with evidence review only.
Confidence in ROBUST verdict may be lower without exhaustive counter-search.
```

---

## EXAMPLE: Full Validation Run

```
User: /research-validation Cursor

Claude: I'll perform adversarial validation on Cursor's pillar assertions.

## PHASE 1: LOAD ENTITY AND PILLARS

Loading entity...
✓ Entity found: Cursor (cmjk123abc)

Loading pillar assertions...
✓ Found 5 pillar assertions marked citedInConclusion=true

Pillars to validate:
1. [P1-ARCH] "Cursor routes all AI queries through Cursor's servers"
2. [P1-PRICE] "Business tier is $40/user/month billed annually"
3. [P2-ARCH] "Cursor does not offer self-hosted deployment"
4. [P2-ARCH] "Privacy Mode prevents code from being stored or used for training"
5. [P2-COMPL] "SOC 2 Type II certification in progress"

## PHASE 2: ADVERSARIAL ATTACK

### Attacking P1: "Cursor routes all AI queries through Cursor's servers"

**Adversarial Challenge Initiated**

**Attack Vector 1: Counter-Evidence Search**
Searching for: "Cursor local AI" "Cursor offline mode" "Cursor self-hosted inference"
→ Found: No evidence of local inference capability
→ Result: PASS (no counter-evidence)

**Attack Vector 2: Evidence Gap Analysis**
Re-reading screenshot: screenshots/2026-01/cursor-arch-abc123.png
→ Screenshot shows architecture diagram with "Cursor Cloud" label
→ BUT: Diagram doesn't explicitly show ALL queries go to cloud
→ Potential gap: What about autocomplete vs. chat vs. code generation?
→ Result: MINOR GAP (scope ambiguity)

**Attack Vector 3: Logical Flaw Detection**
→ Architecture diagram shows cloud, but doesn't prove NO local processing
→ Some processing may occur locally (e.g., debouncing, caching)
→ Result: MINOR FLAW (overclaim possible)

**Attack Vector 4: Scope Limitations**
→ May differ between Free/Pro/Business tiers
→ May differ between features (completion vs. chat vs. code search)
→ Result: SCOPE LIMITED

**Attack Vector 5: Alternative Explanation**
→ "AI queries" could be interpreted narrowly or broadly
→ Local preprocessing likely, cloud for LLM inference
→ Result: ALTERNATIVE EXISTS

**VERDICT: CONDITIONAL**

**Refined Claim**: "Cursor sends LLM inference requests to Cursor's cloud servers; local preprocessing may occur for features like autocomplete debouncing."

**Validation Notes**: Original claim technically accurate but overstates certainty. Evidence shows cloud architecture but doesn't rule out local processing for non-LLM features.

---

### Attacking P2: "Business tier is $40/user/month billed annually"

**Attack Vector 1: Counter-Evidence Search**
Searching for: "Cursor pricing changed" "Cursor Business price increase"
→ Found: No evidence of price change
→ Result: PASS

**Attack Vector 2: Evidence Gap Analysis**
Re-reading screenshot: screenshots/2026-01/cursor-pricing-xyz789.png
→ Screenshot clearly shows: "Business - $40/user/month (billed annually)"
→ Text is exact match, from official pricing page
→ Result: PASS

**Attack Vector 3: Scope Limitations**
→ "Billed annually" noted - monthly billing may differ
→ Volume discounts possible for enterprise
→ Result: MINOR LIMITATION (billing cycle noted)

**VERDICT: ROBUST**

**Validation Notes**: Claim verified exactly from official pricing page. Annual billing requirement appropriately noted in original claim.

---

[Continue for remaining pillars...]

## PHASE 3: VALIDATION REPORT

# Adversarial Validation Report: Cursor

**Validated**: 2026-02-02
**Pillars Reviewed**: 5
**Verdict Distribution**:
- ROBUST: 2 (40%)
- CONDITIONAL: 2 (40%)
- WEAK: 0 (0%)
- REFUTED: 0 (0%)
- UNVERIFIABLE: 1 (20%)

## Executive Summary

Cursor's pillar assertions largely survived adversarial challenge. Two claims are ROBUST (pricing, privacy mode). Two are CONDITIONAL with scope limitations (architecture routing, deployment options). One compliance claim is UNVERIFIABLE without direct SOC 2 documentation.

**Overall Confidence in Research**: MEDIUM-HIGH

Recommendations based on this research remain valid, with noted caveats around deployment flexibility and compliance timeline.

## Implications

- Pricing recommendation: HIGH CONFIDENCE
- Architecture assessment: MEDIUM CONFIDENCE (add caveats)
- Compliance timeline: LOW CONFIDENCE (requires verification)

## Next Steps

1. Update world-view document with conditional caveats
2. Seek SOC 2 documentation directly from Cursor
3. Clarify local vs. cloud processing with Cursor sales team

---

Updated 3 assertions in database.
Created 2 refined assertions for CONDITIONAL verdicts.
```

---

## ADVERSARIAL QUERY PATTERNS

### Pricing Claims
```
"[Entity] hidden fees"
"[Entity] price increase"
"[Entity] pricing changed 2026"
"[Entity] minimum commitment"
"[Entity] pricing vs [competitor]"
```

### Feature Claims
```
"[Entity] [feature] NOT working"
"[Entity] [feature] limitations"
"[Entity] [feature] bugs"
"[Entity] missing [feature]"
"[Entity] [feature] enterprise only"
```

### Compliance Claims
```
"[Entity] security breach"
"[Entity] data privacy concerns"
"[Entity] FedRAMP denied"
"[Entity] SOC 2 failed"
"[Entity] compliance issues"
```

### Deployment Claims
```
"[Entity] cloud only"
"[Entity] self-hosted issues"
"[Entity] on-premise limitations"
"[Entity] requires internet"
"[Entity] offline mode missing"
```

---

## RELATED SKILLS

- `/research-entity` - **REQUIRED FIRST** - Identifies pillar assertions
- `/research-project` - Sets project context
- `/research-discover` - Discovers entities
- `/research` - Full research orchestration

---

## WORKFLOW INTEGRATION

```
                    DISCOVERY
                        │
                        ▼
┌─────────────────────────────────────────┐
│           /research-entity               │
│   Identifies 5-10 pillar assertions     │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│         /research-validation             │  ◄── YOU ARE HERE
│   Adversarially challenges each pillar  │
│   Verdicts: ROBUST/CONDITIONAL/WEAK/... │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│           HUMAN REVIEW                   │
│   Reviews WEAK/REFUTED/UNVERIFIABLE     │
│   Approves ROBUST for conclusions       │
└─────────────────────────────────────────┘
                        │
                        ▼
                  DELIVERABLES
```

---

## QUICK MODE (`--quick`)

Skip web search for faster validation (evidence review only):

```
/research-validation --quick Cursor
```

**When to use:**
- Already confident in evidence quality
- Just need evidence gap analysis
- No internet access
- Quick sanity check

**Limitations:**
- Cannot find counter-evidence
- ROBUST verdict less certain
- May miss recent changes
