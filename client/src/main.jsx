import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from './components/providers/SearchProvider.jsx';
import { StaticsProvider } from './components/providers/StaticsProvider.jsx';
import { ProductProvider } from './components/providers/ProductProvider.jsx';
import { AuthProvider } from './components/providers/AuthProvider.jsx';

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
