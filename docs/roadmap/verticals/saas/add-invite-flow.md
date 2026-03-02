# SaaS: add-invite-flow

## Command

```
scaffold saas add-invite-flow
```

## Description

Invite users to org: invite model, email, accept flow.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (Invite model)
- **svc-email:** `src/templates/invite.ts`
- **Backend:** `src/routes/invites/` (create, accept, list)

## Co-generation

- `svc-prisma add-model` (Invite)
- `svc-email add-template` (invite)
- `backend add-route` (invites)

## Technology & Patterns

- **svc-email**, **Prisma** Invite. Effect for invite→email→accept flow. Alternatives: Resend, SendGrid.

## Status

Planned
