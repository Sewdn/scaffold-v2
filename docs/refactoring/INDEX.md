# App Type Package Refactoring

This directory contains briefings for extracting app types from `apps/cli-scaffold` into separate packages, following the `@workspace/app-cli` pattern.

## Documents

| Document | Purpose |
|----------|---------|
| [MASTER-BRIEFING.md](./MASTER-BRIEFING.md) | Overview, conventions, reference implementation |
| [BRIEFING-APP-BACKEND.md](./BRIEFING-APP-BACKEND.md) | Sub-agent: Extract `@workspace/app-backend` |
| [BRIEFING-APP-MCP-SERVER.md](./BRIEFING-APP-MCP-SERVER.md) | Sub-agent: Extract `@workspace/app-mcp-server` |
| [BRIEFING-APP-FRONTEND-NEXTJS.md](./BRIEFING-APP-FRONTEND-NEXTJS.md) | Sub-agent: Extract `@workspace/app-frontend-nextjs` |
| [BRIEFING-APP-FRONTEND-VITE.md](./BRIEFING-APP-FRONTEND-VITE.md) | Sub-agent: Extract `@workspace/app-frontend-vite` |
| [BRIEFING-APP-FRONTEND-TANSTACK.md](./BRIEFING-APP-FRONTEND-TANSTACK.md) | Sub-agent: Extract `@workspace/app-frontend-tanstack` |
| [BRIEFING-APP-SLIDE-DECK.md](./BRIEFING-APP-SLIDE-DECK.md) | Sub-agent: Extract `@workspace/app-slide-deck` |
| [BRIEFING-APP-DOCUMENTATION.md](./BRIEFING-APP-DOCUMENTATION.md) | Sub-agent: Extract `@workspace/app-documentation` |
| [SUB-AGENT-INVOCATION.md](./SUB-AGENT-INVOCATION.md) | How to invoke sub-agents |

## Execution Order

Recommended order (dependencies first, then scripts-based):

1. **Backend** — Generate phase, simplest
2. **MCP Server** — Generate phase
3. **Frontend Next.js** — Scripts phase
4. **Frontend Vite** — Scripts phase
5. **Frontend TanStack** — Scripts phase (has patch step)
6. **Slide Deck** — Scripts phase
7. **Documentation** — Scripts phase

Sub-agents can run in parallel for independent app types (e.g. backend and mcp-server simultaneously).

## Combined Scenario (09-backend-plus-mcp)

The scenario `09-backend-plus-mcp` scaffolds both backend and mcp-server in one project. Per "no hybrid" requirement:

- **Option A:** Keep `09-backend-plus-mcp` in core scenario loaders as an integration test (uses both app-backend and app-mcp-server packages indirectly via registry).
- **Option B:** Remove it; rely on backend-only and mcp-server-only for focused coverage.

Master briefing and individual briefings assume Option A: combined scenario stays in core.
