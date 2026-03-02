# Dev Tools: add-api-key-scope

## Command

```
scaffold dev-tools add-api-key-scope <name>
```

## Description

API key scope: permissions, rate limits.

## Injection Target

- **svc-auth:** `src/scopes/<name>.ts` (scope definition)
- **Backend:** Middleware for scope validation
- **Prisma:** `prisma/schema.prisma` (ApiKey, ApiKeyScope if needed)

## Co-generation

- `svc-auth add-guard` (scope check)
- `svc-config add-config-section` (rate limits)

## Technology & Patterns

- **Prisma** (ApiKey, scope), **svc-auth**. Effect for key→scope→rate-limit. Alternatives: WorkOS API keys.

## Status

Planned
