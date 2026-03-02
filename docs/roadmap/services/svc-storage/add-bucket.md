# svc-storage: add-bucket

## Command

```
scaffold svc-storage add-bucket <name>
```

## Description

Add a bucket config for object storage.

## Injection Target

- **Artifact:** `src/buckets/<name>.ts`
- **Registry:** `src/buckets/index.ts` (optional)

## Status

Proposed

## Underlying Technology

S3/R2 bucket config. Region, ACL, CORS. SDK: `@aws-sdk/client-s3` CreateBucketCommand.

## Best Practices & Engineering Patterns

Namespace buckets by env (dev/staging/prod). Set CORS for client uploads. Use lifecycle rules for temp objects.

## Effect Library Usage

`Effect.tryPromise` for bucket ops. Inject `StorageService` via Context. Typed errors for bucket creation failures.

## Implementation Considerations

Stub: `{{bucketName}}`, `{{region}}`. Registry: `src/buckets/index.ts`. Env: `S3_BUCKET`, `R2_BUCKET`.

## Alternative Technology Considerations

MinIO, R2, GCS. S3-compatible API is portable across providers.
