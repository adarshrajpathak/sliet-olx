import React from 'react';
import Button from '@mui/material/Button';

const MyButton = ({ variant, color, size, onClick, children }) => {
  return (
    <Button
      variant={variant || 'contained'}
      color={color || 'primary'}
      size={size || 'medium'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MyButton;
