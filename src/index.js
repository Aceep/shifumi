import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './js/App.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
