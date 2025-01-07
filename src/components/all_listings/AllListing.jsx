// AllListing.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../card/ProductCard';
import ProductSkeletonCard from '../card/ProductSkeletonCard'; // Import Skeleton Card
import './AllListing.css';

function AllListing({ products }) {
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [products]);

  return (
    <div className="all-listing-container">
      <h2 className="header">All Listings</h2>
      <div className="product-grid">
        {loading ? (
          // Display 5 skeleton cards while loading
          Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeletonCard key={index} />
          ))
        ) : (
          [...products].reverse().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default AllListing;
