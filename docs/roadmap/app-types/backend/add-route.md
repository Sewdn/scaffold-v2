# Backend: add-route

## Command

```
scaffold backend add-route <name>
```

## Description

Add a route plugin and register in routes registry.

## Injection Target

- **Artifact:** `src/routes/<name>.ts`
- **Registry:** `src/index.ts` or routes registry

## Status

Planned

---

## Underlying Technology

**Elysia.js** route plugins. Each route is an Elysia instance returned by a function; composed via `.use()` in the main app. Swagger auto-documents routes. Elysia's `get`, `post`, etc. define HTTP methods.

## Best Practices & Engineering Patterns

- **Plugin pattern:** Export `routesPlugin` or `createXxxRoutes()` returning `Elysia` instance.
- **Registry:** Routes registered in `src/index.ts` or `src/routes/index.ts` with `.use()`.
- **Handlers:** Delegate to handlers in `src/handlers/`; keep route files thin.

## Effect Library Usage

- **Handler:** Use `Effect.runPromise` inside handler for Effect-based logic; or native async.
- **Context:** Inject services via Elysia `derive` or Effect `Context` if app uses Effect.
- **Errors:** `Effect.fail` with `Effect.catchAll` for typed error mapping to HTTP status.

## Implementation Considerations

- **Idempotency:** Skip if route file exists.
- **Registry patch:** Append `.use(xxxRoutes)` to app chain; use marker comment.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{path}}` for route path (e.g. `/users`).

## Alternative Technology Considerations

- **Inline routes:** Routes could be defined in `index.ts`; separate files preferred for scalability.
- **File-based routing:** Elysia uses code-based routing; no file-router convention.
