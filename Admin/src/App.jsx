import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddItem from './Pages/AddItem/AddItem';
import List from './Pages/List/List';
import Orders from './Pages/Orders/Orders';

const App = () => {
  return (<>
  <ToastContainer/>
  <Navbar/>
  <hr />
  <div className="app_content">
    <Sidebar/>
    <Routes>
        <Route path="/add" element={<AddItem/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Orders/>}/>
    </Routes>
  </div>
  </>
  )
}

export default App;
