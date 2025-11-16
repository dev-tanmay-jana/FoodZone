import React, { useState,useContext } from 'react'
import './FoodDisplay.css'
import { assets } from '../../assets/assets';
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { StoreContext } from '../../context/StoreContext';


const FoodItems = ({id,name,price,description,image}) => {
    const {addToCart,
        setCartItem,
        cartItem,
        removecart,
        url} = useContext(StoreContext);
    const [itemCount, setitemCount] = useState(0);
  return (
    <div className='food_item'>
      <div className="food_item_image_container">
        <img className='food_image' src={`${url}/images/${image}`} alt={name} />
        {!cartItem[id]}
      </div>
      <div className="food_info">
        <div className="food_name_price">
            <p className='food_name'>{name}</p>
            <p className="food_price">${price}</p>
        </div>
        <div className="ratings_Add">
        <img className='food_ratings' src={assets.rating_starts} alt="" />
        {!cartItem[id]
        ?<button className='btn add_btn' onClick={()=>addToCart(id)}>Add</button>
        :<div className='food_item_counter'>
            <FiMinus onClick={()=>removecart(id)} />
            <h5>{cartItem[id]}</h5>
            <MdAdd onClick={()=>addToCart(id)}/>
        </div>
    }
    </div>
        <p className="food_desc">{description}</p>
      </div>
    </div>
  )
}

export default FoodItems;
