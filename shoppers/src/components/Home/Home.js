import React, { useEffect } from 'react'
import './home.css';
import lists from "./data";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";

const Home = ({handleClick}) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(!localStorage.getItem("token")){
  //     navigate('/login')
  //   } 
  // }, [])
  return (
    // <div className="container">
      <div className="home">
      <h3>All Products</h3>
      <div className="home_details">
          { lists.map((item, index) => {
              return (
                  <>
                      <ItemCard
                          img={item.img}
                          title={item.title}
                          desc={item.author}
                          price={item.price}
                          item={item}
                          key={index}
                          handleClick={handleClick}
                      />
                  </>
              );
          })}
      </div>
    </div>
    // </div>
  
  )
}

export default Home