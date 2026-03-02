// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const generatedPath = join(__dirname, 'src', 'generated', 'scaffold-data.json');

function getAppTypeSidebarItems() {
	if (!existsSync(generatedPath)) return [{ label: 'App Types', slug: 'reference/app-types' }];
	const data = JSON.parse(readFileSync(generatedPath, 'utf-8'));
	const titles = {
		cli: 'CLI',
		backend: 'Backend',
		'frontend-nextjs': 'Frontend (Next.js)',
		'frontend-vite': 'Frontend (Vite)',
		'frontend-tanstack': 'Frontend (TanStack)',
		'mcp-server': 'MCP Server',
		'slide-deck': 'Slide Deck',
		documentation: 'Documentation',
	};
	return [
		{
			label: 'App Types',
			items: [
				{ label: 'Overview', slug: 'reference/app-types' },
				...data.appTypes.map((t) => ({
					label: titles[t.id] ?? t.id,
					slug: `reference/app-types/${t.id}`,
				})),
			],
		},
	];
}

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Scaffold CLI',
			description: 'Command-orchestration CLI for TypeScript monorepos with Turborepo and Bun',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com' },
			],
			sidebar: [
				{ label: 'Introduction', slug: 'introduction' },
				{ label: 'Quick Start', slug: 'guides/quick-start' },
				{
					label: 'Guides',
					items: [
						{ label: 'Create a Project', slug: 'guides/create-project' },
						{ label: 'Add Applications', slug: 'guides/add-apps' },
						{ label: 'Add Packages', slug: 'guides/add-packages' },
						{ label: 'Add Modules', slug: 'guides/add-modules' },
						{ label: 'Add Components', slug: 'guides/add-components' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI Commands', slug: 'reference/cli-commands' },
						...getAppTypeSidebarItems(),
						{ label: 'Project Structure', slug: 'reference/project-structure' },
						{ label: 'E2E Scenarios', slug: 'reference/e2e-scenarios' },
					],
				},
			],
		}),
	],
});
