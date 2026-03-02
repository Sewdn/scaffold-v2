# Frontend TanStack: add-component

## Command

```
scaffold frontend-tanstack add-component <name>
```

## Description

Add a component in `components/` directory.

## Injection Target

- **Artifact:** `src/components/<Name>/`

## Status

Planned

## Underlying Technology

Components live in `src/components/` alongside TanStack Router pages. Use Shadcn/Radix primitives where applicable; Tailwind for styling. Components are React function components.

## Best Practices & Engineering Patterns

Presentational components with props; extract logic to hooks. Co-locate component, hook, and types. Use `components/<Name>/` directory with `index.tsx` and optional `use<Name>.ts` hook.

## Effect Library Usage

Use `@effect/react` for components that consume Effect services. Wrap Effect layers in providers; use `useContext` or Effect-aware hooks for data. TanStack Query can sit alongside Effect for caching.

## Implementation Considerations

Stub variables: `componentName`, `ComponentName` (PascalCase). Place in `src/components/<Name>/`. Follow project conventions for barrel exports and Storybook stories.

## Alternative Technology Considerations

TanStack Start components vs Next.js: similar patterns. Remix favors route-level components. Consider Vinxi-compatible component structure if targeting multiple runtimes.
