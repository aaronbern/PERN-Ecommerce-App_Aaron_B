const pool = require('../db/db');

// Add a new product
const addProduct = async (productData) => {
    const query = `
        INSERT INTO products (product_name, price, description, brand, category, quantity, rating, availability, image_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
    `;
    const values = [
        productData.product_name,
        productData.price,
        productData.description,
        productData.brand,
        productData.category,
        productData.quantity,
        productData.rating,
        productData.availability,
        productData.image_url
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all products
const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
};

// Get a product by ID
const getProductById = async (productId) => {
    const query = "SELECT * FROM products WHERE product_id = $1";
    const values = [productId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Update a product by NAME
const updateProductByName = async (productName, productData) => {
    const query = `
        UPDATE products
        SET product_name=$1, price=$2, ...  // list all the columns you want to update
        WHERE product_name=$X
        RETURNING *; 
    `;

    const values = [
        productData.product_name,
        productData.price,
        ...  // other product data attributes
        productName
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const getProductByName = async (productName) => {
    const query = "SELECT * FROM products WHERE product_name = $1";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteProductByName = async (productName) => {
    const query = "DELETE FROM products WHERE product_name = $1 RETURNING *";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductByName,
    getProductByName,     // newly added
    deleteProductByName  // newly added
};
