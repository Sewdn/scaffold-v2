# svc-elysia-api Package

**Description:** Elysia HTTP API (CRUD) — aligns with Epic 7 API Service.

**Status:** Proposed (high priority)

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-route](add-route.md) | Add a route | `src/routes/<name>.ts` |
| [add-resource](add-resource.md) | Add CRUD routes + service + types for entity | `src/resources/<name>/` |
| [add-middleware](add-middleware.md) | Add middleware | `src/middleware/<name>.ts` |
| [add-guard](add-guard.md) | Add a guard | `src/guards/<name>.ts` |
| [add-plugin](add-plugin.md) | Add an Elysia plugin | `src/plugins/<name>.ts` |

## Underlying Technology

Elysia.js HTTP framework. Type-safe routes, guards, middleware. Swagger via @elysiajs/swagger. Eden for type-safe client.

## Best Practices & Engineering Patterns

Validate input with Zod; use Elysia's schema. Guards for auth; middleware for cross-cutting. Resource pattern: route + service + types.

## Effect Library Usage

`Effect.tryPromise` for route handlers. Elysia plugin can wrap Effect. Typed errors via Elysia error handling. Compose with service Layers.

## Implementation Considerations

Stub: `{{routeName}}`, `{{resourceName}}`. Registry: routes, plugins. Env: service-specific (DB, Redis, etc.).

## Alternative Technology Considerations

Hono: similar, lighter. Fastify: Node ecosystem. Elysia: Bun-first, type-safe. Same patterns: route, guard, middleware.
