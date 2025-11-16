import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/myorder/userorder`, {}, {
        headers: { token }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my_orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div className="my_orders_order" key={order._id || index}>
            <p>
              {order.items.map(item => `${item.name} ${item.quantity}`).join(', ')}
            </p>
            <p>{order.ammount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>Order ID:</span> <b>{order.status}</b>
            </p>
            <button>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;