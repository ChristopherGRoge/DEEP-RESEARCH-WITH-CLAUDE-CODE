# Deep Research Tool - Implementation Plan

## Executive Summary

This document provides a comprehensive plan for building a browser-based Deep Research Tool that performs systematic entity research using Claude Agent SDK. The tool will complement the existing Validation Tool, forming a complete research workflow:

```
Deep Research (NEW)     →     Validation (EXISTING)
━━━━━━━━━━━━━━━━━━━━━      ━━━━━━━━━━━━━━━━━━━━━
Agent collects evidence   →   Human validates claims
Creates assertions        →   Promotes CLAIM → EVIDENCE
```

### Key Innovation

**Current State**: Deep research runs in Claude Code CLI, producing assertions that humans validate separately in the browser.

**Target State**: Deep research runs in the browser alongside validation, with real-time progress tracking, evidence preview, and seamless handoff to validation.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Validation Workflow Summary](#validation-workflow-summary)
3. [Deep Research System Design](#deep-research-system-design)
4. [Implementation Phases](#implementation-phases)
5. [Agent Specifications](#agent-specifications)
6. [Integration Points](#integration-points)
7. [Cost Analysis](#cost-analysis)
8. [Success Criteria](#success-criteria)

---

## 1. Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Client                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐    ┌────────────────────────────────────┐ │
│  │  Validation UI   │    │         Deep Research UI           │ │
│  │  (/validation)   │    │         (/research)                │ │
│  └────────┬─────────┘    └────────────────┬───────────────────┘ │
│           │                               │                      │
│           ▼                               ▼                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    WebSocket Clients                        │ │
│  │        /ws/validation           /ws/research                │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                        Express Server                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐   ┌─────────────────────────────────┐ │
│  │ ValidationSession    │   │    ResearchSessionManager       │ │
│  │     Manager          │   │    (NEW)                        │ │
│  │                      │   │    ├── Coordinator Agent        │ │
│  │ ├── Session Agent    │   │    ├── Pricing Agent           │ │
│  │ ├── Assessment Agent │   │    ├── Features Agent          │ │
│  │ └── Investigation    │   │    ├── Compliance Agent        │ │
│  │     Agent            │   │    ├── Company Agent           │ │
│  │                      │   │    └── Integrations Agent      │ │
│  └──────────┬───────────┘   └───────────────┬─────────────────┘ │
│             │                               │                    │
│             ▼                               ▼                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Claude Agent SDK (query())                   │   │
│  │                                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │   │
│  │  │  WebSearch  │  │  WebFetch   │  │  MCP Tools  │       │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │   │
│  └──────────────────────────────────────────────────────────┘   │
│             │                               │                    │
│             ▼                               ▼                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 PostgreSQL + Prisma                       │   │
│  │   (Entities, Assertions, Extractions, Sources, Sessions) │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **Deep Research UI** | Browser interface for research sessions, progress tracking, evidence preview |
| **Research WebSocket** | Real-time communication between browser and research agents |
| **ResearchSessionManager** | Coordinates multi-agent research, tracks tasks, aggregates results |
| **Category Agents** | Specialized agents for pricing, features, compliance, etc. |
| **MCP Tools** | CLI tool wrappers (extract:fetch, extract:save, assertion:create) |
| **Database** | Persistent storage for entities, assertions, extractions, sessions |

---

## 2. Validation Workflow Summary

### Existing Validation Workflows

The validation tool implements three distinct AI-assisted workflows:

#### Workflow A: Normal Validation

**Trigger**: "Begin Validation" button

**Purpose**: Interactive Q&A session where Claude helps researcher verify an assertion

**Agent Configuration**:
- Model: Sonnet 4
- Tools: `get_assertion_by_id`, `add_validation_note`, `create_followup_assertion`
- Max Turns: Unlimited (streaming session)

**System Prompt Key Points**:
- You are a RESEARCH ASSISTANT, not a decision-maker
- DO NOT restate the assertion (already visible in UI)
- When you see [VALIDATE] or [REJECT], just acknowledge and stop

#### Workflow B: Critical AI Assessment

**Trigger**: "Critically Assess with AI" button

**Purpose**: Closed-loop evaluation of whether evidence supports the claim

**Agent Configuration**:
- Model: Sonnet 4
- Tools: NONE (closed-loop - no external access)
- Max Turns: 1 (single analysis)

**System Prompt Key Points**:
- Evaluate ONLY using provided evidence
- NO external knowledge or web search
- Return structured verdict: LIKELY_VALID, NEEDS_VERIFICATION, LIKELY_INVALID, INSUFFICIENT_EVIDENCE
- Identify evidence GAPS for investigation

#### Workflow C: Gap Investigation

**Trigger**: Gap investigation button (after assessment)

**Purpose**: Find new evidence to fill specific gaps

**Agent Configuration**:
- Model: Sonnet 4
- Tools: `WebSearch`, `WebFetch`
- Max Turns: 10 (multi-step investigation)

**System Prompt Key Points**:
- Focus ONLY on the specific gap
- Quote specific text from sources
- Return: EVIDENCE_FOUND, SOURCE_URL, SOURCE_QUOTE, FINDINGS

### Detailed Workflow Documentation

Complete workflow documentation is available in `docs/VALIDATION-WORKFLOWS.md`.

---

## 3. Deep Research System Design

### 3.1 Multi-Agent Orchestration

The deep research system uses a hierarchical agent pattern:

```
                    ┌─────────────────────┐
                    │   Coordinator       │
                    │   (Sonnet 4)        │
                    │   Plans research    │
                    │   Spawns agents     │
                    │   Tracks progress   │
                    └─────────┬───────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Pricing     │   │   Features    │   │  Compliance   │
│   Agent       │   │   Agent       │   │   Agent       │
│   (Sonnet)    │   │   (Sonnet)    │   │   (Sonnet)    │
└───────────────┘   └───────────────┘   └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Assertion   │   │   Assertion   │   │   Assertion   │
│   Builder     │   │   Builder     │   │   Builder     │
│   (Haiku)     │   │   (Haiku)     │   │   (Haiku)     │
└───────────────┘   └───────────────┘   └───────────────┘
```

### 3.2 Evidence-First Protocol

Every research action follows the evidence-first protocol:

```
1. FETCH URL           →  CLI: extract:fetch
   Returns: screenshotPath, cacheId, contentPreview

2. ANALYZE SCREENSHOT  →  Claude reads screenshot visually
   Identifies: specific text, data points, evidence locations

3. CREATE ASSERTION    →  CLI: assertion:create
   Requires:
   - evidenceDescription: "On screenshot at X, the text 'Y' appears in Z location"
   - evidenceScreenshotPath: "screenshots/2025-01/entity-pricing.png"
   - sourceUrl: "https://entity.com/pricing"

4. SAVE EXTRACTION     →  CLI: extract:save
   Persists structured data (pricing tiers, features, etc.)
```

### 3.3 Research Session Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    Research Session Lifecycle                     │
└──────────────────────────────────────────────────────────────────┘

User selects entity   →   Clicks "Start Research"   →   Coordinator plans
        │                          │                          │
        ▼                          ▼                          ▼
   ┌─────────┐             ┌─────────────┐            ┌───────────────┐
   │  IDLE   │ ──────────▶ │ INITIALIZING│ ─────────▶ │   PLANNING    │
   └─────────┘             └─────────────┘            └───────────────┘
                                                              │
                                                              ▼
                                                      ┌───────────────┐
                                 Research cycle ────▶ │  RESEARCHING  │
                                     │                └───────────────┘
        ┌────────────────────────────┼────────────────────────┐
        │                            │                        │
        ▼                            ▼                        ▼
┌───────────────┐           ┌───────────────┐        ┌───────────────┐
│ Fetch pricing │           │ Fetch features│        │Fetch compliance│
│  screenshot   │           │  screenshot   │        │   screenshot  │
└───────┬───────┘           └───────┬───────┘        └───────┬───────┘
        │                           │                        │
        ▼                           ▼                        ▼
┌───────────────┐           ┌───────────────┐        ┌───────────────┐
│ Extract data  │           │ Extract data  │        │ Extract data  │
│ Create claims │           │ Create claims │        │ Create claims │
└───────┬───────┘           └───────┬───────┘        └───────┬───────┘
        │                           │                        │
        └────────────────┬──────────┴────────────────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │  COMPLETED  │
                  └─────────────┘
                         │
                         ▼
           Assertions ready for validation
```

### 3.4 Browser UI Design

The Deep Research UI mirrors the Validation Tool structure:

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: [≡] Research | [Stats] | Connection • | [Researcher]    │
├──────────┬──────────────────────────────────────────────────────┤
│ Sidebar  │ Content Area                                         │
│          ├──────────────────────┬───────────────────────────────┤
│ Projects │ Conversation Panel   │ Research Progress Panel       │
│ Entities │                      │                               │
│          │ Research chat        │ ┌────────────────────────┐   │
│ [Cursor] │ thread with:         │ │ Cursor                 │   │
│ [Copilot]│ - Screenshots        │ │ https://cursor.com     │   │
│ [Tabnine]│ - Extractions        │ └────────────────────────┘   │
│          │ - Assertions         │                               │
│          │                      │ Coverage:                     │
│          │ [Agent thinking...]  │ ✓ Pricing (12 claims)        │
│          │                      │ ✓ Features (8 claims)        │
│          │                      │ ⏳ Compliance (running...)   │
│          │                      │ ✗ Company (pending)          │
│          ├──────────────────────┤ ✗ Integrations (pending)     │
│          │ [Start Research]     │                               │
│          │ [Pause] [Stop]       │ Evidence: 3 screenshots       │
└──────────┴──────────────────────┴───────────────────────────────┘
```

---

## 4. Implementation Phases

### Phase 1: Core Infrastructure (Week 1)

#### 1.1 Backend: ResearchSessionManager

**Files to create**:
- `src/server/agent/research-session.ts` - Session manager class
- `src/server/agent/research-prompts.ts` - Agent prompts
- `src/server/agent/research-tools.ts` - MCP tools wrapper

**Key deliverables**:
- [ ] ResearchSessionManager class with session lifecycle
- [ ] Task creation and tracking
- [ ] Progress aggregation
- [ ] Child agent spawning

**Code structure**:
```typescript
// src/server/agent/research-session.ts
export class ResearchSessionManager {
  sessions: Map<string, ResearchSession>;

  createSession(config: ResearchSessionConfig): Promise<ResearchSession>;
  startSession(sessionId: string): Promise<void>;
  spawnChildAgent(sessionId: string, taskId: string): Promise<string>;
  updateTaskProgress(sessionId: string, taskId: string, progress: Partial<TaskProgress>): Promise<void>;
  completeTask(sessionId: string, taskId: string, results: TaskResults): Promise<void>;
  pauseSession(sessionId: string): Promise<void>;
  resumeSession(sessionId: string): Promise<void>;
  cancelSession(sessionId: string): Promise<void>;
}
```

#### 1.2 Backend: WebSocket Handler

**Files to create**:
- `src/server/routes/research-websocket.ts`

**Key deliverables**:
- [ ] WebSocket namespace `/ws/research`
- [ ] Message handlers for session control
- [ ] Progress streaming to client
- [ ] Screenshot/extraction notifications

#### 1.3 Backend: REST API

**Files to create**:
- `src/server/routes/research-api.ts`

**Endpoints**:
```
POST   /api/research/sessions          - Start session
GET    /api/research/sessions/:id      - Get session status
GET    /api/research/sessions/:id/progress - Get progress
POST   /api/research/sessions/:id/pause   - Pause
POST   /api/research/sessions/:id/resume  - Resume
POST   /api/research/sessions/:id/cancel  - Cancel
```

#### 1.4 Database Schema

**Files to update**:
- `prisma/schema.prisma`

**New models**:
```prisma
model ResearchSession {
  id            String   @id @default(cuid())
  entityId      String
  projectId     String
  researcherName String
  status        String
  createdAt     DateTime @default(now())
  startedAt     DateTime?
  completedAt   DateTime?
  categories    String[]
  config        Json?
  overallProgress Json?
  entity        Entity   @relation(...)
  tasks         ResearchTask[]
}

model ResearchTask {
  id          String   @id @default(cuid())
  sessionId   String
  category    String
  status      String
  progress    Json?
  results     Json?
  session     ResearchSession @relation(...)
}
```

---

### Phase 2: Agent System (Week 2)

#### 2.1 Coordinator Agent

**Prompt** (abbreviated):
```
You are a research coordinator managing deep research on an entity.

Responsibilities:
1. Plan research across categories (pricing, features, company, compliance, integrations)
2. Spawn child agents for each category
3. Track progress across all agents
4. Aggregate results
5. Report completion when all research is done

Follow Evidence-First Protocol:
- Screenshots are PRIMARY evidence
- Capture screenshot BEFORE making assertions
- Reference specific screenshot content in evidenceDescription
```

**Tools**:
- `spawn_child_agent` - Create category agents
- `get_task_status` - Check progress
- `report_completion` - Final summary

#### 2.2 Category Agents

**Pricing Agent**:
```
Your task:
1. Find the pricing page
2. Fetch URL using extract:fetch
3. Analyze screenshot for tiers, prices, features
4. Save extraction with schemaType: 'pricing'
5. Create assertions with evidenceDescription
```

**Features Agent**:
```
Your task:
1. Find features/capabilities pages
2. Analyze for feature categories
3. Save extraction with schemaType: 'features'
4. Create assertions for notable features
```

Similar prompts for: Company, Compliance, Integrations

#### 2.3 Assertion Builder (Haiku)

Lightweight agent that persists assertions:
```
Execute CLI commands to persist research findings:
1. Save extraction: npm run cli -- extract:save '{...}'
2. Create assertions: npm run cli -- assertion:create '{...}'
```

---

### Phase 3: Frontend UI (Week 3)

#### 3.1 Research Page Structure

**Files to create**:
- `src/server/public/research.html`
- `src/server/public/research-app.js`
- `src/server/public/research-styles.css`

#### 3.2 Alpine.js Components

**Sidebar Component**:
- Project filter dropdown
- Entity list with research status indicators
- "New Entity" button

**Conversation Panel**:
- Chat thread with message types: text, screenshot, extraction
- Streaming indicator
- User input area
- Research controls: Start, Pause, Stop

**Research Progress Panel**:
- Entity info card
- Coverage grid (schema × status)
- Recent assertions list
- Evidence gallery

#### 3.3 WebSocket Integration

```javascript
// Connect to research WebSocket
const ws = new WebSocket(`${protocol}//${host}/ws/research`);

// Handle progress updates
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  switch (msg.type) {
    case 'task_started':
      updateCoverageGrid(msg.category, 'extracting');
      break;
    case 'screenshot_captured':
      addScreenshotToChat(msg.screenshotPath);
      break;
    case 'extraction_complete':
      addExtractionToChat(msg);
      updateCoverageGrid(msg.schemaType, 'complete');
      break;
    case 'assertion_created':
      addAssertionToList(msg.assertion);
      break;
    case 'session_completed':
      showCompletionSummary(msg.summary);
      break;
  }
};
```

---

### Phase 4: Integration & Polish (Week 4)

#### 4.1 Validation Tool Integration

- Add "Research" button on entities without extractions
- Link from validation to research for gap filling
- Shared navigation between tools

#### 4.2 Research → Validation Handoff

When research completes:
1. Assertions are created with status: CLAIM
2. User sees "Validate findings" button
3. Opens validation tool with pre-filtered view
4. Human validates each assertion

#### 4.3 Quality Improvements

- Session persistence (resume after page reload)
- Error recovery (retry failed tasks)
- Multi-entity research tracking
- Research templates (e.g., "Federal Viability")

---

## 5. Agent Specifications

### Agent Tier Summary

| Agent | Model | Cost | Role |
|-------|-------|------|------|
| **Coordinator** | Sonnet 4.5 | ~$0.50/session | Planning, orchestration |
| **Pricing Agent** | Sonnet 4.5 | ~$0.30/entity | Extract pricing data |
| **Features Agent** | Sonnet 4.5 | ~$0.30/entity | Extract features |
| **Compliance Agent** | Sonnet 4.5 | ~$0.30/entity | Extract compliance info |
| **Company Agent** | Sonnet 4.5 | ~$0.30/entity | Extract company info |
| **Integrations Agent** | Sonnet 4.5 | ~$0.30/entity | Extract integrations |
| **Assertion Builder** | Haiku 4.0 | ~$0.05/entity | Persist to database |

### Evidence Sufficiency Criteria

Research continues until:
- **Pricing**: 3+ tiers with prices and features
- **Features**: 5+ features with descriptions
- **Compliance**: Security certs + deployment options
- **Company**: Founded date + headquarters
- **Overall**: 80%+ field coverage per schema

---

## 6. Integration Points

### 6.1 Shared Components

Reuse from validation tool:
- Header component structure
- Sidebar patterns
- WebSocket connection logic
- Message formatting utilities
- CSS design tokens
- Alpine.js reactive patterns

### 6.2 Database Schema

Both tools share:
- Entity table
- Assertion table
- Extraction table
- Source table

Research adds:
- ResearchSession table
- ResearchTask table

### 6.3 CLI Tools

Research uses existing CLI commands:
- `extract:fetch` - Fetch page + screenshot
- `extract:save` - Save structured data
- `extract:cache` - Read cached content
- `assertion:create` - Create assertion with evidence
- `entity:get` - Get entity details

---

## 7. Cost Analysis

### Per-Entity Research Cost

| Component | Tokens (est.) | Cost |
|-----------|---------------|------|
| Coordinator (Sonnet) | ~5K in, ~2K out | ~$0.05 |
| Evidence Collector × 5 (Haiku) | ~2K each | ~$0.02 |
| Data Extractor × 5 (Sonnet) | ~10K each | ~$0.30 |
| Assertion Builder × 5 (Haiku) | ~3K each | ~$0.05 |
| **Total per entity** | | **~$0.42** |

### Cost Comparison

| Approach | Cost per entity | Notes |
|----------|-----------------|-------|
| CLI (manual prompting) | ~$1.50-2.00 | Human crafts each prompt |
| Browser orchestration | ~$0.40-0.50 | Automated multi-agent |
| **Savings** | **~75%** | Plus time savings |

### Monthly Projection

| Volume | Cost (old) | Cost (new) | Savings |
|--------|------------|------------|---------|
| 100 entities | $175 | $45 | $130/mo |
| 500 entities | $875 | $225 | $650/mo |
| 1000 entities | $1,750 | $450 | $1,300/mo |

---

## 8. Success Criteria

### Functional Requirements

- [ ] Start research session for any entity
- [ ] Real-time progress updates in browser
- [ ] Evidence (screenshots) visible as captured
- [ ] Assertions created with proper evidence chain
- [ ] Pause/resume research sessions
- [ ] Session persistence across page reloads
- [ ] Seamless handoff to validation tool

### Performance Metrics

- [ ] Full entity research: < 5 minutes
- [ ] Screenshot capture success: > 95%
- [ ] Assertion creation success: > 98%
- [ ] WebSocket reliability: > 99%

### Quality Metrics

- [ ] Evidence coverage: 100% of assertions have screenshots
- [ ] Quote accuracy: Evidence descriptions match screenshots
- [ ] Data completeness: 80%+ field coverage per schema
- [ ] Validation approval rate: > 85% of assertions validated

---

## Appendix A: File Structure

```
src/
├── server/
│   ├── agent/
│   │   ├── session.ts            # Existing validation sessions
│   │   ├── assessment.ts         # Existing AI assessment
│   │   ├── investigate.ts        # Existing gap investigation
│   │   ├── prompts.ts            # Existing prompts
│   │   ├── tools.ts              # Existing MCP tools
│   │   │
│   │   ├── research-session.ts   # NEW: Research session manager
│   │   ├── research-prompts.ts   # NEW: Research agent prompts
│   │   └── research-tools.ts     # NEW: Research MCP tools
│   │
│   ├── routes/
│   │   ├── api.ts                # Existing API routes
│   │   ├── websocket.ts          # Existing validation WebSocket
│   │   │
│   │   ├── research-api.ts       # NEW: Research API routes
│   │   └── research-websocket.ts # NEW: Research WebSocket
│   │
│   └── public/
│       ├── index.html            # Existing validation UI
│       ├── app.js                # Existing validation app
│       ├── styles.css            # Existing styles
│       │
│       ├── research.html         # NEW: Research UI
│       ├── research-app.js       # NEW: Research Alpine app
│       └── research-styles.css   # NEW: Research styles
│
└── prisma/
    └── schema.prisma             # Updated with ResearchSession, ResearchTask
```

---

## Appendix B: Related Documentation

| Document | Description |
|----------|-------------|
| `docs/VALIDATION-WORKFLOWS.md` | Detailed validation workflow documentation |
| `docs/DEEP-RESEARCH-UI-DESIGN.md` | Complete UI design specification |
| `docs/RESEARCH-SESSION-MANAGER-DESIGN.md` | Backend session manager design |
| `docs/SUBAGENT-TEAM.md` | Agent tier specifications |
| `docs/RESEARCH-SYSTEM.md` | Research orchestration architecture |
| `CLAUDE.md` | CLI commands and evidence-first protocol |

---

## Summary

This implementation plan provides a roadmap for building a browser-based Deep Research Tool that:

1. **Extends the existing architecture** - Uses same patterns as validation tool
2. **Implements multi-agent orchestration** - Coordinator + category specialists
3. **Follows evidence-first protocol** - Screenshots before assertions
4. **Provides real-time progress** - WebSocket streaming to browser
5. **Integrates with validation** - Seamless handoff for human review

The 4-week implementation schedule delivers:
- Week 1: Core infrastructure (sessions, WebSocket, API)
- Week 2: Agent system (coordinator, category agents)
- Week 3: Frontend UI (Alpine.js, WebSocket integration)
- Week 4: Integration and polish

Estimated cost per entity: ~$0.45 (75% reduction from manual approach)
