import { describe, expect, it } from 'vitest'

import { checkLinks, SITEMAP, type DistTree } from './links'

const SITE = 'https://sordyl.dev'

const sitemap = (...urls: string[]) =>
  `<urlset>${urls.map((u) => `<loc>${u}</loc>`).join('')}</urlset>`

const canonical = (url: string) => `<link rel="canonical" href="${url}" />`

const tree = (entries: Record<string, string>): DistTree =>
  new Map(Object.entries(entries))

describe('checkLinks', () => {
  it('passes a tree whose links resolve and whose canonicals match the sitemap', () => {
    const { violations, canonicalCount } = checkLinks(
      tree({
        'index.html': `${canonical(`${SITE}/`)}<a href="/blog/">Blog</a>`,
        'blog/index.html': canonical(`${SITE}/blog/`),
        [SITEMAP]: sitemap(`${SITE}/`, `${SITE}/blog/`),
      }),
      SITE
    )

    expect(violations).toEqual([])
    expect(canonicalCount).toBe(2)
  })

  it('flags an internal link with no trailing slash', () => {
    const { violations } = checkLinks(
      tree({
        'index.html': '<a href="/blog">Blog</a>',
        'blog/index.html': '',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toContain(
      'index.html: "/blog" is missing a trailing slash'
    )
  })

  it('flags an internal link that has no built page', () => {
    const { violations } = checkLinks(
      tree({
        'index.html': '<a href="/ghost/">Ghost</a>',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toContain(
      'index.html: "/ghost/" does not resolve to a built page'
    )
  })

  it('flags an absolute self-link even when the target exists', () => {
    const { violations } = checkLinks(
      tree({
        'index.html': `<a href="${SITE}/blog/">Blog</a>`,
        'blog/index.html': '',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toContain(
      `index.html: "${SITE}/blog/" is an absolute self-link — use a root-relative path`
    )
  })

  it('ignores external links and protocol-relative URLs', () => {
    const { violations } = checkLinks(
      tree({
        'index.html':
          '<a href="https://example.com/x">x</a><a href="//cdn.example.com/y">y</a>',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toEqual([])
  })

  it('ignores links to files rather than pages', () => {
    const { violations } = checkLinks(
      tree({
        'index.html': '<a href="/rss.xml">Feed</a>',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toEqual([])
  })

  it('strips a query string and fragment before resolving', () => {
    const { violations } = checkLinks(
      tree({
        'index.html': '<a href="/blog/?page=2#top">Blog</a>',
        'blog/index.html': '',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toEqual([])
  })

  it('flags a canonical that the sitemap does not list', () => {
    const { violations } = checkLinks(
      tree({
        'blog/index.html': canonical(`${SITE}/blog/`),
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toContain(
      `${SITEMAP}: canonical "${SITE}/blog/" has no <loc>`
    )
  })

  it('exempts the 404 canonical from the sitemap requirement', () => {
    const { violations } = checkLinks(
      tree({
        '404/index.html': canonical(`${SITE}/404/`),
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toEqual([])
  })

  it('flags a sitemap entry with no matching canonical', () => {
    const { violations } = checkLinks(
      tree({ 'index.html': '', [SITEMAP]: sitemap(`${SITE}/orphan/`) }),
      SITE
    )

    expect(violations).toContain(
      `${SITEMAP}: <loc> "${SITE}/orphan/" has no matching canonical`
    )
  })

  it('flags a missing sitemap and still reports the canonical count', () => {
    const { violations, canonicalCount } = checkLinks(
      tree({ 'index.html': canonical(`${SITE}/`) }),
      SITE
    )

    expect(violations).toEqual([`${SITEMAP}: not found in dist`])
    expect(canonicalCount).toBe(1)
  })

  it('does not scan non-HTML files for hrefs', () => {
    const { violations } = checkLinks(
      tree({
        'feed.xml': '<a href="/nope">x</a>',
        [SITEMAP]: sitemap(),
      }),
      SITE
    )

    expect(violations).toEqual([])
  })
})
