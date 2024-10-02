// ThemeContext.jsx

import React, { createContext, useReducer, useContext } from 'react';
import ThemeReducer from './ThemeReducer';

// Initial state
const initialState = {
  theme: 'light', // 'light' or 'dark'
};

// Create ThemeContext
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  // Action creators
  const setLightTheme = () => {
    dispatch({ type: 'SET_LIGHT_THEME' });
  };

  const setDarkTheme = () => {
    dispatch({ type: 'SET_DARK_THEME' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ThemeContext.Provider
      value={{ ...state, setLightTheme, setDarkTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
