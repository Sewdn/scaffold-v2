# CLI App Type

**Description:** CLI (Effect + Commander).

**Status:** ✅ Implemented

## Expansion Commands

| Command                       | Description                                  | Spec                                              |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------- |
| [add-command](add-command.md) | Add a command and register in commands index | `src/commands/<name>.ts`, `src/commands/index.ts` |
| [add-service](add-service.md) | Add a service in `src/services/`             | `src/services/<name>.ts`                          |

## Underlying Technology

**Commander** for CLI argument parsing and command registration. **Effect** for runtime orchestration (e2e layer, Context, Layer). Commander provides `.command()`, `.argument()`, `.option()`, `.action()`; Effect provides `Context`, `Layer`, `Effect.sync`, `Effect.promise` for async/IO and error handling. Commander chosen for maturity, ergonomics, and ecosystem; Effect for composable, typed error handling and DI.

## Best Practices & Engineering Patterns

- **Registry pattern:** Commands registered in `src/commands/index.ts` with a marker comment for scaffold injection.
- **Factory pattern:** Services use `createXxxService()` returning a typed interface.
- **Separation:** Commands are thin; business logic lives in services.
- **Error handling:** Propagate errors via Effect or `process.exit(1)` for CLI failures.

## Effect Library Usage

- **CLI entry:** Use `Effect.runPromise` or `Effect.runPromiseExit` to run the main Effect.
- **Context/Layer:** Use `Layer` for service composition; `Context` for injecting services into commands.
- **Async:** Wrap async work in `Effect.promise` for Node APIs; use `Effect.gen` for sequential flows.
- **Errors:** Use `Effect.fail` or `Effect.die`; `Effect.catchAll` for recovery.

## Implementation Considerations

- **Idempotency:** Check if command/artifact already exists before overwriting.
- **Validation:** Validate command name (kebab-case, no reserved words).
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{PascalCase}}` for file names and exports.

## Alternative Technology Considerations

- **oclif:** More batteries-included (e.g. plugins, docs). Commander is lighter and fits Effect composition.
- **Ink:** React-based CLI for rich UIs; use when interactive TUI is needed.
- **Yargs:** Alternative to Commander; similar feature set.
