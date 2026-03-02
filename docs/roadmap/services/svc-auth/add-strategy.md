# svc-auth: add-strategy

## Command

```
scaffold svc-auth add-strategy <name>
```

## Description

Add an auth strategy (JWT, session, API key, etc.).

## Injection Target

- **Artifact:** `src/strategies/<name>.ts`
- **Registry:** `src/strategies/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Auth strategy: JWT (jose for sign/verify), session (cookie + store), API key. Strategy validates credentials and returns session/user. Pluggable per route or globally.

## Best Practices & Engineering Patterns

One strategy per auth mechanism. JWT: short-lived access, optional refresh. Session: server-side store, httpOnly cookie. API key: for machine-to-machine, scope-limited.

## Effect Library Usage

Strategy `verify` returns `Effect<Session, InvalidToken | Expired>`. Use `Effect.tryPromise` for async verify. Provide strategies via Layer. Compose with guards for full authz.

## Implementation Considerations

Stub variables: `{{StrategyName}}`, `{{tokenSource}}` (header/cookie). File: `src/strategies/<name>.ts`. JWT secret from env. Strategy registry for multi-strategy apps.

## Alternative Technology Considerations

Passport.js: strategy ecosystem. Custom JWT: jose, minimal deps. Clerk: managed sessions. Auth.js: built-in strategies. Effect Layer replaces middleware composition.
