# SaaS: add-tenant

## Command

```
scaffold saas add-tenant
```

## Description

Multi-tenant org + RBAC: org model, membership, roles.

## Injection Target

- **Domain:** `domain/src/entities/<entity>.ts`
- **Prisma:** `prisma/schema.prisma` (Org, Membership, Role models)
- **svc-auth:** RBAC guards, org context

## Co-generation

- `domain add-entity` (Org, Membership)
- `svc-prisma add-model` (Org, Membership, Role)
- `svc-auth add-guard` (org-scoped)

## Technology & Patterns

- **WorkOS** (org, membership), **Prisma** (models). Effect for RBAC flows. Alternatives: Supabase RLS, Firebase.

## Status

Planned
