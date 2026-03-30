import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Docs from './pages/Docs'
import Download from './pages/Download'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/download" element={<Download />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  )
}
