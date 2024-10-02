// ProductCard.jsx

import React from "react";
import "./ProductCard.css"; // Ensure this path is correct based on your project structure
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const {
    product_picture,
    product_name,
    product_price,
    product_seller,
    product_description,
    product_is_sold,
  } = product;

  const navigate = useNavigate();
  // Handler for Buy button click
  const handleBuy = () => {
    // Implement buy functionality or navigation here
    navigate(`/products/${product._id}`);
  };

  // Handler for View button click
  const handleView = () => {
    // Implement view functionality or navigation here
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card">
      {/* Status Tag */}
      <div
        className={`product-tag ${
          product_is_sold ? "sold-tag" : "for-sale-tag"
        }`}
      >
        {product_is_sold ? "Sold" : "For Sale"}
      </div>

      {/* Product Image */}
      <img src={product_picture} alt={product_name} className="product-image" />

      {/* Product Information */}
      <div className="product-info">
        <h3 className="product-title">{product_name}</h3>

        {/* Price and Action Button Container */}
        <div className="price-action">
          <p className="product-price">₹ {product_price}</p>
          {!product_is_sold ? (
            <button className="buy-button" onClick={handleBuy}>
              Buy
            </button>
          ) : (
            <button className="view-button" onClick={handleView}>
              View
            </button>
          )}
        </div>

        <p className="product-location">{product_seller?.user_hostel}</p>
        <p className="product-description">{product_description}</p>

        {/* Action Button for Mobile View */}
        <div className="mobile-action-button">
          {!product_is_sold ? (
            <button className="buy-button" onClick={handleBuy}>
              Buy
            </button>
          ) : (
            <button className="view-button" onClick={handleView}>
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
