import React, {useState } from 'react'
import {FaGoogle} from "react-icons/fa"
import "./form.css"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName ] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerUser = async (e) => {
    e.preventDefault();
    setFirstName("")
    setUsername("")
    setEmail("")
    setPassword("")

    const response = await fetch("http://localhost:5001/app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        username,
        email,
        password
      })
    }).then((response) => {
      console.log("Response:", response)
    })

    const data = await response.json();
    console.log("Data:", data)

    if(data.status === "ok") {
      navigate("/login")
    }
  }

  return (
    <>
    <div className="register">
      <h4>Register</h4>

      <form onSubmit={registerUser} className="register_form">  
          <label>First Name
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label>Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>Email<br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label> 
          <label>Password
          <input type="password" value={password} minlength="8" onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <hr />
          {/* <input type="text" className="googlesignup" value="Sign up with Google" /> */}
          {/* <span><FaGoogle /> </span> */}
          <input type="submit" className="signout" value="Register" /><br />
      </form>
      <p>Already have an account? <a href="/login">Login</a><br /></p>
    </div>
   
    </>
  )
}

export default Register