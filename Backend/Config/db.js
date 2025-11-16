const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tanmayjanaeiilm:janaTanmay@cluster1.kerkn12.mongodb.net/FoodDel');
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};

module.exports =  connectDB;