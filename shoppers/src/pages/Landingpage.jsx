import React from 'react'
import About from '../components/About/About'
import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
import Offers from '../components/Offers/Offers'
import Blog from './Blog'

const Landingpage = () => {
  return (
    <>
    <Header />
    <Home />
    <About />
    <Blog />
    <Offers />
    </>
    
  )
}

export default Landingpage