# svc-cache: add-key-pattern

## Command

```
scaffold svc-cache add-key-pattern <name>
```

## Description

Add a key pattern with TTL config.

## Injection Target

- **Artifact:** `src/patterns/<name>.ts`
- **Registry:** `src/patterns/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Redis key pattern (e.g. `user:{id}:profile`). TTL in seconds. Serialization: JSON or msgpack.

## Best Practices & Engineering Patterns

Namespace keys by service/entity. Consistent TTL per pattern. Document key structure. Use SCAN for pattern iteration.

## Effect Library Usage

`Effect.tryPromise` for get/set. Inject `CacheService` via Context. Typed errors for serialization/connection failures.

## Implementation Considerations

Stub: `{{patternName}}`, `{{keyTemplate}}`, `{{ttl}}`. Registry: `src/patterns/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Upstash: same key model, REST. Memcached: no pattern, simpler. Redis: SCAN, Lua for complex ops.
