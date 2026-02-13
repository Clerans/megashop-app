const router = require('express').Router();
const c = require('../controllers/productController');

router.get('/', c.getAllProducts);
router.get('/search', c.searchProducts);
router.get('/trending', c.getTrendingProducts);
router.get('/bestselling', c.getBestSellingProducts);
router.get('/category/:category', c.getProductsByCategory);
router.get('/:id', c.getProductById);

module.exports = router;
