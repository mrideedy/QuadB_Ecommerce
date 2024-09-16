const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(express.json()); // Body parser to parse JSON in requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/cart', cartRoutes); // Cart routes

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
