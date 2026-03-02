#!/usr/bin/env node
/**
 * Creates typescript-config package (package.json + base.json) in cwd.
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();

const pkg = {
  name: "@workspace/typescript-config",
  version: "0.0.1",
  private: true,
  files: ["base.json", "bun.json", "nextjs.json", "react-library.json"],
};

const baseTsconfig = {
  $schema: "https://json.schemastore.org/tsconfig",
  display: "Default",
  compilerOptions: {
    composite: false,
    declaration: true,
    declarationMap: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    inlineSources: false,
    isolatedModules: true,
    moduleResolution: "node",
    noUnusedLocals: false,
    noUnusedParameters: false,
    preserveWatchOutput: true,
    skipLibCheck: true,
    strict: true,
    strictNullChecks: true,
  },
  exclude: ["node_modules"],
};

mkdirSync(cwd, { recursive: true });
writeFileSync(resolve(cwd, "package.json"), JSON.stringify(pkg, null, 2));
writeFileSync(resolve(cwd, "base.json"), JSON.stringify(baseTsconfig, null, 2));
