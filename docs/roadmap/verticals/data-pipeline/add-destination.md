# Data Pipeline: add-destination

## Command

```
scaffold data-pipeline add-destination <name>
```

## Description

Export destination: S3, warehouse, webhook.

## Injection Target

- **svc-export:** `src/destinations/<name>.ts` (writer impl)
- **Prisma:** `prisma/schema.prisma` (Destination model if needed)
- **Config:** Destination config (credentials, bucket, etc.)

## Co-generation

- `svc-export` (destination writer)
- `svc-storage add-bucket` (if S3)
- `svc-config add-env-var` (credentials)

## Technology & Patterns

- **svc-export**, **svc-storage** (S3). Effect for data→write. Alternatives: BigQuery, Snowflake, Redshift.

## Status

Planned
