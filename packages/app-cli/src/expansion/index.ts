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

/** Metadata for docs generation. Extracted from Commander commands. */
export interface ExpansionCommandMeta {
  name: string;
  description: string;
  usage: string;
}

/**
 * Expansion command metadata for docs generation.
 * Derives from cliCommand subcommands.
 */
export function getCliExpansionCommands(): ExpansionCommandMeta[] {
  const cmdObj = cliCommand as unknown as { commands?: readonly Command[] };
  const subs = cmdObj.commands ?? [];
  return subs.map((cmd) => {
    const name = typeof cmd.name === 'function' ? cmd.name() : (cmd as { _name?: string })._name ?? '';
    const desc =
      typeof cmd.description === 'function'
        ? cmd.description()
        : (cmd as { _description?: string })._description ?? '';
    return {
      name,
      description: desc,
      usage: `scaffold cli ${name} [options]`,
    };
  });
}
