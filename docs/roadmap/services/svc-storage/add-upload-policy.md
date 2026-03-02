# svc-storage: add-upload-policy

## Command

```
scaffold svc-storage add-upload-policy <name>
```

## Description

Add an upload policy (size limits, allowed types, etc.).

## Injection Target

- **Artifact:** `src/policies/<name>.ts`
- **Registry:** `src/policies/index.ts` (optional)

## Status

Proposed

## Underlying Technology

Zod schema for policy: maxSize, allowedTypes, keyPattern. Enforced before presigning or on upload callback.

## Best Practices & Engineering Patterns

Validate client-side and server-side. Whitelist MIME types; limit file size. Use key naming for organization.

## Effect Library Usage

`Effect.sync` for policy validation; `Effect.fail` for policy violations. Inject policy via Context.

## Implementation Considerations

Stub: `{{policyName}}`, `{{maxSize}}`, `{{allowedTypes}}`. Registry: `src/policies/index.ts`.

## Alternative Technology Considerations

Policy logic is provider-agnostic. S3/R2 support server-side conditions in presigned URLs.
