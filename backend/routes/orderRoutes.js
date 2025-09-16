const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.route("/")
  .post(protect, addOrderItems)   // ✅ Only logged in user can place order
  .get(protect, admin, getOrders); // ✅ Admin can view all orders

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.route("/myorders").get(protect, getMyOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.route("/:id").get(protect, getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.route("/:id/pay").put(protect, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
