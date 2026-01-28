# Orchestrator Infrastructure

This document describes the orchestrator infrastructure for spawning and managing Claude subagents.

## Overview

The orchestrator provides a framework for spawning Claude subagents with different model tiers (Haiku, Sonnet, Opus) and tool configurations. This enables hierarchical agent workflows where a main agent can delegate specialized tasks to subagents.

## Architecture

### Components

1. **Task Registry** - In-memory registry tracking all spawned subagent tasks
2. **Model Mapping** - Maps model tiers to specific Claude model IDs
3. **MCP Server Management** - Creates appropriate MCP servers based on tool requirements
4. **Task Execution** - Manages the lifecycle of subagent tasks

### Model Tiers

| Tier | Model ID | Use Case | Cost |
|------|----------|----------|------|
| **Haiku** | claude-3-5-haiku-20241022 | Deterministic tasks (DB writes, parsing, validation) | Lowest |
| **Sonnet** | claude-sonnet-4-20250514 | Reasoning tasks (web research, analysis) | Medium |
| **Opus** | claude-opus-4-20250514 | Complex synthesis and quality review | Highest |

### Task Types

The orchestrator supports these predefined task types with specialized system prompts:

- `entity_research` - Entity investigation and fact extraction
- `evidence_collection` - Screenshot capture and evidence documentation
- `claim_validation` - Verify assertions against sources
- `logo_fetch` - Find and download entity logos
- `url_validation` - Check URL accessibility
- `metadata_enrichment` - Add basic metadata to entities
- `custom` - General-purpose tasks

### Tool Categories

Tools can be selectively provided to subagents:

- `db` - Database operations via MCP
- `fetch` - Web fetching capabilities
- `search` - Search operations
- `validation` - Validation tools

## API Reference

### Core Functions

#### spawnSubagent(input)

Spawn a new subagent task.

**Input:**
```typescript
{
  taskType: TaskType;           // Type of task to perform
  model?: ModelTier;            // 'haiku' | 'sonnet' | 'opus' (default: haiku)
  entityId?: string;            // Optional entity context
  projectId?: string;           // Optional project context
  prompt: string;               // Task prompt/instructions
  tools?: ToolCategory[];       // Tools to provide (default: ['db'])
  timeout?: number;             // Timeout in ms (default: 60000)
  agentId?: string;             // Optional agent identifier for tracking
  systemPrompt?: string;        // Optional custom system prompt
}
```

**Returns:**
```typescript
{
  taskId: string;               // Unique task identifier
  status: TaskStatus;           // 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  taskType: TaskType;
  model: ModelTier;
  createdAt: Date;
}
```

#### getSubagentStatus(taskId)

Get the current status of a spawned subagent.

**Returns:**
```typescript
{
  taskId: string;
  status: TaskStatus;
  taskType: TaskType;
  model: ModelTier;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  durationMs?: number;
  result?: unknown;             // Task results if completed
  error?: string;               // Error message if failed
}
```

#### listActiveSubagents()

List all currently running subagent tasks.

**Returns:** Array of `TaskStatusResponse`

#### listAllSubagents(filter?)

List all subagent tasks with optional filtering.

**Filters:**
```typescript
{
  status?: TaskStatus;          // Filter by status
  taskType?: TaskType;          // Filter by task type
}
```

#### cancelSubagent(taskId)

Cancel a running subagent task.

#### sendInputToSubagent(taskId, message)

Send additional input to a running subagent (for interactive tasks).

#### cleanupOldTasks(olderThanHours?)

Remove completed/failed tasks older than specified hours (default: 1 hour).

### Convenience Functions

These functions provide shortcuts for common patterns:

#### spawnHaikuAgent(taskType, prompt, options?)

Spawn a Haiku agent with database tools (best for deterministic tasks).

#### spawnSonnetAgent(taskType, prompt, options?)

Spawn a Sonnet agent with full tool access (best for reasoning tasks).

#### spawnOpusAgent(taskType, prompt, options?)

Spawn an Opus agent with all tools (best for complex synthesis).

## CLI Commands

All orchestrator functions are available via the CLI:

### Spawn and Manage Tasks

```bash
# Spawn a subagent
npm run cli -- orchestrate:spawn '{
  "taskType": "entity_research",
  "model": "sonnet",
  "entityId": "entity-123",
  "prompt": "Research pricing information for this entity"
}'

# Check task status
npm run cli -- orchestrate:status '{"taskId": "task-123"}'

# List all tasks
npm run cli -- orchestrate:list

# List only active tasks
npm run cli -- orchestrate:active

# Cancel a running task
npm run cli -- orchestrate:cancel '{"taskId": "task-123"}'

# Send additional input to a task
npm run cli -- orchestrate:send '{
  "taskId": "task-123",
  "message": "Please also check for compliance information"
}'

# Clean up old tasks
npm run cli -- orchestrate:cleanup '{"olderThanHours": 2}'
```

### Convenience Spawners

```bash
# Spawn Haiku agent (deterministic tasks)
npm run cli -- orchestrate:haiku '{
  "taskType": "logo_fetch",
  "prompt": "Find and download logo for entity-123",
  "entityId": "entity-123"
}'

# Spawn Sonnet agent (reasoning tasks)
npm run cli -- orchestrate:sonnet '{
  "taskType": "entity_research",
  "prompt": "Research all pricing, features, and compliance info",
  "entityId": "entity-123"
}'

# Spawn Opus agent (complex synthesis)
npm run cli -- orchestrate:opus '{
  "taskType": "custom",
  "prompt": "Synthesize all research and create executive summary",
  "projectId": "project-123"
}'
```

## Usage Examples

### Example 1: Parallel Logo Collection

```typescript
// Main agent spawns Haiku agents for each entity
const entities = await getEntitiesWithoutLogos(projectId);

for (const entity of entities) {
  await spawnHaikuAgent('logo_fetch',
    `Find and download logo for ${entity.name}`,
    { entityId: entity.id }
  );
}

// Check progress
const active = listActiveSubagents();
console.log(`${active.length} logo fetches in progress`);
```

### Example 2: Research → Validate Pipeline

```typescript
// Step 1: Sonnet agent researches entity
const researchTask = await spawnSonnetAgent(
  'entity_research',
  'Extract all pricing, features, compliance info',
  { entityId: 'entity-123' }
);

// Wait for completion
let status;
do {
  await sleep(5000);
  status = getSubagentStatus(researchTask.taskId);
} while (status.status === 'running');

// Step 2: Haiku agent validates URLs
if (status.status === 'completed') {
  await spawnHaikuAgent(
    'url_validation',
    'Validate all source URLs for entity-123',
    { entityId: 'entity-123' }
  );
}
```

### Example 3: Batch Processing with Agenda

```typescript
// Create research agenda
const agenda = await createAgenda({
  projectId: 'project-123',
  name: 'Deep research all tools',
  taskType: 'extract:pricing'
});

// Spawn Sonnet agents for each item
while (true) {
  const next = getNextItem(agenda.agendaId);
  if (!next) break;

  const task = await spawnSonnetAgent(
    'entity_research',
    `Research ${next.entity.name}`,
    { entityId: next.entity.id }
  );

  // Wait for completion
  const status = await waitForCompletion(task.taskId);

  if (status.status === 'completed') {
    completeItem(agenda.agendaId);
  } else {
    failItem(agenda.agendaId, status.error);
  }
}
```

## Implementation Notes

### Task State Management

Tasks go through these states:

```
pending → running → completed
                 → failed
                 → cancelled
```

Tasks are stored in an in-memory registry. For production use, consider:
- Persisting tasks to database
- Adding task recovery on restart
- Implementing distributed task management

### Timeout Handling

Each task has a configurable timeout (default 60 seconds). When timeout expires:
- Task is marked as `failed`
- Error message includes timeout duration
- Task can be safely retried

### Cancellation

Cancellation is cooperative:
- Sets task status to `cancelled`
- Task checks status periodically
- Gracefully exits when detected

### MCP Server Reuse

Currently, all tasks use the validation MCP server regardless of tool categories. Future improvements:

1. Create specialized MCP servers per tool category
2. Lazy-load MCP servers on demand
3. Share MCP server instances across tasks
4. Implement MCP server pooling

### Result Collection

Results are collected as tasks stream responses:
- Assistant text messages
- Tool use results
- Final result with cost/turn info

Consider streaming results for long-running tasks.

## Best Practices

### 1. Choose the Right Model Tier

- **Haiku** for simple, deterministic tasks (DB writes, URL checks, logo fetch)
- **Sonnet** for reasoning and analysis (research, claim extraction, comparison)
- **Opus** sparingly for final synthesis and quality review

### 2. Set Appropriate Timeouts

- Short tasks (< 30s): Logo fetch, URL validation
- Medium tasks (30-90s): Entity research, claim validation
- Long tasks (90-300s): Deep research, multi-page extraction

### 3. Handle Failures Gracefully

```typescript
const task = await spawnSubagent({...});
const status = getSubagentStatus(task.taskId);

if (status.status === 'failed') {
  // Log error
  console.error(`Task failed: ${status.error}`);

  // Retry with different model or increased timeout
  await spawnSubagent({
    ...originalInput,
    model: 'sonnet', // Upgrade from haiku
    timeout: 120000   // Increase timeout
  });
}
```

### 4. Monitor Active Tasks

```typescript
// Periodic health check
setInterval(() => {
  const active = listActiveSubagents();

  // Alert if too many active tasks
  if (active.length > 50) {
    console.warn('High task load:', active.length);
  }

  // Check for stuck tasks
  const stuck = active.filter(t =>
    t.durationMs && t.durationMs > 300000
  );

  stuck.forEach(t => cancelSubagent(t.taskId));
}, 60000);
```

### 5. Clean Up Regularly

```typescript
// Clean up old tasks daily
setInterval(() => {
  const result = cleanupOldTasks(24); // 24 hours
  console.log(`Cleaned up ${result.cleaned} old tasks`);
}, 86400000);
```

## Future Enhancements

1. **Task Persistence** - Store tasks in database for recovery
2. **Result Streaming** - Stream task results as they arrive
3. **Task Chaining** - Define task dependencies and workflows
4. **Resource Limits** - Limit concurrent tasks by model/user
5. **Task Priority** - Queue management with priority levels
6. **Webhooks** - Notify external systems on task completion
7. **Metrics** - Track success rates, durations, costs by task type
8. **Retry Policies** - Automatic retry with backoff
9. **Task Templates** - Predefined task configurations
10. **Interactive Mode** - Bidirectional communication with subagents

## Troubleshooting

### Task Stuck in "pending"

Check if task execution failed to start:
```bash
npm run cli -- orchestrate:status '{"taskId": "task-123"}'
```

Review server logs for errors during spawn.

### Task Timeout

Increase timeout for complex tasks:
```typescript
await spawnSubagent({
  ...,
  timeout: 300000  // 5 minutes
});
```

### High Memory Usage

Clean up old completed tasks:
```bash
npm run cli -- orchestrate:cleanup '{"olderThanHours": 1}'
```

### MCP Server Errors

Verify MCP server configuration in `src/server/agent/tools.ts`.

## Related Documentation

- `src/tools/orchestrator.ts` - Implementation
- `src/cli.ts` - CLI routing
- `docs/SUBAGENT-TEAM.md` - Subagent specifications
- `docs/RESEARCH-SYSTEM.md` - Research orchestration architecture
