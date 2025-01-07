import React from "react";
import "./ProductSkeletonCard.css"; // Ensure this path is correct based on your project structure
import "./ProductCard.css";

function ProductSkeletonCard() {
  return (
    <div className="product-card skeleton">
      {/* Status Tag (Skeleton) */}
      <div className="product-tag skeleton-tag"></div>

      {/* Product Image Skeleton */}
      <div className="product-image skeleton-image"></div>

      {/* Product Information Skeleton */}
      <div className="product-info">
        {/* Product Title Skeleton */}
        <div className="product-title skeleton-title"></div>

        {/* Price and Action Button Skeleton */}
        <div className="price-action">
          <div className="product-price skeleton-price"></div>
          <div className="button skeleton-button"></div>
        </div>

        {/* Product Location Skeleton */}
        <div className="product-location skeleton-location"></div>

        {/* Product Description Skeleton */}
        <div className="product-description skeleton-description"></div>

        {/* Action Button for Mobile View Skeleton */}
        <div className="mobile-action-button">
          <div className="button skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeletonCard;
