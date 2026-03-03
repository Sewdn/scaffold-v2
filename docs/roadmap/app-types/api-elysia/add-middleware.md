# Backend: add-middleware

## Command

```
scaffold backend add-middleware <name>
```

## Description

Add middleware and register in app chain.

## Injection Target

- **Artifact:** `src/middleware/<name>.ts`
- **Registry:** App middleware chain

## Status

Planned

---

## Underlying Technology

**Elysia.js** middleware via `.use()` or `derive`. Middleware is an Elysia plugin that runs before/after handlers. Elysia uses `beforeHandle` and `afterHandle` for request/response lifecycle.

## Best Practices & Engineering Patterns

- **Plugin pattern:** Export middleware as Elysia plugin; chain via `.use()`.
- **Order:** Middleware order matters; register in app chain in correct sequence.
- **Stateless:** Middleware should be stateless or hold minimal config.

## Effect Library Usage

- **Async:** Use `Effect.promise` for async middleware logic; `Effect.runPromise` at boundary.
- **Context:** Middleware can `derive` values for downstream handlers; Effect `Context` for DI.
- **Errors:** Use `Effect.fail` or throw; Elysia propagates to error handler.

## Implementation Considerations

- **Idempotency:** Skip if middleware file exists.
- **Registry patch:** Append `.use(xxxMiddleware)` to app chain; preserve order.
- **Stub variables:** `{{name}}`, `{{Name}}` for middleware name and export.

## Alternative Technology Considerations

- **Express middleware:** Different signature; Elysia uses plugin model.
- **Elysia derive:** Prefer `derive` for request-scoped state over global middleware.
