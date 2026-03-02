# svc-analytics: add-funnel

## Command

```
scaffold svc-analytics add-funnel <name>
```

## Description

Add a funnel definition for conversion tracking.

## Injection Target

- **Artifact:** `src/funnels/<name>.ts`
- **Registry:** `src/funnels/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Funnel: ordered steps (event names + filters). Query: users who completed step 1, 2, ... in sequence. Aggregation for conversion rates.

## Best Practices & Engineering Patterns

Define steps with event + property filters. Time window between steps. Cache funnel results; recompute periodically.

## Effect Library Usage

`Effect.tryPromise` for funnel query. Inject `AnalyticsService` via Context. Typed errors for query failures.

## Implementation Considerations

Stub: `{{funnelName}}`, `{{steps}}`. Registry: `src/funnels/index.ts`. Backend: ES or DB aggregation.

## Alternative Technology Considerations

Mixpanel/PostHog: built-in funnels. Custom: ES aggregations or SQL. Same funnel concept.
