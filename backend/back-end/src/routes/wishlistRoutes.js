const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

// All wishlist routes require authentication
router.use(authMiddleware);

/**
 * GET /api/wishlist
 */
router.get('/', wishlistController.getWishlist);

/**
 * POST /api/wishlist
 * body: { product_id }
 */
router.post('/', wishlistController.addToWishlist);

/**
 * DELETE /api/wishlist/:itemId
 */
router.delete('/:itemId', wishlistController.removeFromWishlist);

module.exports = router; // ✅ THIS IS THE KEY LINE
