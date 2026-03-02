# Worker: add-cron

## Command

```
scaffold worker add-cron <name>
```

## Description

Add a cron schedule and handler.

## Injection Target

- **Artifact:** `src/cron/<name>.ts`
- **Registry:** Cron scheduler config

## Status

Proposed

---

## Underlying Technology

**Bun.cron** — Native cron in Bun runtime. Cron expression + handler; runs in-process or via worker.

## Best Practices & Engineering Patterns

- **Cron expressions:** Standard 5-field (min, hour, day, month, dow); use crontab.guru for validation.
- **Overlap:** Prevent overlapping runs (mutex or `running` flag) for long jobs.
- **Logging:** Log start/end with schedule name; capture errors for alerting.

## Effect Library Usage

- **Handler:** Implement as `Effect`; run with `Effect.runPromise` in cron callback.
- **Context:** Inject services via `Layer`; provide at worker startup.
- **Errors:** `Effect.catchAll` to log and prevent crash; optional alert on failure.

## Implementation Considerations

- **Registry patch:** Append cron to `Bun.cron` config or scheduler registry; use marker comment.
- **Stub variables:** `{{name}}`, `{{schedule}}`, `{{timezone}}`.
- **Idempotency:** Skip if `src/cron/<name>.ts` exists; merge into cron config.

## Alternative Technology Considerations

- **node-cron / croner:** Cross-runtime cron libs; `Bun.cron` for Bun-native.
- **External scheduler:** Kubernetes CronJob, GitHub Actions; for distributed setups.
