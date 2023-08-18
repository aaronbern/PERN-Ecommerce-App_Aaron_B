const pool = require('../db');

// Function to add a new product
const addProduct = async (productData) => {
    const query = `
        INSERT INTO products (name, price, expiration_date, quantity) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;  // Return all fields of the newly created product
    `;
    const values = [productData.name, productData.price, productData.expiration_date, productData.quantity];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to get all products
const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
};

// Function to get a product by ID
const getProductById = async (productId) => {
    const query = "SELECT * FROM products WHERE id = $1";
    const values = [productId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// ... other product-related functions as needed (e.g., updateProduct, deleteProduct)

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    // ... export other functions as needed
};
