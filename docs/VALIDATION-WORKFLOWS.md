# Validation Tool - Workflow Documentation

This document provides comprehensive documentation of all validation workflows, agent reasoning instructions, and architectural decisions in the validation tool.

---

## Table of Contents

1. [Overview](#overview)
2. [Workflow A: Normal Validation (Begin Validation)](#workflow-a-normal-validation)
3. [Workflow B: Critical AI Assessment](#workflow-b-critical-ai-assessment)
4. [Workflow C: Gap Investigation Research](#workflow-c-gap-investigation-research)
5. [Agent Prompts and Instructions](#agent-prompts-and-instructions)
6. [Data Flow Diagrams](#data-flow-diagrams)
7. [State Transitions](#state-transitions)

---

## Overview

The validation tool implements a **human-in-the-loop** validation system where AI agents assist human researchers in verifying assertions (claims) collected during deep research. The system is designed around the principle that **AI assists but humans decide**.

### Key Design Principles

1. **Evidence-First Protocol**: Screenshots are primary evidence, URLs are secondary references
2. **Closed-Loop Assessment**: AI assessment uses ONLY provided evidence, no external knowledge
3. **Human Authority**: Validation/rejection decisions are made by humans via UI buttons
4. **Gap-Filling Research**: AI can investigate specific evidence gaps when directed by humans

### Assertion Lifecycle

```
CLAIM (initial) ──┬──> [AI Assessment] ──> Verdict + Gaps
                  │
                  ├──> [Gap Investigation] ──> New Evidence
                  │
                  └──> [Human Validation]
                        ├──> EVIDENCE (validated)
                        ├──> REJECTED (with reason)
                        └──> in_progress (skipped)
```

---

## Workflow A: Normal Validation

**Trigger**: User clicks "Begin Validation" button

### Purpose
Start an interactive validation session where a human researcher works with Claude to verify an assertion. Claude provides helpful context (source URLs) and answers questions, but does NOT make validation decisions.

### Step-by-Step Flow

1. **User Action**: Click "Begin Validation" button
   - Requires validator name to be entered
   - Assertion must be selected in sidebar

2. **Frontend Handler** (`app.js:427-451`):
   ```javascript
   async startAssertionValidation() {
     // Save validator name to localStorage
     localStorage.setItem('validatorName', this.validatorName);

     // Ensure conversation exists and set to in_progress
     const conv = this.ensureConversation(this.currentAssertionId);
     conv.status = 'in_progress';

     // Connect WebSocket if needed
     if (!this.wsConnected) {
       this.connectWebSocket();
       await new Promise(resolve => setTimeout(resolve, 500));
     }

     // Start session with assertionId
     this.sendWs({
       type: 'start_session',
       validatorName: this.validatorName.trim(),
       assertionId: this.currentAssertionId,
     });
   }
   ```

3. **WebSocket Handler** (backend receives `start_session` message)

4. **Session Creation** (`session.ts:33-115`):
   - Creates Claude Agent SDK session
   - Configures MCP server with validation tools
   - Sets up streaming input queue for real-time messaging

5. **Initial Prompt** (sent to Claude):
   ```
   Validation session started for assertion {assertionId}. Validator: {name}.

   The assertion details are already visible in the UI above - do NOT restate the claim.

   Use get_assertion_by_id to fetch the assertion data, then:
   1. Briefly greet the researcher by name
   2. Provide the source URL(s) they should visit to verify the claim
   3. Ask if they have any questions

   Keep your response concise - just the greeting, URL(s), and offer to help.
   ```

6. **Claude Response**: Uses `get_assertion_by_id` tool, then provides greeting with source URLs

7. **Interactive Phase**:
   - User can ask questions via textarea + "Ask" button
   - Claude answers using sources and domain knowledge
   - User can paste screenshots (Ctrl+V) as evidence

8. **Decision Phase**:
   - User enters verification notes in textarea
   - User clicks Validate/Reject/Skip button
   - Message sent with `[VALIDATE]` or `[REJECT]` prefix
   - Claude acknowledges: "Noted."

9. **Status Update**:
   - Conversation status updated (`validated`, `rejected`, or stays `in_progress`)
   - Screenshots uploaded to `/api/assertions/{id}/evidence`
   - URLs extracted from verification text added as researcher sources
   - Sidebar and counts refreshed

### Agent Tools Available

| Tool | Purpose |
|------|---------|
| `get_assertion_by_id` | Fetch assertion details including sources |
| `add_validation_note` | Add notes to validation dialogue |
| `create_followup_assertion` | Create new assertion from discovery |

**Deliberately REMOVED**: `validate_assertion`, `reject_assertion` - human must click UI buttons

### System Prompt for Normal Validation

```
You are a research validation assistant helping a human researcher verify assertions
(claims) collected by AI research agents.

## Your Role

You are a RESEARCH ASSISTANT, not a decision-maker. The human makes all validation
decisions via UI buttons.

## IMPORTANT: The Assertion is Already Displayed

The assertion details (entity, claim, sources, reasoning, criticality) are ALREADY
VISIBLE in the UI above this chat. DO NOT restate or summarize the assertion.

## Your Workflow

1. When a session starts, briefly greet and ask if they have questions about the claim
2. When they ask questions, ANSWER THEM thoughtfully using:
   - The source information available
   - Your knowledge of the domain
   - Logical reasoning about the claim
3. When they indicate they've validated or rejected (message contains [VALIDATE] or [REJECT]):
   - Simply acknowledge: "Noted."
   - The UI has already recorded their decision
   - Do NOT call any tools - the decision is already made

## CRITICAL: You Do NOT Control Validation

- You have NO validate_assertion or reject_assertion tools
- The researcher clicks UI buttons to validate/reject
- When you see [VALIDATE] or [REJECT], just acknowledge briefly and stop

## Guidelines

- Be concise - the assertion details are already visible
- When answering questions, be thorough and helpful
- After validation/rejection acknowledgment, STOP
```

---

## Workflow B: Critical AI Assessment

**Trigger**: User clicks "Critically Assess with AI" button

### Purpose
Get an automated pre-validation assessment that evaluates whether the collected evidence actually supports the assertion. This is a **closed-loop** analysis that uses ONLY the evidence provided - no external knowledge or web search.

### Step-by-Step Flow

1. **User Action**: Click "Critically Assess with AI" button

2. **Frontend Handler** (`app.js:582-685`):
   ```javascript
   async requestAiAssessment() {
     this.assessmentLoading = true;

     // Add visible "thinking" message
     conv.messages.push({
       role: 'assistant',
       content: `**Critically assessing:**\n\n> "${claim}"\n\n*Evaluating...*`,
     });

     // POST to assessment endpoint
     const res = await fetch(`/api/assertions/${id}/ai-assess`, {
       method: 'POST',
     });

     // Format and display result
     if (data.success) {
       this.aiAssessment = data.data;
       conv.messages.push({ role: 'assistant', content: assessmentMessage });

       // Add gap investigation buttons if gaps exist
       if (data.data.gaps?.length > 0) {
         conv.messages.push({ role: 'assistant', type: 'gaps', gaps: data.data.gaps });
       }
     }
   }
   ```

3. **Backend API** (`/api/assertions/:id/ai-assess`)

4. **Assessment Agent** (`assessment.ts:279-324`):
   - Builds structured prompt with all evidence
   - Calls Claude with NO tools enabled (closed-loop)
   - Single turn, max 1 turn (pure analysis)

5. **Assessment Prompt** (built dynamically):
   ```
   You are presented with a research assertion and its collected evidence.
   Your task is to determine if the EVIDENCE BELOW supports the CLAIM.

   ══════════════════════════════════════════════════════════════════
   ASSERTION TO EVALUATE
   ══════════════════════════════════════════════════════════════════

   CLAIM: "Tabnine Enterprise pricing starts at $39 per user per month"
   CATEGORY: pricing
   ENTITY: Tabnine

   ══════════════════════════════════════════════════════════════════
   COLLECTED EVIDENCE (This is ALL the evidence you may consider)
   ══════════════════════════════════════════════════════════════════

   SCREENSHOT EVIDENCE:
   - Path: screenshots/2025-01/tabnine-pricing.png
   - Description: "Enterprise tier row shows: Enterprise - Starting at $39/user/mo"

   SOURCE CITATIONS:
   - URL: https://tabnine.com/pricing
     Quote: "Enterprise - Starting at $39 per user per month"

   AGENT REASONING: "Establishes baseline pricing for federal budget planning"

   ══════════════════════════════════════════════════════════════════
   YOUR TASK
   ══════════════════════════════════════════════════════════════════

   Based ONLY on the evidence above (not external knowledge), determine:
   1. Does the evidence description contain specific text supporting the claim?
   2. Do the quoted sources directly support the claim?
   3. Are there logical gaps between evidence and claim?
   4. Is the evidence specific enough, or too vague?
   5. Are there parts of the claim not addressed by any evidence?
   ```

6. **Response Parsing** (`assessment.ts:194-273`):
   - Extracts structured fields: VERDICT, CONFIDENCE, REASONING, CONCERNS, RECOMMENDATION, GAPS

7. **Result Display**:
   - Verdict badge with emoji (LIKELY_VALID, NEEDS_VERIFICATION, LIKELY_INVALID, INSUFFICIENT_EVIDENCE)
   - Confidence level
   - Reasoning explanation
   - Specific concerns to check
   - Evidence gaps with investigation buttons

### System Prompt for Assessment

```
You are a critical evidence assessor for research claims.

CRITICAL CONSTRAINT: You must evaluate ONLY using the evidence provided in this prompt.
- DO NOT use any external knowledge or web search
- DO NOT assume information beyond what is explicitly stated
- DO NOT reference information you "know" about the entity from training data
- ONLY assess based on the evidence artifacts presented to you

Your role is to evaluate whether the PROVIDED evidence actually supports the claimed assertion.

Be skeptical but fair:
- LIKELY_VALID: The provided evidence clearly and directly supports the claim
- NEEDS_VERIFICATION: Some support exists in the evidence but gaps remain
- LIKELY_INVALID: The provided evidence contradicts or doesn't match the claim
- INSUFFICIENT_EVIDENCE: The evidence provided is too vague or incomplete to assess

Common issues to flag:
- Evidence description is vague (e.g., "from the website" without specifics)
- Quoted text doesn't clearly support the claim made
- Claim extrapolates significantly beyond what the evidence shows
- Evidence may be from a different entity/product than claimed
- Mismatch between claim category and evidence type
- Part of the claim is not addressed by any evidence
- Screenshot was not captured even though evidence description references visual content

IMPORTANT: Identify discrete EVIDENCE GAPS that could be filled by additional research.

Respond in EXACTLY this format:
VERDICT: [LIKELY_VALID | NEEDS_VERIFICATION | LIKELY_INVALID | INSUFFICIENT_EVIDENCE]
CONFIDENCE: [HIGH | MEDIUM | LOW]
REASONING: [2-3 sentences explaining your assessment]
CONCERNS: [specific issues to check, or "None"]
RECOMMENDATION: [what the human validator should focus on]
GAPS: [List of evidence gaps, format: "description | search query" per line, or "None"]
```

### Assessment Outcomes

| Verdict | Meaning | Action |
|---------|---------|--------|
| **LIKELY_VALID** | Evidence clearly supports claim | Human can proceed to validate |
| **NEEDS_VERIFICATION** | Some support but gaps remain | Investigate gaps or verify manually |
| **LIKELY_INVALID** | Evidence contradicts/doesn't match | Human should reject or investigate |
| **INSUFFICIENT_EVIDENCE** | Too vague to assess | Need more evidence collection |

### Key Configuration

```typescript
const q = query({
  prompt: singleTurnInput(),
  options: {
    systemPrompt: ASSESSMENT_SYSTEM_PROMPT,
    model: 'claude-sonnet-4-20250514',
    maxTurns: 1,                    // Single turn only
    allowedTools: [],               // NO tools - closed loop
    permissionMode: 'acceptEdits',
    cwd: process.cwd(),
  },
});
```

---

## Workflow C: Gap Investigation Research

**Trigger**: User clicks gap investigation button (after AI assessment)

### Purpose
Investigate a specific evidence gap identified during AI assessment. Unlike the closed-loop assessment, this workflow has access to web search and can find new evidence.

### Step-by-Step Flow

1. **Prerequisites**: AI assessment completed, gaps identified

2. **User Action**: Click "🔍" button next to a gap

3. **Frontend Handler** (`app.js:694-781`):
   ```javascript
   async investigateGap(gap) {
     gap.investigating = true;

     // Add investigation start message
     conv.messages.push({
       role: 'assistant',
       content: `**Investigating gap:** "${gap.description}"\n\n*Searching for evidence...*`,
     });

     // POST to investigation endpoint
     const res = await fetch(`/api/assertions/${id}/investigate-gap`, {
       method: 'POST',
       body: JSON.stringify({
         gapDescription: gap.description,
         searchQuery: gap.searchQuery,
       }),
     });

     // Display results and update gap state
     if (result.evidenceFound) {
       gap.resolved = true;  // ✅
     } else {
       gap.noEvidence = true;  // ❌
     }

     // Refresh assertion to get updated evidence chain
     await this.refreshCurrentAssertion();
   }
   ```

4. **Backend API** (`/api/assertions/:id/investigate-gap`)

5. **Investigation Agent** (`investigate.ts:67-131`):
   - Builds investigation prompt with gap context
   - Calls Claude with web tools enabled
   - Multi-turn allowed (up to 10 turns)

6. **Investigation Prompt**:
   ```
   You are investigating an evidence gap for a research assertion.

   ══════════════════════════════════════════════════════════════════
   CONTEXT
   ══════════════════════════════════════════════════════════════════

   ENTITY: Tabnine
   ORIGINAL CLAIM: "Tabnine supports air-gapped deployment"

   ══════════════════════════════════════════════════════════════════
   EVIDENCE GAP TO INVESTIGATE
   ══════════════════════════════════════════════════════════════════

   GAP: No documentation of air-gapped installation process
   SUGGESTED SEARCH: Tabnine air-gapped installation guide

   ══════════════════════════════════════════════════════════════════
   YOUR TASK
   ══════════════════════════════════════════════════════════════════

   1. Use web_search with the suggested query (or a refined version) to find evidence
   2. Review the search results and identify the most relevant source
   3. If you find relevant information, capture a screenshot of the page
   4. Extract specific quotes that address the gap
   5. Report your findings

   Remember: Focus ONLY on this specific gap.
   ```

7. **Response Parsing** (`investigate.ts:171-218`):
   - Extracts: EVIDENCE_FOUND, SOURCE_URL, SOURCE_QUOTE, FINDINGS

8. **Result Display**:
   - Shows findings in chat
   - Updates gap button state (✅ resolved, ❌ no evidence)
   - Refreshes assertion to show new evidence in chain

### System Prompt for Investigation

```
You are a research investigator filling evidence gaps for research claims.

Your task is to investigate a specific evidence gap and find supporting or refuting evidence.

WORKFLOW:
1. Use WebSearch to find relevant information about the gap
2. When you find a promising source, use WebFetch to retrieve and analyze the page content
3. Extract specific quotes or data points that address the gap
4. ALWAYS provide your final findings in the structured format below

CRITICAL REQUIREMENTS:
- Focus ONLY on the specific gap described - don't investigate unrelated aspects
- Quote specific text from sources - don't paraphrase
- Report honestly if you couldn't find evidence addressing the gap
- ALWAYS end with the structured findings format

When you're done investigating, you MUST provide your findings in EXACTLY this format:
EVIDENCE_FOUND: [yes/no]
SOURCE_URL: [URL where evidence was found, or "none"]
SOURCE_QUOTE: [Exact quote from source, or "none"]
FINDINGS: [Summary of what you discovered about this gap]
```

### Investigation Tools Available

| Tool | Purpose |
|------|---------|
| `WebSearch` | Search the web for evidence |
| `WebFetch` | Retrieve and analyze page content |

### Key Configuration

```typescript
const q = query({
  prompt: investigationInput(),
  options: {
    systemPrompt: INVESTIGATION_SYSTEM_PROMPT,
    model: 'claude-sonnet-4-20250514',
    maxTurns: 10,                     // Multi-turn allowed
    allowedTools: ['WebSearch', 'WebFetch'],  // Web access enabled
    permissionMode: 'acceptEdits',
    cwd: process.cwd(),
  },
});
```

---

## Agent Prompts and Instructions

### Summary Table

| Workflow | Agent | Model | Tools | Max Turns | Purpose |
|----------|-------|-------|-------|-----------|---------|
| Normal Validation | Session Agent | Sonnet 4 | MCP (get_assertion, add_note, create_followup) | Unlimited | Interactive Q&A |
| Critical Assessment | Assessment Agent | Sonnet 4 | None (closed-loop) | 1 | Evidence evaluation |
| Gap Investigation | Investigation Agent | Sonnet 4 | WebSearch, WebFetch | 10 | Fill evidence gaps |

### Prompt Templates Summary

#### Normal Validation - Session Start
```
Validation session started for assertion {assertionId}. Validator: {name}.
The assertion details are already visible in the UI - do NOT restate the claim.
Use get_assertion_by_id to fetch data, then:
1. Briefly greet the researcher
2. Provide source URL(s) for verification
3. Ask if they have questions
Keep your response concise.
```

#### Critical Assessment - Evaluation
```
You are presented with a research assertion and its collected evidence.
Your task is to determine if the EVIDENCE BELOW supports the CLAIM.

[ASSERTION TO EVALUATE]
CLAIM: "{claim}"
CATEGORY: {category}
ENTITY: {entityName}

[COLLECTED EVIDENCE]
- Screenshot evidence (path, description)
- Source citations (URL, quote)
- Agent reasoning

[YOUR TASK]
Based ONLY on the evidence above (not external knowledge):
1. Does evidence description contain specific supporting text?
2. Do quoted sources directly support the claim?
3. Are there logical gaps between evidence and claim?
4. Is the evidence specific enough?
5. Are there parts of claim not addressed?

Respond in format: VERDICT, CONFIDENCE, REASONING, CONCERNS, RECOMMENDATION, GAPS
```

#### Gap Investigation - Research
```
You are investigating an evidence gap for a research assertion.

ENTITY: {entityName}
ORIGINAL CLAIM: "{claim}"
GAP: {gapDescription}
SUGGESTED SEARCH: {searchQuery}

1. Use WebSearch with suggested query
2. Review results, identify relevant source
3. If found, capture screenshot
4. Extract specific quotes
5. Report findings

Format: EVIDENCE_FOUND, SOURCE_URL, SOURCE_QUOTE, FINDINGS
```

---

## Data Flow Diagrams

### Workflow A: Normal Validation

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  WebSocket  │────▶│   Session   │────▶│   Claude    │
│    (UI)     │◀────│   Handler   │◀────│   Manager   │◀────│   Agent     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                                        │                    │
      │ 1. Click "Begin Validation"            │                    │
      │                                        │                    │
      ├──▶ start_session {assertionId}  ──────▶│                    │
      │                                        │                    │
      │                                        ├──▶ create session ─▶│
      │                                        │    with MCP tools   │
      │                                        │                    │
      │◀── assistant_chunk (streaming) ◀──────┼────────────────────┤
      │                                        │                    │
      │ 2. Ask question                        │                    │
      │                                        │                    │
      ├──▶ user_message  ─────────────────────▶│                    │
      │                                        │                    │
      │◀── assistant_chunk ◀───────────────────┼────────────────────┤
      │                                        │                    │
      │ 3. Validate/Reject                     │                    │
      │                                        │                    │
      ├──▶ [VALIDATE] message ────────────────▶│                    │
      │                                        │                    │
      │◀── "Noted." ◀──────────────────────────┼────────────────────┤
      │                                        │                    │
      │ 4. Update status                       │                    │
      │                                        │                    │
      ├──▶ PUT /assertions/{id}/conversation   │                    │
      │                                        │                    │
      └────────────────────────────────────────┴────────────────────┘
```

### Workflow B: Critical Assessment

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  REST API   │────▶│  Assessment │
│    (UI)     │◀────│   Handler   │◀────│    Agent    │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │
      │ 1. Click "Critically Assess"           │
      │                    │                    │
      ├──▶ POST /ai-assess │                    │
      │                    │                    │
      │                    ├──▶ fetch assertion │
      │                    │    from database   │
      │                    │                    │
      │                    ├──▶ build prompt ───▶│
      │                    │    with evidence   │
      │                    │                    │
      │                    │    [NO TOOLS]      │
      │                    │    Single turn     │
      │                    │                    │
      │                    │◀── VERDICT, GAPS ◀─┤
      │                    │                    │
      │◀── Assessment result                    │
      │    {verdict, gaps}                      │
      │                    │                    │
      │ 2. Display in chat │                    │
      │    with gap buttons│                    │
      │                    │                    │
      └────────────────────┴────────────────────┘
```

### Workflow C: Gap Investigation

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  REST API   │────▶│ Investigate │────▶│    Web      │
│    (UI)     │◀────│   Handler   │◀────│    Agent    │◀────│  (Search)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │                    │
      │ 1. Click gap button                     │                    │
      │                    │                    │                    │
      ├──▶ POST /investigate-gap               │                    │
      │    {gapDescription}│                    │                    │
      │                    │                    │                    │
      │                    ├──▶ build prompt ───▶│                    │
      │                    │                    │                    │
      │                    │                    ├──▶ WebSearch ──────▶│
      │                    │                    │◀── results ◀───────┤
      │                    │                    │                    │
      │                    │                    ├──▶ WebFetch ───────▶│
      │                    │                    │◀── content ◀───────┤
      │                    │                    │                    │
      │                    │◀── findings ◀──────┤                    │
      │                    │                    │                    │
      │◀── InvestigationResult                  │                    │
      │    {evidenceFound, url, quote}          │                    │
      │                    │                    │                    │
      │ 2. Update gap state                     │                    │
      │    (resolved/noEvidence)                │                    │
      │                    │                    │                    │
      │ 3. Refresh assertion                    │                    │
      │    to get new evidence                  │                    │
      │                    │                    │                    │
      └────────────────────┴────────────────────┴────────────────────┘
```

---

## State Transitions

### Conversation Status States

```
                          ┌─────────────────────────────┐
                          │                             │
                          ▼                             │
┌─────────────┐     ┌─────────────┐     ┌─────────────┐│
│ not_started │────▶│ in_progress │────▶│  validated  ││
└─────────────┘     └─────────────┘     └─────────────┘│
      │                    │                    │       │
      │                    │                    │       │
      │                    ▼                    │       │
      │             ┌─────────────┐             │       │
      │             │  rejected   │             │       │
      │             └─────────────┘             │       │
      │                    │                    │       │
      └────────────────────┴────────────────────┴───────┘
                    (Skip keeps in_progress)
```

### Assertion Database Status

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    CLAIM    │────▶│  EVIDENCE   │     │  REJECTED   │
│  (initial)  │     │ (validated) │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    ▲                    ▲
      │                    │                    │
      │              [Validate]           [Reject]
      │                    │                    │
      └────────────────────┴────────────────────┘
```

### Gap Investigation States

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   pending   │────▶│investigating│────▶│  resolved   │
│     🔍      │     │     ⏳      │     │     ✅      │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ noEvidence  │
                    │     ❌      │
                    └─────────────┘
```

---

## Summary

The validation tool implements three distinct workflows:

| Workflow | Purpose | AI Role | Human Role |
|----------|---------|---------|------------|
| **A: Normal Validation** | Interactive verification | Assist with Q&A, provide URLs | Make validation decision |
| **B: Critical Assessment** | Pre-validation analysis | Evaluate evidence quality | Review assessment, investigate gaps |
| **C: Gap Investigation** | Fill evidence gaps | Search web, find evidence | Approve investigation, review findings |

Each workflow has specific agent configurations, prompts, and tool access designed to support the evidence-first research protocol while maintaining human authority over validation decisions.
