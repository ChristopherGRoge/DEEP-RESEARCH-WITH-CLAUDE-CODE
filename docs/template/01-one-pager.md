# [TOOL NAME] Critical Assessment - Executive One-Pager (01)

**Purpose:** Ultra-concise executive briefing optimized to capture attention in the first 30 seconds. Maximum impact, minimum text.

**Content Philosophy:**
- Overview: 1 sentence (20-30 words)
- Critical Finding: 1-2 sentences (30-40 words)
- Recommendation: 1 sentence (10-15 words)
- Table Cells: 1-2 sentences each (25-40 words)
- Bottom Line: 1-2 sentences (20-30 words)

---

## Overview (Single Sentence)

**Pattern:** `[Purple: Core capability] with [Purple: Key differentiator]; [Purple: Critical constraint].`

**Target Length:** 20-30 words maximum

**Examples:**
- "Full-stack software delivery platform with SaaS and Self-Managed options supporting DoD via Platform One and AWS GovCloud."
- "Cloud-based AI testing platform with test generation and self-healing; AI brain cloud-only even in on-premise configurations."
- "AI observability platform for LLM evaluation and monitoring; hybrid model keeps app data local but metadata flows to cloud."

**Purple Highlights:** 3 key phrases only—no more

---

## Critical Finding (1-2 Sentences)

**Pattern:** `[Compliance status]. **[Bold: Architectural blocker]**.`

**Target Length:** 30-40 words maximum

**Key Elements:**
1. FedRAMP/compliance status (if relevant)
2. **Bold the single most critical constraint**
3. Federal viability in one phrase

**Examples:**
- "No FedRAMP but viable federal paths exist: Platform One, AWS GovCloud, or Self-Managed with FIPS. Core platform air-gap capable; **AIDA AI requires cloud connectivity**."
- "**AI processing remains cloud-dependent in all deployment models**—incompatible with air-gapped federal environments."
- "No FedRAMP with no stated roadmap. **Operational metadata flows to cloud**—likely CUI transmission for federal workloads."

---

## Recommendation (Single Sentence)

**Pattern:** `**[Decision]** | [One-phrase justification].`

**Target Length:** 10-15 words total

**Examples:**
- "**Proceed with Pilot** | Multiple authorized deployment paths; validate core platform value."
- "**Wait and Watch** | Cloud-dependent AI creates unresolved federal compliance questions."
- "**Conditional Proceed** for commercial | Metadata cloud dependency blocks federal."

**Decision Options:**
- Proceed with Pilot (green)
- Wait and Watch (yellow)
- Conditional Proceed (yellow)
- Halt (red - rare)

---

## Assessment Table (1-2 Sentences Per Cell)

**Target Length Per Cell:** 25-40 words

### Alignment to Stack
- Replaces what? OR complements what?
- 1-2 key integrations
- **Pattern:** `Replaces [tools]; integrates [systems]`

**Example:** "Replaces Jenkins, GitLab CI with unified platform and superior developer experience"

### Differentiation
- Proprietary or commodity tech?
- Real innovation or packaging?
- **Pattern:** `[Core strength]; [AI reality check]`

**Example:** "Platform orchestration strength; AIDA uses third-party LLMs"

### Security & Compliance
- FedRAMP? Platform One? GovCloud? Self-Managed?
- Use `<span class="highlight">` for critical gaps
- **Pattern:** `[Compliant paths]; [critical gap highlighted]`

**Example:** "<span class="highlight">Platform One cATO, GovCloud IL 2/4/5, FIPS-compliant Self-Managed</span>; no FedRAMP; AIDA unavailable Self-Managed"

### ROI Potential
- Quantified benefits only (~X% format)
- Brief caveat
- **Pattern:** `~X% [metric] (vendor reports, [caveat])`

**Example:** "~88-90% deployment time reduction, ~$500K+ savings (vendor reports, optimal conditions)"

### Industry Backing
- Named customers with scale
- Funding/valuation OR community strength
- **Pattern:** `[Customer (scale)], [financial backing/community]`

**Example:** "Citi (20K engineers), Fortune 100, DoD Platform One, GSI partnerships"

---

## Bottom Line (1-2 Sentences)

**Pattern:** `[Where viable]? [What's blocked]? [Next step].`

**Target Length:** 20-30 words total

**Examples:**
- "Federal viable via Platform One, GovCloud, or Self-Managed. Core platform fully functional locally. Pilot to validate ROI."
- "Commercial/low-side federal only where cloud processing permissible. Significant evaluation effort with no guarantee of favorable outcomes."
- "Commercial pilots only where cloud metadata transmission permissible. Federal: evaluate open-source alternatives or await FedRAMP."

---

## Writing Guidelines

### Eliminate:
- ❌ "Additionally," "Furthermore," "Moreover"
- ❌ "It should be noted that"
- ❌ Redundant phrases repeating table content
- ❌ Marketing fluff without substance
- ❌ Hedge words ("possibly," "potentially," "may")

### Maximize:
- ✅ Active voice: "Blocks federal use" not "Federal use is blocked"
- ✅ Specificity: "DoD IL 2/4/5" not "government cloud"
- ✅ Numbers: "~88%" not "significant"
- ✅ Named entities: "Platform One" not "authorized path"
- ✅ Bold for critical constraints only

### Concision Techniques:
- **Before:** "Harness lacks FedRAMP authorization but offers multiple viable federal access paths including Platform One"
- **After:** "No FedRAMP but viable federal paths exist: Platform One, GovCloud, Self-Managed with FIPS"

- **Before:** "The most critical finding for federal environment compatibility is that the AI processing occurs in the cloud"
- **After:** "**AI processing remains cloud-dependent**—incompatible with air-gapped environments"

---

## Color Coding (Same as 00-one-pager)

**Critical Finding:** Yellow gradient (#FEF3C7 to #FDE68A), amber border (#F59E0B)

**Recommendation Proceed:** Green gradient (#D1FAE5 to #A7F3D0), green border (#10B981)

**Recommendation Wait/Conditional:** Yellow gradient (#FEF3C7 to #FDE68A), amber border (#F59E0B)

**Bottom Line:** Purple gradient (#F3E8FF to #E9D5FF), purple border (#7500c0)

---

## Validation Checklist

Before publishing, verify:
- [ ] Can be read aloud in < 60 seconds
- [ ] Every sentence delivers new information (no redundancy)
- [ ] Critical constraint is **bold** and unmissable
- [ ] Decision is unambiguous (Proceed/Wait/Halt)
- [ ] Zero marketing fluff—all substance
- [ ] Fits on single slide without scrolling
- [ ] Executives understand recommendation without reading details

---

## Relationship to 00-one-pager

**00-one-pager:** Full context version (2-4 sentences per section)
- Use when: Stakeholder needs complete picture
- Audience: Technical reviewers, detailed evaluation

**01-one-pager:** Executive briefing version (1-2 sentences per section)
- Use when: Capturing room quickly, board-level presentations
- Audience: Executives, decision-makers with limited time

Both maintain identical format, structure, and branding—only text density differs.

---

*Template Version: January 2025*
*Optimized for: Executive briefings, rapid decision-making, board presentations*
