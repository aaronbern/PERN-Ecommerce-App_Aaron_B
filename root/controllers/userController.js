const pool = require('../db/db');
const bcrypt = require('bcrypt'); 

// Function to register a new user
const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password

    const query = `
        INSERT INTO users (username, password, email) 
        VALUES ($1, $2, $3) 
        RETURNING id, username, email;  // Return specific fields of the newly registered user
    `;
    const values = [userData.username, hashedPassword, userData.email];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly registered user's details
};

// Function to login a user
const loginUser = async (username, password) => {
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {  // Check if password matches the hash
        return user;  // Return the user if login is successful
    } else {
        throw new Error('Invalid credentials');  // Error handling can be more detailed based on your needs
    }
};

// Function to get a user by ID
const getUserById = async (userId) => {
    const query = "SELECT id, username, email FROM users WHERE id = $1";  // Excluding password for security
    const values = [userId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// ... other user-related functions as needed (e.g., updateUser, deleteUser)

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    // ... export other functions as needed
};
