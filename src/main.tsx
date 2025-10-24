import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PoemBox from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PoemBox />
  </StrictMode>,
)
