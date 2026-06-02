import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../styles/index.css'; // Global Tailwind + Baseline variable injector

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);