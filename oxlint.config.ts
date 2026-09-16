import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'oxc', 'jsx-a11y'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  jsPlugins: ['./tools/oxlint/astro-a11y.ts'],
  rules: {
    // `toSorted` is ES2023; tsconfig `lib` is es2022, so astro check rejects it.
    // Revisit together with raising `lib`.
    'unicorn/no-array-sort': 'off',
    'astro-a11y/alt-text': 'error',
    'astro-a11y/anchor-is-valid': 'error',
    'astro-a11y/anchor-has-content': 'error',
    'astro-a11y/heading-has-content': 'error',
    'astro-a11y/iframe-has-title': 'error',
    'astro-a11y/no-positive-tabindex': 'error',
    'astro-a11y/no-autofocus': 'error',
  },
  ignorePatterns: [
    'dist',
    '.astro',
    'node_modules',
    'playwright-report',
    '.astro',
  ],
  overrides: [
    {
      // Vendored PostHog install snippet — minified upstream, not ours to lint.
      files: ['src/components/analytics.astro'],
      rules: {
        'no-unused-expressions': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'number-arg-out-of-range': 'off',
        'unicorn/consistent-function-scoping': 'off',
      },
    },
  ],
})
