import React from 'react'
import './ViewCart.css';

const ViewCart = () => {
  return (
    <>
    <div className='view_cart'>
        <div className="title">
            <div className='price'><h5>Total Item</h5><h5>|</h5><h5>Price</h5></div>
            <p>Keep Adding More</p>
        </div>
        <button>
            VIEW CART
        </button>
    </div>
    </>
  )
}

export default ViewCart;
