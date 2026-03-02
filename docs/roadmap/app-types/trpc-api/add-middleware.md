# tRPC API: add-middleware

## Command

```
scaffold trpc-api add-middleware <name>
```

## Description

Add tRPC middleware.

## Injection Target

- **Artifact:** `src/middleware/<name>.ts`
- **Registry:** Middleware chain

## Status

Proposed

---

## Underlying Technology

**tRPC** middleware. Middleware runs before or after procedures; used for auth, logging, rate limiting. Chain via `procedure.use()`.

## Best Practices & Engineering Patterns

- **Procedure patterns:** Create `protectedProcedure` from `publicProcedure.use(authMiddleware)`; chain multiple middleware.
- **Context enrichment:** Add `context.user`, `context.requestId` in middleware; procedures consume.
- **Short-circuit:** Return early or throw on auth failure; avoid unnecessary work.

## Effect Library Usage

- **Handler:** Use `Effect.runPromise` inside middleware; or `Effect.gen` for async logic.
- **Context:** Inject services via Effect `Context`; middleware receives context from tRPC.
- **Errors:** `Effect.fail` with `TRPCError`; map to `UNAUTHORIZED`, `FORBIDDEN`, etc.

## Implementation Considerations

- **Registry:** Middleware chain in `src/trpc.ts`; export `authMiddleware`, `loggerMiddleware`.
- **Stubs:** `{{name}}`, `{{Name}}`; export `xxxMiddleware` or `createXxxMiddleware`.
- **Naming:** `auth`, `logger`, `rateLimit`; file `middleware/auth.ts`.

## Alternative Technology Considerations

- **Elysia middleware:** Use Elysia middleware for HTTP; tRPC middleware for procedure-level.
- **Hono middleware:** Similar pattern; tRPC integrates with Elysia/Hono.
