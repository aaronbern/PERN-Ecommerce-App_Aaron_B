
const pool = require('../db/db');

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Product not found." });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, expiration_date, quantity } = req.body;
        
        // Basic validation
        if (!name || !price || !expiration_date || !quantity) {
            res.status(400).json({ message: "Incomplete product data." });
            return;
        }

        const result = await pool.query(
            "INSERT INTO products (name, price, expiration_date, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, price, expiration_date, quantity]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, expiration_date, quantity } = req.body;

        const result = await pool.query(
            "UPDATE products SET name = $1, price = $2, expiration_date = $3, quantity = $4 WHERE id = $5 RETURNING *",
            [name, price, expiration_date, quantity, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Product not found." });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id", [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Product not found." });
            return;
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");

        if (result.rows.length === 0) {
            res.status(404).json({ message: "No products found." });
            return;
        }

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
