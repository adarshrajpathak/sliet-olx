// src/contexts/theme/ThemeContext.jsx

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import ThemeReducer from './ThemeReducer';

// Read initial theme from localStorage or default to 'light'
const localTheme = localStorage.getItem('theme');
const initialState = {
  theme: localTheme ? localTheme : 'light',
};

// Create ThemeContext
const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  // Persist theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

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
