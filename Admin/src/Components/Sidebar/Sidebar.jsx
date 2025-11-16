import React from 'react'
import "./Sidebar.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (<>
  <div className="sidebar">
    <div className="sidebar_options">
        <NavLink to="/add"><div className="sidebar_option">
            <IoIosAddCircleOutline  className='icon'/>
            <p>Add Item</p>
        </div>
        </NavLink>
        <NavLink to='/list'>
        <div className="sidebar_option">
            <FaClipboardList  className='icon'/>
            <p>Add List</p>
        </div>
        </NavLink>
        <NavLink to='/orders'>
        <div className="sidebar_option">
            <FaCartArrowDown  className='icon'/>
            <p>Orders</p>
        </div>
        </NavLink>
    </div>
  </div>
  </>
  )
}

export default Sidebar;
