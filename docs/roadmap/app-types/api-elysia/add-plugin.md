# Backend: add-plugin

## Command

```
scaffold backend add-plugin <name>
```

## Description

Add a custom Elysia plugin.

## Injection Target

- **Artifact:** `src/plugins/<name>.ts`
- **Registry:** Plugin registration in app

## Status

Planned

---

## Underlying Technology

**Elysia.js** plugin system. Plugins extend Elysia via `derive`, `state`, `onRequest`, `onResponse`, etc. Elysia plugins are composable; each returns an Elysia instance or config.

## Best Practices & Engineering Patterns

- **Plugin pattern:** Export `xxxPlugin` returning `Elysia` instance.
- **Composition:** Plugins can be nested; use `.use()` for plugin chain.
- **State/derive:** Use `state` for app-level, `derive` for request-scoped values.

## Effect Library Usage

- **Async:** Use `Effect.promise` for async plugin logic; `Effect.runPromise` at boundary.
- **Context:** Plugin can provide `derive` values; Effect `Context` for app-level DI.
- **Errors:** Use `Effect.fail` or throw; Elysia propagates to error handler.

## Implementation Considerations

- **Idempotency:** Skip if plugin file exists.
- **Registry patch:** Append `.use(xxxPlugin)` to app chain.
- **Stub variables:** `{{name}}`, `{{Name}}` for plugin name and export.

## Alternative Technology Considerations

- **Elysia macros:** Use macros for small extensions; full plugins for larger features.
- **Third-party plugins:** Elysia ecosystem (e.g. `@elysiajs/swagger`); scaffold for custom plugins.
