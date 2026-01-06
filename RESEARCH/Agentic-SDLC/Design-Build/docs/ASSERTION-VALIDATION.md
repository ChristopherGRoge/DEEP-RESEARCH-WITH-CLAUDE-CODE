# Human-in-the-Loop Assertion Validation

**Design Document | GenAI COTS Team | December 2025**

---

## Overview

This document defines the workflow for human validation of key assertions that underpin research conclusions. Every claim made by AI research agents must be traceable to a verifiable source, and critical claims require explicit human validation before they can be cited as evidence.

---

## Quick Start

```bash
# Generate the validation dashboard
npm run cli -- validation:generate '{"outputPath": "./validation-dashboard.html", "validatorName": "christopher.g.roge"}'

# Open in browser and review assertions
# Click source links to verify claims
# Copy validate/reject commands and run them
```

---

## Assertion Lifecycle

```
CLAIM → (Human Review) → EVIDENCE or REJECTED
                              ↓
                         (Re-research)
                              ↓
                      NEW CLAIM → EVIDENCE
                              ↓
                    (supersedes rejected)
```

| Status | Meaning |
|--------|---------|
| `CLAIM` | Agent-collected assertion, not yet validated |
| `EVIDENCE` | Human-validated assertion with verified source |
| `REJECTED` | Assertion deemed inaccurate, outdated, or unverifiable |

---

## What Constitutes a "Key Assertion"

Not all assertions require human validation. Prioritize validation for assertions that:

### Critical (Must Validate)

1. **Federal Compliance Claims**
   - FedRAMP authorization status
   - DoD IL level support
   - SOC 2, ISO 27001 certifications
   - Air-gap capability claims

2. **Security Architecture Claims**
   - Data residency guarantees
   - Telemetry/phone-home behavior
   - Encryption at rest/transit
   - Zero code retention policies

3. **Pricing and Licensing**
   - Per-user/per-seat costs
   - Open-source license type
   - Enterprise tier requirements

### Important (Should Validate)

4. **Integration Claims**
   - GovCloud endpoint support (Bedrock, Azure)
   - IDE compatibility
   - Local model support

5. **Company/Funding Information**
   - Funding status and investors
   - Customer references
   - Enterprise adoption claims

### Lower Priority (Validate as Time Permits)

6. **Feature Claims**
   - Capability descriptions
   - Performance benchmarks
   - Community metrics (GitHub stars, etc.)

---

## Validation Workflow

### Step 1: Identify Pending Assertions

```bash
# Get all pending claims for the project
npm run cli -- search:pending '{"projectId": "<project-id>"}'

# Get assertions without sources (highest priority)
npm run cli -- search:noSources '{"projectId": "<project-id>"}'

# Filter by category (e.g., compliance claims)
npm run cli -- assertion:search '{"category": "compliance", "status": "CLAIM"}'
```

### Step 2: Review Assertion

For each assertion, verify:

1. **Source URL**: Does the linked source exist and load?
2. **Quote Accuracy**: Does the quoted text appear on the source page?
3. **Claim Validity**: Does the quote support the claim being made?
4. **Currency**: Is the source recent enough to be reliable? (< 12 months for compliance claims)

```bash
# Get full assertion details
npm run cli -- assertion:get '{"assertionId": "<id>"}'
```

### Step 3: Validate or Reject

```bash
# If assertion is accurate and well-sourced
npm run cli -- assertion:validate '{"assertionId": "<id>", "validatedBy": "christopher.g.roge"}'

# If assertion is inaccurate or unverifiable
npm run cli -- assertion:reject '{"assertionId": "<id>", "validatedBy": "christopher.g.roge"}'
```

### Step 4: Add Missing Sources

If an assertion lacks a source but you find one:

```bash
npm run cli -- source:link '{
  "assertionId": "<id>",
  "sourceUrl": "https://example.com/docs",
  "quote": "Exact quote from the source"
}'
```

---

## Validation Checklist

Use this checklist when validating assertions:

### For Compliance Claims

- [ ] Source is official vendor documentation or federal database (FedRAMP Marketplace, etc.)
- [ ] Authorization date is specified
- [ ] Scope of authorization is clear (which products/services)
- [ ] No conflicting information found

### For Security Claims

- [ ] Source is vendor security whitepaper, SOC 2 report summary, or official docs
- [ ] Specific mechanism described (not just marketing language)
- [ ] No known vulnerabilities contradict the claim

### For Pricing Claims

- [ ] Source is official pricing page or sales documentation
- [ ] Date of pricing is noted (pricing changes frequently)
- [ ] Tier/edition is specified
- [ ] Hidden costs identified (infrastructure, implementation)

---

## Source Quality Hierarchy

When multiple sources exist, prefer in this order:

1. **Official vendor documentation** (highest reliability)
2. **FedRAMP Marketplace / DISA listings** (for compliance claims)
3. **GitHub repositories** (for technical claims)
4. **Analyst reports** (Gartner, Forrester)
5. **Press releases** (for funding/partnership announcements)
6. **Community forums** (lowest reliability - use only for sentiment)

---

## Batch Validation Session

For efficient validation, run a focused session:

### Preparation

```bash
# Export pending assertions to review
npm run cli -- search:pending '{"projectId": "<id>"}' > pending-review.json

# Group by entity for focused review
npm run cli -- assertion:list '{"entityId": "<entity-id>"}' | grep "CLAIM"
```

### During Session

1. Open the entity's vendor website in a browser
2. Work through assertions one by one
3. Validate/reject in batches of 10-20
4. Note any claims that need additional research

### After Session

```bash
# Verify progress
npm run cli -- search:summary '{"projectId": "<id>"}'

# Check remaining work
npm run cli -- search:pending '{"projectId": "<id>"}'
```

---

## Reporting

### Validation Metrics

Track these metrics to measure research quality:

| Metric | Target |
|--------|--------|
| Critical claims validated | 100% |
| Important claims validated | > 80% |
| Assertions with sources | > 95% |
| Rejection rate | < 20% |

### Generating Validation Report

```bash
# Get summary statistics
npm run cli -- search:summary '{"projectId": "<id>"}'

# Output includes:
# - Total assertions
# - Claims vs. Evidence vs. Rejected counts
# - Assertions pending validation
# - Sources by status
```

---

## Integration with Deliverables

### Before Generating EFFICACY Briefs

1. Run `search:pending` to identify unvalidated assertions
2. Prioritize validation for assertions cited in conclusions
3. Only cite `EVIDENCE` status assertions in final deliverables

### Assertion References in Documents

When citing an assertion in a deliverable:

```markdown
Tabby supports fully air-gapped deployment with no internet connectivity required.
[Source: Tabby Documentation - validated 2025-12-30]
```

The source reference links back to the validated assertion in the database.

---

## Example Validation Session

```bash
# 1. Start with critical compliance claims for Tabby
npm run cli -- assertion:search '{"query": "FedRAMP", "entityId": "<tabby-id>"}'

# 2. Review each assertion
npm run cli -- assertion:get '{"assertionId": "abc123"}'
# Output shows: claim, source URL, quote

# 3. Open source URL in browser, verify quote exists
# 4. Check if claim accurately represents the source

# 5. Validate if accurate
npm run cli -- assertion:validate '{"assertionId": "abc123", "validatedBy": "christopher.g.roge"}'

# 6. Or reject if inaccurate
npm run cli -- assertion:reject '{"assertionId": "abc123", "validatedBy": "christopher.g.roge"}'

# 7. Check progress
npm run cli -- search:summary '{"projectId": "<id>"}'
```

---

## Key Assertions for Design-Build Phase

The following assertions **must** be validated before finalizing recommendations:

### Tabby (9/10 Score Depends On)

- [ ] Apache 2.0 license (verify GitHub LICENSE file)
- [ ] Air-gapped deployment capability (verify docs)
- [ ] Zero telemetry by design (verify code/docs)
- [ ] Bedrock support via OpenAI-compatible API (verify docs)

### Continue.dev (8.5/10 Score Depends On)

- [ ] Apache 2.0 license (verify GitHub LICENSE file)
- [ ] Native AWS Bedrock provider (verify config docs)
- [ ] Native Azure OpenAI GovCloud support (verify config docs)
- [ ] Full offline mode with Ollama (verify docs)

### Claude Code (8.5/10 Score Depends On)

- [ ] FedRAMP High via Bedrock (verify AWS/Anthropic docs)
- [ ] DoD IL4/IL5 authorization (verify AWS GovCloud docs)
- [ ] Telemetry auto-disabled with Bedrock (verify docs)
- [ ] No air-gap support (confirm architectural limitation)

### Windsurf (8.5/10 Score Depends On)

- [ ] FedRAMP High authorization (verify FedRAMP Marketplace)
- [ ] DoD IL4/IL5/IL6 support (verify vendor docs)
- [ ] Self-hosted loses Cascade feature (verify docs)

---

## Re-Research Workflow

When an assertion is rejected, it triggers a re-research cycle. The AI agent must investigate further and provide a corrected or updated assertion.

### Step 1: Identify Rejected Assertions

```bash
# Get all rejected assertions that haven't been superseded
npm run cli -- assertion:rejectedForReresearch '{"projectId": "<id>"}'
```

### Step 2: AI Agent Re-Research

The AI agent receives the rejected assertion with its rejection reason and must:

1. **Understand the rejection**: Why was this claim rejected?
2. **Find new sources**: Search for updated or more authoritative sources
3. **Verify the claim**: Is the original claim correct with new evidence, or was it wrong?
4. **Create replacement assertion**: With proper source citations

### Step 3: Create Superseding Assertion

```bash
# Create the new, corrected assertion
npm run cli -- assertion:create '{
  "entityId": "<entity-id>",
  "claim": "Corrected claim with updated information",
  "category": "compliance",
  "criticality": "CRITICAL",
  "sourceUrl": "https://new-authoritative-source.com",
  "sourceQuote": "Exact quote supporting the claim",
  "reasoning": "This supersedes the rejected assertion because..."
}'

# Link the new assertion as superseding the rejected one
npm run cli -- assertion:supersede '{
  "rejectedId": "<rejected-assertion-id>",
  "newAssertionId": "<new-assertion-id>"
}'
```

### Step 4: Re-validate

The new assertion goes through the same human validation cycle:

1. Generate updated validation dashboard
2. Human reviews the new assertion
3. Validate or reject again

### Re-Research Triggers

An AI agent should initiate re-research when:

1. **Human rejects an assertion**: The rejection reason guides the re-research
2. **Source becomes stale**: URL returns 404 or content changed significantly
3. **Conflicting evidence found**: New information contradicts existing assertion
4. **Conclusion changes**: Research conclusions need to be updated

### Example Re-Research Cycle

```bash
# 1. Human rejects an assertion about FedRAMP status
npm run cli -- assertion:reject '{
  "assertionId": "abc123",
  "validatedBy": "christopher.g.roge",
  "rejectionReason": "FedRAMP Marketplace shows authorization expired 2024-06-01"
}'

# 2. AI agent gets rejected assertions
npm run cli -- assertion:rejectedForReresearch

# 3. AI agent researches and finds updated status
# ... AI performs web research ...

# 4. AI creates new assertion with current status
npm run cli -- assertion:create '{
  "entityId": "<entity-id>",
  "claim": "Windsurf FedRAMP High authorization renewed March 2025",
  "category": "compliance",
  "criticality": "CRITICAL",
  "sourceUrl": "https://marketplace.fedramp.gov/...",
  "sourceQuote": "Authorization Date: 2025-03-15",
  "reasoning": "Supersedes expired status. New authorization confirmed on FedRAMP Marketplace."
}'

# 5. AI links the supersession
npm run cli -- assertion:supersede '{
  "rejectedId": "abc123",
  "newAssertionId": "def456"
}'

# 6. Regenerate dashboard for human validation of new assertion
npm run cli -- validation:generate
```

---

## Validation Dashboard

The validation dashboard is a static HTML file that provides a visual interface for human review.

### Generating the Dashboard

```bash
npm run cli -- validation:generate '{
  "outputPath": "./validation-dashboard.html",
  "validatorName": "christopher.g.roge",
  "projectId": "<optional-project-id>"
}'
```

### Dashboard Features

1. **Criticality Grouping**: Assertions sorted by CRITICAL → HIGH → MEDIUM → LOW
2. **Source Links**: Direct links to source URLs for verification
3. **Quote Display**: Shows the quoted text used as evidence
4. **Copy-to-Clipboard**: One-click copy of validate/reject CLI commands
5. **Rejected Section**: Shows assertions pending re-research

### Workflow Integration

```
┌─────────────────┐
│  AI Research    │
│  (agents)       │
└────────┬────────┘
         │ creates assertions
         ▼
┌─────────────────┐
│  Database       │
│  (PostgreSQL)   │
└────────┬────────┘
         │ validation:generate
         ▼
┌─────────────────┐
│  Static HTML    │
│  Dashboard      │
└────────┬────────┘
         │ human reviews
         ▼
┌─────────────────┐
│  Human          │
│  (validates)    │
└────────┬────────┘
         │ CLI commands
         ▼
┌─────────────────┐
│  Database       │◀──── Rejected? → AI Re-research
│  (updated)      │
└────────┬────────┘
         │ regenerate
         ▼
┌─────────────────┐
│  Deliverables   │
│  (EFFICACY etc) │
└─────────────────┘
```

---

## CLI Command Reference

### Criticality Management

```bash
# Set criticality level
npm run cli -- assertion:setCriticality '{"assertionId": "<id>", "criticality": "CRITICAL"}'
# Values: CRITICAL, HIGH, MEDIUM, LOW

# Mark as cited in conclusions
npm run cli -- assertion:markCited '{"assertionId": "<id>", "conclusionContext": "Used in Tabby recommendation"}'

# Get pending validation (sorted by criticality)
npm run cli -- assertion:pendingValidation '{"projectId": "<id>"}'
```

### Validation Actions

```bash
# Validate (promotes CLAIM → EVIDENCE)
npm run cli -- assertion:validate '{"assertionId": "<id>", "validatedBy": "researcher-name"}'

# Reject (marks for re-research)
npm run cli -- assertion:reject '{"assertionId": "<id>", "validatedBy": "researcher-name", "rejectionReason": "Source outdated"}'

# Supersede (links new assertion to rejected one)
npm run cli -- assertion:supersede '{"rejectedId": "<old-id>", "newAssertionId": "<new-id>"}'
```

### Dashboard Generation

```bash
# Generate dashboard
npm run cli -- validation:generate '{"outputPath": "./dashboard.html", "validatorName": "name"}'
```

---

*Document Classification: Internal Use Only*
