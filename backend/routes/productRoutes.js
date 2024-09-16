const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes (for creating, updating, and deleting products)
router.post('/', createProduct); // Protect this route with admin middleware later
router.put('/:id', updateProduct); // Protect this route with admin middleware later
router.delete('/:id', deleteProduct); // Protect this route with admin middleware later

module.exports = router;
