import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Meetings from './pages/Meetings'
import MeetingDetail from './pages/MeetingDetail'

function Placeholder({ title }) {
  return <div className="p-8 text-text-secondary">{title} — coming soon</div>
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="meetings/:id" element={<MeetingDetail />} />
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
