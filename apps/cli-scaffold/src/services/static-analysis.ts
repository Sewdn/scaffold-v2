/**
 * Static code analysis: file count and line count.
 * Used for benchmark metrics (scaffolded vs AI-generated).
 *
 * Uses Bun.spawn with find + xargs wc -l for performance (Option 1).
 * Falls back to Node.js walk when shell is unavailable (e.g. Windows).
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

/** File extensions to count as source (configurable). */
export const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdc",
  ".css",
  ".scss",
]);

/** Directories to skip when walking (e.g. node_modules). */
export const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".turbo",
  ".cache",
  "coverage",
  ".e2e-workspace",
  ".scaffold",
]);

export interface AnalysisResult {
  readonly files: number;
  readonly lines: number;
  readonly byExtension: Record<string, { files: number; lines: number }>;
}

const FIND_WC_SCRIPT = `find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.json" -o -name "*.md" -o -name "*.mdc" -o -name "*.css" -o -name "*.scss" \\) ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/dist/*" ! -path "*/build/*" ! -path "*/.next/*" ! -path "*/.turbo/*" ! -path "*/.cache/*" ! -path "*/coverage/*" ! -path "*/.e2e-workspace/*" ! -path "*/.scaffold/*" -print0 2>/dev/null | xargs -0 wc -l 2>/dev/null || true`;

function parseWcOutput(output: string): AnalysisResult {
  const byExtension: Record<string, { files: number; lines: number }> = {};
  let files = 0;
  let lines = 0;
  let totalFromWc: number | null = null;
  const lineRe = /^\s*(\d+)\s+(.+)$/;

  for (const line of output.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const m = lineRe.exec(line);
    if (!m) continue;
    const count = parseInt(m[1], 10);
    const pathPart = m[2].trim();
    if (pathPart === "total") {
      totalFromWc = count;
      continue;
    }
    files++;
    lines += count;
    const ext = pathPart.includes(".") ? "." + pathPart.split(".").pop()! : "";
    const key = SOURCE_EXTENSIONS.has(ext) ? ext : "(no ext)";
    if (!byExtension[key]) byExtension[key] = { files: 0, lines: 0 };
    byExtension[key].files++;
    byExtension[key].lines += count;
  }
  if (totalFromWc !== null) lines = totalFromWc;
  return { files, lines, byExtension };
}

/**
 * Count files and lines in a directory recursively.
 * Excludes SKIP_DIRS; only counts files with SOURCE_EXTENSIONS.
 * Uses Bun.spawnSync (find + xargs wc -l) on Unix; falls back to Node.js walk.
 */
export function analyzeDirectory(dir: string): AnalysisResult {
  if (typeof Bun !== "undefined" && process.platform !== "win32") {
    try {
      const syncResult = Bun.spawnSync(["sh", "-c", FIND_WC_SCRIPT], {
        cwd: dir,
        stdout: "pipe",
        stderr: "pipe",
        timeout: 30_000,
      });
      if (syncResult.exitCode === 0 && syncResult.stdout) {
        return parseWcOutput(syncResult.stdout.toString());
      }
    } catch {
      /* fall through to Node */
    }
  }
  return analyzeDirectoryNode(dir);
}

function analyzeDirectoryNode(dir: string): AnalysisResult {
  const byExtension: Record<string, { files: number; lines: number }> = {};
  let files = 0;
  let lines = 0;

  function walk(currentDir: string): void {
    if (!statSync(currentDir).isDirectory()) return;

    const entries = readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = entry.name.includes(".")
          ? "." + entry.name.split(".").pop()!
          : "";
        if (!SOURCE_EXTENSIONS.has(ext)) continue;

        files++;
        const fileLines = countLines(fullPath);
        lines += fileLines;

        const key = ext || "(no ext)";
        if (!byExtension[key]) byExtension[key] = { files: 0, lines: 0 };
        byExtension[key].files++;
        byExtension[key].lines += fileLines;
      }
    }
  }

  walk(dir);
  return { files, lines, byExtension };
}

function countLines(filePath: string): number {
  try {
    const content = readFileSync(filePath, "utf-8");
    return content.split(/\r?\n/).length;
  } catch {
    return 0;
  }
}
