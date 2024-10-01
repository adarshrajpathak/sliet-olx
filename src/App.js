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
import OTPInputPage2 from "./Screen/SignIN/regenerate_otp";
import LoginPage from "./Screen/SignIN/Signin";
import "./App.css";
import ThemeProvider from './components/Darkmode/Theme';
function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buyclick" element={<BuyClick />} />
        <Route path="/sellresp" element={<SellResponse />} />
        <Route path="/otp" element={<OTPInputPage />} />
        <Route path="/otp2" element={<OTPInputPage2 />} />
        <Route path="/signin" element={<LoginPage />} />
      </Routes>
    </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
