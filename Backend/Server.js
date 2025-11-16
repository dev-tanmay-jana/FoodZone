const express = require("express");
const cors = require("cors");

const connectDB= require("./Config/db.js");
const fodRouter = require("./Routs/foodroute.js");
const userRouter = require("./Routs/uesrroute.js");
const cartRouter = require("./Routs/cartRoute.js");
const orderRouter = require("./Routs/orderRoute.js");
require('dotenv').config();

//app config
const app = express();
const port = 8000;

//middlere 
app.use(express.json());
app.use(cors());

//connect DB
connectDB();

//end point
app.use("/food",fodRouter);
app.use("/images",express.static("Uploads"));
app.use("/user",userRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("Api Working");
});

//run espress
app.listen(port,()=>{
    console.log(`Server started at : http://localhost:${port}`)
});
