import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItems from './FoodItems'

const FoodDisplay = ({category}) => {
    const {FoodList} = useContext(StoreContext);
  return (
    <div className='food_display' id='food_display'>
        <h2>Food nere by you</h2>
        <div className="food_display_list">
            {FoodList.map((item, index) => {
                if (category === "All" || category === item.category) {
                    return (
                    <FoodItems
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                    />
                    );
                }
                })}
        </div>
    </div>
  )
}

export default FoodDisplay;
