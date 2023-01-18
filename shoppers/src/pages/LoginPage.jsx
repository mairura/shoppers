import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./form.css"
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc"
import PropTypes from 'prop-types'

const LoginPage = ({setToken}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault();
    setEmail("")
    setPassword("")

    const response = await fetch("http://localhost:5001/app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((response) => {
      response.json();
      console.log("Response", response.data);
      // toast.success("Log in successfully");
      // localStorage.setItem("token", response.data.token);
      // navigate("/")
    })
    setToken(response);
  }

  return (
    <div className="register" > 
      <h4>Login via Email/Phone</h4>
      <form onSubmit={login} className="register_form">
          <label>Email/Phone<br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>Password<br />
          <input type="password" value={password} minlength="8" onChange={(e) => setPassword(e.target.value)} required />
          </label><br />
          <button className="google_icon" onCLick={""}><FcGoogle />&nbsp;&nbsp;Google Login</button><br />
          <input type="submit" value="Login" className="signout"/><br />
      </form>
      <p>Don't have an account yet?&nbsp;<a href="/register">Register</a></p>
      <p><a href="/resetpassword">Forgot&nbsp;Password?</a></p>
    </div>  
  )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage