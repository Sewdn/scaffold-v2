# svc-cache: add-rate-limiter

## Command

```
scaffold svc-cache add-rate-limiter <name>
```

## Description

Add a rate limiter config.

## Injection Target

- **Artifact:** `src/limiters/<name>.ts`
- **Registry:** `src/limiters/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Redis INCR + EXPIRE for sliding window; or Lua script for token bucket. Key: `ratelimit:{identifier}:{window}`.

## Best Practices & Engineering Patterns

Sliding window or fixed window. Per-user, per-IP, or per-route. Return Retry-After header. Use consistent key names.

## Effect Library Usage

`Effect.tryPromise` for Redis ops. Inject `CacheService` via Context. Typed errors for rate limit check failures.

## Implementation Considerations

Stub: `{{limiterName}}`, `{{limit}}`, `{{windowSeconds}}`. Registry: `src/limiters/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Upstash: same Redis ops. Upstash Ratelimit: managed solution. Redis: full control with Lua.
