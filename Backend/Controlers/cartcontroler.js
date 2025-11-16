const UserModel = require("../Modles/userModel");
const mongoose = require("mongoose");

//add to cart
const addToCart = async (req, res) => {
  try {
        const itemId = req.body.itemId;
        if (!itemId) {
        return res.status(400).json({ success: false, message: "Item ID is required" });
        }
    let userData = await UserModel.findOne({_id:req.body.userId});
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1
    }
    else{
        cartData[req.body.itemId] += 1
    }
    await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"added to cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
};

//remove from cart
const removeFromCart = async(req,res)=>{
    try {
        let userData = await UserModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
        return res.json({success:true,message:"cart dtata remove"});
    } catch (error) {
        console.log(error);
    }
};

//fetch cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ use correct field from JWT
    const userData = await UserModel.findById(userId); // ✅ use findById

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || []; // ✅ no await needed
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {addToCart,removeFromCart,getCart};