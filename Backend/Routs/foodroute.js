const express = require("express");
const multer = require("multer");

const  {addfood,listFood, removeFood} = require("../Controlers/foodcontroler.js");
const {listOrders,updateStatus} = require("../Controlers/orderControler.js");

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "Uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addfood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);
foodRouter.get("/orderlist",listOrders);
foodRouter.post("/status",updateStatus);
module.exports = foodRouter;