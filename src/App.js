import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import PrivateRoute from "./contexts/PrivateRoute";
import BuyPage from "./screens/buy/BuyPage";
import FrogetPassPage from "./screens/forget_pass/ForgetPassPage";
import Error from "./components/error/error"
function App() {
  return (
    <CombinedProviders>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/forgot-password' element={<FrogetPassPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OTPInputPage />} />
          <Route path="/otp-regenerate" element={<OTPResendPage />} />
          <Route path="/error" element={<Error />} />
          {/* Protected Routes */}
          <Route
            path="/sell"
            element={
              <PrivateRoute>
                <Sell />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy"
            element={
              <PrivateRoute>
                <Buy />
              </PrivateRoute>
            }
          />
          <Route
            path="/sell-response"
            element={
              <PrivateRoute>
                <SellResponsePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy-request"
            element={
              <PrivateRoute>
                <BuyRequestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <BuyPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CombinedProviders>
  );
}

export default App;
