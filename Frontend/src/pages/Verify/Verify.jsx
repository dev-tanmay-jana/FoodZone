import React, { useContext } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
const Verify = () => {
    const [searchparams,setsearchparams] = useSearchParams();

    const  success = searchparams.get("success");
    const  orderid = searchparams.get("orderid");
    // console.log(success,orderid);
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        const response =await axios.post(`${url}/order/verify`, {
            success,
            orderId: orderid // ✅ corrected key name
            });;
        if(response.data.success){
            navigate("/myorder");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className="verify">
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify;
