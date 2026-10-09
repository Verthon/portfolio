import { describe, expect, it } from 'vitest'

import { toDisplayDate, toIsoDate } from './format-date'

describe('toDisplayDate', () => {
  it('formats as day, short English month, year', () => {
    expect(toDisplayDate('2025-03-16')).toBe('16 Mar 2025')
    expect(toDisplayDate(new Date('2026-03-08'))).toBe('8 Mar 2026')
  })

  it('uses a three-letter September regardless of ICU data', () => {
    expect(toDisplayDate('2026-09-18')).toBe('18 Sep 2026')
  })

  it('reads the calendar date in UTC, not the build machine timezone', () => {
    expect(toDisplayDate('2025-01-01')).toBe('1 Jan 2025')
    expect(toDisplayDate('2025-12-31')).toBe('31 Dec 2025')
  })
})

describe('toIsoDate', () => {
  it('keeps the machine-readable value as YYYY-MM-DD', () => {
    expect(toIsoDate(new Date('2025-03-16'))).toBe('2025-03-16')
  })
})
