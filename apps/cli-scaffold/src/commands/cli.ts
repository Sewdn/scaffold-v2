import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { renderTemplate } from '../services/generator.js';
import { validateCommandName, validateCliServiceName } from '../utils/validation.js';
import { formatEntityName } from '../utils/entity-formatting.js';
import { toCamelCase, toPascalCase } from '../utils/formatting.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLI_EXPANSION_STUBS = join(__dirname, '..', 'app-types', 'cli', 'stubs', 'expansion');

/**
 * Find CLI apps in the project (apps/cli-*).
 */
function findCliApps(projectDir: string): string[] {
  const appsDir = resolve(projectDir, 'apps');
  if (!existsSync(appsDir)) return [];
  const entries = readdirSync(appsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith('cli-'))
    .map((e) => e.name);
}

function ensureProjectRoot(projectDir: string): void {
  const rootPkgPath = resolve(projectDir, 'package.json');
  if (!existsSync(rootPkgPath)) {
    console.error('Error: Not in a project root. Run scaffold create or scaffold init first.');
    process.exit(1);
  }
}

function resolveCliApp(projectDir: string, appName?: string): string {
  const cliApps = findCliApps(projectDir);
  if (cliApps.length === 0) {
    console.error('Error: No CLI apps found in this project. Add one with: scaffold app --type cli <name>');
    process.exit(1);
  }
  if (appName) {
    const full = appName.startsWith('cli-') ? appName : `cli-${appName}`;
    if (!cliApps.includes(full)) {
      console.error(`Error: CLI app "${full}" not found. Available: ${cliApps.join(', ')}`);
      process.exit(1);
    }
    return full;
  }
  if (cliApps.length === 1) {
    return cliApps[0];
  }
  console.error(`Error: Multiple CLI apps found. Specify one with --app: ${cliApps.join(', ')}`);
  process.exit(1);
}

/**
 * Patch src/commands/index.ts to add the command import and program.addCommand.
 * The scaffolded CLI uses a commands registry; the main index.ts stays static.
 */
function patchCommandsIndexForCommand(
  appDir: string,
  commandImportName: string,
  commandImportPath: string,
): void {
  const commandsIndexPath = resolve(appDir, 'src', 'commands', 'index.ts');
  if (!existsSync(commandsIndexPath)) {
    console.error(
      `Error: ${commandsIndexPath} not found. Ensure the CLI app was scaffolded with the latest template.`,
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

const addCommandSub = new Command('add-command')
  .description('Add a new command to a scaffolded CLI application')
  .argument('<name>', 'Command name (kebab-case, e.g. add-user)')
  .option('-a, --app <name>', 'Target CLI app (required if project has multiple)')
  .option('-d, --description <text>', 'Command description', '')
  .action(async (name: string, options: { app?: string; description?: string }) => {
    const projectDir = process.cwd();
    ensureProjectRoot(projectDir);
    const appName = resolveCliApp(projectDir, options.app);
    const appDir = resolve(projectDir, 'apps', appName);

    const commandName = formatEntityName(validateCommandName(name), 'command');
    const commandExportName = toCamelCase(commandName);
    const commandDescription = options.description || `${commandName} command`;

    const commandsDir = resolve(appDir, 'src', 'commands');
    await mkdir(commandsDir, { recursive: true });

    const commandPath = resolve(commandsDir, `${commandName}.ts`);
    const template = readFileSync(join(CLI_EXPANSION_STUBS, 'command.ts.stub'), 'utf-8');
    const rendered = renderTemplate(template, {
      commandName,
      commandExportName,
      commandDescription,
    });
    await writeFile(commandPath, rendered);

    const importPath = `./${commandName}.js`;
    patchCommandsIndexForCommand(appDir, `${commandExportName}Command`, importPath);

    console.log(`\nCreated command ${commandName} in apps/${appName}/src/commands/`);
    console.log(`  File: src/commands/${commandName}.ts`);
    console.log(`  Registered in src/commands/index.ts\n`);
  });

const addServiceSub = new Command('add-service')
  .description('Add a new service to the service layer of a scaffolded CLI application')
  .argument('<name>', 'Service name (kebab-case, e.g. user-service)')
  .option('-a, --app <name>', 'Target CLI app (required if project has multiple)')
  .action(async (name: string, options: { app?: string }) => {
    const projectDir = process.cwd();
    ensureProjectRoot(projectDir);
    const appName = resolveCliApp(projectDir, options.app);
    const appDir = resolve(projectDir, 'apps', appName);

    const serviceName = formatEntityName(validateCliServiceName(name), 'cli-service');
    const serviceExportName = toPascalCase(serviceName.replace(/-service$/, '')) + 'Service';

    const servicesDir = resolve(appDir, 'src', 'services');
    await mkdir(servicesDir, { recursive: true });

    const servicePath = resolve(servicesDir, `${serviceName}.ts`);
    const template = readFileSync(join(CLI_EXPANSION_STUBS, 'service.ts.stub'), 'utf-8');
    const rendered = renderTemplate(template, {
      serviceExportName,
    });
    await writeFile(servicePath, rendered);

    console.log(`\nCreated service ${serviceName} in apps/${appName}/src/services/`);
    console.log(`  File: src/services/${serviceName}.ts`);
    console.log(`  Export: create${serviceExportName}(), ${serviceExportName}\n`);
  });

export const cliCommand = new Command('cli')
  .description('Expand scaffolded CLI applications with commands and services')
  .addCommand(addCommandSub)
  .addCommand(addServiceSub);
