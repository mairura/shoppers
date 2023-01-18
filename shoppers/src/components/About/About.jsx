import React from 'react'
import "./about.css"
import Logo from "../../images/logo.png"
import { TypeAnimation } from "react-type-animation"

const About = () => {
  return (
    <div className="about">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="about_content">
        Shoppers was established in the early 2000's and has since been a major trading platfrom for many commodities.
        Shoppers allows customers to purchase items at a lower price and make payments through MPesa transactions, Stripe for Card
        payments and Paypal accounts.
        This channel has ensured that user data is secure and not reveled to anyone not even collegues within the organisation.
        <br />
        <b>We are here for you 🎈 </b>
        <br />
    
        We serve the best products and look forward to make them more available and easier for our customers to make payments 
        receive of commodities easier throught delivery services.
        We encourage all customers to atleast help improve this platfrom for bettter customer services.
        <br />
        <TypeAnimation sequence={[
          "Happy Shopping 🙂 ",
          1000,
          "Shop With Us 🛍 ",
          1000,
          "Thank You 🤝 ",
          1000,
          () => {
            console.log("Shoppers! 🚀 ")
          }
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: "2em"}}
         />
        
        <br />
      </div>
    </div>
  )
}

export default About