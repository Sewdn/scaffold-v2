#!/usr/bin/env node
/**
 * Patches package.json in cwd with name, and optional merge.
 * Usage: node patch-package-json.mjs <name> [--merge '{"key":"value"}']
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();
const pkgPath = resolve(cwd, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const [name] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (name) pkg.name = name;

for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '--merge' && process.argv[i + 1]) {
    const merged = JSON.parse(process.argv[i + 1]);
    if (merged.scripts && pkg.scripts) {
      Object.assign(pkg.scripts, merged.scripts);
      delete merged.scripts;
    }
    Object.assign(pkg, merged);
    break;
  }
}

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
