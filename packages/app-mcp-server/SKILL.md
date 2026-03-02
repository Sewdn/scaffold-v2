---
name: scaffold-app-mcp-server
description: Scaffold an MCP server app. Use when adding a Model Context Protocol server.
globs: ["**/apps/mcp-*/**", "**/app-mcp-server/**"]
---

# Scaffold MCP Server App

## When to Use

Use this skill when you need to add an **MCP server application** (exposes tools to AI agents via Model Context Protocol).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type mcp-server
# Example: bunx scaffold app scaffold --type mcp-server → apps/mcp-scaffold
```

**MCP**: `mcp_scaffold_app` with app name, type `mcp-server`.

## What It Creates

- `apps/mcp-<name>/` with `@modelcontextprotocol/sdk`, Effect
- Example tool definitions
- Structured for exposing CLI or custom tools to AI agents
