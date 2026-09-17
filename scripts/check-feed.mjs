import { existsSync, readFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'
import { resolve } from 'node:path'
import { SITE } from '../astro.config.mjs'

const DIST = resolve('dist')
const FEED = 'rss.xml'

const ITEM = /<item>([\s\S]*?)<\/item>/g
const LINK = /<link>([^<]*)<\/link>/
const GUID = /<guid[^>]*>([^<]*)<\/guid>/
const PUBDATE = /<pubDate>([^<]*)<\/pubDate>/
const ALTERNATE =
  /<link[^>]+rel="alternate"[^>]+type="application\/rss\+xml"[^>]+href="([^"]*)"/

const violations = []
const feedPath = resolve(DIST, FEED)

if (!existsSync(feedPath)) {
  console.error(`\nFeed integrity failures (1):\n  ${FEED}: not found in dist\n`)
  process.exit(1)
}

const xml = readFileSync(feedPath, 'utf8')

if (!xml.trimStart().startsWith('<?xml')) {
  violations.push(`${FEED}: does not start with an XML declaration`)
}

const resolves = (url) => {
  if (!url.startsWith(SITE)) return false
  const path = url.slice(SITE.length) || '/'
  if (!path.endsWith('/')) return false
  return existsSync(resolve(DIST, `.${path}index.html`))
}

const items = [...xml.matchAll(ITEM)].map(([, body]) => body)
const dates = []

for (const [index, body] of items.entries()) {
  const link = body.match(LINK)?.[1]
  const guid = body.match(GUID)?.[1]
  const pubDate = body.match(PUBDATE)?.[1]

  if (!link) violations.push(`${FEED}: item ${index} has no <link>`)
  else if (!resolves(link)) {
    violations.push(`${FEED}: <link> "${link}" does not resolve to a built page`)
  }

  if (!guid) violations.push(`${FEED}: item ${index} has no <guid>`)
  else if (!resolves(guid)) {
    violations.push(`${FEED}: <guid> "${guid}" does not resolve to a built page`)
  }

  if (!pubDate) {
    violations.push(`${FEED}: item ${index} has no <pubDate>`)
    continue
  }

  const parsed = new Date(pubDate)
  if (Number.isNaN(parsed.getTime())) {
    violations.push(`${FEED}: <pubDate> "${pubDate}" is not a valid date`)
    continue
  }
  dates.push({ pubDate, time: parsed.getTime() })
}

for (let i = 1; i < dates.length; i += 1) {
  if (dates[i].time > dates[i - 1].time) {
    violations.push(
      `${FEED}: items are not sorted newest first — "${dates[i].pubDate}" follows "${dates[i - 1].pubDate}"`
    )
    break
  }
}

const entries = []
for await (const entry of glob('src/content/*/*/index.mdx')) entries.push(entry)

if (items.length !== entries.length) {
  violations.push(
    `${FEED}: ${items.length} items for ${entries.length} content entries`
  )
}

let alternate = null
for await (const file of glob('**/*.html', { cwd: DIST })) {
  const href = readFileSync(resolve(DIST, file), 'utf8').match(ALTERNATE)?.[1]
  if (href) {
    alternate = href
    break
  }
}

if (!alternate) {
  violations.push('no <link rel="alternate" type="application/rss+xml"> in dist')
} else if (!existsSync(resolve(DIST, `.${alternate}`))) {
  violations.push(`rel="alternate" href "${alternate}" is not a file in dist`)
}

if (violations.length > 0) {
  console.error(
    `\nFeed integrity failures (${violations.length}):\n${violations
      .map((v) => `  ${v}`)
      .join('\n')}\n`
  )
  process.exit(1)
}

console.log(`Feed OK — ${items.length} items in ${FEED}`)
