import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getUpcomingEvents, getRecentUpdates, events, updates, reference } from '../data'

describe('data exports', () => {
  it('exports events array', () => {
    expect(Array.isArray(events)).toBe(true)
    expect(events.length).toBeGreaterThan(0)
    expect(events[0]).toHaveProperty('id')
    expect(events[0]).toHaveProperty('date')
    expect(events[0]).toHaveProperty('category')
  })

  it('exports updates array', () => {
    expect(Array.isArray(updates)).toBe(true)
    expect(updates.length).toBeGreaterThan(0)
    expect(updates[0]).toHaveProperty('id')
    expect(updates[0]).toHaveProperty('source')
  })

  it('exports reference object', () => {
    expect(reference).toHaveProperty('canteen')
    expect(reference).toHaveProperty('uniforms')
    expect(reference).toHaveProperty('contacts')
    expect(reference).toHaveProperty('links')
  })
})

describe('getUpcomingEvents', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-28T00:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns only future and today events', () => {
    const upcoming = getUpcomingEvents()
    upcoming.forEach((e) => {
      expect(new Date(e.date + 'T00:00:00').getTime()).toBeGreaterThanOrEqual(
        new Date('2026-03-28T00:00:00').getTime()
      )
    })
  })

  it('returns events sorted by date ascending', () => {
    const upcoming = getUpcomingEvents()
    for (let i = 1; i < upcoming.length; i++) {
      expect(upcoming[i].date >= upcoming[i - 1].date).toBe(true)
    }
  })
})

describe('getRecentUpdates', () => {
  it('returns updates sorted by date descending', () => {
    const recent = getRecentUpdates()
    for (let i = 1; i < recent.length; i++) {
      expect(recent[i].date <= recent[i - 1].date).toBe(true)
    }
  })

  it('respects the limit parameter', () => {
    const limited = getRecentUpdates(3)
    expect(limited.length).toBeLessThanOrEqual(3)
  })

  it('returns all when no limit given', () => {
    const all = getRecentUpdates()
    expect(all.length).toBe(updates.length)
  })
})
