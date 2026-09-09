import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Browsers restore scroll on reload, which fights pinned ScrollTriggers.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
