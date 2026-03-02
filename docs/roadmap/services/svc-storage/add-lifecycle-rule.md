# svc-storage: add-lifecycle-rule

## Command

```
scaffold svc-storage add-lifecycle-rule <name>
```

## Description

Add a lifecycle rule (expiration, transitions).

## Injection Target

- **Artifact:** Config (bucket lifecycle config)

## Status

Proposed

## Underlying Technology

S3/R2 lifecycle configuration. Expiration (delete after N days); transitions (move to Glacier). Applied at bucket level.

## Best Practices & Engineering Patterns

Use prefix filters to scope rules. Expire temp uploads; archive old data. Test in dev before prod.

## Effect Library Usage

`Effect.tryPromise` for PutBucketLifecycleConfiguration. Inject `StorageService` via Context.

## Implementation Considerations

Stub: `{{ruleName}}`, `{{prefix}}`, `{{expirationDays}}`. Config: bucket lifecycle block.

## Alternative Technology Considerations

MinIO/R2 support S3 lifecycle API. GCS has Object Lifecycle Management with different syntax.
