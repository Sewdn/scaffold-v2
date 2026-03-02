# svc-workos Package

**Description:** WorkOS SSO/SCIM.

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-connection](add-connection.md) | Add an SSO connection | `src/connections/<name>.ts` |
| [add-directory-sync](add-directory-sync.md) | Add directory sync config | `src/directory/<name>.ts` |
| [add-webhook](add-webhook.md) | Add a webhook handler | `src/webhooks/<name>.ts` |
| [add-sso-provider](add-sso-provider.md) | Add an SSO provider | `src/providers/<name>.ts` |

## Underlying Technology

WorkOS SDK: AuthKit (SSO), Directory Sync, Admin Portal. OAuth/OIDC flows. Webhooks for sync events. SCIM for user provisioning.

## Best Practices & Engineering Patterns

Verify webhook signatures. Store WorkOS user/org IDs in DB. Use Admin Portal for connection config. Handle connection created/updated events.

## Effect Library Usage

`Effect.tryPromise` for WorkOS API. `WorkOSService` via Context/Layer. Typed errors: `AuthError`, `WebhookError`. Compose with config Layer.

## Implementation Considerations

Stub: `{{connectionName}}`, `{{providerName}}`. Registry: `src/connections/index.ts`, `src/webhooks/index.ts`. Env: `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`.

## Alternative Technology Considerations

Auth0, Clerk: similar SSO. WorkOS: enterprise SSO, Directory Sync. Same OAuth flow; different SDK.
