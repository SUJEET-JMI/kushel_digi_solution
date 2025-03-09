const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
const token = req.headers.authorization && req.headers.authorization.split(" ")[1];


if (!token) {
  return res.status(401).json({ message: "Unauthorized - No Token" });
}


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Unauthorized - User Not Found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

// Role-based access
const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access Denied" });
  next();
};

module.exports = { authMiddleware, checkRole };
