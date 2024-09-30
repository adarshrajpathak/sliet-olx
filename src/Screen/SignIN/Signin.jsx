import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Import the useAuth hook

const LoginSignupForm = () => {
  const { setIsLoggedIn } = useAuth(); // Get setIsLoggedIn function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check credentials
    if (email === '2140147@sliet.ac.in' && password === '1234567') {
      setIsLoggedIn(true); // Update login state
      navigate('/'); // Redirect to the landing page
    } else {
      setError('Invalid email or password');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          onChange={(e) => setEmail(e.target.value)} 
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
          }}
        >
          Login
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginSignupForm;
