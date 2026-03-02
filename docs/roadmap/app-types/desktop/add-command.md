# Desktop: add-command

## Command

```
scaffold desktop add-command <name>
```

## Description

Add a Tauri command (Rust backend).

## Injection Target

- **Artifact:** `src-tauri/src/commands/<name>.rs`
- **Registry:** Command registration

## Status

Proposed

---

## Underlying Technology

**Tauri** Rust commands. Commands run in Rust backend; invoked from frontend via `invoke()`; handle system APIs, file I/O.

## Best Practices & Engineering Patterns

- **Command pattern:** One command per operation; use `#[tauri::command]`; return `Result<T, E>`.
- **Procedure patterns:** Sync for simple; async for I/O; use `tauri::State` for shared state.
- **Validation:** Validate input in Rust; return typed errors; map to frontend in `invoke()`.

## Effect Library Usage

- **Frontend:** Use `Effect.runPromise` for `invoke()`; `Effect.fail` on error.
- **Context:** Inject Tauri app handle via Effect `Context`; commands receive.
- **Errors:** Map Rust `Result` to frontend; use `Effect.fail` with typed error.

## Implementation Considerations

- **Registry:** Commands in `src-tauri/src/commands/<name>.rs`; register in `lib.rs` `invoke_handler`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{commandName}}`; Rust snake_case.
- **Naming:** `get_config`, `save_file`, `open_dialog`; file `commands/get_config.rs`.

## Alternative Technology Considerations

- **Electron IPC:** Similar; Tauri uses `invoke()`; Rust for backend.
- **Neutralino:** Simpler; Tauri preferred for Rust ecosystem.
