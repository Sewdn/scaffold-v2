# svc-payments: add-product

## Command

```
scaffold svc-payments add-product <name>
```

## Description

Add a product config for payments.

## Injection Target

- **Artifact:** `src/products/<name>.ts`
- **Registry:** `src/products/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Stripe Product + Price API. One-time or recurring. Price in smallest unit (cents). Metadata for app-specific data.

## Best Practices & Engineering Patterns

Create products in Stripe dashboard or API. Use metadata for internal IDs. Sync product list; cache in app.

## Effect Library Usage

`Effect.tryPromise` for Stripe API calls. Inject `PaymentsService` via Context. Typed errors for API failures.

## Implementation Considerations

Stub: `{{productName}}`, `{{priceAmount}}`, `{{currency}}`. Registry: `src/products/index.ts`. Env: `STRIPE_SECRET_KEY`.

## Alternative Technology Considerations

Paddle: product catalog. Stripe: Products + Prices. Same concepts, different API shapes.
