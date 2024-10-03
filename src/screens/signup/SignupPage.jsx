import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
// import { useAuth } from '../../contexts/auth/AuthContext';

const SignupPage = () => {
  const { theme } = useTheme();
  // const { login } = useAuth();

  // State variables for form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hostel, setHostel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State variables for validation errors
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  const [hostelError, setHostelError] = useState('');

  // State variables for API call
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New success message state
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  // Function to validate email while typing
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@sliet\.ac\.in$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid SLIET email address.');
    } else {
      setError('');
    }
  };

  // Function to validate password match
  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  // Validate confirm password
  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // Validate mobile number
  const validateMobile = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setMobileError('Mobile number must be 10 digits.');
    } else {
      setMobileError('');
    }
  };

  // Validate name
  const validateName = (value) => {
    if (value.trim().split(' ').length < 2) {
      setNameError('Name must contain at least two words.');
    } else {
      setNameError('');
    }
  };

  const validateHostel = (value) => {
    if (!/^(BH|GH)-\d{2}$/.test(value)) {
      setHostelError('Hostel must be in the format BH-04 or GH-01');
    } else {
      setHostelError('');
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!email.endsWith('@sliet.ac.in')) {
      setError('Please enter a valid SLIET email address.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Mobile number must be 10 digits.');
      isValid = false;
    }

    if (name.trim().split(' ').length < 2) {
      setNameError('Name must contain at least two words.');
      isValid = false;
    }

    if (!/^(BH|GH)-\d{2}$/.test(hostel)) {
      setHostelError('Hostel must be in the format BH-04 or GH-01');
      isValid = false;
    } else {
      setHostelError('');
    }

    if (!isValid) {
      return;
    }

    setError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setMobileError('');
    setNameError('');
    setHostelError('');
    setApiError('');
    setSuccessMessage(''); // Clear previous success message

    const formData = {
      email,
      name,
      mobile,
      hostel,
      password,
      confirmPassword,
    };

    try {
      setIsLoading(true);

      const response = await axios.post('http://localhost:5050/api/v1/users/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('Signup successful:', response.data);

      const { email: userEmail, message, nextAction } = response.data;

      // login({ email: userEmail });

      // Set success message instead of apiError
      setSuccessMessage(message || 'Signup successful!');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/verify-otp', { state: { email: userEmail } });
      }, 2000);
    } catch (err) {
      console.error('Signup error:', err);

      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('An unexpected error occurred. Please try again later.');
      }

      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExistingAccount = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <Box className={`signup-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Box component="form" onSubmit={handleSubmit} className={`signup-form ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
          <Typography variant="h5" align="center" gutterBottom className="signup-title">
            Create an Account
          </Typography>

          {/* Form Fields */}
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
            error={!!error}
            helperText={error}
            className="signup-textfield"
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
            onChange={(e) => validatePassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            className="signup-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            className="signup-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Mobile Number Field */}
          <TextField
            fullWidth
            label="Your Mobile"
            variant="outlined"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              validateMobile(e.target.value);
            }}
            error={!!mobileError}
            helperText={mobileError}
            className="signup-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Name Field */}
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            error={!!nameError}
            helperText={nameError}
            className="signup-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Hostel Field */}
          <TextField
            fullWidth
            label="Hostel (e.g., BH-04)"
            variant="outlined"
            value={hostel}
            onChange={(e) => {
              setHostel(e.target.value);
              validateHostel(e.target.value);
            }}
            error={!!hostelError}
            helperText={hostelError}
            className="signup-textfield"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* API Error or Success Message */}
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

          {/* Register Button */}
          <Button fullWidth variant="contained" size="large" type="submit" disabled={isLoading} className="signup-button">
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>

          {/* Login Hyperlink */}
          <Typography variant="body2" align="center" className="login-link">
            Already have an account? <span className="login-hyperlink" onClick={handleExistingAccount}>Login</span>
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

export default SignupPage;
