# svc-email: add-webhook-handler

## Command

```
scaffold svc-email add-webhook-handler <name>
```

## Description

Add a webhook handler for email events (bounces, opens).

## Injection Target

- **Artifact:** `src/webhooks/<name>.ts`
- **Registry:** `src/webhooks/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Resend/SendGrid webhook payloads. Signature verification (HMAC). Event types: delivered, bounced, opened, clicked.

## Best Practices & Engineering Patterns

Verify webhook signatures; idempotent handlers. Parse payload with Zod. Queue heavy processing; respond quickly.

## Effect Library Usage

`Effect.tryPromise` for async work; `Effect.sync` for verification. Inject handlers via Context. Typed errors for invalid payloads.

## Implementation Considerations

Stub: `{{handlerName}}`, `{{eventTypes}}`. Registry: `src/webhooks/index.ts`. Env: `RESEND_WEBHOOK_SECRET`.

## Alternative Technology Considerations

Resend/SendGrid have different payload shapes. Use adapter pattern for multi-provider support.
