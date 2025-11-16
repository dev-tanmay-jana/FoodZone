const FoodModel = require("../Modles/FoodModel.js");
const fs = require("fs");

//add food item

const addfood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file uploaded" });
  }

  const image_filename = req.file.filename;

  const food = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//all food list 

const listFood = async(req,res)=>{
    try {
        const foods = await FoodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
    }
};

//remove food

const removeFood = async(req,res)=>{
    try {
        const food = await FoodModel.findById(req.body._id);
        // console.log("Deleting food with ID:", req.body_id);
        fs.unlink(`Uploads/${food.image}`,(err)=>{
            if (err) console.error("Failed to delete image:", err);
        })
        await FoodModel.findByIdAndDelete(req.body._id);
        res.json({success:true,message:"food delete"})
    } catch (error) {
        console.log(error);
    }
};


module.exports = {addfood,listFood,removeFood};