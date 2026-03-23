import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { filterActions, filterDecisions, filterMeetings, filterEvents } from '../filters'

const actions = [
  { id: 'a1', status: 'open', owners: ['CV'], dueDate: '2026-03-10', meetingId: '2026-03-02' },
  { id: 'a2', status: 'open', owners: ['LM'], dueDate: null, meetingId: '2026-03-02' },
  { id: 'a3', status: 'completed', owners: ['CV'], dueDate: null, meetingId: '2026-03-02', completedDate: '2026-03-15' },
]

describe('filterActions', () => {
  beforeAll(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-03-23')) })
  afterAll(() => { vi.useRealTimers() })

  it('filters by owner', () => {
    expect(filterActions(actions, { owner: 'CV' })).toHaveLength(2)
  })
  it('filters overdue only', () => {
    expect(filterActions(actions, { status: 'overdue' })).toHaveLength(1)
    expect(filterActions(actions, { status: 'overdue' })[0].id).toBe('a1')
  })
  it('filters open (non-overdue)', () => {
    expect(filterActions(actions, { status: 'open' })).toHaveLength(1)
    expect(filterActions(actions, { status: 'open' })[0].id).toBe('a2')
  })
})

const decisions = [
  { id: 'd1', title: 'Class donation', description: 'For teachers', category: 'spending', date: '2026-03-02' },
  { id: 'd2', title: 'Spriggy cut-off', description: 'Order time', category: 'policy', date: '2026-03-02' },
]

describe('filterDecisions', () => {
  it('filters by category', () => {
    expect(filterDecisions(decisions, { category: 'spending' })).toHaveLength(1)
  })
  it('filters by search query', () => {
    expect(filterDecisions(decisions, { query: 'teacher' })).toHaveLength(1)
  })
  it('search is case-insensitive', () => {
    expect(filterDecisions(decisions, { query: 'SPRIGGY' })).toHaveLength(1)
  })
})

const events = [
  { id: 'e1', type: 'meeting', date: '2026-05-04', status: 'confirmed' },
  { id: 'e2', type: 'pc-event', date: '2026-06-15', status: 'tentative' },
  { id: 'e3', type: 'school-event', date: '2026-05-06', status: 'confirmed' },
  { id: 'e4', type: 'pc-event', date: null, status: 'tentative' },
]

describe('filterEvents', () => {
  it('filters by type', () => {
    expect(filterEvents(events, { type: 'meeting' })).toHaveLength(1)
  })
  it('returns all when no filter', () => {
    expect(filterEvents(events, {})).toHaveLength(4)
  })
  it('filters by type pc-event', () => {
    expect(filterEvents(events, { type: 'pc-event' })).toHaveLength(2)
  })
})
