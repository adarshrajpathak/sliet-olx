import React from "react";
import "./Navbar.css";
import MyButton from "./Button/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <nav className="navbar">
      <div className="logo">SLIET OLX</div>

      <div>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/sellresp")}  // Navigate to /buyclick
        >
          Buy Request
        </MyButton>
      </div>

      <div>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/sellresp")}  // Navigate to /sellresp
        >
          Sell Response
        </MyButton>
      </div>

      <div>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/sell")}  // Navigate to /sell
        >
          Sell
        </MyButton>
      </div>

      <div>
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleClick("/login")}  // Navigate to /login if needed
        >
          Login/Register
        </MyButton>
      </div>
    </nav>
  );
}

export default Navbar;
