const pool = require('../utils/db');

/* =========================
   CREATE ORDER FROM CART
========================= */
exports.createOrder = async (req, res) => {
  const userId = req.userId;

  try {
    // 1️⃣ Validate cart
    const cart = await pool.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [userId]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // 2️⃣ Calculate total
    let total = 0;
    cart.rows.forEach(item => {
      total += item.price * item.quantity;
    });

    // 3️⃣ Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total)
       VALUES ($1, $2)
       RETURNING id`,
      [userId, total]
    );

    const orderId = orderResult.rows[0].id;

    // 4️⃣ Create order_items
    for (const item of cart.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // 5️⃣ Clear cart
    await pool.query(
      `DELETE FROM cart_items WHERE user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      message: 'Order placed successfully',
      orderId
    });

  } catch (err) {
    console.error('CREATE ORDER ERROR:', err.message);
    res.status(500).json({
      success: false,
      message: 'Order creation failed'
    });
  }
};

/* =========================
   GET ALL ORDERS (USER)
========================= */
exports.getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, total, status, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

/* =========================
   GET SINGLE ORDER
========================= */
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;

    const order = await pool.query(
      `SELECT id, total, status, created_at
       FROM orders
       WHERE id = $1 AND user_id = $2`,
      [orderId, userId]
    );

    if (order.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const items = await pool.query(
      `SELECT oi.quantity, oi.price, p.name
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [orderId]
    );

    res.json({
      success: true,
      order: order.rows[0],
      items: items.rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

/* =========================
   CANCEL ORDER
========================= */
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;

    const result = await pool.query(
      `UPDATE orders
       SET status = 'cancelled'
       WHERE id = $1 AND user_id = $2 AND status = 'placed'
       RETURNING id`,
      [orderId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }

    res.json({
      success: true,
      message: 'Order cancelled'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Cancel failed' });
  }
};
