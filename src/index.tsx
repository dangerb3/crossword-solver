import React from 'react'
import ReactDOM from 'react-dom/client'

import { CssBaseline } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'

import App from './App'
import './i18n'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
    <Analytics />
  </React.StrictMode>
)
