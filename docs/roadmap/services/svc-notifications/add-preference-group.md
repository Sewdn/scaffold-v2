# svc-notifications: add-preference-group

## Command

```
scaffold svc-notifications add-preference-group <name>
```

## Description

Add a user preference group for notification settings.

## Injection Target

- **Artifact:** `src/preferences/<name>.ts`
- **Registry:** `src/preferences/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Preference storage: DB (Prisma) or Redis. Schema: group (e.g. "marketing"), channels (email, push), opt-in/opt-out.

## Best Practices & Engineering Patterns

Respect opt-out; check before send. Default: opt-in for critical, opt-out for marketing. Group by purpose.

## Effect Library Usage

`Effect.tryPromise` for DB/Redis. Inject `PreferencesService` via Context. Typed errors for preference lookup failures.

## Implementation Considerations

Stub: `{{groupName}}`, `{{channels}}`. Registry: `src/preferences/index.ts`. Env: `REDIS_URL` or DB.

## Alternative Technology Considerations

DB: persistent, queryable. Redis: fast, cache. Same preference model; storage is swappable.
