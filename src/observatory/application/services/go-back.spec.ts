import { describe, expect, it } from 'vitest'
import { generateGoBackMetadata } from './go-back'

describe('generateGoBackMetadata - to conditionally render go-back on observatory', () => {
  it('should generate metadata for the observatory detail page to render go-back nav button', () => {
    expect(
      generateGoBackMetadata({ pathname: '/observatory/playwright-component-testing/' })
    ).toEqual({ href: '/observatory', shouldRender: true, text: 'Go back' })
  })

  it('should generate metadata to NOT render go-back on the observatory homepage', () => {
    expect(
      generateGoBackMetadata({ pathname: '/observatory/' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })

    expect(
      generateGoBackMetadata({ pathname: '/observatory' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })
  })
})
