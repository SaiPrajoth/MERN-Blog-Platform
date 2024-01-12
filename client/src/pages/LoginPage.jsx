// import React from 'react'

import { useState } from "react"
import { set } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username,setUsername]=useState('');
  const [userpassword,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/login',{
      method:'POST',
      body: JSON.stringify({username,userpassword}),
      headers : {'Content-Type':'application/json'},
      credentials:'include'
    })

    if(response.ok){
      setRedirect(true);
    }
  }


 if(redirect){
  return <Navigate to="/"/>
 }else{
  return (
    <form action="" className='login-page' onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder='username' value={username} onChange={ev=>setUsername(ev.target.value)}/>
        <input type="password" placeholder='password' value={userpassword} onChange={ev=>setPassword(ev.target.value)} />
        <button type="submit" className="login-submit" >Submit</button>
    </form>
  )
 }
}
