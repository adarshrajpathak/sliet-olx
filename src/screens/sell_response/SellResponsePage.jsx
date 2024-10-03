// src/screens/sell_response/SellResponsePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SellResponsePage.css';
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const SellResponsePage = () => {
  const { theme } = useTheme();
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Fetch the user's products for sale
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/v1/dashboards/sell-response', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Process the products to sort the bids based on buyer_max in descending order
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

  // Handle marking a product as sold
  const handleMarkAsSold = async (productId) => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/v1/products/sold',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the product's status in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, product_is_sold: true } : product
        )
      );

      setApiMessage('Product marked as sold successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error marking product as sold:', error);
      setApiMessage('Failed to mark product as sold.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box className="sell-response-loading">
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className={`sell-response-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          className="sell-response-title"
          style={{ fontWeight: 'bold' }}
        >
          Your Products for Sale
        </Typography>

        {products.length === 0 ? (
          <Typography variant="body1" align="center">
            You have no products listed for sale.
          </Typography>
        ) : (
          products.map((product) => (
            <div key={product._id}>
              <hr />
              <Box className="sell-response-card">
                {/* Product Image */}
                <Box className="sell-response-image-section">
                  <img
                    src={product.product_picture}
                    alt={product.product_name}
                    className="sell-response-image"
                  />
                </Box>

                {/* Product Information and Bids */}
                <Box className="sell-response-info-section">
                  {/* Product Information */}
                  <Box className="sell-response-details">
                    <Typography variant="h5" className="sell-response-product-title">
                      {product.product_name}
                    </Typography>

                    <Box className="sell-response-detail-row">
                      <Typography variant="body1" className="sell-response-label">
                        Price:
                      </Typography>
                      <Typography
                        variant="body1"
                        className="sell-response-value sell-response-price"
                      >
                        ₹{product.product_price}
                      </Typography>
                    </Box>

                    <Box className="sell-response-detail-row">
                      <Typography variant="body1" className="sell-response-label">
                        Description:
                      </Typography>
                      <Typography
                        variant="body1"
                        className="sell-response-value sell-response-description"
                      >
                        {product.product_description}
                      </Typography>
                    </Box>

                    <Box className="sell-response-detail-row">
                      <Typography
                        variant="body1"
                        className={`sell-response-label sell-response-status ${
                          product.product_is_sold ? 'status-sold' : 'status-available'
                        }`}
                      >
                        Status: {product.product_is_sold ? 'Sold' : 'Available'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bids Table */}
                  {product.product_buyers && product.product_buyers.length > 0 ? (
                    <Box className="sell-response-bids-table">
                      <Typography variant="h6" gutterBottom>
                        Bids
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
                            <TableRow key={buyer._id}>
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ marginTop: '1rem' }}
                    >
                      No bids yet.
                    </Typography>
                  )}

                  {/* Mark as Sold Button */}
                  {!product.product_is_sold ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMarkAsSold(product._id)}
                      className="sell-response-sold-button"
                    >
                      Mark as Sold
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </div>
          ))
        )}

        {/* Snackbar for API Messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {apiMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SellResponsePage;
