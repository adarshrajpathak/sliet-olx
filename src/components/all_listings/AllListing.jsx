// AllListing.jsx

import React from 'react';
import ProductCard from '../card/ProductCard';
import './AllListing.css';

function AllListing({ products }) {
  return (
    <div className="all-listing-container">
      <h2 className="header">All Listings</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </div>
  );
}

export default AllListing;
