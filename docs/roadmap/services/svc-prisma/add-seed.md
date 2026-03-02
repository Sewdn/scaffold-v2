# svc-prisma: add-seed

## Command

```
scaffold svc-prisma add-seed <name>
```

## Description

Add seed data for a model.

## Injection Target

- **Artifact:** `prisma/seed.ts` (append or extend seed logic)

## Status

Planned

## Underlying Technology

Prisma seed script: `prisma/seed.ts` (or configured in `package.json`). Run via `prisma db seed`. Uses `PrismaClient` to insert/upsert data.

## Best Practices & Engineering Patterns

Idempotent seeds: use `upsert` or check-before-insert. Seed dev/test data; avoid production secrets. Order seeds by dependency (e.g. users before orders).

## Effect Library Usage

Wrap seed execution in `Effect.gen`; use `Effect.tryPromise` for Prisma calls. Provide `PrismaClient` via Layer. Run as `Effect.runPromise` in seed script.

## Implementation Considerations

Stub variables: `{{modelName}}`, `{{seedData}}`. Append to `seed.ts` or extend existing seed functions. Configure `prisma.seed` in `package.json` if not default.

## Alternative Technology Considerations

Drizzle: custom seed scripts. TypeORM: `DataSource.runMigrations` + custom seed. Prisma seed is a simple script entry point.
