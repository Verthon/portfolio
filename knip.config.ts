import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: [
    'src/pages/**/*.{ts,tsx,astro}',
    'src/layouts/**/*.astro',
    // Build-output checks, run by the `build` script rather than imported.
    'scripts/*.ts',
  ],
  project: ['src/**/*.{tsx,ts,astro,mdx}', 'scripts/*.ts'],
  ignoreDependencies: [
    // Invoked as a string in playwright.config.ts, which knip can't see.
    'serve',
    // Named as a string in tools/oxlint/astro-a11y.ts parser options.
    '@typescript-eslint/parser',
  ],
  ignoreBinaries: [
    // apt package installed by the CI workflow, not an npm bin.
    'tidy',
  ],
}

export default config
