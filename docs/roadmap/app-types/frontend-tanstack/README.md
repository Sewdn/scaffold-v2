# Frontend TanStack App Type

**Description:** TanStack Start full-stack React app.

**Status:** Planned

## Expansion Commands

| Command                           | Description                                 | Spec                       |
| --------------------------------- | ------------------------------------------- | -------------------------- |
| [add-page](add-page.md)           | Add a page route (file-router pattern)      | `src/routes/<name>.tsx`    |
| [add-layout](add-layout.md)       | Add a layout component                      | `src/components/layouts/`  |
| [add-api](add-api.md)             | Add an API route handler                    | `src/routes/api/<name>.ts` |
| [add-component](add-component.md) | Add a component in `components/`            | `src/components/<Name>/`   |
| [add-addon](add-addon.md)         | Add a TanStack add-on (e.g. clerk, drizzle) | Delegates to TanStack CLI  |

## Underlying Technology

TanStack Start (full-stack React), TanStack Router with file-router, TanStack add-ons (e.g. clerk, drizzle, tanstack-query). Built on Vinxi/Vite for SSR and client hydration.

## Best Practices & Engineering Patterns

File-based routing in `src/routes/`, route loaders for data, search params for state, add-on composition via `--add-ons`. Prefer loaders over client-side fetches for above-the-fold data.

## Effect Library Usage

Effect-first per project pitch. Use Effect in loaders and server-side data fetching; `@effect/react` for client components. Integrate with TanStack Query via Effect layers or custom adapters.

## Implementation Considerations

Follow TanStack Start route conventions (`routes/<path>.tsx`, `routes/api/<name>.ts`). Delegate add-on installation to `npx @tanstack/cli add <id>`. Use stub variables (`projectName`, `addOnEnabled`, etc.) for template interpolation.

## Alternative Technology Considerations

Next.js vs TanStack Start: TanStack offers co-located routing and simpler mental model. Remix shares loader patterns. Vinxi underpins TanStack Start; consider Vinxi directly for custom setups.
