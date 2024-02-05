import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  vite: true,
  vitest: true,
  cypress: true,
  'github-actions': true,
  entry: [
    'src/routes/**/*.{tsx,ts}',
    'src/routes/blog/**/*.mdx',
    'src/common/components/router-head/*',
  ],
  ignore: [
    'src/entry.dev.tsx',
    'src/entry.preview.tsx',
    'src/entry.ssr.tsx',
    'src/root.tsx',
    'src/common/components/router-head/router-head.tsx',
    'adapters/static/vite.config.ts',
    'cypress/**/*',
    'src/**/*.spec.cy.tsx',
    // false positives below
    'src/blog/components/article-container/article-container.tsx',
    'src/blog/components/article-content/article-content.tsx',
    'src/blog/components/article-header/article-header.tsx',
    'src/blog/components/article-wrapper/article-wrapper.tsx',
  ],
}

export default config
