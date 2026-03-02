# svc-logging: add-formatter

## Command

```
scaffold svc-logging add-formatter <name>
```

## Description

Add a log formatter (JSON, pretty, etc.).

## Injection Target

- **Artifact:** `src/formatters/<name>.ts`
- **Registry:** `src/formatters/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Formatter: log object → string. JSON (default), pretty (dev), or custom. Applied before transport write.

## Best Practices & Engineering Patterns

JSON for machine parsing; pretty for human. Include timestamp, level, message. Redact PII. Consistent field names.

## Effect Library Usage

`Effect.sync` for format (pure). Formatter via Context. No async; keep formatting fast.

## Implementation Considerations

Stub: `{{formatterName}}`, `{{format}}`. Registry: `src/formatters/index.ts`. Env: `LOG_FORMAT` (json|pretty).

## Alternative Technology Considerations

Pino: built-in json/pretty. Winston: format chain. Custom: full control. Same input/output contract.
