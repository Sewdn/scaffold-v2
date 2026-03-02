# Data Pipeline: add-schedule

## Command

```
scaffold data-pipeline add-schedule <cron>
```

## Description

Cron/schedule for pipeline runs.

## Injection Target

- **svc-export:** `src/schedules/<name>.ts` (cron, pipeline config)
- **worker:** `src/cron/<name>.ts` (cron handler)
- **Config:** Schedule registry

## Co-generation

- `worker add-cron` (schedule)
- `svc-export` (pipeline config)
- `svc-queue add-scheduler` (if async)

## Technology & Patterns

- **worker** cron, **svc-queue** scheduler. Effect for schedule→run→notify. Alternatives: Inngest, Trigger.dev.

## Status

Planned
