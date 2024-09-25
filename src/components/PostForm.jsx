import React, { useState } from 'react';
import './PostAdForm.css';

const PostAdForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('Chandra Prakash');

  const handleFileChange = (e) => {
    setPhotos([...photos, ...e.target.files]);
  };

  return (
    <div className="form-container">
      <h1>Post Your Ad</h1>

      {/* Selected Category */}
      <div className="form-section">
        <h2>Selected Category</h2>
        <p>Furniture / Sofa & Dining <span className="change-link">Change</span></p>
      </div>

      {/* Include Some Details */}
      <div className="form-section">
        <h2>Include Some Details</h2>
        <label>Ad Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mention key features of your item"
          maxLength={70}
        />
        <small>{title.length}/70</small>

        <label>Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Include condition, features and reason for selling"
          maxLength={4096}
        />
        <small>{description.length}/4096</small>
      </div>

      {/* Set a Price */}
      <div className="form-section">
        <h2>Set a Price</h2>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="₹"
        />
      </div>

      {/* Upload Photos */}
      <div className="form-section">
        <h2>Upload Up to 12 Photos</h2>
        <div className="photos-grid">
          {Array(12).fill(null).map((_, index) => (
            <div key={index} className="photo-box">
              <label className="photo-upload-label">
                {photos[index] ? (
                  <img src={URL.createObjectURL(photos[index])} alt="Preview" />
                ) : (
                  <span className="add-photo">Add Photo</span>
                )}
                <input
                  type="file"
                  className="photo-input"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          ))}
        </div>
        <p className="mandatory-field">This field is mandatory</p>
      </div>

      {/* Confirm Your Location */}
      <div className="form-section">
        <h2>Confirm Your Location</h2>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select your state</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
          {/* Add other states here */}
        </select>
        <p className="mandatory-field">This field is mandatory</p>
      </div>

      {/* Review Your Details */}
      <div className="form-section">
        <h2>Review Your Details</h2>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
        />
        <small>{name.length}/30</small>

        <h3>Let's verify your account</h3>
        <p>We will send you a confirmation code by SMS on the next step.</p>
        <label>Mobile Phone Number *</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+91"
        />
      </div>

      {/* Post Now Button */}
      <button className="post-button">Post Now</button>
    </div>
  );
};

export default PostAdForm;
