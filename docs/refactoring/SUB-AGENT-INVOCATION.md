# Sub-Agent Invocation Instructions

Use these prompts to invoke sub-agents (e.g. Cursor Composer, mcp_task, or similar) to perform each refactoring. Each prompt is self-contained with context from the briefing.

---

## Backend

```
Extract the backend app type into packages/app-backend following the app-cli pattern.

Read these files first:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-BACKEND.md
- packages/app-cli/ (structure as reference)

Then execute the checklist in BRIEFING-APP-BACKEND.md: create package, config, index, stubs, e2e scenarios; update registry and scenario-registry; remove old app-types/backend. Ensure SCAFFOLD_E2E_SCENARIO=backend-only bun test apps/cli-scaffold/e2e/ passes.
```

---

## MCP Server

```
Extract the MCP server app type into packages/app-mcp-server following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-MCP-SERVER.md
- packages/app-cli/ (reference)

Execute the BRIEFING-APP-MCP-SERVER.md checklist. Create mcp-server-only scenario. Update registry and scenario-registry. Remove old app-types/mcp-server. Verify SCAFFOLD_E2E_SCENARIO=mcp-server-only passes.
```

---

## Frontend Next.js

```
Extract the frontend-nextjs app type into packages/app-frontend-nextjs following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-FRONTEND-NEXTJS.md

This app type uses scripts phase (bun create next-app), no stubs. Execute checklist. Move 16-frontend-nextjs scenario. Verify SCAFFOLD_E2E_SCENARIO=frontend-nextjs passes.
```

---

## Frontend Vite

```
Extract the frontend-vite app type into packages/app-frontend-vite following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-FRONTEND-VITE.md

Scripts phase only (create-vite + react-ts). Execute checklist. Move 15-frontend-vite scenario. Verify SCAFFOLD_E2E_SCENARIO=frontend-vite passes.
```

---

## Frontend TanStack

```
Extract the frontend-tanstack app type into packages/app-frontend-tanstack following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-FRONTEND-TANSTACK.md

Scripts phase with @tanstack/cli and patchScriptPath. Ensure getSteps uses ctx.patchScriptPath etc. Execute checklist. Move 17-frontend-tanstack. Verify SCAFFOLD_E2E_SCENARIO=frontend-tanstack passes.
```

---

## Slide Deck

```
Extract the slide-deck app type into packages/app-slide-deck following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-SLIDE-DECK.md

Scripts phase (create vite vanilla-ts + reveal.js). Execute checklist. Move 10-slide-deck-app scenario. Note app dir is slides-slides when app name is slides. Verify SCAFFOLD_E2E_SCENARIO=slide-deck-app passes.
```

---

## Documentation

```
Extract the documentation app type into packages/app-documentation following the app-cli pattern.

Read:
- docs/refactoring/MASTER-BRIEFING.md
- docs/refactoring/BRIEFING-APP-DOCUMENTATION.md

Scripts phase (create astro starlight). Execute checklist. Move 11-documentation-app. Verify SCAFFOLD_E2E_SCENARIO=documentation-app passes.
```

---

## Parallel Execution

You can run multiple sub-agents in parallel for independent app types:

- **Batch 1 (Generate-phase):** Backend + MCP Server
- **Batch 2 (Scripts-phase):** Frontend Next.js + Frontend Vite + Slide Deck + Documentation
- **Batch 3:** Frontend TanStack (has patch script dependency; can run with Batch 2 if careful)

Ensure each sub-agent has workspace write access and that concurrent edits to `registry.ts` and `scenario-registry.ts` are coordinated (or run sequentially for those two files).
