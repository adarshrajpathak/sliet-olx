import React, { createContext, useReducer, useContext } from 'react';
import AuthReducer from './AuthReducer';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null, // This will store user details including name
};

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Action creators for login and logout
  const login = (userData) => {
    // Log the received userData to make sure it contains foundUser and user_name
    console.log("login userData: ", userData);

    // Dispatching userData correctly
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
