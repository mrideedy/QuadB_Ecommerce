const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// @desc Fetch user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name price imageUrl');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // Cart exists for user, update it
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add new item
        cart.cartItems.push({ product: productId, quantity });
      }
    } else {
      // No cart exists for user, create new cart
      cart = new Cart({
        user: req.user._id,
        cartItems: [{ product: productId, quantity }],
      });
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.cartItems.splice(itemIndex, 1);
      const savedCart = await cart.save();
      res.json(savedCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
