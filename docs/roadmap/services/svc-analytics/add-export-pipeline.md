# svc-analytics: add-export-pipeline

## Command

```
scaffold svc-analytics add-export-pipeline <name>
```

## Description

Add an export pipeline for analytics data.

## Injection Target

- **Artifact:** `src/exports/<name>.ts`
- **Registry:** `src/exports/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Pipeline: query events → transform → export (S3, CSV, BigQuery). Batch processing. Scheduled or on-demand.

## Best Practices & Engineering Patterns

Batch for large exports; stream to avoid memory. Validate output schema. Idempotent; support resume. Secure export URLs.

## Effect Library Usage

`Effect.tryPromise` for pipeline steps. Stream with Effect Stream for large data. Inject `AnalyticsService` via Context. Typed errors for export failures.

## Implementation Considerations

Stub: `{{pipelineName}}`, `{{query}}`, `{{destination}}`. Registry: `src/exports/index.ts`. Env: `S3_*`, `BIGQUERY_*`.

## Alternative Technology Considerations

BigQuery export, S3, CSV. Same pipeline pattern; destination adapter varies.
