import React, { useContext } from 'react'
import './navbar.css'
import { useState } from 'react';
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { StoreContext } from '../../context/StoreContext';
import { IoBagAddOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";


const Navbar = ({setshowlogin}) => {
    const [navbar_list, setNavbar_list] = useState(false);
    const [menu , setMenu] = useState("home");
    const {getTotalItemAmmount, token, settoken} = useContext(StoreContext)

    const handleToggleButton = () => {
        setNavbar_list(!navbar_list);
        // console.log("clicked");
    };

    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        settoken("");
        navigate("/")
    }
    
  return (<>
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/"><img src="/logo.png" alt="Logo" /></NavLink>
        <NavLink to="/"><img src="Snapby_logo.jpg" alt="logo" className='Snapby_logo' /></NavLink>
      </div>
      <div className={navbar_list ? 'list_mobile' : 'manue_items'}>
      <ul className="navbar_manue" onClick={handleToggleButton}>
        <li onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ""}><NavLink to="/" className="nav_link">Home</NavLink></li>
        <li onClick={() => setMenu("service")} className={menu === 'service' ? 'active' : ""}><NavLink to="/menu" className="nav_link">Menu</NavLink></li>
        <li onClick={() => setMenu("order")} className={menu === 'order' ? 'active' : ""}><NavLink to='/about' className="nav_link" >About</NavLink></li>
        <li onClick={() => setMenu("downloadapp")} className={menu === 'downloadapp' ? 'active' : ""}><NavLink to='/downloadapp' className="nav_link" >Mobile-App</NavLink></li>
        <li onClick={() => setMenu("contact")} className={menu === 'contact' ? 'active' : ""}><NavLink to="/cart" className="nav_link">Cart</NavLink></li>

      </ul>
      </div>
      <div className='navbar_right'>
        <div className="search_box">
            <IoSearch />
            <input  className="search" type="text" placeholder="Search..." />
        </div>
        <div className='basket'>
            <NavLink to="/cart" className="nav_link"><FaBasketShopping /></NavLink>
            <div className={getTotalItemAmmount() === 0 ? "":"dot"}></div>
        </div>
        {!token?(<button className='signin_btn' onClick={() => setshowlogin(true)}>Signin</button>):
        (<div className='profile_image'>
            <img src="/profile.jpg" alt="" />
            <ul className="nav-profile-drpodown">
                <NavLink to='/myorder' className="nav_link"><li ><IoBagAddOutline /><p>Orders</p></li></NavLink>
                <hr />
                <li onClick={logout}><CiLogout /><p>Logout</p></li>
            </ul>
            </div>)}
      </div>
      <button className="manue_bar" onClick={handleToggleButton}><FaBars /></button>
      
    </nav>
  </>
    
  )
};

export default Navbar;
