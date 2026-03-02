# svc-email: add-queue-handler

## Command

```
scaffold svc-email add-queue-handler <name>
```

## Description

Add a queue-based send handler for async delivery.

## Injection Target

- **Artifact:** `src/queue/<name>.ts`
- **Registry:** `src/queue/index.ts` (optional)

## Status

Proposed

## Underlying Technology

BullMQ/Redis for job queue. Job payload: template ID, recipients, props. Retries with exponential backoff.

## Best Practices & Engineering Patterns

Idempotent job handlers; validate payload with Zod. Retry on transient failures. Dead-letter failed jobs.

## Effect Library Usage

`Effect.tryPromise` for job processing. Compose with Queue and EmailService Layers. Typed errors for job failures.

## Implementation Considerations

Stub: `{{handlerName}}`, `{{jobName}}`. Registry: `src/queue/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Inngest, Trigger.dev for serverless. BullMQ: Redis-based, robust. SQS: AWS-native.
