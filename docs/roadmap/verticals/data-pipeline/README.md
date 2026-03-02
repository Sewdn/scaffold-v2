# Data Pipeline Vertical

**Target:** Ingest, transform, export.

**Status:** Planned

## App Types

- `backend` — API + workers
- `cli` — Jobs, migrations
- `frontend-vite` (optional) — Monitoring

## Service Packages

- `svc-ingest` (sources, validation)
- `svc-transform` (jobs, schemas)
- `svc-export` (destinations, schedules)
- `svc-prisma`
- `domain`

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-source](add-source.md) | Ingest source (connector, schema, validation) | svc-ingest |
| [add-transform](add-transform.md) | Transform job (input/output schema, logic) | svc-transform |
| [add-destination](add-destination.md) | Export destination (S3, warehouse, webhook) | svc-export |
| [add-schedule](add-schedule.md) | Cron/schedule for pipeline runs | svc-export, worker |

## Technology & Patterns

- **Prisma** (sources, transforms), **svc-queue** (jobs). Multi-package co-generation (ingest + transform + export).
- **Effect** for source→transform→destination flow. Alternatives: Airbyte, dbt, Dagster.

