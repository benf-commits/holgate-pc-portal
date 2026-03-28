import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDate, daysUntil, daysSince, getAgingInfo } from '../dates'
import { getEventGroup, isUpcoming, formatShortDate } from '../dates'

describe('formatDate', () => {
  it('formats ISO date to readable string', () => {
    expect(formatDate('2026-03-02')).toBe('2 March 2026')
  })
  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('')
  })
})

describe('daysUntil', () => {
  it('returns positive days for future date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23'))
    expect(daysUntil('2026-05-04')).toBe(42)
    vi.useRealTimers()
  })
  it('returns negative days for past date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23'))
    expect(daysUntil('2026-03-02')).toBe(-21)
    vi.useRealTimers()
  })
})

describe('getAgingInfo', () => {
  it('returns overdue for action with past dueDate', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23'))
    const result = getAgingInfo({ status: 'open', dueDate: '2026-03-10', meetingId: '2026-03-02' }, '2026-03-02')
    expect(result.status).toBe('overdue')
    expect(result.days).toBe(13)
    expect(result.label).toBe('13 days overdue')
    vi.useRealTimers()
  })
  it('returns open-since for action without dueDate', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23'))
    const result = getAgingInfo({ status: 'open', dueDate: null, meetingId: '2026-03-02' }, '2026-03-02')
    expect(result.status).toBe('open')
    expect(result.label).toBe('Open since 2 March 2026')
    vi.useRealTimers()
  })
  it('returns completed for completed actions', () => {
    const result = getAgingInfo({ status: 'completed', dueDate: null, completedDate: '2026-03-15' }, '2026-03-02')
    expect(result.status).toBe('completed')
    expect(result.label).toBe('Completed 15 March 2026')
  })
})

describe('formatShortDate', () => {
  it('formats a date as short weekday + day + month', () => {
    expect(formatShortDate('2026-03-27')).toBe('Fri 27 Mar')
  })

  it('returns empty string for null', () => {
    expect(formatShortDate(null)).toBe('')
  })
})

describe('isUpcoming', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-28T00:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true for today', () => {
    expect(isUpcoming('2026-03-28')).toBe(true)
  })

  it('returns true for a future date', () => {
    expect(isUpcoming('2026-04-02')).toBe(true)
  })

  it('returns false for a past date', () => {
    expect(isUpcoming('2026-03-27')).toBe(false)
  })
})

describe('getEventGroup', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "This Week" for a date in the current Mon-Sun week', () => {
    vi.useFakeTimers()
    // Saturday 28 March 2026 — week of Mon 23 - Sun 29
    vi.setSystemTime(new Date('2026-03-28T00:00:00'))
    expect(getEventGroup('2026-03-28')).toBe('This Week')
    expect(getEventGroup('2026-03-29')).toBe('This Week')
  })

  it('returns "Next Week" for a date in the following week', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-28T00:00:00'))
    // Mon 30 Mar - Sun 5 Apr
    expect(getEventGroup('2026-03-31')).toBe('Next Week')
    expect(getEventGroup('2026-04-02')).toBe('Next Week')
  })

  it('returns "Later This Term" for a date after next week but still in term', () => {
    vi.useFakeTimers()
    // Early in Term 1 so there are dates beyond next week but before term end (2 Apr)
    vi.setSystemTime(new Date('2026-02-10T00:00:00'))
    expect(getEventGroup('2026-03-27')).toBe('Later This Term')
  })

  it('returns "Next Term" for a date in a future term', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-28T00:00:00'))
    // Term 1 ends 2 Apr — May is Term 2
    expect(getEventGroup('2026-05-04')).toBe('Next Term')
  })
})
