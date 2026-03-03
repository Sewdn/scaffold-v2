# svc-powersync Package

**Description:** Sync engine for backend database to in-app SQLite using [PowerSync](https://www.powersync.com). Bi-directional sync, real-time reactivity, offline-first apps.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-schema](add-schema.md) | Add client-side schema definition | `src/schema/<name>.ts` |
| [add-sync-rule](add-sync-rule.md) | Add sync rules for backend | PowerSync config |
| [add-bucket](add-bucket.md) | Add a data bucket for partitioning | Config |
| [add-connector](add-connector.md) | Add backend connector (Postgres, MySQL, etc.) | `src/connectors/<name>.ts` |

## Underlying Technology

**PowerSync** — Sync engine: backend DB (Postgres, MongoDB, MySQL, SQL Server) ↔ in-app SQLite. PowerSync Service replicates; client SDK manages local DB, reactivity, and upload queue. JWT auth. Partial sync via rules.

**Setup:**
```bash
npm install @powersync/web @journeyapps/wa-sqlite
# React: npm install @powersync/react
```

**Components:**
1. **Source database** — Postgres, MongoDB, MySQL, or SQL Server
2. **PowerSync Service** — Replicates change stream; partitions data
3. **PowerSync SDK** — Client-side: SQLite, reactivity, upload queue

**Prerequisites:** Backend database; PowerSync Cloud or self-hosted service.

## Best Practices & Engineering Patterns

- **Sync rules:** Define which data syncs per user (e.g. `user_id = auth.uid()`).
- **Local-first:** App reads/writes to SQLite; sync happens in background.
- **Reactivity:** Use `useQuery` from `@powersync/react` for live updates.
- **Conflict resolution:** Backend controls write application; PowerSync handles transfer.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{bucketName}}`; `{{tableName}}`.
- **Package:** `svc-powersync`; consumed by frontend apps needing offline-first sync.
- **Backend:** Requires connector setup (PowerSync → Postgres/MySQL/etc.).

## References

- [PowerSync Docs](https://docs.powersync.com)
- [Quickstart](https://docs.powersync.com/installation/quickstart-guide)
- [Client-Side Setup](https://docs.powersync.com/installation/client-side-setup)
- [Source Database Setup](https://docs.powersync.com/installation/database-setup)
