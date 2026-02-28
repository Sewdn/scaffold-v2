#!/usr/bin/env node
/**
 * Writes eslint.config.js to current directory.
 * Uses @workspace/eslint-config/base (flat config).
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();
const content = `import { config } from '@workspace/eslint-config/base';
export default config;
`;

writeFileSync(resolve(cwd, 'eslint.config.js'), content);
