import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Nova Remote main entry point
// This mounts the entire voice remote UI and initializes the app.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
