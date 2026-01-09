const pool = require('../utils/db');
const AppError = require('../utils/AppError');

/* =======================
   GET CART ITEMS
======================= */
exports.getCart = async (req, res, next) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT ci.id, ci.quantity, p.name, p.price
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows,
      error: null
    });
  } catch (err) {
    next(err);
  }
};

/* =======================
   ADD TO CART (VALIDATED)
======================= */
exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { productId, quantity } = req.body;

    // 1️⃣ Validation
    if (!productId) {
      throw new AppError('Product ID is required', 400);
    }

    quantity = quantity ? Number(quantity) : 1;

    if (quantity <= 0) {
      throw new AppError('Quantity must be greater than zero', 400);
    }

    // 2️⃣ Check product exists
    const product = await pool.query(
      'SELECT id FROM products WHERE id = $1',
      [productId]
    );

    if (product.rows.length === 0) {
      throw new AppError('Product not found', 404);
    }

    // 3️⃣ Handle duplicates
    const existing = await pool.query(
      `SELECT id FROM cart_items
       WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE cart_items
         SET quantity = quantity + $1
         WHERE id = $2`,
        [quantity, existing.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO cart_items (user_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [userId, productId, quantity]
      );
    }

    res.status(201).json({
      success: true,
      data: { productId, quantity },
      error: null
    });

  } catch (err) {
    next(err);
  }
};

/* =======================
   UPDATE QUANTITY
======================= */
exports.updateQuantity = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      throw new AppError('Invalid quantity', 400);
    }

    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2',
      [quantity, itemId]
    );

    res.json({
      success: true,
      data: { itemId, quantity },
      error: null
    });
  } catch (err) {
    next(err);
  }
};

/* =======================
   REMOVE ITEM
======================= */
exports.removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    await pool.query(
      'DELETE FROM cart_items WHERE id = $1',
      [itemId]
    );

    res.json({
      success: true,
      data: { itemId },
      error: null
    });
  } catch (err) {
    next(err);
  }
};

/* =======================
   APPLY PROMO CODE
======================= */
exports.applyPromo = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      throw new AppError('Promo code is required', 400);
    }

    const promo = await pool.query(
      'SELECT code, discount, type FROM promo_codes WHERE code = $1',
      [code]
    );

    if (promo.rows.length === 0) {
      throw new AppError('Invalid promo code', 400);
    }

    res.json({
      success: true,
      data: promo.rows[0],
      error: null
    });

  } catch (err) {
    next(err);
  }
};
