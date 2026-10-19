import { describe, expect, it } from 'vitest'

import { checkDrafts, isDraftSource } from './drafts'
import type { DistTree } from './links'

const SITE = 'https://sordyl.dev'
const DRAFT = '/blog/series-part-2/'

const tree = (entries: Record<string, string>): DistTree =>
  new Map(Object.entries(entries))

const mdx = (frontmatter: string) =>
  `---\ntitle: Part 2\n${frontmatter}\n---\n\nBody that says draft: true in prose.\n`

describe('isDraftSource', () => {
  it('reads draft: true from the frontmatter', () => {
    expect(isDraftSource(mdx('draft: true'))).toBe(true)
  })

  it('treats a missing draft field as published', () => {
    expect(isDraftSource(mdx('tags: astro'))).toBe(false)
  })

  it('treats draft: false as published', () => {
    expect(isDraftSource(mdx('draft: false'))).toBe(false)
  })

  it('ignores draft: true when it appears only in the body', () => {
    expect(isDraftSource('---\ntitle: x\n---\n\ndraft: true\n')).toBe(false)
  })

  it('tolerates a trailing comment', () => {
    expect(isDraftSource(mdx('draft: true # until the series is ready'))).toBe(
      true
    )
  })
})

describe('checkDrafts', () => {
  describe('given a production build that left the draft out', () => {
    it('passes', () => {
      const { violations, draftCount } = checkDrafts(
        tree({
          'index.html': '<a href="/blog/series-part-1/">Part 1</a>',
          'blog/series-part-1/index.html': '',
          'sitemap-0.xml': `<loc>${SITE}/blog/series-part-1/</loc>`,
        }),
        [DRAFT],
        SITE
      )

      expect(violations).toEqual([])
      expect(draftCount).toBe(1)
    })
  })

  describe('given a page that queried the collection without the draft filter', () => {
    it('fails because the draft got a route', () => {
      const { violations } = checkDrafts(
        tree({ 'blog/series-part-2/index.html': '' }),
        [DRAFT],
        SITE
      )

      expect(violations).toEqual([
        `blog/series-part-2/index.html: draft "${DRAFT}" was built`,
      ])
    })

    it('fails because a listing links to it', () => {
      const { violations } = checkDrafts(
        tree({ 'blog/index.html': `<a href="${DRAFT}">Part 2</a>` }),
        [DRAFT],
        SITE
      )

      expect(violations).toEqual([
        `blog/index.html: references draft "${DRAFT}"`,
      ])
    })

    it('fails because the feed or sitemap carries its absolute URL', () => {
      const { violations } = checkDrafts(
        tree({
          'rss.xml': `<link>${SITE}${DRAFT}</link>`,
          'sitemap-0.xml': `<loc>${SITE}${DRAFT}</loc>`,
        }),
        [DRAFT],
        SITE
      )

      expect(violations).toEqual([
        `rss.xml: references draft "${DRAFT}"`,
        `sitemap-0.xml: references draft "${DRAFT}"`,
      ])
    })
  })

  describe('given a published post whose slug extends the draft slug', () => {
    it('does not mistake it for the draft', () => {
      const { violations } = checkDrafts(
        tree({
          'index.html': '<a href="/blog/series-part-2-appendix/">Appendix</a>',
        }),
        [DRAFT],
        SITE
      )

      expect(violations).toEqual([])
    })
  })
})
