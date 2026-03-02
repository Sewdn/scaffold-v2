#!/usr/bin/env node
/**
 * Writes a tsconfig.json that extends the workspace base.
 * Usage: node write-tsconfig.mjs [--extends path] [--outDir dist] [--rootDir src] [--jsx react-jsx]
 */
import { writeFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);
const getArg = (key) => {
  const i = args.indexOf(key);
  return i >= 0 ? args[i + 1] : null;
};

const extendsPath = getArg("--extends") ?? "@workspace/typescript-config/base.json";
const outDir = getArg("--outDir") ?? "dist";
const rootDir = getArg("--rootDir") ?? "src";
const jsx = getArg("--jsx");

const compilerOptions = { outDir, rootDir };
if (jsx) compilerOptions.jsx = jsx;

const tsconfig = {
  extends: extendsPath,
  compilerOptions,
  include: [`${rootDir}/**/*`],
  exclude: ["node_modules", outDir],
};

writeFileSync(resolve(process.cwd(), "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
