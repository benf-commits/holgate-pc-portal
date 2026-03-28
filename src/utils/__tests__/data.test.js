import { describe, it, expect } from 'vitest'
import { getPersonByInitials, getMeetingById, getActionsForMeeting, getDecisionsForMeeting, getDocumentsForMeeting, getNextMeeting } from '../data'

describe('getPersonByInitials', () => {
  it('returns person for known initials', () => {
    const cv = getPersonByInitials('CV')
    expect(cv.name).toBe('Catherine Vassilev')
    expect(cv.role).toBe('President')
  })
  it('returns fallback for unknown initials', () => {
    const unknown = getPersonByInitials('XX')
    expect(unknown.id).toBe('XX')
    expect(unknown.name).toBe('XX')
  })
})

describe('getMeetingById', () => {
  it('returns meeting for known ID', () => {
    const m = getMeetingById('2026-03-02')
    expect(m).toBeDefined()
    expect(m.title).toContain('March')
  })
  it('returns undefined for unknown ID', () => {
    expect(getMeetingById('9999-01-01')).toBeUndefined()
  })
})

describe('getActionsForMeeting', () => {
  it('returns actions linked to a meeting', () => {
    const result = getActionsForMeeting('2026-03-02')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(a => expect(a.meetingId).toBe('2026-03-02'))
  })
})

describe('getDecisionsForMeeting', () => {
  it('returns decisions linked to a meeting', () => {
    const result = getDecisionsForMeeting('2026-03-02')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(d => expect(d.meetingId).toBe('2026-03-02'))
  })
})

describe('getDocumentsForMeeting', () => {
  it('returns empty array when no documents exist', () => {
    const result = getDocumentsForMeeting('2026-03-02')
    expect(result).toEqual([])
  })
})

describe('getNextMeeting', () => {
  it('returns a scheduled meeting', () => {
    const next = getNextMeeting()
    expect(next).toBeDefined()
    expect(next.status).toBe('scheduled')
  })
})
