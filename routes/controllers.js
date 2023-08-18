const pool = require('../db');

exports.getAllProducts = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM products");
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};