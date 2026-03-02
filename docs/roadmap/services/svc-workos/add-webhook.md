# svc-workos: add-webhook

## Command

```
scaffold svc-workos add-webhook <name>
```

## Description

Add a webhook handler for WorkOS events.

## Injection Target

- **Artifact:** `src/webhooks/<name>.ts`
- **Registry:** `src/webhooks/index.ts` (optional)

## Status

Proposed

## Underlying Technology

WorkOS webhooks: connection.created, user.created, dsync.user.created, etc. Verify with `workos.webhooks.verify()`. Payload: event, data.

## Best Practices & Engineering Patterns

Verify signature; return 401 on invalid. Idempotent handlers. Process async; respond 200 quickly. Handle retries.

## Effect Library Usage

`Effect.tryPromise` for handler logic. `Effect.sync` for verification. Typed errors for invalid payload. Inject `WorkOSService`.

## Implementation Considerations

Stub: `{{handlerName}}`, `{{eventTypes}}`. Registry: `src/webhooks/index.ts`. Env: `WORKOS_WEBHOOK_SECRET`.

## Alternative Technology Considerations

Auth0/Clerk: different webhook format. WorkOS: enterprise events. Same verify-parse-process pattern.
