import React from 'react';
import "./PlaceOrder.css"
import { IoHomeOutline } from "react-icons/io5";
import { LuHotel } from "react-icons/lu";
// import { BsBank } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const PlaceOrder = () => {
    const [paymentMethod, setPaymentMethod] = useState("online"); // default to online
   const { getTotalItemAmmount, token, FoodList, cartItem, url } = useContext(StoreContext);
    const [data,setdata] = useState({
        name:"",
        flat:"",
        village:"",
        pin:"",
        city:"",
        landmark:"",
        phone:"",
        type:"",

    });
    const [selectedType, setSelectedType] = useState("");
    const onchangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setdata(data => ({
            ...data,
            [name]: value
        }));
    }
const placeOrder = async (e) => {
  e.preventDefault();

  let orderItems = [];
  FoodList.forEach((item) => {
    if (item && item._id && cartItem[item._id] > 0) {
      const item_info = { ...item, quantity: cartItem[item._id] };
      orderItems.push(item_info);
    }
  });

  const orderData = {
    address: data,
    items: orderItems,
    ammount: getTotalItemAmmount() + 49,
    paymentMethod: paymentMethod,
  };

  try {
    const response = await axios.post(`${url}/order/place`, orderData, {
      headers: { token },
    });

    if (response.data.success) {
      if (paymentMethod === "cod") {
        window.location.replace("/myorder");
      } else {
        window.location.replace(response.data.session_url);
      }
    } else {
      alert(response.data.message || "Something went wrong!");
    }
  } catch (err) {
    console.error("Order placement failed:", err);
    alert("Failed to place order. Please try again.");
  }
};

    // useEffect(()=>{
    //     console.log(data);
    // },[data])
  return (
    <form className='place_order' onSubmit={placeOrder} >
        <div className="place_order_left">
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
                
            <p className='title'>Address Details</p>
            <div className="address_icon">
                <button
                type="button"
                className={`icon ${selectedType === "Home" ? "selected" : ""}`}
                onClick={() => {
                    setSelectedType("Home");
                    setdata(data => ({ ...data, type: "Home" }));
                }}
                >
                <IoHomeOutline /> Home
                </button>

                        <button
                        type="button"
                        className={`icon ${selectedType === "Hotel" ? "selected" : ""}`}
                        onClick={() => {
                            setSelectedType("Hotel");
                            setdata(data => ({ ...data, type: "Hotel" }));
                        }}
                        >
                        <LuHotel /> Hotel
                        </button>

                                <button
                                type="button"
                                className={`icon ${selectedType === "Office" ? "selected" : ""}`}
                                onClick={() => {
                                    setSelectedType("Office");
                                    setdata(data => ({ ...data, type: "Office" }));
                                }}
                                >
                                <HiOutlineBuildingOffice2 /> Office
                                </button>

                                <button
                                type="button"
                                className={`icon ${selectedType === "Other" ? "selected" : ""}`}
                                onClick={() => {
                                    setSelectedType("Other");
                                    setdata(data => ({ ...data, type: "Other" }));
                                }}
                                >
                                <CiLocationOn /> Other
                                </button>
            </div >
            <div >
            <label>Reciver Name<input type="text"placeholder='Reciver Name' name='name' onChange={onchangeHandler} value={data.name} required/></label>
            <div className="multi_filde">
             <label>Flat/House<input type="text" placeholder='Flat/House' name='flat'onChange={onchangeHandler} value={data.flat} required/></label>
             <label> Village<input type="text" placeholder='Area/Locality/Village' name='village'onChange={onchangeHandler} value={data.village} required/></label>
             </div>
             <div className="multi_filde">
                <label>Pin<input type="text"placeholder='Pin' name='pin' onChange={onchangeHandler} value={data.pin} required/></label>
                <label>City<input type="text" placeholder='Town/City' name='city' onChange={onchangeHandler} value={data.city} required/></label>
            </div>
            <label>LandMark
                <input type="text" placeholder='Landmark' name='landmark' onChange={onchangeHandler} value={data.landmark}  required/>
            </label>
                <label>Phone<input type="text" placeholder='Phone' name='phone' onChange={onchangeHandler} value={data.phone} required/></label>
                </div>
     <div className="payment_method_options">
            <p className='title'>Payment Method</p>
                <label>
                    <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Online Payment
                </label>
                <label>
                    <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Cash on Delivery</span>
                </label>
                </div>
                <button className='save_address' type='submit'>MAKE PAYMENT</button>
        </div>
    </form>
  )
}

export default PlaceOrder;
