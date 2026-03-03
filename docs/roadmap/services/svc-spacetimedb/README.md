# svc-spacetimedb Package

**Description:** Real-time backend and database using [SpacetimeDB](https://spacetimedb.com). Server logic embedded in the database; real-time sync to clients. Ideal for multiplayer, games, collaborative apps.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-table](add-table.md) | Add a table definition | `spacetimedb/src/index.ts` |
| [add-reducer](add-reducer.md) | Add a reducer (server-side handler) | `spacetimedb/src/index.ts` |
| [add-module](add-module.md) | Add a SpacetimeDB module | `spacetimedb/src/<name>.ts` |
| [add-subscription](add-subscription.md) | Add a client subscription | `client/src/subscriptions/<name>.ts` |

## Underlying Technology

**SpacetimeDB** — Database with embedded server logic. SQL-style schema; tables and reducers in TypeScript. Reducers run in DB; clients call directly or subscribe. Auto-generated TypeScript bindings. High throughput; ACID guarantees.

**Setup:**
```bash
curl -sSf https://install.spacetimedb.com | sh
spacetime dev --template basic-ts
# Or: spacetime init --lang typescript my-project
```

**Project structure:**
```
spacetimedb/src/     # Server-side code (tables, reducers)
client/              # Client app + module_bindings/
```

**Prerequisites:** SpacetimeDB CLI, Node.js 18+.

## Best Practices & Engineering Patterns

- **Reducers:** Handle events from client; update tables; emit to subscribers.
- **Tables:** Define in `spacetimedb/src/index.ts`; use `SpacetimeDB` types.
- **Subscriptions:** Client subscribes to table changes; reactive updates.
- **Permissions:** Use `#[spacetime_db::permissions]` for access control.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{tableName}}`.
- **Package:** `svc-spacetimedb`; consumed by backend or frontend apps needing real-time sync.
- **Integration:** Frontend apps use `@spacetimedb/client`; backend apps may use server SDK.

## References

- [SpacetimeDB Docs](https://spacetimedb.com/docs)
- [TypeScript Quickstart](https://spacetimedb.com/docs/quickstarts/typescript)
- [spacetime dev](https://spacetimedb.com/docs/databases/developing/)
