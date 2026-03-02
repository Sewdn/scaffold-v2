# Frontend Next.js: add-route

## Command

```
scaffold frontend-nextjs add-route <path>
```

## Description

Add a route group with page + optional layout.

## Injection Target

- **Artifact:** `app/<path>/page.tsx`, optionally `app/<path>/layout.tsx`

## Status

Planned

## Underlying Technology

Next.js App Router route groups. Folders under `app/` define segments. Optional `layout.tsx` per segment. File-based; no manual route registry.

## Best Practices & Engineering Patterns

Group related routes with a shared layout. Use route groups `(groupName)` for organization without affecting URL. Colocate route-specific components in the segment folder.

## Effect Library Usage

Route scaffolding is structural; Effect does not apply. Data fetching in routes uses React Query or Server Components.

## Implementation Considerations

Path `app/<path>/` creates segment; add `page.tsx` for the route. Optional `layout.tsx` for segment-specific layout. Stub variables: `{{routePath}}`, `{{LayoutName}}` if layout included.

## Alternative Technology Considerations

TanStack Router (route tree), Remix (flat or nested file routes), Astro (file-based with optional code config).
