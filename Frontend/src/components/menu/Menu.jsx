import React from 'react'
import "./Menu.css"
import { useState } from 'react';
import { MenuList } from "../../assets/assets";
import FoodDisplay from '../../components/fooddisplay/FoodDisplay';

const Menu = () => {
    const [category, setcategory] = useState("All")
  return (
    <div className='Explore_menu' id="Explore-mene">
        <h1>Explore menu</h1>
        <p className='Explore_menu_text'> Choose from a driven featuring a delectable array of food</p>
        <div className="explore_menu_list">
            {MenuList.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="menu_item" key={index}>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <h3>{item.menu_name}</h3>
                    </div>
                )
            })}
        </div>   
        <hr></hr>
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Menu
