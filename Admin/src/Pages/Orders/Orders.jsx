import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "./Orders.css"

const Orders = () => {
  const url = "https://foodzone-backend-oi5d.onrender.com";
  const [orders, setOrders] = useState([]);

  const fetchOrderList = async () => {
    try {
      const response = await axios.get(`${url}/food/orderlist`);
      if (response.data.success) {
        setOrders(response.data.data);
        // console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Server error");
    }
  };
  const statusHandler = async(e,orderId)=>{
    // console.log(e)
    const response = await axios.post(`${url}/food/status`,{
        orderId,
        status:e.target.value
    })
    if(response.data.success){
        await fetchOrderList();
    }
  }


  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <div className="orders add">
      <h3>Order Page</h3>
      <div className="order_list">
        {orders.map((order, index) => (
          <div key={order._id || index} className="order_item">
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => (
                  <span key={item._id || idx}>
                    {item.name} x{item.quantity}
                    {idx !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>
              </div>
              <div>
              <p className="order-item-name">
                ReciverName:{order.address.name}
              </p>
              <div className="order-item-address">
                <h5>Address:</h5>
                <p>{order.address.flat+","+order.address.village+","+order.address.pin+","+order.address.landmark+","}</p>
                </div>
                <p>Phone: {order.address.phone+","}</p>
            </div>
            <p>Items:  {order.items.length} </p>
            <p>Ammount: {order.ammount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value=" Food Processing"> Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Deliverd">Deliverd</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
