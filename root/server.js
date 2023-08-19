require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.static('public')); // Optional: only if you're serving static files

// Routes
app.use('/products', productRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
