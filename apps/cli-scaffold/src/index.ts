#!/usr/bin/env bun
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { projectCommand } from './commands/project.js';
import { initCommand } from './commands/init.js';
import { appCommand } from './commands/app.js';
import { serviceCommand } from './commands/service.js';
import { uiCommand } from './commands/ui.js';
import { componentCommand } from './commands/component.js';
import { moduleCommand } from './commands/module.js';
import { packageCommand } from './commands/package.js';
import { cliCommand } from '@workspace/app-cli';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pkg = require(join(__dirname, '..', 'package.json')) as { version?: string };

const program = new Command();

program
  .name('scaffold')
  .description('Command-orchestration CLI for TypeScript monorepos')
  .version(pkg.version ?? '0.0.0', '-v, --version', 'output the version number');

program.addCommand(createCommand);
program.addCommand(projectCommand);
program.addCommand(initCommand);
program.addCommand(appCommand);
program.addCommand(serviceCommand);
program.addCommand(uiCommand);
program.addCommand(componentCommand);
program.addCommand(moduleCommand);
program.addCommand(packageCommand);
program.addCommand(cliCommand);

program.parse();
