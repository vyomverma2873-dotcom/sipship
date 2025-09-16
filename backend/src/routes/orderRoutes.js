const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderById);
router.put('/:id/pay', protect, orderController.updateOrderToPaid);

// Admin routes
router.get('/', protect, admin, orderController.getOrders);
router.put('/:id/deliver', protect, admin, orderController.updateOrderToDelivered);

module.exports = router;