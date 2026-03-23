import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

function Placeholder({ title }) {
  return <div className="p-8 text-text-secondary">{title} — coming soon</div>
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Placeholder title="Dashboard" />} />
          <Route path="meetings" element={<Placeholder title="Meetings" />} />
          <Route path="meetings/:id" element={<Placeholder title="Meeting Detail" />} />
          <Route path="actions" element={<Placeholder title="Actions" />} />
          <Route path="calendar" element={<Placeholder title="Calendar" />} />
          <Route path="decisions" element={<Placeholder title="Decisions" />} />
          <Route path="school" element={<Placeholder title="School" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
