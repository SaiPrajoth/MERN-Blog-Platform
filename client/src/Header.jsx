// import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [username,setUsername]=useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then(userInfo=>{
        setUsername(userInfo.username);
      });
    });
  });
  return (
    <div className="main">
      <header>
        <div className="logo">MyBlog</div>
        <nav className="nav-bar">
          {username && (
            <>
              <Link to="/create">create new post</Link>
              <a href="">Logout</a>
            </>
          )}

          {!username && (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>
              <Link to="/register" className="nav-register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}
