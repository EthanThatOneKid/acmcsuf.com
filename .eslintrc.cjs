module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['svelte3', '@typescript-eslint'],
  env: { browser: true, node: true },
  ignorePatterns: ['*.cjs'],
  overrides: [
    { files: ['*.svelte'], processor: 'svelte3/svelte3' },
    { files: ['*.js'], rules: { '@typescript-eslint/explicit-module-boundary-types': 0 } },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
    'svelte3/ignore-styles': () => true, // ignore svelte styles since we use scss
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
    'prefer-arrow-callback': 'error',
    'no-nested-ternary': ['error'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
};
