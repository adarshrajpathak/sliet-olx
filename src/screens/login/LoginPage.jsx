import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext';

const LoginPage = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State variables for API call
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New success message state
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Function to validate email while typing
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@sliet\.ac\.in$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid SLIET email address.');
    } else {
      setEmailError('');
    }
  };

  // Function to validate password
  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!email.endsWith('@sliet.ac.in')) {
      setEmailError('Please enter a valid SLIET email address.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Clear previous errors and messages
    setEmailError('');
    setPasswordError('');
    setApiError('');
    setSuccessMessage(''); // Clear previous success message

    const formData = {
      email,
      password,
    };

    try {
      setIsLoading(true);

      // Make API call
      const response = await axios.post('http://localhost:5050/api/v1/users/create-session', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      console.log('Login successful:', response.data);
      login({
        user: response.data.foundUser, // user details
        token: response.data.encodedToken, // JWT token
      });

      // Set success message
      setSuccessMessage('Login successful! Redirecting...');
      setOpenSnackbar(true);

      // Get the intended path from the state or default to home
      const redirectTo = location.state?.from || '/';
      // Redirect to home page after a short delay
      setTimeout(() => {
      // Navigate to the intended path after successful login
        navigate(redirectTo, { replace: true });
      }, 2000);
    } catch (err) {
      console.error('Login error:', err);

      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('An unexpected error occurred. Please try again later.');
      }

      setOpenSnackbar(true); // Open the Snackbar to display the error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Navigate to signup page for new users
  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  // Navigate to OTP verification page
  const handleNavigateToVerify = () => {
    navigate('/otp-regenerate');
  };

  return (
    <>
      <Navbar />
      <Box 
        className={`login-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={`login-form ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
        >
          <Typography variant="h5" align="center" gutterBottom className="login-title">
            Login
          </Typography>

          {/* Email Field */}
          <TextField
            fullWidth
            label="SLIET Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
            className="login-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            error={!!passwordError}
            helperText={passwordError}
            className="login-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* API Error or Success Message */}
          {(apiError || successMessage) && (
            <Typography variant="body2" color={successMessage ? 'primary' : 'error'} align="center" className="api-message">
              {successMessage || apiError}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          {/* Signup Hyperlink */}
          <Typography variant="body2" align="center" className="signup-link">
            Don't have an account? <span className="signup-hyperlink" onClick={handleNavigateToSignup}>Signup</span>
          </Typography>

          {/* Verify Email Hyperlink */}
          <Typography variant="body2" align="center" className="signup-link">
            Haven't Verified your Email? <span className="signup-hyperlink" onClick={handleNavigateToVerify}>Verify Email</span>
          </Typography>

          {/* Snackbar for API Messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={successMessage ? 'success' : 'error'} sx={{ width: '100%' }}>
              {successMessage || apiError}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
