import React from 'react'
import "./AddItem.css"
import { toast } from "react-toastify";
import { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios"
const AddItem = () => {
    const url = "https://foodzone-backend-oi5d.onrender.com";
    const [image,setimage] = useState(false);
    const [data,setdata] = useState({
        name:"",
        description:"",
        price:"",
        category:"salad",
    });
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setdata(data=>({...data,[name]:value}))
    }
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response = await axios.post(`${url}/food/add`,formData)
        try {
    const response = await axios.post(`${url}/food/add`, formData);
    if (response.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "salad",
      });
      setimage(false);
      toast.success("sucessfull Add Food");
    } else {
      console.log("Error");
      toast.error("cheak care fully");
    }
  } catch (err) {
    // console.error("Upload failed:", err);
  }

};

  return (
  <>
    <div className="add">
        <form className='flex-col' onSubmit={onSubmitHandler} action={"/add"}>
         <div className="add_img_upload flex-col">
            <label htmlFor='image'>Upload Food Image
                <img src={image?URL.createObjectURL(image):'/upload.png'}  className='upload_image' alt="" />
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image"  hidden required />
            </label>
         </div>
         <div className="add_product_name flex-col">
            <label >
                Enter food name
                <input onChange={onChangeHandler} type="text" name='name'  value={data.name} placeholder='Enter Here' required/>
            </label>
         </div>
         <div className="add_product_descripton flex-col">
            <label >
                Enter food descripton
                <textarea onChange={onChangeHandler} value={data.description} type="text" name='description' placeholder='write content here' required/>
            </label>
         </div>
         <div className="add_category_price">
            <div className="add_product_category flex-col">
            <label >
                Category
                <select onChange={onChangeHandler} name='category'>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Desert">Desert</option>
                    <option value="sandwich">sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="NonVeg">NonVeg</option>
                    <option value="Pure vage">Pure vage</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </label>
            </div>
            <div className="add_product_price flex-col">
            <label >
                Enter food price
                <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='price'/>
            </label>
            </div>
         </div>
         <button type='submit' className='Add_button'>Upload</button>
        </form>
    </div>
  </>
  )
}

export default AddItem;
