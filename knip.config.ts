import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  vite: true,
  vitest: true,
  prettier: true,
  'github-actions': true,
  typescript: true,
  playwright: true,
  entry: [
    'src/routes/index.tsx',
    'src/routes/404.tsx',
    'src/routes/dev-bites/{index,layout}.tsx',
    'src/routes/blog/{index,layout}.tsx',
    'src/routes/observatory/{index,layout}.tsx',
    'src/common/components/router-head/router-head.tsx',
    'src/entry.dev.tsx',
    'src/entry.preview.tsx',
    'src/entry.ssr.tsx',
    'src/root.tsx',
    'src/routes/service-worker.ts',
  ],
  project: ['src/**/*.{tsx,ts,mdx}'],
  ignoreDependencies: ['undici', '@qwik-client-manifest', '@qwik-city-plan'],
  ignore: [
    //false positives, files are imported in mdx files
    'src/blog/components/article-container/article-container.tsx',
    'src/blog/components/article-content/article-content.tsx',
    'src/blog/components/article-header/article-header.tsx',
    'src/blog/components/article-image/article-image.tsx',
    'src/blog/components/article-wrapper/article-wrapper.tsx',
    'src/dev-bites/components/dev-bite-container/dev-bite-container.tsx',
    'src/dev-bites/components/dev-bite-content/dev-bite-content.tsx',
    'src/dev-bites/components/dev-bite-header/dev-bite-header.tsx',
    'src/dev-bites/components/dev-bite-wrapper/dev-bite-wrapper.tsx',
    'src/common/components/alert/alert.tsx',
    'src/common/components/danger-icon/danger-icon.tsx',
    'src/common/components/info-icon/info-icon.tsx',
    'src/observatory/components/container/container.tsx',
    'src/observatory/components/content/content.tsx',
    'src/observatory/components/header/header.tsx',
    'src/observatory/components/wrapper/wrapper.tsx',
  ],
}

export default config
