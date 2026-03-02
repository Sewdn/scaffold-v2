# svc-elysia-api: add-middleware

## Command

```
scaffold svc-elysia-api add-middleware <name>
```

## Description

Add middleware for the route chain.

## Injection Target

- **Artifact:** `src/middleware/<name>.ts`
- **Registry:** App chain or middleware registry

## Status

Proposed

## Underlying Technology

Elysia middleware: `derive`, `onBeforeHandle`, `onAfterHandle`. Access request/response; modify context. Chain with `.use()`.

## Best Practices & Engineering Patterns

Middleware for logging, timing, CORS. Derive for request-scoped context. Order matters; apply before routes.

## Effect Library Usage

`Effect.tryPromise` for async middleware logic. Elysia supports async handlers. Typed context via derive.

## Implementation Considerations

Stub: `{{middlewareName}}`, `{{hook}}`. Registry: app chain. Compose with guards.

## Alternative Technology Considerations

Hono: middleware. Express: next(). Elysia: derive + hooks. Same cross-cutting pattern.
