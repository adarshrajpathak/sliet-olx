import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OTPInputPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    // Only allow input of 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
      setError('');
    } else {
      setError('OTP must be exactly 4 digits');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
    } else {
      setError('');
      console.log('OTP:', otp);
      
      // Handle OTP verification logic here
      navigate('/signin');
    }
  };

  const handleResendOtp = () => {
    // Logic to resend the OTP
    console.log('Resending OTP...');
    // You can also add an API call here to resend the OTP

    // Optionally, display a message or confirmation to the user
    alert('OTP has been resent. Please check your email or SMS.');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: { xs: '100%', sm: '400px' },
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Enter OTP
        </Typography>

        <TextField
          fullWidth
          label="4-digit OTP"
          variant="outlined"
          value={otp}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          inputProps={{
            maxLength: 4,
          }}
          sx={{ marginBottom: '1.5rem', textAlign: 'center' }}
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
            marginBottom: '1rem',
          }}
        >
          Verify OTP
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleResendOtp}
          sx={{
            color: '#3f51b5',
            borderColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#3f51b5',
              color: '#fff',
            },
          }}
        >
          Resend OTP
        </Button>
      </Box>
    </Box>
  );
};

export default OTPInputPage;
