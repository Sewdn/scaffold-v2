#!/usr/bin/env node
/**
 * Writes .oxlintrc.json to current directory.
 * Extends from project root config. Run with cwd = package/app directory.
 * Relativity: from packages/domain, root is ../../; from apps/cli, root is ../..
 */
import { writeFileSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();
// Detect if we're in packages/ or apps/ - both need to extend from monorepo root
const isInPackages = cwd.includes("/packages/");
const isInApps = cwd.includes("/apps/");
const extendPath = isInPackages || isInApps ? "../../.oxlintrc.json" : "../.oxlintrc.json";

const content = {
  $schema: "./node_modules/oxlint/configuration_schema.json",
  extends: [extendPath],
};

writeFileSync(resolve(cwd, ".oxlintrc.json"), JSON.stringify(content, null, 2));
