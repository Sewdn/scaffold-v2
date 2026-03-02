# svc-queue: add-worker

## Command

```
scaffold svc-queue add-worker <name>
```

## Description

Add a worker process for job consumption.

## Injection Target

- **Artifact:** `src/workers/<name>.ts`
- **Registry:** `src/workers/index.ts` (optional)

## Status

Proposed

## Underlying Technology

BullMQ Worker: connects to queue, processes jobs. Concurrency, rate limit. Graceful shutdown on SIGTERM.

## Best Practices & Engineering Patterns

One worker per queue (or queue type). Set concurrency based on resource. Handle shutdown; drain in-flight jobs.

## Effect Library Usage

`Effect.tryPromise` for job processing. Worker as Effect-managed resource. Inject `QueueService` via Context.

## Implementation Considerations

Stub: `{{workerName}}`, `{{queueName}}`, `{{concurrency}}`. Registry: `src/workers/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Inngest: no worker process. BullMQ: dedicated worker. Same job interface across adapters.
