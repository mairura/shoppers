import React from 'react'
import { useCart } from "react-use-cart";

const ItemCard = (props) => {
    const { addItem } = useCart();
  return (
    <>
        <div className="cart_box">
            <img src={props.img} alt={props.title} />
            <div className="cart_details">
                <h5>{props.title}</h5>
                <h5>Ksh. {props.price}</h5>
                <p>{props.author}</p>
                <button href="#" onClick={() => addItem(props.item)}>Add to Cart</button>
            </div>
        </div>
    </>
  )
}

export default ItemCard