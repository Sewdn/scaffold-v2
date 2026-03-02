# Desktop App Type

**Description:** Desktop app with Tauri (Rust + web frontend).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-command](add-command.md) | Add a Tauri command (Rust backend) | `src-tauri/src/commands/<name>.rs` |
| [add-window](add-window.md) | Add a window config | `src-tauri/tauri.conf.json` |
| [add-plugin](add-plugin.md) | Add a Tauri plugin | `src-tauri/plugins/` |

## Underlying Technology

**Tauri** (Rust + web frontend). Rust backend for system APIs; web (Vite/React) for UI. Lighter than Electron; native binaries.

## Best Practices & Engineering Patterns

- **Command pattern:** Rust commands exposed to frontend via `invoke()`; one command per operation.
- **Window config:** Define windows in `tauri.conf.json`; main + secondary windows; use labels for multi-window.
- **Plugin architecture:** Extend Tauri with Rust plugins; register in `src-tauri/lib.rs`.

## Effect Library Usage

- **Context:** Inject Tauri app handle via Effect `Context`; frontend services receive.
- **Commands:** Rust commands are sync/async; frontend uses `Effect.runPromise` for `invoke()`.
- **Errors:** `Effect.fail` with typed errors; map Rust errors to frontend.

## Implementation Considerations

- **Registry:** Commands in `src-tauri/src/commands/`; plugins in `src-tauri/plugins/`; windows in `tauri.conf.json`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{commandName}}`; Rust snake_case for commands.
- **Naming:** `get_config`, `save_file`; file `commands/get_config.rs`.

## Alternative Technology Considerations

- **Electron vs Tauri:** Electron for mature ecosystem; Tauri for smaller binaries, Rust backend.
- **Neutralino:** Lighter alternative; Tauri preferred for Rust + plugin ecosystem.
