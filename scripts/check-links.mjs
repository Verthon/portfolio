import { existsSync, readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { SITE } from '../astro.config.mjs'

const DIST = resolve('dist')
const HREF = /<a\b[^>]*?href="([^"]*)"/g
const CANONICAL = /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/g
const LOC = /<loc>([^<]*)<\/loc>/g

const SITEMAP = 'sitemap-0.xml'
const SITEMAP_EXEMPT = new Set([`${SITE}/404/`])

const hasExtension = (path) => /\.[a-z0-9]+$/i.test(path)

const violations = []

const check = (file, href, path) => {
  if (!path.endsWith('/')) {
    violations.push(`${file}: "${href}" is missing a trailing slash`)
    return
  }
  if (!existsSync(resolve(DIST, `.${path}index.html`))) {
    violations.push(`${file}: "${href}" does not resolve to a built page`)
  }
}

const canonicals = new Set()

for await (const file of glob('**/*.html', { cwd: DIST })) {
  const html = readFileSync(resolve(DIST, file), 'utf8')

  for (const [, href] of html.matchAll(CANONICAL)) canonicals.add(href)

  for (const [, href] of html.matchAll(HREF)) {
    const [path] = href.split(/[?#]/)

    if (path.startsWith(SITE)) {
      violations.push(
        `${file}: "${href}" is an absolute self-link — use a root-relative path`
      )
      const sitePath = path.slice(SITE.length) || '/'
      if (!hasExtension(sitePath)) check(file, href, sitePath)
      continue
    }

    if (!path.startsWith('/') || path.startsWith('//')) continue
    if (hasExtension(path)) continue

    check(file, href, path)
  }
}

const sitemapPath = resolve(DIST, SITEMAP)

if (!existsSync(sitemapPath)) {
  violations.push(`${SITEMAP}: not found in dist`)
} else {
  const xml = readFileSync(sitemapPath, 'utf8')
  const locs = new Set([...xml.matchAll(LOC)].map(([, loc]) => loc))

  for (const url of canonicals) {
    if (!locs.has(url) && !SITEMAP_EXEMPT.has(url)) {
      violations.push(`${SITEMAP}: canonical "${url}" has no <loc>`)
    }
  }

  for (const url of locs) {
    if (!canonicals.has(url)) {
      violations.push(`${SITEMAP}: <loc> "${url}" has no matching canonical`)
    }
  }
}

if (violations.length > 0) {
  console.error(
    `\nLink integrity failures (${violations.length}):\n${violations
      .map((v) => `  ${v}`)
      .join('\n')}\n`
  )
  process.exit(1)
}

console.log(
  `Links OK — ${canonicals.size} canonicals match sitemap (${relative('.', DIST)})`
)
