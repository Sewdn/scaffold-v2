# CMS: add-webhook

## Command

```
scaffold cms add-webhook <name>
```

## Description

Publish/update webhooks for headless consumers.

## Injection Target

- **svc-content:** `src/webhooks/<name>.ts` (webhook config)
- **Prisma:** `prisma/schema.prisma` (Webhook model)
- **Backend:** `src/routes/webhooks/` (dispatch)

## Co-generation

- `svc-prisma add-model` (Webhook)
- `backend add-route` (webhook dispatch)
- `svc-queue add-job` (async delivery)

## Technology & Patterns

- **Prisma** (Webhook), **svc-queue** (async). Effect for publish→dispatch. Alternatives: Vercel, Netlify webhooks.

## Status

Planned
