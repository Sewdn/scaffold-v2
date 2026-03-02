# Frontend Vite App Type

**Description:** Vite + React with client-side routing.

**Status:** Planned

## Expansion Commands

| Command                           | Description                          | Spec                                  |
| --------------------------------- | ------------------------------------ | ------------------------------------- |
| [add-page](add-page.md)           | Add a page component and route entry | `src/pages/<Name>.tsx`, routes config |
| [add-layout](add-layout.md)       | Add a layout wrapper component       | `src/layouts/<Name>.tsx`              |
| [add-route](add-route.md)         | Add a route with path + component    | Routes config                         |
| [add-component](add-component.md) | Add a component in `components/`     | `src/components/<Name>/`              |
| [add-hook](add-hook.md)           | Add a custom hook in `hooks/`        | `src/hooks/use<Name>.ts`              |

## Underlying Technology

Vite, React 19, TypeScript. Client-side routing via React Router (or TanStack Router). File-based or code-based routes. No built-in SSR; add Vite SSR plugin if needed.

## Best Practices & Engineering Patterns

Container/presentational split; hooks for business logic. Colocate components with their routes when route-specific. Use layouts for shared shell (nav, footer). All components are client-side by default.

## Effect Library Usage

Frontend uses React patterns (useEffect, React Query, Suspense). Effect fits in data-fetching hooks, error boundaries, or service integration. React Query handles server state; Effect optional for typed error handling in hooks.

## Implementation Considerations

Routes defined in config (e.g. `src/routes.tsx`); path + component binding. Layout nesting via route config or wrapper components. Stub variables: `{{ComponentName}}`, `{{routePath}}`, `{{hookName}}`.

## Alternative Technology Considerations

TanStack Router (file-based or code-based), Remix (full-stack), Astro (content + partial hydration). Vite + React Router is lightweight for SPA-focused apps.
