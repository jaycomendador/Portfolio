/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './dashboard/Dashboard.jsx'

const Page = window.location.pathname === '/contact' ? Contact : window.location.pathname === '/dashboard' ? Dashboard : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
