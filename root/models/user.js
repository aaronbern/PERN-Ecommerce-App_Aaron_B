const pool = require('../db/db');

const createUser = async (userData) => {
    const query = `
        INSERT INTO users (username, password) 
        VALUES ($1, $2) 
        RETURNING id, username;  -- This returns the created user's id and username
    `;
    const values = [userData.username, userData.password];  // Remember to hash passwords in real-world scenarios

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the newly created user's details
};

// ... other user-related functions as needed

module.exports = {
    createUser,
    // ... export other functions as needed
};
