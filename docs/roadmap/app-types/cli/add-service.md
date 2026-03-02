# CLI: add-service

## Command

```
scaffold cli add-service <name>
```

## Description

Add a service in `src/services/` for use by CLI commands.

## Injection Target

- **Artifact:** `src/services/<name>.ts`
- **Registry:** Optional — services may be imported directly by commands

## Stub

- `packages/app-cli/stubs/expansion/service.ts.stub`

## Naming

- File: `user-service.ts` (kebab-case)
- Export: `createUserService`, `UserService` (factory + type)

## Status

✅ Implemented

---

## Underlying Technology

**Effect** for service composition. Services use factory pattern `createXxxService()` returning a typed interface or `Effect.Effect`-based API. No framework; plain TypeScript modules. Effect chosen for typed error handling and composable DI via Context/Layer.

## Best Practices & Engineering Patterns

- **Factory pattern:** `createUserService()` returns `UserService` interface; allows swapping implementations.
- **No registry:** Services are imported directly by commands; no central registry.
- **Stateless:** Services should be stateless or hold minimal config; state via Context.

## Effect Library Usage

- **Layer:** Define `UserServiceLive = Layer.effect(...)` for DI integration.
- **Context:** Tag interface `UserService` for `Context.Tag<UserService>`.
- **Async:** Use `Effect.promise` for Node APIs; `Effect.gen` for sequential flows.

## Implementation Considerations

- **Idempotency:** Skip if service file exists.
- **Validation:** Validate name (kebab-case, no reserved words like `config`).
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{PascalCase}}` for file and export names.

## Alternative Technology Considerations

- **Class-based:** Could use classes; factory pattern preferred for composability.
- **Effect Context:** Services can be provided via `Layer` for full Effect integration.
