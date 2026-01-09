require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// routes
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');

// error handler
const errorHandler = require('./src/middleware/errorHandler');

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// test database connection (only once)
pool
  .connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('DB connection error', err));

// test route
app.get('/', (req, res) => {
  res.send('MegaShop backend with DB connected');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/wishlist', wishlistRoutes);

/* =========================
   404 HANDLER (MISSING ROUTES)
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

// start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
