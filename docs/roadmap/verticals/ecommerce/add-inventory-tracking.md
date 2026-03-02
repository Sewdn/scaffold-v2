# E-Commerce: add-inventory-tracking

## Command

```
scaffold ecommerce add-inventory-tracking
```

## Description

Stock, reservations, low-stock alerts.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (Inventory, Reservation, StockAlert)
- **svc-catalog:** `src/inventory/` (reserve, release, check)

## Co-generation

- `svc-prisma add-model` (Inventory, Reservation)
- `domain add-event` (StockReserved, StockReleased)
- `svc-queue add-job` (low-stock alerts)

## Technology & Patterns

- **Prisma** (Inventory, Reservation), **svc-queue** for alerts. Effect for reserve→release flow. Alternatives: Medusa.

## Status

Planned
