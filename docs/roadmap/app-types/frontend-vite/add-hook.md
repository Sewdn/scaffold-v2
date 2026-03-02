# Frontend Vite: add-hook

## Command

```
scaffold frontend-vite add-hook <name>
```

## Description

Add a custom hook in `hooks/` directory.

## Injection Target

- **Artifact:** `src/hooks/use<Name>.ts`

## Status

Planned

## Underlying Technology

Custom React hooks. Encapsulate state, side effects, subscriptions. Follow Rules of Hooks. Can integrate React Query, Effect, or imperative APIs.

## Best Practices & Engineering Patterns

Single responsibility; one hook per concern. Prefer composition over large hooks. Keep hooks pure where possible; isolate side effects. Document dependencies and return shape.

## Effect Library Usage

Hooks are the primary place for Effect in React. Use `@effect/react` or wrap Effect.runPromise in useEffect for data fetching. Effect excels at typed errors and composable async logic in hooks.

## Implementation Considerations

Artifact: `src/hooks/use<Name>.ts`. Naming: `use` prefix. Stub variables: `{{hookName}}`, `{{returnType}}`. Export hook and optionally types.

## Alternative Technology Considerations

TanStack Query (useQuery), Zustand (useStore), Effect React (useEffect, useRuntime).
