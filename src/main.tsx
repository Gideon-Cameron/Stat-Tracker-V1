import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TooltipProvider } from '@radix-ui/react-tooltip';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <TooltipProvider> {/* ✅ Wrap the whole app here */}
        <App />
      </TooltipProvider>
    </AuthProvider>
  </React.StrictMode>
);
