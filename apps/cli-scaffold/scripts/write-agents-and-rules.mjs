#!/usr/bin/env node
/**
 * Writes AGENTS.md (minimal agent instructions) and symlinks .cursor/rules/000-agents.mdc to it.
 * Keeps instructions minimal so they fit in every session's context.
 */
import { writeFileSync, mkdirSync, symlinkSync, existsSync, unlinkSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();

const agentsContent = `# Agent Instructions

Keep instructions minimal here—this file is added to every session's context.

- Use **skills** for specific tasks. Check \`.cursor/skills/\` or run \`npx playbook list\` to discover skills.
- Follow the project structure in \`.cursor/rules/\`.
- Prefer functional programming. In React, use functions instead of classes.
- When scaffolding, use the MCP scaffold tools or \`bunx scaffold\` CLI—see scaffold-* skills.
`;

const agentsPath = resolve(cwd, "AGENTS.md");
const cursorRulesDir = resolve(cwd, ".cursor", "rules");
const rulePath = resolve(cursorRulesDir, "000-agents.mdc");

writeFileSync(agentsPath, agentsContent);
mkdirSync(cursorRulesDir, { recursive: true });

if (existsSync(rulePath)) unlinkSync(rulePath);
symlinkSync("../../AGENTS.md", rulePath);
