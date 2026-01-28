---
name: research-project
description: Manage research projects and set active project context. Required for other research skills that need project scope. Use when asked to "create a project", "switch projects", "list projects", or "show project".
---

# Research Project Skill

Manages research projects and sets the **active project context** used by other research skills. Many skills (`/research-entity types`, `/research-discover`, `/research-domain`) require knowing which project to operate on.

## What is a Project?

A **research project** is a container for:
- **Entities** - Tools, frameworks, platforms being researched
- **Assertions** - Claims about those entities
- **Domains** - Research domain definitions for discovery
- **Extractions** - Structured data pulled from websites

Projects have a **workflow** that indicates research phase:
- `DISCOVERY` - Finding and cataloging entities
- `ANALYSIS` - Deep research on specific entities

## Active Project Context

Research skills need to know which project to operate on. The **active project** is stored in `.claude/context/active-project.json` and used by:

- `/research-entity types` - List entity types in project
- `/research-entity --type <type>` - List entities by type
- `/research-discover <domain>` - Discover entities in project
- `/research-domain` - Domains are project-scoped

## Commands

```
/research-project create <name>        # Create a new project
/research-project list                 # List all projects
/research-project use <name>           # Set active project context
/research-project show                 # Show active project details
/research-project show <name>          # Show specific project details
/research-project help                 # Usage documentation
/research-project commands             # CLI command reference
```

---

## EXECUTION PROTOCOL

### MODE: `help`

Display comprehensive overview. Output EXACTLY this format:

```
## Research Project Skill

Manages research projects and sets active project context.

### What is a Project?

A research project is a container for entities, assertions, domains, and extractions.
Projects organize research around a specific scope or initiative.

### Why Set Active Project?

Many skills need project context:
- /research-entity types → lists entity types in active project
- /research-discover → creates entities in active project
- /research-domain → domains belong to projects

### Commands

| Command | Description |
|---------|-------------|
| /research-project create <name> | Create new project |
| /research-project list | List all projects |
| /research-project use <name> | Set active project |
| /research-project show | Show active project |
| /research-project show <name> | Show specific project |

### Workflow

1. List projects: /research-project list
2. Set active: /research-project use "Agentic SDLC Research"
3. Now other skills use this project automatically

### Related Skills

- /research-entity - Deep entity research
- /research-discover - Entity discovery
- /research-domain - Domain management
```

---

### MODE: `commands`

Display minimal CLI reference. Output EXACTLY this format:

```
## CLI Commands

# Skill commands
/research-project create <name>
/research-project list
/research-project use <name>
/research-project show
/research-project show <name>
/research-project help
/research-project commands

# Database CLI
npm run cli -- project:create '{"name": "...", "description": "...", "workflow": "DISCOVERY"}'
npm run cli -- project:list
npm run cli -- project:get '{"projectId": "..."}'
npm run cli -- project:find '{"name": "..."}'
npm run cli -- project:update '{"projectId": "...", "description": "..."}'
npm run cli -- project:delete '{"projectId": "..."}'

# Entity counts per project
npm run cli -- entity:list '{"projectId": "..."}'
npm run cli -- search:summary '{"projectId": "..."}'
```

---

### MODE: `create <name>`

Create a new research project.

#### Step 1: Parse Project Name

Extract name from arguments. Name can include spaces if quoted.

```
/research-project create Agentic SDLC Research
/research-project create "Federal AI Tools Evaluation"
```

If no name provided:
```
ERROR: Project name required.

Usage: /research-project create <name>
Example: /research-project create "My Research Project"
```

#### Step 2: Check for Existing Project

```bash
npm run cli -- project:find '{"name": "PROJECT_NAME"}'
```

If exists:
```
Project "PROJECT_NAME" already exists (ID: cmjk...).

To use this project:
  /research-project use "PROJECT_NAME"

To create with different name:
  /research-project create "PROJECT_NAME v2"
```

#### Step 3: Gather Project Details

Use **AskUserQuestion** to get:

**Question 1: Description**
```
What is this research project about?

[Free text input]
```

**Question 2: Workflow Phase**
```
What research phase is this project in?

Options:
- DISCOVERY (finding and cataloging entities)
- ANALYSIS (deep research on specific entities)
```

#### Step 4: Create Project

```bash
npm run cli -- project:create '{
  "name": "PROJECT_NAME",
  "description": "USER_DESCRIPTION",
  "workflow": "DISCOVERY"
}'
```

#### Step 5: Set as Active Project

Write to context file:

```bash
mkdir -p .claude/context
echo '{"projectId": "PROJECT_ID", "projectName": "PROJECT_NAME"}' > .claude/context/active-project.json
```

#### Step 6: Confirm Creation

```
✓ Project "PROJECT_NAME" created successfully.

Project ID: cmjk...
Workflow: DISCOVERY
Description: USER_DESCRIPTION

This is now your active project.

## Next Steps
- Create a domain: /research-domain create <name>
- Discover entities: /research-discover <domain>
- List entity types: /research-entity types
```

---

### MODE: `list`

List all research projects.

#### Step 1: Query Projects

```bash
npm run cli -- project:list
```

#### Step 2: Get Active Project

```bash
cat .claude/context/active-project.json 2>/dev/null || echo '{}'
```

#### Step 3: Display Results

```
## Research Projects

| Name | ID | Entities | Workflow | Active |
|------|-----|----------|----------|--------|
| Agentic SDLC Research | cmjk123... | 67 | DISCOVERY | ✓ |
| Federal AI Eval | cmjk456... | 23 | ANALYSIS | |
| Security Tools | cmjk789... | 12 | DISCOVERY | |

Total: 3 projects

### Quick Actions
- Set active: /research-project use "Project Name"
- Create new: /research-project create <name>
- Show details: /research-project show "Project Name"
```

If no projects exist:
```
No research projects found.

Create one with:
  /research-project create "My Research Project"
```

---

### MODE: `use <name>`

Set the active project context.

#### Step 1: Parse Project Name

Extract name from arguments.

If no name provided:
```
ERROR: Project name required.

Usage: /research-project use <name>

Available projects:
[Run project:list and show names]
```

#### Step 2: Find Project

```bash
npm run cli -- project:find '{"name": "PROJECT_NAME"}'
```

If not found:
```
ERROR: Project "PROJECT_NAME" not found.

Did you mean one of these?
[List similar project names]

To list all projects:
  /research-project list
```

#### Step 3: Set Active Context

```bash
mkdir -p .claude/context
cat > .claude/context/active-project.json << 'EOF'
{
  "projectId": "PROJECT_ID",
  "projectName": "PROJECT_NAME",
  "setAt": "2026-01-21T14:30:00Z"
}
EOF
```

#### Step 4: Confirm

```
✓ Active project set to "PROJECT_NAME"

Project ID: cmjk...
Entities: 67
Domains: 3

Commands now use this project:
- /research-entity types → lists types in this project
- /research-discover <domain> → adds entities to this project
- /research-domain list → shows domains in this project
```

---

### MODE: `show` or `show <name>`

Show project details.

#### Step 1: Determine Which Project

- If `<name>` provided: Look up that project
- If no name: Use active project from context

If no active project and no name:
```
ERROR: No active project and no name specified.

Set an active project:
  /research-project use <name>

Or specify a project:
  /research-project show "Project Name"
```

#### Step 2: Load Project

```bash
npm run cli -- project:get '{"projectId": "PROJECT_ID"}'
```

Or by name:
```bash
npm run cli -- project:find '{"name": "PROJECT_NAME"}'
```

#### Step 3: Load Summary Stats

```bash
npm run cli -- search:summary '{"projectId": "PROJECT_ID"}'
```

#### Step 4: Display Details

```
## Project: Agentic SDLC Research

**ID**: cmjk123abc
**Workflow**: DISCOVERY
**Created**: 2026-01-15
**Description**: Research on AI-powered tools transforming software development lifecycle

### Statistics

| Metric | Count |
|--------|-------|
| Entities | 67 |
| Assertions | 234 |
| Validated Assertions | 45 |
| Extractions | 89 |
| Domains | 3 |

### Entity Types

| Type | Count |
|------|-------|
| tool | 45 |
| platform | 12 |
| framework | 8 |
| service | 2 |

### Research Domains

| Domain | Entities |
|--------|----------|
| Agentic-SDLC-Tools | 45 |
| AI-Security-Scanners | 15 |
| GenAI-Observability | 7 |

### Research Gaps

- 62 entities missing pricing extractions
- 45 entities missing compliance data
- 23 entities with no assertions

### Quick Actions
- List entities: /research-entity types
- Deep research: /research-entity <name>
- Discover more: /research-discover <domain>
- Check gaps: npm run cli -- research:gaps '{"projectId": "cmjk123abc"}'
```

---

## CONTEXT FILE FORMAT

The active project is stored in `.claude/context/active-project.json`:

```json
{
  "projectId": "cmjk123abc456def",
  "projectName": "Agentic SDLC Research",
  "setAt": "2026-01-21T14:30:00.000Z"
}
```

### Reading Context in Other Skills

Other skills should read this file to get project context:

```bash
# Check if context exists
if [ -f .claude/context/active-project.json ]; then
  PROJECT_ID=$(cat .claude/context/active-project.json | jq -r '.projectId')
  PROJECT_NAME=$(cat .claude/context/active-project.json | jq -r '.projectName')
else
  echo "No active project. Run: /research-project use <name>"
fi
```

---

## ERROR HANDLING

### No Active Project
```
ERROR: No active project set.

Set an active project:
  /research-project use "Project Name"

Or list available projects:
  /research-project list
```

### Project Not Found
```
ERROR: Project "Unknown Project" not found.

Available projects:
- Agentic SDLC Research
- Federal AI Eval

Create a new project:
  /research-project create "Unknown Project"
```

### Context File Corrupted
```
WARNING: Active project context corrupted. Resetting.

Set a project:
  /research-project use <name>
```

---

## EXAMPLE: Full Workflow

```
User: /research-project list

Claude:
## Research Projects

| Name | ID | Entities | Workflow | Active |
|------|-----|----------|----------|--------|
| Agentic SDLC Research | cmjk123... | 67 | DISCOVERY | |
| Federal AI Eval | cmjk456... | 23 | ANALYSIS | |

Total: 2 projects

---

User: /research-project use "Agentic SDLC Research"

Claude:
✓ Active project set to "Agentic SDLC Research"

Project ID: cmjk123...
Entities: 67
Domains: 3

Commands now use this project automatically.

---

User: /research-entity types

Claude:
## Entity Types in Agentic SDLC Research

| Type | Count | Examples |
|------|-------|----------|
| tool | 45 | Cursor, GitHub Copilot, Tabnine |
| platform | 12 | AWS CodeWhisperer, Azure AI |
| framework | 8 | LangChain, AutoGPT |

Total: 67 entities

---

User: /research-project create Federal Security Tools

Claude: I'll create a new research project.

[AskUserQuestion: Description?]
User: Evaluation of AI security tools for federal government use

[AskUserQuestion: Workflow?]
User: DISCOVERY

Creating project...

✓ Project "Federal Security Tools" created successfully.

Project ID: cmjkabc...
This is now your active project.

## Next Steps
- Create a domain: /research-domain create AI-Security-Tools
- Discover entities: /research-discover AI-Security-Tools
```

---

## RELATED SKILLS

- `/research-entity` - Deep entity research (uses project context)
- `/research-discover` - Entity discovery (creates entities in project)
- `/research-domain` - Domain management (domains belong to projects)
- `/research-to-deck` - Generate presentations from project research
