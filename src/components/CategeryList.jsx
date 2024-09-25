import React from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const categories = [
    { id: 1, name: "Cars", icon: "🚗" },
    { id: 2, name: "Properties", icon: "🏠" },
    { id: 3, name: "Mobiles", icon: "📱" },
    { id: 4, name: "Jobs", icon: "💼" },
    { id: 5, name: "Bikes", icon: "🏍️" },
    { id: 6, name: "Electronics & Appliances", icon: "💻" },
    { id: 7, name: "Commercial Vehicles & Spares", icon: "🚚" },
    { id: 8, name: "Furniture", icon: "🛋️" },
    { id: 9, name: "Fashion", icon: "👗" },
    { id: 10, name: "Books, Sports & Hobbies", icon: "📚" },
    { id: 11, name: "Pets", icon: "🐕" },
    { id: 12, name: "Services", icon: "🛠️" },
  ];

  return (
    <div className="category-container">
      <h1 className="header">Post Your Ad</h1>
      <div className="category-list">
        <h3>Choose a Category</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <span className="icon">{category.icon}</span>
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
