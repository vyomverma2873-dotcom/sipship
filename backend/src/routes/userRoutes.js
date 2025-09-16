const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/verify', userController.verifyEmail);
router.post('/resend-verification', userController.resendVerification);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Protected routes
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);

// Admin routes
router.get('/', protect, admin, userController.getUsers);

module.exports = router;