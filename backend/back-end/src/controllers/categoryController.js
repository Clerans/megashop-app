const pool = require('../utils/db');
const { success } = require('../utils/response');

/* GET ALL CATEGORIES */
exports.getAllCategories = async (req, res, next) => {
  try {
    const query = `
      SELECT c.*, COUNT(p.id)::int as product_count 
      FROM categories c 
      LEFT JOIN products p ON c.id = p.category_id 
      GROUP BY c.id
      ORDER BY c.id
    `;
    const result = await pool.query(query);
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};

/* GET PRODUCTS BY CATEGORY ID */
exports.getProductsByCategoryId = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE category_id = $1',
      [req.params.id]
    );
    success(res, 200, result.rows);
  } catch (err) {
    next(err);
  }
};
