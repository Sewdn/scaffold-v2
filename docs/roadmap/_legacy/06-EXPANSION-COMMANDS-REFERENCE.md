# Expansion Commands Reference

This document provides a consolidated reference of all expansion commands across app types, service packages, UI/domain, and verticals.

---

## 1. CLI App

| Command | Description |
|---------|-------------|
| `scaffold cli add-command <name>` | Add a new CLI command |
| `scaffold cli add-service <name>` | Add a service dependency to CLI |

---

## 2. Backend App

| Command | Description |
|---------|-------------|
| `scaffold backend add-route <path>` | Add HTTP route |
| `scaffold backend add-plugin <name>` | Add Elysia plugin |
| `scaffold backend add-middleware <name>` | Add middleware |
| `scaffold backend add-service <name>` | Add service package dependency |

---

## 3. Frontend (Next.js / Vite)

| Command | Description |
|---------|-------------|
| `scaffold frontend add-page <path>` | Add page/route |
| `scaffold frontend add-layout <name>` | Add layout |
| `scaffold frontend add-api-route <path>` | Add API route (Next.js) |
| `scaffold frontend add-provider <name>` | Add context provider |
| `scaffold frontend add-module <name>` | Add module (service + UI) |

---

## 4. MCP Server

| Command | Description |
|---------|-------------|
| `scaffold mcp add-tool <name>` | Add MCP tool |
| `scaffold mcp add-resource <name>` | Add MCP resource |
| `scaffold mcp add-prompt <name>` | Add prompt template |

---

## 5. Slide Deck

| Command | Description |
|---------|-------------|
| `scaffold slides add-section <name>` | Add slide section |
| `scaffold slides add-theme <name>` | Add theme variant |

---

## 6. Documentation

| Command | Description |
|---------|-------------|
| `scaffold docs add-sidebar <name>` | Add sidebar section |
| `scaffold docs add-page <path>` | Add docs page |
| `scaffold docs add-component <name>` | Add component demo |

---

## 7. Worker App

| Command | Description |
|---------|-------------|
| `scaffold worker add-job <name>` | Add job handler |
| `scaffold worker add-queue <name>` | Add queue config |
| `scaffold worker add-schedule <cron>` | Add cron schedule |

---

## 8. GraphQL API

| Command | Description |
|---------|-------------|
| `scaffold graphql add-type <name>` | Add GraphQL type |
| `scaffold graphql add-resolver <name>` | Add resolver |
| `scaffold graphql add-directive <name>` | Add directive |

---

## 9. tRPC API

| Command | Description |
|---------|-------------|
| `scaffold trpc add-router <name>` | Add tRPC router |
| `scaffold trpc add-procedure <router> <name>` | Add procedure |
| `scaffold trpc add-middleware <name>` | Add middleware |

---

## 10. WebSocket Server

| Command | Description |
|---------|-------------|
| `scaffold ws add-channel <name>` | Add channel |
| `scaffold ws add-handler <event>` | Add event handler |

---

## 11. Email Service

| Command | Description |
|---------|-------------|
| `scaffold email add-template <name>` | Add email template |
| `scaffold email add-provider <name>` | Add provider config |

---

## 12. Mobile (React Native / Expo)

| Command | Description |
|---------|-------------|
| `scaffold mobile add-screen <name>` | Add screen |
| `scaffold mobile add-navigation <name>` | Add navigation stack |
| `scaffold mobile add-module <name>` | Add native module |

---

## 13. Desktop (Tauri / Electron)

| Command | Description |
|---------|-------------|
| `scaffold desktop add-window <name>` | Add window |
| `scaffold desktop add-command <name>` | Add IPC command |
| `scaffold desktop add-menu <name>` | Add menu |

---

## 14. Cron App

| Command | Description |
|---------|-------------|
| `scaffold cron add-task <name>` | Add cron task |
| `scaffold cron add-schedule <cron>` | Add schedule |

---

## 15. Service Packages

| Package | Expansion Commands |
|---------|--------------------|
| `svc-auth` | `add-provider`, `add-strategy`, `add-guard` |
| `svc-email` | `add-template`, `add-provider` |
| `svc-storage` | `add-bucket`, `add-preset` |
| `svc-search` | `add-index`, `add-analyzer` |
| `svc-cache` | `add-namespace`, `add-ttl-preset` |
| `svc-queue` | `add-queue`, `add-handler` |
| `svc-payments` | `add-provider`, `add-product-type` |
| `svc-notifications` | `add-channel`, `add-template` |
| `svc-analytics` | `add-event`, `add-dashboard` |
| `svc-elysia-api` | `add-endpoint`, `add-middleware` |
| `svc-workos` | `add-connection`, `add-organization-schema` |
| `svc-logging` | `add-transport`, `add-format` |
| `svc-prisma` | `add-model`, `add-migration` |

---

## 16. UI / Domain

| Target | Expansion Commands |
|-------|--------------------|
| `ui` | `add-shadcn-component`, `add-theme-variant`, `init-shadcn`, `add-base-color` |
| `ui-lib` | `add-component`, `add-hook`, `add-story`, `add-variant`, `add-composable`, `add-wrapper` |
| `domain` | `add-entity`, `add-value-object`, `add-event`, `add-repository-interface`, `add-type` |

---

## 17. Vertical Templates

| Vertical | Expansion Commands |
|----------|--------------------|
| SaaS | `add-tenant`, `add-plan`, `add-invite-flow`, `add-usage-meter` |
| E-commerce | `add-product-type`, `add-shipping-method`, `add-payment-provider`, `add-inventory-tracking` |
| CMS | `add-content-type`, `add-taxonomy`, `add-media-preset`, `add-webhook` |
| Internal tools | `add-report`, `add-workflow`, `add-admin-page`, `add-audit-scope` |
| Dev tools | `add-endpoint-group`, `add-api-key-scope`, `add-docs-section`, `add-playground-example` |
| Data pipeline | `add-source`, `add-transform`, `add-destination`, `add-schedule` |

---

## Summary Counts

| Category | Count |
|----------|-------|
| App types | 16 |
| Service packages | 17 |
| App expansion commands | ~45 |
| Service expansion commands | ~35 |
| UI/domain expansion commands | ~15 |
| Vertical expansion commands | ~24 |
| **Total expansion commands** | **~120** |

---

## Command Naming Convention

- **Additive:** `add-<artifact>` (e.g. `add-command`, `add-route`)
- **Target:** First argument or `--package` flag specifies target
- **Consistency:** Same pattern across app types (`add-*` for new artifacts)
