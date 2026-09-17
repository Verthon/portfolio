export type DistTree = Map<string, string>

export type LinkReport = {
  violations: string[]
  canonicalCount: number
}

const HREF = /<a\b[^>]*?href="([^"]*)"/g
const CANONICAL = /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/g
const LOC = /<loc>([^<]*)<\/loc>/g

export const SITEMAP = 'sitemap-0.xml'

const hasExtension = (path: string) => /\.[a-z0-9]+$/i.test(path)

const isBuiltPage = (tree: DistTree, path: string) =>
  tree.has(`${path.slice(1)}index.html`)

export const checkLinks = (tree: DistTree, site: string): LinkReport => {
  const violations: string[] = []
  const canonicals = new Set<string>()
  const exempt = new Set([`${site}/404/`])

  const check = (file: string, href: string, path: string) => {
    if (!path.endsWith('/')) {
      violations.push(`${file}: "${href}" is missing a trailing slash`)
      return
    }
    if (!isBuiltPage(tree, path)) {
      violations.push(`${file}: "${href}" does not resolve to a built page`)
    }
  }

  for (const [file, html] of tree) {
    if (!file.endsWith('.html')) continue

    for (const [, href] of html.matchAll(CANONICAL)) canonicals.add(href)

    for (const [, href] of html.matchAll(HREF)) {
      const [path] = href.split(/[?#]/)

      if (path.startsWith(site)) {
        violations.push(
          `${file}: "${href}" is an absolute self-link — use a root-relative path`
        )
        const sitePath = path.slice(site.length) || '/'
        if (!hasExtension(sitePath)) check(file, href, sitePath)
        continue
      }

      if (!path.startsWith('/') || path.startsWith('//')) continue
      if (hasExtension(path)) continue

      check(file, href, path)
    }
  }

  const report = { violations, canonicalCount: canonicals.size }
  const xml = tree.get(SITEMAP)

  if (xml === undefined) {
    violations.push(`${SITEMAP}: not found in dist`)
    return report
  }

  const locs = new Set([...xml.matchAll(LOC)].map(([, loc]) => loc))

  for (const url of canonicals) {
    if (!locs.has(url) && !exempt.has(url)) {
      violations.push(`${SITEMAP}: canonical "${url}" has no <loc>`)
    }
  }

  for (const url of locs) {
    if (!canonicals.has(url)) {
      violations.push(`${SITEMAP}: <loc> "${url}" has no matching canonical`)
    }
  }

  return report
}
