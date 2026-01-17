
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const loader = document.getElementById('app-loader');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Remove loader once rendered
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    }
  } catch (error) {
    console.error("Critical error during app initialization:", error);
    if (loader) {
      loader.innerHTML = `<div style="color: #b8860b; font-family: sans-serif;">Failed to load application. Please refresh.</div>`;
    }
  }
} else {
  console.error("Target container 'root' not found.");
}
