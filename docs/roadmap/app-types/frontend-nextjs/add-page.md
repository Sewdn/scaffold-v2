# Frontend Next.js: add-page

## Command

```
scaffold frontend-nextjs add-page <path>
```

## Description

Add a page route under `app/` using App Router.

## Injection Target

- **Artifact:** `app/<path>/page.tsx`

## Registry

- Next.js App Router uses file-based routing; no registry patch needed unless adding to a navigation config

## Status

Planned

## Underlying Technology

Next.js App Router file-based routing. Each `page.tsx` defines a route segment. React 19 Server Components by default; add `"use client"` for client-only pages.

## Best Practices & Engineering Patterns

Prefer Server Components for pages that fetch data. Use container components for client logic; keep page files thin. Colocate page-specific components in the same route folder when they are not reused.

## Effect Library Usage

Pages typically use React patterns (Suspense, React Query). Effect fits better in data-fetching services or error boundaries, not in page components directly.

## Implementation Considerations

Path `app/<path>/page.tsx` maps to URL `/<path>`. Dynamic segments use `[param]`. Stub variables: `{{PageName}}`, `{{routePath}}`.

## Alternative Technology Considerations

TanStack Router (code-based routes), Remix (loader/action pattern), Astro (`.astro` pages with partial hydration).
