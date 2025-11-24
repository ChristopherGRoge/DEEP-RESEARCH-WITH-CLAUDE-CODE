# [TOOL NAME] Critical Assessment - One-Pager

**Instructions:** This template creates a concise one-page assessment suitable for executive presentations and slide decks. Focus on the most critical information for decision-making.

---

## Title
**[TOOL NAME] Critical Assessment**

Example: `Harness.io Critical Assessment`

---

## Overview Text (1.4em, black bold with purple highlights)

Write 1-2 sentences providing high-level characterization. Highlight 3-4 key phrases in purple.

**Pattern:** `[Purple highlight phrase 1]` connecting text `[purple highlight phrase 2]` connecting text `[purple highlight phrase 3]`.

**Example:**
```
Comprehensive software delivery platform spanning CI/CD, feature flags, security testing, chaos engineering, cloud cost management, and internal developer portal. Available as SaaS or Self-Managed Enterprise Edition.
```

**Purple highlights:** Key capabilities, deployment models, unique characteristics

---

## Critical Finding for Federal (Yellow gradient callout)

**Icon:** ⚠️ or ℹ️

State the single most significant technical or architectural limitation for federal use:
- Can it operate in air-gapped environments?
- What are fundamental blockers for classified workloads?
- Does architecture conflict with zero-trust deployments?

Use **bold** for emphasis on critical constraints.

**Pattern:**
```
[Tool] lacks/has [compliance status] but [alternative paths or constraints].
[Specific technical limitation]. [Impact on federal use].
**[Most critical constraint in bold]**.
```

---

## Recommendation (Green or yellow gradient callout)

Choose one:
- **Proceed with Pilot** (green gradient)
- **Proceed to Demo** (green gradient)
- **Conditional Proceed** (yellow gradient)
- **Wait and Watch** (yellow gradient)
- **Halt** (red gradient - rare)

**Pattern:** `**[Decision]** | [One-line justification]`

**Example:**
```
**Proceed with Pilot** | Multiple federal deployment paths exist; core platform viable
for local compute; assess whether value without AIDA justifies adoption.
```

---

## Assessment Dimensions (5-column horizontal table)

No section heading needed - table is self-explanatory.

| Alignment to Stack | Differentiation | Security & Compliance | ROI Potential | Industry Backing |
|--------------------|-----------------|----------------------|---------------|------------------|
| [Assessment] | [Assessment] | [Assessment] | [Assessment] | [Assessment] |

### Column Guidelines:

**Alignment to Stack:**
- Start with bold label: **Replaces existing tools**, **Fills gap**, **Complements stack**
- List specific tools it replaces or integrates with
- Describe positioning in existing workflows

**Differentiation:**
- Address AI claims - proprietary or third-party LLMs?
- What creates actual competitive moat?
- Platform integration vs. genuine innovation

**Security & Compliance:**
- Use highlighting for critical findings: `<span class="highlight">highlighted text</span>`
- FedRAMP status, Platform One availability, Gov Cloud support
- Air-gap capability, data residency, FIPS compliance
- Start with bold status label

**ROI Potential:**
- Vendor-reported metrics in ~X% format
- Specific cost savings with attribution
- Caveat about conditions and variability

**Industry Backing:**
- Specific customer deployments with scale
- Fortune 100 companies (named if public)
- GSI partnerships, community strength
- Capital backing and maturity indicators

---

## Bottom Line (Purple gradient callout)

Synthesize recommendation into 2-3 sentences:
1. Where is adoption viable? (deployment paths, environments)
2. What are the key constraints? (technical, compliance, architectural)
3. What validation is recommended? (pilot scope, due diligence)

**Pattern:**
```
[Adoption viability statement]. [Constraint acknowledgment].
[Recommended next step or validation approach].
```

---

## Footer

```
Document Classification: Internal Use Only
Contact: christopher.g.roge@afs.com
```

---

## Color Guidance

**Critical Finding:**
- Yellow gradient: `linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)`
- Border: `#F59E0B` (amber)
- Use for warnings, blockers, significant constraints

**Recommendation (Proceed/Positive):**
- Green gradient: `linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)`
- Border: `#10B981` (green)
- Use for "Proceed" recommendations

**Recommendation (Wait/Conditional):**
- Yellow gradient: `linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)`
- Border: `#F59E0B` (amber)
- Use for "Wait and Watch" or "Conditional Proceed"

**Bottom Line:**
- Purple gradient: `linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)`
- Border: `#7500c0` (core purple)
- Use for synthesis/summary

**Purple Highlights:**
- Core Purple: `#7500c0` - primary brand color for key phrases
- Accent Purple: `#a055f5` - secondary for table highlighting

---

## Typography

- **Headline:** Black (font-weight 700), purple underline, Graphik font
- **Overview:** Black (font-weight 600) at 1.4em, purple spans for key phrases
- **Callout Titles:** Black (font-weight 700) at 1.6em
- **Callout Content:** 1.2em with comfortable line-height
- **Table Headers:** White on purple background at 1.4em

---

## Content Length Guidelines

- **Overview:** 1-2 sentences, 30-50 words
- **Critical Finding:** 2-4 sentences, 50-80 words
- **Recommendation:** 1 sentence, 15-25 words
- **Each Table Cell:** 2-4 sentences, 40-70 words
- **Bottom Line:** 2-3 sentences, 40-60 words

**Total Target:** Fits on single slide or printed page

---

*Template Version: January 2025*
*Based on: Harness.io Critical Assessment*
