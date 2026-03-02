# Frontend Next.js: add-layout

## Command

```
scaffold frontend-nextjs add-layout <name>
```

## Description

Add a layout component for a route segment.

## Injection Target

- **Artifact:** `app/<name>/layout.tsx`

## Status

Planned

## Underlying Technology

Next.js App Router layouts. Each `layout.tsx` wraps its route segment and children. Layouts persist across navigations; re-render only when segment params change.

## Best Practices & Engineering Patterns

Keep layouts presentational; move logic to containers or hooks. Use nested layouts for shared UI (nav, sidebar). Avoid heavy data fetching in layouts; prefer page-level or component-level fetching.

## Effect Library Usage

Layouts use React patterns. Effect is uncommon here; use for cross-cutting concerns (e.g. auth context) if needed.

## Implementation Considerations

Layout nesting: `app/layout.tsx` → `app/<name>/layout.tsx` → `app/<name>/page.tsx`. Stub variables: `{{LayoutName}}`, `{{routeSegment}}`. Layouts receive `children` prop.

## Alternative Technology Considerations

Remix (root + nested layouts), TanStack Router (layout routes), Astro (layout components with slots).
