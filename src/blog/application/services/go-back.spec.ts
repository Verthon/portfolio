import { describe, expect, it } from 'vitest'
import { generateGoBackMetadata } from './go-back'

describe('generateGoBackMetadata - to conditionally render go-back on blogposts', () => {
  it('should generate metadata for the article to render go-back nav button', () => {
    expect(
      generateGoBackMetadata({ pathname: '/blog/storybook-testing-overview/' })
    ).toEqual({ href: '/blog', shouldRender: true, text: 'Go back' })
  })

  it('should generate metadata to NOT render go-back on blog homepage', () => {
    expect(
      generateGoBackMetadata({ pathname: '/blog/' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })

    expect(
      generateGoBackMetadata({ pathname: '/blog' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })
  })
})
