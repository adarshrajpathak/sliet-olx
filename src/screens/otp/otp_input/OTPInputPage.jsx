import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import './OTPInputPage.css';
import Navbar from '../../../components/navbar/Navbar';
import { useTheme } from '../../../contexts/theme/ThemeContext';
// import { useAuth } from '../../../contexts/auth/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const OTPInputPage = () => {
  const { theme } = useTheme();
  // const { user } = useAuth();
  const location = useLocation();
  const email = location.state?.email;

  // State variables for form fields
  const [otp, setOtp] = useState('');

  // State variables for validation errors
  const [error, setError] = useState('');

  // State variables for API call
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Show/Hide OTP (for better UX)
  const [showOtp, setShowOtp] = useState(false);

  const navigate = useNavigate();

  // Function to validate OTP while typing
  const validateOtp = (value) => {
    const digitsOnly = value.replace(/\s/g, '');
    if (!/^\d{0,4}$/.test(digitsOnly)) {
      setError('OTP must be exactly 4 digits');
    } else {
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Final validation on form submission
    const digitsOnly = otp.replace(/\s/g, '');
    if (digitsOnly.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    // Clear previous errors and messages
    setError('');
    setApiError('');
    setSuccessMessage('');

    // Prepare form data
    const formData = {
      otp: digitsOnly,
      email: email,
    };

    try {
      setIsLoading(true);

      // Make API call to verify OTP
      const response = await axiosInstance.post('/otps/verify-otp', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('OTP verification successful:', response.data);

      // Display a success message
      setSuccessMessage('OTP verified successfully! Redirecting to Login.');
      setOpenSnackbar(true);

      // Navigate to the Login page after a short delay
      setTimeout(() => {
        navigate('/login', { state: { email: email } });
      }, 2000);
    } catch (err) {
      console.error('OTP verification error:', err);

      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('An unexpected error occurred. Please try again later.');
      }

      // Open the Snackbar to display the error
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      setApiError('User email not found. Please signup again.');
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsLoading(true);

      // Make API call to resend OTP
      const response = await axiosInstance.post('/otps/regenerate-otp', { email: email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Resend OTP successful:', response.data);

      // Display a success message
      setSuccessMessage('OTP has been resent. Please check your email or SMS.');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Resend OTP error:', err);

      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to resend OTP. Please try again later.');
      }

      // Open the Snackbar to display the error
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle OTP visibility
  const handleToggleShowOtp = () => {
    setShowOtp(!showOtp);
  };

  return (
    <>
      <Navbar />
      <Box 
        className={`otp-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={`otp-form ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
        >
          <Typography variant="h5" align="center" gutterBottom className="otp-title">
            Enter OTP
          </Typography>
            <Typography variant="body2" align="center" gutterBottom className="otp-instructions">
            Check SLIET Email Inbox, spam also
        </Typography>

          {/* OTP Field */}
          <TextField
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              validateOtp(e.target.value);
            }}
            fullWidth
            label="4-digit OTP"
            variant="outlined"
            error={!!error}
            helperText={error}
            className="otp-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle OTP visibility"
                    onClick={handleToggleShowOtp}
                    edge="end"
                  >
                    {showOtp ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoFocus
          />

          {/* API Error Message */}
          {(apiError || successMessage) && (
            <Typography 
              variant="body2" 
              color={successMessage ? 'primary' : 'error'} 
              align="center" 
              className="api-message"
            >
              {successMessage || apiError}
            </Typography>
          )}

          {/* Verify OTP Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            className="verify-button"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
          </Button>

          {/* Resend OTP Button */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="resend-button"
          >
            Resend OTP
          </Button>

          {/* Login Hyperlink */}
          <Typography variant="body2" align="center" className="login-link">
            Already have an account? <span className="login-hyperlink" onClick={() => navigate('/login')}>Login</span>
          </Typography>

          {/* Snackbar for API Messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={successMessage ? 'success' : 'error'} 
              sx={{ width: '100%' }}
            >
              {successMessage || apiError}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default OTPInputPage;
