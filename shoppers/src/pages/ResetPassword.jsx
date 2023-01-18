import React, { useState } from 'react'
import { toast } from "react-toastify"

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const resetpassword = async (e) => {
    e.preventDefault();
    setEmail("")

    const response = await fetch("http://localhost:5001/app/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      })
    }).then(() => {
      console.log("Response", response);
      toast.success("Reset Password successful")
    })
  }

  return (
    <div className="register">
        <h4>Reset Password</h4>
        <form onSubmit={resetpassword} >
            <label> Enter your Email: </label><br />
            <input type="email" placeholder='example@gmail.com' name="email"/><br />
            <input type="submit" value="Send" className="signout" />
        </form>
        <a href="/login">Back to Login</a>
        <i>Check your email</i>
    </div>
  )
}

export default ResetPassword