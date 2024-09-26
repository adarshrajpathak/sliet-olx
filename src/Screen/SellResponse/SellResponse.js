import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import './SellResponse.css';

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar className="product-avatar">P</Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">Price: {product.price}</Typography>
            <Typography variant="body1">Hostel: {product.hostel}</Typography>
            <Typography variant="body1">Name: {product.name}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ProductList = () => {
  const products = [
    { price: '$200', hostel: 'Hostel A', name: 'Product A' },
    { price: '$150', hostel: 'Hostel B', name: 'Product B' }
  ];

  return (
    <div className="product-list-container">
      <Typography variant="h5" align="center" className="user-title">
        User
      </Typography>
      <Box mt={3}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Box>
    </div>
  );
};

export default ProductList;
