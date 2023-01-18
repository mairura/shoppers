import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import Logo from "../../images/logo.png"
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart'
import {AiOutlineBars} from '@react-icons/all-files/ai/AiOutlineBars';
import { useCart } from "react-use-cart"
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({setShow}) => {
    const {totalUniqueItems} = useCart();
    // const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);

    const showForm1 = (e) => {
        e.preventDefault();
      setShowForm(!showForm);
    }

    // const logout = () => {
    //     axios.get("/logout")
    //     .then(() => {
    //         toast.success("Log out successfully");
    //         localStorage.removeItem("token")
    //         navigate("/")
    //     }).catch(error => {
    //         console.log(error.message);
    //     })
    // }

        return (
            <>
            <Router>
            <nav>
            <label className="logo">
                <img src={Logo} alt="logo" onClick={() => setShow(true)}/>
            </label>
                <ol>
                    <li>
                        <a href='/' style={{color: "orange"}} ><b>Home</b></a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/blog">Blog</a>
                    </li>
                    <li>
                        <a href="/offers">Offers</a>
                    </li>
                    <li>
                       <a href="/footer">Contact Us</a>
                    </li>
                    <span className="icon">
                        <FaUserCircle /><a href="/login">Login</a> 
                    </span>
                    {/* <button onClick={() => {
                        localStorage.removeItem("token")
                    }} >Logout</button> */}
                       {/* <button onClick={logout} >Logout</button> */}
                    
                    {/* <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
                            <ul>
                                <li><a href="#">Profile</a></li> 
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">Sign Out</a></li>
                            </ul>
                    </nav> */}
                    <a href ="/cart">
                    <span className="icon_cart">
                        <FaShoppingCart className='cart'/>
                        <span>{totalUniqueItems}</span>
                    </span>
                    </a>
                </ol>
                <label>
                    <AiOutlineBars className="icon_bars" />
                </label> 
            </nav>
            </Router>
            </>
            
          )
    };


export default Navbar