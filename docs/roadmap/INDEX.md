# Scaffold CLI Expansion Roadmap — Master Index

This document is the **directory** for the entire roadmap. Each feature, app type, service, and architectural pattern has its own file for granular review and specification.

---

## Quick Stats

| Category                   | Count |
| -------------------------- | ----- |
| **App types**              | 16    |
| **Service packages**       | 17    |
| **Expansion commands**     | ~120  |
| **Vertical presets**       | 6     |
| **Architectural patterns** | 8     |

---

## Document Structure

```
roadmap/
├── INDEX.md                    ← You are here
├── vision/                     # Strategic vision and principles
├── architecture/              # Architectural patterns (registry, stubs, etc.)
├── app-types/                 # One folder per app type, one file per expansion
├── services/                  # One folder per service, one file per expansion
├── ui-domain/                 # UI packages and domain (shared with services)
├── verticals/                 # Industry templates and vertical expansions
└── implementation/           # Phasing, priorities, roadmap
```

---

## Vision

| File                                                             | Purpose                                    |
| ---------------------------------------------------------------- | ------------------------------------------ |
| [vision/README.md](vision/README.md)                             | Overview                                   |
| [vision/strategic-context.md](vision/strategic-context.md)       | Problem, insight, solution                 |
| [vision/core-principles.md](vision/core-principles.md)           | Registry, stubs, naming, DI, co-generation |
| [vision/expansion-philosophy.md](vision/expansion-philosophy.md) | What expansion is and is not               |
| [vision/target-audience.md](vision/target-audience.md)           | AI agents, developers, teams               |
| [vision/success-metrics.md](vision/success-metrics.md)           | Targets and KPIs                           |
| [vision/extensibility.md](vision/extensibility.md)               | Open core, community, overrides            |

---

## Architecture

| File                                                                                 | Purpose                             |
| ------------------------------------------------------------------------------------ | ----------------------------------- |
| [architecture/README.md](architecture/README.md)                                     | Overview                            |
| [architecture/registry-pattern.md](architecture/registry-pattern.md)                 | Registry over entry, insert markers |
| [architecture/stub-location.md](architecture/stub-location.md)                       | Stub paths, expansion/ directory    |
| [architecture/naming-conventions.md](architecture/naming-conventions.md)             | kebab-case, PascalCase, camelCase   |
| [architecture/dependency-injection.md](architecture/dependency-injection.md)         | Factory, context patterns           |
| [architecture/co-generation.md](architecture/co-generation.md)                       | Expansion dependencies              |
| [architecture/validation.md](architecture/validation.md)                             | Pre/post expansion validators       |
| [architecture/multi-app-support.md](architecture/multi-app-support.md)               | --app flag, multi-app resolution    |
| [architecture/implementation-checklist.md](architecture/implementation-checklist.md) | Checklist per expansion             |

---

## App Types

| App Type                                          | Status                                | Expansion Commands                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cli](app-types/cli/)                             | ✅ Implemented (`@workspace/app-cli`) | [add-command](app-types/cli/add-command.md), [add-service](app-types/cli/add-service.md)                                                                                                                                                                                                                                                   |
| [frontend-nextjs](app-types/frontend-nextjs/)     | Planned                               | [add-page](app-types/frontend-nextjs/add-page.md), [add-layout](app-types/frontend-nextjs/add-layout.md), [add-route](app-types/frontend-nextjs/add-route.md), [add-api](app-types/frontend-nextjs/add-api.md), [add-component](app-types/frontend-nextjs/add-component.md), [add-middleware](app-types/frontend-nextjs/add-middleware.md) |
| [frontend-vite](app-types/frontend-vite/)         | Planned                               | [add-page](app-types/frontend-vite/add-page.md), [add-layout](app-types/frontend-vite/add-layout.md), [add-route](app-types/frontend-vite/add-route.md), [add-component](app-types/frontend-vite/add-component.md), [add-hook](app-types/frontend-vite/add-hook.md)                                                                        |
| [frontend-tanstack](app-types/frontend-tanstack/) | Planned                               | [add-page](app-types/frontend-tanstack/add-page.md), [add-layout](app-types/frontend-tanstack/add-layout.md), [add-api](app-types/frontend-tanstack/add-api.md), [add-component](app-types/frontend-tanstack/add-component.md), [add-addon](app-types/frontend-tanstack/add-addon.md)                                                      |
| [backend](app-types/backend/)                     | Planned                               | [add-route](app-types/backend/add-route.md), [add-middleware](app-types/backend/add-middleware.md), [add-plugin](app-types/backend/add-plugin.md), [add-handler](app-types/backend/add-handler.md)                                                                                                                                         |
| [mcp-server](app-types/mcp-server/)               | Planned                               | [add-tool](app-types/mcp-server/add-tool.md), [add-resource](app-types/mcp-server/add-resource.md), [add-prompt](app-types/mcp-server/add-prompt.md)                                                                                                                                                                                       |
| [slide-deck](app-types/slide-deck/)               | Planned                               | [add-slide](app-types/slide-deck/add-slide.md), [add-section](app-types/slide-deck/add-section.md), [add-fragment](app-types/slide-deck/add-fragment.md)                                                                                                                                                                                   |
| [documentation](app-types/documentation/)         | Planned                               | [add-page](app-types/documentation/add-page.md), [add-sidebar](app-types/documentation/add-sidebar.md), [add-component](app-types/documentation/add-component.md)                                                                                                                                                                          |
| [worker](app-types/worker/)                       | Proposed                              | [add-job](app-types/worker/add-job.md), [add-cron](app-types/worker/add-cron.md), [add-queue](app-types/worker/add-queue.md), [add-task](app-types/worker/add-task.md)                                                                                                                                                                     |
| [graphql-api](app-types/graphql-api/)             | Proposed                              | [add-type](app-types/graphql-api/add-type.md), [add-resolver](app-types/graphql-api/add-resolver.md), [add-schema](app-types/graphql-api/add-schema.md), [add-datasource](app-types/graphql-api/add-datasource.md)                                                                                                                         |
| [trpc-api](app-types/trpc-api/)                   | Proposed                              | [add-router](app-types/trpc-api/add-router.md), [add-procedure](app-types/trpc-api/add-procedure.md), [add-middleware](app-types/trpc-api/add-middleware.md)                                                                                                                                                                               |
| [websocket-server](app-types/websocket-server/)   | Proposed                              | [add-channel](app-types/websocket-server/add-channel.md), [add-handler](app-types/websocket-server/add-handler.md), [add-middleware](app-types/websocket-server/add-middleware.md)                                                                                                                                                         |
| [email-service](app-types/email-service/)         | Proposed                              | [add-template](app-types/email-service/add-template.md), [add-handler](app-types/email-service/add-handler.md), [add-transport](app-types/email-service/add-transport.md)                                                                                                                                                                  |
| [mobile](app-types/mobile/)                       | Proposed                              | [add-screen](app-types/mobile/add-screen.md), [add-plugin](app-types/mobile/add-plugin.md), [add-component](app-types/mobile/add-component.md)                                                                                                                                                                                             |
| [desktop](app-types/desktop/)                     | Proposed                              | [add-command](app-types/desktop/add-command.md), [add-window](app-types/desktop/add-window.md), [add-plugin](app-types/desktop/add-plugin.md)                                                                                                                                                                                              |
| [cron](app-types/cron/)                           | Proposed                              | [add-job](app-types/cron/add-job.md), [add-task](app-types/cron/add-task.md)                                                                                                                                                                                                                                                               |

---

## Services

| Service                                          | Status   | Expansion Commands                                                                                                                                                                                                                                                              |
| ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [domain](services/domain/)                       | Planned  | [add-entity](services/domain/add-entity.md), [add-value-object](services/domain/add-value-object.md), [add-event](services/domain/add-event.md), [add-repository-interface](services/domain/add-repository-interface.md), [add-type](services/domain/add-type.md)               |
| [svc-config](services/svc-config/)               | Planned  | [add-env-var](services/svc-config/add-env-var.md), [add-config-section](services/svc-config/add-config-section.md)                                                                                                                                                              |
| [svc-prisma](services/svc-prisma/)               | Planned  | [add-model](services/svc-prisma/add-model.md), [add-migration](services/svc-prisma/add-migration.md), [add-seed](services/svc-prisma/add-seed.md), [add-enum](services/svc-prisma/add-enum.md), [add-relation](services/svc-prisma/add-relation.md)                             |
| [svc-auth](services/svc-auth/)                   | Proposed | [add-provider](services/svc-auth/add-provider.md), [add-strategy](services/svc-auth/add-strategy.md), [add-guard](services/svc-auth/add-guard.md), [add-session-store](services/svc-auth/add-session-store.md), [add-role](services/svc-auth/add-role.md)                       |
| [svc-email](services/svc-email/)                 | Proposed | [add-template](services/svc-email/add-template.md), [add-transport](services/svc-email/add-transport.md), [add-webhook-handler](services/svc-email/add-webhook-handler.md), [add-queue-handler](services/svc-email/add-queue-handler.md)                                        |
| [svc-storage](services/svc-storage/)             | Proposed | [add-bucket](services/svc-storage/add-bucket.md), [add-presigned-handler](services/svc-storage/add-presigned-handler.md), [add-upload-policy](services/svc-storage/add-upload-policy.md), [add-lifecycle-rule](services/svc-storage/add-lifecycle-rule.md)                      |
| [svc-search](services/svc-search/)               | Proposed | [add-index](services/svc-search/add-index.md), [add-mapping](services/svc-search/add-mapping.md), [add-synonym-set](services/svc-search/add-synonym-set.md), [add-search-route](services/svc-search/add-search-route.md)                                                        |
| [svc-cache](services/svc-cache/)                 | Proposed | [add-key-pattern](services/svc-cache/add-key-pattern.md), [add-invalidation-rule](services/svc-cache/add-invalidation-rule.md), [add-session-store](services/svc-cache/add-session-store.md), [add-rate-limiter](services/svc-cache/add-rate-limiter.md)                        |
| [svc-queue](services/svc-queue/)                 | Proposed | [add-job](services/svc-queue/add-job.md), [add-worker](services/svc-queue/add-worker.md), [add-retry-policy](services/svc-queue/add-retry-policy.md), [add-scheduler](services/svc-queue/add-scheduler.md)                                                                      |
| [svc-payments](services/svc-payments/)           | Proposed | [add-product](services/svc-payments/add-product.md), [add-webhook](services/svc-payments/add-webhook.md), [add-checkout-session](services/svc-payments/add-checkout-session.md), [add-subscription-plan](services/svc-payments/add-subscription-plan.md)                        |
| [svc-notifications](services/svc-notifications/) | Proposed | [add-channel](services/svc-notifications/add-channel.md), [add-template](services/svc-notifications/add-template.md), [add-preference-group](services/svc-notifications/add-preference-group.md), [add-delivery-rule](services/svc-notifications/add-delivery-rule.md)          |
| [svc-analytics](services/svc-analytics/)         | Proposed | [add-event-schema](services/svc-analytics/add-event-schema.md), [add-funnel](services/svc-analytics/add-funnel.md), [add-dashboard-widget](services/svc-analytics/add-dashboard-widget.md), [add-export-pipeline](services/svc-analytics/add-export-pipeline.md)                |
| [svc-elysia-api](services/svc-elysia-api/)       | Proposed | [add-route](services/svc-elysia-api/add-route.md), [add-resource](services/svc-elysia-api/add-resource.md), [add-middleware](services/svc-elysia-api/add-middleware.md), [add-guard](services/svc-elysia-api/add-guard.md), [add-plugin](services/svc-elysia-api/add-plugin.md) |
| [svc-workos](services/svc-workos/)               | Proposed | [add-connection](services/svc-workos/add-connection.md), [add-directory-sync](services/svc-workos/add-directory-sync.md), [add-webhook](services/svc-workos/add-webhook.md), [add-sso-provider](services/svc-workos/add-sso-provider.md)                                        |
| [svc-logging](services/svc-logging/)             | Proposed | [add-transport](services/svc-logging/add-transport.md), [add-formatter](services/svc-logging/add-formatter.md), [add-context-enricher](services/svc-logging/add-context-enricher.md), [add-sink](services/svc-logging/add-sink.md)                                              |

---

## UI & Domain (Packages)

| Package                     | Status  | Expansion Commands                                                                                                                                                                                                                                                                                |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ui](ui-domain/ui/)         | Planned | [add-shadcn-component](ui-domain/ui/add-shadcn-component.md), [add-theme-variant](ui-domain/ui/add-theme-variant.md), [init-shadcn](ui-domain/ui/init-shadcn.md), [add-base-color](ui-domain/ui/add-base-color.md)                                                                                |
| [ui-lib](ui-domain/ui-lib/) | Partial | [add-component](ui-domain/ui-lib/add-component.md) ✅, [add-hook](ui-domain/ui-lib/add-hook.md), [add-story](ui-domain/ui-lib/add-story.md), [add-variant](ui-domain/ui-lib/add-variant.md), [add-composable](ui-domain/ui-lib/add-composable.md), [add-wrapper](ui-domain/ui-lib/add-wrapper.md) |

---

## Verticals

| Vertical                                    | Status   | Expansion Commands                                                                                                                                                                                                                                                           |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [saas](verticals/saas/)                     | Proposed | [add-tenant](verticals/saas/add-tenant.md), [add-plan](verticals/saas/add-plan.md), [add-invite-flow](verticals/saas/add-invite-flow.md), [add-usage-meter](verticals/saas/add-usage-meter.md)                                                                               |
| [ecommerce](verticals/ecommerce/)           | Proposed | [add-product-type](verticals/ecommerce/add-product-type.md), [add-shipping-method](verticals/ecommerce/add-shipping-method.md), [add-payment-provider](verticals/ecommerce/add-payment-provider.md), [add-inventory-tracking](verticals/ecommerce/add-inventory-tracking.md) |
| [cms](verticals/cms/)                       | Proposed | [add-content-type](verticals/cms/add-content-type.md), [add-taxonomy](verticals/cms/add-taxonomy.md), [add-media-preset](verticals/cms/add-media-preset.md), [add-webhook](verticals/cms/add-webhook.md)                                                                     |
| [internal-tools](verticals/internal-tools/) | Proposed | [add-report](verticals/internal-tools/add-report.md), [add-workflow](verticals/internal-tools/add-workflow.md), [add-admin-page](verticals/internal-tools/add-admin-page.md), [add-audit-scope](verticals/internal-tools/add-audit-scope.md)                                 |
| [dev-tools](verticals/dev-tools/)           | Proposed | [add-endpoint-group](verticals/dev-tools/add-endpoint-group.md), [add-api-key-scope](verticals/dev-tools/add-api-key-scope.md), [add-docs-section](verticals/dev-tools/add-docs-section.md), [add-playground-example](verticals/dev-tools/add-playground-example.md)         |
| [data-pipeline](verticals/data-pipeline/)   | Proposed | [add-source](verticals/data-pipeline/add-source.md), [add-transform](verticals/data-pipeline/add-transform.md), [add-destination](verticals/data-pipeline/add-destination.md), [add-schedule](verticals/data-pipeline/add-schedule.md)                                       |

---

## Implementation

| File                                                             | Purpose                        |
| ---------------------------------------------------------------- | ------------------------------ |
| [implementation/README.md](implementation/README.md)             | Overview                       |
| [implementation/phases.md](implementation/phases.md)             | Phase 0–6 breakdown            |
| [implementation/priority.md](implementation/priority.md)         | P0/P1/P2, effort, dependencies |
| [implementation/first-sprint.md](implementation/first-sprint.md) | Suggested 2-week sprint        |

---

## Legacy Documents

The following consolidated documents have been split into granular files. Originals are in [\_legacy/](_legacy/).

- `00-VISION-OVERVIEW.md` → [vision/](vision/)
- `01-ARCHITECTURAL-PATTERNS.md` → [architecture/](architecture/)
- `02-APP-TYPES-ROADMAP.md` → [app-types/](app-types/)
- `03-SERVICE-PACKAGES-ROADMAP.md` → [services/](services/)
- `04-UI-AND-DOMAIN-EXPANSION.md` → [ui-domain/](ui-domain/), [services/domain/](services/domain/)
- `05-VERTICAL-TEMPLATES.md` → [verticals/](verticals/)
- `06-EXPANSION-COMMANDS-REFERENCE.md` → This INDEX + individual spec files
- `07-IMPLEMENTATION-PRIORITY.md` → [implementation/](implementation/)
- `docs/expansion-patterns.md` → [architecture/](architecture/)
