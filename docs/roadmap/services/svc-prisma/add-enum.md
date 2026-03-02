# svc-prisma: add-enum

## Command

```
scaffold svc-prisma add-enum <name>
```

## Description

Add a Prisma enum to the schema.

## Injection Target

- **Artifact:** `prisma/schema.prisma` (append enum block)

## Status

Planned

## Underlying Technology

Prisma enum blocks in `schema.prisma`. MongoDB: stored as strings. SQL: native enum type. Exposed as TypeScript enums in generated client.

## Best Practices & Engineering Patterns

Use enums for fixed value sets (status, type, role). Avoid large enums; consider separate table for extensible lists. Add new values via migration.

## Effect Library Usage

Enum values flow through Effect pipelines as plain values. Use `Effect.fail` if invalid enum received. No special Effect integration for enums.

## Implementation Considerations

Stub variables: `{{enumName}}`, `{{values}}`. Append to schema. MongoDB enums are string-backed; SQL enums are native. Regenerate client after changes.

## Alternative Technology Considerations

Drizzle: `pgEnum()` or string unions. TypeORM: `enum` column type. Prisma enums are first-class and well-typed.
