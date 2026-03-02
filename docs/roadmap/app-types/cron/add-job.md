# Cron: add-job

## Command

```
scaffold cron add-job <name> [--local | --deployed]
```

## Description

Add a cron job with schedule. Specify `--local` (Effect Cron in-process) or `--deployed` (external scheduler).

## Injection Target

- **Artifact:** `src/jobs/<name>.ts`
- **Registry:** Job list (`src/jobs/jobs.config.ts`); deployed config in `railway.json` / `.github/workflows`

## Status

Proposed

---

## Local vs Deployed

| Mode | Flag | Trigger |
|------|------|---------|
| **Local** | `--local` (default) | `Effect.repeat(task, Schedule.cron(cron))` in long-lived process |
| **Deployed** | `--deployed` | External scheduler runs `bun run src/tasks/<name>.ts` |

Append to job registry; deployed jobs also added to `railway.json` or `.github/workflows`.

## Underlying Technology

**Effect Cron** ([docs](https://effect.website/docs/scheduling/cron/)). Use `Cron.parse` or `Cron.unsafeParse` for schedule definition; `Schedule.cron(cron)` with `Effect.repeat` for local jobs; cron expression in config for deployed jobs.

## Best Practices & Engineering Patterns

- **Job patterns:** One job per schedule; thin wrapper that invokes task; keep schedule in job or config.
- **Schedule config:** Use Effect Cron for definition; store in job file or `railway.json` / `.github/workflows` for deployed.
- **Invocation:** Local — `Effect.repeat`; deployed — `bun run src/tasks/<name>.ts` or import and call.

## Effect Library Usage

- **Effect Cron:** Use `Cron.parse` or `Cron.unsafeParse`; `Schedule.cron(cron)` with `Effect.repeat` for local jobs. Timezone, `Cron.next`, `Cron.sequence` for testing.
- **Jobs:** Wrap task invocation in `Effect.gen`; `Effect.runPromise` at job boundary.
- **Tasks:** Tasks use Effect for async; jobs delegate; `Context` for services in tasks.
- **Errors:** `Effect.fail` with typed errors; log and exit; platform retries if configured.

## Implementation Considerations

- **Registry:** Job list with `local`/`deployed` per job; deployed config in `railway.json` or `.github/workflows`; append new job.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{cronExpr}}`, `{{taskName}}`, `{{mode}}`; export `xxxJob`.
- **Naming:** `daily-cleanup`, `hourly-sync`; file `jobs/daily-cleanup.ts`.

## Alternative Technology Considerations

- **BullMQ repeatable jobs:** For queue-based execution; Effect Cron for schedule.
- **Bun.cron:** Effect Cron preferred for Effect-native composition.
- **Temporal schedules:** Workflow engine; Effect Cron for simple jobs.
