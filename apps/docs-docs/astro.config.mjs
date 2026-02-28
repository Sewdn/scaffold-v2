// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
						{ label: 'App Types', slug: 'reference/app-types' },
						{ label: 'Project Structure', slug: 'reference/project-structure' },
						{ label: 'E2E Scenarios', slug: 'reference/e2e-scenarios' },
					],
				},
			],
		}),
	],
});
