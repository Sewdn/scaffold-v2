# Mobile: add-component

## Command

```
scaffold mobile add-component <name>
```

## Description

Add a component in the mobile app.

## Injection Target

- **Artifact:** `src/components/<Name>/`

## Status

Proposed

---

## Underlying Technology

**Capacitor** + **React**. Components are React components; may use Capacitor plugins for native APIs.

## Best Practices & Engineering Patterns

- **Presentational:** Keep components thin; use hooks for platform logic; delegate to services.
- **Platform checks:** Use `Capacitor.getPlatform()` for conditional rendering; fallback for web.
- **Plugin usage:** Wrap plugin calls in hooks; use Effect for async if Effect-first.

## Effect Library Usage

- **Context:** Inject native services via Effect `Context`; components receive.
- **Hooks:** Use Effect in custom hooks for plugin calls; `Effect.runPromise` at boundary.
- **Errors:** `Effect.fail` with typed errors; map to user-facing messages.

## Implementation Considerations

- **Registry:** Components in `src/components/<Name>/`; export `XxxComponent`, `useXxx`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{componentName}}`; PascalCase for component.
- **Naming:** `UserCard`, `CameraCapture`; directory `components/UserCard/`.

## Alternative Technology Considerations

- **React Native components:** Native primitives; Capacitor uses web components.
- **Expo:** Similar; Capacitor preferred for web reuse.
