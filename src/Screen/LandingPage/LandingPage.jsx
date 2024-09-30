import React from 'react';
 // Import the AuthContext
import Navbar from '../../components/Navbar';
import ProductList from "../../components/ProductList";
import AllListing from '../../components/AllListing';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {


  return (
    <div>
      <Navbar />
        {/* Display the product list and all listings */}
        <ProductList />
        <AllListing />

    </div>
  );
};

export default LandingPage;
