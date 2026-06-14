import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/index.scss'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(<App />)
