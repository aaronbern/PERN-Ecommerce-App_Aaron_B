const { addToCart, getCart } = require('../models/cartModel');

exports.addItemToCart = async (req, res) => {
    try {
        const { userId, productId, price } = req.body;
        const cartItem = await addToCart(userId, productId, price);
        return res.status(200).json(cartItem);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const items = await getCart(userId);
        return res.status(200).json(items.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
