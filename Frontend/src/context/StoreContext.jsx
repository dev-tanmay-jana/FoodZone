import { createContext, useEffect, useState } from "react";
import {FoodList} from '../assets/assets'
import { food_list } from "../../public/assets";
import axios from "axios";
export const StoreContext = createContext(null);


const SrtoreContextprovider = (props) =>{
    const url = "http://localhost:8000";
    const [token,settoken] = useState("")
    const [FoodList,setFoodList] = useState([]);

    const [cartItem, setCartItem] = useState({});

    const addToCart = async(itemid) =>{
        if(!cartItem[itemid]){
            setCartItem((prev)=>({
                ...prev,[itemid]:1
            }))
        }
        else{
            setCartItem((prev)=>({
                ...prev,[itemid]:prev[itemid]+1
            }))
        }
        if(token){
            await axios.post(`${url}/cart/add`, { itemId:itemid }, { headers: { token } });
        }
    };
    const removecart = async(itemid) =>{
        setCartItem((prev)=>({
                ...prev,[itemid]:prev[itemid]-1
            }));
        if(token){
            await axios.post(`${url}/cart/remove`, { itemId:itemid }, { headers: { token } });
        }
        
    };
     const getTotalItemAmmount = () => {
  let totalammount = 0;
  for (const item in cartItem) {
    if (cartItem[item] > 0) {
      const itemInfo = FoodList.find((product) => product._id === item);
      if (itemInfo) {
        totalammount += itemInfo.price * cartItem[item];
      } else {
        console.warn("Item not found in FoodList:", item);
      }
    }
  }
  return totalammount;
};
     //fetch food list
     const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
};
 const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      `${url}/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ correct format
        },
      }
    );
    setCartItem(response.data.cartData);
  } catch (error) {
    console.error("Failed to load cart:", error.response?.data || error.message);
  }
};

     useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    
    const contextValue = {
        FoodList,
        addToCart,
        setCartItem,
        cartItem,
        removecart,
        getTotalItemAmmount,
        url,
        token,settoken,
    };
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
};

export default SrtoreContextprovider;