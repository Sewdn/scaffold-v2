# Internal Tools: add-audit-scope

## Command

```
scaffold internal-tools add-audit-scope <entity>
```

## Description

Audit scope: entity + events to log.

## Injection Target

- **svc-audit:** `src/scopes/<entity>.ts` (entity, events, fields)
- **Prisma:** `prisma/schema.prisma` (AuditLog model if not exists)
- **Backend:** Middleware/hooks to emit audit events

## Co-generation

- `svc-prisma add-model` (AuditLog)
- `svc-audit` (scope config)
- `domain add-event` (audit events)

## Technology & Patterns

- **Prisma** (AuditLog), **svc-audit**. Effect for event→persist. Alternatives: LogRocket, PostHog.

## Status

Planned
