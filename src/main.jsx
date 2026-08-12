import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 React Router sarmallaması
import './index.css';
import App from './App.jsx';
import './i18n.js';
import config from './config.js';

// Tema sınıfını kütüphaneye ekle
const selectedTheme = config?.activeTheme || "sand";
const rootElement = window.document.documentElement;
rootElement.classList.add(`theme-${selectedTheme}`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);