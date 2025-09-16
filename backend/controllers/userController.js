const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

// OTP generator
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// @desc Register new user + send OTP
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const verificationCode = generateOTP();

  const user = await User.create({
    name,
    email,
    password,
    verificationCode,
    verificationCodeExpire: Date.now() + 10 * 60 * 1000, // 10 min
  });

  if (user) {
    await sendEmail(
      user.email,
      "Verify your Sip & Ship account",
      `Your OTP is: ${verificationCode}`,
      `<h2>Welcome to Sip & Ship</h2><p>Your OTP is: <b>${verificationCode}</b></p>`
    );

    return res.status(201).json({
      success: true,
      message: "User registered. Please check email for OTP to verify account.",
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// @desc Verify email with OTP
// @route POST /api/users/verify
// @access Public
const verifyUser = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    user.verificationCode === code &&
    user.verificationCodeExpire > Date.now()
  ) {
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save();

    return res.json({
      success: true,
      message: "Account verified successfully. You can now login.",
    });
  } else {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isVerified) {
    return res.status(401).json({ message: "Please verify your email first" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // ✅ Successful login
  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.getSignedJwtToken(),
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.address) {
      user.address = {
        street: req.body.address.street || user.address?.street,
        city: req.body.address.city || user.address?.city,
        state: req.body.address.state || user.address?.state,
        postalCode: req.body.address.postalCode || user.address?.postalCode,
        country: req.body.address.country || user.address?.country,
      };
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      token: updatedUser.getSignedJwtToken(),
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
