# svc-storage: add-presigned-handler

## Command

```
scaffold svc-storage add-presigned-handler <name>
```

## Description

Add presigned URL route for secure uploads/downloads.

## Injection Target

- **Artifact:** `src/handlers/<name>.ts`
- **Registry:** Routes registry

## Status

Proposed

## Underlying Technology

`getSignedUrl` from `@aws-sdk/s3-request-presigner`. PUT for upload; GET for download. Expiry (e.g. 15 min).

## Best Practices & Engineering Patterns

Short expiry for uploads; validate content-type/size server-side before signing. Use key prefix to scope access.

## Effect Library Usage

`Effect.tryPromise` for URL generation. Inject `StorageService` via Context. Typed errors for invalid params.

## Implementation Considerations

Stub: `{{handlerName}}`, `{{bucketName}}`, `{{expirySeconds}}`. Registry: routes. Env: `S3_*`, `R2_*`.

## Alternative Technology Considerations

MinIO/R2 use same S3 presigner API. GCS has different signed URL API.
