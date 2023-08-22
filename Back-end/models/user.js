const pool = require('../db/db');

const createUser = async (userData) =>  {
    const query = `
        INSERT INTO users (username, password) 
        VALUES ($1, $2) 
        RETURNING id, username;  -- Return the created user's id and username
    `;
    const values = [userData.username, userData.password];  // In real-world scenarios, ensure the password is hashed before this step

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the newly created user's details
};

const getUserByUsername = async (username) => {
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the user details
};

const updateUserPassword = async (username, newPassword) => {
    const query = `
        UPDATE users
        SET password = $1
        WHERE username = $2
        RETURNING id, username;
    `;
    const values = [newPassword, username];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteUser = async (username) => {
    const query = "DELETE FROM users WHERE username = $1 RETURNING *;";
    const values = [username];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    createUser,
    getUserByUsername,
    updateUserPassword,
    deleteUser
};
