import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Import the useAuth hook
const OTPInputPage = () => {
  const { setIsLoggedIn } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  

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

  const handlesendOtp = () => {
    navigate('/otp');
    
  };
  const handleExistingOtp = () => {
    navigate('/otp'); // Navigate to the login page for existing users
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
    

        <TextField
          fullWidth
          label="SLIET Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          sx={{ marginBottom: '1.5rem' }}
        />
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          onClick={handleExistingOtp}
          sx={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
            marginBottom: '1rem',
          }}
        >
          Already have otp
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handlesendOtp}
          sx={{
            color: '#3f51b5',
            borderColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#3f51b5',
              color: '#fff',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default OTPInputPage;
