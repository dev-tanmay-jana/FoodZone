import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// If the file is named Navbar.jsx
import Navbar from './components/navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeorder/PlaceOrder";
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import About from './pages/about/About';
import AppDownload from './components/appdownload/AppDownload';
import Login from "./pages/signup_login/login";
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify/Verify';
import MyOrder from "./pages/MyOrder/MyOrder";
import 'react-toastify/dist/ReactToastify.css';
// import ViewCart from './components/VievCart/ViewCart';


const App = () => {
    const [showlogin,setshowlogin] = useState(false);
  return (<>
    {showlogin?<Login setshowlogin={setshowlogin}/>:<></>}
    <Navbar setshowlogin={setshowlogin} />
    <ToastContainer />
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/downloadapp' element={<AppDownload/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
    </Routes>
    {/* <ViewCart /> */}
  <Footer />
  </>
    
  )
}

export default App
