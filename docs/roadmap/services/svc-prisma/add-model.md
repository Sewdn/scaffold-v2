# svc-prisma: add-model

## Command

```
scaffold svc-prisma add-model <name>
```

## Description

Add a Prisma model to the schema.

## Injection Target

- **Artifact:** `prisma/schema.prisma` (append model block)

## Status

Planned

## Underlying Technology

Prisma model blocks in `schema.prisma`. Maps to MongoDB collections or SQL tables. Fields use Prisma scalar types (`String`, `Int`, `DateTime`, `Json`, etc.) and relation syntax.

## Best Practices & Engineering Patterns

One model per aggregate root where possible. Use `@@map` for collection/table naming. Add `id` (or `_id` for MongoDB) as primary key. Consider `createdAt`/`updatedAt` for audit.

## Effect Library Usage

Repositories wrapping Prisma model access use `Effect.gen` for multi-step operations. Inject `PrismaClient` via Context. Use `Effect.fail` for validation or not-found cases.

## Implementation Considerations

Stub variables: `{{modelName}}`, `{{fields}}`, `{{mapName}}`. Append to schema; preserve generator and datasource blocks. Run `prisma generate` after schema changes.

## Alternative Technology Considerations

Drizzle uses `pgTable`/schema objects. TypeORM uses entity classes with decorators. Prisma models are declarative and generate a typed client.
