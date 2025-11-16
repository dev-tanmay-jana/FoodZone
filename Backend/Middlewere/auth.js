const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Not authorized. Authorization header missing." });
  }else{
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
     req.body.userId = decoded.id; 
    //  req.user = { id: decoded.id }; // ✅ Works for all request types
    // console.log(req.body.userId); // ✔ attach to req.userId
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }}
};

module.exports = authMiddleware;
