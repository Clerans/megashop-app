const pool = require('../utils/db');
const { success } = require('../utils/response');

/**
 * GET /api/wishlist
 */
exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;  // authenticated user (JWT)

    const result = await pool.query(
      `SELECT 
        w.id,
        p.id AS product_id,
        p.name,
        p.price,
        p.images
       FROM wishlist_items w
       JOIN products p ON p.id = w.product_id
       WHERE w.user_id = $1`,
      [userId]
    );

    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/wishlist
 * body: { product_id }
 */
exports.addToWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { product_id } = req.body;

    const result = await pool.query(
      `INSERT INTO wishlist_items (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      [userId, product_id]
    );

    success(res, 200, result.rows[0] || null);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/wishlist/:itemId
 */
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      `DELETE FROM wishlist_items
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [itemId, userId]
    );

    success(res, 200, result.rows[0] || null);
  } catch (err) {
    next(err);
  }
};
