# Backend Temporal: add-workflow

## Command

```
scaffold backend-temporal add-workflow <name>
```

## Description

Add a Temporal workflow definition. Workflows orchestrate Activities and are durable.

## Injection Target

- **Artifact:** `src/workflows/<name>.ts`
- **Registry:** Register in worker's `workflowsPath`

## Status

Proposed
