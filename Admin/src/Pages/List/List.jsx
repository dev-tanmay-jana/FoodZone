import React from 'react'
 import "./List.css"
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";

const List = () => {
    const url = "https://foodzone-backend-oi5d.onrender.com"
    const [list,setlist] = useState([]);

    const fetchlist = async () => {
  try {
    const response = await axios.get(`${url}/food/list`);
    setlist(response.data.data);
    toast.success("Successfully fetched data");
  } catch (err) {
    toast.error("Failed to fetch");
    console.error(err);
  }
};
const removeFood = async (id) => {
  try {
    const response = await axios.post(`${url}/food/remove`, { _id: id });
    // console.log(id);
    if (response.data.success) {
      toast.success("Item removed successfully");
      await fetchlist(); // Refresh the list
    } else {
      toast.error("Failed to remove item");
    }
  } catch (err) {
    toast.error("Error while removing item");
    console.error(err);
  }
};
    useEffect(()=>{
       fetchlist(); 
    },[])
  return (<>
    <div className="list add flex-col">
        <p>All Listed Food</p>
        <div className="list_table">
            <div className="list_table_format title">
                <b>Image</b>
                <b>Nmae</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index)=>{
                return (
                    <div key={index} className='list_table_format'>
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p className='cross' onClick={()=>removeFood(item._id)}><MdDeleteForever /></p>
                    </div>
                )
            })}
        </div>
    </div>
  </>
  )
}

export default List;
