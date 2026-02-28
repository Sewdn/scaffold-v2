#!/usr/bin/env node
/**
 * Writes turbo.json to cwd.
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const turbo = {
  $schema: 'https://turbo.build/schema.json',
  globalDependencies: ['**/.env.*local'],
  ui: 'tui',
  tasks: {
    build: { dependsOn: ['^build'], outputs: ['.next/**', '!.next/cache/**', 'dist/**'] },
    lint: {},
    dev: { cache: false, persistent: true },
  },
};

writeFileSync(resolve(process.cwd(), 'turbo.json'), JSON.stringify(turbo, null, 2));
