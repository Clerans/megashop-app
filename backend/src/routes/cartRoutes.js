const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, cartController.getCart);
router.post('/', authMiddleware, cartController.addToCart);
router.put('/:itemId', authMiddleware, cartController.updateQuantity);
router.delete('/:itemId', authMiddleware, cartController.removeItem);
router.post('/apply-promo', authMiddleware, cartController.applyPromo);

module.exports = router;
