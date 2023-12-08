import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
import Contact from './Contact'

function App() {
  return (
    <div className="main">
      {/* <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes> */}


      <header>
        <div className="logo">MyBlog</div>
        <nav className="nav-bar">
          <a href="#" className="nav-login">Login</a>
          <a href="#" className='nav-register'>Register</a>
        </nav>
      </header>
    </div>
  )
}

export default App
