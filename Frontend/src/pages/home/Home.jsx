import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import FoodDisplay from '../../components/fooddisplay/FoodDisplay';
import AppDownload from "../../components/appdownload/AppDownload";

const Home = () => {
    const [category, setcategory] = useState("All")
  return (
    <div className='home_page'>
      <Header/>
      <Menu category={category} setcategory={setcategory}/>
      <FoodDisplay category={category}/>
      <AppDownload />
    </div>
  )
}

export default Home;
