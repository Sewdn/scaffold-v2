# Dev Tools: add-endpoint-group

## Command

```
scaffold dev-tools add-endpoint-group <name>
```

## Description

API group: routes, OpenAPI tags.

## Injection Target

- **Backend:** `src/routes/<name>/` (route group)
- **svc-api-spec:** OpenAPI tag + path grouping
- **Elysia:** Plugin registration

## Co-generation

- `backend add-route` (route group)
- `svc-api-spec` (OpenAPI tag)
- `backend add-plugin` (optional)

## Technology & Patterns

- **Elysia** routes, **OpenAPI** tags. Effect for route→spec sync. Alternatives: tRPC, GraphQL codegen.

## Status

Planned
