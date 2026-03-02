# E-Commerce Vertical

**Target:** Products, cart, checkout.

**Status:** Planned

## App Types

- `frontend-nextjs` — Storefront
- `backend` — API
- `cli` (optional) — Admin, import tools

## Service Packages

- `svc-catalog` (products, categories, variants)
- `svc-cart`
- `svc-checkout` (orders, payments)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-product-type](add-product-type.md) | Product schema (SKU, variants, attributes, pricing) | svc-catalog, prisma |
| [add-shipping-method](add-shipping-method.md) | Shipping rules (zones, rates, carriers) | svc-checkout |
| [add-payment-provider](add-payment-provider.md) | Payment gateway (Stripe, PayPal) | svc-checkout |
| [add-inventory-tracking](add-inventory-tracking.md) | Stock, reservations, low-stock alerts | svc-catalog, prisma |

## Technology & Patterns

- **Stripe** (checkout), **Prisma** (products, orders). Multi-package co-generation (catalog + checkout + cart).
- **Effect** for cart→checkout→payment flow. Alternatives: Supabase, Medusa.
