import { defineConfig } from 'astro/config'
import sonda from 'sonda/astro'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import { readdirSync, readFileSync } from 'node:fs'

import { SITE_URL as SITE } from './src/seo/site.ts'

const ANALYZE = process.env.ANALYZE === 'true'

const BROWSER_TARGET = ['chrome107', 'edge107', 'firefox104', 'safari16']

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
  vite: {
    build: {
      // The supported browser floor. This is what Vite's default
      // 'baseline-widely-available' resolved to in Vite 8 — pinned literally so
      // a Vite upgrade cannot raise the floor without showing up in a diff.
      // See ADR 0008.
      target: BROWSER_TARGET,
      sourcemap: ANALYZE,
    },
    css: { target: BROWSER_TARGET },
  },
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
    ...(ANALYZE
      ? [
          sonda({
            format: ['html', 'json'],
            filename: 'sonda_[env]',
            // A static build only fires `astro:build:setup` with
            // target 'server'. Without this, Sonda silently emits nothing.
            server: true,
            gzip: true,
            brotli: true,
            open: false,
          }),
        ]
      : []),
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
