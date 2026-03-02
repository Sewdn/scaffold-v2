# tRPC API: add-router

## Command

```
scaffold trpc-api add-router <name>
```

## Description

Add a tRPC router.

## Injection Target

- **Artifact:** `src/routers/<name>.ts`
- **Registry:** App router composition

## Status

Proposed

---

## Underlying Technology

**tRPC** router. Routers compose procedures and sub-routers; merged via `router()`; exposed via HTTP adapter (Elysia, Hono).

## Best Practices & Engineering Patterns

- **Router composition:** One router per domain; merge in app router; nest by domain (e.g. `user`, `post`).
- **Procedure patterns:** Use procedures from `add-procedure`; keep router thin (composition only).
- **Context:** Build context once; pass to app router; procedures receive via `ctx`.

## Effect Library Usage

- **Context:** Build tRPC context with Effect `Context`; inject services for procedures.
- **Procedures:** Procedures use `Effect.runPromise`; router composes them.
- **Errors:** `TRPCError` in procedures; map to HTTP in Elysia adapter.

## Implementation Considerations

- **Registry:** App router in `src/trpc.ts`; merge sub-routers from `src/routers/`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{routerName}}`; export `xxxRouter`.
- **Naming:** `userRouter`, `postRouter`; file `routers/user.ts`.

## Alternative Technology Considerations

- **GraphQL schema:** tRPC has no schema; routers are the API surface.
- **Hono vs Elysia:** Both adapt tRPC; Elysia preferred for Bun/scaffold-v2.
