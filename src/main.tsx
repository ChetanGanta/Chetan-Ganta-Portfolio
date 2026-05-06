/// <reference types="vite/client" />
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error logging for production debugging
if (import.meta.env.PROD) {
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global Error Detected:', { message, source, lineno, colno, error });
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
