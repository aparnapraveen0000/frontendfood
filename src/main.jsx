import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navheader from "./components/Header.jsx"
import Homepage from "./pages/homepage.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navheader/>
    <Homepage/>
  </StrictMode>,
)
