import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext"; 
import LandingPage from "./screens/landing/LandingPage";
import LoginPage from "./screens/login/LoginPage";
import SignupPage from "./screens/signup/SignupPage";
import OTPInputPage from "./screens/otp/otp_input/OTPInputPage";
import OTPResendPage from "./screens/otp/otp_resend/OTPResendPage";
import Sell from "./screens/sell/SellPage";
import Buy from "./screens/buy/BuyPage";
import SellResponsePage from "./screens/sell_response/SellResponsePage";
import BuyRequestPage from "./screens/buy_request/BuyRequestPage";
import "./App.css";
import CombinedProviders from "./contexts";
function App() {
  return (
    <CombinedProviders>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OTPInputPage />} />
          <Route path="/otp-regenerate" element={<OTPResendPage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell-response" element={<SellResponsePage />} />
          <Route path="/buy-response" element={<BuyRequestPage />} />
        </Routes>
      </Router>
    </CombinedProviders>
  );
}

export default App;
