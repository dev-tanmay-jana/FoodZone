const UserModel = require("../Modles/userModel");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
const validator = require("validator");


// login user
const loginUser =async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
           return res.json({success:false,message:"user doesnot exits"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.json({success:false,message:"invalid creedintials"});
        }
        const token  = createtoken(user._id);
        return res.json({ token, message: "Login successful" });;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });

    }
};
const createtoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//SingUp User
const signUpUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Choose a stronger password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createtoken(user._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};


module.exports = {loginUser,signUpUser};