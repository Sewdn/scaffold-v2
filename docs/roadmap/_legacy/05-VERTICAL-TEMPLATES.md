# Vertical and Industry Templates

This document describes **vertical presets** — pre-configured combinations of app types and service packages for specific industries or use cases. These enable `scaffold project --vertical <name>` to create a tailored starting point.

---

## 1. SaaS Starter

**Target:** Auth + Billing + Dashboard applications.

### App Types

- `frontend-nextjs` (or `frontend-vite`) — Dashboard UI
- `backend` — API

### Service Packages

- `svc-auth` (WorkOS, Clerk, Auth.js)
- `svc-payments` (Stripe)
- `svc-config`
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

### Vertical Expansion Commands

| Command           | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `add-tenant`      | Multi-tenant org + RBAC (org model, membership, roles)              |
| `add-plan`        | Subscription tier (plan model, Stripe product/price, feature flags) |
| `add-invite-flow` | Invite users to org (invite model, email, accept flow)              |
| `add-usage-meter` | Usage-based billing (meter model, events, aggregation)              |

---

## 2. E-Commerce

**Target:** Products, cart, checkout.

### App Types

- `frontend-nextjs` — Storefront
- `backend` — API
- `cli` (optional) — Admin, import tools

### Service Packages

- `svc-catalog` (products, categories, variants)
- `svc-cart`
- `svc-checkout` (orders, payments)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

### Vertical Expansion Commands

| Command                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `add-product-type`       | Product schema (SKU, variants, attributes, pricing) |
| `add-shipping-method`    | Shipping rules (zones, rates, carriers)             |
| `add-payment-provider`   | Payment gateway (Stripe, PayPal)                    |
| `add-inventory-tracking` | Stock, reservations, low-stock alerts               |

---

## 3. Content/CMS

**Target:** Posts, media, taxonomy.

### App Types

- `frontend-nextjs` — Site
- `backend` — API
- `documentation` or `frontend-vite` (optional) — Admin

### Service Packages

- `svc-content` (posts, pages, drafts)
- `svc-media` (uploads, transforms, CDN)
- `svc-taxonomy` (tags, categories)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

### Vertical Expansion Commands

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `add-content-type` | Content model (fields, status, versioning)     |
| `add-taxonomy`     | Taxonomy (hierarchical or flat, relations)     |
| `add-media-preset` | Image/video presets (sizes, formats, CDN)      |
| `add-webhook`      | Publish/update webhooks for headless consumers |

---

## 4. Internal Tools

**Target:** Admin, reports, workflows.

### App Types

- `frontend-vite` or `frontend-nextjs` — Admin UI
- `backend` — API
- `cli` — Batch jobs, migrations

### Service Packages

- `svc-auth` (SSO, WorkOS)
- `svc-audit` (audit logs)
- `svc-reports` (queries, exports)
- `svc-workflow` (approvals, steps)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

### Vertical Expansion Commands

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `add-report`      | Report definition (query, filters, export formats) |
| `add-workflow`    | Workflow (steps, approvals, notifications)         |
| `add-admin-page`  | CRUD page for an entity (list, form, actions)      |
| `add-audit-scope` | Audit scope (entity + events to log)               |

---

## 5. Developer Tools

**Target:** API playground, docs generator.

### App Types

- `frontend-vite` — Playground UI
- `backend` — API
- `documentation` — Starlight docs
- `mcp-server` (optional)

### Service Packages

- `svc-api-spec` (OpenAPI/Swagger)
- `svc-auth` (API keys)
- `svc-config`
- `domain`
- `ui`, `ui-lib`

### Vertical Expansion Commands

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `add-endpoint-group`     | API group (routes, OpenAPI tags)         |
| `add-api-key-scope`      | API key scope (permissions, rate limits) |
| `add-docs-section`       | Docs section (guide + code samples)      |
| `add-playground-example` | Playground example (request/response)    |

---

## 6. Data Pipeline

**Target:** Ingest, transform, export.

### App Types

- `backend` — API + workers
- `cli` — Jobs, migrations
- `frontend-vite` (optional) — Monitoring

### Service Packages

- `svc-ingest` (sources, validation)
- `svc-transform` (jobs, schemas)
- `svc-export` (destinations, schedules)
- `svc-prisma`
- `domain`

### Vertical Expansion Commands

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `add-source`      | Ingest source (connector, schema, validation) |
| `add-transform`   | Transform job (input/output schema, logic)    |
| `add-destination` | Export destination (S3, warehouse, webhook)   |
| `add-schedule`    | Cron/schedule for pipeline runs               |

---

## Summary Matrix

| Vertical       | Frontend | Backend | CLI | Docs | MCP | Key Packages                   | Expansion Focus                   |
| -------------- | -------- | ------- | --- | ---- | --- | ------------------------------ | --------------------------------- |
| SaaS           | ✓        | ✓       | —   | —    | —   | auth, payments, prisma         | tenants, plans, invites           |
| E-commerce     | ✓        | ✓       | opt | —    | —   | catalog, cart, checkout        | product types, shipping, payments |
| CMS            | ✓        | ✓       | —   | opt  | —   | content, media, taxonomy       | content types, taxonomies         |
| Internal tools | ✓        | ✓       | ✓   | —    | —   | auth, audit, reports, workflow | reports, workflows, admin pages   |
| Dev tools      | ✓        | ✓       | —   | ✓    | opt | api-spec, auth                 | endpoints, docs, playground       |
| Data pipeline  | opt      | ✓       | ✓   | —    | —   | ingest, transform, export      | sources, transforms, destinations |

---

## Implementation Notes

1. **Vertical presets** — Add `--vertical <name>` to `scaffold project` to pre-select apps + packages
2. **Expansion commands** — Vertical-specific commands can live under `scaffold backend add-<artifact>` or `scaffold <vertical> add-<artifact>`
3. **Stub layout** — Vertical stubs under `stubs/vertical/<name>/` or `app-types/<id>/stubs/expansion/<vertical>/`
4. **Co-generation** — Vertical expansions may trigger multiple package expansions (e.g. `add-tenant` → domain entity + svc-auth + prisma model)
