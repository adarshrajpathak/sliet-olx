import React, { useState } from 'react';
import './Navbar.css';
import MyButton from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import blackLogo from '../../images/dark_sliet-olx.png';
import whiteLogo from '../../images/light_sliet-olx.png';
import { useTheme } from '../../contexts/theme/ThemeContext';

import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Link } from 'react-router-dom';
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); // Get user from AuthContext
  console.log(`${user?.user_name}cp`)
  const handleClick = (path) => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className={`navbar ${theme === 'dark' ? 'dark-mode dark-mode-shadow' : 'light-mode light-mode-shadow'}`}>
      <div className="logo-container">
      <Link to="/">
        <img
          src={theme === 'dark' ? blackLogo : whiteLogo}
          alt="SLIET OLX"
          className="logo-img"
        />
        </Link>
        <button className="tagline-button">
          <span className="actual-text">SLIET OLX</span>
          <span aria-hidden="true" className="hover-text">
            SLIET OLX
          </span>
        </button>
        
      </div>

      <div className={`menu ${isMenuOpen ? 'open' : ''} ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
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
          onClick={() => handleClick('/buy-request')}
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
              logout();
              handleClick('/');
            }}
          >
            <PersonIcon className="icon-login" />
            &nbsp;<div className='logout_flex'>
            <div>{user?.foundUser?.user_name || 'User'}</div> 
            {/* Display user's name */}
            <div>Logout</div>
            </div>
          </button>
        )}
      </div>

      <div
        className={`hamburger ${theme === 'dark' ? 'dark-bg' : 'light-bg'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
      </div>

      {isMenuOpen && (
        <div className={`mobile-menu ${theme === 'dark' ? 'dark-bg' : 'light-bg'}`}>
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
          <MyButton onClick={() => handleClick('/buy-request')}>Buy Request</MyButton>
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
              &nbsp;<div>{user?.foundUser?.user_name || 'User'}</div>
              <div>Logout</div>
            </MyButton>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
