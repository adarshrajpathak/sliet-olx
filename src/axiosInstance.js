// src/axiosInstance.js

import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.sliet.shop/api/v1', // Adjust baseURL as needed
});

// Add a request interceptor
// In axiosInstance.js

axiosInstance.interceptors.request.use(
    (config) => {
      // List of endpoints that should not include the token
      const noAuthEndpoints = ['/otps/forgot-password', '/otps/verify-reset-otp', '/users/reset-password', '/users/create-session', '/users/create', '/products', '/otps/regenerate-otp', ];
  
      if (!noAuthEndpoints.includes(config.url)) {
        // Get token from localStorage
        const authState = localStorage.getItem('authState');
        if (authState) {
          const { token } = JSON.parse(authState);
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Function to inject navigation (use this in App.js or wherever you set up Axios globally)
export const injectNavigation = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized request. Redirecting to login.');
        localStorage.removeItem('authState'); // Clear the token
        navigate('/login'); // Use navigate for React SPA routing
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
