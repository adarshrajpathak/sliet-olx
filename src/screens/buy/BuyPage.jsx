// src/screens/products/BuyPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import axiosInstance from '../../axiosInstance';
import './BuyPage.css';
import { useAuth } from '../../contexts/auth/AuthContext';
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useNavigate } from 'react-router-dom';

const BuyPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [minBid, setMinBid] = useState('');
  const [maxBid, setMaxBid] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {theme} = useTheme();

  useEffect(() => {
    // Fetch product details from the backend
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
        setApiMessage('Failed to load product details.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!minBid || !maxBid) {
      setApiMessage('Please enter both minimum and maximum bid prices.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsSubmitting(false);
      return;
    }

    if (parseFloat(maxBid) < parseFloat(minBid)) {
      setApiMessage('Maximum bid must be greater than or equal to minimum bid.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Send bid data to the backend
      const response = await axiosInstance.post(
        '/products/buy',
        {
          productId: id,
          buyer_min: parseFloat(minBid),
          buyer_max: parseFloat(maxBid),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setApiMessage('Your bid has been placed successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setMinBid('');
      setMaxBid('');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error placing bid:', error);
      setApiMessage(error.response?.data?.message || 'Failed to place bid.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box className="buy-page-loading">
          <CircularProgress />
        </Box>
      </>
    );
  }

  // Helper function to mask user name (show only first 2 letters)
  const maskUserName = (userName) => {
    if (!userName || userName.length <= 2) return userName;
    const maskedPart = '*'.repeat(userName.length - 2);
    return `${userName.substring(0, 2)}${maskedPart}`;
  };

  return (
    <>
      <Navbar />
      <Box className={`buy-page-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        {/* Product Image */}
        <Box className="buy-page-image-section">
          <img src={product?.product_picture} alt={product?.product_name} className="buy-page-image" />
        </Box>

        {/* Product Information and Bid Form */}
        <Box className="buy-page-info-section">
          {/* Product Information */}
          <Box className="buy-page-details">
            <Box className="buy-page-detail-row">
              <Typography variant="body1" className="buy-page-label">
                Price:
              </Typography>
              <Typography variant="body1" className="buy-page-value buy-page-price">
                ₹{product?.product_price}
              </Typography>
            </Box>

            <Box className="buy-page-detail-row">
              <Typography variant="body1" className="buy-page-label">
                Seller:
              </Typography>
              <Typography variant="body1" className="buy-page-value buy-page-seller">
                {maskUserName(product?.product_seller?.user_name)}
              </Typography>
            </Box>

            <Box className="buy-page-detail-row">
              <Typography variant="body1" className="buy-page-label">
                Hostel:
              </Typography>
              <Typography variant="body1" className="buy-page-value buy-page-hostel">
                {product?.product_seller?.user_hostel}
              </Typography>
            </Box>

            <Box className="buy-page-detail-row">
              <Typography variant="body1" className="buy-page-label">
                Description:
              </Typography>
              <Typography variant="body1" className="buy-page-value buy-page-description">
                {product?.product_description}
              </Typography>
            </Box>

            <Box className="buy-page-detail-row">
              <Typography
                variant="body1"
                className={`buy-page-label buy-page-status ${
                  product?.product_is_sold ? 'status-sold' : 'status-available'
                }`}
              >
                Status: {product?.product_is_sold ? 'Sold' : 'Available'}
              </Typography>
            </Box>
          </Box>

          {/* Bid Form */}
          {!product?.product_is_sold && (
            <Box component="form" onSubmit={handleBidSubmit} className="buy-page-bid-form">
              <Typography variant="h6" gutterBottom className="buy-page-bid-title">
                Place Your Bid
              </Typography>
              <Box className="buy-page-bid-inputs">
                <TextField
                  label="Minimum Bid (₹)"
                  variant="outlined"
                  required
                  type="number"
                  value={minBid}
                  onChange={(e) => setMinBid(e.target.value)}
                  className="buy-page-bid-input"
                  inputProps={{ min: '0', step: '0.01' }}
                />
                <TextField
                  label="Maximum Bid (₹)"
                  variant="outlined"
                  required
                  type="number"
                  value={maxBid}
                  onChange={(e) => setMaxBid(e.target.value)}
                  className="buy-page-bid-input"
                  inputProps={{ min: '0', step: '0.01' }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                className="buy-page-submit-button"
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Place Bid'}
              </Button>
            </Box>
          )}
        </Box>

        {/* Snackbar for API Messages */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {apiMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default BuyPage;
