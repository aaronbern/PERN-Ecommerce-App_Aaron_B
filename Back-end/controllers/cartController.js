const { addProductToCart, getCartByUserId } = require('../models/cartModel');

exports.addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // Ensure quantity is valid
        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: "Quantity should be at least 1" });
        }
        const cartItem = await addProductToCart(userId, productId, quantity);
        return res.status(200).json(cartItem);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const items = await getCartByUserId(userId);
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
