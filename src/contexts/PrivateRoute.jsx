import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { useTheme } from './theme/ThemeContext';
import { Snackbar, Alert } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { user, token } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Open snackbar and trigger redirection if not authenticated
  useEffect(() => {
    if (!user || !token) {
      setOpenSnackbar(true);

      // Store the path the user was trying to access
      const intendedPath = location.pathname;

      // Show snackbar for a short duration and then redirect
      const timeoutId = setTimeout(() => {
        setOpenSnackbar(false);
        // Redirect to login and pass intended path as state
        navigate('/login', { replace: true, state: { from: intendedPath } });
      }, 2000);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [user, token, navigate, location]);

  // Apply classes based on the theme
  const pageClass = theme === 'dark' ? 'dark-mode' : 'light-mode';

  // Only render children if user is authenticated
  if (user && token) {
    return (
      <div className={`${pageClass}`} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    );
  }

  // If not authenticated, render a blank themed page while showing the snackbar
  return (
    <div className={`${pageClass}`} style={{ minHeight: '100vh' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          You need to log in to access this page.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PrivateRoute;
