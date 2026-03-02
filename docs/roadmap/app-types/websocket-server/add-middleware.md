# WebSocket Server: add-middleware

## Command

```
scaffold websocket-server add-middleware <name>
```

## Description

Add connection middleware.

## Injection Target

- **Artifact:** `src/middleware/<name>.ts`
- **Registry:** Middleware chain

## Status

Proposed

---

## Underlying Technology

**Elysia WS** or **ws** connection middleware. Runs on `connection`, `upgrade`; used for auth, rate limiting, connection metadata.

## Best Practices & Engineering Patterns

- **Connection lifecycle:** Validate token/session on connect; reject before handler runs.
- **Context enrichment:** Add `connection.user`, `connection.requestId`; handlers consume.
- **Short-circuit:** Close connection on auth failure; avoid unnecessary work.

## Effect Library Usage

- **Handler:** Use `Effect.runPromise` inside middleware; or `Effect.gen` for async logic.
- **Context:** Inject services via Effect `Context`; middleware receives from WS layer.
- **Errors:** `Effect.fail` with close code; map to `4001` (auth) or custom codes.

## Implementation Considerations

- **Registry:** Middleware chain in `src/index.ts` or WS setup; export `authMiddleware`, `loggerMiddleware`.
- **Stubs:** `{{name}}`, `{{Name}}`; export `xxxMiddleware` or `createXxxMiddleware`.
- **Naming:** `auth`, `logger`, `rateLimit`; file `middleware/auth.ts`.

## Alternative Technology Considerations

- **Hono WS middleware:** Similar pattern; Elysia WS preferred for Bun.
- **Inline in handler:** Fine for trivial cases; separate middleware for reuse.
