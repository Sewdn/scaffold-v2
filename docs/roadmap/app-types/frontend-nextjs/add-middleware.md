# Frontend Next.js: add-middleware

## Command

```
scaffold frontend-nextjs add-middleware <name>
```

## Description

Add middleware logic (e.g. auth) for route protection.

## Injection Target

- **Artifact:** `middleware.ts` or `middleware/<name>.ts` (patch main middleware)

## Status

Planned

## Underlying Technology

Next.js Edge Middleware. Runs before route resolution. Single `middleware.ts` at project root; can delegate to `middleware/<name>.ts` modules. Uses `NextResponse` for redirects/rewrites.

## Best Practices & Engineering Patterns

Keep middleware minimal; auth checks, redirects, headers. Avoid heavy logic; use matcher config to limit which routes run. Chain middleware by importing and composing functions.

## Effect Library Usage

Middleware is request/response oriented; Effect can model auth flows, error handling. Typically simpler to use imperative NextResponse; Effect optional for complex flows.

## Implementation Considerations

File: `middleware.ts` (root) or patch to add `middleware/<name>.ts` import. Matcher order affects which routes are processed. Stub variables: `{{middlewareName}}`, `{{matcherPaths}}`.

## Alternative Technology Considerations

Remix (loader/action + middleware), Astro (middleware), TanStack Start (middleware), Vercel Edge Config.
