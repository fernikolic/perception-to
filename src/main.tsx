import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Apply warning suppression BEFORE React loads
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = String(args[0] || '');
    // Filter out the exact Recharts defaultProps warnings you're seeing
    if ((message.includes('Warning: XAxis: Support for defaultProps will be removed') ||
         message.includes('Warning: YAxis: Support for defaultProps will be removed')) &&
        message.includes('Use JavaScript default parameters instead')) {
      return; // Suppress these specific warnings
    }
    originalError.apply(console, args);
  };
}

// Configure React Router future flags
const router = {
  basename: '/',
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter {...router}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);