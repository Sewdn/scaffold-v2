# Desktop: add-window

## Command

```
scaffold desktop add-window <name>
```

## Description

Add a window configuration.

## Injection Target

- **Registry:** `src-tauri/tauri.conf.json` (window config)

## Status

Proposed

---

## Underlying Technology

**Tauri** window config. Windows defined in `tauri.conf.json`; created via `WebviewWindow`; use labels for multi-window.

## Best Practices & Engineering Patterns

- **Window config:** Define in `tauri.conf.json`; main window + optional secondary; use `label` for identification.
- **Window patterns:** One config per window type; main, settings, devtools; use `createWindow()` for dynamic.
- **Size/position:** Set `width`, `height`, `center`; persist for user preference.

## Effect Library Usage

- **Context:** Inject `App` or `WebviewWindow` via Effect `Context`; frontend services receive.
- **Commands:** Use `Effect.runPromise` for `invoke('create_window', { label, ... })`.
- **Errors:** `Effect.fail` with typed errors; map Tauri errors to frontend.

## Implementation Considerations

- **Registry:** `tauri.conf.json` `windows` array; append new window config.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{label}}`; use `label` for window identification.
- **Naming:** `main`, `settings`, `preferences`; label in config.

## Alternative Technology Considerations

- **Electron BrowserWindow:** Similar; Tauri uses `tauri.conf.json`.
- **Neutralino:** Simpler; Tauri preferred for Rust.
