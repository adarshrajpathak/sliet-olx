import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hostel, setHostel] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate email
    if (!email.endsWith('@sliet.ac.in')) {
      setError('Please enter a valid SLIET email address.');
    } else {
      setError(''); // Clear the error if email is valid
      // Proceed with login/signup logic
      console.log('Email:', email);
      console.log('Name:', name);
      console.log('Mobile:', mobile);
      console.log('Hostel:', hostel);
      // Add your login/signup logic here
    }
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
        component="form" // Making the Box act as a form
        onSubmit={handleSubmit} // Handle form submission
        sx={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '400px',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="SLIET Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          error={!!error} // Set error state
          helperText={error} // Show error message
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <TextField
          fullWidth
          label="Your Mobile"
          variant="outlined"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)} // Update mobile state
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <TextField
          fullWidth
          label="Hostel"
          variant="outlined"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)} // Update hostel state
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit" // Specify this button as a submit button
          sx={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginSignupForm;
