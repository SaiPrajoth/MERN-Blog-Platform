// import React from 'react'

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [userpassword, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault(); // 4. We write this to avoid the default form submission, which refreshes the form. The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

    await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ username, userpassword }),
      headers: { "Content-Type": "application/json" },
    });
    // alert("registration successful, please login");

    // const response = await fetch('http://localhost:3000/register',{
    //   method:'POST',
    //   body: JSON.stringify({username,userpassword}),
    //   headers : {'Content-Type':'application/json'}
    // })

    // if(response.ok===true){
    //   alert('registration successful, please login')
    // }else{
    //   alert('registration failed, try again later')
    // }
    // Task : in the video, it has been put that if the username is unique it will go for the registration if it is not then it throwns and error, so that is captured to state that the registration is failed. so write that code
  }
  return (
    <form action="" className="register-page" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={userpassword}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="register-submit" onClick={register}>
        Submit
      </button>
    </form>
  );
}
