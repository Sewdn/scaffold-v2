# CLI: add-command

## Command

```
scaffold cli add-command <name>
```

## Description

Add a new CLI command and register it in the commands index.

## Injection Target

- **Artifact:** `src/commands/<name>.ts`
- **Registry:** `src/commands/index.ts` (patch with import + `program.addCommand(...)`)

## Stub

- `packages/app-cli/stubs/expansion/command.ts.stub`

## Registry Marker

```ts
// Commands registered below (scaffold cli add-command)
```

## Naming

- File: `add-user.ts` (kebab-case)
- Export: `AddUserCommand` (PascalCase)

## Status

✅ Implemented

---

## Underlying Technology

**Commander** for command definition and registration. Commands use `.command()`, `.argument()`, `.option()`, `.action()`; actions may be async. Effect is used at the app layer for orchestration; individual command actions can use `Effect.promise` for async work.

## Best Practices & Engineering Patterns

- **Registry marker:** `// Commands registered below (scaffold cli add-command)` ensures deterministic patch location.
- **Thin commands:** Commands should delegate to services; avoid business logic in command files.
- **Naming:** File kebab-case (`add-user.ts`), export PascalCase (`AddUserCommand`).

## Effect Library Usage

- **Action:** Use `Effect.promise` when wrapping async logic; `Effect.runPromise` at entry point.
- **Services:** Inject via `Context` when using Effect; or `createXxxService()` for direct factory.
- **Errors:** Use `Effect.fail` for typed errors; `Effect.catchAll` for user-facing messages.

## Implementation Considerations

- **Registry patch:** Append `import` and `program.addCommand(AddUserCommand)` without duplicating existing entries.
- **Idempotency:** Skip if command file exists; merge registry patch if marker already present.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{PascalCase}}` for command name and class.

## Alternative Technology Considerations

- **oclif:** Uses `@oclif/command` classes; would require different stub structure.
- **Commander:** Chosen for simplicity; `.action(async () => {})` fits Effect integration.
