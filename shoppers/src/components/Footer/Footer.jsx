import React from 'react'
import {FaFacebookF} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa"
import {FaWhatsapp} from "react-icons/fa"
import {FaInstagram} from "react-icons/fa"
import emailjs from '@emailjs/browser';
import ReactWhatsapp from "react-whatsapp";
// import { ExternalLink } from "react-external-link"

import "./footer.css"

const Footer = () => {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_qr858en', 'template_82icydl', e.target, 'AkbE3VaEkveGegDXz')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
    <div className="footer" >
      <div className="container">
        <div className="col">
          <div className="col_1" >
            <h5>Company</h5>
            <a href="/about">About Us</a>
            <a href="/offers">Offers</a>
            <a href="#">Shoppers Careers</a>
            
            <a href="#">Terms and Conditions</a>  
          </div>
        </div>
        {/* <div className="vertical" /> */}
        <div className="col">
          <h5>Product Help</h5>
          <p>Support</p>
          <p>Privacy</p>
        </div>
        <div className="col">
          <h5>Contact Us</h5>
          <p>Subscribe to our newsletter to get updates on our latest offers!</p>
          <form onSubmit={sendEmail} >
            <input type="text" placeholder='Enter E-mail Address' size="30" className="email" />
            {/* <button className="footer_button">Send</button> */}
            <input type="submit" value="Send"  className="footer_button" />
          </form>
          <label>Join Us</label>
          <div className="social" >
            <a href="https://www.facebook.com/" alt=""><FaFacebookF /></a>
            <a href="https://twitter.com/" alt=""><FaTwitter /></a>
            <a href="http://instagram.com/" alt=""><FaInstagram /></a>  
            <ReactWhatsapp number="254702185556" message="Hello Shoppers, I want to shop with you" className="react_whatsapp">
              <a href="#" alt=""><FaWhatsapp /></a>   
            </ReactWhatsapp>
          </div>  
        </div>
      </div>
      <p className="copyright">Designed by <i>Ted Bryn</i> &copy; {(new Date().getFullYear())} All Rights reserved</p>
    </div>
  )
}

export default Footer