import { describe, expect, it } from 'vitest'
import { generateGoBackMetadata } from './go-back'

describe('generateGoBackMetadata - to conditionally render go-back on dev-bites', () => {
  it('should generate metadata for the dev-bite to render go-back nav button', () => {
    expect(
      generateGoBackMetadata({ pathname: '/dev-bites/vitest-timing-breakdown/' })
    ).toEqual({ href: '/dev-bites', shouldRender: true, text: 'Go back' })
  })

  it('should generate metadata to NOT render go-back on dev-bites homepage', () => {
    expect(
      generateGoBackMetadata({ pathname: '/dev-bites/' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })

    expect(
      generateGoBackMetadata({ pathname: '/dev-bites' })
    ).toEqual({ href: undefined, shouldRender: false, text: undefined })
  })
})
