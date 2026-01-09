const pool = require('../utils/db');

/* GET ALL PRODUCTS */
exports.getAllProducts = async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json({ success: true, data: result.rows });
};

/* GET PRODUCT BY ID */
exports.getProductById = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [req.params.id]
  );
  res.json({ success: true, data: result.rows[0] });
};

/* SEARCH */
exports.searchProducts = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'",
    [req.query.q]
  );
  res.json({ success: true, data: result.rows });
};

/* CATEGORY */
exports.getProductsByCategory = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE category = $1',
    [req.params.category]
  );
  res.json({ success: true, data: result.rows });
};

/* TRENDING */
exports.getTrendingProducts = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY rating DESC LIMIT 8'
  );
  res.json({ success: true, data: result.rows });
};

/* BEST SELLING */
exports.getBestSellingProducts = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY sold_count DESC LIMIT 8'
  );
  res.json({ success: true, data: result.rows });
};
