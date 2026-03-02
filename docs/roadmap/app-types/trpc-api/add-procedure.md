# tRPC API: add-procedure

## Command

```
scaffold trpc-api add-procedure <name>
```

## Description

Add a procedure (query or mutation).

## Injection Target

- **Artifact:** `src/procedures/<name>.ts`
- **Registry:** Router procedure registration

## Status

Proposed

---

## Underlying Technology

**tRPC** procedures. Procedures are query/mutation handlers; `.query()` for reads, `.mutation()` for writes. Input via `.input(zodSchema)`.

## Best Practices & Engineering Patterns

- **Procedure patterns:** `query` for idempotent reads; `mutation` for side effects; use `publicProcedure` or `protectedProcedure`.
- **Input validation:** Zod in `.input()`; validate at boundary; typed output inferred.
- **Error handling:** Throw `TRPCError` with code; map to HTTP status in adapter.

## Effect Library Usage

- **Procedures:** Wrap logic in `Effect.gen`; `Effect.runPromise` at procedure boundary.
- **Async handlers:** Use `Effect` for all async work; typed errors via `Effect.fail` with `TRPCError`.
- **Context:** Inject services via tRPC context; build context with Effect `Context` if Effect-first.

## Implementation Considerations

- **Registry:** Procedures registered in `src/procedures/<name>.ts`; merge into router.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{procedureName}}`; export `xxxProcedure` or `getUserById`.
- **Naming:** `getUserById`, `createUser`; file `procedures/user.ts`.

## Alternative Technology Considerations

- **GraphQL resolvers:** Similar concept; tRPC procedures are simpler and type-safe without schema.
- **REST handlers:** tRPC procedures map to HTTP endpoints; adapter handles transport.
