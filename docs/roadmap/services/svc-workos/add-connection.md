# svc-workos: add-connection

## Command

```
scaffold svc-workos add-connection <name>
```

## Description

Add an SSO connection config.

## Injection Target

- **Artifact:** `src/connections/<name>.ts`
- **Registry:** `src/connections/index.ts` (optional)

## Status

Proposed

## Underlying Technology

WorkOS AuthKit connection. Provider (Google, Okta, etc.), redirect URI, client ID. Connection created in WorkOS dashboard or API.

## Best Practices & Engineering Patterns

Store connection_id in config. Use for OAuth flow. Sync connection list from WorkOS. Document provider-specific setup.

## Effect Library Usage

`Effect.tryPromise` for WorkOS API. Inject `WorkOSService` via Context. Typed errors for connection failures.

## Implementation Considerations

Stub: `{{connectionName}}`, `{{provider}}`. Registry: `src/connections/index.ts`. Env: `WORKOS_CLIENT_ID`, `WORKOS_API_KEY`.

## Alternative Technology Considerations

Auth0: connections. Clerk: providers. WorkOS: enterprise IdP focus. Same OAuth connection model.
