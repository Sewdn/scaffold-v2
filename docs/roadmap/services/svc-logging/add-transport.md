# svc-logging: add-transport

## Command

```
scaffold svc-logging add-transport <name>
```

## Description

Add a log transport (console, file, remote).

## Injection Target

- **Artifact:** `src/transports/<name>.ts`
- **Registry:** `src/transports/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Pino transport: writable stream. Console (stdout), file (fs), or custom (Elasticsearch, Datadog). Async or sync.

## Best Practices & Engineering Patterns

Use JSON for prod; pretty for dev. Batch remote logs. Handle transport errors; don't block app. Set log level per transport.

## Effect Library Usage

`Effect.tryPromise` for async transport write. Transport via Context. Typed errors for write failures. Non-blocking for hot path.

## Implementation Considerations

Stub: `{{transportName}}`, `{{destination}}`. Registry: `src/transports/index.ts`. Env: `LOG_LEVEL`, `LOG_DESTINATION`.

## Alternative Technology Considerations

Winston: transports. Pino: pino-pretty, pino-elasticsearch. Same transport interface; destination varies.
