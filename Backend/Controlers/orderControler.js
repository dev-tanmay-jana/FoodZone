const orderModel = require("../Modles/orderModel");
const userModel = require("../Modles/userModel");
require('dotenv').config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY ? "✅" : "❌");
const placeorder = async (req, res) => {
  const frontend_url = "https://foodzone-admin-7s4q.onrender.com/orders";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      ammount: req.body.ammount,
      address: req.body.address,
    //   payment: req.body.payment,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 4900,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Order placement failed", error });
  }
};
const verifyOreder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true },
                { new: true }
            );
            console.log("update true");
            res.json({message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({messsage:"not paid"});
        }
    } catch (err) {
        console.log(err);
    }
}
//user order 
const userOder= async(req,res)=>{
    try {
        const orders  = await orderModel.find({userId:req.body.userId});
        res.json({data:orders});
    } catch (error) {
        console.log(error);
    }
}
const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
    }
}

//updating order status 
const updateStatus = async(req,res) =>{
    if (!req.body.status) {
  return res.status(400).json({ success: false, message: "Missing status in request body" });
}
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true})
} catch (error) {
    console.log(error);
}
}

module.exports = { placeorder,verifyOreder,userOder,listOrders,updateStatus };
