# Worker: add-queue

## Command

```
scaffold worker add-queue <name>
```

## Description

Add a queue consumer handler.

## Injection Target

- **Artifact:** `src/queues/<name>.ts`
- **Registry:** Queue consumer registration

## Status

Proposed

---

## Underlying Technology

**Bun + queue backend** — Queue consumer pulls jobs; invokes job handlers. In-memory or Redis (e.g. BullMQ) for persistence.

## Best Practices & Engineering Patterns

- **Consumer loop:** Poll or subscribe; process one job at a time or with concurrency limit.
- **Ack/nack:** Acknowledge on success; nack with requeue on retryable failure.
- **Dead letter:** Route failed jobs to DLQ after max retries.

## Effect Library Usage

- **Consumer:** Run `Effect.gen` loop; `Effect.runPromise` per job.
- **Context:** Provide queue client via `Layer`; handlers access via `Context`.
- **Streaming:** Use `Effect.async` or `Stream` for queue subscription if supported.

## Implementation Considerations

- **Registry patch:** Register queue consumer in worker bootstrap; use marker comment.
- **Stub variables:** `{{name}}`, `{{queueName}}`, `{{concurrency}}`.
- **Idempotency:** Skip if `src/queues/<name>.ts` exists; merge consumer registration.

## Alternative Technology Considerations

- **BullMQ vs Inngest:** Redis-based vs serverless; BullMQ for self-hosted, Inngest for managed.
- **SQS/SNS:** AWS-native; different API; scaffold assumes Bun-compatible backend.
