# svc-cache: add-invalidation-rule

## Command

```
scaffold svc-cache add-invalidation-rule <name>
```

## Description

Add a cache invalidation rule.

## Injection Target

- **Artifact:** `src/invalidation/<name>.ts`
- **Registry:** `src/invalidation/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Redis DEL/SCAN for key invalidation. Pattern matching (e.g. `user:*`). Event-based or explicit trigger on write.

## Best Practices & Engineering Patterns

Invalidate on entity update/delete. Use SCAN with pattern; avoid KEYS in prod. Consider pub/sub for multi-instance.

## Effect Library Usage

`Effect.tryPromise` for DEL/SCAN. Inject `CacheService` via Context. Typed errors for invalidation failures.

## Implementation Considerations

Stub: `{{ruleName}}`, `{{pattern}}`, `{{trigger}}`. Registry: `src/invalidation/index.ts`. Env: `REDIS_URL`.

## Alternative Technology Considerations

Upstash: same pattern. Cache tags (Redis) for logical invalidation. Write-through: invalidate on DB write.
