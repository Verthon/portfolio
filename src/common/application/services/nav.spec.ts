import { describe, it, expect } from 'vitest'
import { generateNavLink, isNestedPathname } from './nav'

describe('nav - handles logic related to navigation component', () => {
  describe('generateNavLink', () => {
    it('should generate hash link', () => {
      expect(generateNavLink({ linkType: 'hash', slug: 'skills' })).toBe(
        '#skills'
      )
    })

    it('should generate regular link', () => {
      expect(generateNavLink({ linkType: 'regular', slug: 'blog' })).toBe(
        '/blog'
      )
    })
  })

  describe('isNestedPathname', () => {
    it('should detect nested pathnames', () => {
      expect(isNestedPathname({ pathname: '/blog/storybook-testing-overview/' })).toBe(true)
      expect(isNestedPathname({ pathname: '/dev-bites/vitest-timing-breakdown/' })).toBe(true)
      expect(isNestedPathname({ pathname: '/observatory/playwright-component-testing/' })).toBe(true)
    })

    it('should detect not nested pathnames', () => {
      expect(isNestedPathname({ pathname: '/blog/' })).toBe(false)
      expect(isNestedPathname({ pathname: '/dev-bites/' })).toBe(false)
      expect(isNestedPathname({ pathname: '/observatory/' })).toBe(false)
    })
  })
})
