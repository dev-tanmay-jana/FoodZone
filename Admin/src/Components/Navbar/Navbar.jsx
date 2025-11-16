import React from 'react'
import "./Navbar.css";

const Navbar = () => {
  return (<>
    <div className="navbar">
        <img src="/logo.png" className="logo" alt="logo" />
        <img src="/profile.png" className="profile" alt="profile" />
    </div>
  </>
  )
}

export default Navbar;
