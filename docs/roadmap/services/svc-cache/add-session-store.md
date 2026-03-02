# svc-cache: add-session-store

## Command

```
scaffold svc-cache add-session-store <name>
```

## Description

Add a Redis session store.

## Injection Target

- **Artifact:** `src/session/<name>.ts`
- **Registry:** `src/session/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Redis key-value for session data. Key: `session:{sid}`. TTL = session max lifetime. Serialize session object as JSON.

## Best Practices & Engineering Patterns

Set TTL on write; refresh on access. Use secure session IDs. Store minimal data; avoid storing secrets.

## Effect Library Usage

`Effect.tryPromise` for get/set/del. Inject `CacheService` via Context. Typed errors for session store failures.

## Implementation Considerations

Stub: `{{storeName}}`, `{{ttl}}`. Registry: `src/session/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Upstash: serverless Redis. Memcached: no TTL per-key (use expiry). Database: persistent, slower.
