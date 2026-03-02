# Mobile App Type

**Description:** Web-based mobile app with Capacitor.

**Status:** Proposed

## Expansion Commands

| Command                           | Description                   | Spec                     |
| --------------------------------- | ----------------------------- | ------------------------ |
| [add-screen](add-screen.md)       | Add a screen/route            | `src/screens/<Name>.tsx` |
| [add-plugin](add-plugin.md)       | Add a Capacitor plugin config | `capacitor.config.ts`    |
| [add-component](add-component.md) | Add a component               | `src/components/<Name>/` |

## Underlying Technology

**Capacitor** (Ionic). Wraps web app (Vite/React) in native shell; native APIs via plugins. iOS, Android, PWA from same codebase.

## Best Practices & Engineering Patterns

- **Web-first:** Build UI with React/Vite; use Capacitor for native APIs (camera, storage, push).
- **Plugin usage:** Register only needed plugins; lazy-load for perf; config in `capacitor.config.ts`.
- **Platform checks:** Use `Capacitor.getPlatform()` for conditional native logic; fallback for web.

## Effect Library Usage

- **Context:** Inject native services via Effect `Context`; components receive for platform APIs.
- **Async handlers:** Wrap plugin calls in `Effect.gen`; `Effect.runPromise` at boundary.
- **Errors:** `Effect.fail` with typed errors; map to user-facing messages.

## Implementation Considerations

- **Registry:** Screens in `src/screens/`; components in `src/components/`; plugins in `capacitor.config.ts`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{componentName}}`; export `XxxComponent`, `XxxScreen`.
- **Naming:** PascalCase for components/screens; `HomeScreen`, `UserCard`.

## Alternative Technology Considerations

- **React Native vs Capacitor:** React Native for native UI; Capacitor for web-first, shared codebase.
- **Expo:** React Native alternative; Capacitor preferred for web reuse.
