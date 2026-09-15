import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['*.config.{ts,mjs}', 'scripts/**/*.mjs'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  ...eslintPluginAstro.configs.recommended,
  {
    // Vendored PostHog install snippet — minified upstream, not ours to lint.
    files: ['src/components/analytics.astro', 'src/components/analytics.astro/*'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
]
