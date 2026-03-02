/**
 * scaffold cli add-command — Add a new command to a scaffolded CLI application.
 */

import { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  ensureProjectRoot,
  formatEntityName,
  resolveAppByPrefix,
  toPascalCase,
  validateCommandName,
} from '@workspace/core-utils';
import { renderTemplate } from '@workspace/core-utils';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPANSION_STUBS = join(__dirname, '..', '..', 'stubs', 'expansion');
const CLI_PREFIX = 'cli';

/**
 * Core logic: add a command to a CLI app. Exported for reuse (e.g. scaffold defaults).
 * @returns true if the command was created, false if it already existed
 */
export async function executeAddCommand(
  projectDir: string,
  appName: string,
  name: string,
  description?: string
): Promise<boolean> {
  const appDir = resolve(projectDir, 'apps', appName);
  const commandName = formatEntityName(validateCommandName(name), 'command');
  const commandClass = toPascalCase(commandName) + 'Command';
  const commandDescription = description || `${commandName} command`;

  const commandsDir = resolve(appDir, 'src', 'commands');
  await mkdir(commandsDir, { recursive: true });

  const commandPath = resolve(commandsDir, `${commandName}.ts`);
  if (existsSync(commandPath)) return false;

  const template = readFileSync(join(EXPANSION_STUBS, 'command.ts.stub'), 'utf-8');
  const rendered = renderTemplate(template, {
    commandName,
    commandClass,
    commandDescription,
  });
  await writeFile(commandPath, rendered);

  const importPath = `./${commandName}.js`;
  patchCommandsIndexForCommand(appDir, commandClass, importPath);
  return true;
}

function patchCommandsIndexForCommand(
  appDir: string,
  commandImportName: string,
  commandImportPath: string
): void {
  const commandsIndexPath = resolve(appDir, 'src', 'commands', 'index.ts');
  if (!existsSync(commandsIndexPath)) {
    console.error(
      `Error: ${commandsIndexPath} not found. Ensure the CLI app was scaffolded with the latest template.`
    );
    process.exit(1);
  }
  let content = readFileSync(commandsIndexPath, 'utf-8');

  if (content.includes(commandImportPath)) {
    return;
  }

  const importLine = `import { ${commandImportName} } from '${commandImportPath}';\n`;
  const addCommandLine = `  program.addCommand(${commandImportName});\n`;

  const lastImportMatch = content.match(/import .+ from .+;\n/g);
  const lastImport = lastImportMatch?.[lastImportMatch.length - 1];
  const insertImportAfter = lastImport ? content.indexOf(lastImport) + lastImport.length : 0;
  content = content.slice(0, insertImportAfter) + importLine + content.slice(insertImportAfter);

  const insertMarker = '// Commands registered below (scaffold cli add-command)';
  const markerIdx = content.indexOf(insertMarker);
  if (markerIdx !== -1) {
    const lineEnd = content.indexOf('\n', markerIdx);
    const insertAt = lineEnd !== -1 ? lineEnd + 1 : markerIdx + insertMarker.length;
    content = content.slice(0, insertAt) + addCommandLine + content.slice(insertAt);
  } else {
    content = content.replace(/\n}\s*$/, addCommandLine + '\n}');
  }

  writeFileSync(commandsIndexPath, content);
}

export const addCommandSub = new Command('add-command')
  .description('Add a new command to a scaffolded CLI application')
  .argument('<name>', 'Command name (kebab-case, e.g. add-user)')
  .option('-a, --app <name>', 'Target CLI app (required if project has multiple)')
  .option('-d, --description <text>', 'Command description', '')
  .action(async (name: string, options: { app?: string; description?: string }) => {
    const projectDir = process.cwd();
    ensureProjectRoot(projectDir);
    const appName = resolveAppByPrefix(projectDir, CLI_PREFIX, options.app);
    const commandName = formatEntityName(validateCommandName(name), 'command');
    const created = await executeAddCommand(projectDir, appName, name, options.description);
    if (!created) {
      console.log(`\nCommand already exists: apps/${appName}/src/commands/${commandName}.ts (skipped)\n`);
      return;
    }
    console.log(`\nCreated command ${commandName} in apps/${appName}/src/commands/`);
    console.log(`  File: src/commands/${commandName}.ts`);
    console.log(`  Registered in src/commands/index.ts\n`);
  });
