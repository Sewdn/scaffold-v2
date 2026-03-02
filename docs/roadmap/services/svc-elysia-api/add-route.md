# svc-elysia-api: add-route

## Command

```
scaffold svc-elysia-api add-route <name>
```

## Description

Add a route plugin.

## Injection Target

- **Artifact:** `src/routes/<name>.ts`
- **Registry:** `src/index.ts` or routes registry

## Status

Proposed

## Underlying Technology

Elysia route: `.get()`, `.post()`, etc. with path, schema, handler. Zod for body/query validation. Type inference from schema.

## Best Practices & Engineering Patterns

Validate with Zod schema. Use guards for auth. Return typed responses. Document with Swagger (auto from schema).

## Effect Library Usage

`Effect.tryPromise` for handler logic. Elysia integrates with async; Effect can wrap. Typed errors via Elysia onError.

## Implementation Considerations

Stub: `{{routeName}}`, `{{method}}`, `{{path}}`. Registry: `src/index.ts` or routes. Compose with guards/middleware.

## Alternative Technology Considerations

Hono, Fastify: similar patterns. Elysia: Bun-native, end-to-end types. Route structure is framework-agnostic.
