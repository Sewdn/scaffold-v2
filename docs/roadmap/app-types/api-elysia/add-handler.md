# Backend: add-handler

## Command

```
scaffold backend add-handler <name>
```

## Description

Add a single handler file for a route group.

## Injection Target

- **Artifact:** `src/handlers/<name>.ts`

## Status

Planned

---

## Underlying Technology

**Elysia.js** handlers. Handlers are async functions; route plugins import and wire them. No framework; plain async functions. Elysia's `get`, `post`, etc. accept handler functions directly.

## Best Practices & Engineering Patterns

- **Thin handlers:** Handlers delegate to services; avoid business logic in handler files.
- **Services:** Inject via Elysia `derive` or Effect `Context`; use factory pattern.
- **Validation:** Use Zod or similar for request body/query validation.

## Effect Library Usage

- **Async:** Use `Effect.runPromise` inside handler for Effect-based logic; or native async.
- **Context:** Handlers receive services via `derive`; Effect `Context` for app-level DI.
- **Errors:** Use `Effect.fail` with `Effect.catchAll` for typed error → HTTP status mapping.

## Implementation Considerations

- **Idempotency:** Skip if handler file exists.
- **No registry:** Handlers are imported by route plugins; no central registry.
- **Stub variables:** `{{name}}`, `{{Name}}` for handler name and export.

## Alternative Technology Considerations

- **Inline handlers:** Handlers could be inline in route files; separate files preferred for reuse.
- **Controller pattern:** Elysia doesn't use controllers; handler-per-file is simpler.
