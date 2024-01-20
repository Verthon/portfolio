import { describe, it, expect } from 'vitest'

import { createMediaService } from './media'

const matchMediaMock = (query: string) => {
  return {
    matches: query === '(min-width: 600px)',
    media: query,
    onchange: null,
  } as MediaQueryList
}

describe('media service', () => {
  it('should create media query list and check it against query', () => {
    const mediaService = createMediaService({ matchMedia: matchMediaMock })

    expect(
      mediaService.createMediaQueryList({ query: '(min-width: 600px)' })
    ).toStrictEqual({
      matches: true,
      media: '(min-width: 600px)',
      onchange: null,
    })
  })

  it('should handle empty arrays for media queries and values', () => {
    const mediaService = createMediaService({ matchMedia: matchMediaMock })

    expect(
      mediaService.getValueFromMediaQuery({
        defaultValue: 'default',
        mediaQueryLists: [],
        values: [],
      })
    ).toBe('default')
  })
})
