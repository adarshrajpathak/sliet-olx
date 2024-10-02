// contexts/index.js
import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';
import { ProductListProvider } from './product_list/ProductListContext';

// CombinedProviders component to wrap all context providers
const CombinedProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProductListProvider>
          {children}
        </ProductListProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default CombinedProviders;
