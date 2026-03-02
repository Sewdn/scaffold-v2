# E-Commerce: add-payment-provider

## Command

```
scaffold ecommerce add-payment-provider <name>
```

## Description

Payment gateway (Stripe, PayPal).

## Injection Target

- **svc-checkout:** `src/payments/<name>.ts` (provider impl)
- **Backend:** `src/webhooks/<name>.ts` (webhook handler)

## Co-generation

- `svc-payments add-provider` (if using svc-payments)
- `backend add-route` (webhook)

## Technology & Patterns

- **Stripe** (primary), PayPal. Effect for webhook→order update. Alternatives: Adyen, Square.

## Status

Planned
