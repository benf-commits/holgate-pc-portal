function matchScore(text, query) {
  if (!text || !query) return 0
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  if (!lower.includes(q)) return 0
  if (lower.startsWith(q)) return 3
  if (text.length < 100) return 2
  return 1
}

function searchMeeting(meeting, query) {
  let score = 0
  score = Math.max(score, matchScore(meeting.title, query) * 3)
  for (const item of meeting.minutesItems || []) {
    score = Math.max(score, matchScore(item, query))
  }
  for (const outcome of meeting.keyOutcomes || []) {
    score = Math.max(score, matchScore(outcome.text, query))
  }
  return score
}

function searchDecision(decision, query) {
  let score = 0
  score = Math.max(score, matchScore(decision.title, query) * 3)
  score = Math.max(score, matchScore(decision.description, query))
  return score
}

function searchAction(action, query) {
  return matchScore(action.description, query) * 2
}

function searchDocument(doc, query) {
  let score = 0
  score = Math.max(score, matchScore(doc.title, query) * 3)
  score = Math.max(score, matchScore(doc.description, query))
  for (const tag of doc.tags || []) {
    score = Math.max(score, matchScore(tag, query) * 2)
  }
  return score
}

export function searchAll({ query, filter, meetings, decisions, actions, documents }) {
  if (!query.trim() && (filter === 'all' || filter === 'meetings')) {
    return [...meetings]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((m) => ({ type: 'meeting', id: m.id, data: m, score: 0 }))
  }

  if (!query.trim()) {
    const typeMap = { decisions, actions, documents }
    const items = typeMap[filter] || []
    return items.map((item) => ({ type: filter.replace(/s$/, ''), id: item.id, data: item, score: 0 }))
  }

  const results = []

  if (filter === 'all' || filter === 'meetings') {
    for (const m of meetings) {
      const score = searchMeeting(m, query)
      if (score > 0) results.push({ type: 'meeting', id: m.id, data: m, score })
    }
  }
  if (filter === 'all' || filter === 'decisions') {
    for (const d of decisions) {
      const score = searchDecision(d, query)
      if (score > 0) results.push({ type: 'decision', id: d.id, data: d, score })
    }
  }
  if (filter === 'all' || filter === 'actions') {
    for (const a of actions) {
      const score = searchAction(a, query)
      if (score > 0) results.push({ type: 'action', id: a.id, data: a, score })
    }
  }
  if (filter === 'all' || filter === 'documents') {
    for (const doc of documents) {
      const score = searchDocument(doc, query)
      if (score > 0) results.push({ type: 'document', id: doc.id, data: doc, score })
    }
  }

  const typeOrder = { meeting: 0, decision: 1, action: 2, document: 3 }
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return typeOrder[a.type] - typeOrder[b.type]
  })

  return results
}

export function highlightMatch(text, query) {
  if (!query || !text) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<mark style="background:#fde8c8;padding:0 2px;border-radius:2px;">$1</mark>')
}
