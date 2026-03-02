# svc-prisma: add-relation

## Command

```
scaffold svc-prisma add-relation <name>
```

## Description

Add relation fields to existing models.

## Injection Target

- **Artifact:** `prisma/schema.prisma` (patch model blocks)

## Status

Planned

## Underlying Technology

Prisma relation fields: `Model Relation[]` (one-to-many), `Model?` (many-to-one), `Model[]` (many-to-many). MongoDB: embedded refs or relation tables. Requires `@relation` for disambiguation.

## Best Practices & Engineering Patterns

Define both sides of a relation. Use `onDelete` for cascade behavior. Avoid N+1: use `include` or `select`. Implicit many-to-many creates join tables automatically.

## Effect Library Usage

Relation loading wrapped in `Effect.gen`; use `include` in single Effect. Compose with repository methods. Handle optional relations with `Effect.succeed` or `Effect.fail`.

## Implementation Considerations

Stub variables: `{{modelA}}`, `{{modelB}}`, `{{relationName}}`, `{{foreignKey}}`. Patch existing model blocks; preserve field order. Run `prisma format` after edits.

## Alternative Technology Considerations

Drizzle: explicit `relations()` and `references()`. TypeORM: `@OneToMany`, `@ManyToOne`. Prisma relations are declarative and auto-inferred.
