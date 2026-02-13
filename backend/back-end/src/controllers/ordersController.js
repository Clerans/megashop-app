const pool = require('../utils/db');
const { success } = require('../utils/response');
const AppError = require('../utils/AppError');

exports.createOrder = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const userId = req.userId;
    const { shipping_address, payment_method } = req.body;

    // ✅ OPTIONAL VALIDATION (EXAM SAFE)
    if (!shipping_address || shipping_address.trim() === '') {
      throw new AppError('Shipping address is required', 400);
    }

    if (!payment_method || payment_method.trim() === '') {
      throw new AppError('Payment method is required', 400);
    }

    await client.query('BEGIN');

    const cart = await client.query(
      `SELECT c.*, p.name, p.price
       FROM cart_items c
       JOIN products p ON p.id = c.product_id
       WHERE c.user_id = $1`,
      [userId]
    );

    if (cart.rows.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    const subtotal = cart.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = subtotal * 0.05;
    const shipping = subtotal > 5000 ? 0 : 300;
    const discount = 0;
    const total = subtotal + tax + shipping - discount;

    const orderResult = await client.query(
      `INSERT INTO orders
      (user_id, order_number, status, subtotal, tax, shipping, discount, total, shipping_address, payment_method)
      VALUES ($1, $2, 'Pending', $3, $4, $5, $6, $7, $8, $9)
      RETURNING id`,
      [
        userId,
        `ORD-${Date.now()}`,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        shipping_address,
        payment_method
      ]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of cart.rows) {
      await client.query(
        `INSERT INTO order_items
        (order_id, product_id, product_name, product_price, quantity)
        VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      );
    }

    await client.query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [userId]
    );

    await client.query('COMMIT');
    success(res, 201, { orderId });

  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [req.params.id, req.userId]
    );
    success(res, 200, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    await pool.query(
      `UPDATE orders
       SET status = 'Cancelled'
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.userId]
    );
    success(res, 200, { cancelled: true });
  } catch (err) {
    next(err);
  }
};
