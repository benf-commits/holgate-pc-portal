import { describe, it, expect, vi } from 'vitest'
import { formatDate, daysUntil, daysSince, getAgingInfo } from '../dates'

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
