# Backend App Type

**Description:** Backend API (Elysia.js) with Swagger, CORS.

**Status:** Planned

## Expansion Commands

| Command                             | Description                                 | Spec                                    |
| ----------------------------------- | ------------------------------------------- | --------------------------------------- |
| [add-route](add-route.md)           | Add a route plugin                          | `src/routes/<name>.ts`, routes registry |
| [add-middleware](add-middleware.md) | Add middleware and register in app chain    | `src/middleware/<name>.ts`              |
| [add-plugin](add-plugin.md)         | Add a custom Elysia plugin                  | `src/plugins/<name>.ts`                 |
| [add-handler](add-handler.md)       | Add a single handler file for a route group | `src/handlers/<name>.ts`                |

## Underlying Technology

**Elysia.js** for HTTP API, routing, and plugins. **Swagger** via `@elysiajs/swagger` for OpenAPI docs. **CORS** for cross-origin. Elysia chosen for performance, type-safety, and composable plugin model. Bun runtime.

## Best Practices & Engineering Patterns

- **Plugin-based:** Routes, middleware, and plugins are Elysia plugins; compose via `.use()`.
- **Registry:** Routes registered in `src/index.ts` or a routes registry module.
- **Separation:** Handlers in `src/handlers/`, routes in `src/routes/`, middleware in `src/middleware/`.

## Effect Library Usage

- **Handlers:** Async handlers use native `async/await`; Effect optional via `Effect.runPromise` in handler.
- **Context:** Elysia's `derive`/`Context` for request-scoped state; Effect `Context` for app-level DI if needed.
- **Errors:** Use `Effect.fail` or throw; Elysia handles HTTP errors via `error` or status codes.

## Implementation Considerations

- **Idempotency:** Check if artifact exists before creation.
- **Validation:** Validate route/plugin names (kebab-case, no conflicts).
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{PascalCase}}` for file and export names.

## Alternative Technology Considerations

- **Hono:** Lighter; similar API. Elysia has better TypeScript inference.
- **Fastify:** More mature; plugin ecosystem. Elysia is Bun-first.
- **Express:** Legacy; no type-safety. Not recommended for new projects.
