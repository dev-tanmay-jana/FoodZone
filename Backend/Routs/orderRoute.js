const express = require("express");
const authMiddleware = require("../Middlewere/auth")
const {placeorder,verifyOreder,userOder,listOrders} = require("../Controlers/orderControler")

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeorder);
orderRouter.post("/verify",verifyOreder);
orderRouter.post("/userorder",authMiddleware,userOder);


module.exports = orderRouter;