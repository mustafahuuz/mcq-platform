import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Determine base URL dynamically based on environment
const isProduction = import.meta.env.PROD;
const apiUrl = import.meta.env.VITE_API_URL 
  || (isProduction ? 'https://mcq-backend.onrender.com' : `http://${window.location.hostname}:8000`);

axios.defaults.baseURL = apiUrl;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
