# Domain: add-type

## Command

```
scaffold domain add-type <name>
```

## Description

Add a shared type or interface (DTO, API type, etc.).

## Injection Target

- **Artifact:** `src/types/<name>.ts`
- **Registry:** `src/types/index.ts` (optional)

## Status

Planned

## Underlying Technology

Shared types: DTOs, API request/response shapes, view models. Plain TypeScript interfaces or types. Used by API layer, UI, and services. No business logic.

## Best Practices & Engineering Patterns

Keep types flat and serializable. Use for API contracts, form payloads, list item shapes. Separate from domain entities when they differ (e.g. API omits internal fields).

## Effect Library Usage

Types flow through Effect as data. Use with Effect Schema for decode/encode. Effect.fail for validation errors when parsing external input into typed DTOs.

## Implementation Considerations

Stub variables: `{{TypeName}}`, `{{fields}}`. File: `src/types/<name>.ts`. Barrel export. Consider Zod infer for runtime validation of API boundaries.

## Alternative Technology Considerations

Zod `.infer` for derived types. OpenAPI/JSON Schema for API-first types. Effect Schema for validation + types. Domain types stay independent of transport.
