# Frontend Vite: add-component

## Command

```
scaffold frontend-vite add-component <name>
```

## Description

Add a component in `components/` directory.

## Injection Target

- **Artifact:** `src/components/<Name>/` (index + component file)

## Status

Planned

## Underlying Technology

React 19 components. Client-side only (Vite SPA). Tailwind + Shadcn. No Server Components; all components can use hooks and browser APIs.

## Best Practices & Engineering Patterns

Container/presentational split. Presentational components receive props; logic in hooks. Colocate in `src/components/<Name>/` with index. One component per file; shared types in folder.

## Effect Library Usage

Components use React patterns. Effect fits in custom hooks that wrap Effect-based services (data, error handling).

## Implementation Considerations

Structure: `src/components/<Name>/<Name>.tsx`, `index.ts`. Stub variables: `{{ComponentName}}`, `{{propsInterface}}`.

## Alternative Technology Considerations

Solid, Preact, Astro (framework-agnostic components).
