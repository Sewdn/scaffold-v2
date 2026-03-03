# API Hono App Type

**Description:** REST API using [Hono](https://hono.dev). Ultrafast, lightweight, built on Web Standards. Multi-runtime (Cloudflare, Deno, Bun, Node.js).

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| add-route | Add a route | `src/routes/<name>.ts` |
| add-middleware | Add middleware | `src/middleware/<name>.ts` |
| add-handler | Add a handler | `src/handlers/<name>.ts` |

## Underlying Technology

**Hono** — Web framework built on Web Standards. RegExpRouter for speed; hono/tiny preset under 14kB. Works on Cloudflare Workers, Fastly, Deno, Bun, AWS Lambda, Node.js. First-class TypeScript.

**Setup:**
```bash
npm create hono@latest my-app -- --template nodejs --pm npm --install
# Or: npm create hono@latest my-app (interactive)
# Templates: nodejs, cloudflare-workers, vercel, bun, deno
```

**Prerequisites:** Node.js 18+, or Bun/Deno.

## Best Practices & Engineering Patterns

- **App instance:** `new Hono()`; chain `.get()`, `.post()`, etc.
- **Context:** Handler receives `(c) => c.text()`, `c.json()`, `c.json()`.
- **Middleware:** Use `app.use()` or route-specific middleware.
- **Multi-runtime:** Export `app`; use `Bun.serve({ fetch: app.fetch })` or `@hono/node-server` for Node.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{path}}`.
- **Directory prefix:** `api-hono` → `apps/api-hono-<name>`.
- **Package:** `@workspace/app-api-hono`.

## References

- [Hono Docs](https://hono.dev/docs)
- [Create Hono](https://hono.dev/docs/guides/create-hono)
- [Getting Started](https://hono.dev/docs/getting-started/basic)
