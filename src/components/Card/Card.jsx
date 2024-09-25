// src/components/CustomCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const CustomCard = ({ title, children }) => {
  return (
    <Card>
      <CardHeader
        title={title}
      
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
