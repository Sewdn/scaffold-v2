# svc-workos: add-directory-sync

## Command

```
scaffold svc-workos add-directory-sync <name>
```

## Description

Add directory sync config.

## Injection Target

- **Artifact:** `src/directory/<name>.ts`
- **Registry:** `src/directory/index.ts` (optional)

## Status

Proposed

## Underlying Technology

WorkOS Directory Sync. SCIM-based user/group sync from IdP. Webhooks: user.created, user.updated, group.updated.

## Best Practices & Engineering Patterns

Handle webhooks idempotently. Map WorkOS user to app user. Support group membership. Verify webhook signature.

## Effect Library Usage

`Effect.tryPromise` for sync logic. Inject `WorkOSService` via Context. Typed errors for sync failures.

## Implementation Considerations

Stub: `{{syncName}}`, `{{directoryId}}`. Registry: `src/directory/index.ts`. Env: `WORKOS_WEBHOOK_SECRET`.

## Alternative Technology Considerations

Auth0: SCIM. Okta: native sync. WorkOS: Directory Sync product. Same SCIM/webhook pattern.
