// src/contexts/auth/AuthContext.jsx

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AuthReducer from './AuthReducer';

// Read initial state from localStorage
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const localState = localStorage.getItem('authState');
if (localState) {
  const parsedState = JSON.parse(localState);
  initialState.isAuthenticated = parsedState.isAuthenticated;
  initialState.user = parsedState.user;
  initialState.token = parsedState.token;
}

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Persist auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  // Action creators for login and logout
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
