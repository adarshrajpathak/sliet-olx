// src/components/ExampleCarouselImage.js

import React from 'react';

function ExampleCarouselImage({ imageSrc, altText }) {
  return (
    <img
      src={imageSrc}
      alt={altText}
      style={{ width: '100%', height: '400px', objectFit: 'cover' }}
    />
  );
}

export default ExampleCarouselImage;
