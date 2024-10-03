// src/components/notfound/NotFoundPage.jsx

import React from 'react';
import './NotFoundPage.css'; // External CSS file for styling
import Navbar from '../navbar/Navbar';
import { useTheme } from '../../contexts/theme/ThemeContext';
import dogeImage from '../../images/doge.png'; // Make sure this path is correct

const NotFoundPage = () => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <div className={`not-found-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <div className="not-found-content">
          {/* 404 Error Code */}
          {/* Doge Message */}
          <div className={`doge-message ${theme === 'dark' ? 'dark-mode-shadow' : 'light-mode-shadow  '}`}>
            <h1 className="not-found-code">404</h1>
            <p>Wow, such empty. So lost, much 404.</p>
          </div>

          {/* Doge Image */}
          <img src={dogeImage} alt="Doge" className="doge-image" />


          {/* Additional Error Text */}
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">Oops! The page you are looking for does not exist.</p>

          {/* Back to Home Button */}
          <button className="back-home-button" onClick={() => window.location.href = '/'}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
