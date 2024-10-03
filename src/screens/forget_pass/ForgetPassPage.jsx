// src/pages/reset-password/ResetPasswordPage.jsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../axiosInstance';
import './ForgetPassPage.css'; // Ensure this path is correct based on your project structure
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext'; // Import the useTheme hook
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPasswordPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false); // To check if OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false); // To check if OTP has been verified
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Separate error states
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Show/Hide OTP
  const [showOtp, setShowOtp] = useState(false);

  // Function to validate email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@sliet\.ac\.in$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid SLIET email address.');
    } else {
      setEmailError('');
    }
  };

  // Function to validate OTP
  const validateOtp = (value) => {
    const digitsOnly = value.replace(/\s/g, '');
    if (!/^\d{0,4}$/.test(digitsOnly)) {
      setOtpError('OTP must be exactly 4 digits.');
    } else {
      setOtpError('');
    }
  };

  // Function to validate password
  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }

    // Check if passwords match whenever password changes
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Function to validate confirm password
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    if (!email.endsWith('@sliet.ac.in')) {
      setEmailError('Please enter a valid SLIET email address.');
      return;
    }

    // Clear previous errors
    setEmailError('');
    setApiError('');
    setApiMessage('');

    const formData = {
      email,
    };

    try {
      setIsLoading(true);

      // API call to send OTP
      const response = await axiosInstance.post(
        '/otps/forgot-password',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('OTP sent:', response.data);
      setApiMessage(response.data.message || 'OTP sent successfully! Please check your email.');
      setOpenSnackbar(true);
      setOtpSent(true);
    } catch (err) {
      console.error('OTP send error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to send OTP. Please try again later.');
      }
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    // Validate OTP
    const digitsOnly = otp.replace(/\s/g, '');
    if (digitsOnly.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      return;
    }

    // Clear previous errors
    setOtpError('');
    setApiError('');
    setApiMessage('');

    const formData = {
      email,
      otp: digitsOnly,
    };

    try {
      setIsLoading(true);

      // API call to verify OTP
      const response = await axiosInstance.post(
        '/otps/verify-reset-otp',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('OTP verified:', response.data);
      setApiMessage(response.data.message || 'OTP verified successfully!');
      setOpenSnackbar(true);
      setOtpVerified(true);
    } catch (err) {
      console.error('OTP verification error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to verify OTP. Please try again.');
      }
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      setApiError('Email not found. Please enter your email again.');
      setOpenSnackbar(true);
      return;
    }

    // Clear previous errors and messages
    setApiError('');
    setApiMessage('');

    const formData = {
      email,
    };

    try {
      setIsLoading(true);

      // API call to resend OTP
      const response = await axiosInstance.post(
        '/otps/forgot-password',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Resend OTP successful:', response.data);

      // Display a success message
      setApiMessage('A new OTP has been sent. Please check your email.');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Resend OTP error:', err);

      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to resend OTP. Please try again later.');
      }

      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async () => {
    // Clear previous errors
    setPasswordError('');
    setConfirmPasswordError('');
    setApiError('');
    setApiMessage('');

    // Validate password and confirm password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
    }

    // If there are validation errors, do not proceed
    if (passwordError || confirmPasswordError) {
      return;
    }

    const formData = {
      email,
      otp,
      password,
    };

    try {
      setIsLoading(true);

      // API call to reset password
      const response = await axiosInstance.post(
        '/users/reset-password',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful response
      console.log('Password reset successful:', response.data);
      setApiMessage(response.data.message || 'Password reset successfully!');
      setOpenSnackbar(true);

      // Optionally navigate to login page after reset
      setTimeout(() => {
        navigate('/login', { state: { email: email } });
      }, 2000);
    } catch (err) {
      console.error('Password reset error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to reset password. Please try again.');
      }
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Toggle OTP visibility
  const handleToggleShowOtp = () => {
    setShowOtp(!showOtp);
  };

  return (
    <>
      <Navbar />
      <Box className={`reset-pass-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Box className={`reset-pass-form ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
          <Typography variant="h5" align="center" gutterBottom className="reset-pass-title">
            Reset Password
          </Typography>

          {/* Email Field and Send OTP Button */}
          {!otpSent && (
            <Box className="email-otp-container">
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
                className="reset-pass-textfield"
                InputProps={{
                  className: theme === 'dark' ? 'dark-mode-input' : '',
                }}
                autoFocus
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleSendOtp}
                disabled={isLoading || !email || !!emailError}
                className={`send-otp-button ${theme === 'dark' ? 'dark-mode-button' : 'light-mode-button'}`}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
              </Button>
            </Box>
          )}

          {/* OTP Verification Field */}
          {otpSent && !otpVerified && (
            <>
              <Typography variant="body2" align="center" gutterBottom className="otp-instructions">
                Check your SLIET email inbox and spam folder for the OTP.
              </Typography>
              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  validateOtp(e.target.value);
                }}
                error={!!otpError}
                helperText={otpError}
                className="reset-pass-textfield"
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
                  type: showOtp ? 'text' : 'password',
                }}
                autoFocus
              />

              {/* Verify OTP Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleVerifyOtp}
                disabled={isLoading || !otp || !!otpError}
                className={`verify-otp-button ${theme === 'dark' ? 'dark-mode-button' : 'light-mode-button'}`}
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
            </>
          )}

          {/* Password Reset Fields */}
          {otpVerified && (
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                error={!!passwordError}
                helperText={passwordError}
                className="reset-pass-textfield"
                InputProps={{
                  className: theme === 'dark' ? 'dark-mode-input' : '',
                }}
                autoFocus
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                className="reset-pass-textfield"
                InputProps={{
                  className: theme === 'dark' ? 'dark-mode-input' : '',
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleResetPassword}
                disabled={
                  isLoading ||
                  !password ||
                  !confirmPassword ||
                  !!passwordError ||
                  !!confirmPasswordError
                }
                className={`reset-password-button ${theme === 'dark' ? 'dark-mode-button' : 'light-mode-button'}`}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
              </Button>
            </>
          )}

          {/* API Success or Error Message */}
          {apiMessage && (
            <Typography variant="body2" color="primary" align="center" className="api-message">
              {apiMessage}
            </Typography>
          )}
          {apiError && (
            <Typography variant="body2" color="error" align="center" className="api-error">
              {apiError}
            </Typography>
          )}

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

export default ResetPasswordPage;
