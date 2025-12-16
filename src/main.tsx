import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './utils/protect'

// Update CSS variables for background images with base URL (in case HTML style wasn't applied)
if (typeof document !== 'undefined') {
  const baseUrl = import.meta.env.BASE_URL
  document.documentElement.style.setProperty('--bg-desktop', `url("${baseUrl}background/blissrainbow.jpg")`)
  document.documentElement.style.setProperty('--bg-mobile', `url("${baseUrl}background/blissrainbowmobile.jpg")`)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

