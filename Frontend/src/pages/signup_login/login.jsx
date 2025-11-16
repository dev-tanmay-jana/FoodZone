import React, { useContext, useEffect, useState } from 'react'
import "./signup_login.css"
import { RxCross1 } from "react-icons/rx";
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import {toast } from "react-toastify";

const Login = ({setshowlogin}) => {
    const {url,token,settoken} = useContext(StoreContext);
    const [currentState,setcurrentState] = useState("Login");
    const [data,setdata] = useState({
        name:"",
        email:"",
        password:"",
    });

    const onChangeHandler= (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setdata(data=>({...data,[name]:value}));
    }

    const onlogin = async (e) => {
  e.preventDefault();

  const endpoint = `${url}/user/${currentState === "Login" ? "login" : "signup"}`;
//   console.log(endpoint);
  const payload =
    currentState === "Login"
      ? { email: data.email, password: data.password }
      : { name: data.name, email: data.email, password: data.password };

  try {
    const response = await axios.post(endpoint, payload);

    if (response.data.token) {
      settoken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setshowlogin(false);
      toast.success(`${currentState} successful`);
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Server error");
  }
};
    
  return (
        
    <div className='login_page'>
      <form  className="login_from" onSubmit={onlogin}>
        <div className="login_title">
            <h2>{currentState}</h2>
            <RxCross1  onClick={()=>setshowlogin(false)}/>
        </div>
        <div className="login_inputs">
            {currentState==="Login"?<></>:<input type="text" name='name' placeholder='Your name' onChange={onChangeHandler} value={data.name} required/>}
            <input type="email" placeholder='Email' onChange={onChangeHandler} value={data.email} name='email' required/>
            <input type="password" placeholder='password' onChange={onChangeHandler} value={data.password} name='password' required/>
        </div>
        <div className="condition">
            <input type="checkbox" required />
            <p>By Counting, I Agree To the Terms & Privacy Policy</p>
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
        {currentState==="Login"?<p>Create an Account? <span onClick={()=>setcurrentState("Sign Up")}>Click here</span ></p>:<p>Already have an Account? <span onClick={()=>setcurrentState("Login")}>Login</span></p>}
      </form>
    </div>
  )
}

export default Login;
