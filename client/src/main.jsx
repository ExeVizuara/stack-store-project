import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from './services/SearchProvider.jsx';
import { StaticsProvider } from './services/StaticsProvider.jsx';
import { ProductProvider } from "./services/ProductProvider.jsx";
import { AuthProvider } from './services/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <StaticsProvider>
        <ProductProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ProductProvider>
      </StaticsProvider>
    </SearchProvider>
  </React.StrictMode>
)
