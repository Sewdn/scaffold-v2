# svc-queue Package

**Description:** Job queue (BullMQ, Bull, Inngest).

**Status:** Proposed

## Expansion Commands

| Command                                 | Description          | Spec                       |
| --------------------------------------- | -------------------- | -------------------------- |
| [add-job](add-job.md)                   | Add a job handler    | `src/jobs/<name>.ts`       |
| [add-worker](add-worker.md)             | Add a worker process | `src/workers/<name>.ts`    |
| [add-retry-policy](add-retry-policy.md) | Add a retry policy   | `src/policies/<name>.ts`   |
| [add-scheduler](add-scheduler.md)       | Add a scheduled job  | `src/schedulers/<name>.ts` |

## Underlying Technology

BullMQ (Redis-backed), Bull, Inngest. Job queues with retries, concurrency, priority. Cron for scheduled jobs.

## Best Practices & Engineering Patterns

Idempotent job handlers; validate payload with Zod. Retry with exponential backoff; dead-letter for failed jobs. Use job options: attempts, backoff.

## Effect Library Usage

`Effect.tryPromise` for queue ops and job processing. `QueueService` via Context/Layer. Typed errors: `JobError`, `RetryExhausted`. Compose with Redis Layer.

## Implementation Considerations

Stub: `{{jobName}}`, `{{queueName}}`. Registry: `src/jobs/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Inngest: serverless, event-driven. Trigger.dev: background jobs. BullMQ: Redis-based, robust. SQS: AWS-native.
