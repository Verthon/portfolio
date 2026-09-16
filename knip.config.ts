import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/pages/**/*.{ts,tsx,astro}', 'src/layouts/**/*.astro'],
  project: ['src/**/*.{tsx,ts,astro,mdx}'],
  ignoreDependencies: [
    // Invoked as a string in playwright.config.ts, which knip can't see.
    'serve',
    // Named as a string in tools/oxlint/astro-a11y.ts parser options.
    '@typescript-eslint/parser',
    // Unused until the RSS feed is built — docs/rss-feed-task.md.
    '@astrojs/rss',
  ],
  ignoreBinaries: [
    // apt package installed by the CI workflow, not an npm bin.
    'tidy',
  ],
}

export default config
