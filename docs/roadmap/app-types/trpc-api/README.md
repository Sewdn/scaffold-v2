# tRPC API App Type

**Description:** tRPC API (end-to-end typesafe).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-router](add-router.md) | Add a tRPC router | `src/routers/<name>.ts` |
| [add-procedure](add-procedure.md) | Add a procedure (query/mutation) | `src/procedures/<name>.ts` |
| [add-middleware](add-middleware.md) | Add tRPC middleware | `src/middleware/<name>.ts` |

## Underlying Technology

**tRPC** (TypeScript RPC). End-to-end type-safe procedures; no codegen; runs over HTTP/WebSocket. Integrates with React Query, Next.js, Elysia.

## Best Practices & Engineering Patterns

- **Procedure patterns:** `query` for reads, `mutation` for writes; use `publicProcedure`, `protectedProcedure` for auth.
- **Router composition:** Merge routers via `router()`; nest by domain (e.g. `userRouter`, `postRouter`).
- **Input validation:** Use Zod in `.input()`; validate at procedure boundary.

## Effect Library Usage

- **Procedures:** Wrap procedure logic in `Effect.gen`; `Effect.runPromise` at procedure boundary; typed errors.
- **Context:** Inject services via tRPC `context`; build context with Effect `Context` if Effect-first.
- **Middleware:** Use Effect for auth, logging; chain via `procedure.use()`.

## Implementation Considerations

- **Registry:** App router in `src/trpc.ts` or `src/router.ts`; merge sub-routers.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{procedureName}}`; export `xxxRouter` or `xxxProcedure`.
- **Naming:** `userRouter`, `getUserById`; file `routers/user.ts`.

## Alternative Technology Considerations

- **GraphQL:** More flexible querying; tRPC preferred for REST-like, type-safe RPC.
- **OpenAPI/REST:** tRPC avoids codegen; better DX for TypeScript-first apps.
