import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./Screen/LandingPage/LandingPage";

import Sell from "./Screen/Sell/Sell";
import BuyClick from "./Screen/BuyClick/BuyClick";
import SellResponse from "./Screen/SellResponse/SellResponse";
import SignIn from "./Screen/SignIN/Signin";
import "./App.css";

function App() {
  return (
    <Router>
      {/* <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button>
            <Link to="/sell">SELL</Link>
          </button>
        </li>
      </ul>
    </nav> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buyclick" element={<BuyClick />} />
        <Route path="/sellresp" element={<SellResponse />} />
      </Routes>
    </Router>
  );
}

export default App;
