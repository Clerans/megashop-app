const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id/cancel', ordersController.cancelOrder);

module.exports = router;
