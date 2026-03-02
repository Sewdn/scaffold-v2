# Frontend Vite: add-page

## Command

```
scaffold frontend-vite add-page <name>
```

## Description

Add a page component and route entry.

## Injection Target

- **Artifact:** `src/pages/<Name>.tsx`
- **Registry:** Routes config (e.g. `src/routes.tsx` or router setup)

## Status

Planned

## Underlying Technology

Vite + React. Pages are React components. Routing via React Router or TanStack Router; routes config maps path to component. Client-side only unless SSR plugin added.

## Best Practices & Engineering Patterns

Pages as thin containers; fetch data in hooks, pass to presentational components. Colocate page-specific components in `pages/` or route folder. Use layouts for shared structure.

## Effect Library Usage

Pages use React Query or custom hooks for data. Effect can wrap fetch logic in hooks; not typical in page components directly.

## Implementation Considerations

Artifact: `src/pages/<Name>.tsx`. Must register in routes config with path and component. Stub variables: `{{PageName}}`, `{{routePath}}`.

## Alternative Technology Considerations

TanStack Router (file-based pages), Remix (route modules), Astro (page components).
