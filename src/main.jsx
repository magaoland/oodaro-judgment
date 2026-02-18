import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './JudgmentStyles.css'
import JudgmentApp from './JudgmentApp.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <JudgmentApp />
    </StrictMode>,
)
