const express = require('express');
const { addItemToCart, getCartItems } = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', addItemToCart);
router.get('/cart/:userId', getCartItems);

module.exports = router;
