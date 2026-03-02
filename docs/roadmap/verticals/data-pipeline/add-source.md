# Data Pipeline: add-source

## Command

```
scaffold data-pipeline add-source <name>
```

## Description

Ingest source: connector, schema, validation.

## Injection Target

- **svc-ingest:** `src/sources/<name>.ts` (connector, schema)
- **Prisma:** `prisma/schema.prisma` (Source, SourceRun models if needed)
- **domain:** `src/types/<name>-schema.ts` (validation schema)

## Co-generation

- `svc-ingest` (source connector)
- `domain add-type` (schema)
- `svc-prisma add-model` (Source)

## Technology & Patterns

- **Prisma** (Source), **domain** schema. Effect for connect→validate→ingest. Alternatives: Airbyte, Fivetran.

## Status

Planned
