import React, { useState } from "react";
import "./Navbar.css";
import MyButton from "./Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Screen/SignIN/authcontext"; // Import the AuthContext
import logo from "../images/slietOlx.png"
import logo1 from "../images/slietOlx2.jpeg"

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Get isLoggedIn and logout from the context

  const handleClick = (path) => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className="navbar">
       <div className="logo">
        <img src={logo1} alt="SLIET OLX"  />
      </div>

      {/* Desktop Menu */}
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/buyclick")}
        >
          Buy Request
        </MyButton>

        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/sellresp")}
        >
          Sell Response
        </MyButton>

        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/sell")}
        >
          Sell
        </MyButton>

        {/* Conditionally render Login/Register or Logout button */}
        {!isLoggedIn ? (
          <MyButton
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => handleClick("/signup")}
          >
            Login/Register
          </MyButton>
        ) : (
          <MyButton
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => {
              logout(); // Call the logout function
              handleClick("/"); // Navigate to home or landing page after logout
            }}
          >
            Logout
          </MyButton>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <MyButton onClick={() => handleClick("/buyclick")}>Buy Request</MyButton>
          <MyButton onClick={() => handleClick("/sellresp")}>Sell Response</MyButton>
          <MyButton onClick={() => handleClick("/sell")}>Sell</MyButton>
          {!isLoggedIn ? (
            <MyButton onClick={() => handleClick("/signup")}>Login/Register</MyButton>
          ) : (
            <MyButton onClick={() => { logout(); handleClick("/"); }}>Logout</MyButton>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
