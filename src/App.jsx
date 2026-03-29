import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ParentsPortal from './pages/ParentsPortal'
import Committee from './pages/Committee'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<ParentsPortal />} />
        <Route path="committee" element={<Committee />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
