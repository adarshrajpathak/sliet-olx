import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import './BuyPage.css';

const BuyClick = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Buy Request Sent!');
  };

  return (
    <Card className="form-container">
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom className="user-title">
          User
        </Typography>

        <Box className="image-section" mb={3}>
          <Box className="image-box">Picture</Box>
        </Box>

        <Box className="info-section">
          <Typography variant="body1">Price:</Typography>
          <Typography variant="body1">Hostel:</Typography>
          <Typography variant="body1">Name:</Typography>
          <Typography variant="body1">Description:</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} className="price-form">
          <Typography variant="subtitle1" gutterBottom>
            Price you wanted:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Min"
                variant="outlined"
                fullWidth
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max"
                variant="outlined"
                fullWidth
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="submit-btn"
            sx={{ marginTop: '20px' }}
          >
            Send Buy Request
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BuyClick;
