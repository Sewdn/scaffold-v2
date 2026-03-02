#!/usr/bin/env node
/**
 * Sets up .cursor/skills/ by symlinking only SKILL.md from discovered packages.
 * Probes the repo for SKILL.md files (packages/, apps/) and creates symlinks.
 * Cursor expects skill dirs to contain only SKILL.md (and optional reference.md, examples.md, scripts/).
 *
 * Usage: node write-skills-symlinks.mjs [--cwd <dir>]
 * Default cwd: process.cwd()
 *
 * Excluded from probe: .cursor/skills, .dora, node_modules, .git, .e2e-workspace, dist, build, .turbo
 * Standalone skills (scaffold-component, scaffold-module, scaffold-project) in .cursor/skills are left as-is.
 */
import {
  mkdirSync,
  symlinkSync,
  existsSync,
  unlinkSync,
  rmdirSync,
  readdirSync,
  lstatSync,
  readFileSync,
} from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const cwdIdx = args.indexOf("--cwd");
const cwd = cwdIdx >= 0 && args[cwdIdx + 1] ? resolve(args[cwdIdx + 1]) : process.cwd();

const EXCLUDE_DIRS = new Set([
  ".cursor",
  ".dora",
  "node_modules",
  ".git",
  ".e2e-workspace",
  "dist",
  "build",
  ".turbo",
  ".next",
  "out",
]);

const skillsDir = resolve(cwd, ".cursor", "skills");
const skillsDirRelative = relative(cwd, skillsDir);

function extractSkillName(skillMdPath) {
  try {
    const content = readFileSync(skillMdPath, "utf8");
    const match = content.match(/^---\s*\nname:\s*(.+?)\n/m);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  } catch (_) {}
  const parentDir = dirname(skillMdPath).split(/[/\\]/).pop();
  return `scaffold-${parentDir}`;
}

function findSkillFiles(dir, base = cwd, found = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = resolve(dir, e.name);
    const rel = relative(base, full);
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      if (rel.startsWith(skillsDirRelative + "/") || rel === skillsDirRelative) continue;
      findSkillFiles(full, base, found);
    } else if (e.name === "SKILL.md") {
      found.push(full);
    }
  }
  return found;
}

function ensureSkillDir(skillName, skillMdSource) {
  const skillDir = resolve(skillsDir, skillName);

  if (relative(cwd, skillMdSource).startsWith(".cursor/skills/")) return;

  if (existsSync(skillDir)) {
    const stat = lstatSync(skillDir);
    if (stat.isSymbolicLink()) {
      unlinkSync(skillDir);
    } else {
      const skillMd = resolve(skillDir, "SKILL.md");
      if (existsSync(skillMd)) unlinkSync(skillMd);
      try {
        const entries = readdirSync(skillDir);
        if (entries.length === 0) rmdirSync(skillDir);
      } catch (_) {}
    }
  }

  mkdirSync(skillDir, { recursive: true });
  const skillMdLink = resolve(skillDir, "SKILL.md");
  const relTarget = relative(skillDir, skillMdSource);
  symlinkSync(relTarget, skillMdLink);
}

mkdirSync(skillsDir, { recursive: true });

const skillFiles = findSkillFiles(cwd);
for (const skillMdPath of skillFiles) {
  const skillName = extractSkillName(skillMdPath);
  ensureSkillDir(skillName, skillMdPath);
}

console.log(`[write-skills-symlinks] Linked ${skillFiles.length} skills.`);