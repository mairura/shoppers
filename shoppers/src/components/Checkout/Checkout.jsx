import React, {useState  } from 'react'
// import { useCart } from "react-use-cart";
// import Stripe from "./Stripe";
import lists from "../Home/data"
import saf from "../../images/Lipanampesa.png"
import "./checkout.css"

const Checkout = () => {
  // const  {cartTotal} = useCart();

  const  [phoneNo, setPhoneNo ] = useState("");
  const  [amount, setAmount ] = useState("");

  const onhandlePayment = async (e) => {
    e.preventDefault();
    setPhoneNo("")
    setAmount("")

    // const usersItems =[];
    // const orders = usersItems.concat(lists,{'amount':amount,'phoneNo':phoneNo});
    // console.log(orders);

    const response = await fetch('http://localhost:5001/stk',{
         method:'POST',
         headers:{
           'content-type':'application/json',
         },
         body:JSON.stringify({
           phoneNo,
           amount
         }),
        })

  }
  return (
    <>
    <div className="checkout">
      <div className="checkout_head"><img src={saf} /></div>
      <form onSubmit={onhandlePayment}>
          <input placeholder='0712345678' type='tel' id='phoneNo' name="phoneNo" value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>
          <br /><br/>
          <input placeholder="Enter Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} name="amount" />
          <br /><br />
          {/* <br></br>
          <Stripe />
          <br/><br /> */}
          <input type='submit' className='checkoutButton' value='Confirm Payment'/>
      </form>
    </div>
  
    
    </>
  )
}

export default Checkout