import React from 'react';
import { useCart } from "react-use-cart";
import "./cart.css";
import { useState } from "react"
import { toast } from "react-toastify"  
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Checkout from '../Checkout/Checkout';

const Cart = () => {

    const handleCheckout = () => {
        axios.post(`http://localhost:5001/create-checkout-session`, {
          items,
        }).then((res) => {
          if(res.data.url){
            window.location.href = res.data.url
          }
        }).catch((err) => {
          console.log(err.message);
        })
      }

    const {
        isEmpty,
        totalUniqueItems,
        totalItems,
        cartTotal,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    if (isEmpty) return <p className="cart_header">Your cart is empty</p>;
  return (
      <div className="container_cart" >
            <div className="total">
                <h6>Cart {totalUniqueItems} Total Items ({totalItems})</h6>
                <table className="cart_table">
                    <tbody>
                        {
                            items.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>
                                            <img src={item.img}
                                            style={{height :"7rem"}}
                                            alt={item.title}
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>Ksh.{item.price}</td>
                                        <td><i><b>Quantity: {item.quantity}</b></i></td>
                                        <td>
                                            <button className="btn" onClick={() => {updateItemQuantity(item.id, item.quantity - 1)}}>{""}-</button>
                                            <button className="btn" onClick={() => {updateItemQuantity(item.id, item.quantity + 1)}}>+</button>
                                            <button className="btn_delete" onClick={() => removeItem(item.id)}>Delete Item</button>
                                        </td>
                                    </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="container_total">
                <h2>Total Price: Ksh. {cartTotal} </h2>
            </div>
            <div className="container_buttons">
                <button className="container_buttons_clear" onClick={() => emptyCart()}>Clear Cart</button>
                <div>
                    <button className="container_buttons_purchase stripe" onClick={() => handleCheckout()}>Checkout Stripe</button>
                    <a href="/mpesa"><button className="container_buttons_purchase">Checkout Mpesa</button></a>
                
                </div>
              
                
                
            </div>  
          
                
      </div>
  )
}
{/* <button className="cart-login" onClick={() => navigate("/login")} >Login to checkout</button> */}

export default Cart    