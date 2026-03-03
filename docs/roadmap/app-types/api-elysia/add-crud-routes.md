# Backend: add-crud-routes

## Command

```
scaffold api-elysia add-crud-routes <name> [-a <app>] [-p <path>]
```

## Description

Add full CRUD routes and handlers for a single entity. Creates both `src/routes/<name>.ts` and `src/handlers/<name>.ts` with:

- **GET /** — paged list (`?page=1&limit=10`)
- **GET /:id** — get by id
- **POST /** — create
- **PUT /:id** — update
- **DELETE /:id** — delete

The expansion is named "CRUD routes" (not "routes") to indicate it manages multiple routes for CRUD operations on one entity.

## Injection Target

- **Artifacts:** `src/routes/<name>.ts`, `src/handlers/<name>.ts`
- **Registry:** `src/index.ts` (`.use(<name>Routes)`)

## Status

Implemented

---

## Underlying Technology

**Elysia.js** route plugins. Each CRUD route group is an Elysia instance with `prefix`; composed via `.use()` in the main app. Swagger auto-documents routes. Effect + Schema for handlers and validation.

## Best Practices & Engineering Patterns

- **Plugin pattern:** Export `<entity>Routes` as Elysia instance with `prefix: "/<path>"`.
- **Handlers:** Thin HTTP boundary; delegate to service layer; use `Effect.runPromise` at boundary.
- **Paged list:** Response shape `{ items, total, page, limit, totalPages }`.
- **Errors:** Map domain errors (e.g. `NotFoundError`) to HTTP status in route layer.

## Effect Library Usage

- **Handler:** Use `Effect.runPromise` inside handler for Effect-based logic.
- **Service layer:** Use `Effect.succeed` / `Effect.fail`; avoid `Effect.gen` (downlevelIteration).
- **Errors:** `Data.TaggedError` for domain errors; map to HTTP in route.

## Implementation Considerations

- **Idempotency:** Skip if route file exists.
- **Registry patch:** Append `.use(<name>Routes)` after CRUD routes marker.
- **Stub variables:** `{{routeName}}`, `{{pascalName}}`, `{{path}}` for route prefix.
