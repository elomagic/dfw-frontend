import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config';
import {setAuthConfig} from "./Auth.tsx";

setAuthConfig({
    auth_uri: 'http://localhost:8080',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
