import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import './SellPage.css'; // Ensure this path is correct
import Navbar from '../../components/navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useAuth } from '../../contexts/auth/AuthContext'; // Import useAuth for accessing user context

const SellPage = () => {
  const { theme } = useTheme();
  const { user,token } = useAuth(); // Get the user context
  const navigate = useNavigate();

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // State variables for validation errors
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');

  // State variables for API call
  const [apiMessage, setApiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      // Validate image size (should not exceed 12MB)
      if (selectedImage.size > 1024 * 1024) { // 1MB = 1024 * 1024 bytes
        setApiMessage('Image size cannot exceed 1MB!');
        setSnackbarSeverity('error'); // Display as an error
        setOpenSnackbar(true);
        return;
      }

      // Upload image to Cloudinary
      try {
        setIsImageUploading(true);

        const data = new FormData();
        data.append('file', selectedImage);
        data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );

        const result = await response.json();
        if (result.secure_url) {
          setImageUrl(result.secure_url);
          setApiMessage('Image uploaded successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        } else {
          setApiMessage('Image upload failed!');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      } catch (error) {
        setApiMessage('Something went wrong. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsImageUploading(false);
      }
    }
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

    if (!isValid || !imageUrl) return;

    // FormData for product details
    const formData = {
      name:title,
      description,
      stringPrice:price,
      picture: imageUrl, // Use the Cloudinary URL
    };

    try {
      setIsLoading(true);
      // Make API call to list the product
      const response = await axiosInstance.post('/products/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Product listed successfully:', response.data);

      // Set success message
      setApiMessage('Product listed successfully!');
      setSnackbarSeverity('success');
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
      setSnackbarSeverity('error');
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
              disabled={isImageUploading}
            />
            <label htmlFor="file-input" className="upload-box">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="uploaded-image" />
              ) : (
                'Click to upload an image < 1MB '
              )}
              {/* Show CircularProgress centered within the upload box */}
              {isImageUploading && (
                <Box display="flex" justifyContent="center" alignItems="center" className="upload-progress">
                  <CircularProgress size={24} color="inherit" />
                </Box>
              )}
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
              color={snackbarSeverity === 'success' ? 'primary' : 'error'}
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
            disabled={isLoading || isImageUploading || !imageUrl}
            className="list-product-btn"
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'List Product'}
          </Button>

          {/* Snackbar for API Messages */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {apiMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default SellPage;
