import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from './layouts/AppLayout'

import { Auth, Landing } from './pages/Public'

import {
  Dashboard,
  Editor,
  Generator,
  History,
  LetterDetail,
  NotFound,
  Profile,
  Settings,
  Templates,
} from './pages/AppPages'

const authed = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
)

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth register />} />

      {/* Application pages */}
      <Route
        path="/dashboard"
        element={authed(<Dashboard />)}
      />

      <Route
        path="/generator"
        element={authed(<Generator />)}
      />

      <Route
        path="/editor"
        element={authed(<Editor />)}
      />

      <Route
        path="/templates"
        element={authed(<Templates />)}
      />

      {/* Letter history */}
      <Route
        path="/history"
        element={authed(<History />)}
      />

      {/* IMPORTANT: Individual letter */}
      <Route
        path="/history/:letterId"
        element={authed(<LetterDetail />)}
      />

      <Route
        path="/profile"
        element={authed(<Profile />)}
      />

      <Route
        path="/settings"
        element={authed(<Settings />)}
      />

      {/* 404 */}
      <Route
        path="/404"
        element={authed(<NotFound />)}
      />

      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  )
}