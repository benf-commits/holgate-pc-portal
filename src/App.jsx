import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Parents from './pages/Parents'
import Now from './pages/Now'
import Archive from './pages/Archive'
import Committee from './pages/Committee'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Committee portal — standalone, own nav/footer */}
        <Route path="committee" element={<Committee />} />

        {/* Parents portal + legacy views */}
        <Route element={<Layout />}>
          <Route index element={<Parents />} />
          <Route path="committee/old" element={<Now />} />
          <Route path="committee/archive" element={<Archive />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
