import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../../images/header.avif";
import img2 from "../../images/header_img2.jpg";
import img3 from "../../images/header_img1.avif";
import "./header.css";

const Header = () => {
  return (  
    <>
    <div className="carousel">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>We Got The Best For You</h3>
          <p>Come shop with us this November! Get Great Offers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Todays Sells Count Down</h3>
          <p>First Come First Get Served</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Get It On Your Door Step</h3>
          <p>
            Get Delivery Services on Some of our Commodities
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  )
}

export default Header