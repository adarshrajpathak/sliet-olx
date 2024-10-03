// LandingPage.jsx

import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductList from '../../components/new_listings/ProductList';
import AllListing from '../../components/all_listings/AllListing';
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useProductList } from '../../contexts/product_list/ProductListContext';
import { useAuth } from '../../contexts/auth/AuthContext';
import Carousel from '../../components/carousel/Carousel';
import Footer from '../../components/footer/Footer';
import axiosInstance from '../../axiosInstance';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { products, setProducts } = useProductList();

  // Fetch products when LandingPage mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error appropriately (e.g., show notification)
      }
    };

    fetchProducts();
  }, [products]);

  return (
    <div className={`landing-min ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Navbar />
      <Carousel />
      <ProductList products={products} />
      <AllListing products={products} />
      <Footer />
    </div>
  );
};

export default LandingPage;
