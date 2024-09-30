import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Screen/SignIN/authcontext"; 
import LandingPage from "./Screen/LandingPage/LandingPage";
import Sell from "./Screen/Sell/Sell";
import BuyClick from "./Screen/BuyClick/BuyClick";
import SellResponse from "./Screen/SellResponse/SellResponse";
import Signup from "./Screen/SignIN/Signup";
import OTPInputPage from "./Screen/SignIN/otp";
import LoginPage from "./Screen/SignIN/Signin";
import "./App.css";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buyclick" element={<BuyClick />} />
        <Route path="/sellresp" element={<SellResponse />} />
        <Route path="/otp" element={<OTPInputPage />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
