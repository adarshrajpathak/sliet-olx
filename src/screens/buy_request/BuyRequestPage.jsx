// src/screens/buy_request/BuyRequestPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuyRequestPage.css';
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext';
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

const BuyRequestPage = () => {
  const { theme } = useTheme();
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Fetch the products the user has bid on
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/v1/dashboards/buy-request', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort bids in each product by buyer_max in descending order
        const productsWithSortedBids = response.data.products.map((product) => {
          const sortedBuyers = product.product_buyers.sort((a, b) => b.buyer_max - a.buyer_max);
          return { ...product, product_buyers: sortedBuyers };
        });

        setProducts(productsWithSortedBids);
      } catch (error) {
        console.error('Error fetching products:', error);
        setApiMessage('Failed to fetch products.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box className="buy-request-loading">
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className={`buy-request-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Typography variant="h5" align="center" gutterBottom className="buy-request-title" style={{ fontWeight: 'bold' }}>
          Products You've Bid On
        </Typography>

        {products.length === 0 ? (
          <Typography variant="body1" align="center">
            You have not placed any bids yet.
          </Typography>
        ) : (
          products.map((product) => (
            <>
            <hr/>
            <Box key={product._id} className="buy-request-card">
              {/* Product Image */}
              <Box className="buy-request-image-section">
                <img
                  src={product.product_picture}
                  alt={product.product_name}
                  className="buy-request-image"
                />
              </Box>

              {/* Product Information and Bids */}
              <Box className="buy-request-info-section">
                {/* Product Information */}
                <Box className="buy-request-details">
                  <Typography variant="h5" className="buy-request-product-title">
                    {product.product_name}
                  </Typography>

                  <Box className="buy-request-detail-row">
                    <Typography variant="body1" className="buy-request-label">
                      Price:
                    </Typography>
                    <Typography variant="body1" className="buy-request-value buy-request-price">
                      ₹{product.product_price}
                    </Typography>
                  </Box>

                  <Box className="buy-request-detail-row">
                    <Typography variant="body1" className="buy-request-label">
                      Description:
                    </Typography>
                    <Typography
                      variant="body1"
                      className="buy-request-value buy-request-description"
                    >
                      {product.product_description}
                    </Typography>
                  </Box>

                  <Box className="buy-request-detail-row">
                    <Typography
                      variant="body1"
                      className={`buy-request-label buy-request-status ${
                        product.product_is_sold ? 'status-sold' : 'status-available'
                      }`}
                    >
                      Status: {product.product_is_sold ? 'Sold' : 'Available'}
                    </Typography>
                  </Box>
                </Box>

                {/* Bids Table */}
                {product.product_buyers && product.product_buyers.length > 0 ? (
                  <Box className="buy-request-bids-table">
                    <Typography variant="h6" gutterBottom>
                      All Bids
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Buyer Name</TableCell>
                          <TableCell>Mobile</TableCell>
                          <TableCell>Hostel</TableCell>
                          <TableCell>Min Price</TableCell>
                          <TableCell>Max Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.product_buyers.map((buyer) => (
                          <TableRow
                            key={buyer._id}
                            className={
                              buyer.buyer_user._id === user._id ? 'current-user-row' : ''
                            }
                          >
                            <TableCell>{buyer.buyer_user.user_name}</TableCell>
                            <TableCell>{buyer.buyer_user.user_mobile}</TableCell>
                            <TableCell>{buyer.buyer_user.user_hostel}</TableCell>
                            <TableCell>{buyer.buyer_min}</TableCell>
                            <TableCell>{buyer.buyer_max}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                    No bids yet.
                  </Typography>
                )}

                {/* Additional Actions if needed */}
                {/* For example, a button to withdraw a bid */}
              </Box>
            </Box>
            </>
          ))
        )}

        {/* Snackbar for API Messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {apiMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default BuyRequestPage;
