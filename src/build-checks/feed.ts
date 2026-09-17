import type { DistTree } from './links.ts'

export type FeedReport = {
  violations: string[]
  itemCount: number
}

export const FEED = 'rss.xml'

const ITEM = /<item>([\s\S]*?)<\/item>/g
const LINK = /<link>([^<]*)<\/link>/
const GUID = /<guid[^>]*>([^<]*)<\/guid>/
const PUBDATE = /<pubDate>([^<]*)<\/pubDate>/
const ALTERNATE =
  /<link[^>]+rel="alternate"[^>]+type="application\/rss\+xml"[^>]+href="([^"]*)"/

export const checkFeed = (
  tree: DistTree,
  contentEntryCount: number,
  site: string
): FeedReport => {
  const violations: string[] = []
  const xml = tree.get(FEED)

  if (xml === undefined) {
    return { violations: [`${FEED}: not found in dist`], itemCount: 0 }
  }

  if (!xml.trimStart().startsWith('<?xml')) {
    violations.push(`${FEED}: does not start with an XML declaration`)
  }

  const resolves = (url: string) => {
    if (!url.startsWith(site)) return false
    const path = url.slice(site.length) || '/'
    if (!path.endsWith('/')) return false
    return tree.has(`${path.slice(1)}index.html`)
  }

  const items = [...xml.matchAll(ITEM)].map(([, body]) => body)
  const dates: { pubDate: string; time: number }[] = []

  for (const [index, body] of items.entries()) {
    const link = body.match(LINK)?.[1]
    const guid = body.match(GUID)?.[1]
    const pubDate = body.match(PUBDATE)?.[1]

    if (!link) violations.push(`${FEED}: item ${index} has no <link>`)
    else if (!resolves(link)) {
      violations.push(
        `${FEED}: <link> "${link}" does not resolve to a built page`
      )
    }

    if (!guid) violations.push(`${FEED}: item ${index} has no <guid>`)
    else if (!resolves(guid)) {
      violations.push(
        `${FEED}: <guid> "${guid}" does not resolve to a built page`
      )
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

  if (items.length !== contentEntryCount) {
    violations.push(
      `${FEED}: ${items.length} items for ${contentEntryCount} content entries`
    )
  }

  let alternate: string | null = null
  for (const [file, html] of tree) {
    if (!file.endsWith('.html')) continue
    const href = html.match(ALTERNATE)?.[1]
    if (href) {
      alternate = href
      break
    }
  }

  if (!alternate) {
    violations.push(
      'no <link rel="alternate" type="application/rss+xml"> in dist'
    )
  } else if (!tree.has(alternate.slice(1))) {
    violations.push(`rel="alternate" href "${alternate}" is not a file in dist`)
  }

  return { violations, itemCount: items.length }
}
