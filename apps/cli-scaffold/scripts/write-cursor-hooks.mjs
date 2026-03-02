#!/usr/bin/env node
/**
 * Writes hooks for Cursor and Claude Code.
 * - .cursor/hooks.json + .cursor/hooks/format.mjs (Cursor Agent/Tab)
 * - .claude/settings.json + .claude/hooks/format.mjs (Claude Code)
 *
 * Both run oxfmt after every file edit so AI-generated code is formatted automatically.
 *
 * Cursor: https://cursor.com/docs/agent/hooks
 * Claude: https://code.claude.com/docs/en/hooks
 */
import { writeFileSync, mkdirSync, chmodSync, existsSync, readFileSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();
const cursorDir = resolve(cwd, ".cursor");
const cursorHooksDir = resolve(cursorDir, "hooks");
const claudeDir = resolve(cwd, ".claude");
const claudeHooksDir = resolve(claudeDir, "hooks");
mkdirSync(cursorHooksDir, { recursive: true });
mkdirSync(claudeHooksDir, { recursive: true });

const hooksJson = {
  version: 1,
  hooks: {
    afterFileEdit: [{ command: "node .cursor/hooks/format.mjs" }],
    afterTabFileEdit: [{ command: "node .cursor/hooks/format.mjs" }],
  },
};

const formatScript = `#!/usr/bin/env node
/**
 * Format hook: runs oxfmt after file edit (Cursor or Claude Code).
 * Input (stdin): JSON - Cursor: { file_path }, Claude: { tool_input: { file_path } }
 * Exit 0: success (or skip). Exit 2: block. Other: fail-open.
 */
import { readFileSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import { dirname, resolve } from "path";

const OXFMT_EXTS = /\\.(ts|tsx|js|jsx|mjs|cjs|json|jsonc|md)$/i;

function readStdin() {
  const chunks = [];
  let chunk;
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
  while ((chunk = process.stdin.read()) !== null) chunks.push(chunk);
  return chunks.join("");
}

function main() {
  let input;
  try {
    const raw = readStdin();
    if (!raw.trim()) exit(0);
    input = JSON.parse(raw);
  } catch {
    exit(0);
  }

  const filePath = input.file_path ?? input.tool_input?.file_path;
  if (!filePath || typeof filePath !== "string") exit(0);

  const absPath = resolve(filePath);
  if (!existsSync(absPath)) exit(0);
  if (!OXFMT_EXTS.test(absPath)) exit(0);

  // Find project root (contains package.json with oxfmt)
  let root = dirname(absPath);
  while (root !== "/" && root !== ".") {
    const pkgPath = resolve(root, "package.json");
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies } || {};
        if (Object.keys(deps).some((d) => d === "oxfmt" || d.startsWith("oxfmt@"))) break;
      } catch {
        // ignore
      }
    }
    root = dirname(root);
  }
  if (root === "/" || root === ".") exit(0);

  const binDir = resolve(root, "node_modules/.bin");
  const oxfmtBin = ["oxfmt", "oxfmt.cmd"].find((b) => existsSync(resolve(binDir, b)));
  if (!oxfmtBin) exit(0);

  const r = spawnSync(resolve(binDir, oxfmtBin), [absPath], {
    cwd: root,
    stdio: "pipe",
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  exit(r.status ?? 0);
}

function exit(code) {
  process.exit(code === undefined ? 0 : code);
}

main();
`;

writeFileSync(resolve(cursorDir, "hooks.json"), JSON.stringify(hooksJson, null, 2));
writeFileSync(resolve(cursorHooksDir, "format.mjs"), formatScript);
chmodSync(resolve(cursorHooksDir, "format.mjs"), 0o755);

// Claude Code: PostToolUse hook for format-on-edit (runs after Edit|Write)
const claudeSettingsPath = resolve(claudeDir, "settings.json");
const claudeSettings = existsSync(claudeSettingsPath)
  ? JSON.parse(readFileSync(claudeSettingsPath, "utf8"))
  : {};
const formatHook = {
  PostToolUse: [
    {
      matcher: "Edit|Write",
      hooks: [
        {
          type: "command",
          command: 'node "${CLAUDE_PROJECT_DIR}/.claude/hooks/format.mjs"',
        },
      ],
    },
  ],
};
const mergedHooks = {
  ...claudeSettings.hooks,
  ...formatHook,
  PostToolUse: [
    ...(claudeSettings.hooks?.PostToolUse ?? []).filter(
      (h) => h.matcher !== "Edit|Write"
    ),
    ...formatHook.PostToolUse,
  ],
};
writeFileSync(
  claudeSettingsPath,
  JSON.stringify({ ...claudeSettings, hooks: mergedHooks }, null, 2)
);
writeFileSync(resolve(claudeHooksDir, "format.mjs"), formatScript);
chmodSync(resolve(claudeHooksDir, "format.mjs"), 0o755);
