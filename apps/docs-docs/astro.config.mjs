import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://scaffold-v2.docs',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    starlight({
      title: 'docs Documentation',
      description: 'Documentation for the docs project',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/images/logo.svg',
      },
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/yourcompany/scaffold-v2',
          icon: 'github',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/guide/introduction' },
            { label: 'Installation', link: '/guide/installation' },
            { label: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'api' },
        },
        {
          label: 'Reference Guides',
          autogenerate: { directory: 'reference' },
        },
      ],
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
        },
      },
      customCss: ['./src/styles/tailwind.css', './src/styles/custom.css'],
      head: [],
    }),
  ],
});
