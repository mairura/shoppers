import React from 'react'
import "./offers.css"
import Footer from "../Footer/Footer"

const Offers = () => {
  return (
    <div className="offers">
      <h4>Subscribe to get the best offers</h4>
      <button onClick={<Footer />}>Subscribe</button>
    </div>
  )
}

export default Offers