# SaaS: add-usage-meter

## Command

```
scaffold saas add-usage-meter <name>
```

## Description

Usage-based billing: meter model, events, aggregation.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (Meter, MeterEvent models)
- **svc-payments:** `src/meters/<name>.ts` (Stripe metering)
- **Backend:** `src/routes/meters/` (event ingestion)

## Co-generation

- `svc-prisma add-model` (Meter, MeterEvent)
- `svc-payments` (usage metering)
- `backend add-route` (meter events)

## Technology & Patterns

- **Stripe** metering API, **Prisma** Meter. Effect for event→aggregate→billing. Alternatives: Lago, Metronome.

## Status

Planned
