# svc-logging: add-sink

## Command

```
scaffold svc-logging add-sink <name>
```

## Description

Add a log sink (destination for log output).

## Injection Target

- **Artifact:** `src/sinks/<name>.ts`
- **Registry:** `src/sinks/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Sink: destination for logs (file, Elasticsearch, Datadog, S3). Combines transport + optional batching. Async write.

## Best Practices & Engineering Patterns

Batch for remote sinks; reduce I/O. Buffer on backpressure. Don't block logger. Use queue for high volume.

## Effect Library Usage

`Effect.tryPromise` for sink write. Sink as Effect resource. Typed errors for write failures. Compose with transport.

## Implementation Considerations

Stub: `{{sinkName}}`, `{{destination}}`. Registry: `src/sinks/index.ts`. Env: `LOG_SINK`, `ELASTICSEARCH_URL`, etc.

## Alternative Technology Considerations

Datadog, Elasticsearch, S3, CloudWatch. Same sink interface; destination adapter varies.
