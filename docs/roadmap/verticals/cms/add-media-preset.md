# CMS: add-media-preset

## Command

```
scaffold cms add-media-preset <name>
```

## Description

Image/video presets: sizes, formats, CDN.

## Injection Target

- **svc-media:** `src/presets/<name>.ts` (width, height, format, quality)
- **Config:** `src/config/media.ts` (preset registry)

## Co-generation

- `svc-storage add-preset` (if using svc-storage)
- `svc-media` (transform config)

## Technology & Patterns

- **svc-media** (presets), **svc-storage** (CDN). Effect for upload→transform. Alternatives: Cloudinary, imgix.

## Status

Planned
