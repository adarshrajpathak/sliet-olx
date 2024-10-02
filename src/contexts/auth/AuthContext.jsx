// AuthContext.jsx

import React, { createContext, useReducer, useContext } from 'react';
import AuthReducer from './AuthReducer';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Action creators
  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
