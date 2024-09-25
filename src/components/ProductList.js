import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import carImage from "../images/car.png";

// import CustomCard from './Card/Card';

const productData = [
  {
    id: 1,
    imageUrl: carImage, // Add image URL for Tata Hexa XTA 7 seater
    title: "Tata Hexa XTA 7 seater",
    price: "₹ 8,49,000",
    location: "Masab Tank, Hyderabad",
    date: "Sep 18",
  },

  {
    id: 2,
    imageUrl: carImage, // Add image URL for cycle
    title: "Hercules Bicycle",
    price: "₹ 7,200",
    location: "Indore, Madhya Pradesh",
    date: "Sep 23",
  },
  {
    id: 3,
    imageUrl: carImage, // Add image URL for study table
    title: "Wooden Study Table",
    price: "₹ 3,500",
    location: "Patna, Bihar",
    date: "Sep 20",
  },
  {
    id: 4,
    imageUrl: carImage, // Add image URL for mobile phone
    title: "iPhone 13 (7 months old)",
    price: "₹ 23,000",
    location: "Samudrapur, Maharashtra",
    date: "Sep 24",
  },

  // Add more products here...
];

function ProductList() {
  return (
    <>
     <div className="Header">New Listing</div>
      <div className="product-list">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
