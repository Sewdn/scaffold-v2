# svc-payments: add-subscription-plan

## Command

```
scaffold svc-payments add-subscription-plan <name>
```

## Description

Add a subscription plan config.

## Injection Target

- **Artifact:** `src/plans/<name>.ts`
- **Registry:** `src/plans/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Stripe Price (recurring) + Product. Billing interval (month/year). Trial period. Metered or licensed.

## Best Practices & Engineering Patterns

Map plan to Stripe Price ID. Store subscription ID in DB. Handle plan changes; prorate. Sync with webhooks.

## Effect Library Usage

`Effect.tryPromise` for subscription ops. Inject `PaymentsService` via Context. Typed errors for plan/subscription failures.

## Implementation Considerations

Stub: `{{planName}}`, `{{interval}}`, `{{priceId}}`. Registry: `src/plans/index.ts`. Env: `STRIPE_SECRET_KEY`.

## Alternative Technology Considerations

Paddle: subscription management. Stripe: full control. Recurly: enterprise. Same concepts, different APIs.
