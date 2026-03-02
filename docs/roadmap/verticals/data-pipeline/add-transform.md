# Data Pipeline: add-transform

## Command

```
scaffold data-pipeline add-transform <name>
```

## Description

Transform job: input/output schema, logic.

## Injection Target

- **svc-transform:** `src/transforms/<name>.ts` (input/output schema, fn)
- **worker:** `src/jobs/transform-<name>.ts` (job handler)
- **domain:** `src/types/<name>-schema.ts` (schemas)

## Co-generation

- `svc-transform` (transform definition)
- `worker add-job` (transform job)
- `domain add-type` (schemas)

## Technology & Patterns

- **svc-transform**, **worker** job. Effect for input→transform→output. Alternatives: dbt, Dagster ops.

## Status

Planned
