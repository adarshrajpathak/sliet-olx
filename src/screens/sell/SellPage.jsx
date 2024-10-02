import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellPage.css'; // Ensure this path is correct
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';

const SellPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  // State variables for validation errors
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');

  // State variables for API call
  const [apiMessage, setApiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    // Validate form fields
    if (!title.trim()) {
      setTitleError('Please enter a title for the product.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!price || isNaN(price) || price <= 0) {
      setPriceError('Please enter a valid price.');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!isValid) return;

    // FormData for file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      setIsLoading(true);

      // Make API call
      const response = await axios.post('http://localhost:5050/api/v1/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product listed successfully:', response.data);

      // Set success message
      setApiMessage('Product listed successfully!');
      setOpenSnackbar(true);

      // Redirect to homepage after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Product listing error:', err);

      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setApiMessage(err.response.data.message);
      } else {
        setApiMessage('An unexpected error occurred. Please try again later.');
      }

      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className={`sell-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Box component="form" onSubmit={handleSubmit} className={`sell-form ${theme === 'dark' ? 'dark-mode dark-mode-shadow' : 'light-mode light-mode-shadow'}'}`}>
          <Typography variant="h5" align="center" gutterBottom className="form-header">
            List Your Product
          </Typography>

          {/* Image Upload */}
          <div className="image-upload">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="file-input" className="upload-box">
              {image ? <img src={URL.createObjectURL(image)} alt="Preview" className="uploaded-image" /> : 'Click to upload an image'}
            </label>
          </div>

          {/* Product Title Field */}
          <TextField
            fullWidth
            label="Product Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
            className="input-field"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Product Description Field */}
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            className="input-field"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* Price Field */}
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!priceError}
            helperText={priceError}
            className="input-field"
            InputProps={{
              className: theme === 'dark' ? 'dark-mode-input' : '',
            }}
          />

          {/* API Error or Success Message */}
          {apiMessage && (
            <Typography
              variant="body2"
              color={apiMessage.includes('successfully') ? 'primary' : 'error'}
              align="center"
              className="api-message"
            >
              {apiMessage}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            className="list-product-btn"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'List Product'}
          </Button>

          {/* Snackbar for API Messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={apiMessage.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
              {apiMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default SellPage;
