# Frontend TanStack: add-layout

## Command

```
scaffold frontend-tanstack add-layout <name>
```

## Description

Add a layout component for route segments.

## Injection Target

- **Artifact:** `src/components/layouts/<Name>.tsx`

## Status

Planned

## Underlying Technology

Layouts wrap route segments in TanStack Router. File-router supports `routes/__root.tsx` and nested `routes/_layout.tsx`. Layouts in `components/layouts/` are composed into route trees.

## Best Practices & Engineering Patterns

Layouts receive `children` and optional route params. Use `<Outlet />` for nested content. Prefer layout-level loaders for shared data. Keep layouts presentational; fetch in loaders or parent routes.

## Effect Library Usage

Effect in layout loaders for shared data (auth, nav). Use `@effect/react` if layout consumes Effect context. Avoid heavy Effect work in layout render; prefer loader-based data flow.

## Implementation Considerations

Stub variables: `layoutName`, `LayoutName`. Target: `src/components/layouts/<Name>.tsx`. Register in route tree or `__root.tsx` as needed. Follow TanStack Router layout composition patterns.

## Alternative Technology Considerations

TanStack Router layouts vs Next.js layouts: similar nesting. Remix uses `Outlet` and route hierarchy. Vinxi/Vite layouts may differ; verify TanStack Start conventions.
