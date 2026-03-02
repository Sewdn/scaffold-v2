# Mobile: add-screen

## Command

```
scaffold mobile add-screen <name>
```

## Description

Add a screen/route to the mobile app.

## Injection Target

- **Artifact:** `src/screens/<Name>.tsx`
- **Registry:** Navigation/routes config

## Status

Proposed

---

## Underlying Technology

**Capacitor** + **React** + **React Router**. Screens are route components; navigation via React Router; Capacitor for native nav if needed.

## Best Practices & Engineering Patterns

- **Screen patterns:** One screen per route; use layout for shared UI; lazy-load for perf.
- **Navigation:** Use React Router; `useNavigate`, `Link`; Capacitor back button for Android.
- **Platform checks:** Use `Capacitor.getPlatform()` for native-specific behavior.

## Effect Library Usage

- **Context:** Inject services via Effect `Context`; screens receive for data.
- **Data loading:** Use Effect in hooks for async; `Effect.runPromise` at boundary.
- **Errors:** `Effect.fail` with typed errors; map to error boundary or toast.

## Implementation Considerations

- **Registry:** Screens in `src/screens/`; routes in `src/routes.tsx` or `App.tsx`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{screenName}}`; export `XxxScreen`.
- **Naming:** `HomeScreen`, `ProfileScreen`; file `screens/HomeScreen.tsx`.

## Alternative Technology Considerations

- **React Native screens:** Native navigation; Capacitor uses web routing.
- **Expo Router:** File-based routing; Capacitor uses React Router.
