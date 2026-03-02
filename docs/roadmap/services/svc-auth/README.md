# svc-auth Package

**Description:** Authentication (WorkOS, Clerk, JWT).

**Status:** Proposed

## Expansion Commands

| Command                                   | Description                   | Spec                       |
| ----------------------------------------- | ----------------------------- | -------------------------- |
| [add-provider](add-provider.md)           | Add an auth provider          | `src/providers/<name>.ts`  |
| [add-strategy](add-strategy.md)           | Add an auth strategy          | `src/strategies/<name>.ts` |
| [add-guard](add-guard.md)                 | Add a guard (e.g. role check) | `src/guards/<name>.ts`     |
| [add-session-store](add-session-store.md) | Add a session store impl      | `src/session/<name>.ts`    |
| [add-role](add-role.md)                   | Add a role definition         | `src/roles/<name>.ts`      |

## Underlying Technology

WorkOS (SSO, Directory Sync), Clerk (user management), JWT via jose library. Session storage: Redis, DB, or memory. Strategy pattern for pluggable auth (OAuth, API key, session).

## Best Practices & Engineering Patterns

Strategy pattern: each auth method is a strategy. Guards for authorization (role, permission). Session store abstraction for scalability. Validate JWT on each request; refresh tokens for long-lived sessions.

## Effect Library Usage

Auth operations return `Effect<Session, AuthError>`. Provide strategies and guards via Context/Layer. Use `Effect.tryPromise` for async verify/sign. Use `Effect.fail` for invalid token, expired, unauthorized.

## Implementation Considerations

Stub variables: `{{ProviderName}}`, `{{StrategyName}}`, `{{GuardName}}`. Barrel exports from `src/providers`, `src/strategies`, etc. Env vars for secrets (WorkOS API key, JWT secret).

## Alternative Technology Considerations

Auth.js (NextAuth): framework-integrated, many providers. WorkOS: enterprise SSO, Directory Sync. Clerk: hosted auth, good DX. Custom JWT: minimal, jose for sign/verify. Choose by SSO vs. simplicity needs.
