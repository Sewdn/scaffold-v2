# Worker App Type

**Description:** Background worker (Bun workers, job queues, cron).

**Status:** Proposed

## Expansion Commands

| Command                   | Description                   | Spec                   |
| ------------------------- | ----------------------------- | ---------------------- |
| [add-job](add-job.md)     | Add a job handler             | `src/jobs/<name>.ts`   |
| [add-cron](add-cron.md)   | Add a cron schedule + handler | `src/cron/<name>.ts`   |
| [add-queue](add-queue.md) | Add a queue consumer          | `src/queues/<name>.ts` |
| [add-task](add-task.md)   | Add a one-off task handler    | `src/tasks/<name>.ts`  |

## Underlying Technology

**Bun workers/queues** — Native Bun worker threads; `Bun.serve` for HTTP; cron via `Bun.cron` or external scheduler. Job queues via in-memory or Redis.

## Best Practices & Engineering Patterns

- **Job handlers:** Pure functions or Effect programs; idempotent where possible.
- **Retries:** Configure retry policy; exponential backoff for transient failures.
- **Logging:** Structured logs with job ID, queue name, duration.

## Effect Library Usage

- **Handlers:** Implement as `Effect<Result, JobError>`; run with `Effect.runPromise` at worker boundary.
- **Context:** Inject DB, queues, config via Effect `Context`; provide via `Layer`.
- **Errors:** `Effect.fail` with typed errors; map to retry/skip/dlq decisions.

## Implementation Considerations

- **Registry patching:** Append job/queue/cron to registry; use marker comments.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{queueName}}`, `{{schedule}}`.
- **Idempotency:** Skip if handler file exists; merge into registry idempotently.

## Alternative Technology Considerations

- **BullMQ/Inngest:** Redis-based queues vs serverless; Bun native for simplicity.
- **Temporal/Trigger.dev:** Durable workflows; scaffold assumes simpler job model.
