# Frontend Next.js: add-api

## Command

```
scaffold frontend-nextjs add-api <path>
```

## Description

Add an API route handler.

## Injection Target

- **Artifact:** `app/api/<path>/route.ts`

## Status

Planned

## Underlying Technology

Next.js Route Handlers in `app/api/`. Each `route.ts` exports GET, POST, etc. Runs on server; no client bundle. Uses Web Request/Response API.

## Best Practices & Engineering Patterns

Keep handlers thin; delegate to service packages. Validate input with Zod. Return typed JSON; use proper status codes. Prefer Elysia or dedicated backend for complex APIs.

## Effect Library Usage

API routes are server-side; Effect can model request/response, error handling, and service calls. Good fit for typed error handling and composable logic.

## Implementation Considerations

Path `app/api/<path>/route.ts` maps to `/api/<path>`. Stub variables: `{{apiPath}}`, `{{handlerName}}`. Export `GET`, `POST`, `PUT`, `DELETE` as needed.

## Alternative Technology Considerations

Elysia (standalone backend), Remix (resource routes), Astro (API endpoints), tRPC (type-safe RPC).
