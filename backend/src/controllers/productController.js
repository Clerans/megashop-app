const pool = require('../utils/db');
const { success } = require('../utils/response');

/* GET ALL PRODUCTS (pagination + filtering + sorting) */
exports.getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort, minPrice, maxPrice } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const values = [];

    if (minPrice) {
      values.push(minPrice);
      query += ` AND price >= $${values.length}`;
    }

    if (maxPrice) {
      values.push(maxPrice);
      query += ` AND price <= $${values.length}`;
    }

    if (sort === 'price_asc') query += ' ORDER BY price ASC';
    if (sort === 'price_desc') query += ' ORDER BY price DESC';
    if (sort === 'rating') query += ' ORDER BY rating DESC';

    const offset = (page - 1) * limit;
    values.push(limit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/* GET PRODUCT BY ID */
exports.getProductById = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [req.params.id]
    );
    success(res, 200, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

/* SEARCH PRODUCTS */
exports.searchProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE '%' || $1 || '%'",
      [req.query.q]
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/* PRODUCTS BY CATEGORY */
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1',
      [req.params.category]
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/* TRENDING PRODUCTS */
exports.getTrendingProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY rating DESC LIMIT 8'
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/* BEST SELLING PRODUCTS */
exports.getBestSellingProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY sold_count DESC LIMIT 8'
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};
