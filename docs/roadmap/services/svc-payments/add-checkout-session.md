# svc-payments: add-checkout-session

## Command

```
scaffold svc-payments add-checkout-session <name>
```

## Description

Add checkout session logic.

## Injection Target

- **Artifact:** `src/checkout/<name>.ts`
- **Registry:** `src/checkout/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Stripe Checkout Session API. Create session with line_items, success_url, cancel_url. Redirect to Stripe-hosted page.

## Best Practices & Engineering Patterns

Store session ID; use client_reference_id for user. Validate success_url origin. Handle expired sessions.

## Effect Library Usage

`Effect.tryPromise` for session creation. Inject `PaymentsService` via Context. Typed errors for API failures.

## Implementation Considerations

Stub: `{{sessionName}}`, `{{productIds}}`, `{{successUrl}}`. Registry: `src/checkout/index.ts`. Env: `STRIPE_SECRET_KEY`.

## Alternative Technology Considerations

Stripe Elements: custom UI. Checkout: hosted, faster. Paddle: hosted checkout. Same flow: create session, redirect.
