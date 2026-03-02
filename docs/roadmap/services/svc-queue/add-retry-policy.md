# svc-queue: add-retry-policy

## Command

```
scaffold svc-queue add-retry-policy <name>
```

## Description

Add a retry policy for failed jobs.

## Injection Target

- **Artifact:** `src/policies/<name>.ts`
- **Registry:** `src/policies/index.ts` (optional)

## Status

Proposed

## Underlying Technology

BullMQ job options: attempts, backoff (fixed/exponential). Retryable errors vs permanent failures. Move to failed queue after exhaustion.

## Best Practices & Engineering Patterns

Exponential backoff for transient failures. Distinguish retryable (network) vs permanent (validation). Max attempts; dead-letter.

## Effect Library Usage

`Effect.retry` for transient retries; `Effect.fail` for permanent. Job options from policy. Typed errors for exhaustion.

## Implementation Considerations

Stub: `{{policyName}}`, `{{attempts}}`, `{{backoffType}}`. Registry: `src/policies/index.ts`.

## Alternative Technology Considerations

Inngest: built-in retries. BullMQ: full control. SQS: visibility timeout. Policy is config, not provider-specific.
