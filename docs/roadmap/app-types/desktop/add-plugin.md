# Desktop: add-plugin

## Command

```
scaffold desktop add-plugin <name>
```

## Description

Add a Tauri plugin.

## Injection Target

- **Artifact:** `src-tauri/plugins/<name>/`

## Status

Proposed

---

## Underlying Technology

**Tauri** plugins. Plugins extend Tauri with Rust modules; register in `src-tauri/lib.rs`; expose APIs to frontend.

## Best Practices & Engineering Patterns

- **Plugin pattern:** One plugin per concern; register in `Builder::plugin()`; expose via `invoke()`.
- **Rust + JS bridge:** Use `tauri::plugin::Plugin` trait; define commands; handle in plugin.
- **State:** Use `Plugin::setup()` for init; pass state to commands via `AppHandle`.

## Effect Library Usage

- **Context:** Inject plugin wrapper via Effect `Context`; frontend services receive.
- **Commands:** Rust commands are sync/async; frontend uses `Effect.runPromise` for `invoke()`.
- **Errors:** `Effect.fail` with typed errors; map Rust `Result` to frontend.

## Implementation Considerations

- **Registry:** Plugins in `src-tauri/plugins/<name>/`; register in `lib.rs`.
- **Stubs:** `{{name}}`, `{{Name}}`; export `XxxPlugin`; Rust snake_case.
- **Naming:** `fs`, `storage`, `native`; directory `plugins/fs/`.

## Alternative Technology Considerations

- **Electron plugins:** Native modules; Tauri uses Rust plugins.
- **Neutralino:** Simpler; Tauri preferred for Rust ecosystem.
