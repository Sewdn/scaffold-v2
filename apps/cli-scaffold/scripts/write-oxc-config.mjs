#!/usr/bin/env node
/**
 * Writes OXC config files to project root.
 * Creates .oxlintrc.json and .oxfmtrc.json for oxlint and oxfmt.
 */
import { writeFileSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();

const oxlintrc = {
  $schema: "./node_modules/oxlint/configuration_schema.json",
  plugins: ["typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
    suspicious: "warn",
  },
  rules: {
    "unicorn/filename-case": "off",
    "unicorn/require-module-specifiers": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-sort": "off",
    "eslint/func-style": "off",
    "eslint/sort-imports": "off",
  },
  ignorePatterns: ["dist/**", "node_modules/**", ".next/**", "build/**"],
};

const oxfmtrc = {
  $schema: "./node_modules/oxfmt/configuration_schema.json",
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  ignorePatterns: ["dist/**", "node_modules/**", ".next/**", "build/**"],
};

writeFileSync(resolve(cwd, ".oxlintrc.json"), JSON.stringify(oxlintrc, null, 2));
writeFileSync(resolve(cwd, ".oxfmtrc.json"), JSON.stringify(oxfmtrc, null, 2));
