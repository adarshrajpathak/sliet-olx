import React from 'react';
import './NotFound.css'; // External CSS file for styling
import Navbar from '../navbar/Navbar';
const NotFound = () => {
  return (
    <>
    <Navbar />
    <div className="not-found">
      <div className="content">
        <h1 className="error-code">404</h1>
        <h2>Page not found</h2>
        <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
        <button className="home-button" onClick={() => window.location.href = '/'}>
          BACK TO HOME
        </button>
      </div>
    </div>
    </>
  );
};

export default NotFound;
