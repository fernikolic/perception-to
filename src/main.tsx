import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Force dark mode by default
document.documentElement.classList.add('dark');

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);