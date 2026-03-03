#!/usr/bin/env node
/**
 * Generates base monorepo config from stubs (Mustache templates).
 * Replaces write-turbo, write-tsconfig, write-oxc-config, write-vscode-settings,
 * write-cursor-hooks, write-agents-and-rules, and write-typescript-config.
 *
 * Usage: node generate-base-from-stubs.mjs [projectName]
 * Runs with cwd = project directory.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, existsSync, unlinkSync, chmodSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = resolve(__dirname, "../stubs/base");
const OUTPUT_DIR = process.cwd();
const projectName = process.argv[2] || "project";
const context = { projectName };

function renderTemplate(template, ctx) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => (ctx[k] !== undefined ? String(ctx[k]) : `{{${k}}}`));
}

function discoverStubFiles(baseDir, prefix = "") {
  const result = [];
  const entries = readdirSync(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      result.push(...discoverStubFiles(join(baseDir, entry.name), rel));
    } else if (entry.name.endsWith(".stub")) {
      result.push(rel);
    }
  }
  return result;
}

function stubPathToOutputPath(stubPath) {
  return stubPath.replace(/\.stub$/, "");
}

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

// Generate all stub files
const stubFiles = discoverStubFiles(STUBS_DIR);
for (const stubRel of stubFiles) {
  const stubFullPath = join(STUBS_DIR, stubRel);
  const template = readFileSync(stubFullPath, "utf-8");
  const rendered = renderTemplate(template, context);
  const outputRel = stubPathToOutputPath(stubRel);
  const outputPath = join(OUTPUT_DIR, outputRel);
  ensureDir(outputPath);
  writeFileSync(outputPath, rendered);
}

// Make format hooks executable
const cursorFormatPath = join(OUTPUT_DIR, ".cursor", "hooks", "format.mjs");
const claudeFormatPath = join(OUTPUT_DIR, ".claude", "hooks", "format.mjs");
if (existsSync(cursorFormatPath)) chmodSync(cursorFormatPath, 0o755);
if (existsSync(claudeFormatPath)) chmodSync(claudeFormatPath, 0o755);

// Symlink .cursor/rules/000-agents.mdc -> ../../AGENTS.md
const cursorRulesDir = join(OUTPUT_DIR, ".cursor", "rules");
const rulePath = join(cursorRulesDir, "000-agents.mdc");
mkdirSync(cursorRulesDir, { recursive: true });
if (existsSync(rulePath)) unlinkSync(rulePath);
symlinkSync("../../AGENTS.md", rulePath);
