import React from 'react';
import Spline from '@splinetool/react-spline';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Make sure the container takes the full viewport height
        backgroundColor: '#f0f0f0', // Optional: Background color to make it visually better
      }}
    >
      <Box
        sx={{
          width: '60%', // Adjust the width as needed
          height: '60%', // Adjust the height to fit your needs
          border: '5px solid #ccc', // Add border to the scene
          borderRadius: '12px', // Optional: Rounded corners
          overflow: 'hidden', // Ensure the content doesn't overflow the border
        }}
      >
        <Spline scene="https://prod.spline.design/sGEyHvr7vA3cUGFs/scene.splinecode" />
      </Box>
    </Box>
  );
}
