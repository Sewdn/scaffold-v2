# Frontend Next.js App Type

**Description:** Next.js 15+ with App Router, React 19, TypeScript.

**Status:** Planned

## Expansion Commands

| Command                             | Description                                   | Spec                                      |
| ----------------------------------- | --------------------------------------------- | ----------------------------------------- |
| [add-page](add-page.md)             | Add a page route under `app/`                 | `app/<name>/page.tsx`                     |
| [add-layout](add-layout.md)         | Add a layout component                        | `app/<name>/layout.tsx`                   |
| [add-route](add-route.md)           | Add a route group with page + optional layout | `app/<name>/`                             |
| [add-api](add-api.md)               | Add an API route handler                      | `app/api/<name>/route.ts`                 |
| [add-component](add-component.md)   | Add a component in `components/`              | `components/<Name>/`                      |
| [add-middleware](add-middleware.md) | Add middleware logic (e.g. auth)              | `middleware.ts` or `middleware/<name>.ts` |

## Underlying Technology

Next.js 15+ App Router, React 19, TypeScript. File-based routing under `app/`. Server Components by default; `"use client"` for client components. Built-in API routes under `app/api/`.

## Best Practices & Engineering Patterns

Container/presentational split: containers handle data and logic, presentational components receive props. Colocate route-specific components in `app/<route>/`. Use layouts for shared UI; keep layouts thin. Prefer Server Components for data fetching; use client components only when needed (interactivity, hooks, browser APIs).

## Effect Library Usage

Frontend typically uses React patterns (useEffect, React Query, Suspense). Effect can apply to data-fetching layers, error boundaries, or backend-bound logic. React Query/TanStack Query handles server state; Effect is more natural in service packages or API boundaries.

## Implementation Considerations

Route segments map to folders; `page.tsx` defines the route. Layouts nest automatically (root layout wraps all). Middleware runs before route resolution; order matters for matcher config. Stub variables: `{{ComponentName}}`, `{{routePath}}`, `{{apiPath}}`.

## Alternative Technology Considerations

TanStack Router (file-based or code-based), Remix (full-stack, nested routes), Astro (content-focused, partial hydration). Next.js App Router remains the default for full React SSR/SSG with Vercel deployment.
