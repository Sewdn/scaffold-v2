# svc-auth: add-session-store

## Command

```
scaffold svc-auth add-session-store <name>
```

## Description

Add a session store implementation (Redis, DB, memory).

## Injection Target

- **Artifact:** `src/session/<name>.ts`
- **Registry:** `src/session/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Session store: Redis (scalable), DB (Prisma), or memory (dev). Key-value: sessionId → session data. TTL for expiry. Used by session strategy for server-side sessions.

## Best Practices & Engineering Patterns

Abstract interface: `get`, `set`, `delete`. Redis for production scale. DB for simplicity or audit. Memory for local dev. Always set TTL to avoid leakage.

## Effect Library Usage

Store methods return `Effect<Session | null, StoreError>`. Use `Effect.tryPromise` for Redis/DB calls. Provide store via Layer. Use in strategy for session lookup.

## Implementation Considerations

Stub variables: `{{StoreName}}`, `{{ttl}}`, `{{connectionUrl}}`. File: `src/session/<name>.ts`. Env for Redis URL or DB. Consider connection pooling for DB store.

## Alternative Technology Considerations

Redis: ioredis, upstash. DB: Prisma session table. Memory: Map, dev only. Encrypted cookie: stateless, no store. Choose by scale and operational preference.
