# Backend Booster: add-command

## Command

```
scaffold backend-booster add-command <name>
```

## Description

Add a Booster command handler. Commands are the write side of CQRS; they dispatch events.

## Injection Target

- **Artifact:** `src/commands/<Name>.ts`
- **Registry:** Booster auto-discovers commands

## Status

Proposed
