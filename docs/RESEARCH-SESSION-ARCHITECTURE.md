# Research Session Manager - Architecture Overview

## High-Level Architecture

```
Browser UI
    ↓ (WebSocket)
ResearchSessionManager (Coordinator)
    ↓ (spawns)
Child Agents (Pricing, Features, Compliance, etc.)
    ↓ (uses)
MCP Tools (fetch_url, create_assertion, save_extraction)
    ↓ (writes to)
PostgreSQL Database
```

## Key Components

### 1. ResearchSessionManager
- **Role**: Orchestrates multi-agent research for a single entity
- **Pattern**: Extends existing ValidationSessionManager
- **Responsibilities**:
  - Create/manage research sessions
  - Spawn child agents for each category
  - Track task progress and aggregate results
  - Handle pause/resume/cancel operations
  - Stream real-time updates via WebSocket

### 2. Child Agents (Category Specialists)
- **Categories**: pricing, features, company, compliance, integrations
- **Each agent**:
  - Fetches relevant URLs (e.g., /pricing, /features)
  - Captures screenshots as evidence
  - Analyzes content and extracts structured data
  - Creates assertions with evidence descriptions
  - Reports progress back to coordinator

### 3. Task Management
- **Task**: Represents one category research (e.g., "research pricing")
- **Lifecycle**: pending → in_progress → completed/failed
- **Progress Tracking**:
  - Stage (fetching_urls, capturing_evidence, analyzing_content, etc.)
  - Metrics (urlsFetched, screenshotsCaptured, assertionsCreated)
  - Percent complete (0-100)

### 4. WebSocket Protocol
- **Real-time updates** from agents to browser UI
- **Message types**:
  - Session lifecycle (started, paused, completed)
  - Task lifecycle (started, progress, completed)
  - Evidence notifications (screenshot captured, assertion created)
  - Agent messages (thinking, status updates)

---

## Comparison: Validation vs Research Sessions

| Aspect | ValidationSession | ResearchSession |
|--------|------------------|----------------|
| **Purpose** | Human validates existing assertions | AI researches entity to create assertions |
| **Agent Count** | 1 (validation assistant) | 1 coordinator + N child agents |
| **Duration** | Interactive (human-paced) | Automated (agent-paced) |
| **User Role** | Makes decisions (validate/reject) | Monitors progress |
| **Output** | Promoted assertions (CLAIM→EVIDENCE) | New assertions + structured extractions |
| **Tools** | get_assertion, add_note | fetch_url, capture_screenshot, save_extraction |
| **State** | Simple (active/inactive) | Complex (tasks, progress, results) |

---

## Multi-Agent Coordination Pattern

### Sequential Mode
```
Coordinator → Pricing Agent → completes
           → Features Agent → completes
           → Compliance Agent → completes
           → Report completion
```

### Parallel Mode (Future Enhancement)
```
Coordinator → Pricing Agent ──┐
           → Features Agent ──┤ → All complete
           → Compliance Agent ┘   → Report completion
```

**Current Design**: Sequential (simpler, easier to debug)
**Future**: Parallel with task queue and worker pool

---

## Evidence-First Protocol Integration

The ResearchSessionManager enforces the Evidence-First Research Protocol from CLAUDE.md:

### Traditional Flow (WRONG)
```
1. Make assertion: "Enterprise pricing starts at $39/mo"
2. Add source URL
3. Hope URL still works and supports claim
```

### Evidence-First Flow (CORRECT)
```
1. Fetch URL → capture screenshot
2. Analyze screenshot → extract data from visual evidence
3. Create assertion with:
   - evidenceDescription: "On screenshot at screenshots/.../pricing.png,
     Enterprise row shows '$39/user/mo'"
   - evidenceScreenshotPath: "screenshots/.../pricing.png"
   - sourceUrl: (secondary reference)
```

### Why This Matters
- 43% of agent-provided URLs were graded as MISLEADING
- Screenshots = verifiable point-in-time evidence
- Prevents quote hallucination and broken links

---

## Session State Management

### Session Lifecycle
```
initializing → planning → researching → completed
                     ↓
                  paused → researching (resume)
                     ↓
                  cancelled
```

### Task Lifecycle
```
pending → in_progress → completed
                    ↓
                  failed (can retry)
```

### Progress Calculation
```typescript
// Task progress
task.progress.percentComplete = calculateFromStage(task.progress.stage);

// Overall session progress
session.overallProgress.percentComplete =
  tasks.reduce((sum, t) => sum + t.progress.percentComplete, 0) / tasks.length;
```

---

## Database Schema

### ResearchSession Table
```
id                  cuid
entityId            foreign key → Entity
projectId           string
researcherName      string
status              enum (initializing, planning, researching, etc.)
createdAt/startedAt/completedAt/pausedAt
categories          string[] (which categories to research)
mode                string (sequential, parallel)
totalTasks/completedTasks/failedTasks
totalAssertions/totalScreenshots/totalExtractions
config              JSON (ResearchSessionConfig)
overallProgress     JSON (SessionProgress)
```

### ResearchTask Table
```
id                  cuid
sessionId           foreign key → ResearchSession
category            string (pricing, features, etc.)
status              enum (pending, in_progress, completed, etc.)
agentId             string (which agent is working on this)
startedAt/completedAt
error               string (if failed)
progress            JSON (TaskProgress)
results             JSON (TaskResults)
```

---

## API Design

### REST Endpoints
```
POST   /api/research/sessions              Create session
GET    /api/research/sessions/:id          Get session
GET    /api/research/sessions/:id/progress Get progress
POST   /api/research/sessions/:id/pause    Pause
POST   /api/research/sessions/:id/resume   Resume
POST   /api/research/sessions/:id/cancel   Cancel
POST   /api/research/sessions/:id/tasks/:taskId/retry  Retry failed task
GET    /api/research/sessions/:id/summary  Get summary
```

### WebSocket Messages

**Incoming (from browser)**:
- `start_research` - Begin research on entity
- `user_message` - Send message to coordinator
- `pause_session` - Pause all agents
- `resume_session` - Resume work
- `cancel_session` - Stop and cleanup
- `retry_task` - Retry failed task

**Outgoing (to browser)**:
- `session_started` - Research began
- `task_started` - Agent started category
- `task_progress` - Progress update
- `screenshot_captured` - Evidence captured
- `assertion_created` - Finding recorded
- `task_completed` - Category finished
- `overall_progress` - Session progress
- `session_completed` - All done

---

## MCP Tools for Agents

### Evidence Capture Tools
```typescript
fetch_url(url, entityId)
  → Returns: { cacheId, screenshotPath, contentPreview }
  → Captures screenshot automatically

capture_screenshot(url, filename?)
  → Returns: { path, url }
  → Manual screenshot capture

get_cached_content(cacheId)
  → Returns: { markdown, html, text }
  → Retrieve previously fetched content
```

### Data Storage Tools
```typescript
save_extraction(entityId, schemaType, url, screenshotPath, data)
  → Returns: { extractionId, assertionIds }
  → Saves structured extraction + auto-creates assertions

create_assertion(entityId, claim, category, evidenceDescription, evidenceScreenshotPath, ...)
  → Returns: { assertionId }
  → Creates assertion with evidence chain
```

### Progress Reporting Tools
```typescript
update_task_progress(taskId, progress)
  → Updates task progress, triggers WebSocket notification

report_task_completion(taskId, results)
  → Marks task complete, cleanup agent

report_task_failure(taskId, error)
  → Marks task failed, cleanup agent
```

---

## System Prompts Strategy

### Coordinator Prompt
- High-level planning and orchestration
- Spawns child agents for categories
- Aggregates results
- Reports overall progress

### Category-Specific Prompts
Each category has specialized prompt:
- **Pricing**: Look for /pricing, extract tiers/prices/features
- **Features**: Find feature pages, categorize capabilities
- **Company**: Extract founding, HQ, funding, leadership
- **Compliance**: Find SOC2, FedRAMP, security certs
- **Integrations**: Discover APIs, SDKs, native integrations

All prompts enforce Evidence-First Protocol.

---

## Error Handling

### Agent Failures
```typescript
if (agentError) {
  task.status = 'failed';
  task.error = errorMessage;
  // Cleanup agent
  session.childAgents.delete(agentId);
  // Notify UI
  sendMessage(ws, { type: 'task_failed', taskId, error });
  // Allow retry
}
```

### Session Interruption
```typescript
async pauseSession(sessionId) {
  // Interrupt coordinator
  await session.query.interrupt();

  // Interrupt all child agents
  for (const agentQuery of session.childAgents.values()) {
    await agentQuery.interrupt();
  }

  // Mark tasks as paused (not failed - can resume)
  session.status = 'paused';
}
```

### Resume After Pause
```typescript
async resumeSession(sessionId) {
  session.isPaused = false;
  session.status = 'researching';

  // Send resume message to coordinator
  sendMessage(sessionId, '[RESUME] Continue research.');

  // Coordinator will respawn agents for incomplete tasks
}
```

---

## Performance Considerations

### Rate Limiting
- **Web fetching**: 1-2 seconds between requests (respect robots.txt)
- **Screenshot capture**: ~2-5 seconds per page (Playwright overhead)
- **API calls**: Claude API rate limits (check tier)

### Estimated Duration
- **Per category**: 2-5 minutes (fetch, analyze, extract, create assertions)
- **Full entity** (5 categories): 10-25 minutes
- **Parallel mode** (future): 5-10 minutes (limited by rate limits)

### Resource Usage
- **Memory**: One Query per child agent (~50-100MB each)
- **Disk**: Screenshots (~50-500KB each), cached pages (~100KB each)
- **Database**: ~10-50 assertions per category, 1 extraction per category

---

## Integration Points

### With Existing CLI Tools
```typescript
// Research agents use same tools as CLI
import {
  extractFetch,    // CLI: extract:fetch
  extractSave,     // CLI: extract:save
  extractCache,    // CLI: extract:cache
  createAssertion, // CLI: assertion:create
} from '../../tools';

// Wrap as MCP tools for agent access
const fetchUrlTool = tool('fetch_url', '...', schema, extractFetch);
const saveExtractionTool = tool('save_extraction', '...', schema, extractSave);
```

### With Validation Workflow
```
1. Research Session creates assertions (status: CLAIM)
2. Human uses Validation Session to validate them
3. Assertions promoted to EVIDENCE
```

This creates a full research → validation pipeline.

---

## Future Enhancements

### 1. Parallel Execution
- Task queue with worker pool
- Spawn multiple category agents simultaneously
- Respect rate limits with queue throttling

### 2. Smart Category Selection
- Analyze entity type to determine relevant categories
- Skip categories that don't apply (e.g., no pricing for open source)
- Dynamic category discovery

### 3. Iterative Refinement
- If agent finds insufficient data, automatically try alternate URLs
- Web search for missing information
- Follow links to discover additional sources

### 4. Quality Assessment
- Auto-assess data quality before completing task
- Retry with different strategy if quality is low
- Flag assertions that need human review

### 5. Progress Persistence
- Save session state to database periodically
- Resume after server restart
- Retry from last checkpoint on failure

### 6. Batch Mode
- Research multiple entities in one session
- Priority queue based on entity importance
- Resource pooling across entities

---

## Testing Strategy

### Unit Tests
- SessionManager methods (create, pause, resume, cancel)
- Task state transitions
- Progress calculation
- Error handling

### Integration Tests
- Full session lifecycle (start → research → complete)
- WebSocket message flow
- Database persistence
- MCP tool integration

### End-to-End Tests
- Browser → WebSocket → SessionManager → Agents → Database
- Research a test entity with known data
- Verify assertions and extractions created
- Check screenshot capture and evidence chain

---

## Security Considerations

### Authentication
- Reuse existing auth from ValidationSession
- Check ANTHROPIC_API_KEY or `claude login`
- Reject unauthenticated WebSocket connections

### Rate Limiting
- Per-user session limits (e.g., 3 concurrent sessions)
- Per-entity cooldown (don't hammer same site)
- Global rate limit across all sessions

### Data Validation
- Validate entity exists before creating session
- Sanitize URLs before fetching
- Validate screenshot file paths (prevent directory traversal)
- Limit screenshot file sizes

### Resource Limits
- Max session duration (e.g., 30 minutes)
- Max tasks per session (e.g., 10 categories)
- Max child agents (prevent runaway spawning)
- Cleanup abandoned sessions (>1 hour idle)

---

## Implementation Checklist

- [ ] Create `ResearchSessionManager` class
- [ ] Add system prompts for coordinator and category agents
- [ ] Create MCP tools for research agents
- [ ] Implement WebSocket handler for research sessions
- [ ] Add REST API routes
- [ ] Update Prisma schema (ResearchSession, ResearchTask)
- [ ] Run database migration
- [ ] Create frontend UI components
  - [ ] Research session dashboard
  - [ ] Task progress visualization
  - [ ] Live assertion feed
  - [ ] Screenshot gallery
- [ ] Add tests (unit, integration, e2e)
- [ ] Documentation (user guide, API docs)

---

## Usage Example

```bash
# 1. Start server with research support
npm run server:dev

# 2. Open browser to research UI
http://localhost:3000/research

# 3. Select entity to research
# 4. Choose categories (pricing, features, compliance)
# 5. Start research session
# 6. Watch real-time progress:
#    - Tasks starting/completing
#    - Screenshots being captured
#    - Assertions being created
# 7. When complete, review assertions in validation UI
```

---

## Summary

The ResearchSessionManager provides a robust, scalable architecture for browser-based multi-agent deep research that:

- **Extends existing patterns** (ValidationSession, WebSocket, MCP tools)
- **Coordinates multiple agents** working on different categories
- **Tracks granular progress** with real-time UI updates
- **Enforces evidence-first protocol** with screenshot capture
- **Handles failures gracefully** with pause/resume/retry
- **Integrates seamlessly** with existing CLI tools and validation workflow

This architecture enables a powerful research automation system while maintaining human oversight and evidence traceability.
