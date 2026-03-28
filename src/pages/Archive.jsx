import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { meetings, decisions, actions, documents } from '../utils/data'
import { searchAll } from '../utils/search'
import FilterChips from '../components/FilterChips'
import SearchResult from '../components/SearchResult'

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'meetings', label: 'Meetings' },
  { value: 'decisions', label: 'Decisions' },
  { value: 'actions', label: 'Actions' },
  { value: 'documents', label: 'Documents' },
]

export default function Archive() {
  const [searchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'all'
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState(initialFilter)

  const results = useMemo(() => {
    return searchAll({ query, filter, meetings, decisions, actions, documents })
  }, [query, filter])

  return (
    <div className="p-8 space-y-5">
      <div className="bg-white rounded-lg shadow-[0_1px_3px_var(--color-card-shadow)]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search meetings, decisions, actions, documents..."
          className="w-full px-5 py-3.5 text-[15px] text-text-primary bg-transparent placeholder:text-text-secondary/50 focus:outline-none rounded-lg"
        />
      </div>

      <FilterChips options={filterOptions} active={filter} onChange={setFilter} />

      {query.trim() && (
        <div className="text-[13px] text-text-secondary">
          {results.length} {results.length === 1 ? 'result' : 'results'} for <strong className="text-text-primary">"{query}"</strong>
        </div>
      )}

      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-[0_1px_3px_var(--color-card-shadow)] p-8 text-center">
            <p className="text-[15px] text-text-secondary">
              {query.trim() ? 'No results found.' : 'No meetings recorded yet.'}
            </p>
          </div>
        ) : (
          results.map((result) => (
            <SearchResult key={`${result.type}-${result.id}`} result={result} query={query} />
          ))
        )}
      </div>
    </div>
  )
}
