# svc-cache Package

**Description:** Caching layer (Redis, Upstash).

**Status:** Proposed

## Expansion Commands

| Command                                           | Description                    | Spec                         |
| ------------------------------------------------- | ------------------------------ | ---------------------------- |
| [add-key-pattern](add-key-pattern.md)             | Add a key pattern + TTL config | `src/patterns/<name>.ts`     |
| [add-invalidation-rule](add-invalidation-rule.md) | Add cache invalidation rule    | `src/invalidation/<name>.ts` |
| [add-session-store](add-session-store.md)         | Add Redis session store        | `src/session/<name>.ts`      |
| [add-rate-limiter](add-rate-limiter.md)           | Add a rate limiter config      | `src/limiters/<name>.ts`     |

## Underlying Technology

Redis (primary), Upstash Redis. Key-value with TTL. Patterns: `key:*` for namespacing; Lua scripts for atomic ops.

## Best Practices & Engineering Patterns

Consistent key naming (e.g. `svc:entity:id`). Set TTL to avoid leaks. Use cache-aside; invalidate on writes. Rate limit: sliding window or token bucket.

## Effect Library Usage

`Effect.tryPromise` for Redis calls. `CacheService` via Context/Layer. Typed errors: `CacheError`, `ConnectionError`. Compose with config Layer.

## Implementation Considerations

Stub: `{{patternName}}`, `{{ttl}}`. Registry: `src/patterns/index.ts`. Env: `REDIS_URL`, `UPSTASH_REDIS_REST_URL`.

## Alternative Technology Considerations

Upstash: serverless Redis, REST API. Memcached: simpler, no persistence. Redis: full-featured, Lua scripts.
