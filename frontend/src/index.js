import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'animate.css/animate.min.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './i18n.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();