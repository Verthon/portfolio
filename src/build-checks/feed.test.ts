import { describe, expect, it } from 'vitest'

import { checkFeed, FEED } from './feed'
import type { DistTree } from './links'

const SITE = 'https://sordyl.dev'

const ALTERNATE = `<link rel="alternate" type="application/rss+xml" href="/${FEED}" />`

type Item = { link?: string; guid?: string; pubDate?: string }

const item = ({ link, guid, pubDate }: Item) =>
  [
    '<item>',
    link === undefined ? '' : `<link>${link}</link>`,
    guid === undefined ? '' : `<guid isPermaLink="true">${guid}</guid>`,
    pubDate === undefined ? '' : `<pubDate>${pubDate}</pubDate>`,
    '</item>',
  ].join('')

const feed = (...items: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><rss><channel>${items.join('')}</channel></rss>`

const post = (slug: string, pubDate: string) =>
  item({
    link: `${SITE}/blog/${slug}/`,
    guid: `${SITE}/blog/${slug}/`,
    pubDate,
  })

const tree = (entries: Record<string, string>): DistTree =>
  new Map(Object.entries(entries))

const withFeed = (xml: string, extra: Record<string, string> = {}) =>
  tree({
    [FEED]: xml,
    'index.html': ALTERNATE,
    'blog/a/index.html': '',
    'blog/b/index.html': '',
    ...extra,
  })

describe('checkFeed', () => {
  it('passes a well-formed feed', () => {
    const { violations, itemCount } = checkFeed(
      withFeed(
        feed(
          post('a', 'Tue, 10 Sep 2026 00:00:00 GMT'),
          post('b', 'Mon, 01 Sep 2026 00:00:00 GMT')
        )
      ),
      2,
      SITE
    )

    expect(violations).toEqual([])
    expect(itemCount).toBe(2)
  })

  it('flags a missing feed', () => {
    const { violations } = checkFeed(tree({ 'index.html': '' }), 0, SITE)
    expect(violations).toEqual([`${FEED}: not found in dist`])
  })

  it('flags a feed with no XML declaration', () => {
    const { violations } = checkFeed(withFeed('<rss></rss>'), 0, SITE)
    expect(violations).toContain(
      `${FEED}: does not start with an XML declaration`
    )
  })

  it('flags an item with no link', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(
          item({
            guid: `${SITE}/blog/a/`,
            pubDate: 'Tue, 10 Sep 2026 00:00:00 GMT',
          })
        )
      ),
      1,
      SITE
    )

    expect(violations).toContain(`${FEED}: item 0 has no <link>`)
  })

  it('flags a link that does not resolve to a built page', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(
          item({
            link: `${SITE}/blog/ghost/`,
            guid: `${SITE}/blog/a/`,
            pubDate: 'Tue, 10 Sep 2026 00:00:00 GMT',
          })
        )
      ),
      1,
      SITE
    )

    expect(violations).toContain(
      `${FEED}: <link> "${SITE}/blog/ghost/" does not resolve to a built page`
    )
  })

  it('flags a link that is missing its trailing slash', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(
          item({
            link: `${SITE}/blog/a`,
            guid: `${SITE}/blog/a/`,
            pubDate: 'Tue, 10 Sep 2026 00:00:00 GMT',
          })
        )
      ),
      1,
      SITE
    )

    expect(violations).toContain(
      `${FEED}: <link> "${SITE}/blog/a" does not resolve to a built page`
    )
  })

  it('flags an item with no guid', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(
          item({
            link: `${SITE}/blog/a/`,
            pubDate: 'Tue, 10 Sep 2026 00:00:00 GMT',
          })
        )
      ),
      1,
      SITE
    )

    expect(violations).toContain(`${FEED}: item 0 has no <guid>`)
  })

  it('flags an item with no pubDate', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(item({ link: `${SITE}/blog/a/`, guid: `${SITE}/blog/a/` }))
      ),
      1,
      SITE
    )

    expect(violations).toContain(`${FEED}: item 0 has no <pubDate>`)
  })

  it('flags an unparseable pubDate', () => {
    const { violations } = checkFeed(
      withFeed(feed(post('a', 'last Thursday'))),
      1,
      SITE
    )

    expect(violations).toContain(
      `${FEED}: <pubDate> "last Thursday" is not a valid date`
    )
  })

  it('flags items that are not sorted newest first', () => {
    const { violations } = checkFeed(
      withFeed(
        feed(
          post('a', 'Mon, 01 Sep 2026 00:00:00 GMT'),
          post('b', 'Tue, 10 Sep 2026 00:00:00 GMT')
        )
      ),
      2,
      SITE
    )

    expect(violations).toContain(
      `${FEED}: items are not sorted newest first — "Tue, 10 Sep 2026 00:00:00 GMT" follows "Mon, 01 Sep 2026 00:00:00 GMT"`
    )
  })

  it('flags a feed that omits a content entry', () => {
    const { violations } = checkFeed(
      withFeed(feed(post('a', 'Tue, 10 Sep 2026 00:00:00 GMT'))),
      5,
      SITE
    )

    expect(violations).toContain(`${FEED}: 1 items for 5 content entries`)
  })

  it('flags dist with no rel=alternate link', () => {
    const { violations } = checkFeed(
      tree({
        [FEED]: feed(post('a', 'Tue, 10 Sep 2026 00:00:00 GMT')),
        'index.html': '',
        'blog/a/index.html': '',
      }),
      1,
      SITE
    )

    expect(violations).toContain(
      'no <link rel="alternate" type="application/rss+xml"> in dist'
    )
  })

  it('flags a rel=alternate pointing at a file that is not in dist', () => {
    const { violations } = checkFeed(
      tree({
        [FEED]: feed(post('a', 'Tue, 10 Sep 2026 00:00:00 GMT')),
        'index.html':
          '<link rel="alternate" type="application/rss+xml" href="/atom.xml" />',
        'blog/a/index.html': '',
      }),
      1,
      SITE
    )

    expect(violations).toContain(
      'rel="alternate" href "/atom.xml" is not a file in dist'
    )
  })
})
