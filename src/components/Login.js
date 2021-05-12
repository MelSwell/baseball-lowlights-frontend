import React, { useState } from 'react'
import Register from './Register'

function Login({ setLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState([])
  const [loginOrRegister, setLoginOrRegister] = useState("login")

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data) => {
      if (data.id){
        window.sessionStorage.setItem("currentUserId", `${data.id}`)
        setLoggedIn(true)
      } else {
        setErrors(data)
      }
    })
  }

  function toggleLoginOrRegister() {
    if (loginOrRegister === "login") {
      setLoginOrRegister("register")
    }
    else if (loginOrRegister === "register") {
      setLoginOrRegister("login")
    }
  }

  return (
    <div>
      {errors ? <p style={{color: "red"}}>{errors[0]}</p> : null}
      {loginOrRegister === "login" && <form onSubmit={handleSubmit}>
        <label>Email: </label><br/>
        <input type="text" name="email" value={formData.email} onChange={handleChange}/><br />
        <label>Password: </label><br/>
        <input type="password" name="password" value={formData.password} onChange={handleChange}/><br />
        <input type="submit" />
      </form>}
      {loginOrRegister === "register" && <Register setLoggedIn={setLoggedIn}/>}
      {loginOrRegister === "login" ? (
      <button onClick={toggleLoginOrRegister}>Register</button>
      ) : (
        <button onClick={toggleLoginOrRegister}>Back to Login</button>
      )}
    </div>
  )
}

export default Login 