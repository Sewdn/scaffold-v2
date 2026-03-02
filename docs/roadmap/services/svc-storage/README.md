# svc-storage Package

**Description:** Object storage (S3, R2, MinIO).

**Status:** Proposed

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-bucket](add-bucket.md) | Add a bucket config | `src/buckets/<name>.ts` |
| [add-presigned-handler](add-presigned-handler.md) | Add presigned URL route | `src/handlers/<name>.ts` |
| [add-upload-policy](add-upload-policy.md) | Add an upload policy | `src/policies/<name>.ts` |
| [add-lifecycle-rule](add-lifecycle-rule.md) | Add a lifecycle rule | Config |

## Underlying Technology

AWS S3, Cloudflare R2, MinIO. `@aws-sdk/client-s3` for SDK. Presigned URLs for client uploads; lifecycle rules for retention.

## Best Practices & Engineering Patterns

Use presigned URLs for uploads; never expose credentials to client. Validate content-type and size. Namespace keys; use lifecycle rules for cleanup.

## Effect Library Usage

`Effect.tryPromise` for S3/R2 calls. `StorageService` via Context/Layer. Typed errors: `UploadError`, `NotFoundError`. Compose with config Layer.

## Implementation Considerations

Stub: `{{bucketName}}`, `{{keyPrefix}}`. Registry: `src/buckets/index.ts`. Env: `S3_ENDPOINT`, `R2_ACCESS_KEY`, `R2_SECRET_KEY`.

## Alternative Technology Considerations

MinIO: self-hosted S3-compatible. R2: no egress fees. GCS: Google ecosystem. S3: de facto standard.
