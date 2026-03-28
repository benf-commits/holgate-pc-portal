import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { filterActions, filterDecisions, filterMeetings } from '../filters'

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
