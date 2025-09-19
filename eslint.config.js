import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig: 'svelte.config.js',
      },
    },
  },
  {
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'prefer-arrow-callback': 'error',
      'no-nested-ternary': ['error'],
      'svelte/no-at-html-tags': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
  {
    ignores: [
      '.svelte-kit/',
      'build/',
      'dist/',
      '*.cjs',
      '.eslintrc.cjs.bak',
      'node_modules/',
      '**/.env',
      '**/.env.*',
      '!**/.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
    ],
  },
];
