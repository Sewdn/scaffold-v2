#!/usr/bin/env node
/**
 * Sets up Dora (AI File Explorer) for newly scaffolded projects.
 * See: https://github.com/butttons/dora | https://github.com/butttons/dora/blob/main/AGENTS.README.md
 *
 * - Runs dora init + index (best effort; may fail if dora/scip-typescript not available)
 * - Creates .cursor/commands/ for dora exploration (Cursor)
 * - Adds dora rules to .cursor/rules
 * - Symlinks dora skill to .cursor/skills/dora and .claude/skills/dora
 * - Appends dora snippet to AGENTS.md and CLAUDE.md
 * - Creates .claude/settings.json for Claude Code (permissions, auto-indexing hooks)
 *
 * Prerequisite: @sourcegraph/scip-typescript as devDep (for TypeScript indexing).
 */
import {
  mkdirSync,
  symlinkSync,
  existsSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  unlinkSync,
} from "fs";
import { resolve, relative } from "path";
import { spawnSync } from "child_process";

const cwd = process.cwd();

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { cwd, stdio: "pipe", encoding: "utf8", ...opts });
  return { ok: r.status === 0, stderr: r.stderr || "", stdout: r.stdout || "" };
}

function ensureGitignore() {
  const p = resolve(cwd, ".gitignore");
  const content = existsSync(p) ? readFileSync(p, "utf8") : "";
  if (content.includes(".dora")) return;
  appendFileSync(p, "\n# dora code context index\n.dora/\n");
}

function patchDoraConfig() {
  const p = resolve(cwd, ".dora", "config.json");
  if (!existsSync(p)) return;
  const cfg = JSON.parse(readFileSync(p, "utf8"));
  const idxCmd = "bunx @sourcegraph/scip-typescript index --infer-tsconfig --output .dora/index.scip";
  if (cfg.commands) cfg.commands.index = idxCmd;
  else cfg.commands = { index: idxCmd };
  writeFileSync(p, JSON.stringify(cfg, null, 2));
}

function createCursorCommands() {
  const dir = resolve(cwd, ".cursor", "commands");
  mkdirSync(dir, { recursive: true });

  const commands = [
    {
      name: "dora-explore.md",
      content: `Use dora CLI to explore the codebase structure.

Steps:

1. Run \`dora status\` to check index health
2. Run \`dora map\` to show packages and statistics
3. Run \`dora treasure\` to identify core files
4. Analyze the results and provide insights
`,
    },
    {
      name: "dora-analyze-file.md",
      content: `Analyze a file and its dependencies using dora.

For the file path provided in the parameters:

1. Run \`dora file <path>\` to see symbols and dependencies
2. Run \`dora rdeps <path>\` to see what depends on this file
3. Explain the file's role in the codebase
`,
    },
    {
      name: "dora-find-symbol.md",
      content: `Find a symbol definition using dora.

For the symbol name provided:

1. Run \`dora symbol <name>\` to find the definition
2. If found, run \`dora file <path>\` on the containing file
3. Show the symbol location and context
`,
    },
    {
      name: "dora-check-architecture.md",
      content: `Check codebase architecture for issues using dora.

1. Run \`dora cycles\` to find circular dependencies
2. Run \`dora coupling --threshold 5\` to find tightly coupled files
3. Run \`dora complexity --sort complexity\` to identify high-risk files
4. Summarize findings and suggest improvements
`,
    },
  ];

  for (const { name, content } of commands) {
    writeFileSync(resolve(dir, name), content.trim() + "\n");
  }
}

function createDoraRule() {
  const dir = resolve(cwd, ".cursor", "rules");
  mkdirSync(dir, { recursive: true });

  const rulePath = resolve(dir, "001-dora.mdc");
  const content = `---
description: Code exploration with dora CLI
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
---

# Dora Code Exploration

Use the **dora** CLI for code exploration instead of grep/find/glob when possible.

## When to Use Dora

- Finding symbol definitions: \`dora symbol <name>\`
- Understanding file dependencies: \`dora file <path>\`, \`dora deps\`, \`dora rdeps\`
- Architecture analysis: \`dora cycles\`, \`dora coupling\`, \`dora complexity\`
- Codebase overview: \`dora map\`, \`dora treasure\`

## Commands

| Command | Description |
|---------|-------------|
| \`dora status\` | Check index health |
| \`dora map\` | Show packages and stats |
| \`dora symbol <query>\` | Find symbol definitions |
| \`dora file <path>\` | Analyze file with dependencies |
| \`dora deps <path>\` | Show dependencies |
| \`dora rdeps <path>\` | Show reverse dependencies |
| \`dora cycles\` | Find circular dependencies |
| \`dora treasure\` | Most referenced files |

## Cursor Commands

Type \`/dora-explore\`, \`/dora-analyze-file\`, \`/dora-find-symbol\`, or \`/dora-check-architecture\` in chat.
`;

  writeFileSync(rulePath, content);
}

function setupDoraSkill() {
  const skillMdSource = resolve(cwd, ".dora", "docs", "SKILL.md");
  if (!existsSync(skillMdSource)) return;

  const skillDir = resolve(cwd, ".cursor", "skills", "dora");
  mkdirSync(skillDir, { recursive: true });
  const skillMdLink = resolve(skillDir, "SKILL.md");
  if (existsSync(skillMdLink)) unlinkSync(skillMdLink);
  symlinkSync(relative(skillDir, skillMdSource), skillMdLink);
}

function createClaudeSettings() {
  const claudeDir = resolve(cwd, ".claude");
  const settingsPath = resolve(claudeDir, "settings.json");
  mkdirSync(claudeDir, { recursive: true });

  const existing = existsSync(settingsPath)
    ? JSON.parse(readFileSync(settingsPath, "utf8"))
    : {};

  const doraAllow = ["Bash(dora:*)", "Skill(dora)"];
  const allow = [
    ...new Set([...(existing.permissions?.allow ?? []), ...doraAllow]),
  ];

  const doraSessionStart = {
    hooks: [
      {
        type: "command",
        command:
          "bunx @butttons/dora status 2>/dev/null && (bunx @butttons/dora index > /tmp/dora-index.log 2>&1 &) || echo 'dora not initialized. Run: bunx @butttons/dora init && bun run dora:index'",
      },
    ],
  };
  const doraStop = {
    hooks: [
      {
        type: "command",
        command: "(bunx @butttons/dora index > /tmp/dora-index.log 2>&1 &) || true",
      },
    ],
  };

  const existingHooks = existing.hooks ?? {};
  const settings = {
    ...existing,
    permissions: { ...existing.permissions, allow },
    hooks: {
      ...existingHooks,
      SessionStart: [...(existingHooks.SessionStart ?? []), doraSessionStart],
      Stop: [...(existingHooks.Stop ?? []), doraStop],
    },
  };

  writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function setupClaudeDoraSkill() {
  const skillMdSource = resolve(cwd, ".dora", "docs", "SKILL.md");
  if (!existsSync(skillMdSource)) return;

  const skillDir = resolve(cwd, ".claude", "skills", "dora");
  mkdirSync(skillDir, { recursive: true });
  const skillMdLink = resolve(skillDir, "SKILL.md");
  if (existsSync(skillMdLink)) unlinkSync(skillMdLink);
  symlinkSync(relative(skillDir, skillMdSource), skillMdLink);
}

function appendSnippetToFile(filePath, snippetPath) {
  if (!existsSync(snippetPath) || !existsSync(filePath)) return;

  const snippet = readFileSync(snippetPath, "utf8");
  const content = readFileSync(filePath, "utf8");
  if (content.includes("## Code Exploration with dora")) return; // already appended

  appendFileSync(filePath, "\n\n" + snippet);
}

function appendSnippetToAgents() {
  appendSnippetToFile(resolve(cwd, "AGENTS.md"), resolve(cwd, ".dora", "docs", "SNIPPET.md"));
}

function appendSnippetToClaude() {
  appendSnippetToFile(resolve(cwd, "CLAUDE.md"), resolve(cwd, ".dora", "docs", "SNIPPET.md"));
}

// ─── Main ───────────────────────────────────────────────────────────────────

ensureGitignore();

const initResult = run("bun", ["x", "@butttons/dora", "init"]);
if (!initResult.ok) {
  console.warn("[write-dora-setup] dora init failed:", initResult.stderr || initResult.stdout);
  console.warn("[write-dora-setup] Install dora: bun install -g @butttons/dora");
  console.warn("[write-dora-setup] Skipping dora setup. You can run 'dora init && dora index' later.");
  createCursorCommands();
  createDoraRule();
  createClaudeSettings();
  process.exit(0);
}

patchDoraConfig();

const indexResult = run("bun", ["x", "@butttons/dora", "index"]);
if (!indexResult.ok) {
  console.warn("[write-dora-setup] dora index failed (may need @sourcegraph/scip-typescript):", indexResult.stderr?.slice(0, 200));
}

createCursorCommands();
createDoraRule();
createClaudeSettings();
setupDoraSkill();
setupClaudeDoraSkill();
appendSnippetToAgents();
appendSnippetToClaude();

console.log("[write-dora-setup] Dora setup complete. Use dora for code exploration (Cursor + Claude Code).");
