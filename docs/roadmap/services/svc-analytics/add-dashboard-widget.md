# svc-analytics: add-dashboard-widget

## Command

```
scaffold svc-analytics add-dashboard-widget <name>
```

## Description

Add a dashboard widget for analytics display.

## Injection Target

- **Artifact:** `src/widgets/<name>.ts`
- **Registry:** `src/widgets/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Widget: query (count, sum, funnel) + visualization (chart, table). Cached result; refresh interval. API for frontend.

## Best Practices & Engineering Patterns

Cache widget data; set TTL. Lazy-load heavy queries. Support filters (date range, segment). Document widget config.

## Effect Library Usage

`Effect.tryPromise` for query; `Effect.cached` for memoization. Inject `AnalyticsService` via Context. Typed errors for query failures.

## Implementation Considerations

Stub: `{{widgetName}}`, `{{queryType}}`, `{{visualization}}`. Registry: `src/widgets/index.ts`. Cache: Redis.

## Alternative Technology Considerations

Metabase/Superset: BI tools. Custom: full control. Same widget model: query + viz.
