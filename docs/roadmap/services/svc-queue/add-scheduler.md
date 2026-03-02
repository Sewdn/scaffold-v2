# svc-queue: add-scheduler

## Command

```
scaffold svc-queue add-scheduler <name>
```

## Description

Add a scheduled job (cron, recurring).

## Injection Target

- **Artifact:** `src/schedulers/<name>.ts`
- **Registry:** `src/schedulers/index.ts` (optional)

## Status

Proposed

## Underlying Technology

BullMQ RepeatableJob or cron. Cron expression (e.g. `0 * * * *` hourly). Or external cron triggering queue add.

## Best Practices & Engineering Patterns

Use cron for predictable schedules. Idempotent jobs (check before work). Avoid overlapping runs; use job locks if needed.

## Effect Library Usage

`Effect.tryPromise` for scheduled job logic. Scheduler as Effect resource. Inject `QueueService` via Context.

## Implementation Considerations

Stub: `{{schedulerName}}`, `{{cronExpression}}`, `{{jobName}}`. Registry: `src/schedulers/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Inngest: cron triggers. node-cron: in-process. BullMQ: Redis-backed, distributed. External: GitHub Actions, Railway cron.
