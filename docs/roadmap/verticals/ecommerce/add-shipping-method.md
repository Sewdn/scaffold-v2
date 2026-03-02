# E-Commerce: add-shipping-method

## Command

```
scaffold ecommerce add-shipping-method <name>
```

## Description

Shipping rules: zones, rates, carriers.

## Injection Target

- **svc-checkout:** `src/shipping/<name>.ts` (zone, rate logic)
- **Prisma:** `prisma/schema.prisma` (ShippingMethod, ShippingZone)

## Co-generation

- `svc-prisma add-model` (ShippingMethod, ShippingZone)
- `svc-checkout` (shipping calculator)

## Technology & Patterns

- **Prisma** (ShippingMethod, zones). Effect for checkout→shipping calc. Alternatives: ShipEngine, EasyPost.

## Status

Planned
