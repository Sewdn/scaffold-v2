import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactPerf from 'eslint-plugin-react-perf';
import pluginSonarJS from 'eslint-plugin-sonarjs';
import pluginJSXA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

/**
 * An enhanced ESLint configuration for Next.js projects with additional plugins for:
 * - React Hooks rules (pluginReactHooks)
 * - React Performance rules (pluginReactPerf)
 * - SonarJS quality rules (pluginSonarJS)
 * - Accessibility rules (pluginJSXA11y)
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  // Next.js Plugin
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  // React Hooks Plugin
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  // React Performance Plugin
  {
    plugins: {
      'react-perf': pluginReactPerf,
    },
    rules: {
      // Prevent creating new objects inline in render
      'react-perf/jsx-no-new-object-as-prop': 'warn',
      // Prevent creating new arrays inline in render
      'react-perf/jsx-no-new-array-as-prop': 'warn',
      // Prevent creating new functions inline in render
      'react-perf/jsx-no-new-function-as-prop': 'warn',
      // Prevent using JSX fragments unnecessarily
      'react-perf/jsx-no-jsx-as-prop': 'warn',
    },
  },
  // SonarJS Plugin
  {
    plugins: {
      sonarjs: pluginSonarJS,
    },
    rules: {
      ...pluginSonarJS.configs.recommended.rules,
      // Customize cognitive complexity threshold
      'sonarjs/cognitive-complexity': ['warn', 15],
      // Prevent excessive component complexity
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }],
    },
  },
  // JSX A11y Plugin
  {
    plugins: {
      'jsx-a11y': pluginJSXA11y,
    },
    rules: {
      ...pluginJSXA11y.configs.recommended.rules,
      // Ensure alt text for images
      'jsx-a11y/alt-text': 'warn',
      // Ensure anchor elements have content
      'jsx-a11y/anchor-has-content': 'warn',
      // Ensure aria-* attributes are valid
      'jsx-a11y/aria-props': 'warn',
      // Ensure interactive elements are accessible
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },
];

// Export the enhanced Next.js configuration
export default config;
