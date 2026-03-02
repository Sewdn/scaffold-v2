# svc-prisma: add-migration

## Command

```
scaffold svc-prisma add-migration <name>
```

## Description

Create migration from schema diff.

## Injection Target

- **Artifact:** `prisma/migrations/<timestamp>_<name>/`

## Status

Planned

## Underlying Technology

Prisma Migrate: `prisma migrate dev --name <name>` creates a timestamped folder with `migration.sql`. Tracks applied migrations in `_prisma_migrations` table.

## Best Practices & Engineering Patterns

Descriptive names (e.g. `add_user_email_index`). One logical change per migration. Never edit applied migrations; add new ones. Use `prisma migrate deploy` in production.

## Effect Library Usage

Migration execution can be wrapped in `Effect.tryPromise` for CI/CD. Use `Effect.gen` if running migrations as part of app startup. Fail fast on migration errors.

## Implementation Considerations

Stub variables: `{{migrationName}}`, `{{timestamp}}`. Folder format: `<timestamp>_<name>/migration.sql`. Scaffold may only create placeholder; actual SQL from `prisma migrate dev`.

## Alternative Technology Considerations

Drizzle Kit: `drizzle-kit generate`. TypeORM: `synchronize` (dev only) or migrations. Kysely: no built-in migrations; use knex or custom scripts.
