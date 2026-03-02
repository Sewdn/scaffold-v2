# svc-analytics: add-event-schema

## Command

```
scaffold svc-analytics add-event-schema <name>
```

## Description

Add an event schema for analytics tracking.

## Injection Target

- **Artifact:** `src/events/<name>.ts`
- **Registry:** `src/events/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Zod schema for event shape. Properties: name, timestamp, userId, properties (JSON). Stored in DB or Elasticsearch.

## Best Practices & Engineering Patterns

Version schemas; validate at ingestion. Required: name, timestamp. Optional: userId, sessionId, properties. Document property types.

## Effect Library Usage

`Effect.sync` for schema parse; `Effect.tryPromise` for ingestion. Inject `AnalyticsService` via Context. Typed errors for validation.

## Implementation Considerations

Stub: `{{eventName}}`, `{{properties}}`. Registry: `src/events/index.ts`. Storage: DB or ES.

## Alternative Technology Considerations

PostHog/Mixpanel: built-in schemas. Custom: Zod + DB/ES. Same event model; storage varies.
