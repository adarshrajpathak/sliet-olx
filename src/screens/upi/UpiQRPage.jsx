// src/components/upi/UpiQRPage.jsx

import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './UpiQRPage.css'; 
import { useTheme } from '../../contexts/theme/ThemeContext';
import qrCodeImage from '../../images/upi_qr_code_cleanup.jpg';

const UpiQRPage = () => {
  const { theme } = useTheme();

  return (
    <>
      <Navbar />
      <div className={`upi-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <div className="upi-content">
          <h1 className="upi-title">Support Us</h1>
          <p className="upi-description">
            Your support helps us tackle the cost of domain, cloud, and continuous work. Any contribution you make is greatly appreciated and goes towards maintaining and improving our platform.
          </p>
          <div className="qr-container">
            <img src={qrCodeImage} alt="UPI QR Code" className="qr-code-image" />
          </div>
          <p className="upi-instruction">
            Scan the QR code above to support us via UPI.
          </p>
        </div>
      </div>
    </>
  );
};

export default UpiQRPage;
