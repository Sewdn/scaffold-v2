#!/usr/bin/env node
/**
 * Creates eslint-config package (package.json + base.js) in cwd.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();

const pkg = {
  name: '@workspace/eslint-config',
  version: '0.0.1',
  type: 'module',
  private: true,
  exports: { './base': './base.js' },
  devDependencies: {
    '@eslint/js': '^9',
    'eslint-config-prettier': '^10.1.1',
    'eslint-plugin-only-warn': '^1.1.0',
    'eslint-plugin-turbo': '^2.5.0',
    'typescript-eslint': '^8.15.0',
  },
};

const baseJs = `import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo: turboPlugin },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },
  { plugins: { onlyWarn } },
  { ignores: ["dist/**"] },
]
`;

mkdirSync(cwd, { recursive: true });
writeFileSync(resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2));
writeFileSync(resolve(cwd, 'base.js'), baseJs);
