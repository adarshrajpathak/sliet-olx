import React from "react";
import "./Navbar.css";
import MyButton from "./Button/Button";
import { Link } from "react-router-dom";

function Navbar() {
  const handleClick = () => {
    alert("Login & Shop");
  };
  return (
    <nav className="navbar">
      <div className="logo">SLIET OLX</div>
     
     <div >
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleClick}
        >
          Buy Request
        </MyButton>
      </div> 
      <div >
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleClick}
        >
         Sell Response
        </MyButton>
      </div>
      <div >
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleClick}
        >
        Sell
        </MyButton>
      </div>
      <div >
        <MyButton
          variant="outlined"
          color="secondary"
          size="large"
          onClick={handleClick}
        >
          Login/Register
        </MyButton>
      </div>
    </nav>
  );
}

export default Navbar;
