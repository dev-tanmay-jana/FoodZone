import React from 'react'
import "./Header.css";

const Header = () => {
  return (
    <>
        <div className="header">
            <div className="header_content">
                <h2>
                    Add your favourite food here
                </h2>
                <p>
                    Craving something tasty? Our food delivery app brings your favorite meals from top-rated restaurants straight to your doorstep.</p>
                    <p className='more_detail'> Whether you're in the mood for spicy Indian curries, cheesy pizzas, or healthy salads, we've got you covered. With real-time tracking, secure payments, and fast delivery, satisfying your hunger has never been easier.reorder your go-to dishes, and enjoy exclusive deals — all in one place.</p>
                
                <button type="button" className="btn btn-success">View Menu</button>
            </div>
        </div>
    </>
  )
}

export default Header;
