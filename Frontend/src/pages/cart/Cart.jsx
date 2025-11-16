import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { MdDeleteForever } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {FoodList,
        getTotalItemAmmount,
        cartItem,
        removecart,
        url} = useContext(StoreContext);
        const naviate = useNavigate();
  return (<>
    <div className="cart">
        <div className="cart_items">
            <div className="cart_items_title">
                <p>Item</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br/>
            <hr />
            {FoodList.map((item,index)=>{
                if(cartItem[item._id]>0){
                    return(
                        <div key={item._id}>
                            <div className="cart_items_item cart_items_title">
                            <img src={`${url}/images/${item.image}`} alt="" />
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{cartItem[item._id]}</p>
                            <p>{item.price*cartItem[item._id]}</p>
                            <MdDeleteForever  className='cross' onClick={()=>removecart(item._id)}/>
                        </div>
                        <hr/>
                        </div>
                    )
                }
            })}
        </div>
        <div className="cart_bottom">
            <div className="cart_total">
                <h2>Total Bills</h2>
                <div>
                    <div className="cart_total_details">
                        <p>Subtotal</p>
                        <p>{getTotalItemAmmount()}</p>
                    </div>
                    <hr />
                    <div className="cart_total_details">
                        <p>Delivery Fee</p>
                        <p>{getTotalItemAmmount()===0?0:49}</p>
                    </div>
                    <hr />
                    <div className="cart_total_details">
                        <b>Total</b>
                        <b>{getTotalItemAmmount() === 0 ? 0 : getTotalItemAmmount() + 49}</b>
                    </div>            
                </div>
                
                    <button onClick={()=>naviate('/placeorder')} >PROCEED TO CHEAKOUT </button>
            </div>
            <div className="cart_promoco">
                <p>If you have a promo code, Enter t here</p>
                <div className="cart_promo_input">
                    <input type="text" placeholder='Promo code'/>
                    <button >Submit</button>
                </div>
            </div>
        </div>

            <div className='address'>
                <div className="address_left">
                    <FaLocationDot  className='location_icon'/>
                    <div className='address_title'>
                        <h4>Delivery To Home</h4>
                        <p>To Your addess</p>
                    </div>
                </div>
                <div className="address_right">
                    <button onClick={()=>naviate('/placeorder')}>CHANGE</button>
                </div>
            </div>
    </div>
    </>
  )
}

export default Cart;
