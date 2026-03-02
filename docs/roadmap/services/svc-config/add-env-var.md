# svc-config: add-env-var

## Command

```
scaffold svc-config add-env-var <name>
```

## Description

Add an environment variable definition with validation.

## Injection Target

- **Artifact:** `src/env/<name>.ts` or config
- **Registry:** `src/env/index.ts` or schema

## Status

Planned

## Underlying Technology

Zod schema for validation. Environment variables loaded from process or `.env`. Supports optional defaults and type coercion.

## Best Practices & Engineering Patterns

Validate at startup; use descriptive names. Document required vs optional keys. Group related vars in schema.

## Effect Library Usage

`Effect.sync` or `Effect.try` for schema parse; `Effect.fail` for validation errors. Inject validated config via Context.

## Implementation Considerations

Stub: `{{varName}}`, `{{defaultValue}}`. Registry: `src/env/index.ts`. Env vars: `SVC_*` prefix.

## Alternative Technology Considerations

`@t3-oss/env-nextjs`, `convict`, `dotenv-safe`. Zod is portable and Effect-compatible.
