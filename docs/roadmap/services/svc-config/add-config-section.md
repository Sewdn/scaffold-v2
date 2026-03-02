# svc-config: add-config-section

## Command

```
scaffold svc-config add-config-section <name>
```

## Description

Add a config section for a feature or service.

## Injection Target

- **Artifact:** `src/config/<name>.ts`
- **Registry:** `src/config/index.ts` (optional)

## Status

Planned

## Underlying Technology

Zod schema for section typing. Config objects composed from env + defaults. Supports nested sections.

## Best Practices & Engineering Patterns

One section per feature; lazy-load optional sections. Use `z.optional` for optional config. Document in schema.

## Effect Library Usage

`Effect.sync` for schema parse; `Effect.fail` for invalid config. Inject via Context; merge with `Layer.merge`.

## Implementation Considerations

Stub: `{{sectionName}}`. Registry: `src/config/index.ts`. Env vars per section if needed.

## Alternative Technology Considerations

`convict` for hierarchical config. Zod is minimal and Effect-native.
