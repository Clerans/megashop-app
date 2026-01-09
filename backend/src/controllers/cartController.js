const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* =======================
   GET CART ITEMS
======================= */
exports.getCart = async (req, res) => {
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
      data: result.rows
    });
  } catch (err) {
    console.error('GET CART ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart'
    });
  }
};

/* =======================
   ADD TO CART (FIXED)
======================= */
exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    let { productId, quantity } = req.body;

    // ✅ Validate input
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product or quantity'
      });
    }

    productId = Number(productId);
    quantity = Number(quantity);

    // ✅ Check product exists
    const productCheck = await pool.query(
      'SELECT id FROM products WHERE id = $1',
      [productId]
    );

    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // ✅ Check if already in cart
    const existing = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE user_id=$1 AND product_id=$2',
      [userId, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2',
        [quantity, existing.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO cart_items (user_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [userId, productId, quantity]
      );
    }

    res.json({
      success: true,
      message: 'Product added to cart'
    });

  } catch (err) {
    console.error('ADD TO CART ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Add to cart failed'
    });
  }
};

/* =======================
   UPDATE QUANTITY
======================= */
exports.updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quantity'
      });
    }

    await pool.query(
      'UPDATE cart_items SET quantity=$1 WHERE id=$2',
      [quantity, itemId]
    );

    res.json({
      success: true,
      message: 'Quantity updated'
    });
  } catch (err) {
    console.error('UPDATE CART ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Update failed'
    });
  }
};

/* =======================
   REMOVE ITEM
======================= */
exports.removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    await pool.query(
      'DELETE FROM cart_items WHERE id=$1',
      [itemId]
    );

    res.json({
      success: true,
      message: 'Item removed'
    });
  } catch (err) {
    console.error('REMOVE CART ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Remove failed'
    });
  }
};

/* =======================
   APPLY PROMO CODE
======================= */
exports.applyPromo = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code required'
      });
    }

    const promo = await pool.query(
      'SELECT * FROM promo_codes WHERE code=$1',
      [code]
    );

    if (promo.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid promo code'
      });
    }

    res.json({
      success: true,
      discount: promo.rows[0].discount,
      type: promo.rows[0].type
    });

  } catch (err) {
    console.error('PROMO ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Promo apply failed'
    });
  }
};
