# E-Commerce: add-product-type

## Command

```
scaffold ecommerce add-product-type <name>
```

## Description

Product schema: SKU, variants, attributes, pricing.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (ProductType, ProductVariant, ProductAttribute)
- **svc-catalog:** `src/types/<name>.ts` (schema definition)
- **domain:** `src/entities/Product.ts` (extend)

## Co-generation

- `svc-prisma add-model` (ProductType, ProductVariant)
- `domain add-entity` (Product)
- `domain add-value-object` (SKU, Price)

## Technology & Patterns

- **Prisma** (ProductType, variants), **domain** entities. Effect for catalog→inventory flows. Alternatives: Supabase.

## Status

Planned
