import React from 'react';
 // Import the AuthContext
import Navbar from '../../components/Navbar';
import ProductList from "../../components/ProductList";
import AllListing from '../../components/AllListing';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../components/Darkmode/Theme';
import Phone from "../../components/3d icons/phone"
import Casousel from "../../components/Casousel/Casousel"
const LandingPage = () => {
  const { isDarkMode } = useTheme();

  return (

    <div>
        <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Navbar />
      {/* <Phone /> */}
      <Casousel />

        {/* Display the product list and all listings */}
        <ProductList />
        <AllListing />

    </div>
    </div>
  );
};

export default LandingPage;
