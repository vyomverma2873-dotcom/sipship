const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Import controllers
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.route('/').get(getProducts).post(protect, admin, createProduct);

// @route   GET /api/products/top
// @desc    Get top rated products
// @access  Public
router.get('/top', getTopProducts);

// @route   GET /api/products/:id
// @desc    Fetch single product
// @access  Public
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// @route   POST /api/products/:id/reviews
// @desc    Create new review
// @access  Private
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;