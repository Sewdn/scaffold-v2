# svc-workos: add-sso-provider

## Command

```
scaffold svc-workos add-sso-provider <name>
```

## Description

Add an SSO provider config.

## Injection Target

- **Artifact:** `src/providers/<name>.ts`
- **Registry:** `src/providers/index.ts` (optional)

## Status

Proposed

## Underlying Technology

WorkOS SSO provider config. Provider type (Google, Okta, Azure AD, etc.). OIDC/SAML. Connection links to provider.

## Best Practices & Engineering Patterns

One provider per IdP type. Configure in WorkOS dashboard. Use for connection creation. Document provider setup.

## Effect Library Usage

`Effect.tryPromise` for provider ops. Inject `WorkOSService` via Context. Typed errors for provider config failures.

## Implementation Considerations

Stub: `{{providerName}}`, `{{providerType}}`. Registry: `src/providers/index.ts`. Env: `WORKOS_*`.

## Alternative Technology Considerations

Auth0: social/enterprise. WorkOS: enterprise-first. Same provider abstraction.
