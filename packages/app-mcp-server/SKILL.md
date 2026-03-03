---
name: scaffold-app-mcp-server
description: Scaffold an MCP server app. Use when adding a Model Context Protocol server.
globs: ["**/apps/mcp-*/**", "**/app-mcp-server/**"]
---

# Scaffold MCP Server App

## High-Level Goal

Add an **MCP server** to the monorepo that exposes tools, resources, and prompts to AI agents via the Model Context Protocol. Use when you need AI agents to call your CLI or custom logic.

## Application Type

An **MCP server** built with **@modelcontextprotocol/sdk** and **Effect**: tool definitions, resources, prompts, structured for AI agent integration.

**IDs:** App type `mcp-server`; app name pattern `mcp-<name>` (e.g. `mcp-scaffold`).

**Documentation:** [modelcontextprotocol.io](https://modelcontextprotocol.io) — MCP specification. Use **context7** MCP with library ID `/modelcontextprotocol/typescript-sdk` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add an **MCP server application** (exposes tools to AI agents via Model Context Protocol).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type mcp-server
# Example: scaffold app scaffold --type mcp-server → apps/mcp-scaffold
```

## What It Creates

- `apps/mcp-<name>/` with `@modelcontextprotocol/sdk`, Effect
- Example tool definitions
- Structured for exposing CLI or custom tools to AI agents
