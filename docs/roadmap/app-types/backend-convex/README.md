# Backend Convex App Type

**Description:** Real-time backend platform using [Convex](https://www.convex.dev). Database, queries, mutations, actions, and real-time sync in pure TypeScript.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-query](add-query.md) | Add a Convex query | `convex/<name>.ts` |
| [add-mutation](add-mutation.md) | Add a Convex mutation | `convex/<name>.ts` |
| [add-action](add-action.md) | Add a Convex action | `convex/<name>.ts` |
| [add-schema](add-schema.md) | Add/update schema definition | `convex/schema.ts` |
| [add-cron](add-cron.md) | Add a cron job | `convex/crons.ts` |

## Underlying Technology

**Convex** — Backend platform with document DB, real-time subscriptions, serverless functions. Schema in TypeScript; queries/mutations/actions in `convex/`. React hooks (`useQuery`, `useMutation`) for client. Cron jobs, auth, file storage built-in.

**Setup:**
```bash
npm create convex@latest
# Or with template: npm create convex@latest my-app -- -t nextjs-lucia-shadcn
```

**Templates:** `bare`, `nextjs-shadcn`, `nextjs-clerk`, `nextjs-convexauth-shadcn`, `nextjs-lucia-shadcn`, `react-vite-clerk-shadcn`, `react-vite-shadcn`.

**Prerequisites:** Convex account; `npx convex dev` for local dev.

## Best Practices & Engineering Patterns

- **Schema-first:** Define tables in `convex/schema.ts`; use `v.id("tableName")` for refs.
- **Reactive:** Queries auto-update when data changes; no cache invalidation.
- **Actions:** For non-deterministic work (API calls, AI); mutations for DB writes.
- **Type-safe:** Generated `api` and `_generated` for end-to-end types.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{tableName}}`.
- **Directory prefix:** `backend-convex` → `apps/backend-convex-<name>`.
- **Integration:** Often paired with Next.js or Vite frontend in same project.

## References

- [Convex Docs](https://docs.convex.dev)
- [Get Started](https://docs.convex.dev/get-started)
- [CLI](https://docs.convex.dev/cli)
- [npm create convex](https://stack.convex.dev/npm-create-convex)
