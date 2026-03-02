# svc-analytics Package

**Description:** Analytics and events.

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-event-schema](add-event-schema.md) | Add an event schema | `src/events/<name>.ts` |
| [add-funnel](add-funnel.md) | Add a funnel definition | `src/funnels/<name>.ts` |
| [add-dashboard-widget](add-dashboard-widget.md) | Add a dashboard widget | `src/widgets/<name>.ts` |
| [add-export-pipeline](add-export-pipeline.md) | Add an export pipeline | `src/exports/<name>.ts` |

## Underlying Technology

Event storage: Prisma + DB, or Elasticsearch, or BigQuery. Funnels: event sequence queries. Dashboards: aggregated queries. Export: batch to S3/CSV.

## Best Practices & Engineering Patterns

Schema events with Zod; version schemas. Funnels: define steps, filter by properties. Aggregate in background; cache dashboards.

## Effect Library Usage

`Effect.tryPromise` for event ingestion and queries. `AnalyticsService` via Context/Layer. Typed errors: `SchemaError`, `QueryError`. Compose with storage Layer.

## Implementation Considerations

Stub: `{{eventName}}`, `{{funnelName}}`. Registry: `src/events/index.ts`, `src/funnels/index.ts`. Env: `ELASTICSEARCH_URL` or DB.

## Alternative Technology Considerations

PostHog: self-hosted analytics. Mixpanel: product analytics. BigQuery: warehouse. Elasticsearch: custom queries. DB: simple, scalable.
