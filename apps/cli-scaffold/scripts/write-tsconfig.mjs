#!/usr/bin/env node
/**
 * Writes a tsconfig.json that extends the workspace base.
 * Usage:
 *   node write-tsconfig.mjs [--extends path] [--outDir dist] [--rootDir src] [--jsx react-jsx]
 *   node write-tsconfig.mjs --from-stub <path> [--extends path] [--outDir dist] [--rootDir src]
 *
 * When --from-stub is provided, the stub is rendered with Mustache and written.
 * Otherwise, tsconfig is generated from scratch.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);
const getArg = (key) => {
  const i = args.indexOf(key);
  return i >= 0 ? args[i + 1] : null;
};

const fromStub = getArg("--from-stub");
const extendsPath = getArg("--extends") ?? "@workspace/typescript-config/base.json";
const outDir = getArg("--outDir") ?? "dist";
const rootDir = getArg("--rootDir") ?? "src";
const jsx = getArg("--jsx");

function renderTemplate(template, ctx) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) =>
    ctx[k] !== undefined ? String(ctx[k]) : `{{${k}}}`,
  );
}

if (fromStub) {
  const template = readFileSync(resolve(fromStub), "utf-8");
  const ctx = { tsconfigExtends: extendsPath, outDir, rootDir };
  const rendered = renderTemplate(template, ctx);
  writeFileSync(resolve(process.cwd(), "tsconfig.json"), rendered);
} else {
  const compilerOptions = { outDir, rootDir };
  if (jsx) compilerOptions.jsx = jsx;

  const tsconfig = {
    extends: extendsPath,
    compilerOptions,
    include: [`${rootDir}/**/*`],
    exclude: ["node_modules", outDir],
  };

  writeFileSync(resolve(process.cwd(), "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
}
