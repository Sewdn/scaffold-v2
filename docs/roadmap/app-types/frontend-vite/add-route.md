# Frontend Vite: add-route

## Command

```
scaffold frontend-vite add-route <path>
```

## Description

Add a route with path and component binding.

## Injection Target

- **Registry:** Routes config (path + component reference)

## Status

Planned

## Underlying Technology

Routes defined in config (React Router or TanStack Router). Path + component binding. Optional layout, nested routes. No file-based routing by default.

## Best Practices & Engineering Patterns

Group routes by feature; use nested routes for shared layouts. Lazy-load route components for code splitting. Keep route config declarative.

## Effect Library Usage

Route config is structural; Effect does not apply. Data loading uses React Query or route loaders.

## Implementation Considerations

Patch routes config: add path, component reference, optional layout. Stub variables: `{{routePath}}`, `{{ComponentName}}`, `{{LayoutName}}`.

## Alternative Technology Considerations

TanStack Router (file-based routes), Remix (file-based route modules), Astro (file-based with config).
