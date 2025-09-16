const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/", registerUser);       // Register
router.post("/verify", verifyUser);   // Verify OTP
router.post("/login", loginUser);     // Login

// Private routes
router.get("/profile", protect, getUserProfile);   // Get profile
router.put("/profile", protect, updateUserProfile); // Update profile

module.exports = router;
