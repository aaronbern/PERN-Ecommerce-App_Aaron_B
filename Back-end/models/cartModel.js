const pool = require('../db/db');

const getOrCreateCart = async (userId) => {
    let cartQuery = `SELECT cart_id FROM cart WHERE user_id = $1;`;
    let result = await pool.query(cartQuery, [userId]);

    if (result.rows.length === 0) {
        const createCartQuery = `INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id;`;
        result = await pool.query(createCartQuery, [userId]);
    }
    
    return result.rows[0].cart_id;
};

const addToCart = async (userId, productId, price, quantity = 1) => {
    const cartId = await getOrCreateCart(userId);

    const addItemQuery = `
        INSERT INTO cart_items (cart_id, product_id, price, quantity) 
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [cartId, productId, price, quantity];
    const result = await pool.query(addItemQuery, values);

    return result.rows[0];
};

const getCart = async (userId) => {
    const query = `
        SELECT ci.*, p.product_name 
        FROM cart c 
        JOIN cart_items ci ON c.cart_id = ci.cart_id 
        JOIN products p ON ci.product_id = p.product_id 
        WHERE c.user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

module.exports = {
    addToCart,
    getCart
};
