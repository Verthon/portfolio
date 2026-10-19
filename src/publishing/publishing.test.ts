import { describe, expect, it } from 'vitest'

import { isDraft, isVisibleTo } from './publishing'

describe('publishing', () => {
  describe('given an entry with no draft field', () => {
    const entry = {}

    it('is not a draft, so existing content needs no draft: false', () => {
      expect(isDraft(entry)).toBe(false)
    })

    it('is visible to production', () => {
      expect(isVisibleTo('production', entry)).toBe(true)
    })

    it('is visible in preview', () => {
      expect(isVisibleTo('preview', entry)).toBe(true)
    })
  })

  describe('given an entry marked draft: true', () => {
    const entry = { draft: true }

    it('is hidden from production, so it gets no route, listing, or feed item', () => {
      expect(isVisibleTo('production', entry)).toBe(false)
    })

    it('is visible in preview, so it can be read and linked while written', () => {
      expect(isVisibleTo('preview', entry)).toBe(true)
    })
  })

  describe('given an entry explicitly marked draft: false', () => {
    const entry = { draft: false }

    it('is published like any other entry', () => {
      expect(isVisibleTo('production', entry)).toBe(true)
    })
  })
})
