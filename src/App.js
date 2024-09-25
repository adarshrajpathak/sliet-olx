
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './Screen/LandingPage';
import SellProduct from "./Screen/SellProduct";

import './App.css';

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
      {/* <Route path="/sign" element={<SignIn/>} /> */}
      <Route path="/sell" element={<SellProduct/>} />
    </Routes>
  </Router>
  );
}

export default App;
