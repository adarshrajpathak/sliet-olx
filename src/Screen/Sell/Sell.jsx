import React, { useState } from 'react';
import './Sell.css';

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Product Listed!');
  };

  return (
    <div className="form-container">
    <div className='flex'>
      <div className="logo">SLIET OLX</div>
      <h2 className="user-title">User</h2>
      </div>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="image-upload">
          <label htmlFor="file-input">
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="upload-box">Upload Picture</div>
            )}
          </label>
          <input id="file-input" type="file" onChange={handleImageChange} />
        </div>
        <div className="input-field">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="input-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="input-field">
          <label>Your Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
        </div>
        <button type="submit" className="list-product-btn">List Product</button>
      </form>
    </div>
  );
};

export default Sell;
