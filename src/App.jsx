import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Meetings from './pages/Meetings'
import MeetingDetail from './pages/MeetingDetail'
import Actions from './pages/Actions'
import Calendar from './pages/Calendar'
import Decisions from './pages/Decisions'
import School from './pages/School'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="meetings/:id" element={<MeetingDetail />} />
          <Route path="actions" element={<Actions />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="decisions" element={<Decisions />} />
          <Route path="school" element={<School />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
