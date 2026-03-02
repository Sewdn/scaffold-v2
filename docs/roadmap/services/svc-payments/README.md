# svc-payments Package

**Description:** Payments (Stripe, Paddle).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-product](add-product.md) | Add a product config | `src/products/<name>.ts` |
| [add-webhook](add-webhook.md) | Add a webhook handler | `src/webhooks/<name>.ts` |
| [add-checkout-session](add-checkout-session.md) | Add checkout session logic | `src/checkout/<name>.ts` |
| [add-subscription-plan](add-subscription-plan.md) | Add a subscription plan | `src/plans/<name>.ts` |

## Underlying Technology

Stripe (primary), Paddle. Products, prices, checkout sessions, webhooks. Subscription billing with metered usage.

## Best Practices & Engineering Patterns

Verify webhook signatures (Stripe-Signature). Idempotent webhook handlers. Use checkout for payment; handle success/cancel. Store customer IDs.

## Effect Library Usage

`Effect.tryPromise` for Stripe API. `PaymentsService` via Context/Layer. Typed errors: `PaymentError`, `WebhookError`. Compose with config Layer.

## Implementation Considerations

Stub: `{{productName}}`, `{{planName}}`. Registry: `src/products/index.ts`, `src/webhooks/index.ts`. Env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Alternative Technology Considerations

Paddle: handles tax/VAT. Lemon Squeezy: creator-focused. Stripe: mature, full-featured. Braintree: PayPal ecosystem.
