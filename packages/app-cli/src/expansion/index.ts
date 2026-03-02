/**
 * CLI expansion — compose all scaffold cli subcommands.
 * Each expansion command lives in its own file.
 */

import { Command } from 'commander';
import { addCommandSub } from './add-command.js';
import { addServiceSub } from './add-service.js';

/**
 * Commander command for `scaffold cli` — expand scaffolded CLI applications with commands and services.
 * Exported for registration in the main scaffold program.
 */
export const cliCommand = new Command('cli')
  .description('Expand scaffolded CLI applications with commands and services')
  .addCommand(addCommandSub)
  .addCommand(addServiceSub);
