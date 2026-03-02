# svc-logging Package

**Description:** Structured logging.

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-transport](add-transport.md) | Add a log transport | `src/transports/<name>.ts` |
| [add-formatter](add-formatter.md) | Add a formatter | `src/formatters/<name>.ts` |
| [add-context-enricher](add-context-enricher.md) | Add context enricher | `src/enrichers/<name>.ts` |
| [add-sink](add-sink.md) | Add a log sink | `src/sinks/<name>.ts` |

## Underlying Technology

Pino (primary), Winston, or custom. Structured JSON logs. Transports: stdout, file, Elasticsearch, Datadog. Formatters for output shape.

## Best Practices & Engineering Patterns

Structured logs (level, message, context). Add request ID, user ID via enrichers. Avoid PII in logs. Use child loggers for scope.

## Effect Library Usage

`Effect.sync` for sync logging; `Effect.tryPromise` for async transports. `LoggingService` via Context/Layer. Typed log levels. Compose with transport Layers.

## Implementation Considerations

Stub: `{{transportName}}`, `{{formatterName}}`. Registry: `src/transports/index.ts`, `src/formatters/index.ts`. Env: `LOG_LEVEL`, `LOG_FORMAT`.

## Alternative Technology Considerations

Winston: pluggable. Pino: fast, JSON. Bunyan: structured. Datadog/Elastic: log aggregation. Pino is Effect-friendly (sync by default).
