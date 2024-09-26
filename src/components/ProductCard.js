import React from 'react';
import './ProductCard.css';
import MyButton from "./Button/Button";
import { useNavigate } from "react-router-dom";
function ProductCard({ product }) {

const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path
    // alert("cp")
  };
  return (
    <>

    <div className="product-card">
  
      <img src={product.imageUrl} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{product.price}</p>
        <p className="product-location">{product.location}</p>
        <p className="product-date">{product.date}</p>

      </div>
      <div className='BuyCenter'>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("buyclick")} 
        >
          BUY
        </MyButton>
      </div> 
    </div>
    
    </>
  );
}

export default ProductCard;
