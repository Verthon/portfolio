import { describe, expect, it } from 'vitest'

import { formatDuration } from './format'

describe('formatDuration', () => {
  it('reports sub-second durations in whole milliseconds', () => {
    expect(formatDuration(0)).toBe('0ms')
    expect(formatDuration(12.4)).toBe('12ms')
    expect(formatDuration(999)).toBe('999ms')
  })

  it('switches to seconds at one second', () => {
    expect(formatDuration(1000)).toBe('1.00s')
    expect(formatDuration(1240)).toBe('1.24s')
    expect(formatDuration(62_500)).toBe('62.50s')
  })

  it('does not emit a bare "1000ms"', () => {
    expect(formatDuration(999.6)).toBe('1000ms')
  })

  it('clamps nonsense input rather than printing NaN', () => {
    expect(formatDuration(Number.NaN)).toBe('0ms')
    expect(formatDuration(-5)).toBe('0ms')
  })
})
