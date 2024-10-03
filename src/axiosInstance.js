// src/axiosInstance.js

import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050/api/v1', // Adjust baseURL as needed
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
  

export default axiosInstance;
