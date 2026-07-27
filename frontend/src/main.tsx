import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './hooks/useTheme'
import { ToastProvider } from './components/ui'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><QueryClientProvider client={new QueryClient()}><ThemeProvider><ToastProvider><BrowserRouter><App /></BrowserRouter></ToastProvider></ThemeProvider></QueryClientProvider></React.StrictMode>,
)
