# API Fastify App Type

**Description:** REST API using [Fastify](https://fastify.dev). Fast, low-overhead web framework for Node.js. Schema-based validation, plugin architecture, Pino logging.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| add-route | Add a route | `src/routes/<name>.ts` |
| add-plugin | Add a Fastify plugin | `src/plugins/<name>.ts` |
| add-handler | Add a handler | `src/handlers/<name>.ts` |

## Underlying Technology

**Fastify** — Web framework for Node.js. JSON Schema for validation; hooks, plugins, decorators. Pino logger. TypeScript ready. One of the fastest frameworks.

**Setup:**
```bash
npm install -g fastify-cli
fastify generate myproject --lang=ts
# Or manual: npm install fastify
```

**Prerequisites:** Node.js 18+.

## Best Practices & Engineering Patterns

- **Instance:** `Fastify({ logger: true })`; use `fastify.get()`, `fastify.post()`, etc.
- **Schema:** Optional JSON Schema for request/response validation.
- **Plugins:** Use `fastify.register()` for modular routes and middleware.
- **Hooks:** `preHandler`, `onRequest`, etc. for cross-cutting logic.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{path}}`.
- **Directory prefix:** `api-fastify` → `apps/api-fastify-<name>`.
- **Package:** `@workspace/app-api-fastify`.

## References

- [Fastify Docs](https://fastify.dev/docs)
- [Fastify CLI](https://github.com/fastify/fastify-cli)
- [Quick Start](https://fastify.dev/docs/latest/Guides/Getting-Started/)
