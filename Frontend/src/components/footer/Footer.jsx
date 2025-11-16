import React from 'react'
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { FaSquareInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer_content">
        <div className="footer_content_left">
            <img src="/logo.png" alt='logo'/>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque nihil magnam quas veniam maxime adipisci amet eligendi necessitatibus recusandae repudiandae blanditiis velit, aut quia. Cumque at nemo repellat maxime? Velit.</p>
            <div className="social_icon">
                <FaFacebook className='icon' />
                <FaTwitter className='icon'  />
                <FaSquareInstagram className='icon'  />
            </div>
        </div>
        <div className="footer_content_center">
            <h3>Company</h3>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>privectPolicy</li>
            </ul>
        </div>
        <div className="footer_content_right">
            <h3>
                GET IN TOUCH
            </h3>
            <ul>
                <li>+91-5616494</li>
                <li>foodzone@contact.in</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer_copyright">
        Copyright ©  2025 FoodZone®. All rights reserved.


      </p>
    </div>
  )
}

export default Footer;
