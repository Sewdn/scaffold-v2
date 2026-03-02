# svc-prisma Package

**Description:** Data service with Prisma ORM.

**Status:** Planned (high priority)

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-model](add-model.md) | Add a Prisma model | `prisma/schema.prisma` |
| [add-migration](add-migration.md) | Create migration from schema diff | `prisma/migrations/` |
| [add-seed](add-seed.md) | Add seed data for a model | `prisma/seed.ts` |
| [add-enum](add-enum.md) | Add a Prisma enum | `prisma/schema.prisma` |
| [add-relation](add-relation.md) | Add relation fields to existing models | `prisma/schema.prisma` |

## Underlying Technology

Prisma ORM with MongoDB (replica set). Schema-first approach via `schema.prisma`; migrations generate SQL; Prisma Client provides type-safe queries. Supports both SQL (Postgres, MySQL) and MongoDB providers.

## Best Practices & Engineering Patterns

Repository pattern: wrap Prisma in repositories that implement domain interfaces. Keep schema in sync with domain entities; use migrations for all schema changes. Prefer explicit relation definitions over implicit; use `@@index` for query performance.

## Effect Library Usage

Wrap DB operations in `Effect.tryPromise` or `Effect.gen` for composable async. Provide `PrismaClient` via Effect Context/Layer. Use `Effect.fail` for domain errors (e.g. `NotFound`, `Conflict`). Compose services with `Layer.merge` and dependency injection.

## Implementation Considerations

Schema changes require `prisma migrate dev` or `prisma db push`. Migration names: `YYYYMMDDHHMMSS_descriptive_name`. Barrel exports from `src/index.ts`. Stub variables: `{{modelName}}`, `{{enumName}}`, `{{relationName}}`.

## Alternative Technology Considerations

Drizzle: lighter, SQL-first, better raw SQL ergonomics. TypeORM: decorator-based, mature. Kysely: type-safe query builder, no ORM. Prisma excels at schema-first workflows and MongoDB support.
