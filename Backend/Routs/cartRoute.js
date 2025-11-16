const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../Controlers/cartcontroler")
const authMiddleware = require("../Middlewere/auth");
const cartAuthMiddleware = require("../Middlewere/cartAuth");
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",cartAuthMiddleware,getCart);

module.exports = cartRouter;
