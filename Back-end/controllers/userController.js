const { createUser, getUserByUsername, updateUserPassword, deleteUser } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addItemToCart } = require('../models/cartModel');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            username: username,
            password: hashedPassword,
            email: email
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if the product is already in the cart
        const existingItem = await getCartItemByUserAndProduct(userId, productId);

        if (existingItem) {
            // Update quantity if item already exists in cart
            const updatedItem = await updateCartItemQuantity(userId, productId, existingItem.quantity + quantity);
            return res.status(200).json(updatedItem);
        } else {
            // Add new item to cart if it doesn't exist
            const newItem = await addItemToCart({ userId, productId, quantity });
            return res.status(201).json(newItem);
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });  // Assuming you're using JWT for user login
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const { username } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await updateUserPassword(username, hashedPassword);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const deletedUser = await deleteUser(username);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
