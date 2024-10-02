// ProductList.jsx

import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../card/ProductCard';
import './ProductList.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ProductList({ products }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust based on card width
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust based on card width
        behavior: 'smooth',
      });
    }
  };

  // Handle arrow visibility based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="product-list-wrapper">
      <div className="header" style={{ padding: '0 20px 0 0' }}>
        New Listings
      </div>
      <div className="product-list-container">
        {showLeftArrow && (
          <button
            className="nav-button left"
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            <ArrowBackIosIcon fontSize="small" />
          </button>
        )}
        {showRightArrow && (
          <button
            className="nav-button right"
            onClick={scrollRight}
            aria-label="Scroll Right"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        )}
        <div className="product-list" ref={scrollRef}>
          {products.length > 0 ? (
            products
            .filter((product) => !product.product_is_sold) // Filter out sold products
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
