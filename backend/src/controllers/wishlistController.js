const pool = require('../utils/db');

/**
 * GET /api/wishlist
 */
exports.getWishlist = async (req, res) => {
  const userId = 1; // demo user (replace with JWT later)

  const result = await pool.query(
    `SELECT w.id, p.id AS product_id, p.name, p.price, p.images
     FROM wishlist_items w
     JOIN products p ON p.id = w.product_id
     WHERE w.user_id = $1`,
    [userId]
  );

  res.json({ success: true, data: result.rows });
};

/**
 * POST /api/wishlist
 * body: { product_id }
 */
exports.addToWishlist = async (req, res) => {
  const userId = 1;
  const { product_id } = req.body;

  await pool.query(
    `INSERT INTO wishlist_items (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, product_id]
  );

  res.json({ success: true, message: 'Added to wishlist' });
};

/**
 * DELETE /api/wishlist/:itemId
 */
exports.removeFromWishlist = async (req, res) => {
  const { itemId } = req.params;

  await pool.query(
    'DELETE FROM wishlist_items WHERE id = $1',
    [itemId]
  );

  res.json({ success: true, message: 'Removed from wishlist' });
};
