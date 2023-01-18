import Navbar from './components/Navbar/Navbar'
import { CartProvider } from "react-use-cart"
import Home from "./components/Home/Home"
import Cart from "./components/Cart/Cart"
import About from "./components/About/About"
import Header from "./components/Header/Header"
import Offers from "./components/Offers/Offers"
import Blog from "./pages/Blog"
import Footer from "./components/Footer/Footer"
import Register from "./pages/Register"
import Login from "./pages/LoginPage"
import ResetPassword from './pages/ResetPassword'
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess"
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landingpage from './pages/Landingpage'
import NotFound from './pages/NotFound'
import Checkout from './components/Checkout/Checkout'

function App() {
  // const [user, setUser] = useState(null);

  return (
     <>  
     <Navbar />
     <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />}/>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/offers" element={<Offers />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="/mpesa" element={<Checkout />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
     </Router>
     <Footer />
      </>
    
  );
}

export default App;
