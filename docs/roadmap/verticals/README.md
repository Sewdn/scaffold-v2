# Vertical Templates

Pre-configured combinations of app types and service packages for specific industries. Use `scaffold project --vertical <name>` to create a tailored starting point.

| Vertical                          | Status  | Expansion Commands                                                                  |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| [saas](saas/)                     | Planned | add-tenant, add-plan, add-invite-flow, add-usage-meter                              |
| [ecommerce](ecommerce/)           | Planned | add-product-type, add-shipping-method, add-payment-provider, add-inventory-tracking |
| [cms](cms/)                       | Planned | add-content-type, add-taxonomy, add-media-preset, add-webhook                       |
| [internal-tools](internal-tools/) | Planned | add-report, add-workflow, add-admin-page, add-audit-scope                           |
| [dev-tools](dev-tools/)           | Planned | add-endpoint-group, add-api-key-scope, add-docs-section, add-playground-example     |
| [data-pipeline](data-pipeline/)   | Planned | add-source, add-transform, add-destination, add-schedule                            |

## Technology & Patterns

- **Vertical-specific tech:** Stripe, WorkOS, Prisma per vertical (e.g. SaaS); svc-payments, svc-auth, svc-prisma.
- **Multi-package co-generation:** Vertical commands trigger domain + svc-prisma + svc-auth etc. in one flow.
- **Effect** for cross-package flows (e.g. auth → payments → notifications); typed error propagation.
- **Alternatives:** Supabase (auth + DB), Firebase — different stacks; verticals assume Prisma + WorkOS/Stripe.
