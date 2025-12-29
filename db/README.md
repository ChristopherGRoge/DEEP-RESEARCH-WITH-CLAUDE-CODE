# Research System Database

PostgreSQL database for persisting research data across sessions.

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Start PostgreSQL container
docker run -d --name research-db \
  -e POSTGRES_DB=research_system \
  -e POSTGRES_USER=research \
  -e POSTGRES_PASSWORD=<secure-password> \
  -p 5432:5432 \
  -v research_data:/var/lib/postgresql/data \
  postgres:14

# Apply schema
docker exec -i research-db psql -U research -d research_system < schema.sql
```

### Option 2: Local PostgreSQL

```bash
# Create database
createdb research_system

# Apply schema
psql research_system < schema.sql
```

### Option 3: Managed PostgreSQL

Connect to your managed instance and run `schema.sql`.

## Connection String

Set environment variable for agents to use:

```bash
export RESEARCH_DB_CONNECTION="postgresql://research:<password>@localhost:5432/research_system"
```

## Schema Overview

```
┌─────────────────────┐
│ research_sessions   │──────────────────────────────────────────┐
└─────────────────────┘                                          │
         │                                                       │
         │ 1:N                                                   │
         ▼                                                       │
┌─────────────────────┐     ┌─────────────────────┐             │
│     entities        │     │      sources        │◄────────────┤
└─────────────────────┘     └─────────────────────┘             │
         │                           │                          │
         │ 1:N                       │ 1:N                      │
         ▼                           │                          │
┌─────────────────────┐              │                          │
│    assertions       │◄─────────────┘                          │
└─────────────────────┘                                         │
                                                                │
┌─────────────────────┐     ┌─────────────────────┐             │
│   deliverables      │◄────┤  agent_activity     │◄────────────┘
└─────────────────────┘     └─────────────────────┘
```

## Tables

| Table | Purpose |
|-------|---------|
| `research_sessions` | Each RESEARCH.md creates a session |
| `entities` | Tools/platforms discovered |
| `sources` | URLs and references |
| `assertions` | Claims about entities (Claim → Evidence lifecycle) |
| `deliverables` | Generated research outputs |
| `agent_activity` | Audit log of agent operations |

## Status Lifecycles

### Assertion Status
```
claim → evidence (validated)
      → refuted (contradicted)
      → unverifiable (cannot confirm)
      → superseded (newer data found)
```

### Source Status
```
proposed → validated (human verified)
         → invalid (broken/unreliable)
         → outdated (stale information)
```

### Entity Status
```
discovered → approved_for_analysis → analyzing → analyzed → recommended
                                                          → monitoring
                                                          → excluded
```

## Views

| View | Purpose |
|------|---------|
| `entity_summary` | Entity with claim/evidence counts |
| `session_progress` | Overview of session completion |
| `cost_by_model` | API cost breakdown by model |

## Common Queries

### Get all entities for a session
```sql
SELECT * FROM entity_summary
WHERE session_id = '<session-uuid>'
ORDER BY federal_score DESC;
```

### Get pending claims to validate
```sql
SELECT e.name, a.claim_text, s.url
FROM assertions a
JOIN entities e ON a.entity_id = e.id
JOIN sources s ON a.source_id = s.id
WHERE a.status = 'claim'
ORDER BY e.name;
```

### Get session cost breakdown
```sql
SELECT * FROM cost_by_model
WHERE session_id = '<session-uuid>';
```

### Update assertion to evidence
```sql
UPDATE assertions SET
  status = 'evidence',
  evidence_url = '<url>',
  evidence_notes = '<notes>',
  validated_by = 'human',
  validated_at = NOW()
WHERE id = '<assertion-uuid>';
```

## Backup

```bash
# Backup
pg_dump research_system > backup_$(date +%Y%m%d).sql

# Restore
psql research_system < backup_20250115.sql
```

## Migrations

Future schema changes should be added as numbered migration files:

```
db/
├── schema.sql          # Initial schema
├── migrations/
│   ├── 001_add_field.sql
│   └── 002_new_table.sql
└── README.md
```

Apply migrations:
```bash
psql research_system < migrations/001_add_field.sql
```
