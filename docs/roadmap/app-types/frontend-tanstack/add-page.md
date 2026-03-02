# Frontend TanStack: add-page

## Command

```
scaffold frontend-tanstack add-page <path>
```

## Description

Add a page route using file-router pattern.

## Injection Target

- **Artifact:** `src/routes/<path>.tsx`

## Status

Planned

## Underlying Technology

Pages are file-router routes in `src/routes/`. TanStack Router maps file paths to URLs. Supports `createFileRoute`, loaders, search params, and nested layouts. Built on Vinxi for SSR.

## Best Practices & Engineering Patterns

One component per route file. Use loaders for data; avoid client fetch for initial render. Leverage search params for shareable state. Follow `routes/<path>.tsx` convention; use `$` for dynamic segments.

## Effect Library Usage

Effect in page loaders for data fetching. Use `Effect.runPromise` or `Effect.runPromiseExit` in loaders. `@effect/react` for client components that need Effect services. TanStack Query can cache loader data.

## Implementation Considerations

Stub variables: `routePath`, `routeName`, `RouteName`. Convention: `src/routes/<path>.tsx`. Dynamic segments: `$id`, `$slug`. Ensure loader return type matches route expectations.

## Alternative Technology Considerations

TanStack Start vs Next.js App Router: TanStack uses file-router; Next.js uses folder-based. Remix shares loader/action model. Vinxi is the underlying server; TanStack Start adds routing conventions.
