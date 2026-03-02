# Service Packages Roadmap

This document lists all service packages (existing and proposed) with their expansion commands. Service packages provide reusable backend logic and are consumed by apps.

---

## Existing Packages

### 1. domain

**Description:** Shared business logic and types.

| Expansion Command          | Description                                 | Injection Target                        |
| -------------------------- | ------------------------------------------- | --------------------------------------- |
| `add-entity`               | Add a domain entity (aggregate root)        | `src/entities/<name>.ts`                |
| `add-value-object`         | Add an immutable value object               | `src/value-objects/<name>.ts`           |
| `add-event`                | Add a domain event type                     | `src/events/<name>.ts`                  |
| `add-repository-interface` | Add a repository interface for an entity    | `src/repositories/<name>-repository.ts` |
| `add-type`                 | Add a shared type/interface (DTO, API type) | `src/types/<name>.ts`                   |

**Status:** Planned

---

### 2. svc-config

**Description:** Configuration service.

| Expansion Command    | Description                            | Injection Target              |
| -------------------- | -------------------------------------- | ----------------------------- |
| `add-env-var`        | Add an environment variable definition | `src/env/<name>.ts` or config |
| `add-config-section` | Add a config section                   | `src/config/<name>.ts`        |

**Status:** Planned

---

### 3. svc-prisma

**Description:** Data service with Prisma ORM.

| Expansion Command | Description                            | Injection Target       |
| ----------------- | -------------------------------------- | ---------------------- |
| `add-model`       | Add a Prisma model                     | `prisma/schema.prisma` |
| `add-migration`   | Create migration from schema diff      | `prisma/migrations/`   |
| `add-seed`        | Add seed data for a model              | `prisma/seed.ts`       |
| `add-enum`        | Add a Prisma enum                      | `prisma/schema.prisma` |
| `add-relation`    | Add relation fields to existing models | `prisma/schema.prisma` |

**Status:** Planned (high priority)

---

### 4. ui

**Description:** Core UI components (Shadcn base).

| Expansion Command      | Description                         | Injection Target                 |
| ---------------------- | ----------------------------------- | -------------------------------- |
| `add-shadcn-component` | Add Shadcn component(s) via CLI     | Delegates to `bunx shadcn add`   |
| `add-theme-variant`    | Add a theme variant (brand, accent) | `globals.css`, `tailwind.config` |
| `init-shadcn`          | Initialize Shadcn in package        | `components.json`                |

**Status:** Planned

---

### 5. ui-lib

**Description:** Custom UI components library.

| Expansion Command | Description                  | Injection Target                           |
| ----------------- | ---------------------------- | ------------------------------------------ |
| `add-component`   | Add a new component (exists) | `src/components/<Name>/`                   |
| `add-hook`        | Add a hook for a component   | `src/components/<Name>/use<Name>.ts`       |
| `add-story`       | Add a Storybook story        | `src/components/<Name>/<Name>.stories.tsx` |
| `add-variant`     | Add a variant to a component | Extend component props                     |
| `add-composable`  | Add a shared hook            | `src/hooks/<name>.ts`                      |

**Status:** add-component implemented; others planned

---

## Proposed Packages

### 6. svc-auth

**Description:** Authentication (WorkOS, Clerk, JWT).

| Expansion Command   | Description                   | Injection Target           |
| ------------------- | ----------------------------- | -------------------------- |
| `add-provider`      | Add an auth provider          | `src/providers/<name>.ts`  |
| `add-strategy`      | Add an auth strategy          | `src/strategies/<name>.ts` |
| `add-guard`         | Add a guard (e.g. role check) | `src/guards/<name>.ts`     |
| `add-session-store` | Add a session store impl      | `src/session/<name>.ts`    |
| `add-role`          | Add a role definition         | `src/roles/<name>.ts`      |

**Status:** Proposed

---

### 7. svc-email

**Description:** Email delivery (Resend, SendGrid, Nodemailer).

| Expansion Command     | Description                    | Injection Target           |
| --------------------- | ------------------------------ | -------------------------- |
| `add-template`        | Add an email template          | `src/templates/<name>.ts`  |
| `add-transport`       | Add a transport config         | `src/transports/<name>.ts` |
| `add-webhook-handler` | Add a webhook handler          | `src/webhooks/<name>.ts`   |
| `add-queue-handler`   | Add a queue-based send handler | `src/queue/<name>.ts`      |

**Status:** Proposed

---

### 8. svc-storage

**Description:** Object storage (S3, R2, MinIO).

| Expansion Command       | Description             | Injection Target         |
| ----------------------- | ----------------------- | ------------------------ |
| `add-bucket`            | Add a bucket config     | `src/buckets/<name>.ts`  |
| `add-presigned-handler` | Add presigned URL route | `src/handlers/<name>.ts` |
| `add-upload-policy`     | Add an upload policy    | `src/policies/<name>.ts` |
| `add-lifecycle-rule`    | Add a lifecycle rule    | Config                   |

**Status:** Proposed

---

### 9. svc-search

**Description:** Full-text search (Elasticsearch, Meilisearch, OpenSearch).

| Expansion Command  | Description                 | Injection Target         |
| ------------------ | --------------------------- | ------------------------ |
| `add-index`        | Add an index definition     | `src/indexes/<name>.ts`  |
| `add-mapping`      | Add field mapping for index | Index config             |
| `add-synonym-set`  | Add synonym set             | `src/synonyms/<name>.ts` |
| `add-search-route` | Add a search API route      | `src/routes/<name>.ts`   |

**Status:** Proposed

---

### 10. svc-cache

**Description:** Caching layer (Redis, Upstash).

| Expansion Command       | Description                    | Injection Target             |
| ----------------------- | ------------------------------ | ---------------------------- |
| `add-key-pattern`       | Add a key pattern + TTL config | `src/patterns/<name>.ts`     |
| `add-invalidation-rule` | Add cache invalidation rule    | `src/invalidation/<name>.ts` |
| `add-session-store`     | Add Redis session store        | `src/session/<name>.ts`      |
| `add-rate-limiter`      | Add a rate limiter config      | `src/limiters/<name>.ts`     |

**Status:** Proposed

---

### 11. svc-queue

**Description:** Job queue (BullMQ, Bull, Inngest).

| Expansion Command  | Description          | Injection Target           |
| ------------------ | -------------------- | -------------------------- |
| `add-job`          | Add a job handler    | `src/jobs/<name>.ts`       |
| `add-worker`       | Add a worker process | `src/workers/<name>.ts`    |
| `add-retry-policy` | Add a retry policy   | `src/policies/<name>.ts`   |
| `add-scheduler`    | Add a scheduled job  | `src/schedulers/<name>.ts` |

**Status:** Proposed

---

### 12. svc-payments

**Description:** Payments (Stripe, Paddle).

| Expansion Command       | Description                | Injection Target         |
| ----------------------- | -------------------------- | ------------------------ |
| `add-product`           | Add a product config       | `src/products/<name>.ts` |
| `add-webhook`           | Add a webhook handler      | `src/webhooks/<name>.ts` |
| `add-checkout-session`  | Add checkout session logic | `src/checkout/<name>.ts` |
| `add-subscription-plan` | Add a subscription plan    | `src/plans/<name>.ts`    |

**Status:** Proposed

---

### 13. svc-notifications

**Description:** Push/in-app notifications.

| Expansion Command      | Description                 | Injection Target            |
| ---------------------- | --------------------------- | --------------------------- |
| `add-channel`          | Add a notification channel  | `src/channels/<name>.ts`    |
| `add-template`         | Add a notification template | `src/templates/<name>.ts`   |
| `add-preference-group` | Add user preference group   | `src/preferences/<name>.ts` |
| `add-delivery-rule`    | Add a delivery rule         | `src/rules/<name>.ts`       |

**Status:** Proposed

---

### 14. svc-analytics

**Description:** Analytics and events.

| Expansion Command      | Description             | Injection Target        |
| ---------------------- | ----------------------- | ----------------------- |
| `add-event-schema`     | Add an event schema     | `src/events/<name>.ts`  |
| `add-funnel`           | Add a funnel definition | `src/funnels/<name>.ts` |
| `add-dashboard-widget` | Add a dashboard widget  | `src/widgets/<name>.ts` |
| `add-export-pipeline`  | Add an export pipeline  | `src/exports/<name>.ts` |

**Status:** Proposed

---

### 15. svc-elysia-api

**Description:** Elysia HTTP API (CRUD) — aligns with Epic 7 API Service.

| Expansion Command | Description                                  | Injection Target           |
| ----------------- | -------------------------------------------- | -------------------------- |
| `add-route`       | Add a route                                  | `src/routes/<name>.ts`     |
| `add-resource`    | Add CRUD routes + service + types for entity | `src/resources/<name>/`    |
| `add-middleware`  | Add middleware                               | `src/middleware/<name>.ts` |
| `add-guard`       | Add a guard                                  | `src/guards/<name>.ts`     |
| `add-plugin`      | Add an Elysia plugin                         | `src/plugins/<name>.ts`    |

**Status:** Proposed (high priority)

---

### 16. svc-workos

**Description:** WorkOS SSO/SCIM.

| Expansion Command    | Description               | Injection Target            |
| -------------------- | ------------------------- | --------------------------- |
| `add-connection`     | Add an SSO connection     | `src/connections/<name>.ts` |
| `add-directory-sync` | Add directory sync config | `src/directory/<name>.ts`   |
| `add-webhook`        | Add a webhook handler     | `src/webhooks/<name>.ts`    |
| `add-sso-provider`   | Add an SSO provider       | `src/providers/<name>.ts`   |

**Status:** Proposed

---

### 17. svc-logging

**Description:** Structured logging.

| Expansion Command      | Description          | Injection Target           |
| ---------------------- | -------------------- | -------------------------- |
| `add-transport`        | Add a log transport  | `src/transports/<name>.ts` |
| `add-formatter`        | Add a formatter      | `src/formatters/<name>.ts` |
| `add-context-enricher` | Add context enricher | `src/enrichers/<name>.ts`  |
| `add-sink`             | Add a log sink       | `src/sinks/<name>.ts`      |

**Status:** Proposed

---

## Summary Table

| Package ID        | Status   | Expansion Commands                                                          |
| ----------------- | -------- | --------------------------------------------------------------------------- |
| domain            | Planned  | add-entity, add-value-object, add-event, add-repository-interface, add-type |
| svc-config        | Planned  | add-env-var, add-config-section                                             |
| svc-prisma        | Planned  | add-model, add-migration, add-seed, add-enum, add-relation                  |
| ui                | Planned  | add-shadcn-component, add-theme-variant, init-shadcn                        |
| ui-lib            | Partial  | add-component ✅, add-hook, add-story, add-variant, add-composable          |
| svc-auth          | Proposed | add-provider, add-strategy, add-guard, add-session-store, add-role          |
| svc-email         | Proposed | add-template, add-transport, add-webhook-handler, add-queue-handler         |
| svc-storage       | Proposed | add-bucket, add-presigned-handler, add-upload-policy, add-lifecycle-rule    |
| svc-search        | Proposed | add-index, add-mapping, add-synonym-set, add-search-route                   |
| svc-cache         | Proposed | add-key-pattern, add-invalidation-rule, add-session-store, add-rate-limiter |
| svc-queue         | Proposed | add-job, add-worker, add-retry-policy, add-scheduler                        |
| svc-payments      | Proposed | add-product, add-webhook, add-checkout-session, add-subscription-plan       |
| svc-notifications | Proposed | add-channel, add-template, add-preference-group, add-delivery-rule          |
| svc-analytics     | Proposed | add-event-schema, add-funnel, add-dashboard-widget, add-export-pipeline     |
| svc-elysia-api    | Proposed | add-route, add-resource, add-middleware, add-guard, add-plugin              |
| svc-workos        | Proposed | add-connection, add-directory-sync, add-webhook, add-sso-provider           |
| svc-logging       | Proposed | add-transport, add-formatter, add-context-enricher, add-sink                |
