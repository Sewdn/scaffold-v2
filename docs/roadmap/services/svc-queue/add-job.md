# svc-queue: add-job

## Command

```
scaffold svc-queue add-job <name>
```

## Description

Add a job handler for queue processing.

## Injection Target

- **Artifact:** `src/jobs/<name>.ts`
- **Registry:** `src/jobs/index.ts` (optional)

## Status

Proposed

## Underlying Technology

BullMQ job: name, data (Zod-validated), options (attempts, backoff, priority). Processor: async (job) => Effect.

## Best Practices & Engineering Patterns

Validate job data with Zod. Idempotent handlers. Use job id for deduplication. Log progress; handle failures.

## Effect Library Usage

`Effect.tryPromise` for job logic; `Effect.gen` for multi-step. Inject `QueueService` via Context. Typed errors for job failures.

## Implementation Considerations

Stub: `{{jobName}}`, `{{dataSchema}}`. Registry: `src/jobs/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Inngest: serverless. BullMQ: Redis. SQS: AWS. Job interface is portable with adapter.
