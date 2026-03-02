# Developer Tools Vertical

**Target:** API playground, docs generator.

**Status:** Planned

## App Types

- `frontend-vite` — Playground UI
- `backend` — API
- `documentation` — Starlight docs
- `mcp-server` (optional)

## Service Packages

- `svc-api-spec` (OpenAPI/Swagger)
- `svc-auth` (API keys)
- `svc-config`
- `domain`
- `ui`, `ui-lib`

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-endpoint-group](add-endpoint-group.md) | API group (routes, OpenAPI tags) | backend, svc-api-spec |
| [add-api-key-scope](add-api-key-scope.md) | API key scope (permissions, rate limits) | svc-auth |
| [add-docs-section](add-docs-section.md) | Docs section (guide + code samples) | documentation |
| [add-playground-example](add-playground-example.md) | Playground example (request/response) | frontend |

## Technology & Patterns

- **OpenAPI/Swagger**, **svc-auth** (API keys). Multi-package co-generation (backend + docs + playground).
- **Effect** for API key→scope→rate-limit. Alternatives: Supabase, Firebase (different auth model).
