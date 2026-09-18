import { describe, expect, it } from 'vitest'

import { checkJsonLd } from './json-ld.ts'

const page = (jsonLd: unknown) =>
  `<html><head><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head><body></body></html>`

const PERSON_ID = 'https://sordyl.dev/#person'

const personDefinition = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Krzysztof Sordyl',
  sameAs: ['https://github.com/Verthon'],
}

const article = (slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'A post',
  url: `https://sordyl.dev/blog/${slug}/`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://sordyl.dev/blog/${slug}/`,
  },
  author: { '@id': PERSON_ID },
})

describe('checkJsonLd', () => {
  it('passes when every reference resolves to exactly one definition', () => {
    const tree = new Map([
      ['index.html', page({ '@graph': [personDefinition] })],
      ['blog/a/index.html', page(article('a'))],
      ['blog/b/index.html', page(article('b'))],
    ])

    const { violations } = checkJsonLd(tree)

    expect(violations).toEqual([])
  })

  it('flags a reference that is never defined', () => {
    const tree = new Map([['blog/a/index.html', page(article('a'))]])

    const { violations } = checkJsonLd(tree)

    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain(PERSON_ID)
    expect(violations[0]).toContain('never defined')
  })

  it('flags the same @id defined on more than one page', () => {
    const tree = new Map([
      ['index.html', page({ '@graph': [personDefinition] })],
      ['about/index.html', page({ '@graph': [personDefinition] })],
      ['blog/a/index.html', page(article('a'))],
    ])

    const { violations } = checkJsonLd(tree)

    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain('defined on 2 pages')
  })

  it('allows a per-page node defined once on its own page', () => {
    const tree = new Map([
      ['index.html', page({ '@graph': [personDefinition] })],
      ['blog/a/index.html', page(article('a'))],
    ])

    const { violations } = checkJsonLd(tree)

    expect(violations).toEqual([])
  })

  it('reports invalid JSON rather than throwing', () => {
    const tree = new Map([
      [
        'blog/a/index.html',
        '<script type="application/ld+json">{ not json }</script>',
      ],
    ])

    const { violations } = checkJsonLd(tree)

    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain('not valid JSON')
  })

  it('ignores non-html entries in the tree', () => {
    const tree = new Map([['rss.xml', '<rss></rss>']])

    const { violations, definedCount } = checkJsonLd(tree)

    expect(violations).toEqual([])
    expect(definedCount).toBe(0)
  })

  it('counts definitions and references', () => {
    const tree = new Map([
      ['index.html', page({ '@graph': [personDefinition] })],
      ['blog/a/index.html', page(article('a'))],
    ])

    const { definedCount, referenceCount } = checkJsonLd(tree)

    expect(definedCount).toBe(2)
    expect(referenceCount).toBe(1)
  })
})
