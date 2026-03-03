# Backend Motia: add-step

## Command

```
scaffold backend-motia add-step <name> [--type api|event|cron]
```

## Description

Add a Motia Step file. Steps have config (trigger, name) and handler (business logic).

## Injection Target

- **Artifact:** `src/steps/<name>.step.ts`

## Status

Proposed
