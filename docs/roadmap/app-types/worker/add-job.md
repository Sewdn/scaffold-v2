# Worker: add-job

## Command

```
scaffold worker add-job <name>
```

## Description

Add a job handler for background processing.

## Injection Target

- **Artifact:** `src/jobs/<name>.ts`
- **Registry:** Job registry (if applicable)

## Status

Proposed

---

## Underlying Technology

**Bun workers** — Job handler invoked by queue consumer or scheduler. Typically async function receiving job payload.

## Best Practices & Engineering Patterns

- **Idempotency:** Design for duplicate delivery; use idempotency keys when critical.
- **Payload validation:** Validate job payload (Zod) before processing.
- **Handler signature:** `(payload: T) => Promise<void>` or `Effect<void, JobError>`.

## Effect Library Usage

- **Handler:** Implement as `Effect.gen`; use `Effect.runPromise` at queue boundary.
- **Context:** Access DB, services via `Context`; compose with `Layer.provide`.
- **Errors:** `Effect.fail` for retryable vs non-retryable; map to queue ack/nack.

## Implementation Considerations

- **Registry patch:** Register handler in job registry; map job type to handler.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{payloadType}}`.
- **Idempotency:** Skip if `src/jobs/<name>.ts` exists; merge registry entry.

## Alternative Technology Considerations

- **BullMQ:** Redis-backed; richer features. Bun native for lightweight deployments.
- **Inngest:** Serverless jobs; different invocation model.
