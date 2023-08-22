const pool = require('../db/db');

// Add a new product
const addProduct = async (productData) => {
    const query = `
        INSERT INTO products (product_name, expiration_date, price) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const values = [productData.product_name, productData.expiration_date, productData.price];
    const result = await pool.query(query, values);
    return result.rows[0];
};


// Get all products
const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
};

// Get a product by name
const getProductByName = async (productName) => {
    const query = "SELECT * FROM products WHERE product_name = $1";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Update a product by name
const updateProductByName = async (productName, productData) => {
    const query = `
        UPDATE products
        SET brand=$1, expiration_date=$2, price=$3, quantity=$4, weight=$5, country_of_origin=$6, ingredients=$7, allergens=$8, nutrition_facts=$9
        WHERE product_name=$10
        RETURNING *;
    `;
    const values = [productData.brand, productData.expiration_date, productData.price, productData.quantity, productData.weight, productData.country_of_origin, productData.ingredients, productData.allergens, productData.nutrition_facts, productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Delete a product by name
const deleteProductByName = async (productName) => {
    const query = "DELETE FROM products WHERE product_name = $1 RETURNING *";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductByName,
    updateProductByName,
    deleteProductByName
};
