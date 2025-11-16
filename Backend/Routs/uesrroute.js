const express = require("express");

const {loginUser,signUpUser} = require("../Controlers/usercontroler");

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/login",loginUser);

module.exports = userRouter;