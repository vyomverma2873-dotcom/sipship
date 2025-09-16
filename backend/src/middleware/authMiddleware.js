const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      return next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Middleware for admin routes
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).json({ message: "Not authorized as an admin" });
};

// Middleware to check if user is verified
exports.verified = (req, res, next) => {
  if (req.user && req.user.isVerified) {
    return next();
  }
  return res.status(401).json({ message: "Email not verified" });
};
