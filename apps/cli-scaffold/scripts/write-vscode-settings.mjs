#!/usr/bin/env node
/**
 * Writes .vscode/settings.json and .vscode/extensions.json for AI agents and editors.
 * Enables format-on-save (oxfmt) and lint diagnostics (oxlint) for feedback to agents.
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();
const vscodeDir = resolve(cwd, ".vscode");
mkdirSync(vscodeDir, { recursive: true });

const settings = {
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[json]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "[markdown]": {
    "editor.defaultFormatter": "oxc.oxc-vscode",
  },
  "oxc.enable.oxfmt": true,
  "oxc.enable.oxlint": true,
};

const extensions = {
  recommendations: ["oxc.oxc-vscode"],
};

writeFileSync(resolve(vscodeDir, "settings.json"), JSON.stringify(settings, null, 2));
writeFileSync(resolve(vscodeDir, "extensions.json"), JSON.stringify(extensions, null, 2));
