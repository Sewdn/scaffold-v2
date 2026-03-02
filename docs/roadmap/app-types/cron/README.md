# Cron App Type

**Description:** Cron/scheduled jobs — local (Effect Cron) or deployed (Railway, GitHub Actions).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-job](add-job.md) | Add a cron job with schedule | `src/jobs/<name>.ts` |
| [add-task](add-task.md) | Add a task script | `src/tasks/<name>.ts` |

## Job Execution: Local vs Deployed

Use **Effect Cron** ([docs](https://effect.website/docs/scheduling/cron/)) for all cron schedule definition, parsing, and validation. Jobs run in one of two modes:

| Mode | Trigger | Use case |
|------|---------|----------|
| **Local** | In-process via `Effect.repeat(task, Schedule.cron(cron))` | Long-lived worker; single instance; dev or self-hosted |
| **Deployed** | External scheduler invokes `bun run src/tasks/<name>.ts` | Railway cron, GitHub Actions, system crontab; serverless/event-driven |

Registry: `src/jobs/jobs.config.ts` (or similar) lists jobs; each entry specifies `local` or `deployed` and the cron expression. Deployed jobs also appear in `railway.json` / `.github/workflows`.

## Underlying Technology

**Effect Cron** — required. Use `Cron.parse` / `Cron.unsafeParse` for schedules; `Schedule.cron(cron)` with `Effect.repeat` for local jobs; cron expression in config for deployed jobs. Timezone via `Cron.make({ ..., tz })`.

## Best Practices & Engineering Patterns

- **Job patterns:** One job per schedule; delegate to task scripts; keep job file thin (schedule + invoke).
- **Task scripts:** Reusable logic in `src/tasks/`; jobs invoke tasks; tasks use Effect for async.
- **Idempotency:** Design tasks for safe re-run; use locks or idempotency keys for critical work.

## Effect Library Usage

- **Effect Cron:** Use `Cron.parse` or `Cron.unsafeParse` for schedule definition; `Schedule.cron(cron)` with `Effect.repeat(task, schedule)` for local jobs. Supports timezone, `Cron.next`, `Cron.sequence` for testing.
- **Jobs:** Wrap task invocation in `Effect.gen`; `Effect.runPromise` at job boundary.
- **Tasks:** Use Effect for all async work; `Context` for services (DB, queue, email).
- **Errors:** `Effect.fail` with typed errors; log and exit; platform retries if configured.

## Implementation Considerations

- **Registry:** Jobs in `src/jobs/`; tasks in `src/tasks/`; job list with local/deployed flag; deployed config in `railway.json` / `.github/workflows`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{cronExpr}}`; export `xxxJob`, `runXxxTask`.
- **Naming:** `daily-cleanup`, `hourly-sync`; file `jobs/daily-cleanup.ts`, `tasks/cleanup.ts`.

## Alternative Technology Considerations

- **BullMQ repeatable jobs:** For queue-based job execution; Effect Cron for schedule definition.
- **Bun.cron:** Native Bun cron; Effect Cron preferred for Effect-native composition.
- **Temporal/Inngest:** Workflow engines; Effect Cron for simple scheduled jobs.
