// ProductListContext.jsx

import React, { createContext, useReducer, useContext } from 'react';
import ProductListReducer from './ProductListReducer';

// Initial state
const initialState = {
  products: [],
};

// Create ProductListContext
const ProductListContext = createContext();

// ProductListProvider component
export const ProductListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductListReducer, initialState);

  // Action creators
  const setProducts = (products) => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  };

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const removeProduct = (productId) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
  };

  return (
    <ProductListContext.Provider
      value={{ ...state, setProducts, addProduct, removeProduct }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

// Custom hook for consuming ProductListContext
export const useProductList = () => {
  return useContext(ProductListContext);
};
