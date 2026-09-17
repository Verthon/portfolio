import { describe, expect, it } from 'vitest'

import { buildTitle, homeTitle } from './title'

describe('buildTitle', () => {
  it('appends the site suffix to a section page title', () => {
    expect(buildTitle('Blog')).toBe('Blog • sordyl.dev')
    expect(buildTitle('Dev Bites')).toBe('Dev Bites • sordyl.dev')
    expect(buildTitle('Observatory')).toBe('Observatory • sordyl.dev')
  })

  it('appends the site suffix to an article title', () => {
    expect(buildTitle('Frontend test smells')).toBe(
      'Frontend test smells • sordyl.dev'
    )
  })

  it('trims surrounding whitespace', () => {
    expect(buildTitle('  Blog  ')).toBe('Blog • sordyl.dev')
  })

  it('does not append the suffix twice', () => {
    expect(buildTitle('Blog • sordyl.dev')).toBe('Blog • sordyl.dev')
  })

  it('rejects an empty title rather than emitting a bare suffix', () => {
    expect(() => buildTitle('')).toThrow()
    expect(() => buildTitle('   ')).toThrow()
  })
})

describe('homeTitle', () => {
  it('is brand-first with a descriptive tail and no domain suffix', () => {
    expect(homeTitle()).toBe('Krzysztof Sordyl • Architecture & DX at Scale')
  })

  it('does not end with the domain suffix', () => {
    expect(homeTitle().endsWith('• sordyl.dev')).toBe(false)
  })
})
