# SaaS Starter Vertical

**Target:** Auth + Billing + Dashboard applications.

**Status:** Planned

## App Types

- `frontend-nextjs` (or `frontend-vite`) — Dashboard UI
- `backend` — API

## Service Packages

- `svc-auth` (WorkOS, Clerk, Auth.js)
- `svc-payments` (Stripe)
- `svc-config`
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

## Expansion Commands

| Command                               | Description                                                         | Spec                     |
| ------------------------------------- | ------------------------------------------------------------------- | ------------------------ |
| [add-tenant](add-tenant.md)           | Multi-tenant org + RBAC (org model, membership, roles)              | domain, svc-auth, prisma |
| [add-plan](add-plan.md)               | Subscription tier (plan model, Stripe product/price, feature flags) | svc-payments, prisma     |
| [add-invite-flow](add-invite-flow.md) | Invite users to org (invite model, email, accept flow)              | svc-email, prisma        |
| [add-usage-meter](add-usage-meter.md) | Usage-based billing (meter model, events, aggregation)              | svc-payments, prisma     |

## Technology & Patterns

- **Stripe** (billing), **WorkOS** (auth, SSO), **Prisma** (org, membership, plans). Multi-package co-generation.
- **Effect** for cross-package flows (auth → billing → invite). Alternatives: Supabase Auth, Firebase.
