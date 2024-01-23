import { describe, it, expect } from 'vitest';
import { generateNavLink } from './nav';

describe('nav - handles logic related to navigation component', () => {
  describe('generateNavLink', () => {
    it('should generate hash link', () => {
      expect(generateNavLink({ linkType: 'hash', slug: 'skills' })).toBe('#skills')
    })

    it('should generate regular link', () => {
      expect(generateNavLink({ linkType: 'regular', slug: 'blog' })).toBe('/blog')
    })
  })
})