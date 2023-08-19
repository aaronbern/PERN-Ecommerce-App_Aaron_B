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

// Function to update a product
const updateProduct = async (productId, productData) => {
    const query = `
        UPDATE products
        SET name = $1, price = $2, expiration_date = $3, quantity = $4
        WHERE id = $5
        RETURNING *;  // Return all fields of the updated product
    `;
    const values = [productData.name, productData.price, productData.expiration_date, productData.quantity, productId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to delete a product
const deleteProduct = async (productId) => {
    const query = "DELETE FROM products WHERE id = $1 RETURNING *;";
    const values = [productId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to search products 
const searchProducts = async (searchTerm) => {
    const query = "SELECT * FROM products WHERE name ILIKE $1";  // ILIKE for case-insensitive search
    const values = [`%${searchTerm}%`];  // '%' are wildcards for partial match

    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts  
};
