import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hostel, setHostel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  // Function to validate email while typing
  const validateEmail = (value) => {
    if (!value.endsWith('@sliet.ac.in')) {
      setError('Please enter a valid SLIET email address.');
    } else {
      setError(''); // Clear the error when valid email is entered
    }
  };

  // Function to validate password match
  const validatePassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(''); // Clear the error if passwords match
    }
  };

  // Validate mobile number
  const validateMobile = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setMobileError('Mobile number must be 10 digits.');
    } else {
      setMobileError(''); // Clear the error if valid
    }
  };

  // Validate name
  const validateName = (value) => {
    if (value.split(' ').length < 2) {
      setNameError('Name must be more than 1 word.');
    } else {
      setNameError(''); // Clear the error if valid
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Final validation on form submission
    if (!email.endsWith('@sliet.ac.in')) {
      setError('Please enter a valid SLIET email address.');
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Mobile number must be 10 digits.');
    } else if (name.split(' ').length < 2) {
      setNameError('Name must be more than 1 word.');
    } else {
      setError('');
      setPasswordError('');
      setMobileError('');
      setNameError(''); // Clear the errors if valid

      // Proceed with login/signup logic
      console.log('Email:', email);
      console.log('Name:', name);
      console.log('Mobile:', mobile);
      console.log('Hostel:', hostel);
      console.log('Password:', password);

      // Navigate to OTP page
      navigate('/otp');
    }
  };

  const handleExistingAccount = () => {
    navigate('/signin'); // Navigate to the login page for existing users
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: { xs: '90%', sm: '400px' },
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create an Account
        </Typography>

        <TextField
          fullWidth
          label="SLIET Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={!!error}
          helperText={error}
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '1.5rem' }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => validatePassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{ marginBottom: '1.5rem' }}
        />
        
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
          sx={{ marginBottom: '1.5rem' }}
        />

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
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <TextField
          fullWidth
          label="Hostel"
          variant="outlined"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          sx={{ marginBottom: '1.5rem' }}
        />
         
        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
            marginBottom: '1rem', // Add some space below the button
          }}
        >
          Register
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleExistingAccount}
          sx={{
            color: '#3f51b5',
            borderColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#3f51b5',
              color: '#fff',
            },
          }}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginSignupForm;
