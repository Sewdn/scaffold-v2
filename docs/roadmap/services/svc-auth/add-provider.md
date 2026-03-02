# svc-auth: add-provider

## Command

```
scaffold svc-auth add-provider <name>
```

## Description

Add an auth provider (OAuth, SAML, etc.).

## Injection Target

- **Artifact:** `src/providers/<name>.ts`
- **Registry:** `src/providers/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Auth provider: OAuth (Google, GitHub), SAML (WorkOS), or custom. WorkOS/Clerk handle OAuth flows; custom providers use passport-style or manual redirect/callback.

## Best Practices & Engineering Patterns

One provider per identity source. Standardize callback URL and token exchange. Map provider profile to domain user. Store provider id for account linking.

## Effect Library Usage

Provider `authenticate` returns `Effect<User, AuthError>`. Use `Effect.tryPromise` for OAuth token exchange. Provide via Layer; compose with strategy in auth pipeline.

## Implementation Considerations

Stub variables: `{{ProviderName}}`, `{{clientId}}`, `{{callbackPath}}`. File: `src/providers/<name>.ts`. Env vars for client ID/secret. Register in providers index.

## Alternative Technology Considerations

WorkOS: enterprise SSO, Admin Portal. Clerk: hosted, many providers. Auth.js: Next.js integration. Custom: minimal control, more implementation work.
