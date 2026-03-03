#!/usr/bin/env bun
/**
 * Generates scaffold docs data from app-type packages and expansion commands.
 * Outputs:
 *   - apps/docs-docs/src/generated/scaffold-data.json
 *   - apps/docs-docs/src/content/docs/reference/app-types/<id>.md (per app type)
 * Run before docs build: bun run scripts/generate-docs-data.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { getAllAppTypeIds, getAppTypeConfig } from "../src/app-types/registry.js";
import { getCliExpansionCommands } from "@workspace/app-cli";
import { getApiElysiaExpansionCommands } from "@workspace/app-api-elysia";
import { getApiHonoExpansionCommands } from "@workspace/app-api-hono";
import { getApiFastifyExpansionCommands } from "@workspace/app-api-fastify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");
const DOCS_ROOT = join(REPO_ROOT, "apps", "docs-docs", "src");
const GENERATED_DIR = join(DOCS_ROOT, "generated");
const APP_TYPES_CONTENT_DIR = join(DOCS_ROOT, "content", "docs", "reference", "app-types");

export interface AppTypeDocEntry {
  id: string;
  description: string;
  dirPrefix: string;
  packageName: string;
  expansionCommands: Array<{ name: string; description: string; usage: string }>;
}

export interface ScaffoldDocsData {
  appTypes: AppTypeDocEntry[];
  generatedAt: string;
}

function getPackageName(appTypeId: string): string {
  return `@workspace/app-${appTypeId}`;
}

function formatTitle(id: string): string {
  const titles: Record<string, string> = {
    cli: "CLI",
    "api-elysia": "API (Elysia)",
    "api-hono": "API (Hono)",
    "api-fastify": "API (Fastify)",
    "frontend-nextjs": "Frontend (Next.js)",
    "frontend-vite": "Frontend (Vite)",
    "frontend-tanstack": "Frontend (TanStack)",
    "mcp-server": "MCP Server",
    "slide-deck": "Slide Deck",
    documentation: "Documentation",
  };
  return titles[id] ?? id;
}

function renderAppTypePage(entry: AppTypeDocEntry): string {
  let body = `---
title: ${formatTitle(entry.id)}
description: ${entry.description}
---

## Overview

${entry.description}.

**Directory prefix:** \`${entry.dirPrefix}\`

**Package:** \`${entry.packageName}\`

## Naming example

\`scaffold app <name> --type ${entry.id}\` → \`apps/${entry.dirPrefix}-<name>\`
`;

  if (entry.expansionCommands.length > 0) {
    body += `
## Expansion commands

| Command | Description |
|---------|-------------|
`;
    for (const cmd of entry.expansionCommands) {
      body += `| \`${cmd.usage}\` | ${cmd.description} |\n`;
    }
  }

  return body;
}

function collectDocsData(): ScaffoldDocsData {
  const ids = getAllAppTypeIds();
  const appTypes: AppTypeDocEntry[] = ids.map((id) => {
    const config = getAppTypeConfig(id);
    if (!config) {
      throw new Error(`App type config not found: ${id}`);
    }
    const expansionCommands =
      id === "cli"
        ? getCliExpansionCommands()
        : id === "api-elysia"
          ? getApiElysiaExpansionCommands()
          : id === "api-hono"
            ? getApiHonoExpansionCommands()
            : id === "api-fastify"
              ? getApiFastifyExpansionCommands()
              : [];
    return {
      id: config.id,
      description: config.description,
      dirPrefix: config.dirPrefix,
      packageName: getPackageName(id),
      expansionCommands,
    };
  });

  return {
    appTypes,
    generatedAt: new Date().toISOString(),
  };
}

const data = collectDocsData();

// Write JSON
mkdirSync(GENERATED_DIR, { recursive: true });
const jsonPath = join(GENERATED_DIR, "scaffold-data.json");
writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
console.log(`Generated ${jsonPath}`);

// Write per-app-type pages and overview
mkdirSync(APP_TYPES_CONTENT_DIR, { recursive: true });

const tableRows = data.appTypes
  .map((e) => `| [${formatTitle(e.id)}](./${e.id}) | \`${e.dirPrefix}\` | ${e.description} |`)
  .join("\n");

const overviewContent = `---
title: App Types
description: Supported application types for scaffold app
---

## Available types

| Type | Directory prefix | Description |
|------|------------------|-------------|
${tableRows}

## Naming examples

- \`scaffold app web --type frontend-vite\` → \`apps/frontend-web\`
- \`scaffold app api --type api-elysia\` → \`apps/api-elysia-api\`
- \`scaffold app docs --type documentation\` → \`apps/docs-docs\`
- \`scaffold app tool --type cli\` → \`apps/cli-tool\`

## Extensibility

The app type registry is extensible. New types can be added by:

1. Defining an \`AppTypeConfig\` with \`id\`, \`description\`, \`dirPrefix\`, and \`phases\`
2. Registering it in the app type registry
3. Exposing it via \`scaffold app --type\`

Each phase can run scripts (bun, bunx, npx, shell) or generate stubs.
`;

writeFileSync(join(APP_TYPES_CONTENT_DIR, "index.md"), overviewContent, "utf-8");
console.log(`Generated ${join(APP_TYPES_CONTENT_DIR, "index.md")}`);

for (const entry of data.appTypes) {
  const pagePath = join(APP_TYPES_CONTENT_DIR, `${entry.id}.md`);
  writeFileSync(pagePath, renderAppTypePage(entry), "utf-8");
  console.log(`Generated ${pagePath}`);
}
