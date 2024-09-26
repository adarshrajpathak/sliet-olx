import React from 'react'
import Navbar from '../../components/Navbar';
import ProductList from "../../components/ProductList"
import AllListing from '../../components/AllListing';
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <ProductList />
    
      </div>
      <div className="content">
          <AllListing />
          </div>
    </div>
  )
}

export default LandingPage
