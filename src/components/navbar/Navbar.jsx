// Navbar.jsx

import React, { useState } from 'react';
import './Navbar.css';
import MyButton from '../button/Button'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import blackLogo from '../../images/dark_sliet-olx.png';
import whiteLogo from '../../images/light_sliet-olx.png';
import { useTheme } from '../../contexts/theme/ThemeContext';

// Import Material Icons
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Get isAuthenticated and logout from AuthContext

  const handleClick = (path) => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className={`navbar ${theme === 'dark' ? 'dark-mode dark-mode-shadow' : 'light-mode light-mode-shadow'}`}>
      <div className="logo-container">
        <img
          src={theme === 'dark' ? blackLogo : whiteLogo}
          alt="SLIET OLX"
          className="logo-img"
        />
        <button className="tagline-button">
          <span className="actual-text">SLIET OLX</span>
          <span aria-hidden="true" className="hover-text">
            SLIET OLX
          </span>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className={`menu ${isMenuOpen ? 'open' : ''} ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        {/* Theme Toggle Icon */}
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <WbSunnyIcon className="theme-icon light" />
          ) : (
            <Brightness2Icon className="theme-icon dark" />
          )}
        </button>

        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick('/buy')}
        >
          Buy Request
        </MyButton>

        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick('/sell-response')}
        >
          Sell Response
        </MyButton>

        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick('/sell')}
        >
          Sell
        </MyButton>

        {/* Login/Register or Logout Button */}
        {!isAuthenticated ? (
          <button
            className="boton-elegante"
            onClick={() => handleClick('/signup')}
          >
            <LoginIcon className="icon-login" />
            &nbsp;Login/Register
          </button>
        ) : (
          <button
            className="boton-elegante"
            onClick={() => {
              logout(); // Call the logout function
              handleClick('/'); // Navigate to home or landing page after logout
            }}
          >
            <PersonIcon className="icon-login" />
            &nbsp;Logout
          </button>
        )}
      </div>

      {/* Hamburger Menu */}
      <div
        className={`hamburger ${theme === 'dark' ? 'dark-bg' : 'light-bg'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`mobile-menu ${theme === 'dark' ? 'dark-bg' : 'light-bg'}`}>
          {/* Theme Toggle Icon */}
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <WbSunnyIcon className="theme-icon light" />
            ) : (
              <Brightness2Icon className="theme-icon dark" />
            )}
          </button>

          <MyButton onClick={() => handleClick('/sell')}>Sell</MyButton>
          <MyButton onClick={() => handleClick('/buy')}>Buy Request</MyButton>
          <MyButton onClick={() => handleClick('/sell-response')}>
            Sell Response
          </MyButton>
          {!isAuthenticated ? (
            <MyButton onClick={() => handleClick('/signup')}>
              <LoginIcon className="icon-login" />
              &nbsp;Login/Register
            </MyButton>
          ) : (
            <MyButton
              onClick={() => {
                logout();
                handleClick('/');
              }}
            >
              <PersonIcon className="icon-login" />
              &nbsp;Logout
            </MyButton>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
