# svc-logging: add-context-enricher

## Command

```
scaffold svc-logging add-context-enricher <name>
```

## Description

Add a context enricher (request ID, user, etc.).

## Injection Target

- **Artifact:** `src/enrichers/<name>.ts`
- **Registry:** `src/enrichers/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Enricher: add fields to log object (requestId, userId, etc.). Applied via child logger or middleware. AsyncContext for request scope.

## Best Practices & Engineering Patterns

Add request ID, user ID, correlation ID. Use AsyncLocalStorage or Effect Context. Don't add sensitive data. Keep enrichers fast.

## Effect Library Usage

`Effect.sync` for sync enricher; `Effect.gen` for Context access. Enricher merges into log object. Inject via Context.

## Implementation Considerations

Stub: `{{enricherName}}`, `{{fields}}`. Registry: `src/enrichers/index.ts`. Integrate with request middleware.

## Alternative Technology Considerations

Pino: child loggers. Winston: format. Effect: Context for request scope. Same enrichment pattern.
