# SaaS: add-plan

## Command

```
scaffold saas add-plan <name>
```

## Description

Subscription tier: plan model, Stripe product/price, feature flags.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (Plan model)
- **svc-payments:** `src/plans/<name>.ts` (Stripe product/price mapping)
- **svc-config:** Feature flag config per plan

## Co-generation

- `svc-prisma add-model` (Plan)
- `svc-payments add-subscription-plan`
- `svc-config add-config-section` (feature flags)

## Technology & Patterns

- **Stripe** product/price, **Prisma** Plan model. Effect for plan→feature-flag flow. Alternatives: Paddle, LemonSqueezy.

## Status

Planned
