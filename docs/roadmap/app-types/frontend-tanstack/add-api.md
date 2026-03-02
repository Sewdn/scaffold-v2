# Frontend TanStack: add-api

## Command

```
scaffold frontend-tanstack add-api <name>
```

## Description

Add an API route handler.

## Injection Target

- **Artifact:** `src/routes/api/<name>.ts`

## Status

Planned

## Underlying Technology

API routes live in `src/routes/api/` under TanStack Start file-router. Handlers run server-side; use Elysia or Vinxi server APIs. TanStack Start supports `createAPIFileRoute` for typed API routes.

## Best Practices & Engineering Patterns

Co-locate API routes with route structure. Use loaders for GET; form actions or API routes for mutations. Prefer typed request/response via Zod or similar. Keep handlers thin; delegate to services.

## Effect Library Usage

Effect in API handlers for data access and side effects. Use Effect layers for DB, auth, etc. Return Effect.runPromise or similar from handlers; handle errors with Effect's error channel.

## Implementation Considerations

Stub variables: `routeName`, `handlerName`. Convention: `src/routes/api/<name>.ts`. Ensure handler exports match TanStack Start API route expectations. Consider add-on integration (e.g. drizzle for DB).

## Alternative Technology Considerations

TanStack Start API routes vs Next.js API routes: similar file-based layout. Remix uses loaders/actions instead. Elysia backend apps offer richer API features; use for complex backends.
