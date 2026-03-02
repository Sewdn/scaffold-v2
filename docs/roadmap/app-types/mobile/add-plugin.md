# Mobile: add-plugin

## Command

```
scaffold mobile add-plugin <name>
```

## Description

Add a Capacitor plugin configuration.

## Injection Target

- **Registry:** `capacitor.config.ts` (plugin config)

## Status

Proposed

---

## Underlying Technology

**Capacitor** plugins. Plugins expose native APIs (camera, storage, push); config in `capacitor.config.ts`; register via `Capacitor.getPlugin()`.

## Best Practices & Engineering Patterns

- **Plugin config:** Add only needed plugins; configure in `capacitor.config.ts`; use env for API keys.
- **Lazy loading:** Use `Capacitor.getPlugin()` when needed; avoid loading all at startup.
- **Platform checks:** Use `Capacitor.getPlatform()` before plugin calls; fallback for web.

## Effect Library Usage

- **Context:** Inject plugin wrapper via Effect `Context`; services receive for plugin calls.
- **Async:** Wrap plugin calls in `Effect.gen`; `Effect.runPromise` at boundary.
- **Errors:** `Effect.fail` with typed errors; map to user-facing messages.

## Implementation Considerations

- **Registry:** `capacitor.config.ts` plugins array; append new plugin config.
- **Stubs:** `{{name}}`, `{{Name}}`; export plugin config or wrapper.
- **Naming:** `Camera`, `PushNotifications`; config key from plugin name.

## Alternative Technology Considerations

- **React Native modules:** Native modules; Capacitor uses Cordova-style plugins.
- **Expo modules:** Similar; Capacitor preferred for web reuse.
