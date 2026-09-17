import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import { readdirSync, readFileSync } from 'node:fs'

import { SITE_URL as SITE } from './src/seo/site.ts'

export { SITE }

const SECTIONS = [
  ['blog', 'blog'],
  ['dev-bites', 'dev-bites'],
  ['observatory', 'observatory'],
]

const readDate = (file, key) =>
  readFileSync(file, 'utf8').match(new RegExp(`^${key}:\\s*(\\S+)`, 'm'))?.[1]

const lastmodByUrl = new Map()

for (const [dir, segment] of SECTIONS) {
  const base = `./src/content/${dir}`
  for (const slug of readdirSync(base, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue
    const file = `${base}/${slug.name}/index.mdx`
    const date = readDate(file, 'last_updated') ?? readDate(file, 'date')
    if (date) {
      lastmodByUrl.set(
        `${SITE}/${segment}/${slug.name}/`,
        new Date(date).toISOString()
      )
    }
  }
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  output: 'static',
  image: {
    layout: 'constrained',
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // avif q60 matches the compression of the hand-made WebPs this
        // replaced, at ~20% fewer bytes. See ADR 0005.
        avif: { quality: 60 },
        webp: { quality: 80 },
      },
    },
  },
  server: { port: 4173 },
  preview: { port: 4173 },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      defaultColor: false,
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      optimize: true,
    }),
    preact(),
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      serialize: (item) => ({
        url: item.url,
        lastmod: lastmodByUrl.get(item.url),
      }),
    }),
  ],
})
