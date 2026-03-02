# Cron: add-task

## Command

```
scaffold cron add-task <name>
```

## Description

Add a task script for one-off execution.

## Injection Target

- **Artifact:** `src/tasks/<name>.ts`

## Status

Proposed

---

## Underlying Technology

**Effect** task scripts. Tasks are standalone scripts; invoked by jobs (local or deployed) or CLI; use Effect for async. Jobs use Effect Cron for schedule definition.

## Best Practices & Engineering Patterns

- **Task patterns:** One task per logical operation; reusable by jobs and CLI; keep idempotent.
- **Script execution:** Use `bun run src/tasks/<name>.ts` or import and call; exit with code for platform.
- **Idempotency:** Design for safe re-run; use locks or idempotency keys for critical work.

## Effect Library Usage

- **Tasks:** Use `Effect.gen` for async logic; `Effect.runPromise` at entry; `Context` for services.
- **Context:** Inject DB, queue, email via Effect `Context`; tasks receive.
- **Errors:** `Effect.fail` with typed errors; log and exit; map to process exit code.

## Implementation Considerations

- **Registry:** Tasks in `src/tasks/`; export `runXxxTask` or default export.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{taskName}}`; export `runXxxTask`.
- **Naming:** `cleanup`, `sync`, `report`; file `tasks/cleanup.ts`.

## Alternative Technology Considerations

- **BullMQ workers:** Tasks as job handlers; Effect Cron for schedule; workers for execution.
- **Temporal activities:** Similar; Effect Cron for simple scheduled tasks.
