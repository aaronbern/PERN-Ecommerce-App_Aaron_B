const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Abyssal',
    password: '123Were50$',
    port: 5432,
});

pool.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = pool;