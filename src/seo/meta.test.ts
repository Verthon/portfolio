import { describe, expect, it } from 'vitest'

import { articleMeta, homeMeta, pageMeta } from './meta'

const post = {
  data: {
    title: 'Frontend test smells',
    description: 'A description of the article, long enough to be realistic.',
    date: new Date('2025-03-04'),
  },
}

describe('pageMeta', () => {
  const meta = pageMeta({
    title: 'Blog',
    description: 'All of my long-form thoughts on programming.',
    pathname: '/blog/',
  })

  it('suffixes the title', () => {
    expect(meta.title).toBe('Blog • sordyl.dev')
  })

  it('defaults the og fields to the page title and description', () => {
    expect(meta.ogTitle).toBe('Blog • sordyl.dev')
    expect(meta.ogDescription).toBe(
      'All of my long-form thoughts on programming.'
    )
  })

  it('prefers an explicit ogDescription', () => {
    const withOg = pageMeta({
      title: 'Blog',
      description: 'Long description.',
      ogDescription: 'Short social description.',
      pathname: '/blog/',
    })

    expect(withOg.ogDescription).toBe('Short social description.')
  })

  it('is a website, not an article, and carries no json-ld', () => {
    expect(meta.ogType).toBe('website')
    expect(meta.jsonLd).toBeUndefined()
  })

  it('builds an absolute canonical', () => {
    expect(meta.canonical).toBe('https://sordyl.dev/blog/')
  })
})

describe('articleMeta', () => {
  const meta = articleMeta(post, '/blog/frontend-test-smells/')

  it('suffixes the article title', () => {
    expect(meta.title).toBe('Frontend test smells • sordyl.dev')
  })

  it('falls back to the article title and description for og fields', () => {
    expect(meta.ogTitle).toBe('Frontend test smells • sordyl.dev')
    expect(meta.ogDescription).toBe(post.data.description)
  })

  it('prefers og_title and og_description from frontmatter', () => {
    const withOg = articleMeta(
      {
        data: {
          ...post.data,
          og_title: 'A punchier social title',
          og_description: 'A punchier social description.',
        },
      },
      '/blog/frontend-test-smells/'
    )

    expect(withOg.ogTitle).toBe('A punchier social title')
    expect(withOg.ogDescription).toBe('A punchier social description.')
  })

  it('is an article', () => {
    expect(meta.ogType).toBe('article')
  })

  it('builds an absolute canonical', () => {
    expect(meta.canonical).toBe('https://sordyl.dev/blog/frontend-test-smells/')
  })

  it('carries json-ld pointing at the canonical', () => {
    expect(meta.jsonLd).toMatchObject({
      '@type': 'BlogPosting',
      headline: 'Frontend test smells',
      url: 'https://sordyl.dev/blog/frontend-test-smells/',
      datePublished: '2025-03-04',
      dateModified: '2025-03-04',
    })
  })

  it('uses last_updated for dateModified when present', () => {
    const updated = articleMeta(
      { data: { ...post.data, last_updated: new Date('2025-06-01') } },
      '/blog/frontend-test-smells/'
    )

    expect(updated.jsonLd?.datePublished).toBe('2025-03-04')
    expect(updated.jsonLd?.dateModified).toBe('2025-06-01')
  })

  it('keeps the raw title out of the json-ld headline', () => {
    expect(meta.jsonLd?.headline).not.toContain('sordyl.dev')
  })
})

describe('canonical construction', () => {
  it('enforces a trailing slash', () => {
    expect(
      pageMeta({ title: 'Blog', description: 'd', pathname: '/blog' }).canonical
    ).toBe('https://sordyl.dev/blog/')
  })

  it('handles the root path', () => {
    expect(
      pageMeta({ title: 'Home', description: 'd', pathname: '/' }).canonical
    ).toBe('https://sordyl.dev/')
  })

  it('never emits a double slash', () => {
    expect(
      pageMeta({ title: 'Blog', description: 'd', pathname: '//blog//' })
        .canonical
    ).toBe('https://sordyl.dev/blog/')
  })
})

describe('homeMeta', () => {
  const meta = homeMeta({
    description: 'Writing about frontend architecture.',
    ogDescription: 'Frontend architecture.',
  })

  it('is brand-first with no domain suffix', () => {
    expect(meta.title).toBe('Krzysztof Sordyl • Architecture & DX at Scale')
    expect(meta.title.endsWith('• sordyl.dev')).toBe(false)
  })

  it('canonicals to the site root', () => {
    expect(meta.canonical).toBe('https://sordyl.dev/')
  })

  it('is a website and carries no json-ld', () => {
    expect(meta.ogType).toBe('website')
    expect(meta.jsonLd).toBeUndefined()
  })

  it('defaults ogTitle to the home title', () => {
    expect(meta.ogTitle).toBe('Krzysztof Sordyl • Architecture & DX at Scale')
    expect(meta.ogDescription).toBe('Frontend architecture.')
  })
})
