# Frontend Vite: add-layout

## Command

```
scaffold frontend-vite add-layout <name>
```

## Description

Add a layout wrapper component.

## Injection Target

- **Artifact:** `src/layouts/<Name>.tsx`

## Status

Planned

## Underlying Technology

Layout components wrap route content. Applied via route config or nested route structure. React Router/TanStack Router support layout routes. Client-side rendering.

## Best Practices & Engineering Patterns

Layouts as presentational wrappers; receive `children`. Move layout-specific logic (e.g. nav state) to hooks. Nest layouts for shared UI hierarchy.

## Effect Library Usage

Layouts use React patterns. Effect uncommon; consider for layout-level data (e.g. user context) if needed.

## Implementation Considerations

Artifact: `src/layouts/<Name>.tsx`. Register in route config or wrap route tree. Stub variables: `{{LayoutName}}`, `{{children}}`.

## Alternative Technology Considerations

TanStack Router (layout routes), Remix (root + nested layouts), Astro (layout components).
