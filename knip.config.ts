import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  vite: true,
  'github-actions': true,
  typescript: true,
  playwright: true,
  entry: ['src/pages/**/*.{ts,tsx,astro}', 'src/layouts/**/*.astro'],
  project: ['src/**/*.{tsx,ts,astro,mdx}'],
  ignoreDependencies: [
    // Imports inside fenced code samples in posts are prose, not dependencies.
    '@valibot/valibot',
    'vitest',
    // Invoked as a string in playwright.config.ts, which knip can't see.
    'serve',
  ],
  ignore: [
    // false positives, files are imported in mdx files
    'src/blog/components/article-content/article-content.tsx',
    'src/blog/components/article-header/article-header.tsx',
    'src/blog/components/article-wrapper/article-wrapper.tsx',
    'src/dev-bites/components/dev-bite-content/dev-bite-content.tsx',
    'src/dev-bites/components/dev-bite-header/dev-bite-header.tsx',
    'src/dev-bites/components/dev-bite-wrapper/dev-bite-wrapper.tsx',
    'src/common/components/alert/alert.tsx',
    'src/common/components/danger-icon/danger-icon.tsx',
    'src/common/components/info-icon/info-icon.tsx',
    'src/observatory/components/content/content.tsx',
    'src/observatory/components/header/header.tsx',
    'src/observatory/components/wrapper/wrapper.tsx',
  ],
}

export default config
