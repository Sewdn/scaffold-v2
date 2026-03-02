# svc-payments: add-webhook

## Command

```
scaffold svc-payments add-webhook <name>
```

## Description

Add a webhook handler for payment events.

## Injection Target

- **Artifact:** `src/webhooks/<name>.ts`
- **Registry:** `src/webhooks/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Stripe webhooks: checkout.session.completed, customer.subscription.updated, invoice.paid. Verify with `stripe.webhooks.constructEvent`.

## Best Practices & Engineering Patterns

Verify signature; return 400 on invalid. Idempotent (check idempotency key). Process async; respond 200 quickly. Handle idempotent retries.

## Effect Library Usage

`Effect.tryPromise` for handler logic. `Effect.sync` for signature verification. Typed errors for invalid payload. Inject `PaymentsService`.

## Implementation Considerations

Stub: `{{handlerName}}`, `{{eventTypes}}`. Registry: `src/webhooks/index.ts`. Env: `STRIPE_WEBHOOK_SECRET`.

## Alternative Technology Considerations

Paddle: different webhook format. Stripe: well-documented. Same pattern: verify, parse, process, respond.
