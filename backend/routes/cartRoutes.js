const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
} = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protect all routes with authentication
router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/:productId', authMiddleware, removeFromCart);

module.exports = router;
