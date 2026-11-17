/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './certificates.css'
import App from './App'
import Dashboard from './dashboard/Dashboard'

const Page = window.location.pathname === '/dashboard' ? Dashboard : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
