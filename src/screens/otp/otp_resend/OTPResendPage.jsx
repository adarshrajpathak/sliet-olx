import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../../axiosInstance';
import './OTPResendPage.css'; // Ensure this path is correct based on your project structure
import Navbar from '../../../components/navbar/Navbar';
import { useTheme } from '../../../contexts/theme/ThemeContext'; // Import the useTheme hook
// import { useAuth } from '../../../contexts/auth/AuthContext'; // Import the useAuth hook

const OTPResendPage = () => {
  const { theme } = useTheme();
  // const { login } = useAuth(); // Get login function from Auth Context

  // State variables for form fields
  const [email, setEmail] = useState('');

  // State variables for validation errors
  const [emailError, setEmailError] = useState('');

  // State variables for API call
  const [apiMessage, setApiMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  // Function to validate email while typing
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@sliet\.ac\.in$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid SLIET email address.');
    } else {
      setEmailError(''); // Clear the error when valid email is entered
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    // Final validation
    if (!email.endsWith('@sliet.ac.in')) {
      setEmailError('Please enter a valid SLIET email address.');
      return;
    }

    // Clear previous errors
    setEmailError('');
    setApiError('');
    setApiMessage('');

    // Prepare form data
    const formData = {
      email,
    };

    try {
      setIsLoading(true); // Start loading

      // Make API call to regenerate OTP
      const response = await axiosInstance.post('/otps/regenerate-otp', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful OTP resend
      console.log('OTP resend successful:', response.data);

      // Store user email in Auth Context
      // login({ email }); // Store email in context, not just from response

      // Set success message
      setApiMessage(response.data.message || 'OTP sent successfully! Please check your email or SMS.');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/verify-otp', { state: { email: email } });
      }, 2000);
    } catch (err) {
      console.error('OTP resend error:', err);

      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to resend OTP. Please try again later.');
      }

      setOpenSnackbar(true); // Open the Snackbar to display the error
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Handle Verify OTP Navigation
  const handleVerifyOtp = () => {
    if (!email.endsWith('@sliet.ac.in')) {
      setEmailError('Please enter a valid SLIET email address before verifying OTP.');
      return;
    }


    // Navigate to the OTP Verification page
    setTimeout(() => {
      navigate('/verify-otp');
    }, 2000);
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar />
      <Box 
        className={`otp-resend-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
      >
        <Box
          className={`otp-resend-form ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
        >
          <Typography variant="h5" align="center" gutterBottom className="otp-resend-title">
            Resend OTP
          </Typography>

          {/* Email Field */}
          <TextField
            fullWidth
            label="SLIET Email (@sliet.ac.in)"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
            className="otp-resend-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
            autoFocus
          />

          {/* API Success or Error Message */}
          {apiMessage && (
            <Typography 
              variant="body2" 
              color="primary" 
              align="center" 
              className="api-message"
            >
              {apiMessage}
            </Typography>
          )}
          {apiError && (
            <Typography 
              variant="body2" 
              color="error" 
              align="center" 
              className="api-error"
            >
              {apiError}
            </Typography>
          )}

          {/* Send OTP Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSendOtp}
            disabled={isLoading}
            className="send-otp-button"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
          </Button>

          {/* Verify OTP Hyperlink */}
          <Typography variant="body2" align="center" className="verify-link">
            Already have an OTP? <span className="verify-hyperlink" onClick={handleVerifyOtp}>Verify</span>
          </Typography>

          {/* Snackbar for API Messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={apiMessage ? 'success' : 'error'} 
              sx={{ width: '100%' }}
            >
              {apiMessage || apiError}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default OTPResendPage;
