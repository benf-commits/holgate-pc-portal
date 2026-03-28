import { describe, it, expect } from 'vitest'
import { searchAll, highlightMatch } from '../search'

const meetings = [
  { id: '2026-03-02', title: 'Monthly Meeting + AGM — March 2026', date: '2026-03-02', minutesItems: ['Canteen asbestos quote received', 'New member Holly Newton'], keyOutcomes: [{ text: 'AGM elections completed' }], pdfPath: 'docs/minutes/202603.pdf' },
  { id: '2025-12-01', title: 'Monthly Meeting — December 2025', date: '2025-12-01', minutesItems: ['Sandpit refurbishment approved'], keyOutcomes: [{ text: 'Insurance claim nearing completion' }] },
]
const decisions = [
  { id: 'd1', meetingId: '2026-03-02', title: 'Canteen cash handling policy', description: 'All money in safe must be logged', category: 'policy', result: 'carried' },
  { id: 'd2', meetingId: '2026-03-02', title: 'Class donation $1400', description: 'For teachers', category: 'spending', result: 'carried' },
]
const actions = [
  { id: 'a1', meetingId: '2026-03-02', description: 'Transfer canteen volunteer logs to Drive', owners: ['IP'], status: 'open' },
]
const documents = [
  { id: 'doc-1', title: 'Community Building Grant Strategy', description: 'Canteen asbestos removal grant application', type: 'strategy', path: 'docs/grants/cbg.md', tags: ['canteen', 'grants'] },
]

describe('searchAll', () => {
  it('returns all meetings in reverse date order when query is empty', () => {
    const results = searchAll({ query: '', filter: 'all', meetings, decisions, actions, documents })
    expect(results).toHaveLength(2)
    expect(results[0].type).toBe('meeting')
    expect(results[0].id).toBe('2026-03-02')
  })
  it('returns all items of filtered type when query is empty and filter is set', () => {
    const results = searchAll({ query: '', filter: 'actions', meetings, decisions, actions, documents })
    expect(results).toHaveLength(1)
    expect(results.every(r => r.type === 'action')).toBe(true)
  })
  it('searches across meeting titles', () => {
    const results = searchAll({ query: 'AGM', filter: 'all', meetings, decisions, actions, documents })
    expect(results.some(r => r.type === 'meeting' && r.id === '2026-03-02')).toBe(true)
  })
  it('searches across meeting minutesItems', () => {
    const results = searchAll({ query: 'sandpit', filter: 'all', meetings, decisions, actions, documents })
    expect(results.some(r => r.type === 'meeting' && r.id === '2025-12-01')).toBe(true)
  })
  it('searches across decision titles and descriptions', () => {
    const results = searchAll({ query: 'canteen', filter: 'all', meetings, decisions, actions, documents })
    expect(results.some(r => r.type === 'decision' && r.id === 'd1')).toBe(true)
  })
  it('searches across action descriptions', () => {
    const results = searchAll({ query: 'volunteer', filter: 'all', meetings, decisions, actions, documents })
    expect(results.some(r => r.type === 'action' && r.id === 'a1')).toBe(true)
  })
  it('searches across document titles, descriptions, and tags', () => {
    const results = searchAll({ query: 'grants', filter: 'all', meetings, decisions, actions, documents })
    expect(results.some(r => r.type === 'document' && r.id === 'doc-1')).toBe(true)
  })
  it('filters results by type', () => {
    const results = searchAll({ query: 'canteen', filter: 'decisions', meetings, decisions, actions, documents })
    expect(results.every(r => r.type === 'decision')).toBe(true)
  })
  it('is case-insensitive', () => {
    const results = searchAll({ query: 'CANTEEN', filter: 'all', meetings, decisions, actions, documents })
    expect(results.length).toBeGreaterThan(0)
  })
  it('ranks title matches above content matches', () => {
    const results = searchAll({ query: 'canteen', filter: 'all', meetings, decisions, actions, documents })
    const titleMatchIdx = results.findIndex(r => r.type === 'decision' && r.id === 'd1')
    const contentMatchIdx = results.findIndex(r => r.type === 'action' && r.id === 'a1')
    expect(titleMatchIdx).toBeLessThan(contentMatchIdx)
  })
})

describe('highlightMatch', () => {
  it('wraps matching text in mark tags', () => {
    const result = highlightMatch('Canteen cash handling', 'canteen')
    expect(result).toContain('<mark')
    expect(result).toContain('Canteen')
  })
  it('returns original text when no match', () => {
    expect(highlightMatch('No match here', 'xyz')).toBe('No match here')
  })
  it('handles empty query', () => {
    expect(highlightMatch('Some text', '')).toBe('Some text')
  })
})
