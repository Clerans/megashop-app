require('dotenv').config();
const express = require('express');
const cors = require('cors');

const pool = require('./src/utils/db'); // ✅ FIX

const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');

const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/wishlist', wishlistRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'API endpoint not found',
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use(errorHandler);

/* =========================
   TEST DB CONNECTION (ONCE)
========================= */
pool
  .query('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ DB connection error', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
