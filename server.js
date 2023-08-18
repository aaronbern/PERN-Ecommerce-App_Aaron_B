const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

app.use('/products', productRoutes);