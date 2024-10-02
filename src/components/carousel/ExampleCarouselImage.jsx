// ExampleCarouselImage.jsx
import React from 'react';
import "./Carousel.css";

function ExampleCarouselImage({ imageSrc, altText }) {
  return (
    <img
      src={imageSrc}
      alt={altText}
      className="carousel-image"
    />
  );
}

export default ExampleCarouselImage;
